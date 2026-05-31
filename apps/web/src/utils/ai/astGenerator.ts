import { geminiCalistir } from '@/lib/geminiClient'
import { themeConfigSchema } from './astSchema'

export async function generateAstSiteData(esnaf: any, yorumlar: any[]): Promise<any> {
  const isBuyumeOrMore = ['BUYUME', 'PREMIUM', 'PREMIUMPLUS'].includes(esnaf.paket)
  const isPremium = ['PREMIUM', 'PREMIUMPLUS'].includes(esnaf.paket)

  const prompt = `
Aşağıdaki esnaf (küçük/yerel işletme) için yüksek kaliteli bir website ThemeConfig objesi üret.
Üreteceğin yapı tam bir Headless WaaS (Website-as-a-Service) mimarisi için BlockNode (AST) ağacı olacaktır.

ESNAF BİLGİLERİ:
Ad: ${esnaf.isletmeAdiTam || esnaf.ad}
Sektör: ${esnaf.sektor}
İlçe/Şehir: ${esnaf.ilce || ''} / ${esnaf.sehir || ''}
Paket Seviyesi: ${esnaf.paket || 'TEMEL'}

TASARIM İLKELERİ:
- Seçilen sektöre uygun ("${esnaf.sektor}") estetik bir renk paleti oluştur (cssVariables).
- isDark özelliği duruma göre true/false olabilir.
- designTokens objesinde modern değerler kullan (spacing, radius, shadow).
- "pages" dizisinde sadece bir adet "Ana Sayfa" olsun.
- "sections" dizisi içerisinde Hero, Hakkımızda, Hizmetler ve İletişim bloklarını BlockTree yapısıyla (Box, Flex, Grid vb.) tasarla.
- Hero bölümünde asimetrik bir layout veya büyük typography, dikkat çekici CTA (Call to Action) butonları ekle.
- "Typography" blokları için 'content' alanına SEO uyumlu, sektörel ve çekici gerçek Türkçe metinler yaz.
- "dynamicContentPath" alanını BİLEREK kullanma; tüm metinleri "content" özelliğinde doldur.

LÜTFEN SADECE İSTENİLEN ŞEMAYA UYGUN JSON DÖNDÜR.
`

  // Use Gemini 1.5 Pro because AST generation requires high reasoning and strict schema following.
  const rawResponse = await geminiCalistir(
    'gemini-3.1-pro-preview',
    'Sen dünyanın en iyi UI/UX Tasarımcısı ve Frontend Geliştiricisisin. İstenen JSON formatında muazzam estetik, Tailwind ve modern UI prensiplerine uygun (Bento Box, Glassmorphism vb.) AST ağaçları tasarlarsın.',
    prompt,
    {
      thinkingLevel: 'low',
      maxOutputTokens: 8192,
      responseSchema: themeConfigSchema
    }
  )

  let jsonData = {}
  try {
    const jsonStr = rawResponse
        .replace(/\`\`\`json\n?/g, '')
        .replace(/\`\`\`\n?/g, '')
        .trim()
    jsonData = JSON.parse(jsonStr)
  } catch (error) {
    console.error('[AST GENERATOR] JSON Parse Hatası:', error)
    throw new Error('Yapay zeka geçerli bir AST JSON üretemedi.')
  }

  return jsonData
}
