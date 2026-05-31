/**
 * POST /api/ai/editor-command
 * ─────────────────────────────────────────────────────────────
 * Processes natural-language editor commands and returns
 * partial SiteData updates for the site builder.
 *
 * Uses Gemini Flash for fast, cheap inference.
 */

import { NextResponse } from 'next/server'
import { geminiCalistir } from '@/lib/geminiClient'

interface EditorCommandRequest {
  command: string
  siteData: Record<string, any>
  esnafId?: string
}

const SYSTEM_PROMPT = `Sen Türkiye'deki küçük işletmeler (KOBİ'ler) için gelişmiş bir web sitesi editör asistanısın.
Kullanıcı sitesi üzerinde değişiklik yapmak istiyor. Sana gönderilen mevcut site verisi yeni nesil mimariye sahiptir (ThemeConfig ve BusinessData yapısı).
Senin görevin kullanıcının isteğini analiz edip, SADECE değişmesi gereken alanları JSON formatında (partial update) döndürmektir.

Veri Yapısı (siteData):
- \`business\`: İşletme bilgileri (name, ownerName, slogan, phone, email, address vb.)
- \`theme\`: Tema tasarımı ve ayarları (isDark, cssVariables, fonts, vb.)
  - \`cssVariables\`: Renk paleti (örn: '--color-bg', '--color-text', '--color-primary')

Kurallar:
1. SADECE JSON formatında yanıt dön. Başka hiçbir açıklama yazma.
2. Yalnızca kullanıcının isteğiyle değişen alanları JSON içinde gönder. 
   Örn: Sadece arkaplan rengi değişecekse JSON'da sadece \`{"theme": {"cssVariables": {"--color-bg": "#000000"}}}\` olsun.
3. Renk isteklerinde birbiriyle uyumlu, modern HEX kodları kullan.
4. Font isteklerinde Google Fonts'ta bulunan, Türkçe destekli popüler fontları öner (örn: 'Inter', 'Playfair Display').
5. Kullanıcı işletme adı vb. bilgileri değiştirmek isterse \`business\` objesi altında gönder.
6. Yanıtında "message" alanına Türkçe, kısa, samimi bir başarı mesajı yaz.

Yanıt Formatı (SADECE JSON):
{
  "siteDataUpdate": {
    "theme": { ... },
    "business": { ... }
  },
  "message": "Kullanıcıya gösterilecek kısa açıklama"
}`

export async function POST(request: Request) {
  try {
    const body: EditorCommandRequest = await request.json()
    const { command, siteData } = body

    if (!command || !siteData) {
      return NextResponse.json(
        { error: 'command ve siteData zorunlu' },
        { status: 400 }
      )
    }

    const userPrompt = `Mevcut site verisi:
${JSON.stringify(siteData, null, 2)}

Kullanıcı komutu: "${command}"

Bu komuta göre değişmesi gereken alanları JSON olarak döndür.`

    const result = await geminiCalistir(
      'gemini-3-flash-preview',
      SYSTEM_PROMPT,
      userPrompt,
      { thinkingLevel: 'low', maxOutputTokens: 1024 }
    )

    // Parse JSON response
    const cleaned = result
      .replace(/^```json\s*/i, '')
      .replace(/```\s*$/, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    return NextResponse.json({
      ok: true,
      message: parsed.message || 'Degisiklik uygulandi.',
      siteDataUpdate: parsed.siteDataUpdate || {},
    })
  } catch (error: any) {
    // Return a graceful fallback instead of 500
    // so the client can use its simulation fallback
    console.error('[editor-command] Error:', error.message)
    return NextResponse.json(
      { error: error.message || 'AI isleme hatasi' },
      { status: 500 }
    )
  }
}
