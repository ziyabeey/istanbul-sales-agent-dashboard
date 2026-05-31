import { notFound } from 'next/navigation'
import SiteClient from './client'
import { adminDb } from '../../lib/firebaseAdmin'

interface PageProps {
  params: Promise<{ domain: string }>
  searchParams: Promise<{ theme?: string }>
}

/**
 * Sites app dynamic route — renders a published site.
 * 
 * Resolution order:
 * 1. ?theme=berber-sade  → Demo mode (loads from template configs)
 * 2. domain → Firestore lookup (TODO: implement when ready)
 * 
 * Middleware rewrites hostname → /[domain], so:
 * - ahmetberber.kepenk.ai → /ahmetberber.kepenk.ai
 * - localhost:3001?site=ahmetberber.kepenk.ai → /ahmetberber.kepenk.ai
 */
export default async function SitePage({ params, searchParams }: PageProps) {
  const { domain } = await params
  const { theme: themeId } = await searchParams

  // ── Mode 1: Theme Demo ──
  // Accessed via ?theme=berber-sade or ?theme=restoran-lezzet
  if (themeId) {
    // Dynamic import to avoid bundling the entire catalog at the page level
    const { getTheme } = await import('@kepenk/templates/catalog')
    const themeDef = getTheme(themeId)
    
    if (!themeDef) {
      return notFound()
    }

    return (
      <SiteClient
        mode="demo"
        themeId={themeId}
        sectorId={themeDef.sectorId}
        seoSchemaType={themeDef.seoSchemaType}
        domain={domain}
      />
    )
  }

  // ── Mode 2: Published Site (Firestore) ──
  let siteData = null
  try {
    // We check customDomain, subdomainUrl, and slug in the esnaflar collection
    const snapshot = await adminDb.collection('esnaflar')
      .where('customDomain', '==', domain)
      .limit(1)
      .get()

    let doc = snapshot.empty ? null : snapshot.docs[0]

    // If not found by customDomain, check subdomain (e.g. ahmetberber.kepenk.ai)
    if (!doc && domain.endsWith('.kepenk.ai')) {
      const slug = domain.replace('.kepenk.ai', '')
      const subSnapshot = await adminDb.collection('esnaflar')
        .where('slug', '==', slug)
        .limit(1)
        .get()
      if (!subSnapshot.empty) doc = subSnapshot.docs[0]
    }

    if (doc) {
      const data = doc.data()
      // Use the new architecture payload if it exists, otherwise fallback to legacy structure
      if (data.siteData && data.siteData.theme && data.siteData.business) {
        return (
          <SiteClient 
            mode="live" 
            siteData={data.siteData} 
            domain={domain} 
          />
        )
      }
    }
  } catch (error) {
    console.error('Error fetching live site:', error)
  }

  // For now, show a helpful landing page
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #0a0a0f, #1a1a2e)',
      color: '#fff', padding: '24px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{
          display: 'inline-flex', padding: '6px 16px', borderRadius: '999px',
          background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)',
          fontSize: '13px', fontWeight: 600, color: '#a78bfa', marginBottom: '32px',
        }}>
          kepenk.ai altyapısı
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800, marginBottom: '16px', lineHeight: 1.1,
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {domain}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
          Bu alan adı kepenk.ai altyapısıyla çalışmaktadır.
          Site henüz yayınlanmamış veya yapılandırılmamış.
        </p>

        <a href="https://kepenk.ai" style={{
          display: 'inline-flex', gap: '8px', alignItems: 'center',
          padding: '14px 28px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
          color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
          boxShadow: '0 4px 24px rgba(124, 58, 237, 0.3)',
          transition: 'transform 0.2s',
        }}>
          kepenk.ai&apos;ı Keşfet →
        </a>
      </div>
    </div>
  )
}

// ISR — cache every 60 seconds for published sites, instant for demos
export const revalidate = 60
