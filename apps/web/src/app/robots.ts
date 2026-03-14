import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/', /* Esnaf özel alanı indekslenmesin */
                '/admin/',     /* Admin paneli taranmasın */
                '/odeme/',     /* Ödeme adımları arama sonuçlarına girmesin */
                '/api/'        /* API root gizlensin */
            ],
        },
        sitemap: 'https://kepenk.ai/sitemap.xml',
    }
}
