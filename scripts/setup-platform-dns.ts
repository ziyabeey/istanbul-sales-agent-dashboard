/**
 * Kepenk Platform Subdomain DNS Setup
 * 
 * Bu script edit.kepenk.ai ve app.kepenk.ai CNAME kayıtlarını
 * Cloudflare API üzerinden oluşturur.
 * 
 * Kullanım:
 *   npx tsx scripts/setup-platform-dns.ts
 * 
 * Gerekli env değişkenleri:
 *   CF_API_TOKEN  — Cloudflare API Bearer Token
 *   CF_ZONE_ID    — kepenk.ai Zone ID
 */

const CF_API_TOKEN = process.env.CF_API_TOKEN
const CF_ZONE_ID = process.env.CF_ZONE_ID

if (!CF_API_TOKEN || !CF_ZONE_ID) {
    console.error('❌ CF_API_TOKEN ve CF_ZONE_ID env değişkenleri gerekli!')
    console.error('   CF_API_TOKEN=xxx CF_ZONE_ID=yyy npx tsx scripts/setup-platform-dns.ts')
    process.exit(1)
}

const BASE = 'https://api.cloudflare.com/client/v4'

interface DNSRecord {
    type: string
    name: string
    content: string
    proxied: boolean
    ttl: number
    comment?: string
}

async function cfFetch(endpoint: string, method = 'GET', body?: any) {
    const res = await fetch(`${BASE}${endpoint}`, {
        method,
        headers: {
            'Authorization': `Bearer ${CF_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    })
    return res.json() as Promise<any>
}

async function recordExists(name: string): Promise<boolean> {
    const res = await cfFetch(`/zones/${CF_ZONE_ID}/dns_records?name=${name}.kepenk.ai`)
    return res.success && res.result?.length > 0
}

async function createCNAME(record: DNSRecord): Promise<boolean> {
    // Check if already exists
    const exists = await recordExists(record.name)
    if (exists) {
        console.log(`⏭  ${record.name}.kepenk.ai zaten mevcut, atlandı`)
        return true
    }

    const res = await cfFetch(`/zones/${CF_ZONE_ID}/dns_records`, 'POST', record)
    if (res.success) {
        console.log(`✅ ${record.name}.kepenk.ai → ${record.content} (proxied: ${record.proxied})`)
        return true
    } else {
        console.error(`❌ ${record.name}.kepenk.ai oluşturulamadı:`, res.errors)
        return false
    }
}

async function main() {
    console.log('🌐 Kepenk Platform DNS Kurulumu')
    console.log('================================\n')

    const records: DNSRecord[] = [
        {
            type: 'CNAME',
            name: 'edit',
            content: 'kepenk.ai',
            proxied: true,
            ttl: 1,
            comment: 'Kepenk Site Editörü — edit.kepenk.ai',
        },
        {
            type: 'CNAME',
            name: 'app',
            content: 'kepenk.ai',
            proxied: true,
            ttl: 1,
            comment: 'Kepenk Dashboard — app.kepenk.ai',
        },
        {
            type: 'CNAME',
            name: 'api',
            content: 'kepenk.ai',
            proxied: true,
            ttl: 1,
            comment: 'Kepenk API — api.kepenk.ai',
        },
    ]

    let success = 0
    for (const record of records) {
        const ok = await createCNAME(record)
        if (ok) success++
    }

    console.log(`\n📊 Sonuç: ${success}/${records.length} kayıt oluşturuldu`)
    
    if (success === records.length) {
        console.log('\n🎉 Tüm DNS kayıtları hazır!')
        console.log('\n📋 Erişim URL\'leri:')
        console.log('   • edit.kepenk.ai  → Site Editörü')
        console.log('   • app.kepenk.ai   → Dashboard')
        console.log('   • api.kepenk.ai   → API')
        console.log('\n⏱  DNS yayılması 1-5 dakika sürebilir (Cloudflare Proxied).')
    }
}

main().catch(console.error)
