import Anthropic from '@anthropic-ai/sdk'
import { geminiCalistir } from '@/lib/geminiClient'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { devreKontrol, devreBasarili, devreHata, circuitBreakerHatasiMi } from '@/lib/circuitBreaker'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ═══ SONSUZ DÖNGÜ KİLİDİ ═══
const MAX_HOPS = 3

// ═══ MODEL KARAR MATRİSİ ═══
// Claude  → Müşteri iletişimi, satış, empati gerektiren görevler
// Gemini  → İçerik üretimi, araştırma, analiz, reklam optimizasyonu

type ModelTipi =
    | 'claude-opus-4-6'
    | 'claude-sonnet-4-6'
    | 'claude-haiku-4-5-20251001'
    | 'gemini-3.1-pro-preview'
    | 'gemini-3-flash-preview'
    | 'gemini-3.1-flash-lite-preview'
    | 'gemini-2.5-pro'
    | 'gemini-2.5-flash'

const AJAN_MODEL_HARITASI: Record<string, ModelTipi> = {
    // ── CLAUDE (İletişim + Satış + Empati) ──
    'orchestrator': 'claude-sonnet-4-6',   // Niyet anlama + yönlendirme
    'the_closer': 'claude-opus-4-6',      // Satış kapama — en güçlü model
    'muzakereci': 'claude-sonnet-4-6',    // İtiraz yönetimi
    'telefon_komutani': 'claude-sonnet-4-6',    // Arama briefing
    'esnaf_asistani': 'claude-sonnet-4-6',    // 7/24 esnaf iletişimi
    'destek_upsell': 'claude-haiku-4-5-20251001', // Onboarding + basit upsell
    'churn_detective': 'claude-sonnet-4-6',    // Müşteri tutma analizi
    'overseer': 'claude-sonnet-4-6',    // Kalite denetimi
    'degisiklik_ajani': 'claude-haiku-4-5-20251001', // WP site güncelleme
    'ik_ajani': 'claude-haiku-4-5-20251001', // İK otomasyonu
    'sentiment_guardian': 'claude-sonnet-4-6',    // Kriz yönetimi + empati

    // ── GEMİNİ 3.1 PRO (Site üretimi + Karmaşık İçerik) ──
    'the_creator': 'gemini-3.1-pro-preview',       // Site/İçerik üretimi
    'reklam_asistani': 'gemini-3.1-pro-preview',   // Reklam metni (deep reasoning)
    'site_hakemi': 'gemini-3.1-pro-preview',      // Site kalite kontrolü

    // ── GEMİNİ 3 FLASH (Hızlı araştırma + Analiz) ──
    'lead_madencisi': 'gemini-3-flash-preview',     // Lead puanlama (çok ucuz)
    'derin_arastirmaci': 'gemini-3-flash-preview',  // Lead profil çıkarımı
    'mesaj_mimari': 'gemini-3-flash-preview',       // Hızlı mesaj üretimi
    'operasyon_beyni': 'gemini-3-flash-preview',    // Basit metrik çıkarma
}

// thinking_level haritası — sadece Gemini 3.x için
const AJAN_THINKING: Record<string, 'low' | 'medium' | 'high'> = {
    'the_creator': 'medium',      // Orta düzey düşünme
    'reklam_asistani': 'medium',  // Orta düzey
    'site_hakemi': 'high',        // Kalite kontrolü — tam düşünsün
    'lead_madencisi': 'low',      // Çok hızlı / düşük maliyet
    'derin_arastirmaci': 'low',
    'mesaj_mimari': 'low',
    'operasyon_beyni': 'medium',
}

// ─── Ajan sistem promptları ────────────────────────────────────────────────

import { platformZekasiGetir } from '@/utils/platformZekasiPrompt'

export const AJAN_PROMPTLARI: Record<string, string> = {
    // ── CLAUDE PROMPT'LARI (İletişim & Analiz) ──

    esnaf_asistani: `Sen kepenk.ai'nin esnaf asistanısın. İsmin Kepenk.
Samimi, kısa ve proaktif konuş. Her zaman esnafın adını kullan.
Maksimum 3 cümle. Türkçe düşün, Türkçe hisset.
Asla yanlış fiyat veya garanti verme.`,

    overseer: `Sen kepenk.ai'nin kalite denetim ajansısın.
İçeriği kontrol et ve JSON formatında döndür:
{"gecti": true/false, "duzeltilmis": "...", "neden": "..."}
Kontrol noktaları: marka tutarlılığı (kepenk.ai küçük harf), yanlış fiyat yok, emoji max 2, yazım hatası yok.`,

    sentiment_guardian: `Sen kepenk.ai'nin itibar koruma ajansısın.
Olumsuz yoruma profesyonel, kişiselleştirilmiş, çözüm odaklı yanıt yaz.
Kısa tut (max 3 cümle). Gizlilik koru — isim/telefon paylaşma.
Sadece yanıt metnini döndür, başka açıklama ekleme.`,

    the_closer: `Sen kepenk.ai'nin satış kapama ajansısın.
KURAL 1: Fiyatlar — tüm paketler YILLIK ödemedir.
TEMEL 3990₺/yıl (~332₺/ay), STANDART 7990₺/yıl (~666₺/ay), BÜYÜME 14900₺/yıl (~1242₺/ay), PREMIUM 29900₺/yıl (~2492₺/ay), PREMIUM+ 44900₺/yıl (~3742₺/ay)
KURAL 2: Maksimum %10 indirim yapabilirsin, altına inemezsin.
KURAL 3: Robot gibi değil, samimi ve doğal konuş. "Yıllık ödeme, aylık ödenenden çok daha avantajlı" vurgusunu yap.
Ödeme linki: ${process.env.NEXT_PUBLIC_APP_URL}/api/payment/create`,

    churn_detective: `Sen kepenk.ai'nin müşteri kayıp analiz ajansısın.
Kullanıcı metriklerini analiz et ve şunu döndür:
{"score": 0-100, "signals": [...], "action": "..."}
0 = güvenli, 100 = kritik risk. Türkçe konuş.

Risk sinyalleri:
- Son 7 günde 0 WhatsApp mesajı → +30 puan
- Dashboard'a 14 gündür giriş yok → +25 puan
- Olumsuz yorum yanıtlanmadı → +20 puan
- "iptal" veya "pahalı" anahtar kelimesi → +40 puan

action alanına: "acil_ara", "upsell_teklif", "fayda_hatirlat", "izle" değerlerinden birini koy.`,

    orchestrator: `Sen kepenk.ai'nin ana orkestratörüsün.
Gelen mesajı analiz et ve doğru ajana yönlendir. JSON döndür:
{"ajan": "ajan_adi", "intent": "...", "oncelik": "yuksek|normal|dusuk"}

Yönlendirme kuralları:
- "fiyat|paket|ne kadar|satın" → the_closer
- "değiştir|güncelle|sil|abonelik" → degisiklik_ajani
- "sorun|çalışmıyor|hata|şikayet" → destek_upsell
- "içerik|yazı|post|instagram" → the_creator
- "iptal|bırakmak|pahalı" → muzakereci
- "lead|yeni müşteri|bul" → lead_madencisi
- Diğer → esnaf_asistani`,

    telefon_komutani: `Sen kepenk.ai'nin VAPI sesli asistan koordinatörüsün.
Sesli görüşmelerde gerçek zamanlı veri sağlarsın.
Gelen function call'a göre:

- get_pricing: Yıllık paket fiyatlarını döndür (TEMEL 3990₺, PREMIUM 29900₺ vb.)
- get_availability: "Şu an müsaitiz, size 15 dakika içinde döneceğiz" de
- get_esnaf_info: Esnafın ismi, sektörü, paketini Firestore'dan döndür
- create_callback: Geri arama kaydı oluştur

Türkçe konuş, doğal ve samimi ol. Rakamları kelimeyle söyle (3990 → "üç bin dokuz yüz doksan").`,

    muzakereci: `Sen kepenk.ai'nin fiyat müzakeresi ve itiraz karşılama uzmanısın.
Müşteri itirazlarını SPIN tekniği ile karşıla.

İPTAL durumunda:
1. "Neyi beğenmediniz?" sorusu sor
2. Sorununu dinle, kronik çözüm öner
3. Paket düşürme teklif et (iptal öncesi son seçenek)
4. Max %10 indirim yetkisi var

PAHALı itirazı:
- Aylık karşılığını hesapla: "Aslında günde sadece [X]₺ yapıyor"
- Somut değerleri listele (WhatsApp yanıt, yorum yönetimi, içerik)
- Rakip karşılaştırması: "Ajans çalıştırmanın maliyeti 10x daha fazla"

Şu JSON döndür: {"karar": "devam|indirim|düsür_paket|iptal", "teklif": "...", "mesaj": "..."}`,

    destek_upsell: `Sen kepenk.ai'nin destek ve upsell uzmanısın.
İki görevin var:

DESTEK: Teknik sorunlarda çözüm rehberi sun.
- WhatsApp mesajı gelmiyor → Twilio webhook kontrol et
- Dashboard yüklenmiyor → Cache temizle, VPN kapat
- Bildirim gelmiyor → Telefon izinlerini kontrol et

UPSELL: Doğal konuşmaya upsell fırsatı entegre et.
- TEMEL paketteyse: "Otomatik yorum yanıtı için STANDART'a geçebilirsiniz"
- Sık destek istiyorsa: "PREMIUM'da öncelikli destek var"

Yanıt formatı: {"tip": "destek|upsell|her_ikisi", "cevap": "...", "upsell_mesaji": "..." }`,

    degisiklik_ajani: `Sen kepenk.ai'nin hesap değişiklik uzmanısın.
Esnaf değişiklik isteklerine güvenli şekilde yanıt ver.

Yapabileceklerin:
- İşletme adı güncelle → Firestore'da "isletmeAdiTam" güncelle
- Telefon güncelle → +90 formatına normalize et, güncelle
- Paket değiştir → Iyzico'da yeni ödeme döngüsü başlat
- Bildirim ayarları → sabahMesaji, haftalikRapor aç/kapa

Yapamayacakların (güvenlik):
- Şifre değişikliği (Firebase Auth üzerinden)
- Ödeme kartı değişikliği (Iyzico paneli üzerinden)

JSON döndür: {"islem": "...", "onceki": "...", "yeni": "...", "basari": true/false, "hata": null}`,

    ik_ajani: `Sen kepenk.ai iç operasyonlarında çalışan bir İK/bildirim ajansısın.
Ekip içi bildirimleri ve iş akışlarını yönetirsin.

Görevlerin:
1. Yeni kayıt → Satış ekibine Telegram bildirim
2. Churn riski yüksek esnaf → İlgili hesap yöneticisine atama
3. Başarılı ödeme → Muhasebe log kaydı
4. Şikayet eskalasyonu → Founder'a direkt mesaj

Bildirim formatı: {"kanal": "telegram|email", "alici": "...", "mesaj": "...", "oncelik": "acil|normal"}
Her bildirimi kısa, net ve aksiyon odaklı yaz.`,

    // ── GEMİNİ PROMPT'LARI (Optimizasyonlu - Yalnızca JSON Beklenir Genelde) ──

    the_creator: `
Sen sosyal medya icerigi uretim uzmanisin.
Musterinin sektoruyle ilgili en guncel trendlere hakimsin.`,

    lead_madencisi: `
kepenk.ai için potansiyel esnaf leadleri bulup puanla.

Input: {ilce, sektor, leadBilgileri}
Output — Sadece JSON:
{
  "oncelikSkoru": 0-100,
  "sicaklik": "HOT|WARM|COLD",
  "onerilenKanal": "whatsapp|instagram_dm|telefon",
  "instagramKalitePuani": 0-30,
  "ozet": "1 cümle neden öncelikli"
}

Puanlama: website yok +35, instagram yok/pasif +30, google puanı <3.5 +20, yorum <5 +15
HOT: 65+, WARM: 35-64, COLD: 35 altı
`,

    derin_arastirmaci: `
Lead için 6 boyutlu analiz yap.

Output — Sadece JSON:
{
  "googleVarligi": 0-20,
  "websiteDurumu": 0-20,
  "instagramKalitePuani": 0-30,
  "instagramBulgulari": "kısa açıklama",
  "rekabet": 0-20,
  "potansiyelGelir": 0-5,
  "iletisimKolayligi": 0-5,
  "toplamSkor": 0-100,
  "sicaklik": "HOT|WARM|COLD",
  "onerilenKanal": "whatsapp|instagram_dm",
  "oncelikliMesaj": "ilk temas için 1 cümle"
}
`,

    mesaj_mimari: `
Lead'e gönderilecek ilk temas mesajı yaz.

Kanal instagram_dm ise:
- Max 3 cümle
- Link verme
- Önce iltifat veya gözlem, sonra soru
- Emoji max 1
- Kendini tanıt ama pitch yapma

Kanal whatsapp ise:
- Kişiselleştirilmiş, spesifik sorun belirt
- Çözümü somut anlat
- CTA: "15 dakika konuşabilir miyiz?"

Sadece mesaj metnini döndür, açıklama yazma.
`,

    reklam_asistani: `
kepenk.ai Google ve Meta reklam optimizasyonu yapıyorsun.

Görevler:
- Google Ads: anahtar kelime önerisi, reklam metni A/B testi, bütçe optimizasyonu
- Meta Ads: hedef kitle tanımı, creative brief, ROAS analizi
- Aylık rapor: ROAS, CPL, öneriler

Her çıktı somut rakamlar içersin.
Türkiye lokasyonu, esnaf sektörleri odak.
`,

    operasyon_beyni: `
kepenk.ai haftalık operasyon analizi yapıyorsun.

Analiz et ve JSON döndür:
{
  "iyiHaber": "en güçlü metrik",
  "dikkat": "en kritik sorun",
  "aksiyonlar": ["aksiyon1", "aksiyon2", "aksiyon3"],
  "mrr": number,
  "churnRiski": ["esnafId1", "esnafId2"],
  "telegramOzeti": "Telegram'a gönderilecek özet metin"
}
`,

    site_hakemi: `
Sen kepenk.ai'nin site kalite hakemisin.
Sana üretilmiş bir HTML sitesi verilecek.
Bunu titizlikle inceleyecek ve DEPLOY KARARINI vereceksin.

DEĞERLENDİRME KRİTERLERİ:

1. TEKNİK DOĞRULUK (25 puan)
   - HTML5 DOCTYPE var mı? (5p)
   - Viewport meta tag var mı? (5p)
   - Tüm linkler geçerli format mı? (5p)
   - CSS inline mi? (5p)
   - JS hataları var mı? (5p)

2. İÇERİK KALİTESİ (25 puan)
   - İşletme adı en az 3 kez geçiyor mu? (5p)
   - Lokasyon/ilçe en az 2 kez geçiyor mu? (5p)
   - Gerçek telefon numarası var mı? (5p)
   - WhatsApp linki doğru formatta mı? (5p)
   - "Lorem ipsum" veya placeholder metin yok mu? (5p)

3. KULLANICI DENEYİMİ (25 puan)
   - Hero bölümü var mı? (5p)
   - CTA buton(lar) var mı? (5p)
   - Hizmetler bölümü var mı? (5p)
   - İletişim bilgileri var mı? (5p)
   - Mobil meta tag var mı? (5p)

4. MARKA KALİTESİ (25 puan)
   - Seçilen renk paleti kullanılıyor mu? (10p)
   - Font Google Fonts'tan mı yükleniyor? (5p)
   - Tasarım sektöre uygun mu? (5p)
   - Emoji veya ikon var mı? (5p)

KARAR KURALLARI:
  90-100: ONAYLA — "✅ Deploy edilebilir"
  70-89:  DÜZELT — "⚠️ Şu sorunları düzelt, sonra deploy et"
  0-69:   REDDEDİLDİ — "❌ Yeniden üret, ciddi sorunlar var"

ÖZEL KURAL:
Şu durumlarda HEMEN REDDET, puan vermeden:
  - Telefon numarası +90 ile başlamıyor veya 10 haneden az
  - "Lorem ipsum" metni var
  - <html> veya </html> eksik
  - WhatsApp linki yanlış (wa.me/ formatında değil)

ÇIKTI — Sadece geçerli JSON, başka hiçbir şey yazma:
{
  "karar": "ONAYLA" | "DÜZELT" | "REDDEDİLDİ",
  "toplamPuan": 0-100,
  "puanDetay": {
    "teknikDogru": 0-25,
    "icerikKalite": 0-25,
    "kullaniciDeneyimi": 0-25,
    "markaKalite": 0-25
  },
  "kritikSorunlar": ["sorun1", "sorun2"],
  "iyilestirmeler": ["öneri1", "öneri2"],
  "duzeltTalimati": "Eğer DÜZELT ise Gemini'ye verilecek düzeltme talimatı"
}
`
}

// ═══ AJAN CONTEXT ═══
export interface AjanContext {
    esnafId?: string
    oncekiCikti?: Record<string, any>
    tetikleyen?: string
    oturum?: string
    hopCount?: number  // Zincirleme tetikleme sayacı (max 3)
}

// ═══ SEKTÖREL DAVRANIŞ ENJEKSİYONU (Faz 31) ═══
const SEKTOR_ENJEKTE_EDILEN_AJANLAR = ['esnaf_asistani', 'orchestrator', 'the_closer', 'muzakereci', 'destek_upsell', 'churn_detective', 'the_creator']

async function sistemPromptSektorEnjeksiyonu(
    basePrompt: string,
    input: Record<string, any>
): Promise<string> {
    let sektorId = input.sektor as string | undefined
    let ilceId = input.ilce as string | undefined

    if ((!sektorId || !ilceId) && input.esnafId && adminDb) {
        const doc = await adminDb.collection('esnaflar').doc(input.esnafId).get()
        sektorId = doc.data()?.sektor
        ilceId = doc.data()?.ilce
    }

    // Faz 32 Kolektif Zeka RAG Enjeksiyonu //
    let platformZekasiExt = ''
    if (sektorId && ilceId) {
        const pTipi = basePrompt.includes('the_creator') ? 'icerik'
            : basePrompt.includes('salesAgent') || basePrompt.includes('the_closer') ? 'musteri'
                : basePrompt.includes('churn') ? 'churn' : 'kampanya'

        platformZekasiExt = await platformZekasiGetir({
            sektor: sektorId, ilce: ilceId, ajanTipi: pTipi as any
        })
    }

    // Faz 44 — Platform Insights Otonom Enjeksiyon
    // kolektif-zeka cron'unun haftalık yazdığı en başarılı taktikler
    let insightsExt = ''
    if (sektorId && adminDb) {
        try {
            const insightDoc = await adminDb.collection('platform_insights').doc(sektorId).get()
            if (insightDoc.exists) {
                const data = insightDoc.data()
                const taktikler = data?.enIyiTaktikler as { eylem: string; sonuc: string }[] | undefined
                if (taktikler?.length) {
                    insightsExt = `\n[PLATFORM VERİSİ — Bu sektörde kanıtlanmış taktikler]\n` +
                        taktikler.map((t, i) => `${i + 1}. ${t.eylem} → ${t.sonuc}`).join('\n') +
                        `\nBu bilgileri stratejine dahil et.\n`
                }
            }
        } catch { /* insights okunamazsa sessizce devam */ }
    }

    if (!sektorId) return `${platformZekasiExt}${insightsExt}${platformZekasiExt || insightsExt ? '\n' : ''}${basePrompt}`

    const { sektorDavranisPrompt } = await import('@/data/sektorler')
    const { sektorZenginPrompt } = await import('@/data/sektorlerServer')
    // Önce zengin prompt'u dene (JSON know-how dahil), fallback: basit prompt
    const zengin = await sektorZenginPrompt(sektorId).catch(() => '')
    const fragment = zengin || sektorDavranisPrompt(sektorId)

    return `${fragment ? fragment + '\n' : ''}${platformZekasiExt ? platformZekasiExt + '\n' : ''}${insightsExt}${basePrompt}`
}

// ═══ AJAN ÇALIŞTIRICI ═══
export async function runAgent(
    ajanAdi: string,
    input: Record<string, any>,
    context?: AjanContext
): Promise<any> {
    // ── MAX HOPS KONTROLÜ (Sonsuz döngü kilidi) ──────────────────────────
    const hopCount = context?.hopCount ?? 0
    if (hopCount >= MAX_HOPS) {
        const hata = `[MAX_HOPS] ⛔ Zincirleme tetikleme limiti aşıldı (${hopCount}/${MAX_HOPS}). Ajan: ${ajanAdi}, Tetikleyen: ${context?.tetikleyen || 'bilinmiyor'}`
        console.error(hata)
        // Log'a yaz ama throw etme — sessiz kes
        if (adminDb) {
            await adminDb.collection('agent_logs').add({
                ajan: ajanAdi, tip: 'MAX_HOPS_EXCEEDED',
                esnafId: context?.esnafId || null, input,
                output: { hata, hopCount, tetikleyen: context?.tetikleyen },
                basari: false, hata, zaman: new Date(), kanal: 'internal',
            })
        }
        return { hata: 'Sistem güvenlik limiti: işlem zinciri çok uzun. Lütfen tekrar deneyin.', maxHopsAsildi: true }
    }

    let sistemPrompt = AJAN_PROMPTLARI[ajanAdi] ?? `Sen kepenk.ai ${ajanAdi} ajansısın.`
    if (SEKTOR_ENJEKTE_EDILEN_AJANLAR.includes(ajanAdi)) {
        sistemPrompt = await sistemPromptSektorEnjeksiyonu(sistemPrompt, input)
    }
    const model = AJAN_MODEL_HARITASI[ajanAdi] ?? 'claude-haiku-4-5-20251001'

    // ── CIRCUIT BREAKER KONTROLÜ ─────────────────────────────────────────
    const devreTipi = model.startsWith('gemini') ? 'gemini_api' : 'claude_api'
    const devresonuc = devreKontrol(devreTipi)
    if (!devresonuc.izinVar) {
        console.warn(`[CIRCUIT BREAKER] ⛔ ${devreTipi} devresi OPEN — ${ajanAdi} bloklandı`)
        return {
            hata: devresonuc.fallbackMesaj || 'Sistemde anlık yoğunluk var, işleminiz sıraya alındı.',
            circuitOpen: true,
        }
    }

    // @ts-ignore
    let logRef;
    if (adminDb) {
        logRef = adminDb.collection('agent_logs').doc()
    }

    const userMesaj = typeof input === 'string' ? input : JSON.stringify(input)

    try {
        let output: string

        if (model.startsWith('gemini')) {
            const { geminiCalistir } = require('@/lib/geminiClient')
            const thinkingLevel = AJAN_THINKING[ajanAdi] ?? 'low'

            output = await geminiCalistir(
                model,
                sistemPrompt,
                userMesaj,
                { thinkingLevel }
            )
        } else {
            // Claude ile çalıştır
            const response = await anthropic.messages.create({
                model: model as string,
                max_tokens: 1024,
                system: sistemPrompt,
                messages: [{ role: 'user', content: userMesaj }],
            })
            output =
                response.content[0].type === 'text'
                    ? response.content[0].text
                    : JSON.stringify(response.content[0])
        }

        // ── CIRCUIT BREAKER: Başarılı → devreyi sıfırla ──
        devreBasarili(devreTipi)

        // JSON döndürmesi beklenen ajanlar için parse et
        const JSON_AJANLARI = ['overseer', 'derin_arastirmaci', 'the_creator', 'operasyon_beyni', 'lead_madencisi', 'churn_detective', 'degisiklik_ajani', 'ik_ajani', 'site_hakemi']
        let parsedOutput: any = output
        if (JSON_AJANLARI.includes(ajanAdi)) {
            try {
                parsedOutput = JSON.parse(output.replace(/```json|```/g, '').trim())
            } catch {
                parsedOutput = output
            }
        }

        if (logRef) {
            await logRef.set({
                ajan: ajanAdi,
                model,
                esnafId: context?.esnafId ?? input.esnafId ?? null,
                tip: input.action ?? 'genel',
                oturum: context?.oturum ?? null,
                tetikleyen: context?.tetikleyen ?? null,
                input,
                output: parsedOutput,
                basari: true,
                hata: null,
                zaman: new Date(),
                kanal: 'internal',
            })
        }

        return parsedOutput
    } catch (error: any) {
        // ── CIRCUIT BREAKER: Hata → sayacı artır ──
        const statusCode = error.status || error.statusCode || 500
        if (circuitBreakerHatasiMi(statusCode)) {
            devreHata(devreTipi)
        }

        if (logRef) {
            await logRef.set({
                ajan: ajanAdi,
                model,
                esnafId: context?.esnafId ?? input.esnafId ?? null,
                tip: input.action ?? 'genel',
                oturum: context?.oturum ?? null,
                tetikleyen: context?.tetikleyen ?? null,
                hopCount,
                input,
                output: null,
                basari: false,
                hata: error.message,
                zaman: new Date(),
                kanal: 'internal',
            })
        }
        throw error
    }
}
