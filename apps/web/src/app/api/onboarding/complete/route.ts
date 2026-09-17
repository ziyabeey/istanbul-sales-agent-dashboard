import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { buildLocalPreviewPath, buildLocalSiteDataFromEsnaf } from '@/lib/site/localSiteData'
import { oturumOlustur } from '@/lib/sessionManager'
import { getCoreRuntime } from '@/lib/core/deps'
import { provisionCoreForNewTenant, resolveOnboardingCoreGate, type OnboardingCoreGate, type OnboardingCoreOutcome } from '@/lib/core/onboardingCore'
import { FirestoreOnboardingSagaStore } from '@/lib/core/onboardingSagaStore'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { adim1, adim2, adim3, adim4, adim5, smsRizasi } = body

        // Zorunlu alan kontrolü
        if (!adim1?.isletmeAdi || !adim1?.sektor || !adim5?.telefon) {
            return NextResponse.json(
                { error: 'Zorunlu alanlar eksik (işletme adı, sektör, telefon)' },
                { status: 400 }
            )
        }

        if (!adminDb) {
            return NextResponse.json(
                { error: 'Veritabanı bağlantısı kurulamadı' },
                { status: 500 }
            )
        }

        // KC-05 (R1 blocker 2): a request that presents a Core BFF session must pass
        // the Origin + CSRF + standard-session gate of every Core mutation, checked
        // BEFORE any tenant is created. Requests without a Core session take the
        // intentional legacy path (KC-03 backfill links them later).
        const runtime = getCoreRuntime()
        const gate: OnboardingCoreGate = await resolveOnboardingCoreGate(request, runtime)
        if (gate.mode === 'rejected') {
            return NextResponse.json({ error: gate.reason }, { status: gate.status })
        }

        // Telefon formatla
        const telefon = adim5.telefon
            .replace(/\s/g, '')
            .replace(/^0/, '+90')
            .replace(/^90/, '+90')
        const waNumarasi = adim5.waNumarasi
            ? adim5.waNumarasi.replace(/\s/g, '').replace(/^0/, '+90').replace(/^90/, '+90')
            : telefon

        // Palet + Tema
        const paletId = adim3?.paletId ?? 'siyah-altin'
        const temaId = adim3?.temaId ?? 'modern-minimal'
        const { paletBul } = await import('@/data/renkPaletleri')
        const { TEMALAR } = await import('@/data/temalar')
        const palet = paletBul(paletId)
        const secilenTema = TEMALAR.find(t => t.id === temaId) ?? null

        const esnafRef = adminDb.collection('esnaflar').doc()
        const esnafId = esnafRef.id
        const localPreviewUrl = buildLocalPreviewPath(esnafId)

        const esnafData = {
            ad: adim1.ad || adim1.isletmeAdi.split(' ')[0],
            soyad: adim1.soyad || '',
            adSoyad: adim1.ad
                ? `${adim1.ad} ${adim1.soyad || ''}`.trim()
                : adim1.isletmeAdi,
            isletmeAdiTam: adim1.isletmeAdi,
            unvan: 'Usta',
            sektor: adim1.sektor,
            telefon,
            email: adim5.email || null,
            waNumarasi,
            adres: '',
            sehir: adim1.sehir || '',
            ilce: adim1.ilce || '',
            subdomain: '',
            subdomainUrl: '',
            paket: adim1.paket || 'TEMEL',
            telefonTemiz: adim5.telefon.replace(/[^0-9]/g, ''),
            durum: 'onboarding',
            churnSkoru: 0,
            kayitTarihi: Timestamp.now(),
            yenilenmeTarihi: Timestamp.fromDate(
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            ),
            bildirimAyarlari: {
                sabahMesaji: true,
                olumsuzYorum: true,
                haftalikRapor: true,
            },
            googlePlacesId: adim2?.gmbLink || '',
            instagramUsername: adim2?.instagramUsername || null,
            instagramUrl: adim2?.instagramUrl || null,
            facebookUrl: adim2?.facebookUrl || null,
            paletId,
            secilenPalet: palet ?? null,
            temaId,
            secilenTema,
            smsRizasi: smsRizasi === true,
            kvkkOnay: true,
            kayitKanali: 'web',
            aktifWebModulleri: adim4?.aktifWebModulleri ?? [],
        }

        // Firestore'a esnaf oluştur ve ilk MVP için dış servissiz yerel site taslağını hazırla.
        await esnafRef.set({
            ...esnafData,
            siteData: buildLocalSiteDataFromEsnaf(esnafData, esnafId),
            localPreviewUrl,
            siteDurumu: 'local-preview-ready',
        })

        // KC-05: with a gated Core session the onboarding intent is persisted as a
        // durable saga (R1 blocker 3) and run: ProvisionBusiness + tester trial with
        // stable keys and a stable period; an open saga is re-driven by the signed
        // billing outbox job. A Core failure is recorded, never hidden.
        let coreStatus: string = gate.mode === 'legacy' ? 'no_core_session' : 'disabled'
        let businessId: string | null = null
        if (gate.mode === 'core' && runtime) {
            const core = await provisionCoreForNewTenant({
                ownerUserId: gate.userId,
                client: runtime.client,
                store: new FirestoreOnboardingSagaStore(adminDb),
                db: adminDb,
                esnafId,
                name: adim1.isletmeAdi,
            }).catch((): OnboardingCoreOutcome => ({ status: 'failed', step: 'provision', code: 'UNEXPECTED', retryable: true }))
            coreStatus = core.status
            if (core.status === 'provisioned') businessId = core.businessId
            if (core.status === 'failed') {
                await esnafRef.update({ coreOnboarding: { status: core.retryable ? 'deferred' : 'failed', step: core.step, error: core.code } }).catch(() => {})
            }
        }

        const response = NextResponse.json({ esnafId, localPreviewUrl, core: coreStatus, ...(businessId ? { businessId } : {}) })
        return oturumOlustur(esnafId, response)
    } catch {
        // console.error('[ONBOARDING COMPLETE]', error)
        return NextResponse.json(
            { error: 'Kayıt sırasında hata oluştu' },
            { status: 500 }
        )
    }
}
