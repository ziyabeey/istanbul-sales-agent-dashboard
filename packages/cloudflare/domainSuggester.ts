import { CloudflareRegistrar } from './registrar';

function generateSlug(text: string): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '')           // Boşlukları sil
        .replace(/[^\w\-]+/g, '')      // Harf, rakam ve tire dışındakileri sil
        .replace(/\-\-+/g, '-')        // Fazla tireleri teke indir
        .replace(/^-+/, '')            // Baştaki tireyi sil
        .replace(/-+$/, '');           // Sondaki tireyi sil
}

function tr_normalize(text: string): string {
    const charMap: { [key: string]: string } = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };
    return text.replace(/[çğıöşüÇĞİÖŞÜ]/g, match => charMap[match]).toLowerCase();
}

// sectors.ts içerisindeki sektör kelimelerinin basitleştirilmiş hali
const SECTOR_KEYWORDS: Record<string, string> = {
    'restoran': 'kafe',
    'berber': 'berber',
    'kuafor': 'kuafor',
    'klinik': 'klinik',
    'spor': 'gym',
    // Varsayılan boş bırakılırsa kelime eklenmez
};

export interface DomainSuggestion {
    domain: string;
    price: number;
}

export async function suggestDomains(esnaf: { businessName: string; city: string; sektor: string }, registrar: CloudflareRegistrar): Promise<DomainSuggestion[]> {
    const slug = generateSlug(tr_normalize(esnaf.businessName));
    const city = generateSlug(tr_normalize(esnaf.city));
    const sektorKeyword = SECTOR_KEYWORDS[esnaf.sektor] || '';

    const candidates = [
        `${slug}.com`,
        `${slug}.com.tr`,
        sektorKeyword ? `${slug}${sektorKeyword}.com` : `${slug}online.com`,
        city ? `${slug}${city}.com` : `${slug}app.com`,
        sektorKeyword ? `${sektorKeyword}${slug}.com.tr` : `${slug}dijital.com.tr`,
    ].filter(Boolean); // Boş olanları filtrele

    // Paralel müsaitlik sorgusu
    const results = await Promise.allSettled(
        candidates.map(d => registrar.checkAvailability(d))
    );

    return results
        .filter((r): r is PromiseFulfilledResult<{ available: boolean; price: number }> => 
            r.status === 'fulfilled' && r.value.available
        )
        .map((r, i) => ({ 
            domain: candidates[i], 
            price: r.value.price 
        }))
        .slice(0, 4); // En iyi 4 öneri
}
