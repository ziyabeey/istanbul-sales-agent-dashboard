/**
 * master_receteler.ts — Sektörel Know-How Reçete Kütüphanesi
 *
 * 5 Sektör × 5+ ürün = 25+ detaylı BOM (Bill of Materials)
 * Her kalem: gramaj, fire payı, ambalaj, yarı-mamül desteği
 */

import { z } from 'zod'

// ═══ ZOD ŞEMALARI ═══════════════════════════════════════════════════════

export const malzemeTipEnum = z.enum(['hammadde', 'yari_mamul', 'ambalaj', 'sarf'])

export const bomKalemSema = z.object({
    malzemeAdi: z.string().min(1).max(200),
    miktar: z.number().positive(),
    birim: z.enum(['gr', 'ml', 'adet', 'kg', 'lt', 'porsiyon']),
    tip: malzemeTipEnum,
    fire_orani: z.number().min(0).max(100).default(0), // % cinsinden
    alt_recete_id: z.string().optional(), // yari_mamul ise → recursive lookup
    notlar: z.string().max(500).optional(),
})

export type BOMKalem = z.infer<typeof bomKalemSema>

export const recipeBOMSchema = z.object({
    id: z.string().min(1),
    urunAdi: z.string().min(1).max(200),
    kategori: z.string(),
    sektor: z.string(),
    porsiyon: z.number().positive().default(1),
    malzemeler: z.array(bomKalemSema).min(1),
    pisMeSuresiDk: z.number().nonnegative().optional(),
    notlar: z.string().optional(),
})

export type RecipeBOM = z.infer<typeof recipeBOMSchema>

// ═══ MASTER REÇETE VERİTABANI ════════════════════════════════════════════

export const MASTER_RECETELER: RecipeBOM[] = [

    // ──────────────────────────────────────────────────────────────────────
    // SEKTÖR 1: KEBAP & DÖNER
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'kebap_adana_porsiyon',
        urunAdi: 'Adana Kebap Porsiyon',
        kategori: 'ana_yemekler',
        sektor: 'kebap_doner',
        porsiyon: 1,
        pisMeSuresiDk: 12,
        malzemeler: [
            { malzemeAdi: 'Zırh Kıyması (Dana+Kuyruk)', miktar: 180, birim: 'gr', tip: 'hammadde', fire_orani: 20, notlar: 'Pişme firesi ~%20' },
            { malzemeAdi: 'Kuyruk Yağı', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 30 },
            { malzemeAdi: 'Pul Biber (Urfa)', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Lavaş Ekmeği', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Köz Domates', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Köz Biber (Sivri)', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Soğan (Garnish)', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 15, notlar: 'Doğrama firesi' },
            { malzemeAdi: 'Maydanoz', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Alüminyum Folyo Tabak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Paket Servis Poşeti', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kebap_et_doner_durum',
        urunAdi: 'Et Döner Dürüm',
        kategori: 'ana_yemekler',
        sektor: 'kebap_doner',
        porsiyon: 1,
        pisMeSuresiDk: 3,
        malzemeler: [
            { malzemeAdi: 'Et Döner (Çiğ Dilim)', miktar: 150, birim: 'gr', tip: 'hammadde', fire_orani: 25, notlar: 'Şiş pişirme firesi yüksek' },
            { malzemeAdi: 'Dürüm Lavaşı', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Domates', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Yeşillik (Marul/Roka)', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 25 },
            { malzemeAdi: 'Soğan', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Dürüm Kağıdı (Yağlı)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kebap_lahmacun',
        urunAdi: 'Lahmacun',
        kategori: 'ana_yemekler',
        sektor: 'kebap_doner',
        porsiyon: 1,
        pisMeSuresiDk: 4,
        malzemeler: [
            { malzemeAdi: 'Lahmacun Hamuru', miktar: 1, birim: 'adet', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_lahmacun_hamuru' },
            { malzemeAdi: 'Lahmacun Harcı (Kıyma+Biber)', miktar: 80, birim: 'gr', tip: 'yari_mamul', fire_orani: 5, alt_recete_id: 'ym_lahmacun_harci' },
            { malzemeAdi: 'Limon', miktar: 0.25, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Maydanoz', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Yağlı Kağıt (Sarma)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kebap_iskender',
        urunAdi: 'İskender Kebap',
        kategori: 'ana_yemekler',
        sektor: 'kebap_doner',
        porsiyon: 1,
        pisMeSuresiDk: 8,
        malzemeler: [
            { malzemeAdi: 'Et Döner (Çiğ)', miktar: 200, birim: 'gr', tip: 'hammadde', fire_orani: 25 },
            { malzemeAdi: 'Pide Ekmeği', miktar: 150, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Tereyağı', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Domates Sosu', miktar: 80, birim: 'ml', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_domates_sosu' },
            { malzemeAdi: 'Yoğurt', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Köz Biber', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Köz Domates', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 10 },
        ],
    },
    {
        id: 'kebap_beyti_sarma',
        urunAdi: 'Beyti Sarma',
        kategori: 'ana_yemekler',
        sektor: 'kebap_doner',
        porsiyon: 1,
        pisMeSuresiDk: 15,
        malzemeler: [
            { malzemeAdi: 'Zırh Kıyması', miktar: 200, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Lavaş Ekmeği', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Tereyağı', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Domates Sosu', miktar: 100, birim: 'ml', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_domates_sosu' },
            { malzemeAdi: 'Yoğurt', miktar: 80, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // SEKTÖR 2: KAFE & TATLI
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'kafe_iced_caramel_macchiato',
        urunAdi: 'Iced Caramel Macchiato',
        kategori: 'sicak_icecekler',
        sektor: 'kafe_tatli',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Espresso Çekirdeği', miktar: 18, birim: 'gr', tip: 'hammadde', fire_orani: 5, notlar: 'Öğütme firesi' },
            { malzemeAdi: 'Tam Yağlı Süt', miktar: 200, birim: 'ml', tip: 'hammadde', fire_orani: 3, notlar: 'Köpürtme kayıp' },
            { malzemeAdi: 'Karamel Sos', miktar: 15, birim: 'ml', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Vanilya Şurubu', miktar: 10, birim: 'ml', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Buz', miktar: 120, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: '16oz Plastik Bardak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Bombe Kapak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Kağıt Pipet', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 3 },
            { malzemeAdi: 'Bardak Manşonu', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kafe_san_sebastian',
        urunAdi: 'San Sebastian Cheesecake (Dilim)',
        kategori: 'tatli',
        sektor: 'kafe_tatli',
        porsiyon: 1,
        notlar: '1 kalıp = 12 dilim',
        malzemeler: [
            { malzemeAdi: 'Krem Peynir (Philadelphia)', miktar: 50, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Krema (Sıvı)', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Yumurta', miktar: 0.75, birim: 'adet', tip: 'hammadde', fire_orani: 5, notlar: '9 yumurta / 12 dilim' },
            { malzemeAdi: 'Toz Şeker', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Un', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Vanilya Özütü', miktar: 1, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Karton Tabak (Kare)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Tatlı Çatalı (Tahta)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kafe_turk_kahvesi',
        urunAdi: 'Türk Kahvesi',
        kategori: 'sicak_icecekler',
        sektor: 'kafe_tatli',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Türk Kahvesi (Öğütülmüş)', miktar: 8, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Su', miktar: 65, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Toz Şeker', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 0, notlar: 'Orta şekerli' },
            { malzemeAdi: 'Lokumluk (Rose)', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Porselen Fincan (Yıkanır)', miktar: 0, birim: 'adet', tip: 'sarf', fire_orani: 0, notlar: 'Kırılma sarf %2/ay' },
            { malzemeAdi: 'Su Bardağı (Yıkanır)', miktar: 0, birim: 'adet', tip: 'sarf', fire_orani: 0 },
        ],
    },
    {
        id: 'kafe_latte',
        urunAdi: 'Cafe Latte',
        kategori: 'sicak_icecekler',
        sektor: 'kafe_tatli',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Espresso Çekirdeği', miktar: 18, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Tam Yağlı Süt', miktar: 250, birim: 'ml', tip: 'hammadde', fire_orani: 5, notlar: 'Buhar kayıp' },
            { malzemeAdi: '12oz Kağıt Bardak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Bardak Kapağı (Sipper)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'kafe_brownie',
        urunAdi: 'Fıstıklı Brownie',
        kategori: 'tatli',
        sektor: 'kafe_tatli',
        porsiyon: 1,
        notlar: '1 tepsi = 16 dilim',
        malzemeler: [
            { malzemeAdi: 'Bitter Çikolata (%70)', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Tereyağı', miktar: 18, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Toz Şeker', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Yumurta', miktar: 0.5, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Un', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Antep Fıstığı (İç)', miktar: 8, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Kraft Kağıt Tabak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // SEKTÖR 3: PİZZA & İTALYAN
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'pizza_karisik_32',
        urunAdi: 'Karışık Pizza 32cm',
        kategori: 'pizza',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        pisMeSuresiDk: 12,
        malzemeler: [
            { malzemeAdi: 'Pizza Hamuru (32cm)', miktar: 1, birim: 'porsiyon', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_hamuru' },
            { malzemeAdi: 'Pizza Sosu', miktar: 80, birim: 'gr', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_sosu' },
            { malzemeAdi: 'Mozzarella (Rendelenmiş)', miktar: 120, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Sucuk (Dilim)', miktar: 40, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sosis (Dilim)', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Mantar (Dilim)', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Yeşil Biber (Halka)', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Mısır (Konserve)', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Zeytin (Dilim)', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: '33×33 Baskılı Pizza Kutusu', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Islak Mendil (Tek Kullanım)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'pizza_margarita',
        urunAdi: 'Margarita Pizza 32cm',
        kategori: 'pizza',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        pisMeSuresiDk: 10,
        malzemeler: [
            { malzemeAdi: 'Pizza Hamuru (32cm)', miktar: 1, birim: 'porsiyon', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_hamuru' },
            { malzemeAdi: 'Pizza Sosu', miktar: 80, birim: 'gr', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_sosu' },
            { malzemeAdi: 'Mozzarella (Taze)', miktar: 150, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Taze Fesleğen', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Zeytinyağı (Drizzle)', miktar: 10, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: '33×33 Baskılı Pizza Kutusu', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'pizza_penne_arabiata',
        urunAdi: 'Penne Arabiata',
        kategori: 'makarna',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        pisMeSuresiDk: 15,
        malzemeler: [
            { malzemeAdi: 'Penne Makarna (Kuru)', miktar: 120, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Domates Sosu', miktar: 120, birim: 'ml', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_domates_sosu' },
            { malzemeAdi: 'Sarımsak', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Pul Biber', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Zeytinyağı', miktar: 15, birim: 'ml', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Parmesan Rendesi', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Makarna Kabı (Kraft)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'pizza_calzone',
        urunAdi: 'Calzone',
        kategori: 'pizza',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        pisMeSuresiDk: 14,
        malzemeler: [
            { malzemeAdi: 'Pizza Hamuru (32cm)', miktar: 1, birim: 'porsiyon', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_hamuru' },
            { malzemeAdi: 'Mozzarella', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Jambon', miktar: 50, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Mantar', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Pizza Sosu', miktar: 60, birim: 'gr', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pizza_sosu' },
        ],
    },
    {
        id: 'pizza_tiramisu',
        urunAdi: 'Tiramisu (Porsiyon)',
        kategori: 'tatli',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Mascarpone', miktar: 50, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Yumurta', miktar: 0.5, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Toz Şeker', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Espresso (Soğumuş)', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Kedi Dili Bisküvi', miktar: 3, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Kakao Tozu', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Cam Kase (Yıkanır)', miktar: 0, birim: 'adet', tip: 'sarf', fire_orani: 0 },
        ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // SEKTÖR 4: FAST FOOD
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'ff_smash_burger_menu',
        urunAdi: 'Smash Burger Menü',
        kategori: 'ana_yemekler',
        sektor: 'fast_food',
        porsiyon: 1,
        pisMeSuresiDk: 8,
        malzemeler: [
            { malzemeAdi: 'Dana Kıyma (Smash)', miktar: 120, birim: 'gr', tip: 'hammadde', fire_orani: 25, notlar: 'Smash sıkıştırma + yağ atma' },
            { malzemeAdi: 'Cheddar Peynir (Dilim)', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Brioche Ekmek', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Marul Yaprağı', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 30, notlar: 'Kırılan yaprak firesi yüksek' },
            { malzemeAdi: 'Domates Dilimi', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Turşu Dilimi', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Soğan Halkası', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Burger Sosu', miktar: 15, birim: 'ml', tip: 'yari_mamul', fire_orani: 5, alt_recete_id: 'ym_burger_sosu' },
            { malzemeAdi: 'Dondurulmuş Patates', miktar: 150, birim: 'gr', tip: 'hammadde', fire_orani: 8, notlar: 'Kızartma yağ emme' },
            { malzemeAdi: 'Kızartma Yağı (Tüketim)', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 100, notlar: 'Tek kullanım payı' },
            { malzemeAdi: 'Kraft Yemek Çantası', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Burger Sarma Kağıdı', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Patates Kutusu (Küçük)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'ff_tavuk_wrap',
        urunAdi: 'Tavuk Wrap',
        kategori: 'ana_yemekler',
        sektor: 'fast_food',
        porsiyon: 1,
        pisMeSuresiDk: 6,
        malzemeler: [
            { malzemeAdi: 'Tavuk Göğsü (Marine)', miktar: 120, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Tortilla Lavaş (25cm)', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Marul', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 25 },
            { malzemeAdi: 'Domates', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Ranch Sos', miktar: 20, birim: 'ml', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Wrap Sarma Kağıdı', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'ff_nugget_6li',
        urunAdi: 'Chicken Nugget (6\'lı)',
        kategori: 'ana_yemekler',
        sektor: 'fast_food',
        porsiyon: 1,
        pisMeSuresiDk: 5,
        malzemeler: [
            { malzemeAdi: 'Tavuk Nugget (Dondurulmuş)', miktar: 6, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Kızartma Yağı (Tüketim)', miktar: 20, birim: 'ml', tip: 'hammadde', fire_orani: 100 },
            { malzemeAdi: 'BBQ Sos Paket', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Nugget Kutusu', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'ff_milkshake',
        urunAdi: 'Çilekli Milkshake',
        kategori: 'icecekler',
        sektor: 'fast_food',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Vanilya Dondurma', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Süt', miktar: 150, birim: 'ml', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Çilek Sosu', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: '16oz Plastik Bardak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Bombe Kapak', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Kalın Pipet', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },
    {
        id: 'ff_tost_karisik',
        urunAdi: 'Karışık Tost',
        kategori: 'ana_yemekler',
        sektor: 'fast_food',
        porsiyon: 1,
        pisMeSuresiDk: 4,
        malzemeler: [
            { malzemeAdi: 'Tost Ekmeği (Dilim)', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Kaşar Peynir (Dilim)', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sucuk (Dilim)', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Domates', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Tereyağı (Sürme)', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Tost Poşeti', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
        ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // SEKTÖR 5: EV YEMEKLERİ
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'ev_kuru_fasulye',
        urunAdi: 'Kuru Fasulye (Porsiyon)',
        kategori: 'ana_yemekler',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        pisMeSuresiDk: 90,
        notlar: '1 tencere = ~15 porsiyon',
        malzemeler: [
            { malzemeAdi: 'Kuru Fasulye (Kuru)', miktar: 40, birim: 'gr', tip: 'hammadde', fire_orani: 3, notlar: 'Ayıklama firesi' },
            { malzemeAdi: 'Domates Salçası', miktar: 8, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Biber Salçası', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Soğan', miktar: 20, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Sıvıyağ (Ayçiçek)', miktar: 10, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Su', miktar: 200, birim: 'ml', tip: 'hammadde', fire_orani: 30, notlar: 'Buharlaşma' },
            { malzemeAdi: 'Pilav Porsiyonu', miktar: 1, birim: 'porsiyon', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pilav' },
        ],
    },
    {
        id: 'ev_mercimek_corbasi',
        urunAdi: 'Mercimek Çorbası (Kase)',
        kategori: 'corba',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        pisMeSuresiDk: 40,
        malzemeler: [
            { malzemeAdi: 'Kırmızı Mercimek', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Soğan', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Havuç', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Patates', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Domates Salçası', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tereyağı', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Un', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Limon (Garnish)', miktar: 0.25, birim: 'adet', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: '12oz Çorba Kasesi (Karton)', miktar: 1, birim: 'adet', tip: 'ambalaj', fire_orani: 0 },
            { malzemeAdi: 'Ekmek (Dilim)', miktar: 2, birim: 'adet', tip: 'hammadde', fire_orani: 10 },
        ],
    },
    {
        id: 'ev_etli_ekmek',
        urunAdi: 'Etli Ekmek',
        kategori: 'ana_yemekler',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        pisMeSuresiDk: 15,
        malzemeler: [
            { malzemeAdi: 'Etli Ekmek Hamuru', miktar: 1, birim: 'adet', tip: 'yari_mamul', fire_orani: 3, alt_recete_id: 'ym_etli_ekmek_hamuru' },
            { malzemeAdi: 'Kıyma (Yağsız)', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Soğan', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Domates', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Biber (Sivri)', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Maydanoz', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
        ],
    },
    {
        id: 'ev_imam_bayildi',
        urunAdi: 'İmam Bayıldı (Porsiyon)',
        kategori: 'ana_yemekler',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        pisMeSuresiDk: 45,
        malzemeler: [
            { malzemeAdi: 'Patlıcan (Karnıyarık)', miktar: 1, birim: 'adet', tip: 'hammadde', fire_orani: 20, notlar: 'Sap + uç firesi' },
            { malzemeAdi: 'Soğan', miktar: 40, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Domates', miktar: 50, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Biber (Dolmalık)', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Sarımsak', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Zeytinyağı', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Domates Salçası', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ev_tavuk_sote',
        urunAdi: 'Tavuk Sote (Porsiyon)',
        kategori: 'ana_yemekler',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        pisMeSuresiDk: 35,
        malzemeler: [
            { malzemeAdi: 'Tavuk But (Kemiksiz)', miktar: 150, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Biber (Karışık)', miktar: 30, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Domates', miktar: 40, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Soğan', miktar: 25, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Sıvıyağ', miktar: 15, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Domates Salçası', miktar: 8, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Pilav Porsiyonu', miktar: 1, birim: 'porsiyon', tip: 'yari_mamul', fire_orani: 0, alt_recete_id: 'ym_pilav' },
        ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // YARI MAMÜLLER (SUB-ASSEMBLIES)
    // ──────────────────────────────────────────────────────────────────────

    {
        id: 'ym_pizza_hamuru',
        urunAdi: 'Pizza Hamuru (32cm Porsiyon)',
        kategori: 'yari_mamul',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        notlar: '1 hamur topu = 1 pizza',
        malzemeler: [
            { malzemeAdi: 'Un (Tip 00)', miktar: 180, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Su (Ilık)', miktar: 110, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Zeytinyağı', miktar: 8, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Yaş Maya', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 4, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Şeker', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_pizza_sosu',
        urunAdi: 'Pizza Sosu (100gr Porsiyon)',
        kategori: 'yari_mamul',
        sektor: 'pizza_italyan',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Domates Püresi (Konserve)', miktar: 80, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sarımsak', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
            { malzemeAdi: 'Zeytinyağı', miktar: 5, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Kekik (Kuru)', miktar: 1, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 1, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Karabiber', miktar: 0.5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_domates_sosu',
        urunAdi: 'Domates Sosu (Genel)',
        kategori: 'yari_mamul',
        sektor: 'genel',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Domates (Rendelenmiş)', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Domates Salçası', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sıvıyağ', miktar: 10, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 1, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_pilav',
        urunAdi: 'Pirinç Pilavı (Porsiyon)',
        kategori: 'yari_mamul',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Pirinç (Baldo)', miktar: 80, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tereyağı', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 3 },
            { malzemeAdi: 'Su', miktar: 130, birim: 'ml', tip: 'hammadde', fire_orani: 40, notlar: 'Buharlaşma' },
            { malzemeAdi: 'Tuz', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Şehriye', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_burger_sosu',
        urunAdi: 'Burger Special Sosu',
        kategori: 'yari_mamul',
        sektor: 'fast_food',
        porsiyon: 1,
        notlar: '30ml porsiyon',
        malzemeler: [
            { malzemeAdi: 'Mayonez', miktar: 15, birim: 'ml', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Ketçap', miktar: 8, birim: 'ml', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Hardal', miktar: 3, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Turşu Suyu', miktar: 2, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sarımsak Tozu', miktar: 0.5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_lahmacun_hamuru',
        urunAdi: 'Lahmacun Hamuru',
        kategori: 'yari_mamul',
        sektor: 'kebap_doner',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Un', miktar: 60, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Su', miktar: 30, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Tuz', miktar: 1, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Yaş Maya', miktar: 1, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
        ],
    },
    {
        id: 'ym_lahmacun_harci',
        urunAdi: 'Lahmacun Harcı (1 Adet)',
        kategori: 'yari_mamul',
        sektor: 'kebap_doner',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Kıyma (Yağsız)', miktar: 50, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Soğan (Rendelenmiş)', miktar: 15, birim: 'gr', tip: 'hammadde', fire_orani: 15 },
            { malzemeAdi: 'Domates (Rendelenmiş)', miktar: 10, birim: 'gr', tip: 'hammadde', fire_orani: 10 },
            { malzemeAdi: 'Biber Salçası', miktar: 5, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Maydanoz', miktar: 3, birim: 'gr', tip: 'hammadde', fire_orani: 20 },
        ],
    },
    {
        id: 'ym_etli_ekmek_hamuru',
        urunAdi: 'Etli Ekmek Hamuru',
        kategori: 'yari_mamul',
        sektor: 'ev_yemekleri',
        porsiyon: 1,
        malzemeler: [
            { malzemeAdi: 'Un', miktar: 100, birim: 'gr', tip: 'hammadde', fire_orani: 2 },
            { malzemeAdi: 'Su', miktar: 50, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Yumurta', miktar: 0.25, birim: 'adet', tip: 'hammadde', fire_orani: 5 },
            { malzemeAdi: 'Tuz', miktar: 2, birim: 'gr', tip: 'hammadde', fire_orani: 0 },
            { malzemeAdi: 'Sıvıyağ', miktar: 5, birim: 'ml', tip: 'hammadde', fire_orani: 0 },
        ],
    },
]

// ─── Yardımcı Fonksiyonlar ──────────────────────────────────────────────

export function masterReceteBul(urunAdiOrId: string): RecipeBOM | undefined {
    const lower = urunAdiOrId.toLowerCase()
    return MASTER_RECETELER.find(r =>
        r.id === urunAdiOrId ||
        r.urunAdi.toLowerCase().includes(lower) ||
        lower.includes(r.urunAdi.toLowerCase())
    )
}

export function sektorReceteler(sektor: string): RecipeBOM[] {
    return MASTER_RECETELER.filter(r => r.sektor === sektor)
}

export function yariMamulReçeteBul(altReceteId: string): RecipeBOM | undefined {
    return MASTER_RECETELER.find(r => r.id === altReceteId)
}
