/**
 * Türkiye'ye özgü sezonsal kalıplar — içerik ve kampanya motoru.
 * buHaftaSezonlar(sektor) → 2 hafta önceden uyarı üretir.
 */

export interface SezonEvent {
    id: string
    ad: string
    baslangic: string   // "MM-DD"
    bitis: string
    ilgiliSektor: string[]
    icerikNotu: string
    oncelikSeviye: 1 | 2 | 3  // 3 = çok önemli
}

export const SEZON_TAKVIMI: SezonEvent[] = [
    {
        id: 'ramazan',
        ad: 'Ramazan',
        baslangic: '03-01',
        bitis: '03-30',
        ilgiliSektor: ['restoran', 'kafe', 'eczane', 'temizlikci'],
        icerikNotu: 'Ramazan ayı. İftar ve sahur odaklı içerikler. Manevi ton. İndirimli iftar menüsü, sahur paketleri.',
        oncelikSeviye: 3,
    },
    {
        id: 'okul-acilis',
        ad: 'Okul Açılışı',
        baslangic: '09-09',
        bitis: '09-20',
        ilgiliSektor: ['berber', 'kuafor', 'terzi', 'kirtasiye', 'egitim-kurs'],
        icerikNotu: 'Okul açılışı. Çocuk saç kesimi, okul forması, yeni dönem hazırlığı içerikleri.',
        oncelikSeviye: 3,
    },
    {
        id: 'bayram-oncesi',
        ad: 'Kurban/Ramazan Bayramı',
        baslangic: '04-01',
        bitis: '04-10',
        ilgiliSektor: ['kuafor', 'berber', 'temizlikci', 'boyaci', 'terzi'],
        icerikNotu: 'Bayram öncesi. "Bayrama hazırlanıyoruz" teması. Temizlik, saç, giyim, ev boyama.',
        oncelikSeviye: 3,
    },
    {
        id: 'yaz-giris',
        ad: 'Yaz Başlangıcı',
        baslangic: '06-01',
        bitis: '06-15',
        ilgiliSektor: ['kuafor', 'guzellik-merkezi', 'fitness-spor', 'boyaci', 'temizlikci'],
        icerikNotu: 'Yaz başlıyor. Sezon hazırlığı, yazlık bakım, dış cephe boyama, bahçe düzenleme.',
        oncelikSeviye: 2,
    },
    {
        id: 'yilbasi',
        ad: 'Yılbaşı',
        baslangic: '12-20',
        bitis: '12-31',
        ilgiliSektor: ['restoran', 'kafe', 'fotografci', 'kuafor', 'guzellik-merkezi'],
        icerikNotu: 'Yılbaşı. Özel yılbaşı menüsü, yılbaşı çekimi, gece bakımı, rezervasyon.',
        oncelikSeviye: 2,
    },
    {
        id: 'kis-bakim',
        ad: 'Kış Bakım Sezonu',
        baslangic: '11-01',
        bitis: '11-30',
        ilgiliSektor: ['elektrikci', 'tesisatci', 'boyaci', 'temizlikci'],
        icerikNotu: 'Kış hazırlığı. Kombi servisi, boru donması önlemleri, iç mekan boya, kış temizliği.',
        oncelikSeviye: 2,
    },
    {
        id: 'sevgililer',
        ad: 'Sevgililer Günü',
        baslangic: '02-10',
        bitis: '02-14',
        ilgiliSektor: ['restoran', 'kafe', 'guzellik-merkezi', 'kuafor', 'fotografci'],
        icerikNotu: 'Sevgililer günü. Çift paketleri, özel menü, çift fotoğraf çekimi, hediyeli bakım.',
        oncelikSeviye: 2,
    },
    {
        id: 'anneler-gunu',
        ad: 'Anneler Günü',
        baslangic: '05-08',
        bitis: '05-12',
        ilgiliSektor: ['kuafor', 'guzellik-merkezi', 'kafe', 'fotografci', 'cicekci'],
        icerikNotu: 'Anneler günü. Anne-kız paketleri, özel indirim, hediyeli hizmet.',
        oncelikSeviye: 2,
    },
]

/** Bu hafta (2 hafta öncesinden) esnafın sektörünü ilgilendiren sezon olayları */
export function buHaftaSezonlar(sektor: string): SezonEvent[] {
    const bugun = new Date()
    const ikiHaftaSonra = new Date(bugun.getTime() + 14 * 24 * 60 * 60 * 1000)

    return SEZON_TAKVIMI.filter(s => {
        if (!s.ilgiliSektor.includes(sektor)) return false

        const [basAy, basGun] = s.baslangic.split('-').map(Number)
        const basTarih = new Date(bugun.getFullYear(), basAy - 1, basGun)

        return basTarih >= bugun && basTarih <= ikiHaftaSonra
    })
}
