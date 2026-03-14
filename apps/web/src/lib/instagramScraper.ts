export interface InstagramProfil {
    username: string
    varMi: boolean
    takipci: number | null
    gonderiSayisi: number | null
    sonGonderiGunu: number | null  // kaç gün önce
    biyografi: string | null
    telefonVar: boolean
    adresVar: boolean
    linkVar: boolean
}

export async function instagramProfilAl(
    username: string
): Promise<InstagramProfil> {
    const bos: InstagramProfil = {
        username, varMi: false, takipci: null, gonderiSayisi: null,
        sonGonderiGunu: null, biyografi: null,
        telefonVar: false, adresVar: false, linkVar: false
    }

    // Public embed endpoint (API key gerektirmez)
    try {
        const res = await fetch(
            `https://www.instagram.com/${username}/?__a=1&__d=dis`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
                },
                signal: AbortSignal.timeout(8000),
            }
        )

        if (!res.ok) return bos

        const data = await res.json()
        const user = data?.graphql?.user || data?.data?.user

        if (!user) return bos

        const biyografi = user.biography || ''
        const takipci = user.edge_followed_by?.count ?? null
        const gonderiSayisi = user.edge_owner_to_timeline_media?.count ?? null

        // Son gönderi tarihi
        const ilkGonderi = user.edge_owner_to_timeline_media?.edges?.[0]
        const sonGonderiTimestamp = ilkGonderi?.node?.taken_at_timestamp
        const sonGonderiGunu = sonGonderiTimestamp
            ? Math.floor((Date.now() / 1000 - sonGonderiTimestamp) / 86400)
            : null

        return {
            username,
            varMi: true,
            takipci,
            gonderiSayisi,
            sonGonderiGunu,
            biyografi,
            telefonVar: /(\+90|0[0-9]{10}|[0-9]{3}[\s-][0-9]{3})/.test(biyografi),
            adresVar: /(cad\.|sok\.|mah\.|istanbul|ankara)/i.test(biyografi),
            linkVar: !!user.external_url,
        }

    } catch (error) {
        console.log(`[IG] ${username} profil alınamadı:`, error)
        return bos
    }
}

export function instagramKalitePuanHesapla(
    profil: InstagramProfil
): number {
    if (!profil.varMi) return 25  // Hesap yok = büyük fırsat

    let puan = 0

    if (profil.sonGonderiGunu === null || profil.sonGonderiGunu > 30) puan += 15
    if ((profil.takipci || 0) < 500) puan += 8
    if (!profil.telefonVar) puan += 4
    if (!profil.adresVar) puan += 3
    if ((profil.gonderiSayisi || 0) < 10) puan += 5

    return Math.min(puan, 30)
}

// Google Places'tan Instagram username bulmaya çalış
export async function instagramUsernameBul(
    isletmeAdi: string,
    ilce: string
): Promise<string | null> {
    const slug = isletmeAdi
        .toLowerCase()
        .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ı/g, 'i')
        .replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')

    const ilceSlug = ilce.toLowerCase()
        .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ı/g, 'i')
        .replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '')

    const adaylar = [
        slug,
        `${slug}_${ilceSlug}`,
        slug.replace(/_/g, ''),
        `${slug.replace(/_/g, '')}official`,
    ]

    for (const aday of adaylar) {
        const profil = await instagramProfilAl(aday)
        if (profil.varMi) return aday
        await new Promise(r => setTimeout(r, 500)) // rate limit
    }

    return null
}
