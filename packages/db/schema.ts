import { Timestamp } from 'firebase-admin/firestore';

export interface DomainSchema {
    esnafId: string;
    domain: string; // 'ahmetberber.com'
    type: 'subdomain' | 'custom' | 'gift';
    registrar: 'cloudflare' | 'external';
    cfRegistrarId?: string;
    status: 'pending' | 'active' | 'failed' | 'expiring' | 'expired';
    autoRenew: boolean;
    registeredAt: Timestamp;
    expiresAt: Timestamp;
    giftedByKepenk: boolean;
    cost_usd?: number; // Kepenk için gerçek maliyet (gifted ise)
    renewalReminders: number[]; // gün bazlı [90, 30, 7, 1]
}

export interface EsnafSchema {
    id: string;
    businessName: string;
    sektor: string;
    city: string;
    phone: string;
    address: string;
    // Diğer alanlar SPRINT ilerledikçe buraya eklenecek
}
