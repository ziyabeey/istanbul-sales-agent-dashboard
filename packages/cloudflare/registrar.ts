export interface DomainContact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface PurchaseResult {
    id: string;
    domain: string;
    status: string;
    created_at: string;
}

export interface RegisteredDomain {
    id: string;
    name: string;
    status: string;
    expires_at: string;
    auto_renew: boolean;
}

export class CloudflareRegistrar {
    private base = 'https://api.cloudflare.com/client/v4';
    private accountId = process.env.CF_ACCOUNT_ID!;
    private token = process.env.CF_API_TOKEN!;

    private async fetch(endpoint: string, method: string = 'GET', body?: any) {
        if (!this.accountId || !this.token) {
            console.warn('[CloudflareRegistrar] Eksik CF_ACCOUNT_ID veya CF_API_TOKEN');
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

    // Domain müsaitlik kontrolü
    async checkAvailability(domain: string): Promise<{
        available: boolean;
        price: number;
        currency: string;
        premium: boolean;
    }> {
        const res = await this.fetch(
            `/accounts/${this.accountId}/registrar/domains/${domain}`
        );
        // Eğer endpoint hata dönerse veya kayıtlıysa available: false
        if (!res.success || !res.result) {
            return { available: false, price: 0, currency: 'USD', premium: false };
        }
        
        return {
            available: res.result.available ?? false,
            price: res.result.price ?? 0,
            currency: 'USD',
            premium: res.result.premium ?? false,
        };
    }

    // Domain satın alma (hediye akışı)
    async purchaseDomain(params: {
        domain: string;
        years: number;          // genellikle 1
        esnafId: string;
        contact: DomainContact;   // ICANN zorunlu
    }): Promise<PurchaseResult | null> {
        const res = await this.fetch(
            `/accounts/${this.accountId}/registrar/domains`,
            'POST',
            {
                name: params.domain,
                years: params.years,
                type: 'new',
                auto_renew: false,     // esnaf kendisi yönetecek
                privacy: true,         // WHOIS gizliliği (ücretsiz Cloudflare özelliği)
                registrant_contact: params.contact,
                admin_contact: params.contact,
                tech_contact: params.contact,
                billing_contact: params.contact,
            }
        );

        if (!res.success) {
            console.error(`[CloudflareRegistrar] ${params.domain} satın alınamadı:`, res.errors);
            throw new Error(`Cloudflare API Hatası: ${res.errors?.[0]?.message}`);
        }

        return res.result;
    }

    // Domain yenileme
    async renewDomain(domain: string, years: number = 1): Promise<boolean> {
        const res = await this.fetch(
            `/accounts/${this.accountId}/registrar/domains/${domain}/renew`,
            'POST',
            { years }
        );
        return res.success;
    }

    // Transfer (esnaf başka kayıt kuruluşundan getirirse)
    async initTransfer(domain: string, authCode: string): Promise<boolean> {
        const res = await this.fetch(
            `/accounts/${this.accountId}/registrar/domains/${domain}/transfer`,
            'POST',
            { auth_code: authCode }
        );
        return res.success;
    }

    // Mevcut domain listesi
    async listDomains(): Promise<RegisteredDomain[]> {
        const res = await this.fetch(`/accounts/${this.accountId}/registrar/domains`);
        return res.success ? res.result : [];
    }
}
