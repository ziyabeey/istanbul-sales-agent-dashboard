import { RenkPaleti } from '@/types'

export const RENK_PALETLERI: RenkPaleti[] = [
    // ── KOYU TEMALAR ──────────────────────────────────────────────────────────

    {
        id: 'gece-mavisi',
        ad: 'Gece Mavisi',
        aciklama: 'Güçlü, modern, teknolojik',
        onizleme: ['#0f172a', '#3b82f6', '#f8fafc'],
        css: {
            arkaplan: '#0f172a',
            kart: '#1e293b',
            vurgu: '#3b82f6',
            metin: '#f8fafc',
            altMetin: '#94a3b8',
            hover: '#2563eb',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        },
        font: { baslik: 'Oswald', metin: 'Inter' },
        karakter: 'Elektrikçi, teknisyen, güvenlik sistemleri',
    },
    {
        id: 'koyu-kirmizi',
        ad: 'Ateş Kırmızısı',
        aciklama: 'Enerjik, güven veren, dikkat çekici',
        onizleme: ['#1a0a0a', '#dc2626', '#fef2f2'],
        css: {
            arkaplan: '#1a0a0a',
            kart: '#2d1212',
            vurgu: '#dc2626',
            metin: '#fef2f2',
            altMetin: '#fca5a5',
            hover: '#b91c1c',
            gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3b0a0a 100%)',
        },
        font: { baslik: 'Bebas Neue', metin: 'Roboto' },
        karakter: 'Tesisatçı, inşaat, acil servis',
    },
    {
        id: 'zeytin-altin',
        ad: 'Zeytin & Altın',
        aciklama: 'Geleneksel, kaliteli, ustalık',
        onizleme: ['#1c1a10', '#d4a017', '#fdf8ed'],
        css: {
            arkaplan: '#1c1a10',
            kart: '#2a2614',
            vurgu: '#d4a017',
            metin: '#fdf8ed',
            altMetin: '#d6c88a',
            hover: '#b8860b',
            gradient: 'linear-gradient(135deg, #1c1a10 0%, #2d2b18 100%)',
        },
        font: { baslik: 'Playfair Display', metin: 'Lora' },
        karakter: 'Terzi, mobilyacı, antikacı, usta zanaatkarlar',
    },
    {
        id: 'derin-yesil',
        ad: 'Orman Yeşili',
        aciklama: 'Doğal, güvenilir, organik',
        onizleme: ['#0a1a0f', '#16a34a', '#f0fdf4'],
        css: {
            arkaplan: '#0a1a0f',
            kart: '#14291a',
            vurgu: '#16a34a',
            metin: '#f0fdf4',
            altMetin: '#86efac',
            hover: '#15803d',
            gradient: 'linear-gradient(135deg, #0a1a0f 0%, #1a3320 100%)',
        },
        font: { baslik: 'Nunito', metin: 'Inter' },
        karakter: 'Eczane, sağlık, organik ürün, çevre dostu hizmet',
    },

    // ── AÇIK TEMALAR ──────────────────────────────────────────────────────────

    {
        id: 'krem-pastel',
        ad: 'Krem & Gül',
        aciklama: 'Zarif, şık, feminen',
        onizleme: ['#fdf6f0', '#e91e8c', '#2d1b35'],
        css: {
            arkaplan: '#fdf6f0',
            kart: '#ffffff',
            vurgu: '#e91e8c',
            metin: '#1a0a1a',
            altMetin: '#6b4c6b',
            hover: '#c2185b',
            gradient: 'linear-gradient(135deg, #fdf6f0 0%, #fce4ec 100%)',
        },
        font: { baslik: 'Playfair Display', metin: 'Lato' },
        karakter: 'Kuaför, güzellik salonu, çiçekçi, moda',
    },
    {
        id: 'okyanus-beyaz',
        ad: 'Okyanus & Beyaz',
        aciklama: 'Temiz, profesyonel, ferah',
        onizleme: ['#f0f9ff', '#0077b6', '#023e8a'],
        css: {
            arkaplan: '#f0f9ff',
            kart: '#ffffff',
            vurgu: '#0077b6',
            metin: '#023e8a',
            altMetin: '#4a7da6',
            hover: '#005f99',
            gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        },
        font: { baslik: 'Source Sans Pro', metin: 'Inter' },
        karakter: 'Eczane, diş hekimi, sağlık, temizlik',
    },
    {
        id: 'sicak-toprak',
        ad: 'Sıcak Toprak',
        aciklama: 'İştah açıcı, sıcak, davetkar',
        onizleme: ['#fff8f0', '#c1440e', '#1c0a00'],
        css: {
            arkaplan: '#fff8f0',
            kart: '#ffffff',
            vurgu: '#c1440e',
            metin: '#1c0a00',
            altMetin: '#78350f',
            hover: '#9a330a',
            gradient: 'linear-gradient(135deg, #fff8f0 0%, #fef3e2 100%)',
        },
        font: { baslik: 'Merriweather', metin: 'Georgia' },
        karakter: 'Restoran, kafe, pastane, yemek',
    },
    {
        id: 'mor-premium',
        ad: 'Mor & Gümüş',
        aciklama: 'Premium, modern, teknolojik',
        onizleme: ['#1a0533', '#7c3aed', '#f5f3ff'],
        css: {
            arkaplan: '#1a0533',
            kart: '#2d1052',
            vurgu: '#7c3aed',
            metin: '#f5f3ff',
            altMetin: '#c4b5fd',
            hover: '#6d28d9',
            gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1052 100%)',
        },
        font: { baslik: 'Montserrat', metin: 'Inter' },
        karakter: 'Teknoloji, yazılım, danışmanlık, muhasebe',
    },

    // ── NÖTR / EVRENSEL ──────────────────────────────────────────────────────

    {
        id: 'siyah-altin',
        ad: 'Siyah & Altın',
        aciklama: 'Lüks, sınıfsız, timeless',
        onizleme: ['#0a0a0a', '#f59e0b', '#fafafa'],
        css: {
            arkaplan: '#0a0a0a',
            kart: '#1a1a1a',
            vurgu: '#f59e0b',
            metin: '#fafafa',
            altMetin: '#a3a3a3',
            hover: '#d97706',
            gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)',
        },
        font: { baslik: 'Cormorant Garamond', metin: 'Raleway' },
        karakter: 'Her sektöre uyar — özellikle premium hizmetler',
    },
    {
        id: 'beton-turuncu',
        ad: 'Beton & Turuncu',
        aciklama: 'Endüstriyel, sert, güçlü',
        onizleme: ['#1f1f1f', '#f97316', '#f5f5f4'],
        css: {
            arkaplan: '#1f1f1f',
            kart: '#2c2c2c',
            vurgu: '#f97316',
            metin: '#f5f5f4',
            altMetin: '#a8a29e',
            hover: '#ea580c',
            gradient: 'linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)',
        },
        font: { baslik: 'Roboto Condensed', metin: 'Inter' },
        karakter: 'Boyacı, inşaat, nakliye, depo',
    },
]

// ID'ye göre bul
export function paletBul(id: string): RenkPaleti | undefined {
    return RENK_PALETLERI.find(p => p.id === id)
}

// Sektöre göre önerilen paletler
export function sektorPaletOner(sektor: string): RenkPaleti[] {
    const s = sektor?.toLowerCase() || ''

    const SEKTOR_PALET_MAP: Record<string, string[]> = {
        elektrikci: ['gece-mavisi', 'koyu-kirmizi', 'beton-turuncu'],
        kuafor: ['krem-pastel', 'mor-premium', 'siyah-altin'],
        tesisatci: ['okyanus-beyaz', 'gece-mavisi', 'koyu-kirmizi'],
        boyaci: ['beton-turuncu', 'sicak-toprak', 'zeytin-altin'],
        restoran: ['sicak-toprak', 'zeytin-altin', 'siyah-altin'],
        eczane: ['okyanus-beyaz', 'derin-yesil', 'krem-pastel'],
        camci: ['gece-mavisi', 'okyanus-beyaz', 'siyah-altin'],
        terzi: ['zeytin-altin', 'mor-premium', 'krem-pastel'],
        muhasebe: ['mor-premium', 'gece-mavisi', 'siyah-altin'],
    }

    const onerilen = SEKTOR_PALET_MAP[s] ?? ['siyah-altin', 'gece-mavisi', 'beton-turuncu']
    return onerilen
        .map(id => RENK_PALETLERI.find(p => p.id === id)!)
        .filter(Boolean)
}
