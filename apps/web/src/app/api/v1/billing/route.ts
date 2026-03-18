/**
 * Billing & Subscription Management API
 * GET  /api/v1/billing — Current plan, invoices, usage
 * POST /api/v1/billing — Upgrade, downgrade, add taksit, switch annual
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { PLAN_TIERLARI, UPGRADE_TETIKLEYICILERI, FIYATLANDIRMA_SABITLERI } from '@/data/fiyatlandirmaConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'current'

    if (mode === 'current') {
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const data = esnafDoc.data() || {}

      const plan = PLAN_TIERLARI.find(p => p.id === data.plan) || PLAN_TIERLARI[0]
      const isTrialing = data.planTipi === 'trial'
      const trialDaysLeft = isTrialing
        ? Math.max(0, Math.ceil((new Date(data.trialBitis).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0

      return NextResponse.json({
        ok: true,
        plan: { id: plan.id, isim: plan.isim, fiyat: data.planFiyat || plan.fiyatAylik, donem: data.planDonem || 'aylik' },
        durum: data.subscriptionStatus || 'active',
        trial: isTrialing ? { kalanGun: trialDaysLeft, bitis: data.trialBitis } : null,
        restaurantOS: data.restaurantOS || null,
        limitler: { maxKullanici: plan.maxKullanici, maxUrun: plan.maxUrun, maxSayfa: plan.maxSayfa, depolamaGB: plan.depolamaGB },
      })
    }

    if (mode === 'invoices') {
      const invoicesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('invoices')
        .orderBy('createdAt', 'desc').limit(12).get()
      return NextResponse.json({
        ok: true,
        invoices: invoicesSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      })
    }

    if (mode === 'usage') {
      // Current usage vs plan limits
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const data = esnafDoc.data() || {}
      const plan = PLAN_TIERLARI.find(p => p.id === data.plan) || PLAN_TIERLARI[0]

      // Count current usage
      const productsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('products').count().get()
      const pagesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('pages').count().get()
      const usersSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('team_members').count().get()

      const usage = {
        urunler: { mevcut: productsSnap.data().count, limit: plan.maxUrun, yuzde: plan.maxUrun ? Math.round((productsSnap.data().count / plan.maxUrun) * 100) : 0 },
        sayfalar: { mevcut: pagesSnap.data().count, limit: plan.maxSayfa, yuzde: plan.maxSayfa ? Math.round((pagesSnap.data().count / plan.maxSayfa) * 100) : 0 },
        kullanicilar: { mevcut: usersSnap.data().count, limit: plan.maxKullanici, yuzde: plan.maxKullanici ? Math.round((usersSnap.data().count / plan.maxKullanici) * 100) : 0 },
      }

      // Check upgrade triggers
      const aktifTetikleyiciler = UPGRADE_TETIKLEYICILERI
        .filter(t => t.fromTier === plan.id)
        .filter(t => {
          if (t.kosul.includes('ürün limitine') && usage.urunler.yuzde >= 100) return true
          if (t.kosul.includes('sayfa limitine') && usage.sayfalar.yuzde >= 100) return true
          if (t.kosul.includes('çalışan') && (usage.kullanicilar.mevcut || 0) >= 3) return true
          return false
        })

      return NextResponse.json({ ok: true, usage, plan: plan.id, upgradeTetikleyicileri: aktifTetikleyiciler })
    }

    if (mode === 'upgrade-options') {
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const currentPlan = esnafDoc.data()?.plan || 'baslangic'
      const currentIndex = PLAN_TIERLARI.findIndex(p => p.id === currentPlan)

      const upgradeOptions = PLAN_TIERLARI.slice(currentIndex + 1).map(p => ({
        id: p.id, isim: p.isim, fiyatAylik: p.fiyatAylik, fiyatYillikAylik: p.fiyatYillikAylik,
        badge: p.badge, onemliOzellikler: p.ozellikler.diger.slice(0, 3),
      }))

      return NextResponse.json({ ok: true, mevcutPlan: currentPlan, upgradeOptions })
    }

    return NextResponse.json({ error: 'mode: current, invoices, usage, upgrade-options' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'upgrade': {
        const { planId, donem } = body
        const plan = PLAN_TIERLARI.find(p => p.id === planId)
        if (!plan) return NextResponse.json({ error: 'Plan bulunamadı' }, { status: 404 })

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const currentPlan = esnafDoc.data()?.plan
        const currentIdx = PLAN_TIERLARI.findIndex(p => p.id === currentPlan)
        const newIdx = PLAN_TIERLARI.findIndex(p => p.id === planId)

        if (newIdx <= currentIdx) return NextResponse.json({ error: 'Yükseltme için daha üst plan seçin' }, { status: 400 })

        const fiyat = donem === 'yillik' ? plan.fiyatYillikToplam : plan.fiyatAylik

        await adminDb.collection('esnaflar').doc(esnafId).update({
          plan: planId, planTipi: 'paid', planDonem: donem || 'aylik', planFiyat: fiyat,
          upgradedAt: new Date().toISOString(), previousPlan: currentPlan,
        })

        // Log expansion revenue event
        await adminDb.collection('esnaflar').doc(esnafId).collection('billing_events').add({
          type: 'upgrade', from: currentPlan, to: planId, fiyat, donem, at: new Date().toISOString(),
        })

        return NextResponse.json({ ok: true, mesaj: `${plan.isim} planına yükseltildi! 🎉`, plan: planId, fiyat })
      }

      case 'downgrade': {
        const { planId } = body
        const plan = PLAN_TIERLARI.find(p => p.id === planId)
        if (!plan) return NextResponse.json({ error: 'Plan bulunamadı' }, { status: 404 })

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const currentPlan = esnafDoc.data()?.plan

        // Downgrade takes effect at end of billing period
        await adminDb.collection('esnaflar').doc(esnafId).update({
          pendingDowngrade: planId, pendingDowngradeAt: new Date().toISOString(),
        })

        return NextResponse.json({
          ok: true,
          mesaj: `Mevcut dönem sonunda ${plan.isim} planına geçeceksiniz. Mevcut ${currentPlan} özellikleriniz dönem sonuna kadar aktif.`,
          mevcutPlan: currentPlan, yeniPlan: planId,
          uyari: plan.dahilDegil.length > 0 ? `Dikkat: ${plan.dahilDegil.slice(0, 3).join(', ')} özellikleri kapatılacak.` : null,
        })
      }

      case 'switch_to_annual': {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const data = esnafDoc.data() || {}
        const plan = PLAN_TIERLARI.find(p => p.id === data.plan)
        if (!plan) return NextResponse.json({ error: 'Aktif plan bulunamadı' }, { status: 404 })

        const tasarruf = plan.fiyatAylik * 12 - plan.fiyatYillikToplam

        await adminDb.collection('esnaflar').doc(esnafId).update({
          planDonem: 'yillik', planFiyat: plan.fiyatYillikToplam,
          switchedToAnnualAt: new Date().toISOString(),
        })

        return NextResponse.json({
          ok: true, mesaj: `Yıllık plana geçildi! ₺${tasarruf.toLocaleString('tr-TR')} tasarruf ediyorsunuz.`,
          yillikFiyat: plan.fiyatYillikToplam, tasarruf,
          taksitSecenekleri: FIYATLANDIRMA_SABITLERI.taksitSecenekleri,
        })
      }

      case 'record_payment': {
        const { amount, method, iyzicoRef } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('invoices').add({
          amount, method: method || 'credit_card', iyzicoRef: iyzicoRef || null,
          status: 'paid', createdAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: 'Ödeme kaydedildi' })
      }

      default:
        return NextResponse.json({ error: 'action: upgrade, downgrade, switch_to_annual, record_payment' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
