import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { geminiCalistir } from '@/lib/geminiClient'
import {
    slugOlustur,
    siteYayinla,
    siteGuncelle,
} from '@/lib/cloudflarePagesClient'
import { telegramGonder } from '@/lib/telegram'
import { MODULLER, esnafModulleri } from '@/data/moduller'
import type { Modul } from '@/data/moduller'
import { TEMALAR } from '@/data/temalar'
import { sektorBul } from '@/data/sektorler'
import { sektorProfiliBul, profilCssDegerleri } from '@/data/sektorKatalogu'
import { sablonSec, modulSlotAdi, finalizeTemplate } from '@/utils/siteSablonlari'
import { htmlKaliteKontrol, kaliteRaporuLogla } from '@/utils/kaliteKontrol'
import {
    icerikUret,
    hizmetlerHtmlUret,
    nedenBizHtmlUret,
    yorumlarHtmlUret,
} from '@/utils/icerikUretici'

// ── KADEMELİ DEMO ÜRETİM MANİFESTOSU (Sistem Kuralları) ────────────────────
export const DEMO_URETIM_MANIFESTOSU = `
**[DEMO ÜRETİM KURALLARI]**
🔴 TIER 1: TEMEL & STANDART Paketler (Statik & Hızlı)
- Teknoloji: SADECE Semantik HTML5 ve Tailwind CSS v4 (CDN). React, Next.js veya State kullanımı YASAKTIR.
- Tasarım & Animasyon: Minimalist, temiz kurumsal grid yapısı. JS animasyonu veya Framer Motion YASAKTIR. Sadece CSS :hover efektleri.
- Amaç: Hızlı açılan, sade temel dijital varlık.

🟡 TIER 2: BÜYÜME Paketi (Dinamik & Etkileşimli)
- Teknoloji: Next.js 16 (React 19) ve Tailwind CSS v4.
- Tasarım & Animasyon: Asimetrik yapılar (Bento Box), etkileşimli modern UI bileşenleri. Framer Motion ile scroll edildikçe beliren yumuşak girişler.
- Kısıtlama: Ağır 3D objeler ve Parallax efektleri YASAKTIR.

🟢 TIER 3: PREMIUM & PREMIUM PLUS Paketler (Görsel Şölen)
- Teknoloji: Next.js 16, Tailwind CSS v4, Gelişmiş Framer Motion, CSS 3D Transforms (veya R3F).
- Tasarım & Animasyon: Scroll-linked Parallax efektleri, 3D elementler, manyetik butonlar, Glassmorphism ve Mesh Gradientler ZORUNLUDUR. Awwwards ajans kalitesi.
`;

// ── Ana fonksiyon ──────────────────────────────────────────────────────────
export async function esnafSiteUret(esnafId: string): Promise<string> {
    console.log('[MANIFESTO] Üretim başlatıldı:\n', DEMO_URETIM_MANIFESTOSU);
    // Esnaf verisini çek
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) throw new Error(`Esnaf bulunamadı: ${esnafId}`)
    const esnaf = doc.data()!

    // Son yorumları çek (sosyal kanıt için)
    const yorumlarQuery = await adminDb
        .collection('yorumlar')
        .where('esnafId', '==', esnafId)
        .where('yildiz', '>=', 4)
        .orderBy('yildiz', 'desc')
        .limit(3)
        .get()

    const yorumlar = yorumlarQuery.docs.map((d: any) => ({
        yazar: d.data().yazar ?? 'Müşteri',
        metin: d.data().yorum?.substring(0, 120),
        yildiz: d.data().yildiz ?? 5,
    }))

    // Slug ve subdomain
    const slug = esnaf.slug ?? slugOlustur(esnaf.isletmeAdiTam || esnaf.ad, esnafId)
    const subdomain = esnaf.subdomain ?? slug
    const siteUrl = `https://${subdomain}.kepenk.ai`

    // AST tabanlı ThemeConfig üret
    const { generateAstSiteData } = await import('@/utils/ai/astGenerator')
    const themeConfig = await generateAstSiteData(esnaf, yorumlar)

    // Business verilerini hazırla (ThemeConfig ile birlikte apps/sites tarafına geçecek)
    const businessData = {
      name: esnaf.isletmeAdiTam || esnaf.ad,
      phone: esnaf.telefon || '',
      email: esnaf.email || '',
      address: [esnaf.mahalle, esnaf.ilce, esnaf.sehir].filter(Boolean).join(', '),
      workingHours: {
        weekdays: '09:00 - 18:00',
        weekend: '10:00 - 15:00'
      },
      socialMedia: {
        instagram: esnaf.instagramUsername ? `https://instagram.com/${esnaf.instagramUsername}` : undefined,
        facebook: esnaf.facebookUrl || undefined
      },
      reviews: yorumlar
    }

    const siteData = {
      theme: themeConfig,
      business: businessData
    }

    // Firestore güncelle (Cloudflare deployment iptal edildi, site anında yayında)
    await doc.ref.update({
        slug,
        subdomain,
        subdomainUrl: siteUrl,
        siteData,
        temaId: 'v2-ast-generated', // Legacy uyumluluk için
        siteVersiyon: (esnaf.siteVersiyon ?? 0) + 1,
        siteGuncelleme: Timestamp.now(),
    })

    await telegramGonder(
        `🌐 <b>Site AST ile Yayında!</b>\n` +
        `${esnaf.isletmeAdiTam || esnaf.ad}\n` +
        `<a href="${siteUrl}">${siteUrl}</a>`
    )

    const { waMesajGonder } = await import('@/lib/twilioClient')
    await waMesajGonder(
        esnaf.waNumarasi,
        `✅ Siteniz yapay zeka tarafından (AST Engine V2) tasarlandı!\n\n` +
        `🌐 ${siteUrl}\n\n` +
        `İçerik güncellemek için: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        esnafId,
        'site_hazir'
    ).catch(console.error)

    return siteUrl
}

// İçerik değişince siteyi güncelle
export async function esnafSiteGuncelle(esnafId: string): Promise<void> {
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = doc.data()!
    if (!esnaf.slug) return  // Site hiç açılmamış

    const yorumlarQuery = await adminDb
        .collection('yorumlar')
        .where('esnafId', '==', esnafId)
        .where('yildiz', '>=', 4)
        .limit(3)
        .get()

    const yorumlar = yorumlarQuery.docs.map((d: any) => ({
        yazar: d.data().yazar ?? 'Müşteri',
        metin: d.data().yorum?.substring(0, 120),
        yildiz: d.data().yildiz ?? 5,
    }))

    const html = await htmlUret(esnaf, yorumlar, esnafId)
    await siteGuncelle(esnaf.slug, html)

    await doc.ref.update({
        siteHtml: html,
        siteVersiyon: (esnaf.siteVersiyon ?? 0) + 1,
        siteGuncelleme: Timestamp.now(),
    })
}

// ── Kalite kontrol pipeline ─────────────────────────────────────────────────
const MAX_DENEME = 3

async function htmlUretVeOnayla(
    esnaf: any,
    yorumlar: { yazar: string; metin: string; yildiz: number }[],
    esnafId: string,
    deneme: number = 1
): Promise<string> {
    const html = await htmlUret(esnaf, yorumlar, esnafId)
    const hakemSonuc = await hakemleDegerlendir(html, esnaf)

    console.log(
        `[SİTE HAKEMİ] Deneme ${deneme}: ${hakemSonuc.karar} (${hakemSonuc.toplamPuan}/100)`
    )

    if (hakemSonuc.karar === 'ONAYLA') {
        await telegramGonder(
            `✅ <b>Site Hakem Onayı</b>\n` +
            `${esnaf.isletmeAdiTam || esnaf.ad}\n` +
            `Skor: ${hakemSonuc.toplamPuan}/100\n` +
            `Deneme: ${deneme}`
        )
        return html
    }

    if (hakemSonuc.karar === 'DÜZELT' && deneme < MAX_DENEME) {
        console.log(`[SİTE HAKEMİ] Düzeltme yapılıyor: ${hakemSonuc.duzeltTalimati}`)
        const duzeltilmisHtml = await htmlUretDuzelt(
            esnaf,
            yorumlar,
            esnafId,
            html,
            hakemSonuc.duzeltTalimati ?? '',
            hakemSonuc.kritikSorunlar
        )
        const yeniSonuc = await hakemleDegerlendir(duzeltilmisHtml, esnaf)
        if (yeniSonuc.karar === 'ONAYLA' || deneme >= MAX_DENEME - 1) {
            return duzeltilmisHtml
        }
        return htmlUretVeOnayla(esnaf, yorumlar, esnafId, deneme + 1)
    }

    if (hakemSonuc.karar === 'REDDEDİLDİ' && deneme < MAX_DENEME) {
        console.log(`[SİTE HAKEMİ] Reddedildi, yeniden üretiliyor...`)
        return htmlUretVeOnayla(esnaf, yorumlar, esnafId, deneme + 1)
    }

    await telegramGonder(
        `⚠️ <b>Site Hakem Uyarısı</b>\n` +
        `${esnaf.isletmeAdiTam || esnaf.ad}\n` +
        `${MAX_DENEME} denemeden geçemedi. En iyi sürüm deploy edildi.\n` +
        `Son skor: ${hakemSonuc.toplamPuan}/100\n` +
        `Sorunlar: ${(hakemSonuc.kritikSorunlar || []).join(', ')}\n` +
        `Manuel kontrol önerilir.`
    )
    return html
}

async function hakemleDegerlendir(
    html: string,
    esnaf: any
): Promise<{
    karar: 'ONAYLA' | 'DÜZELT' | 'REDDEDİLDİ'
    toplamPuan: number
    kritikSorunlar: string[]
    duzeltTalimati?: string
}> {
    const { runAgent } = await import('@/agents/agentRunner')
    const sonuc = await runAgent('site_hakemi', {
        html: html.substring(0, 20000),
        esnafAdi: esnaf.isletmeAdiTam || esnaf.ad,
        telefon: esnaf.telefon,
        ilce: esnaf.ilce,
        paletId: esnaf.paletId,
        sektor: esnaf.sektor,
    })
    return {
        karar: sonuc?.karar ?? 'REDDEDİLDİ',
        toplamPuan: typeof sonuc?.toplamPuan === 'number' ? sonuc.toplamPuan : 0,
        kritikSorunlar: Array.isArray(sonuc?.kritikSorunlar) ? sonuc.kritikSorunlar : [],
        duzeltTalimati: sonuc?.duzeltTalimati,
    }
}

async function htmlUretDuzelt(
    esnaf: any,
    yorumlar: { yazar: string; metin: string; yildiz: number }[],
    esnafId: string,
    mevcutHtml: string,
    talimat: string,
    sorunlar: string[]
): Promise<string> {
    const duzeltPrompt = `
Aşağıdaki HTML sitesinde şu sorunlar var:
${sorunlar.map((s, i) => `${i + 1}. ${s}`).join('\n')}

DÜZELTME TALİMATI:
${talimat}

ORİJİNAL HTML (ilk 15000 karakter):
${mevcutHtml.substring(0, 15000)}

Bu sorunları düzelt ve tam HTML'yi döndür.
Sadece HTML. Açıklama yapma.
`
    let html = await geminiCalistir(
        'gemini-3.1-pro-preview',
        'Sen bir HTML düzeltme uzmanısın. Verilen sorunları çöz, tam HTML döndür.',
        duzeltPrompt,
        { thinkingLevel: 'low', maxOutputTokens: 16384 }
    )
    html = html.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim()
    return html
}

// ── Template tabanlı HTML üretim pipeline ─────────────────────────────────
async function htmlUret(
    esnaf: any,
    yorumlar: { yazar: string; metin: string; yildiz: number }[],
    esnafId: string
): Promise<string> {
    const paket = esnaf.paket || 'TEMEL'
    const temizNumara = esnaf.telefon ? esnaf.telefon.replace(/[^0-9]/g, '') : ''
    const adres = [esnaf.mahalle, esnaf.ilce, esnaf.sehir].filter(Boolean).join(', ')
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'

    // 1️⃣ Pakete göre template seç
    const sablon = sablonSec(paket)
    console.log(`[TEMPLATE] Seçilen şablon: ${paket} → ${sablon.substring(0, 40)}...`)

    // 2️⃣ Gemini'den SADECE içerik JSON'ı al (~800-1200 token)
    const icerik = await icerikUret(esnaf, yorumlar, paket)
    console.log(`[İÇERİK] ${esnaf.isletmeAdiTam || esnaf.ad}: "${icerik.heroBaslik}"`)

    // 3️⃣ Aktif modülleri belirle ve htmlSablon'larını slot'lara hazırla
    const izinVerilenModuller = esnafModulleri(esnaf.sektor, paket)
    const uygulanacakModulIdleri: string[] = esnaf.aktifWebModulleri ?? izinVerilenModuller.map((m: Modul) => m.id)
    const aktifModuller = uygulanacakModulIdleri
        .map((id: string) => MODULLER.find(m => m.id === id))
        .filter(Boolean) as Modul[]

    // Modül slot değerleri: her aktif modülün htmlSablon'unu statik değerlerle doldur
    const modulSlotDegerleri: Record<string, string> = {}
    let slotSayisi = 0

    for (const m of aktifModuller) {
        const slotKey = modulSlotAdi(m.id).replace(/\{\{|\}\}/g, '')  // MODUL_XXX
        if (m.htmlSablon) {
            const dolduruSablon = m.htmlSablon
                .replace(/ISLETME_ADI/g, esnaf.isletmeAdiTam || esnaf.ad)
                .replace(/WHATSAPP_NUMARA/g, temizNumara)
                .replace(/ESNAF_ID/g, esnafId)
                .replace(/KEPENK_API_URL/g, appUrl)
                .replace(/TELEFON/g, temizNumara)
                .replace(/ADRES_METNI/g, adres)
                .replace(/HARITA_QUERY/g, encodeURIComponent(`${esnaf.isletmeAdiTam || esnaf.ad} ${esnaf.ilce || ''} ${esnaf.sehir || ''}`))
                .replace(/KURUCU_ADI/g, esnaf.kurucuAdi || (esnaf.isletmeAdiTam || esnaf.ad))
                .replace(/GMB_LINK/g, esnaf.gmbLink || '#')
                .replace(/INSTAGRAM_URL/g, esnaf.instagramUsername ? `https://instagram.com/${esnaf.instagramUsername}` : '#')
                .replace(/FACEBOOK_URL/g, esnaf.facebookUrl || '#')
                .replace(/YOUTUBE_URL/g, esnaf.youtubeUrl || '#')
                .replace(/TIKTOK_URL/g, esnaf.tiktokUrl || '#')
                .replace(/TWITTER_URL/g, esnaf.twitterUrl || '#')
                .replace(/BASVURU_LINK/g, `https://wa.me/90${temizNumara}?text=${encodeURIComponent('Kariyer başvurusu')}`)
                .replace(/DUYURU_LINK/g, `https://wa.me/90${temizNumara}`)
                // İçerik JSON'dan gelen dinamik değerler
                .replace(/DUYURU_METNI/g, icerik.duyuruMetni || '🎉 Yeni hizmetlerimiz yayında!')
                .replace(/KAMPANYA_BASLIK/g, icerik.kampanya?.baslik || 'Özel Kampanya')
                .replace(/KAMPANYA_ACIKLAMA/g, icerik.kampanya?.aciklama || 'Sınırlı süre için geçerli')
                .replace(/INDIRIM_YUZDESI/g, icerik.kampanya?.indirim?.replace(/[^0-9]/g, '') || '20')
                .replace(/SAATLER_JSON/g, JSON.stringify(icerik.saatler || []))
                .replace(/ISTATISTIKLER_JSON/g, JSON.stringify(icerik.istatistikler || []))
                .replace(/ADIMLAR_JSON/g, JSON.stringify(icerik.adimlar || []))
                .replace(/MAKALELER_JSON/g, JSON.stringify(icerik.bloglar || []))
                .replace(/ILANLAR_JSON/g, JSON.stringify(icerik.ilanlar || []))
                .replace(/HIKAYE_METNI/g, icerik.hikayeMetni || '')
                .replace(/MISYON_METNI/g, icerik.misyonMetni || '')
            modulSlotDegerleri[slotKey] = dolduruSablon
            slotSayisi++
        }
        // htmlSablon'u olmayan modüller: slot boş kalır (template'den temizlenir)
    }
    console.log(`[MODÜL SLOT] ${slotSayisi}/${aktifModuller.length} modül şablonla dolduruldu`)

    // 4⃣⃣ Renk paleti CSS değerleri — önce sektör profilinden, sonra esnaf paletinden
    const palet = esnaf.secilenPalet ?? null
    const sektorProfili = sektorProfiliBul(esnaf.sektor || '')
    const profilCss = sektorProfili ? profilCssDegerleri(sektorProfili) : null
    const defaultGradient = 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)'

    console.log(`[SEKTÖR PROFİLİ] ${sektorProfili ? `${sektorProfili.id} (${sektorProfili.sektorAdi})` : 'Eşleşme yok, varsayılan kullanılıyor'}`)

    // 5⃣⃣ Tüm placeholder değerleri tek map'te topla
    // Öncelik: esnaf paleti > sektör profili > hard-coded default
    const degerler: Record<string, string> = {
        // İşletme bilgileri
        ISLETME_ADI: esnaf.isletmeAdiTam || esnaf.ad,
        ISLETME_KISAADI: (esnaf.isletmeAdiTam || esnaf.ad).split(' ')[0],
        SEKTOR: esnaf.sektor,
        ILCE: esnaf.ilce || '',
        SEHIR: esnaf.sehir || '',
        TELEFON: temizNumara,
        TELEFON_GOSTERIM: esnaf.telefon || temizNumara,
        WHATSAPP: `90${temizNumara}`,
        ADRES_METNI: adres,
        HARITA_URL: `https://maps.google.com/maps?q=${encodeURIComponent(`${esnaf.isletmeAdiTam || esnaf.ad} ${esnaf.ilce || ''} ${esnaf.sehir || ''}`)}&output=embed`,
        OG_URL: esnaf.subdomainUrl || appUrl,
        WA_MESAJ: encodeURIComponent(`Merhaba, ${esnaf.isletmeAdiTam || esnaf.ad} hakkında bilgi almak istiyorum`),
        // CSS değişkenleri: esnaf paleti > sektör profili > fallback
        CSS_ARKAPLAN: palet?.css?.arkaplan || profilCss?.CSS_ARKAPLAN || '#0f0f0f',
        CSS_KART: palet?.css?.kart || profilCss?.CSS_KART || '#1a1a1a',
        CSS_VURGU: palet?.css?.vurgu || profilCss?.CSS_VURGU || '#c9541e',
        CSS_HOVER: palet?.css?.hover || profilCss?.CSS_HOVER || '#a8441a',
        CSS_METIN: palet?.css?.metin || profilCss?.CSS_METIN || '#f5f1eb',
        CSS_ALT: palet?.css?.altMetin || profilCss?.CSS_ALT || '#94877a',
        CSS_GRADIENT: palet?.css?.gradient || profilCss?.CSS_GRADIENT || defaultGradient,
        // Fontlar
        FONT_BASLIK: palet?.font?.baslik || profilCss?.FONT_BASLIK || 'Syne',
        FONT_METIN: palet?.font?.metin || profilCss?.FONT_METIN || 'Inter',
        // Gemini içerik
        HERO_BASLIK: icerik.heroBaslik,
        HERO_SLOGAN: icerik.heroSlogan,
        HERO_CTA_BIRINCIL: icerik.heroCTABirincil,
        HERO_CTA_IKINCIL: icerik.heroCTAIkincil,
        // HTML parçaları (Gemini JSON'dan render edildi)
        HIZMETLER_HTML: hizmetlerHtmlUret(icerik.hizmetler),
        NEDEN_BIZ_HTML: nedenBizHtmlUret(icerik.nedenBiz),
        YORUMLAR_HTML: yorumlarHtmlUret(yorumlar.length > 0 ? yorumlar : icerik.hizmetler.slice(0, 2).map(h => ({
            yazar: 'Müşteri',
            metin: `${h.ad} hizmetinden çok memnun kaldım. Kesinlikle tavsiye ederim.`,
            yildiz: 5,
            sure: '1 hafta önce',
        }))),
        // SEO
        SEO_BASLIK: icerik.seoBaslik,
        SEO_ACIKLAMA: icerik.seoAciklama,
        // Modül slot'ları
        ...modulSlotDegerleri,
    }

    // 6⃣⃣ Template'i finalize et (placeholder doldur, kullanılmayan slot'ları temizle)
    const html = finalizeTemplate(sablon, degerler)

    if (!html.includes('<html') || !html.includes('</html>')) {
        throw new Error('Template finalize edilemedi — geçersiz HTML')
    }

    // 7⃣⃣ Otomatik QA kontrolü
    const qaRapor = htmlKaliteKontrol(html)
    kaliteRaporuLogla(qaRapor, esnaf.isletmeAdiTam || esnaf.ad)

    console.log(`[TEMPLATE] Final HTML: ${html.length} karakter | QA: ${qaRapor.puan}/100`)
    return html
}
