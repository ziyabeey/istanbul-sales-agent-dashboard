/**
 * Cloudflare Registrar API — Domain tescil & domain hediyesi otomasyonu
 *
 * Env: CF_PAGES_TOKEN (mevcut — cloudflarePagesClient.ts ile aynı token)
 *      CF_ACCOUNT_ID  (mevcut)
 */

const CF_API_TOKEN  = process.env.CF_PAGES_TOKEN!
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID!
const REGISTRAR_BASE = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/registrar/domains`

// ── Slug normalize (Türkçe → ASCII) ─────────────────────────────────────────
function slugNormalize(text: string): string {
    return text
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 40)
}

// ── Domain müsaitlik kontrolü ────────────────────────────────────────────────
export async function domainMusaitMi(domain: string): Promise<boolean> {
    if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
        console.log(`[REGISTRAR MOCK] Müsaitlik kontrolü: ${domain}`)
        return true
    }

    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/registrar/domains/search?query=${encodeURIComponent(domain)}`,
            { headers: { Authorization: `Bearer ${CF_API_TOKEN}` } }
        )
        const data = await res.json()
        const sonuc = data.result?.find((d: any) => d.name === domain)
        return sonuc?.available ?? false
    } catch (e: any) {
        console.error('[REGISTRAR] Müsaitlik kontrolü hatası:', e.message)
        return false
    }
}

// ── Domain öner (5 seçenek) ───────────────────────────────────────────────────
export async function domainOner(
    isletmeAdi: string,
    paket: string
): Promise<{ domain: string; musait: boolean }[]> {
    const slug = slugNormalize(isletmeAdi)

    const tldler = paket === 'PREMIUMPLUS'
        ? ['.com', '.com.tr', '.net']
        : ['.com.tr', '.net.tr', '.org.tr']

    const adaylar = [
        slug,
        slug + '-hizmet',
        slug + '-usta',
        slug.replace(/-/g, ''),
        slug + '-istanbul',
    ]

    const sonuclar: { domain: string; musait: boolean }[] = []

    for (const aday of adaylar) {
        for (const tld of tldler) {
            const tam = aday + tld
            const musait = await domainMusaitMi(tam)
            sonuclar.push({ domain: tam, musait })
            if (sonuclar.length >= 6) break
        }
        if (sonuclar.length >= 6) break
    }

    return sonuclar.filter(s => s.musait).slice(0, 5)
}

// ── Domain tescil et ─────────────────────────────────────────────────────────
export async function domainTescilEt(
    domain: string,
    esnaf: any
): Promise<{ basarili: boolean; hata?: string }> {
    if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
        console.log(`[REGISTRAR MOCK] Domain tescil edildi: ${domain}`)
        return { basarili: true }
    }

    try {
        const res = await fetch(REGISTRAR_BASE, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${CF_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: domain,
                registrant_contact: {
                    first_name: esnaf.ad || 'Isletme',
                    last_name:  esnaf.soyad || 'Sahibi',
                    email:      esnaf.email || 'destek@kepenk.ai',
                    phone:      `+90${esnaf.telefonTemiz}`,
                    address: {
                        street1: esnaf.adres || 'İstanbul',
                        city:    esnaf.ilce || 'İstanbul',
                        country: 'TR',
                    },
                },
                auto_renew: false,
                privacy: true,
            }),
        })

        const data = await res.json()
        if (!data.success) {
            return { basarili: false, hata: data.errors?.[0]?.message }
        }
        return { basarili: true }
    } catch (e: any) {
        return { basarili: false, hata: e.message }
    }
}

// ── Domain'i Cloudflare Pages projesine bağla ─────────────────────────────
export async function domainPagesBagla(
    domain: string,
    pagesSlug: string
): Promise<void> {
    if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
        console.log(`[REGISTRAR MOCK] Domain Pages bağlandı: ${domain} → ${pagesSlug}`)
        return
    }

    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${pagesSlug}/domains`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${CF_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: domain }),
        }
    )
    const data = await res.json()
    if (!data.success && !data.errors?.[0]?.message?.includes('already')) {
        throw new Error(`Pages domain bağlanamadı: ${data.errors?.[0]?.message}`)
    }
}

// ── Tam domain hediye akışı ───────────────────────────────────────────────────
export async function domainHediyeAkisi(
    esnafId: string,
    paket: string
): Promise<void> {
    if (!['PREMIUM', 'PREMIUMPLUS'].includes(paket)) return

    const { adminDb } = await import('./firebaseAdmin')
    const { waMesajGonder } = await import('./twilioClient')

    const docRef = adminDb.collection('esnaflar').doc(esnafId)
    const doc    = await docRef.get()
    if (!doc.exists) return

    const esnaf = doc.data()!

    // Zaten domain başlatıldıysa tekrar etme
    if (esnaf.domain?.durum && esnaf.domain.durum !== 'hata') return

    // Domain önerileri üret
    const oneriler = await domainOner(esnaf.isletmeAdiTam || esnaf.isletmeAdi || esnaf.ad, paket)
    if (oneriler.length === 0) return

    // Firestore'a kaydet
    await docRef.update({
        'domain.durum':    'secim_bekleniyor',
        'domain.oneriler': oneriler.map(o => o.domain),
        'domain.paket':    paket,
    })

    const tldBilgisi = paket === 'PREMIUMPLUS' ? '.com veya .com.tr' : '.com.tr'

    await waMesajGonder(
        esnaf.waNumarasi,
        `🎁 *${paket === 'PREMIUMPLUS' ? 'Premium+' : 'Premium'} Paket Hediyeniz: Ücretsiz Domain!*\n\n` +
        `İşletmeniz için ${tldBilgisi} uzantılı bir alan adı *ücretsiz* alıyorsunuz!\n\n` +
        `Sizin için uygun seçenekler:\n` +
        oneriler.map((o, i) => `${i + 1}. ${o.domain}`).join('\n') +
        `\n\nHangi numarayı seçiyorsunuz? (1-${oneriler.length} arası yazın)\n` +
        `Veya farklı bir isim önermek için yazabilirsiniz.\n\n` +
        `Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        esnafId,
        'domain_secim_sor'
    )
}

// ── Sprint 2: DNS Kayıt Yönetimi ─────────────────────────────────────────────
export interface DNSKayit {
    type: 'A' | 'CNAME' | 'TXT' | 'MX'
    name: string
    content: string
    proxied?: boolean
    ttl?: number
}

export async function domainDNSKur(
    zoneId: string,
    kayitlar: DNSKayit[]
): Promise<{ basarili: boolean; hata?: string }> {
    if (!CF_API_TOKEN) {
        console.log(`[DNS MOCK] ${kayitlar.length} DNS kaydı oluşturuldu (zone: ${zoneId})`)
        return { basarili: true }
    }

    try {
        for (const kayit of kayitlar) {
            const res = await fetch(
                `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${CF_API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: kayit.type,
                        name: kayit.name,
                        content: kayit.content,
                        proxied: kayit.proxied ?? true,
                        ttl: kayit.ttl ?? 1,
                    }),
                }
            )
            const data = await res.json()
            if (!data.success && !data.errors?.[0]?.message?.includes('already exists')) {
                return { basarili: false, hata: data.errors?.[0]?.message }
            }
        }
        return { basarili: true }
    } catch (e: any) {
        return { basarili: false, hata: e.message }
    }
}

// ── Sprint 2: Zone ID alma ────────────────────────────────────────────────────
export async function domainZoneIdAl(domain: string): Promise<string | null> {
    if (!CF_API_TOKEN) return 'mock-zone-id'
    try {
        const baseDomain = domain.split('.').slice(-2).join('.')
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/zones?name=${baseDomain}`,
            { headers: { Authorization: `Bearer ${CF_API_TOKEN}` } }
        )
        const data = await res.json()
        return data.result?.[0]?.id || null
    } catch { return null }
}

// ── Sprint 2: SSL Sertifika Durumu ───────────────────────────────────────────
export interface SSLDurum {
    aktif: boolean
    tip: string
    verilis: string | null
    bitis: string | null
}

export async function domainSSLKontrol(zoneId: string): Promise<SSLDurum> {
    if (!CF_API_TOKEN) {
        return { aktif: true, tip: 'Universal (Mock)', verilis: new Date().toISOString(), bitis: null }
    }
    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/ssl/certificate_packs`,
            { headers: { Authorization: `Bearer ${CF_API_TOKEN}` } }
        )
        const data = await res.json()
        const cert = data.result?.[0]
        return {
            aktif: cert?.status === 'active',
            tip: cert?.type || 'Universal',
            verilis: cert?.certificates?.[0]?.created_on || null,
            bitis: cert?.certificates?.[0]?.expires_on || null,
        }
    } catch {
        return { aktif: false, tip: 'Bilinmiyor', verilis: null, bitis: null }
    }
}

// ── Sprint 2: Domain Analitik ─────────────────────────────────────────────────
export interface DomainAnalitik {
    ziyaret: number
    bandwidthMB: number
    tehdit: number
    donem: string
}

export async function domainAnalytikAl(zoneId: string): Promise<DomainAnalitik> {
    if (!CF_API_TOKEN) {
        return { ziyaret: 1247, bandwidthMB: 82.4, tehdit: 0, donem: 'Son 7 gün (mock)' }
    }
    try {
        const since = new Date(Date.now() - 7 * 86400000).toISOString()
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/analytics/dashboard?since=${since}&continuous=true`,
            { headers: { Authorization: `Bearer ${CF_API_TOKEN}` } }
        )
        const data = await res.json()
        const t = data.result?.totals
        return {
            ziyaret: t?.requests?.all ?? 0,
            bandwidthMB: Math.round((t?.bandwidth?.all ?? 0) / 1024 / 1024 * 10) / 10,
            tehdit: t?.threats?.all ?? 0,
            donem: 'Son 7 gün',
        }
    } catch {
        return { ziyaret: 0, bandwidthMB: 0, tehdit: 0, donem: 'Son 7 gün' }
    }
}

// ── Sprint 2: Kapsamlı Domain Durum Kontrolü ──────────────────────────────────
export interface DomainDurum {
    domain: string
    tescil: 'aktif' | 'beklemede' | 'hata' | 'yok'
    dns: 'propagated' | 'pending' | 'hata'
    ssl: SSLDurum
    analitik: DomainAnalitik
}

export async function domainDurumKontrol(domain: string): Promise<DomainDurum> {
    const zoneId = await domainZoneIdAl(domain)

    if (!zoneId) {
        return {
            domain,
            tescil: 'yok',
            dns: 'hata',
            ssl: { aktif: false, tip: 'Yok', verilis: null, bitis: null },
            analitik: { ziyaret: 0, bandwidthMB: 0, tehdit: 0, donem: 'Veri yok' },
        }
    }

    // DNS propagation kontrolü
    let dnsDurum: 'propagated' | 'pending' | 'hata' = 'pending'
    try {
        const dnsRes = await fetch(`https://dns.google/resolve?name=${domain}&type=A`)
        const dnsData = await dnsRes.json()
        dnsDurum = dnsData.Answer?.length ? 'propagated' : 'pending'
    } catch { dnsDurum = 'hata' }

    const [ssl, analitik] = await Promise.all([
        domainSSLKontrol(zoneId),
        domainAnalytikAl(zoneId),
    ])

    return {
        domain,
        tescil: 'aktif',
        dns: dnsDurum,
        ssl,
        analitik,
    }
}
