/**
 * Esnaf Site Sayfası — Multi-Tenant ISR
 * ─────────────────────────────────────────────────────────────────────────────
 * Middleware tarafından rewrite edilir:
 *   ahmetberber.kepenk.ai → /sites/ahmetberber.kepenk.ai
 *   ahmetberber.com        → /sites/ahmetberber.com
 * 
 * ISR: Sayfa ilk ziyarette Firestore'dan okunur, 24 saat cache'e alınır.
 * Cache Bust: /api/site/publish → revalidateTag('site:{domain}')
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { adminDb } from '@/lib/firebaseAdmin'
import type { Metadata } from 'next'

// ── Domain → Esnaf veri çekme (24 saat ISR cache) ──────────────────────────

interface EsnafSiteVeri {
    esnafId: string
    isletmeAdi: string
    sektor: string
    ilce: string
    telefon: string
    siteHtml: string
    siteJson?: Record<string, any>
    tema?: string
    paket?: string
    domain: string
}

async function esnafBulByDomain(domain: string): Promise<EsnafSiteVeri | null> {
    // 1. Subdomain ile ara (ahmetberber.kepenk.ai → subdomainUrl match)
    let snap = await adminDb
        .collection('esnaflar')
        .where('subdomainUrl', '==', `https://${domain}`)
        .limit(1)
        .get()

    // 2. Custom domain ile ara
    if (snap.empty) {
        snap = await adminDb
            .collection('esnaflar')
            .where('customDomain', '==', domain)
            .limit(1)
            .get()
    }

    // 3. Subdomain slug ile ara (subdomain kısmı = slug)
    if (snap.empty) {
        const slug = domain.replace('.kepenk.ai', '')
        snap = await adminDb
            .collection('esnaflar')
            .where('slug', '==', slug)
            .limit(1)
            .get()
    }

    if (snap.empty) return null

    const doc = snap.docs[0]
    const data = doc.data()

    return {
        esnafId: doc.id,
        isletmeAdi: data.isletmeAdiTam || data.isletmeAdi || data.ad || 'İşletme',
        sektor: data.sektor || '',
        ilce: data.ilce || 'İstanbul',
        telefon: data.telefon || data.waNumarasi || '',
        siteHtml: data.siteHtml || '',
        siteJson: data.siteJson || null,
        tema: data.temaId || 'toprak',
        paket: data.paket || 'TEMEL',
        domain,
    }
}

// ISR cache wrapper — 24 saat (86400 saniye)
const cachedEsnafBul = (domain: string) =>
    unstable_cache(
        () => esnafBulByDomain(domain),
        [`site-data-${domain}`],
        {
            revalidate: 86400, // 24 saat
            tags: [`site:${domain}`], // revalidateTag ile patlatılır
        }
    )()

// ── Dynamic Metadata ───────────────────────────────────────────────────────

interface PageProps {
    params: Promise<{ domain: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { domain } = await params
    const esnaf = await cachedEsnafBul(domain)

    if (!esnaf) {
        return { title: 'Site bulunamadı — kepenk.ai' }
    }

    return {
        title: `${esnaf.isletmeAdi} — ${esnaf.ilce}`,
        description: `${esnaf.isletmeAdi} | ${esnaf.sektor} | ${esnaf.ilce}. kepenk.ai ile oluşturuldu.`,
        openGraph: {
            title: esnaf.isletmeAdi,
            description: `${esnaf.sektor} — ${esnaf.ilce}`,
            type: 'website',
            url: `https://${domain}`,
        },
        robots: { index: true, follow: true },
        alternates: {
            canonical: `https://${domain}`,
        },
    }
}

// ── Sayfa Render ───────────────────────────────────────────────────────────

export default async function EsnafSitePage({ params }: PageProps) {
    const { domain } = await params
    const esnaf = await cachedEsnafBul(domain)

    if (!esnaf) {
        notFound()
    }

    // Site HTML'i doğrudan render et
    if (esnaf.siteHtml) {
        return (
            <html lang="tr">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{esnaf.isletmeAdi} — {esnaf.ilce}</title>
                    <meta name="description" content={`${esnaf.isletmeAdi} | ${esnaf.sektor}`} />
                    <link rel="canonical" href={`https://${domain}`} />
                </head>
                <body
                    dangerouslySetInnerHTML={{ __html: esnaf.siteHtml }}
                    suppressHydrationWarning
                />
            </html>
        )
    }

    // Fallback: site henüz oluşturulmamış
    return (
        <html lang="tr">
            <body style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                fontFamily: 'system-ui, sans-serif',
                background: '#0f0f0f',
                color: '#fff',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏗️ {esnaf.isletmeAdi}</h1>
                    <p style={{ color: '#999' }}>Site hazırlanıyor...</p>
                    <a
                        href="https://kepenk.ai"
                        style={{ color: '#c08552', textDecoration: 'none', fontSize: '0.875rem' }}
                    >
                        kepenk.ai ile oluşturuldu
                    </a>
                </div>
            </body>
        </html>
    )
}
