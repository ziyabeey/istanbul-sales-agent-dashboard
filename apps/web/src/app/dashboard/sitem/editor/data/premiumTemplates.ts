/**
 * Premium+ Templates Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps Premium+ sectors to their hand-crafted HTML templates in /public/demos/
 * Provides text substitution for brand name, phone, address etc.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface PremiumTemplate {
    id: string
    ad: string
    dosya: string          // Path relative to /public/demos/
    markaAdi: string       // Original brand name to replace
    markaAlt: string       // Original subtitle/tagline to replace
    sektor: string         // Matching sector category
    emoji: string
}

export const PREMIUM_TEMPLATES: PremiumTemplate[] = [
    {
        id: 'premium-kuafor',
        ad: 'Luxe Kuaför',
        dosya: 'premium-kuafor.html',
        markaAdi: 'Luxe Studio',
        markaAlt: 'Premium Kuaför ve Güzellik Salonu',
        sektor: 'kuafor',
        emoji: '✂️',
    },
    {
        id: 'premium-plus-cafe',
        ad: 'AURA Cafe',
        dosya: 'premium-plus-cafe.html',
        markaAdi: 'AURA',
        markaAlt: 'Premium Coffee Roastery',
        sektor: 'kafe',
        emoji: '☕',
    },
    {
        id: 'premium-plus-architecture',
        ad: 'MAISON Mimarlık',
        dosya: 'premium-plus-architecture.html',
        markaAdi: 'MAISON FLUIDITÉ',
        markaAlt: 'Luxury Architecture',
        sektor: 'mimar-tasarimci',
        emoji: '🏛️',
    },
    {
        id: 'premium-plus-fashion',
        ad: 'NOIR Moda',
        dosya: 'premium-plus-fashion.html',
        markaAdi: 'NOIR ÉTERNEL',
        markaAlt: 'Editorial Luxury',
        sektor: 'moda',
        emoji: '👗',
    },
    {
        id: 'premium-plus-jewelry',
        ad: 'AURORA Kuyumcu',
        dosya: 'premium-plus-jewelry.html',
        markaAdi: 'AURORA',
        markaAlt: 'Maison de Haute Joaillerie',
        sektor: 'kuyumcu',
        emoji: '💎',
    },
    {
        id: 'premium-plus-cyber',
        ad: 'NEXUS Siber Güvenlik',
        dosya: 'premium-plus-cyber.html',
        markaAdi: 'NEXUS',
        markaAlt: 'AI Cyber Security Infrastructure',
        sektor: 'teknoloji',
        emoji: '🛡️',
    },
    {
        id: 'premium-plus-ajans',
        ad: 'İLERİ Dijital Ajans',
        dosya: 'premium-plus-ajans.html',
        markaAdi: 'İLERİ Dijital',
        markaAlt: 'Dijital Tasarım Butik Ajansı',
        sektor: 'dijital-ajans',
        emoji: '🎨',
    },
]

/**
 * Apply text substitution to premium template HTML.
 * Replaces brand names and common patterns.
 */
export function premiumIkame(
    html: string,
    template: PremiumTemplate,
    siteData: {
        isletmeAdi: string
        telefon: string
        adres: string
        heroBaslik?: string
        bg?: string
        accent?: string
        text?: string
        font?: string
    }
): string {
    let result = html

    // Replace brand name (case-insensitive for title tags too)
    result = result.replace(new RegExp(escapeRegex(template.markaAdi), 'gi'), siteData.isletmeAdi)

    // Replace subtitle/tagline
    if (siteData.heroBaslik && template.markaAlt) {
        result = result.replace(new RegExp(escapeRegex(template.markaAlt), 'gi'), siteData.heroBaslik)
    }

    // Replace phone number patterns (Turkish format)
    if (siteData.telefon) {
        result = result.replace(/(\+90\s?)?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}/g, siteData.telefon)
    }

    // Replace generic address
    if (siteData.adres) {
        result = result.replace(/İstanbul,?\s*(Türkiye|Turkey)/gi, `${siteData.adres}, Türkiye`)
    }

    // ── CSS Theme Override Injection ──
    // Inject CSS variable overrides for bg, accent, text, font
    const cssOverrides: string[] = []
    if (siteData.bg) cssOverrides.push(`--bg: ${siteData.bg} !important; --background: ${siteData.bg} !important;`)
    if (siteData.accent) cssOverrides.push(`--accent: ${siteData.accent} !important; --primary: ${siteData.accent} !important; --accent-color: ${siteData.accent} !important;`)
    if (siteData.text) cssOverrides.push(`--text: ${siteData.text} !important; --color: ${siteData.text} !important; --text-color: ${siteData.text} !important;`)
    
    if (cssOverrides.length > 0 || siteData.font) {
        const fontCss = siteData.font 
            ? `body, h1, h2, h3, h4, h5, h6, .hero h1, .hero-title, [class*="title"], [class*="heading"] { font-family: '${siteData.font}', serif !important; }`
            : ''
        const fontLink = siteData.font
            ? `<link href="https://fonts.googleapis.com/css2?family=${siteData.font.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`
            : ''
        const themeStyle = `
${fontLink}
<style id="kepenk-theme-override">
  :root { ${cssOverrides.join(' ')} }
  ${siteData.bg ? `body { background: ${siteData.bg} !important; background-color: ${siteData.bg} !important; }` : ''}
  ${siteData.text ? `body { color: ${siteData.text} !important; }` : ''}
  ${fontCss}
</style>`
        // Insert before </head>
        if (result.includes('</head>')) {
            result = result.replace('</head>', themeStyle + '\n</head>')
        } else {
            result = themeStyle + result
        }
    }

    return result
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Find a matching premium template for given sector.
 */
export function premiumSablonBul(sektorId: string): PremiumTemplate | null {
    return PREMIUM_TEMPLATES.find(t => t.sektor === sektorId) || null
}
