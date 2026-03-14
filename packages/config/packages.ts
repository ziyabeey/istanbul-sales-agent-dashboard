export interface PackageLimits {
    hasPremiumDomain: boolean;
    hasAiEditor: boolean;
    maxProducts: number;
    hasVoiceAssistant: boolean;
    advancedSeo: boolean;
}

export interface PackageConfig {
    id: string;
    name: string;
    description: string;
    priceMyl: number; // Aylık fiyat
    priceYly: number; // Yıllık Fiyat
    badge?: string;
    features: string[];
    limits: PackageLimits;
}

export const PACKAGES: Record<string, PackageConfig> = {
    temel: {
        id: 'temel',
        name: 'Temel Esnaf',
        description: 'Dijitalde görünür olmak isteyen işletmeler.',
        priceMyl: 499,
        priceYly: 4990,
        features: [
            'SEO Uyumlu Akıllı Site',
            'Sektöre Özel İçerik (Ajan 7)',
            'WhatsApp Randevu/Sipariş Butonu',
            '.kepenk.ai Subdomain'
        ],
        limits: {
            hasPremiumDomain: false,
            hasAiEditor: false,
            maxProducts: 20,
            hasVoiceAssistant: false,
            advancedSeo: false
        }
    },
    buyume: {
        id: 'buyume',
        name: 'Büyüme (Premium)',
        description: 'Profesyonel imaj ve yüksek Google sıralaması.',
        priceMyl: 1499,
        priceYly: 14990,
        badge: 'En Popüler',
        features: [
            'Hediye .COM / .com.tr Alan Adı',
            'AI Destekli Sürükle Bırak Editör',
            'Sınırsız Ürün/Hizmet',
            'Google İşletme (GMB) Entegrasyonu'
        ],
        limits: {
            hasPremiumDomain: true,
            hasAiEditor: true,
            maxProducts: 9999,
            hasVoiceAssistant: false,
            advancedSeo: true
        }
    },
    lider: {
        id: 'lider',
        name: 'Lider (Premium+)',
        description: 'Şehrin en iyisi olmak isteyen, otonom esnaflar.',
        priceMyl: 4999,
        priceYly: 49990,
        features: [
            'Tüm Büyüme Paketi Özellikleri',
            'Otonom Sesli Asistan (Çağrı Karşılama)',
            'Meta Reklam Yönetimi (Otonom CMO)',
            'Premium Temalar'
        ],
        limits: {
            hasPremiumDomain: true,
            hasAiEditor: true,
            maxProducts: 9999,
            hasVoiceAssistant: true,
            advancedSeo: true
        }
    }
}
