/**
 * Pricing API — Plan Listesi, Karşılaştırma, ROI, Trial
 * GET  /api/v1/pricing — Public: plans, comparison, ROI calculator
 * POST /api/v1/pricing — Protected: start trial, select plan
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  PLAN_TIERLARI, RESTAURANT_OS_TIERLARI, RESTAURANT_OS_CONFIG,
  TRIAL_CONFIG, SEKTOR_ROI, ITIRAZ_KARSILAMA, FIYAT_SAYFASI_UX,
  FIYATLANDIRMA_SABITLERI, YILLIK_SOZLESME_STRATEJISI, REFERRAL_CONFIG,
  BIRIM_EKONOMI, GELIR_PROJEKSIYONU,
} from '@/data/fiyatlandirmaConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'plans'

    // ═══ PUBLIC ENDPOINTS (auth optional) ═══

    if (mode === 'plans') {
      const gorunum = searchParams.get('gorunum') || FIYAT_SAYFASI_UX.varsayilanGorunum // 'aylik' | 'yillik'
      const plans = PLAN_TIERLARI.map(p => ({
        id: p.id, isim: p.isim, ingilizce: p.ingilizce, badge: p.badge,
        fiyat: gorunum === 'yillik' ? p.fiyatYillikAylik : p.fiyatAylik,
        fiyatOrijinal: gorunum === 'yillik' ? p.fiyatAylik : undefined,
        fiyatYillikToplam: gorunum === 'yillik' ? p.fiyatYillikToplam : undefined,
        hedefSegment: p.hedefSegment, renkKodu: p.renkKodu, ctaMetin: p.ctaMetin,
        maxKullanici: p.maxKullanici, maxUrun: p.maxUrun, maxSayfa: p.maxSayfa, depolamaGB: p.depolamaGB,
        ozellikler: p.ozellikler, dahilDegil: p.dahilDegil,
      }))
      return NextResponse.json({
        ok: true, plans, gorunum,
        sira: { mobil: FIYAT_SAYFASI_UX.mobilSira, desktop: FIYAT_SAYFASI_UX.desktopSira },
        vurguluTier: FIYAT_SAYFASI_UX.vurguluTier,
        guvenSinyalleri: FIYAT_SAYFASI_UX.guvenSinyalleri,
        trialBilgi: { sure: TRIAL_CONFIG.sure, krediKartiGerekli: TRIAL_CONFIG.krediKartiGerekli, plan: TRIAL_CONFIG.baslangicPlan },
      })
    }

    if (mode === 'restaurant-os') {
      return NextResponse.json({
        ok: true,
        tiers: RESTAURANT_OS_TIERLARI,
        config: RESTAURANT_OS_CONFIG,
      })
    }

    if (mode === 'roi') {
      const sektor = searchParams.get('sektor')
      if (sektor) {
        const roi = SEKTOR_ROI.find(r => r.sektor === sektor)
        return roi
          ? NextResponse.json({ ok: true, roi })
          : NextResponse.json({ error: `Sektör bulunamadı: ${sektor}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, sektorler: SEKTOR_ROI })
    }

    if (mode === 'compare') {
      // Feature comparison matrix for pricing page
      const ozellikler = [
        'AI Site Oluşturma', 'Özel Alan Adı', 'SSL', 'Ürün Sayısı', 'Sayfa Sayısı', 'Depolama',
        'WhatsApp AI Temsilci', 'Online Randevu', 'CRM', 'Pazarlama Kampanyaları',
        'Sadakat Programı', 'POS', 'E-Fatura', 'Kullanıcı Sayısı', 'Analitik',
      ]
      const karsilastirma = ozellikler.map(oz => {
        const row: Record<string, string> = { ozellik: oz }
        PLAN_TIERLARI.forEach(p => {
          if (p.dahilDegil.some(d => d.toLowerCase().includes(oz.toLowerCase()))) row[p.id] = '—'
          else row[p.id] = '✓'
        })
        // Specific overrides for limits
        if (oz === 'Ürün Sayısı') { row.baslangic = '10'; row.buyume = '∞'; row.profesyonel = '∞'; row.kurumsal = '∞' }
        if (oz === 'Sayfa Sayısı') { row.baslangic = '5'; row.buyume = '∞'; row.profesyonel = '∞'; row.kurumsal = '∞' }
        if (oz === 'Depolama') { row.baslangic = '1 GB'; row.buyume = '10 GB'; row.profesyonel = '50 GB'; row.kurumsal = '∞' }
        if (oz === 'Kullanıcı Sayısı') { row.baslangic = '1'; row.buyume = '3'; row.profesyonel = '10'; row.kurumsal = '∞' }
        return row
      })
      return NextResponse.json({ ok: true, karsilastirma, maxSatir: FIYAT_SAYFASI_UX.karsilastirmaMaxSatir })
    }

    if (mode === 'objections') {
      return NextResponse.json({ ok: true, itirazlar: Object.values(ITIRAZ_KARSILAMA) })
    }

    if (mode === 'annual-savings') {
      return NextResponse.json({ ok: true, ...YILLIK_SOZLESME_STRATEJISI })
    }

    if (mode === 'referral') {
      return NextResponse.json({ ok: true, ...REFERRAL_CONFIG })
    }

    // ═══ PROTECTED: financials (admin only) ═══
    if (mode === 'financials') {
      const esnafId = await oturumDogrulaServer()
      if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
      return NextResponse.json({ ok: true, birimEkonomi: BIRIM_EKONOMI, gelirProjeksiyonu: GELIR_PROJEKSIYONU })
    }

    return NextResponse.json({ error: 'mode: plans, restaurant-os, roi, compare, objections, annual-savings, referral, financials' }, { status: 400 })
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
      case 'start_trial': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          plan: TRIAL_CONFIG.baslangicPlan,
          planTipi: 'trial',
          trialBaslangic: new Date().toISOString(),
          trialBitis: new Date(Date.now() + TRIAL_CONFIG.sure * 24 * 60 * 60 * 1000).toISOString(),
          trialPlan: TRIAL_CONFIG.baslangicPlan,
        })
        return NextResponse.json({
          ok: true, mesaj: `${TRIAL_CONFIG.sure} gün ücretsiz Büyüme planı başladı!`,
          plan: TRIAL_CONFIG.baslangicPlan, bitis: new Date(Date.now() + TRIAL_CONFIG.sure * 24 * 60 * 60 * 1000).toISOString(),
        })
      }

      case 'select_plan': {
        const { planId, donem } = body // donem: 'aylik' | 'yillik'
        const plan = PLAN_TIERLARI.find(p => p.id === planId)
        if (!plan) return NextResponse.json({ error: 'Plan bulunamadı' }, { status: 404 })

        const fiyat = donem === 'yillik' ? plan.fiyatYillikToplam : plan.fiyatAylik

        await adminDb.collection('esnaflar').doc(esnafId).update({
          plan: planId, planTipi: 'paid', planDonem: donem || 'aylik',
          planFiyat: fiyat, planSecimTarihi: new Date().toISOString(),
        })

        return NextResponse.json({
          ok: true, mesaj: `${plan.isim} planı seçildi!`, plan: planId, donem, fiyat,
          // TODO: Redirect to iyzico payment
        })
      }

      case 'add_restaurant_os': {
        const { tierId } = body
        const tier = RESTAURANT_OS_TIERLARI.find(t => t.id === tierId)
        if (!tier) return NextResponse.json({ error: 'Restaurant OS tier bulunamadı' }, { status: 404 })

        // Check minimum plan requirement
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const currentPlan = esnafDoc.data()?.plan || 'baslangic'
        if (currentPlan === 'baslangic') {
          return NextResponse.json({ error: 'Restaurant OS için minimum Büyüme planı gerekli', minimumPlan: RESTAURANT_OS_CONFIG.onKosul }, { status: 400 })
        }

        await adminDb.collection('esnaflar').doc(esnafId).update({
          restaurantOS: tierId, restaurantOSFiyat: tier.fiyat,
          restaurantOSBaslangic: new Date().toISOString(),
        })

        return NextResponse.json({
          ok: true, mesaj: `${tier.isim} aktive edildi!`, tier: tierId, ekFiyat: tier.fiyat,
        })
      }

      case 'apply_referral': {
        const { referralCode } = body
        // TODO: Validate referral code + apply discount
        await adminDb.collection('esnaflar').doc(esnafId).update({
          referralApplied: referralCode, referralAppliedAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: 'Referral kodu uygulandı — ilk ay %50 indirim!' })
      }

      default:
        return NextResponse.json({ error: 'action: start_trial, select_plan, add_restaurant_os, apply_referral' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
