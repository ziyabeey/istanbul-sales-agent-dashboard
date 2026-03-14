// Cloudflare Pages Direct Upload API
// Her esnaf için ayrı Pages projesi oluşturur ve HTML deploy eder

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID!
const CF_PAGES_TOKEN = process.env.CF_PAGES_TOKEN!
const BASE = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}`

// ── Proje adı oluştur ──────────────────────────────────────────────────────
// "Ahmet Elektrik" → "ahmet-elektrik"
export function slugOlustur(isletmeAdi: string, esnafId: string): string {
    const base = isletmeAdi
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 28)
    return base || esnafId.substring(0, 8)
}

// ── Pages projesi oluştur ──────────────────────────────────────────────────
export async function pagesProjeOlustur(slug: string): Promise<boolean> {
    // Zaten var mı?
    const check = await fetch(`${BASE}/pages/projects/${slug}`, {
        headers: { Authorization: `Bearer ${CF_PAGES_TOKEN}` },
    })
    if (check.ok) return true  // Zaten var

    const res = await fetch(`${BASE}/pages/projects`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${CF_PAGES_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: slug,
            production_branch: 'main',
        }),
    })

    const data = await res.json()
    if (!data.success) {
        throw new Error(`Pages proje oluşturulamadı: ${JSON.stringify(data.errors)}`)
    }
    return true
}

// ── HTML dosyasını deploy et ───────────────────────────────────────────────
export async function htmlDeploy(slug: string, html: string): Promise<string> {
    // Direct Upload — FormData ile tek dosya
    const FormDataNode = (await import('formdata-node')).FormData
    const form = new FormDataNode()

    // manifest.json
    form.set(
        '/manifest.json',
        JSON.stringify({ '/index.html': { hash: Date.now().toString() } }),
        'manifest.json'
    )

    // index.html
    form.set('/index.html', html, 'index.html')

    const res = await fetch(
        `${BASE}/pages/projects/${slug}/deployments`,
        {
            method: 'POST',
            headers: { Authorization: `Bearer ${CF_PAGES_TOKEN}` },
            body: form as any,
        }
    )

    const data = await res.json()
    if (!data.success) {
        throw new Error(`Deploy başarısız: ${JSON.stringify(data.errors)}`)
    }

    // Deploy URL'i döndür
    return data.result?.url ?? `https://${slug}.pages.dev`
}

// ── Özel domain (subdomain) bağla ─────────────────────────────────────────
export async function subdomainBagla(
    slug: string,
    subdomain: string
): Promise<void> {
    // 1. Pages projesine custom domain ekle
    const res = await fetch(
        `${BASE}/pages/projects/${slug}/domains`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${CF_PAGES_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: `${subdomain}.kepenk.ai` }),
        }
    )

    const data = await res.json()
    // Domain zaten ekliyse hata verme
    if (!data.success && !data.errors?.[0]?.message?.includes('already')) {
        throw new Error(`Domain eklenemedi: ${JSON.stringify(data.errors)}`)
    }

    // 2. Cloudflare DNS'te CNAME ekle
    // (mevcut cloudflare.ts'deki fonksiyonu kullan)
    const { cnameEkle } = await import('./cloudflare')
    await cnameEkle(subdomain, `${slug}.pages.dev`)
}

// ── Tam akış: Proje oluştur + Deploy + Domain ─────────────────────────────
export async function siteYayinla(params: {
    esnafId: string
    slug: string
    subdomain: string
    html: string
}): Promise<string> {
    // Local dev modu: CF creds yoksa preview URL dön (HTML Firestore'da zaten saklanıyor)
    if (!process.env.CF_ACCOUNT_ID || !process.env.CF_PAGES_TOKEN) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        console.log(`[CF LOCAL] Cloudflare creds yok — preview modu: ${appUrl}/api/site/preview/${params.esnafId}`)
        return `${appUrl}/api/site/preview/${params.esnafId}`
    }

    const { slug, subdomain, html } = params

    // 1. Proje oluştur (yoksa)
    await pagesProjeOlustur(slug)

    // 2. HTML deploy et
    const deployUrl = await htmlDeploy(slug, html)

    // 3. Subdomain bağla
    await subdomainBagla(slug, subdomain)

    // Kesin URL
    return `https://${subdomain}.kepenk.ai`
}

// ── Mevcut siteyi güncelle ─────────────────────────────────────────────────
export async function siteGuncelle(slug: string, html: string): Promise<void> {
    await htmlDeploy(slug, html)
}
