/**
 * AI Prompt Templates — Structured prompts for kepenk.ai V2 editor AI tasks.
 * All prompts output Turkish text optimized for esnaf (small business) sites.
 */

/* ═══════ System Prompts ═══════ */

export const SYSTEM_PROMPTS = {
  /** Base context for all site-related AI tasks */
  siteEditor: `Sen kepenk.ai platformunun AI site editörüsün. Türk esnafları (küçük işletmeler) için profesyonel, SEO-uyumlu web sitesi içeriği üretiyorsun.

KURALLAR:
- Tüm çıktılar Türkçe olmalı
- Samimi ama profesyonel bir ton kullan
- SEO anahtar kelimelerini doğal şekilde yerleştir
- Kısa, etkileyici cümleler kur
- Emoji kullanma (sadece istenirse)
- İşletmenin sektörüne uygun terminoloji kullan`,

  /** For text rewriting tasks */
  textRewriter: `Sen profesyonel bir Türkçe metin editörüsün. Verilen metni, belirtilen yönergeye göre yeniden yaz.

KURALLAR:
- Anlamı koru, ifadeyi geliştir
- SEO dostu anahtar kelimeler ekle
- Doğal, akıcı Türkçe kullan
- Hedef kitleye uygun ton seç`,

  /** For section generation */
  sectionGenerator: `Sen kepenk.ai'nin bölüm oluşturucu AI'ısın. İşletme bilgilerine göre web sitesi bölümleri oluşturuyorsun. Çıktını MUTLAKA geçerli JSON formatında ver.`,

  /** For SEO optimization */
  seoOptimizer: `Sen bir SEO uzmanısın. Türk yerel işletmeleri için Google Arama optimizasyonu yapıyorsun. Çıktını MUTLAKA geçerli JSON formatında ver.

ODAK ALANLARI:
- Yerel SEO (şehir, ilçe, semt bazlı)
- Google My Business uyumu
- Meta tag optimizasyonu
- Structured data (JSON-LD)`,

  /** For FAQ generation */
  faqGenerator: `Sen müşteri hizmetleri uzmanısın. İşletmenin sektörüne göre sık sorulan sorular ve cevapları oluştur. Çıktını MUTLAKA geçerli JSON dizisi formatında ver.`,
}

/* ═══════ User Prompt Templates ═══════ */

export function buildRewritePrompt(
  originalText: string,
  instruction: string,
  context: { businessName: string; sector: string }
): string {
  return `İşletme: ${context.businessName}
Sektör: ${context.sector}

ORİJİNAL METİN:
"${originalText}"

YÖNERGE: ${instruction}

Lütfen metni yönergeye göre yeniden yaz. Sadece yeni metni döndür, başka açıklama ekleme.`
}

export function buildSectionPrompt(
  sectionType: string,
  context: {
    businessName: string
    sector: string
    slogan?: string
    services?: string[]
    address?: string
    phone?: string
  }
): string {
  return `Aşağıdaki işletme bilgilerine göre "${sectionType}" bölümü için içerik oluştur.

İŞLETME BİLGİLERİ:
- Ad: ${context.businessName}
- Sektör: ${context.sector}
${context.slogan ? `- Slogan: ${context.slogan}` : ''}
${context.services?.length ? `- Hizmetler: ${context.services.join(', ')}` : ''}
${context.address ? `- Adres: ${context.address}` : ''}
${context.phone ? `- Telefon: ${context.phone}` : ''}

JSON formatında döndür:
{
  "heading": "Bölüm başlığı (max 60 karakter)",
  "subheading": "Alt başlık (max 120 karakter)",
  "bodyText": "Ana metin (2-4 cümle, SEO dostu)",
  "ctaText": "CTA buton metni (max 20 karakter)",
  "items": ["madde 1", "madde 2", "madde 3"]
}`
}

export function buildSEOPrompt(
  pageTitle: string,
  pageContent: string,
  context: { businessName: string; sector: string; city?: string }
): string {
  return `Aşağıdaki sayfa için SEO optimizasyonu öner.

${context.city ? `Şehir: ${context.city}` : ''}
İşletme: ${context.businessName}
Sektör: ${context.sector}
Sayfa: ${pageTitle}

İÇERİK ÖZETİ:
${pageContent.substring(0, 500)}

JSON formatında döndür:
{
  "title": "Optimize edilmiş sayfa başlığı (50-60 karakter)",
  "description": "Meta açıklama (120-160 karakter)",
  "keywords": ["anahtar", "kelime", "listesi"],
  "h1Suggestion": "H1 başlık önerisi",
  "improvements": ["İyileştirme önerisi 1", "İyileştirme önerisi 2"]
}`
}

export function buildFAQPrompt(
  context: { businessName: string; sector: string; services?: string[] }
): string {
  return `${context.businessName} (${context.sector}) işletmesi için 5 adet sık sorulan soru ve cevap oluştur.

${context.services?.length ? `Hizmetler: ${context.services.join(', ')}` : ''}

JSON dizisi formatında döndür:
[
  { "question": "Soru metni?", "answer": "Cevap metni (2-3 cümle)" },
  ...
]`
}

export function buildImprovePrompt(
  originalText: string,
  goal: 'more-engaging' | 'more-professional' | 'seo-friendly' | 'shorter' | 'longer',
  context: { businessName: string; sector: string }
): string {
  const goalMap = {
    'more-engaging': 'daha etkileyici ve dikkat çekici',
    'more-professional': 'daha profesyonel ve kurumsal',
    'seo-friendly': 'SEO dostu anahtar kelimelerle zenginleştirilmiş',
    'shorter': 'daha kısa ve öz',
    'longer': 'daha detaylı ve açıklayıcı',
  }

  return `İşletme: ${context.businessName} (${context.sector})

ORİJİNAL METİN:
"${originalText}"

Bu metni ${goalMap[goal]} hale getir. Sadece yeni metni döndür.`
}
