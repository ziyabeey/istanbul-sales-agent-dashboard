/**
 * V2 Publish API — SSR + Cache Bust + Version
 * ─────────────────────────────────────────────────────────────
 * POST /api/site/v2/publish
 * 
 * Body:
 *   - manifest: SiteManifest
 *   - page: PageDocument
 *   - masterPage: MasterPageDocument
 * 
 * Pipeline:
 *   1. Validate inputs
 *   2. Generate static HTML via @kepenk/publish-engine
 *   3. Generate seo files (sitemap, robots)
 *   4. Save V2 data + generated HTML to Firestore
 *   5. Create version snapshot
 *   6. Cache bust (ISR revalidation)
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { generatePageHtml, generateSitemap, generateRobots } from '@kepenk/publish-engine'
import type { SiteManifest, PageDocument, MasterPageDocument, PageRef } from '@kepenk/site-schema'

export async function POST(request: Request) {
    try {
        // ── Auth ──
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
        }

        const body = await request.json()
        const manifest = body.manifest as SiteManifest
        const page = body.page as PageDocument
        const masterPage = body.masterPage as MasterPageDocument

        if (!manifest || !page || !masterPage) {
            return NextResponse.json(
                { error: 'manifest, page ve masterPage gerekli' },
                { status: 400 }
            )
        }

        // ── 1. Find the page ref ──
        const pageRef: PageRef | undefined = manifest.pages.find(
            (p: PageRef) => p.pageId === page.pageId
        )
        if (!pageRef) {
            return NextResponse.json(
                { error: `Page "${page.pageId}" manifest'te bulunamadı` },
                { status: 400 }
            )
        }

        // ── 2. SSR: Generate static HTML ──
        const html = generatePageHtml({
            manifest,
            page,
            pageRef,
            masterPage,
        })

        // ── 3. Generate SEO files ──
        const sitemap = generateSitemap(manifest)
        const robots = generateRobots(manifest)

        // ── 4. Save to Firestore ──
        const esnafRef = adminDb.collection('esnaflar').doc(esnafId)
        const esnafDoc = await esnafRef.get()

        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnafData = esnafDoc.data()!

        // Update manifest's published version
        const updatedManifest = {
            ...manifest,
            publishedVersion: manifest.version,
            updatedAt: new Date().toISOString(),
        }

        const guncelleme: Record<string, any> = {
            sonYayinTarihi: Timestamp.now(),
            sonGuncelleme: Timestamp.now(),
            yayinda: true,
            // V2 data
            'siteV2.manifest': updatedManifest,
            'siteV2.page': page,
            'siteV2.masterPage': masterPage,
            'siteV2.version': manifest.version,
            'siteV2.publishedVersion': manifest.version,
            'siteV2.publishedAt': new Date().toISOString(),
            // Generated HTML (backward compat — ISR pages use this)
            siteHtml: html,
            // SEO
            'siteV2.sitemap': sitemap,
            'siteV2.robots': robots,
        }

        await esnafRef.update(guncelleme)

        // ── 5. Version snapshot ──
        try {
            const versionsRef = esnafRef.collection('versiyonlar')
            await versionsRef.add({
                version: manifest.version,
                manifest: updatedManifest,
                page,
                masterPage,
                html,
                createdAt: Timestamp.now(),
                type: 'v2-publish',
                label: `V2 Yayın — ${new Date().toLocaleString('tr-TR')}`,
            })
        } catch {
            // Version save is best-effort
        }

        // ── 6. ISR Cache Bust ──
        const temizlenenTaglar: string[] = []
        const subdomainUrl = esnafData.subdomainUrl as string | undefined
        const customDomain = esnafData.customDomain as string | undefined
        const slug = esnafData.slug as string | undefined

        if (subdomainUrl) {
            const domain = subdomainUrl.replace('https://', '').replace('http://', '')
            try { revalidateTag(`site:${domain}`, 'default') } catch {}
            temizlenenTaglar.push(domain)
        }
        if (customDomain) {
            try { revalidateTag(`site:${customDomain}`, 'default') } catch {}
            temizlenenTaglar.push(customDomain)
        }
        if (slug) {
            try { revalidateTag(`site:${slug}.kepenk.ai`, 'default') } catch {}
            temizlenenTaglar.push(`${slug}.kepenk.ai`)
        }

        return NextResponse.json({
            ok: true,
            mesaj: 'V2 site başarıyla yayınlandı',
            version: manifest.version,
            htmlSize: html.length,
            temizlenenCache: temizlenenTaglar,
            url: subdomainUrl || (slug ? `https://${slug}.kepenk.ai` : ''),
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Yayınlama başarısız', detay: error.message },
            { status: 500 }
        )
    }
}
