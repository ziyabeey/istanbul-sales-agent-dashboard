import { Timestamp } from 'firebase-admin/firestore';
import { PackageLimits } from '../config/packages';

export interface MerchantData {
    id: string;
    businessName: string;
    sektorId: string;
    packageId: 'temel' | 'buyume' | 'lider';
    siteUrl?: string; // e.g. 'ahmetberber.kepenk.ai' or 'ahmetberber.com'
    customDomain?: string; // If they bought a domain or got one gifted
    createdAt: Timestamp;
    subscriptionEndsAt: Timestamp;
    
    // Status Trackers
    siteStatus: 'pending' | 'generating' | 'active' | 'suspended';
    aiEditorAccess: boolean;
    whatsappBotActive: boolean;
}
