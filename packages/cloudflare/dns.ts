export interface DNSRecord {
    type: string;
    name: string;
    content: string;
    proxied: boolean;
    ttl: number;
}

export class CloudflareDNS {
    private base = 'https://api.cloudflare.com/client/v4';
    private zoneId = process.env.CF_ZONE_ID!; // kepenk.ai ana zone'u (subdomainler için)
    private token = process.env.CF_API_TOKEN!;

    private async fetch(endpoint: string, method: string = 'GET', body?: any) {
        if (!this.token) {
            console.warn('[CloudflareDNS] Eksik CF_API_TOKEN');
            return { result: null, success: false };
        }

        const res = await fetch(`${this.base}${endpoint}`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        });
        return res.json();
    }

    // DNS Kaydı Ekleme
    private async addRecord(targetZoneId: string, record: DNSRecord): Promise<boolean> {
        const res = await this.fetch(`/zones/${targetZoneId}/dns_records`, 'POST', record);
        if (!res.success) {
            console.error(`[CloudflareDNS] DNS Kaydı eklenemedi (${record.name}):`, res.errors);
        }
        return res.success;
    }

    // DNS Kayıtlarını Listeleme
    async listRecords(filter: { name: string }): Promise<any[]> {
        if (!this.zoneId) return [];
        const res = await this.fetch(`/zones/${this.zoneId}/dns_records?name=${encodeURIComponent(filter.name)}`);
        return res.success ? (res.result as any[]) : [];
    }

    // esnaf subdomain'i oluştur (onboarding'de)
    async createEsnafSubdomain(slug: string): Promise<void> {
        if (!this.zoneId) throw new Error("CF_ZONE_ID tanımşsız");
        
        // ahmetboyaci -> CNAME -> Firebase Hosting (veya kepenk-sites Clound Run URL)
        await this.addRecord(this.zoneId, {
            type: 'CNAME',
            name: slug,
            content: 'kepenk-sites.web.app', // Değiştirilebilir: Next.js Multi-tenant hostu
            proxied: true,   // Cloudflare proxy (SSL + CDN + DDoS)
            ttl: 1,          // Auto
        });
    }

    // Satın alınan veya dışarıdan gelen custom domain'i platforma bağla
    async connectCustomDomain(customZoneId: string, domain: string, target: string): Promise<void> {
        // domain.com -> Cloud Run (sites servisi)
        await this.addRecord(customZoneId, { type: 'CNAME', name: '@', content: target, proxied: true, ttl: 1 });
        await this.addRecord(customZoneId, { type: 'CNAME', name: 'www', content: target, proxied: true, ttl: 1 });
    }

    // Cache temizle (site güncellenince)
    async purgeCache(urls: string[]): Promise<void> {
        if (!this.zoneId) return;
        await this.fetch(`/zones/${this.zoneId}/purge_cache`, 'POST', { files: urls });
    }

    // Firestore: slug çakışma kontrolü (Canlı DNS üzerinden garanti doğrulama)
    async isSlugTaken(slug: string): Promise<boolean> {
        const records = await this.listRecords({ name: `${slug}.kepenk.ai` }); // Ana domain bazlı arama
        return records.length > 0;
    }
}
