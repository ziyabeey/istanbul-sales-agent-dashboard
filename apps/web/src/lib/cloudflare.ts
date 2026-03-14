/**
 * Cloudflare DNS API — Subdomain yönetimi
 * CF_API_TOKEN ve CF_ZONE_ID env değişkenleri yoksa mock modda çalışır.
 */
export async function subdomainEkle(slug: string): Promise<boolean> {
    const token = process.env.CF_API_TOKEN
    const zoneId = process.env.CF_ZONE_ID

    if (!token || !zoneId) {
        console.log(`[CF MOCK] DNS eklenecekti: ${slug}.kepenk.ai`)
        return true
    }

    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'CNAME',
                    name: slug,
                    content: 'kepenk.ai',
                    proxied: true,
                    ttl: 1,
                }),
            }
        )
        const data: any = await res.json()
        if (!data.success) {
            console.error(`[CF DNS HATA] ${slug}.kepenk.ai:`, data.errors)
            return false
        }
        console.log(`[CF] DNS eklendi: ${slug}.kepenk.ai`)
        return true
    } catch (e: any) {
        console.error('[CF HATA]', e.message)
        return false
    }
}

export async function cnameEkle(name: string, content: string): Promise<boolean> {
    const token = process.env.CF_API_TOKEN
    const zoneId = process.env.CF_ZONE_ID

    if (!token || !zoneId) {
        console.log(`[CF MOCK] CNAME eklenecekti: ${name} -> ${content}`)
        return true
    }

    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'CNAME',
                    name: name,
                    content: content,
                    proxied: true,
                    ttl: 1,
                }),
            }
        )
        const data: any = await res.json()
        if (!data.success) {
            console.error(`[CF DNS HATA] ${name} -> ${content}:`, data.errors)
            return false
        }
        console.log(`[CF] CNAME eklendi: ${name} -> ${content}`)
        return true
    } catch (e: any) {
        console.error('[CF HATA]', e.message)
        return false
    }
}

export async function subdomainSil(slug: string): Promise<boolean> {
    const token = process.env.CF_API_TOKEN
    const zoneId = process.env.CF_ZONE_ID

    if (!token || !zoneId) {
        console.log(`[CF MOCK] DNS silinecekti: ${slug}.kepenk.ai`)
        return true
    }

    try {
        // Önce kaydı bul
        const listRes = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${slug}.kepenk.ai`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        const listData: any = await listRes.json()
        const record = listData.result?.[0]
        if (!record) return true

        // Kaydı sil
        await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`,
            { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
        )
        return true
    } catch (e: any) {
        console.error('[CF SİLME HATA]', e.message)
        return false
    }
}
