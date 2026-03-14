import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import Anthropic from '@anthropic-ai/sdk'
import { musteriProfilGuncelle, musteriEtiketGuncelle, ziyaretTahminEt } from '@/lib/musteriCRM'
import { sesProfiliPrompt } from '@/utils/sesProfilegitici'
import { iyzicoLinkOlustur } from '@/lib/iyzicoLinkClient'
import { sektorDavranisPrompt } from '@/data/sektorler'
import { sektorZenginPrompt } from '@/data/sektorlerServer'
import { RouterParams } from './routerAgent'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function islemYap(params: RouterParams): Promise<void> {
    const { esnafId, musteriNumara, mesaj } = params

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    const gecmisQuery = await adminDb
        .collection('musteriKonusmalar')
        .where('esnafId', '==', esnafId)
        .where('musteriNumara', '==', musteriNumara)
        .where('zaman', '>=', Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)))
        .orderBy('zaman', 'asc')
        .get()

    const gecmisMesajlar: { role: 'user' | 'assistant'; content: string }[] =
        gecmisQuery.docs.map((d: any) => ({
            role: d.data().kimden === 'musteri' ? 'user' as const : 'assistant' as const,
            content: d.data().mesaj,
        }))

    const bugun = new Date()
    bugun.setHours(0, 0, 0, 0)
    const randevuQuery = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('tarih', '>=', Timestamp.fromDate(bugun))
        .where('tarih', '<=', Timestamp.fromDate(new Date(bugun.getTime() + 7 * 24 * 60 * 60 * 1000)))
        .get()

    const doluSlotlar = randevuQuery.docs.map((d: any) => ({
        tarih: d.data().tarih?.toDate?.()?.toLocaleDateString('tr-TR'),
        saat: d.data().saat,
    }))

    const musteriId = `${esnafId}_${Buffer.from(musteriNumara).toString('base64').slice(0, 12)}`
    const musteriProfil = await adminDb.collection('musteriProfiller').doc(musteriId).get()
    const profilData = musteriProfil.data()

    const musteriGecmisi = profilData
        ? `\nBU MÜŞTERİ HAKKINDA BİLGİ:\n` +
        `Ad: ${profilData.ad ?? 'Bilinmiyor'}\n` +
        `Toplam randevu: ${profilData.toplamRandevu}\n` +
        `Tercih ettiği hizmetler: ${(profilData.tercihliHizmetler || []).join(', ')}\n`
        : ''

    const sektorDavranis = await sektorZenginPrompt(esnaf.sektor || '').catch(() => sektorDavranisPrompt(esnaf.sektor || ''))
    const sistemPrompt = `
${sektorDavranis}
Sen ${esnaf.isletmeAdi || esnaf.ad}'in WhatsApp SATIŞ VE REZERVASYON uzmanısın.
Sadece satış yapmaya, randevu oluşturmaya ve hizmet satmaya odaklan. Şikayetler sana gelmez.
${musteriGecmisi}
Sektör: ${esnaf.sektor}

İşletme hizmetleri:
${(esnaf.hizmetler || []).map((h: string) => `- ${h}`).join('\n')}

Çalışma saatleri: ${esnaf.calisma?.saatler || '09:00-18:00'}

Dolu randevular:
${doluSlotlar.map((s: any) => `- ${s.tarih} ${s.saat}`).join('\n') || 'Boş'}

${sesProfiliPrompt(esnaf.sesProfili)}

GÖREVIN:
1. Müşterinin sorusunu yanıtla (fiyat, hizmet)
2. Randevu almak istiyorsa: ad, hizmet, tarih, saat topla.
3. Bittiğinde şu formatta kapanış yap:
[[RANDEVU:{"ad":"...","hizmet":"...","tarih":"GG.AA.YYYY","saat":"SS:00"}]]

REFERANS:
Farklı sektör istenirse [[REFERANS_ISTE:{"sektor":"..."}]] döndür.
`

    const yanit = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: sistemPrompt,
        messages: [
            ...gecmisMesajlar,
            { role: 'user', content: mesaj },
        ],
    })

    const yanitMetni = yanit.content[0].type === 'text' ? yanit.content[0].text : ''
    const randevuMatch = yanitMetni.match(/\[\[RANDEVU:({.*?})\]\]/)
    let temizYanit = yanitMetni.replace(/\[\[RANDEVU:.*?\]\]/, '').trim()

    temizYanit = temizYanit.replace(/\[\[REFERANS_ISTE:.*?\]\]/, '').trim()

    // Randevu Tamamsa
    if (randevuMatch) {
        const randevuData = JSON.parse(randevuMatch[1])

        // CRM
        await musteriProfilGuncelle(esnafId, musteriNumara, {
            ad: randevuData.ad,
            sonRandevu: Timestamp.now(),
            toplamRandevu: FieldValue.increment(1) as any,
            tercihliHizmetler: FieldValue.arrayUnion(randevuData.hizmet) as any,
        })
        await musteriEtiketGuncelle(esnafId, musteriNumara)
        await ziyaretTahminEt(esnafId, musteriNumara)

        const kaparoOrani = esnaf.finansConfig?.kaparoOrani ?? 0
        if (kaparoOrani > 0) {
            const fiyat = esnaf.hizmetFiyatlari?.[randevuData.hizmet] ?? 500
            const link = await iyzicoLinkOlustur({
                esnafId,
                musteriAdi: randevuData.ad,
                telefon: musteriNumara,
                hizmet: randevuData.hizmet,
                tutar: Math.round(fiyat * (kaparoOrani / 100))
            })
            await waMesajGonder(
                musteriNumara,
                `Randevunuz rezerve edildi.\nOnaylamak için kaparo ödemesini yapabilirsiniz:\n${link}`,
                esnafId
            )
        }

        await adminDb.collection('randevular').add({
            esnafId,
            musteriNumara,
            ...randevuData,
            durum: 'onaylandi',
            olusturma: Timestamp.now()
        })
    }

    if (temizYanit) {
        await waMesajGonder(musteriNumara, temizYanit, esnafId, 'genel')
    }

    // Mesaj Logla
    await adminDb.collection('musteriKonusmalar').add({
        esnafId,
        musteriNumara,
        mesaj: temizYanit,
        kimden: 'bot',
        ajan: 'sales',
        zaman: Timestamp.now()
    })
}
