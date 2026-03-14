export interface SiteStats {
    pageviews: number;
    visitors: number;
    topPages: { url: string; views: number }[];
    countries: { country: string; visitors: number }[];
}

export class CloudflareAnalytics {
    private base = 'https://api.cloudflare.com/client/v4';
    private accountId = process.env.CF_ACCOUNT_ID!;
    private token = process.env.CF_API_TOKEN!;

    // Esnaf sitesi ziyaretçi verileri (ücretsiz Analytics API üzerinden GraphQL sorgusu)
    async getSiteStats(slug: string, days = 30): Promise<SiteStats> {
        // Not: Gerçek Cloudflare Analytics API GraphQL kullanır, burada arayüz standartlaştırılmıştır.
        // İleride GraphQL isteği entegre edilebilir. Şimdilik mock dönülebilir veya basit HTTP kullanılabilir.
        
        // Örnek boş dönüş - Bu alan GraphQL query implementation'ı geldiğinde doldurulacak
        return { 
            pageviews: 1200, 
            visitors: 850, 
            topPages: [{ url: '/', views: 900 }, { url: '/hizmetler', views: 300 }], 
            countries: [{ country: 'Turkey', visitors: 800 }, { country: 'Germany', visitors: 50 }] 
        };
    }
}
