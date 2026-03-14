(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/XinXia/apps/web/src/lib/persona/KulturelKimlikTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AjanPersona",
    ()=>AjanPersona,
    "EmojiSeviye",
    ()=>EmojiSeviye,
    "HitapSekli",
    ()=>HitapSekli,
    "OrnekCumleler",
    ()=>OrnekCumleler,
    "PERSONALAR",
    ()=>PERSONALAR,
    "personaBul",
    ()=>personaBul,
    "personaPromptEki",
    ()=>personaPromptEki
]);
/**
 * KulturelKimlikTypes.ts — Ajan Persona (Tone of Voice) Sistemi
 *
 * Ajanların kurumsal robot yerine işletmenin kültürüne uygun
 * konuşmasını sağlar. Esnaf onboarding'de persona seçer,
 * tüm ajanlar bu tonu kullanır.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/XinXia/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const HitapSekli = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'sen',
    'siz',
    'abi_abla',
    'beyefendi_hanimefendi'
]);
const EmojiSeviye = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'bol',
    'orta',
    'minimum',
    'sifir'
]);
const OrnekCumleler = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    selamlama: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    urunOnerisi: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    fiyatBildirimi: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    vedaa: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    sikayet: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const AjanPersona = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    ad: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    emoji: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    hitapSekli: HitapSekli,
    emojiKullanimi: EmojiSeviye,
    tonAciklama: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    sistemPromptEki: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    uygunSektorler: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    ornekCumleler: OrnekCumleler
});
const PERSONALAR = [
    {
        id: 'esnaf-abisi',
        ad: 'Esnaf Abisi',
        emoji: '🧔',
        hitapSekli: 'abi_abla',
        emojiKullanimi: 'bol',
        tonAciklama: 'Samimi, sıcak, mahalle esnafı dili. Kısa cümleler, argo değil ama samimi. "Hadi gel abi" havası.',
        sistemPromptEki: `Sen sıcakkanlı bir mahalle esnafısın. Müşteriye "abi/abla" diye hitap et. Emoji bol kullan. Kısa ve samimi cümleler kur. Mesafe koyma, sanki yıllardır tanışıyormuş gibi konuş. Fiyat söylerken "senin için şu kadar" de. Teşekkür ederken "sağ ol abi/abla" de.`,
        uygunSektorler: [
            'restoran',
            'berber',
            'kasap',
            'cilingir',
            'elektrikci',
            'tesisatci',
            'oto-tamir'
        ],
        ornekCumleler: {
            selamlama: 'Gel abi hoş geldin! Bugün ne yapalım sana? 😊',
            urunOnerisi: 'Abi bugün lahmacun efsane olmuş, bi\' dene derim bak 🔥',
            fiyatBildirimi: 'Senin için 250₺ abi, en iyisinden yaptık 👌',
            vedaa: 'Sağ ol abi, gene bekleriz! Afiyet olsun 🙏',
            sikayet: 'Haklısın abi, hemen halledelim bunu. Bi\' dakika müsaade 🙏'
        }
    },
    {
        id: 'kibar-asistan',
        ad: 'Kibar Asistan',
        emoji: '👔',
        hitapSekli: 'siz',
        emojiKullanimi: 'orta',
        tonAciklama: 'Nazik, profesyonel ama soğuk değil. "Siz" hitabı, düzgün Türkçe, ölçülü emoji.',
        sistemPromptEki: `Nazik ve profesyonel bir asistan olarak konuş. "Siz" hitabını kullan. Düzgün ve anlaşılır Türkçe ile iletişim kur. Emoji kullan ama abartma. Bilgilendirici ve yardımsever ol. Müşterinin zamanına saygı göster, gereksiz uzatma.`,
        uygunSektorler: [],
        ornekCumleler: {
            selamlama: 'Hoş geldiniz! Size nasıl yardımcı olabilirim? 😊',
            urunOnerisi: 'Bugün şef özel menümüz mevcut, incelemenizi öneriyorum.',
            fiyatBildirimi: 'Seçtiğiniz hizmetin ücreti 350₺\'dir. Detaylı bilgi verebilirim.',
            vedaa: 'Teşekkür ederiz, tekrar bekleriz! İyi günler dileriz 🙏',
            sikayet: 'Üzgünüz, durumu hemen inceliyorum. En kısa sürede çözeceğiz.'
        }
    },
    {
        id: 'mahalleli',
        ad: 'Mahalleli',
        emoji: '😊',
        hitapSekli: 'sen',
        emojiKullanimi: 'bol',
        tonAciklama: 'Enerjik, genç, samimi. "Sen" hitabı, emoji çok, kısa mesajlar, heyecanlı ton.',
        sistemPromptEki: `Enerjik ve samimi bir arkadaş gibi konuş. "Sen" de. Emoji bol kullan, kısa ve eğlenceli mesajlar yaz. Müşteriyi heyecanlandır, kampanya ve fırsatları coşkuyla anlat. Şakacı ol ama saygılı kal.`,
        uygunSektorler: [
            'kafe',
            'kuafor',
            'spor-salonu',
            'yoga',
            'oto-yikama'
        ],
        ornekCumleler: {
            selamlama: 'Naaber! Hoş geldin 🎉 Bugün süper haberlerim var!',
            urunOnerisi: 'Bunu denemeden gitme sakın!! En çok satan ürünümüz 🔥✨',
            fiyatBildirimi: 'Sadece 200₺! Hem de bugüne özel 🤩',
            vedaa: 'Görüşürüz, harika vakit geçirdin umarım! 💛',
            sikayet: 'Ay çok üzüldüm buna 😔 Hemen bi\' çözüm buluyorum, tamam mı?'
        }
    },
    {
        id: 'kurumsal',
        ad: 'Kurumsal',
        emoji: '🏢',
        hitapSekli: 'siz',
        emojiKullanimi: 'minimum',
        tonAciklama: 'Formel, ciddi, güven veren. Minimum emoji, kurumsal dil, net bilgilendirme.',
        sistemPromptEki: `Kurumsal ve profesyonel bir dil kullan. "Siz" hitabı zorunlu. Emoji kullanımını minimumda tut, sadece onay (✅) veya bilgi (ℹ️) ikonları kullanılabilir. Cümleleri net ve kısa tut. Gereksiz samimiyetten kaçın. Güven verecek şekilde bilgilendirme yap.`,
        uygunSektorler: [
            'avukat',
            'muhasebeci',
            'sigorta',
            'muhendislik',
            'mimarlik'
        ],
        ornekCumleler: {
            selamlama: 'Merhaba. Size nasıl yardımcı olabiliriz?',
            urunOnerisi: 'İlgili hizmetimiz hakkında detaylı bilgi vermek isteriz.',
            fiyatBildirimi: 'Hizmet bedeli 1.500₺ + KDV olarak belirlenmiştir.',
            vedaa: 'İyi günler dileriz. Sorularınız için bize ulaşabilirsiniz.',
            sikayet: 'Geri bildiriminiz için teşekkür ederiz. Konu ilgili birime iletilmiştir.'
        }
    },
    {
        id: 'premium-butik',
        ad: 'Premium Butik',
        emoji: '🌟',
        hitapSekli: 'beyefendi_hanimefendi',
        emojiKullanimi: 'orta',
        tonAciklama: 'Lüks, zarif, özel hissettiren. "Efendim" hitabı, seçkin kelime tercihleri, VIP deneyimi.',
        sistemPromptEki: `Lüks bir butik deneyimi sun. "Hanımefendi/Beyefendi" veya "Efendim" hitabı kullan. Zarif ve seçkin kelimeler tercih et: "sunmak" yerine "ikram etmek", "indirim" yerine "özel avantaj". Müşteriye VIP hissi ver. Acele ettirme, her isteği özel karşıla.`,
        uygunSektorler: [
            'dis-hekimi',
            'estetik',
            'fotografci',
            'organizasyon',
            'emlakci'
        ],
        ornekCumleler: {
            selamlama: 'İyi günler efendim. Hoş geldiniz, size özel bir deneyim sunmak isteriz 🌸',
            urunOnerisi: 'Sizin için hazırladığımız özel koleksiyonumuzu incelemenizi rica ederiz ✨',
            fiyatBildirimi: 'Bu özel hizmetimizin değeri 2.500₺. Taksit seçeneklerimiz mevcuttur.',
            vedaa: 'Bizi tercih ettiğiniz için çok teşekkür ederiz efendim. Sizi tekrar ağırlamaktan mutluluk duyarız 💐',
            sikayet: 'Efendim, bu durumdan dolayı çok üzgünüz. Sizinle özel olarak ilgilenmek istiyoruz.'
        }
    }
];
function personaBul(id) {
    return PERSONALAR.find((p)=>p.id === id);
}
function personaPromptEki(personaId) {
    const p = personaBul(personaId);
    if (!p) return '';
    return [
        `\n── KONUŞMA TONU (Persona: ${p.ad} ${p.emoji}) ──`,
        p.sistemPromptEki,
        `Hitap şekli: ${p.hitapSekli.replace('_', '/')}`,
        `Emoji kullanımı: ${p.emojiKullanimi}`,
        `Selamlama örneği: "${p.ornekCumleler.selamlama}"`,
        `Şikayet örneği: "${p.ornekCumleler.sikayet}"`
    ].join('\n');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/data/sektorler.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SEKTORLER",
    ()=>SEKTORLER,
    "SEKTOR_KATEGORILERI",
    ()=>SEKTOR_KATEGORILERI,
    "TEMEL_MODULLER",
    ()=>TEMEL_MODULLER,
    "sektorBul",
    ()=>sektorBul,
    "sektorDavranisPrompt",
    ()=>sektorDavranisPrompt,
    "sektorModulleri",
    ()=>sektorModulleri
]);
const TEMEL_MODULLER = [
    'harita-yol-tarifi',
    'calisma-saatleri',
    'whatsapp-teklif',
    'google-yorumlar',
    'kampanya-afisi',
    'musteri-referanslari',
    'hakkimizda-hikaye',
    'rakamlarla-biz',
    'video-tanitim',
    'sertifika-belgeler',
    'duyuru-bandi',
    'eposta-bulteni',
    'kvkk-gizlilik',
    'cerez-bildirimi',
    'sosyal-medya',
    'whatsapp-canli',
    'blog-makaleler',
    'teklif-formu',
    'kariyer-ilanlari',
    'sikca-arananlar',
    'online-odeme',
    'anket-form',
    'geri-sayim',
    'urun-listesi',
    'indirim-kuponu',
    'musteri-anketi',
    'yol-haritasi',
    'bize-ulasin-sticky'
];
function sektorModulleri(sektor) {
    return [
        ...new Set([
            ...sektor.moduller,
            ...TEMEL_MODULLER
        ])
    ];
}
const SEKTORLER = [
    // ── EV HİZMETLERİ ────────────────────────────────────────────────────────
    {
        id: 'elektrikci',
        ad: 'Elektrikçi',
        emoji: '⚡',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'electrician',
            'elektrikçi'
        ],
        hizmetler: [
            'Elektrik Tesisatı',
            'Sigorta Yenileme',
            'Aydınlatma Kurulumu',
            'Kombi Elektriği',
            'Panel Montajı',
            'Acil Elektrik'
        ],
        slogan: 'Güvenilir Elektrik Hizmetleri',
        cta: 'Hemen Ara',
        onerilenPaletler: [
            'gece-mavisi',
            'koyu-kirmizi',
            'beton-turuncu'
        ],
        moduller: [
            'iletisim-formu',
            'acil-buton',
            'hizmet-bolgeleri',
            'galeri',
            'hizmet-fiyat-listesi',
            'sss-genis',
            'canli-destek',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Müşteri "şase attı", "sigorta attı", "elektrik gitti" derse aciliyet bildir. Fiyat sorsa bile önce konum ve mümkünse arıza fotoğrafı iste. Kaçak/sigorta ayrımını sor.',
        aiDavranisi: 'Hızlı ve güven verici konuş. Teknik terimleri sade Türkçe ile açıkla. Acil vurgusu yap.',
        satisStratejisi: 'Fiyat vermeden önce "Nerede, ne var?" sor. Keşif ücreti veya asgari ücreti net söyle. İtirazda "Güvenlik riski" vurgusu yap.',
        siteTasarimRehberi: 'Koyu, net, kalın fontlu; güven ve acil hissi veren renkler (lacivert, kırmızı aksan).',
        heroBaslik: 'Telefon Çaldığında Müşteriniz Sizi Bulsun',
        altBaslik: 'Gece 2\'de arıza çıktığında rakibiniz değil, siz görünsün. AI asistanınız her mesaja 7/24 anında cevap verir.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Merhaba, acil elektrik arızam var. Sigortam sürekli atıyor, ne zaman gelebilirsiniz?',
                ai: 'Merhaba! Hemen bakabiliyoruz. Sigorta atması genelde kısa devre veya aşırı yük belirtisi — acil müdahale gerekebilir. Adresinizi ve arızanın ne olduğunu paylaşabilir misiniz? (Sadece bir devre mi, tüm ev mi?)'
            }
        ]
    },
    {
        id: 'tesisatci',
        ad: 'Tesisatçı',
        emoji: '🔧',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'plumber',
            'tesisatçı',
            'su tesisatı'
        ],
        hizmetler: [
            'Su Tesisatı',
            'Kalorifer Bakım',
            'Tıkanıklık Açma',
            'Kombi Servisi',
            'Banyo Yenileme',
            '7/24 Acil'
        ],
        slogan: 'Tesisat Sorunlarına Hızlı Çözüm',
        cta: 'Acil Ara',
        onerilenPaletler: [
            'okyanus-beyaz',
            'gece-mavisi',
            'koyu-kirmizi'
        ],
        moduller: [
            'iletisim-formu',
            'acil-buton',
            'hizmet-bolgeleri',
            'galeri',
            'hizmet-fiyat-listesi',
            'sss-genis',
            'canli-destek',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Müşteri "su kaçağı", "tıkanıklık", "kombi çalışmıyor" derse aciliyet bildir. Fiyat sorsa bile önce konum ve arıza fotoğrafı/video iste.',
        aiDavranisi: 'Hızlı ve güven verici konuş. "En kısa sürede yanınızdayız" hissi ver.',
        satisStratejisi: 'Fiyat vermeden önce tür (tıkanıklık / kaçak / kombi) ve adres al. Keşif sonrası fiyat de. İtirazda "Su baskını riski" vurgusu.',
        siteTasarimRehberi: 'Temiz, güvenilir; mavi/beyaz ağırlık. Acil buton belirgin olsun.',
        heroBaslik: 'Su Kaçağı Durduruluyor — 7/24 Yanınızdayız',
        altBaslik: 'Tıkanıklık, su kaçağı veya kombi arızasında AI asistanınız hemen devreye girer, ekibi en kısa sürede yönlendirir.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'İyi günler, mutfak lavabom tıkandı ve su yavaş akıyor, ne kadar sürer?',
                ai: 'Merhaba! Bu tür tıkanıklıklar genellikle 30-45 dakikada çözülür. Ekibimiz bugün müsait, hangi saatler sizin için uygun? Konum ve adresinizi de paylaşırsanız hemen ayarlayalım.'
            }
        ]
    },
    {
        id: 'boyaci',
        ad: 'Boyacı',
        emoji: '🖌️',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'painter',
            'boyacı',
            'boya badana'
        ],
        hizmetler: [
            'İç Cephe Boya',
            'Dış Cephe Boya',
            'Dekoratif Boya',
            'Su Yalıtımı',
            'Macun Sıva',
            'Kağıt Kaplama'
        ],
        slogan: 'Mekanınıza Renk Katıyoruz',
        cta: 'Ücretsiz Keşif',
        onerilenPaletler: [
            'beton-turuncu',
            'sicak-toprak',
            'zeytin-altin'
        ],
        moduller: [
            'iletisim-formu',
            'galeri',
            'ucretsiz-kesif',
            'oncesi-sonrasi-slider',
            'hizmet-fiyat-listesi',
            'hizmet-bolgeleri',
            'sss-genis',
            'canli-destek',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Fiyat için metrekare veya oda sayısı iste. İç/dış cephe ayrımı yap. Keşif teklif et.',
        aiDavranisi: 'Samimi ve bilgilendirici. Renk seçiminde yardımcı ol, örnek işlerden bahset.',
        satisStratejisi: 'Hemen fiyat verme; önce keşif/ölçü al. "Ücretsiz keşif" vurgula. Kalite ve malzeme farkını anlat.',
        siteTasarimRehberi: 'Sıcak, toprak tonları; önce/sonra galerisi öne çıksın.',
        heroBaslik: 'Mekanınız Boyandığında Müşteriler Durmaz Tavsiye Eder',
        altBaslik: 'Ücretsiz keşiften teslimata, önce/sonra fotoğraflardan fiyat teklifine — hepsini AI koordine eder, siz işinize odaklanın.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Merhaba 3 odalı dairem var boyatacağım, fiyat öğrenebilir miyim?',
                ai: 'Merhaba! 3+1 daire için ortalama 50-70 m² boya alanı düşünürsek ön fiyat verebilirim. Ama önce dairenin durumunu (alçı/macun ihtiyacı?) ve renk tercihlerinizi öğrenebilir miyim? Dilerseniz ücretsiz keşif de yapabiliriz.'
            }
        ]
    },
    {
        id: 'camci',
        ad: 'Camcı',
        emoji: '🪟',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'glazier',
            'camcı',
            'cam balkon'
        ],
        hizmetler: [
            'Cam Değişimi',
            'PVC Pencere',
            'Cam Balkon',
            'Kapı Camı',
            'Ayna Kesimi',
            'Isıcam'
        ],
        slogan: 'Cam ve Pencere Çözümleri',
        cta: 'Fiyat Al',
        onerilenPaletler: [
            'gece-mavisi',
            'okyanus-beyaz',
            'siyah-altin'
        ],
        moduller: [
            'iletisim-formu',
            'galeri',
            'ucretsiz-kesif',
            'acil-buton',
            'hizmet-fiyat-listesi',
            'hizmet-bolgeleri',
            'sss-genis',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Ölçü ve ürün türü (cam balkon, pencere, ayna) iste. Keşif sonrası fiyat ver.',
        aiDavranisi: 'Net ve güvenilir. Isıcam, cam balkon faydalarını kısa anlat.',
        satisStratejisi: 'Fiyat vermeden önce ölçü ve tür sor. Ücretsiz keşif teklif et.',
        siteTasarimRehberi: 'Ferah, cam/ışık hissi; mavi-beyaz ağırlık.',
        heroBaslik: 'Cam ve Pencere Sorununda İlk Arama Sizi Bulsun',
        altBaslik: 'Cam balkon fiyatı mı, ısıcam mı, acil kırık mı — müşteri ne sorarsa AI hemen devreye girer ve keşif ayarlar.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Cam balkonum var, isıcam yapmak istiyorum yaklaşık kaça çıkar?',
                ai: 'Merhaba! Balkon boyu ve genişliğine göre fiyat değişiyor. 3 metre genişlik için tahminen 8.000-15.000₺ arası düşünebilirsiniz ama net fiyat için ölçü almalıyız. Ücretsiz keşif için ne zaman uygunsunuz?'
            }
        ]
    },
    {
        id: 'mobilyaci',
        ad: 'Mobilyacı',
        emoji: '🪑',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'furniture maker',
            'mobilyacı',
            'marangoz'
        ],
        hizmetler: [
            'Mutfak Dolabı',
            'Yatak Odası',
            'Banyo Mobilyası',
            'Oturma Grubu',
            'Özel Üretim',
            'Montaj'
        ],
        slogan: 'Hayalinizdeki Mobilya, Ustaca İşçilik',
        cta: 'Katalog İste',
        onerilenPaletler: [
            'zeytin-altin',
            'siyah-altin',
            'beton-turuncu'
        ],
        moduller: [
            'iletisim-formu',
            'galeri',
            'katalog',
            'ucretsiz-kesif',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Müşteri fiyat sorduğunda hemen fiyat verme. Önce tarzını, ölçülerini, odasını sor; güven inşa et, keşif teklif et.',
        aiDavranisi: 'Ustaca ve danışman gibi konuş. Hayalini dinle, malzeme ve süreç hakkında bilgi ver.',
        satisStratejisi: 'Fiyatı keşif/ölçü sonrası ver. Çapraz satış: mutfak isteyene banyo da hatırlat. Katalog/portföy paylaş.',
        siteTasarimRehberi: 'Sıcak ahşap/altın tonları; galeri ve katalog öne çıksın.',
        heroBaslik: 'Hayalinizdeki Mobilya Artık Birkaç Mesaj Uzağınızda',
        altBaslik: 'Mutfak dolabından yatak odasına, özel üretimden montaja — AI asistanınız hayalinizi dinler, ustalarımız hayata geçirir.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Merhaba, mutfak dolabı yaptırmak istiyorum, fiyat için ne yapmam lazım?',
                ai: 'Merhaba! Mutfak dolabı fiyatı; boyut, malzeme (MDF/laminat/lake) ve donanımlara göre değişiyor. Size özel fiyat için mutfak ölçülerinizi ve tarz tercihinizi (modern/klasik) paylaşabilir misiniz? Dilerseniz atelye kataloğumuzu da gönderebilirim.'
            }
        ]
    },
    {
        id: 'nakliyeci',
        ad: 'Nakliyeci',
        emoji: '🚛',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'moving company',
            'nakliyat',
            'taşımacılık'
        ],
        hizmetler: [
            'Ev Taşıma',
            'Ofis Taşıma',
            'Asansörlü Taşıma',
            'Eşya Depolama',
            'Ambalajlama',
            'Şehirlerarası'
        ],
        slogan: 'Taşınmak Artık Stressiz',
        cta: 'Fiyat Hesapla',
        onerilenPaletler: [
            'beton-turuncu',
            'gece-mavisi',
            'koyu-kirmizi'
        ],
        moduller: [
            'iletisim-formu',
            'fiyat-hesaplayici',
            'online-rezervasyon',
            'hizmet-bolgeleri',
            'galeri',
            'sss-genis',
            'canli-destek',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Çıkış/giriş adres, oda sayısı veya eşya listesi iste. Asansör var mı sor. Şehirlerarası ise mesafe vurgula.',
        aiDavranisi: 'Rahatlatıcı ve organize. "Stressiz taşınma" vurgusu yap.',
        satisStratejisi: 'Fiyat hesaplama için adres ve eşya bilgisi topla. Ambalaj ve sigorta ek hizmet öner.',
        siteTasarimRehberi: 'Dinamik, güvenilir; CTA "Fiyat Hesapla" belirgin.',
        heroBaslik: 'Taşınmak Artık Stressiz — Fiyat 2 Dakikada, Eşyalar Güvende',
        altBaslik: 'Adresinizi söyleyin, AI anlık fiyat hesaplasın. Asansörlü taşımadan sigortalı eşyaya kadar her şey ayarlanır.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Kadıköy\'den Üsküdar\'a 2+1 ev taşımak istiyorum, fiyat öğrenebilir miyim?',
                ai: 'Merhaba! Kadıköy-Üsküdar arası yakın mesafe, 2+1 için ortalama 3.500-5.500₺ arası düşünebilirsiniz. Kesin fiyat için kat bilgisi (asansör var mı?) ve büyük eşya sayısı lazım. Mutfak eşyalarını da biz mi paketliyoruz?'
            }
        ]
    },
    {
        id: 'temizlikci',
        ad: 'Temizlik Şirketi',
        emoji: '🧹',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'cleaning service',
            'temizlik',
            'ev temizliği'
        ],
        hizmetler: [
            'Ev Temizliği',
            'Ofis Temizliği',
            'İnşaat Sonrası',
            'Cam Silme',
            'Halı Yıkama',
            'Dezenfeksiyon'
        ],
        slogan: 'Pırıl Pırıl Temizlik Garantisi',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'okyanus-beyaz',
            'derin-yesil',
            'krem-pastel'
        ],
        moduller: [
            'iletisim-formu',
            'online-rezervasyon',
            'paket-listesi',
            'hizmet-fiyat-listesi',
            'galeri',
            'hizmet-bolgeleri',
            'sss-genis',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Ev/ofis/inşaat sonrası ayrımı yap. m² veya oda sayısı iste. Tek seferlik / düzenli paket sun.',
        aiDavranisi: 'Temiz ve güvenilir ton. Hijyen ve garanti vurgula.',
        satisStratejisi: 'Paket listesi sun; düzenli hizmet isteyenlere indirim hatırlat.',
        siteTasarimRehberi: 'Temiz, aydınlık; beyaz/yeşil ağırlık.',
        heroBaslik: 'Temizlik İşini Profesyonellere Bırakın, Siz İşinize Bakın',
        altBaslik: 'Tek seferlik veya haftalık periyodik — AI asistanınız uygun paketi sunar, ekibi planlar, hatırlatma gönderir.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Ev temizliği istiyorum, 2+1 daire için ne kadar ücret alıyorsunuz?',
                ai: 'Merhaba! 2+1 daire için standart temizlik paketimiz 600-900₺ arası. Mutfak, banyo, tüm odalar, cam silme dahil. İnşaat sonrası veya derin temizlik isterseniz fiyat farklılık gösterebilir. Hangi gün uygun sizin için?'
            }
        ]
    },
    // ── GÜZELLIK & BAKIM ──────────────────────────────────────────────────────
    {
        id: 'kuafor',
        ad: 'Kuaför',
        emoji: '✂️',
        kategori: 'Güzellik & Bakım',
        anahtar: [
            'hair salon',
            'kuaför',
            'berber'
        ],
        hizmetler: [
            'Saç Kesimi',
            'Saç Boyama',
            'Keratin Bakım',
            'Makyaj',
            'Kaş Tasarımı',
            'Gelin Saçı'
        ],
        slogan: 'Güzelliğiniz Bizim Tutkumuz',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'krem-pastel',
            'mor-premium',
            'siyah-altin'
        ],
        moduller: [
            'randevu',
            'galeri',
            'hizmet-fiyat-listesi',
            'instagram-feed',
            'oncesi-sonrasi-slider',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Randevuda hizmet ve saat seç. Gelin saçı / özel gün için erken tarih öner.',
        aiDavranisi: 'Sıcak ve iltifatkar konuş. Müşteriyi dinle, tarz tercihini sor.',
        satisStratejisi: 'Çapraz satış yap: saç boyama isteyene bakım da öner. Paket ve bakım hatırlat.',
        siteTasarimRehberi: 'Zarif, pastel hatlı; önce/sonra ve galeri öne çıksın.',
        heroBaslik: 'Koltuğun Her Saati Dolu Olsun',
        altBaslik: 'WhatsApp, Instagram veya Google\'dan gelen randevu isteklerini AI anında yönetir. Siz sadece kesiminize odaklanın.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Cumartesi saat 14:00 için randevu alabilir miyim, saç boyama yaptıracağım?',
                ai: 'Merhaba! Cumartesi 14:00 müsait görünüyor 🎉 Saç boyama (tek renk/röfle/balayage) hangisi olacak? Saçın uzunluğuna göre süre ve fiyat değişiyor, ona göre slotu ayarlayalım.'
            }
        ]
    },
    {
        id: 'guzellik-merkezi',
        ad: 'Güzellik Merkezi',
        emoji: '💅',
        kategori: 'Güzellik & Bakım',
        anahtar: [
            'beauty salon',
            'güzellik salonu',
            'estetik'
        ],
        hizmetler: [
            'Cilt Bakımı',
            'Manikür/Pedikür',
            'Kalıcı Makyaj',
            'Epilasyon',
            'Kaş Lifting',
            'Hydrafacial'
        ],
        slogan: 'Kendinizi En İyi Hissedin',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'krem-pastel',
            'mor-premium',
            'siyah-altin'
        ],
        moduller: [
            'randevu',
            'galeri',
            'hizmet-fiyat-listesi',
            'instagram-feed',
            'oncesi-sonrasi-slider',
            'ekip-uyeleri',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Sıcak ve iltifatkar konuş. Çapraz satış yap: Örn. saç boyama isteyene bakım da öner.',
        aiDavranisi: 'Sıcak, iltifatkar, kişiselleştirilmiş. "Sizin için en uygun" vurgusu.',
        satisStratejisi: 'Tek hizmet isteyene paket veya ek hizmet öner (cilt + manikür). İlk kez gelenlere tanışım fırsatı sun.',
        siteTasarimRehberi: 'Zarif, pastel, feminen; önce/sonra slider ve fiyat listesi net.',
        heroBaslik: 'Her Bakım Seansında Kendinizin En İyi Versiyonu',
        altBaslik: 'Cilt bakımı, epilasyon, kaş lifting — AI asistanınız uygun randevuyu bulur, hatırlatma gönderir, iptalleri yönetir.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Hydrafacial yaptırmak istiyorum, ne kadar sürüyor ve fiyatı nedir?',
                ai: 'Merhaba! Hydrafacial seansı yaklaşık 60-75 dakika sürüyor, güncel fiyatımız 1.200₺. Seansdan sonra makyaj uygulama yapabilirsiniz 💆‍♀️ Bu hafta için müsait gün bakalım mı?'
            }
        ]
    },
    {
        id: 'berber',
        ad: 'Berber',
        emoji: '💈',
        kategori: 'Güzellik & Bakım',
        anahtar: [
            'barbershop',
            'berber',
            'erkek kuaförü'
        ],
        hizmetler: [
            'Saç Kesimi',
            'Sakal Tıraşı',
            'Cilt Bakımı',
            'Bıyık Şekillendirme',
            'Çocuk Kesimi',
            'Saç Boya'
        ],
        slogan: 'Erkek Bakımında Ustayız',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'siyah-altin',
            'beton-turuncu',
            'gece-mavisi'
        ],
        moduller: [
            'randevu',
            'galeri',
            'hizmet-fiyat-listesi',
            'oncesi-sonrasi-slider',
            'iletisim-formu',
            'instagram-feed',
            'sss-genis',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Erkek müşteriye kısa, net, rahat ton. Saç+sakal paketi öner.',
        aiDavranisi: 'Rahat, erkek bakımına özel üslup. "Usta" ve "kesim" odaklı.',
        satisStratejisi: 'Komple (saç+sakal) paket vurgula. Çocuk kesimi ayrı fiyatlandır.',
        siteTasarimRehberi: 'Erkek, net çizgiler; koyu aksan, galeri güçlü.',
        heroBaslik: 'İyi Bir Kesim Gününü Tamamlar — Yerinizi Şimdiden Ayırtın',
        altBaslik: 'Saç + sakal kombo veya sadece tıraş — randevunuzu dakikalar içinde alın, sıra beklemeyin.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Bugün için yer var mı, saç + sakal yaptıracağım?',
                ai: 'Selamlar! Bugün 15:00 ve 17:30\'da yer var. Saç + sakal kombo 45-50 dakika sürüyor. Hangisi daha uygun, hemen ayarlayalım mı? 💈'
            }
        ]
    },
    {
        id: 'masaj-spa',
        ad: 'Masaj & Spa',
        emoji: '🧘',
        kategori: 'Güzellik & Bakım',
        anahtar: [
            'massage',
            'spa',
            'masaj'
        ],
        hizmetler: [
            'İsveç Masajı',
            'Aromaterapi',
            'Taş Masajı',
            'Refleksoloji',
            'Çift Masajı',
            'Paket Seanslar'
        ],
        slogan: 'Bedeninize ve Zihninize Huzur',
        cta: 'Seans Rezervasyonu',
        onerilenPaletler: [
            'zeytin-altin',
            'mor-premium',
            'krem-pastel'
        ],
        moduller: [
            'randevu',
            'paket-listesi',
            'galeri',
            'instagram-feed',
            'hizmet-fiyat-listesi',
            'iletisim-formu',
            'ekip-uyeleri',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Seans türü ve süre seçtir. Çift masajı veya paket seansları öne çıkar.',
        aiDavranisi: 'Sakin, huzur veren, profesyonel. Gürültü yapma, kısa ve rahatlatıcı cümleler.',
        satisStratejisi: 'Paket seans (5\'li, 10\'lu) öner. İlk seans indirimi veya hediye çeki hatırlat.',
        siteTasarimRehberi: 'Sakin, organik tonlar; huzur ve premium his.',
        heroBaslik: 'Haftanın Stresini Bırakın, Bedeniniz Dinlensin',
        altBaslik: 'Aromaterapi, taş masajı, çift masajı — uygun seansı seçin, AI güvenli rezervasyonunuzu oluştursun.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Eşimle birlikte çift masajı rezervasyonu yapmak istiyoruz, ne zaman müsaitsiniz?',
                ai: 'Merhaba! Çift masaj odamız Cumartesi günleri çok sevilir 🌿 Bu hafta Cuma 17:00 veya Cumartesi sabah 10:00 müsait. Süre tercihiniz: 60 dk mı 90 dk mı? Aromaterapi veya taş masajı seçeneklerimiz de var.'
            }
        ]
    },
    // ── YİYECEK & İÇECEK ────────────────────────────────────────────────────
    {
        id: 'restoran',
        ad: 'Restoran',
        emoji: '🍽️',
        kategori: 'Yiyecek & İçecek',
        anahtar: [
            'restaurant',
            'restoran',
            'lokanta'
        ],
        hizmetler: [
            'Türk Mutfağı',
            'Izgara & Kebap',
            'Öğle Yemeği',
            'Akşam Yemeği',
            'Paket Servis',
            'Organizasyon'
        ],
        slogan: 'Sipariş → Mutfak → Garson → Masa → KPI: Tüm Operasyonu Tek Platformdan Yönetin',
        cta: 'Restoran İşletim Sistemini İncele',
        onerilenPaletler: [
            'sicak-toprak',
            'zeytin-altin',
            'siyah-altin'
        ],
        moduller: [
            'menu',
            'online-rezervasyon',
            'galeri',
            'siparis-linki',
            'qr-menu',
            'masadan-siparis',
            'kds-mutfak-ekrani',
            'garson-dispatch',
            'masa-yasam-dongusu',
            'dijital-bahsis',
            'kpi-sla-radari',
            'salon-radari',
            'instagram-feed',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Restoran İşletim Sistemi (Premium+): QR masadan sipariş, Alman usulü ödeme, 3-kolon mutfak KDS, Uber-tarzı otonom garson dispatch, 8 aşamalı masa yaşam döngüsü, dijital bahşiş motoru, KPI/SLA radarı ve kuşbakışı salon haritası. Rezervasyonda kişi sayısı ve tarih/saat al. Masadan sipariş veya QR menü linki paylaş.',
        aiDavranisi: 'Lezzetli ve davetkar. Günün menüsü veya özel gün organizasyonu hatırlat. Restoran İşletim Sistemi özelliklerini sorarlarsa /ozellikler/restoran-isletim-sistemi sayfasına yönlendir.',
        satisStratejisi: 'Rezervasyonu netleştir. Paket servis ve organizasyon (doğum günü, iş yemeği) öner. Premium+ paket ile tüm restoran modüllerini (KDS, Garson POS, KPI, Salon Radarı) dahil et.',
        siteTasarimRehberi: 'Sıcak, iştah açıcı renkler; menü ve rezervasyon CTA belirgin.',
        heroBaslik: 'Masalar Dolsun, Servis Aksin — Sipariş Anından KPI\'ya Otonom Restoran',
        altBaslik: 'QR sipariş, akıllı mutfak KDS, Uber-tarzı garson dispatch, dijital bahşiş ve patron radarı — Türkiye\'nin en gelişmiş restoran yönetim yazılımı.',
        onerilenPaket: 'PREMIUMPLUS',
        mockDiyalog: [
            {
                musteri: 'Cuma akşamı 8 kişilik masa için rezervasyon yapabilir miyiz?',
                ai: 'Merhaba! Cuma akşamı sizi ağırlamak için sabırsızlanıyoruz 🍽️ Saat tercihiniz nedir — 19:00 mu 20:00 mu? İsim ve telefon numaranızı da paylaşırsanız rezervasyonu hemen oluşturayım.'
            }
        ]
    },
    {
        id: 'kafe',
        ad: 'Kafe & Pastane',
        emoji: '☕',
        kategori: 'Yiyecek & İçecek',
        anahtar: [
            'cafe',
            'kafe',
            'pastane',
            'coffee shop'
        ],
        hizmetler: [
            'Kahve Çeşitleri',
            'Tatlılar',
            'Atıştırmalık',
            'Kahvaltı',
            'Özel Pasta',
            'Çalışma Alanı'
        ],
        slogan: 'Her Yudumda Huzur',
        cta: 'Menüyü Gör',
        onerilenPaletler: [
            'sicak-toprak',
            'zeytin-altin',
            'krem-pastel'
        ],
        moduller: [
            'menu',
            'galeri',
            'gunun-ozel',
            'qr-menu',
            'masadan-siparis',
            'instagram-feed',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Günün özelü ve tatlı/pasta vurgula. QR menü veya masadan sipariş linki ver.',
        aiDavranisi: 'Sıcak, samimi, "ikinci ev" hissi. Kahve ve tatlı kültürüne saygılı.',
        satisStratejisi: 'Özel pasta siparişi, kahvaltı paketi, toplu sipariş (ofis) öner.',
        siteTasarimRehberi: 'Sıcak, pastel; kahve ve tatlı görselleri öne çıksın.',
        heroBaslik: 'Her Yudumda Huzur — Müşterileriniz Sizi Tercih Etsin',
        altBaslik: 'Günlük menünüzü, özel pasta siparişlerini ve kurumsal sipariş taleplerini AI yönetsin.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Doğum günü için özel pasta sipariş etmek istiyorum, hazırlar mısınız?',
                ai: 'Tabii ki! 🎂 Özel pasta siparişleri için 3 gün öncesinden haber vermeniz yeterli. Kaç kişilik, hangi tarihte ve yazı metnini paylaşır mısınız? Çikolatalı, meyveli veya temalı seçeneklerimiz var.'
            }
        ]
    },
    {
        id: 'yemek-siparis',
        ad: 'Paket Servis',
        emoji: '🛵',
        kategori: 'Yiyecek & İçecek',
        anahtar: [
            'food delivery',
            'paket servis',
            'yemek siparişi'
        ],
        hizmetler: [
            'Hızlı Teslimat',
            'Günlük Menü',
            'Ekonomik Setler',
            'Vejetaryen',
            'Kurumsal Sipariş',
            'Catering'
        ],
        slogan: 'Taze, Hızlı, Lezzetli',
        cta: 'Sipariş Ver',
        onerilenPaletler: [
            'koyu-kirmizi',
            'sicak-toprak',
            'beton-turuncu'
        ],
        moduller: [
            'menu',
            'siparis-linki',
            'galeri',
            'masadan-siparis',
            'gunun-ozel',
            'sss-genis',
            'iletisim-formu',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Sipariş linki veya platform (Yemeksepeti, Getir) yönlendirmesi yap. Minimum sipariş varsa söyle.',
        aiDavranisi: 'Hızlı ve net. Teslimat süresi ve asgari tutar bilgisi ver.',
        satisStratejisi: 'Günlük menü ve set menüleri öne çıkar. Kurumsal/catering teklif et.',
        siteTasarimRehberi: 'Dinamik, dikkat çekici; sipariş CTA çok belirgin.',
        heroBaslik: 'Taze ve Sıcak — Kapınıza 30 Dakikada',
        altBaslik: 'Günlük menü, set menüler ve kurumsal catering siparişleri — AI asistanınız siparişi alır, mutfağa iletir.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Bugünün menüsü nedir, kaç kişilik sipariş verebilirim?',
                ai: 'Merhaba! Bugünkü menümüz: 🍖 Izgara köfte set (42₺), 🥗 Mercimek çorba + yarım ekmek (18₺), 🍗 Fırın tavuk set (38₺). Minimum sipariş 60₺, teslimat alanınız için posta kodunuzu paylaşır mısınız?'
            }
        ]
    },
    // ── SAĞLIK ───────────────────────────────────────────────────────────────
    {
        id: 'eczane',
        ad: 'Eczane',
        emoji: '💊',
        kategori: 'Sağlık',
        anahtar: [
            'pharmacy',
            'eczane'
        ],
        hizmetler: [
            'Reçeteli İlaç',
            'OTC Ürünler',
            'Takviye & Vitamin',
            'Bebek Ürünleri',
            'Kozmetik',
            'Ölçüm Hizmetleri'
        ],
        slogan: 'Sağlığınız Güvende',
        cta: 'Nöbet Durumu',
        onerilenPaletler: [
            'okyanus-beyaz',
            'derin-yesil'
        ],
        moduller: [
            'nobet-takvimi',
            'iletisim-formu',
            'hizmet-fiyat-listesi',
            'recete-iletme',
            'ilac-hatirlatici',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Reçete iletme ve nöbet bilgisi öne çıkar. Hukuki/medikal tavsiye verme; "eczacınıza danışın" de.',
        aiDavranisi: 'Güvenilir, net, gizlilik odaklı. Reçete ve kişisel veri paylaşımında dikkatli ol.',
        satisStratejisi: 'Online reçete iletme ve ilaç hatırlatıcı hizmetini tanıt. Nöbetçi bilgisini net ver.',
        siteTasarimRehberi: 'Temiz, güven veren; beyaz/yeşil. Nöbet ve iletişim net.',
        heroBaslik: 'Sağlığınız İçin 7 Gün, 7/24 Yanınızdayız',
        altBaslik: 'Nöbet durumu, ilaç hatırlatıcı ve reçete iletme hizmetiyle dijital eczaneniz her zaman açık.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Bu gece nöbetçi eczane siz misiniz?',
                ai: 'Merhaba! Bu gece nöbet hizmetimiz var, sabah 08:00\'e kadar açığız. Acil ilaç ihtiyacınız için gelirken reçetenizi de getirmeyi unutmayın. Başka yardım edebileceğim bir şey var mı?'
            }
        ]
    },
    {
        id: 'veteriner',
        ad: 'Veteriner',
        emoji: '🐾',
        kategori: 'Sağlık',
        anahtar: [
            'veterinarian',
            'veteriner',
            'hayvan hastanesi'
        ],
        hizmetler: [
            'Muayene',
            'Aşılama',
            'Kısırlaştırma',
            'Diş Bakımı',
            'Acil Müdahale',
            'Pet Otel'
        ],
        slogan: 'Dostunuzun Sağlığı İçin',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'derin-yesil',
            'okyanus-beyaz',
            'krem-pastel'
        ],
        moduller: [
            'randevu',
            'galeri',
            'iletisim-formu',
            'acil-buton',
            'hizmet-fiyat-listesi',
            'paket-listesi',
            'sss-genis',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Acil ("hasta", "kaza", "kusma") derse hemen randevu veya acil yönlendir. Tür (köpek/kedi) ve şikayet sor.',
        aiDavranisi: 'Sıcak ve hayvan sever. Müşteriyi sakinleştir, "dostunuz" ifadesi kullan.',
        satisStratejisi: 'Aşı takvimi ve periyodik kontrol hatırlat. Pet otel ve acil hizmet vurgula.',
        siteTasarimRehberi: 'Sıcak, güvenilir; yeşil/beyaz. Dost canlısı görsel his.',
        heroBaslik: 'Dostunuz İçin En İyi Bakım — Randevu Hemen Alınır',
        altBaslik: 'Aşı takviminden acil müdahaleye, pet otel rezervasyonundan diş bakımına — AI her talebi anında karşılar.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Kedim iki gündür yemek yemiyor, bugün muayene edebilir misiniz?',
                ai: 'Merhaba! İki günlük iştahsızlık ciddi olabilir, bugün bakabiliriz 🐾 Saat 14:00 veya 16:30 müsait. Kedinizin yaşı ve kısırlaştırılmış mı? Bilgi olursa doktor önceden hazırlanır.'
            }
        ]
    },
    {
        id: 'diyetisyen',
        ad: 'Diyetisyen & Beslenme',
        emoji: '🥗',
        kategori: 'Sağlık',
        anahtar: [
            'dietitian',
            'diyetisyen',
            'beslenme uzmanı'
        ],
        hizmetler: [
            'Kilo Yönetimi',
            'Spor Beslenmesi',
            'Online Danışmanlık',
            'Diyet Programı',
            'Bebek Beslenmesi',
            'Hastalık Diyeti'
        ],
        slogan: 'Sağlıklı Yaşam, Doğru Beslenme',
        cta: 'Danışma Al',
        onerilenPaletler: [
            'derin-yesil',
            'krem-pastel',
            'okyanus-beyaz'
        ],
        moduller: [
            'randevu',
            'online-danisma',
            'paket-listesi',
            'galeri',
            'ekip-uyeleri',
            'sss-genis',
            'iletisim-formu',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Hastalık/ilaç varsa "doktorunuzla birlikte" vurgula. Diyet reçetesi verme; randevuya çevir.',
        aiDavranisi: 'Destekleyici ve motive edici. Sağlık iddiasında bulunma.',
        satisStratejisi: 'İlk danışmanlık veya paket program öner. Online danışmanlık seçeneği sun.',
        siteTasarimRehberi: 'Sağlıklı, ferah; yeşil ve pastel tonlar.',
        heroBaslik: 'Sağlıklı Yaşam Yolculuğunuz Bugün Başlasın',
        altBaslik: 'Kilo yönetimi, spor beslenmesi veya hastalık diyeti — online danışmanlık veya yüz yüze, AI randevunuzu ayarlasın.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Diyetisyenle görüşmek istiyorum, online seans yapıyor musunuz?',
                ai: 'Merhaba! Evet, online danışmanlık seanslarımız var 🥗 Google Meet üzerinden 45 dakikalık ilk seans 350₺. Bu hafta için uygun gün ve saat paylaşır mısınız? Herhangi bir sağlık durumunuz veya ilaç kullanımınız var mı?'
            }
        ]
    },
    // ── PROFESYONEL HİZMETLER ────────────────────────────────────────────────
    {
        id: 'muhasebeci',
        ad: 'Muhasebe & Mali Müşavir',
        emoji: '📊',
        kategori: 'Profesyonel Hizmetler',
        anahtar: [
            'accountant',
            'muhasebeci',
            'mali müşavir',
            'b2b',
            'danışmanlık'
        ],
        hizmetler: [
            'Muhasebe',
            'Vergi Beyannamesi',
            'Şirket Kuruluşu',
            'Maaş Bordrosu',
            'SGK İşlemleri',
            'Mali Danışmanlık',
            'Sözleşme Yönetimi',
            'B2B İş Geliştirme'
        ],
        slogan: 'Mali İşlerinizde Güvenilir Dijital Ortağınız',
        cta: 'Ücretsiz Danışma',
        onerilenPaletler: [
            'mor-premium',
            'gece-mavisi',
            'siyah-altin'
        ],
        moduller: [
            'iletisim-formu',
            'online-danisma',
            'evrak-listesi',
            'hizmet-fiyat-listesi',
            'sss-genis',
            'galeri',
            'canli-destek'
        ],
        knowHow: 'Vergi/hukuki tavsiye verme. Sadece randevu ve hizmet türü topla. Gerekli evrak listesini paylaş. Sözleşme ve evrak yönetiminde otomasyon vurgula.',
        aiDavranisi: 'Resmi, net ve mesafeli dil kullan. Kurumsal güven hissi ver. B2B müşteri deneyimi odaklı.',
        satisStratejisi: 'Hukuki/mali tavsiye veriyormuş gibi yapma; randevuya çevir. \"Ücretsiz ön görüşme\" vurgula. Otomatik dosya/arşiv hizmeti öne çıkar.',
        siteTasarimRehberi: 'Kurumsal, ciddi; koyu lacivert/mor, güven veren.',
        heroBaslik: 'Mali İşleriniz Düzenli, Cezalar Sıfır — Profesyonel Destek Yanınızda',
        altBaslik: 'Vergi beyannamesi, SGK işlemleri, şirket kuruluşu ve B2B sözleşme yönetimi — AI asistanınız evrak toplar, ön görüşme ayarlar.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Şahıs şirketim var, muhasebe hizmeti için görüşebilir miyiz?',
                ai: 'Merhaba! Şahıs işletmesi muhasebe hizmetimiz kapsamlı — aylık beyanname, SGK, bordro dahil. Ücretsiz ön görüşme için bu hafta Salı veya Perşembe müsaitiz. Sektörünüz ve yaklaşık ciro bilgisini paylaşabilir misiniz?'
            }
        ]
    },
    {
        id: 'avukat',
        ad: 'Avukat',
        emoji: '⚖️',
        kategori: 'Profesyonel Hizmetler',
        anahtar: [
            'lawyer',
            'avukat',
            'hukuk bürosu'
        ],
        hizmetler: [
            'Aile Hukuku',
            'İş Hukuku',
            'Ceza Hukuku',
            'Gayrimenkul',
            'Miras Hukuku',
            'Sözleşme Hazırlama'
        ],
        slogan: 'Haklarınız İçin Yanınızdayız',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'siyah-altin',
            'mor-premium',
            'gece-mavisi'
        ],
        moduller: [
            'randevu',
            'iletisim-formu',
            'online-danisma',
            'proje-portfoy',
            'sss-genis',
            'ekip-uyeleri',
            'hizmet-fiyat-listesi',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Hukuki tavsiye verme. Sadece konu (alan) ve randevu topla. "Avukatınızla görüşmeniz gerekir" de.',
        aiDavranisi: 'Resmi, net ve mesafeli. Gizlilik ve güven vurgula.',
        satisStratejisi: 'Hukuki yorum yapma; randevuya çevir. İlk görüşme ücreti bilgisi (varsa) net ver.',
        siteTasarimRehberi: 'Ciddi, kurumsal; siyah/lacivert, güven ve otorite.',
        heroBaslik: 'Haklarınız İçin Güçlü Bir Ses — Hukuki Destek Her Zaman Yanınızda',
        altBaslik: 'Aile hukuku, iş davası veya gayrimenkul uyuşmazlığı — AI asistanınız durumunuzu dinler, uygun randevu ayarlar.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'İş akdim haksız feshedildi, ne yapabilirim?',
                ai: 'Merhaba. Bu tür durumlarda hukuki haklarınız var, yalnız değilsiniz. Fesih bildirimini aldıysanız 1 aylık hak düşürücü süre önemli. Avukatımızla değerlendirme randevusu için uygun zamanınızı paylaşabilir misiniz?'
            }
        ]
    },
    {
        id: 'mimar-tasarimci',
        ad: 'Mimar & İç Mimar',
        emoji: '🏛️',
        kategori: 'Profesyonel Hizmetler',
        anahtar: [
            'architect',
            'mimar',
            'iç mimar',
            'interior designer'
        ],
        hizmetler: [
            'Konut Tasarımı',
            'Ofis Tasarımı',
            'Tadilat Yönetimi',
            '3D Görselleştirme',
            'Proje Danışmanlığı',
            'Şantiye Yönetimi'
        ],
        slogan: 'Hayallerinizi Tasarlıyoruz',
        cta: 'Portföyü Gör',
        onerilenPaletler: [
            'siyah-altin',
            'beton-turuncu',
            'zeytin-altin'
        ],
        moduller: [
            'galeri',
            'santiye-gunlugu',
            'iletisim-formu',
            'proje-portfoy',
            'oncesi-sonrasi-slider',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Müşteri fiyat sorduğunda hemen fiyat verme. Önce tarzını, ölçülerini, proje türünü sor; güven inşa et, keşif teklif et.',
        aiDavranisi: 'Yaratıcı ve danışman gibi. Hayalini dinle, portföy ve süreç anlat.',
        satisStratejisi: 'Fiyatı keşif/öneri sonrası ver. Proje portföyü paylaş; şantiye takibi güven verir.',
        siteTasarimRehberi: 'Minimal, tasarım odaklı; portföy ve şantiye günlüğü öne çıksın.',
        heroBaslik: 'Projeleriniz Konuşsun — Müşteriler Sizi Bulsun',
        altBaslik: 'Şantiye günlükleri, proje portföyü ve 3D görselleştirme — hepsi tek bir AI destekli platformda. Müşterileriniz projeyi canlı takip etsin.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Dairemi yenilemek istiyorum, iç mimarlık hizmeti için nasıl bir süreç var?',
                ai: 'Merhaba! İç mimarlık projelerinde önce ücretsiz keşif ve fikir görüşmesi yapıyoruz. Dairenizin büyüklüğü ve tarz tercihinizi (modern/Skandinav/klasik) paylaşırsanız yaklaşık süre ve bütçe konusunda bilgi verelim. Şantiye günlük takibi de sistemimiz üzerinden yapılıyor.'
            }
        ]
    },
    {
        id: 'emlakci',
        ad: 'Emlak & Gayrimenkul',
        emoji: '🏠',
        kategori: 'Profesyonel Hizmetler',
        anahtar: [
            'real estate',
            'emlak',
            'gayrimenkul',
            'emlakçı',
            'kiralık',
            'satılık'
        ],
        hizmetler: [
            'Satılık Konut',
            'Kiralık Konut',
            'Ticari Gayrimenkul',
            'Portföy İnceleme',
            'Müşteri Anketi',
            'Değerleme Talebi'
        ],
        slogan: 'Portföy → Sahibinden + Hepsiemlak + Emlakjet: Tek Noktadan Yönetin',
        cta: 'Emlak Yönetim Sistemini İncele',
        onerilenPaletler: [
            'gece-mavisi',
            'siyah-altin',
            'zeytin-altin'
        ],
        moduller: [
            'galeri',
            'proje-portfoy',
            'iletisim-formu',
            'hizmet-fiyat-listesi',
            'online-rezervasyon',
            'sss-genis',
            'instagram-feed',
            'canli-destek',
            'platform-sendikasyonu',
            'musteri-eslestirme-crm',
            'degerleme-motoru',
            'danisman-performans',
            'portfoy-yonetimi',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Emlak Yönetim Sistemi (Premium+): 8 aşamalı mülk yaşam döngüsü, Sahibinden/Hepsiemlak/Emlakjet çoklu platform ilan sendikasyonu, AI müşteri-mülk eşleştirme motoru, karşılaştırmalı değerleme, danışman komisyon takibi. Talep türü (satılık/kiralık), bölge ve bütçe sor.',
        aiDavranisi: 'Profesyonel ve güven verici. Müşteri ihtiyacını dinle, portföy ve randevu öner. Emlak Yönetim Sistemi özelliklerini sorarlarsa /ozellikler/emlak-yonetim-sistemi sayfasına yönlendir.',
        satisStratejisi: 'Portföy ve müşteri anketi ile lead topla. Keşif ve görüşme randevusu kapat. Premium+ paket ile tüm emlak modüllerini (platform sendikasyonu, CRM, değerleme, performans) dahil et.',
        siteTasarimRehberi: 'Kurumsal, güven veren; portföy ve iletişim CTA net.',
        heroBaslik: 'İlanınız 3 Platformda Aynı Anda — Portföy Yönetimi Otomatik',
        altBaslik: 'Sahibinden, Hepsiemlak, Emlakjet\'e tek tıkla yayınlayın. AI müşteri eşleştirme, karşılaştırmalı değerleme ve danışman performans radarı ile emlak ofisinizi geleceğe taşıyın.',
        onerilenPaket: 'PREMIUMPLUS',
        mockDiyalog: [
            {
                musteri: 'Kadıköy\'de 2+1 kiralık daire arıyorum, bütçem 15.000₺, portföyünüzde var mı?',
                ai: 'Merhaba! Kadıköy\'de 15.000₺ bütçeyle 2+1 için güzel seçeneklerimiz var 🏠 Hangi mahalle veya sokaklar tercihli — merkeze yakın mı, sakin mi? Evcil hayvan var mı? Bu bilgilerle portföyü daraltayım.'
            }
        ]
    },
    {
        id: 'oto-servis',
        ad: 'Oto Servis & Lastikçi',
        emoji: '🔩',
        kategori: 'Otomotiv',
        anahtar: [
            'auto repair',
            'oto servis',
            'lastik',
            'araba tamiri'
        ],
        hizmetler: [
            'Motor Bakım',
            'Lastik Değişimi',
            'Fren Bakımı',
            'Kaporta & Boya',
            'Elektrik Arıza',
            'Periyodik Bakım'
        ],
        slogan: 'Aracınız Güvende',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'beton-turuncu',
            'koyu-kirmizi',
            'gece-mavisi'
        ],
        moduller: [
            'online-rezervasyon',
            'iletisim-formu',
            'arac-sorgulama',
            'sasi-parca-sorgulama',
            'hizmet-fiyat-listesi',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Araç türü ve arıza/hizmet türü sor. Şasi/parça sorgulama (placeholder) sun. Randevu slotu ver.',
        aiDavranisi: 'Teknik ama anlaşılır. Güven ve hız vurgula.',
        satisStratejisi: 'Periyodik bakım paketi ve lastik değişim sezonu hatırlat. Randevu al.',
        siteTasarimRehberi: 'Sanayi hissi; koyu, kalın font. Araç/servis görseli.',
        heroBaslik: 'Aracınız Güvende — Hızlı Servis, Şeffaf Fiyat',
        altBaslik: 'Periyodik bakımdan acil arıza tespitine, şasi sorgulamadan lastik değişimine — randevunuzu alın, biz halledelim.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Arabamın motoru ısındı ve sarı ışık yandı, ne yapmam lazım?',
                ai: 'Merhaba! Sarı motor ikaz lambası ve ısınma ciddi belirti. Aracı çok zorlamayın, mümkünse park edin. Şu an çekici gönderebiliriz veya servisimize getirebilirseniz hemen bakabiliriz. Araç markası/modeli nedir?'
            }
        ]
    },
    {
        id: 'egitim-kurs',
        ad: 'Kurs & Eğitim Merkezi',
        emoji: '📚',
        kategori: 'Eğitim',
        anahtar: [
            'education',
            'kurs',
            'özel ders',
            'eğitim merkezi'
        ],
        hizmetler: [
            'Yabancı Dil',
            'Matematik Kursu',
            'Sınav Hazırlık',
            'Müzik Dersleri',
            'Resim Atölyesi',
            'Online Kurs'
        ],
        slogan: 'Geleceğinizi Birlikte İnşa Edelim',
        cta: 'Kayıt Ol',
        onerilenPaletler: [
            'mor-premium',
            'gece-mavisi',
            'derin-yesil'
        ],
        moduller: [
            'kayit-formu',
            'ders-programi',
            'iletisim-formu',
            'galeri',
            'online-danisma',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Ücretsiz seviye tespit veya deneme dersi teklif et. Yaş ve hedef (sınav, konuşma) sor.',
        aiDavranisi: 'Teşvik edici ve bilgilendirici. Eğitim ve gelişim vurgula.',
        satisStratejisi: 'Seviye tespit formu ve deneme dersi ile lead topla. Paket (aylık/dönemlik) öner.',
        siteTasarimRehberi: 'Eğitici, ferah; ders programı ve kayıt CTA net.',
        heroBaslik: 'Geleceğinizi Bugün İnşa Etmeye Başlayın',
        altBaslik: 'Dil kursu, sınav hazırlık veya sanat atölyesi — ücretsiz deneme dersi ile başlayın, AI programı sizin için kurgular.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Çocuğum için İngilizce kursu almak istiyorum, yaşı 10, hangi seviye uygun?',
                ai: 'Merhaba! 10 yaş grubu için çocuk İngilizce programımız çok eğlenceli 🎓 Önce ücretsiz seviye tespit yapıyoruz (15 dk, online), ardından uygun gruba yerleştiriyoruz. Bu hafta tespit için uygun gün var mı?'
            }
        ]
    },
    {
        id: 'fitness-spor',
        ad: 'Fitness & Spor Salonu',
        emoji: '💪',
        kategori: 'Sağlık & Spor',
        anahtar: [
            'gym',
            'fitness',
            'spor salonu'
        ],
        hizmetler: [
            'Üyelik Programları',
            'Personal Training',
            'Grup Dersleri',
            'Beslenme Danışmanlığı',
            'Crossfit',
            'Pilates'
        ],
        slogan: 'Daha Güçlü Bir Sürüm',
        cta: 'Ücretsiz 1 Gün Dene',
        onerilenPaletler: [
            'koyu-kirmizi',
            'beton-turuncu',
            'gece-mavisi'
        ],
        moduller: [
            'uyelik-paketleri',
            'ders-programi',
            'online-rezervasyon',
            'galeri',
            'instagram-feed',
            'ekip-uyeleri',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Ücretsiz deneme ve üyelik paketi öne çıkar. Grup dersi programı paylaş.',
        aiDavranisi: 'Enerjik ve motive edici. "Daha güçlü sürüm" mesajı ver.',
        satisStratejisi: 'Ücretsiz 1 gün deneme vurgula. Aylık/yıllık üyelik ve PT paketi sun.',
        siteTasarimRehberi: 'Enerjik, güçlü; koyu ve aksan renk (kırmızı/turuncu).',
        heroBaslik: 'Daha Güçlü Bir Sürümün İçin — İlk Gün Ücretsiz',
        altBaslik: 'Üyelik, personal training, grup dersleri veya beslenme danışmanlığı — AI asistanınız hedefinize göre programı önerir.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Spor salonuna yeni üye olmak istiyorum, fiyatlarınız nedir?',
                ai: 'Hoş geldiniz! 💪 Hedefin ne: Kilo vermek mi, kas kazanmak mı, yoksa genel kondisyon mu? Buna göre aylık üyelik (990₺), yıllık üyelik (8.400₺) veya PT paketleri önerebilirim. İlk gün ücretsiz deneme için ne zaman gelebilirsin?'
            }
        ]
    },
    {
        id: 'fotografci',
        ad: 'Fotoğrafçı',
        emoji: '📸',
        kategori: 'Sanat & Kreatif',
        anahtar: [
            'photographer',
            'fotoğrafçı',
            'düğün fotoğrafı'
        ],
        hizmetler: [
            'Düğün Fotoğrafı',
            'Bebek & Doğum',
            'Ürün Fotoğrafı',
            'Kurumsal Çekim',
            'Manzara',
            'Video Çekim'
        ],
        slogan: 'Anlarınızı Ölümsüzleştiriyoruz',
        cta: 'Portföyü İncele',
        onerilenPaletler: [
            'siyah-altin',
            'mor-premium',
            'beton-turuncu'
        ],
        moduller: [
            'galeri',
            'proje-portfoy',
            'online-rezervasyon',
            'paket-listesi',
            'instagram-feed',
            'harita-yol-tarifi',
            'calisma-saatleri',
            'whatsapp-teklif',
            'google-yorumlar',
            'kampanya-afisi',
            'musteri-referanslari',
            'hakkimizda-hikaye',
            'rakamlarla-biz',
            'video-tanitim',
            'sertifika-belgeler',
            'duyuru-bandi',
            'eposta-bulteni',
            'kvkk-gizlilik',
            'cerez-bildirimi',
            'sosyal-medya',
            'whatsapp-canli',
            'blog-makaleler',
            'teklif-formu',
            'kariyer-ilanlari',
            'sikca-arananlar',
            'online-odeme',
            'anket-form',
            'geri-sayim',
            'urun-listesi',
            'indirim-kuponu',
            'musteri-anketi',
            'yol-haritasi',
            'bize-ulasin-sticky'
        ],
        knowHow: 'Çekim türü (düğün, bebek, ürün) ve tarih/mekan sor. Portföy paylaş, fiyatı görüşme sonrası ver.',
        aiDavranisi: 'Yaratıcı ve samimi. Anı ve hikaye vurgula.',
        satisStratejisi: 'Paket (saat/çekim sayısı) ve albüm ek hizmeti öner. Özel gün için erken rezervasyon.',
        siteTasarimRehberi: 'Görsel ağırlıklı; portföy ve galeri öne çıksın, minimal metin.',
        heroBaslik: 'Anlarınız Ölümsüz Kalsın — Profesyonel Objektifte',
        altBaslik: 'Düğün, bebek, ürün veya kurumsal çekim — portföyü inceleyin, paketleri karşılaştırın, rezervasyonunuzu hemen yapın.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Nişan fotoğraf çekimi için fiyat öğrenebilir miyim, 2 kişi olacak?',
                ai: 'Merhaba! Nişan çekimi için 2 kişi; 2 saatlik dış mekan paketi 3.500₺, retouching + dijital teslim dahil 📸 İstanbul\'da konum tercihiniz neler? Bu ay için müsait tarihler de var.'
            }
        ]
    },
    // ── YENİ SEKTÖRLER ────────────────────────────────────────────────────────
    {
        id: 'dis-hekimi',
        ad: 'Diş Hekimi & Klinik',
        emoji: '🦷',
        kategori: 'Sağlık',
        anahtar: [
            'dentist',
            'diş hekimi',
            'diş kliniği',
            'ağız sağlığı'
        ],
        hizmetler: [
            'Diş Muayenesi',
            'Dolgu',
            'Kanal Tedavisi',
            'İmplant',
            'Diş Beyazlatma',
            'Ortodonti'
        ],
        slogan: 'Sağlıklı Gülüşler İçin Uzman Ellerde',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'okyanus-beyaz',
            'derin-yesil',
            'krem-pastel'
        ],
        moduller: [
            'randevu',
            'galeri',
            'iletisim-formu',
            'acil-buton',
            'hizmet-fiyat-listesi',
            'oncesi-sonrasi-slider',
            'ekip-uyeleri',
            'sss-genis'
        ],
        knowHow: 'Acil diş ağrısı derse hemen randevu ver. İmplant/ortodonti fiyatı için muayene gerekir de. Korkusu varsa sakinleştir.',
        aiDavranisi: 'Sakin, güven verici, empati dolu. \"Acı olmayacak\" vurgusu yap.',
        satisStratejisi: 'İlk muayene ücretsiz veya indirimli vurgula. İmplant/beyazlatma paketi öner.',
        siteTasarimRehberi: 'Temiz, steril his; beyaz/mavi. Önce/sonra slider güzel çalışır.',
        heroBaslik: 'Gülüşünüzü Tasarlıyoruz — Randevunuz Bir Mesaj Uzağınızda',
        altBaslik: 'Dolgudan implanta, ortodontiden beyazlatmaya — AI asistanınız randevuyu anında ayarlar, hatırlatma gönderir.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Diş ağrım var acil bakabilir misiniz?',
                ai: 'Merhaba! Acil diş ağrısı için bugün 15:00 müsait. Ağrının yeri (ön/arka), ne zamandır sürüyor ve sıcak/soğuka hassasiyet var mı? Bilgi olursa doktor hazırlıklı olur.'
            }
        ]
    },
    {
        id: 'oto-yikama',
        ad: 'Oto Yıkama',
        emoji: '🚗',
        kategori: 'Otomotiv',
        anahtar: [
            'car wash',
            'oto yıkama',
            'araç yıkama'
        ],
        hizmetler: [
            'İç Temizlik',
            'Dış Yıkama',
            'Detaylı Temizlik',
            'Pasta Cila',
            'Motor Yıkama',
            'Koltuk Yıkama'
        ],
        slogan: 'Aracınıza Showroom Parlaklığı',
        cta: 'Randevu Al',
        onerilenPaletler: [
            'okyanus-beyaz',
            'gece-mavisi',
            'beton-turuncu'
        ],
        moduller: [
            'randevu',
            'paket-listesi',
            'galeri',
            'oncesi-sonrasi-slider',
            'iletisim-formu',
            'hizmet-fiyat-listesi'
        ],
        knowHow: 'Araç tipi (sedan/SUV/ticari) ve hizmet paketi sor. Randevusuz da kabul ama yoğunluk uyarısı ver.',
        aiDavranisi: 'Hızlı, net, arkadaş canlısı. \"Pırıl pırıl\" vurgusu.',
        satisStratejisi: 'Detaylı temizlik ve pasta cila upsell. 5\'li paket kart sun.',
        siteTasarimRehberi: 'Dinamik, temiz his; mavi/turuncu. Önce/sonra slider etkili.',
        heroBaslik: 'Aracınız Mis Gibi — Randevu Anında, Bekleme Yok',
        altBaslik: 'İç temizlik, pasta cila veya detaylı yıkama — paketinizi seçin, AI randevunuzu ayarlasın.',
        onerilenPaket: 'BUYUME',
        mockDiyalog: [
            {
                musteri: 'Yarın arabamı yıkatmak istiyorum, iç dış tam paket ne kadar?',
                ai: 'Merhaba! 🚗 Sedan için iç+dış tam paket 350₺, SUV ise 450₺. Yarın 10:00 veya 14:00 müsait. Hangisi uygun?'
            }
        ]
    },
    {
        id: 'terzi',
        ad: 'Terzi & Kuru Temizleme',
        emoji: '🧵',
        kategori: 'Ev Hizmetleri',
        anahtar: [
            'tailor',
            'terzi',
            'kuru temizleme',
            'elbise tamiri'
        ],
        hizmetler: [
            'Elbise Dikimi',
            'Tadilat',
            'Pantolon Kısaltma',
            'Kuru Temizleme',
            'Gelin/Damat',
            'Perde Dikimi'
        ],
        slogan: 'Kusursuz Dikim, Tertemiz Teslim',
        cta: 'Fiyat Al',
        onerilenPaletler: [
            'siyah-altin',
            'krem-pastel',
            'sicak-toprak'
        ],
        moduller: [
            'iletisim-formu',
            'galeri',
            'hizmet-fiyat-listesi',
            'sss-genis'
        ],
        knowHow: 'Hizmet türü (dikim/tadilat/kuru temizleme) ve aciliyet sor. Özel dikim için ölçü randevusu ver.',
        aiDavranisi: 'Titiz ve güven verici. Kalite ve süre bilgisi net ver.',
        satisStratejisi: 'Kuru temizleme hesteyene perde/koltuk yıkama öner. Düğün sezonu önle.',
        siteTasarimRehberi: 'Zarif, temiz çizgiler; galeri ve fiyat listesi net.',
        heroBaslik: 'Elbiseleriniz Usta Ellerde — Dikim, Tadilat, Kuru Temizleme',
        altBaslik: 'Pantolon kısaltmadan gelinliğe, kuru temizlemeden perde dikimine — fiyat ve teslimat süresini AI anında bildirir.',
        onerilenPaket: 'STANDART',
        mockDiyalog: [
            {
                musteri: 'Pantolon kısaltma yaptırmak istiyorum, ne kadar sürer?',
                ai: 'Merhaba! Pantolon kısaltma genellikle 1-2 gün içinde teslim, acil ise aynı gün yapılabilir. Fiyat 100-150₺ arası. Pantolonu getirirseniz ölçü alıp net fiyat ve süre söyleyelim.'
            }
        ]
    },
    {
        id: 'organizasyon',
        ad: 'Organizasyon & Düğün Salonu',
        emoji: '🎉',
        kategori: 'Etkinlik',
        anahtar: [
            'event planner',
            'organizasyon',
            'düğün salonu',
            'kına',
            'nişan'
        ],
        hizmetler: [
            'Düğün Organizasyonu',
            'Nişan/Kına',
            'Doğum Günü',
            'Kurumsal Etkinlik',
            'Açılış',
            'Catering'
        ],
        slogan: 'Unutulmaz Anlar, Kusursuz Organizasyon',
        cta: 'Teklif Al',
        onerilenPaletler: [
            'mor-premium',
            'siyah-altin',
            'krem-pastel'
        ],
        moduller: [
            'online-rezervasyon',
            'galeri',
            'paket-listesi',
            'iletisim-formu',
            'instagram-feed',
            'sss-genis',
            'ekip-uyeleri'
        ],
        knowHow: 'Etkinlik türü, kişi sayısı ve tarih iste. Paket/fiyat keşif sonrası. Erken rezervasyon indirimi vurgula.',
        aiDavranisi: 'Heyecanlı ama profesyonel. \"Hayalinizdeki gün\" vurgusu.',
        satisStratejisi: 'Paket karşılaştırma sun. Kapora ile erken avantaj vurgula. DJ/fotoğrafçı çapraz satış.',
        siteTasarimRehberi: 'Zarif, şık; galeri ve referanslar öne çıksın.',
        heroBaslik: 'En Özel Gününüz İçin Kusursuz Organizasyon',
        altBaslik: 'Düğünden nişana, kurumsal etkinlikten doğum gününe — AI anlık teklif hazırlar, kapora ile tarihinizi güvence altına alır.',
        onerilenPaket: 'PREMIUM',
        mockDiyalog: [
            {
                musteri: 'Haziran\'da 200 kişilik düğün için salon ve organizasyon fiyatı alabilir miyim?',
                ai: 'Merhaba! Haziran çok güzel bir tercih! 🎉 200 kişilik düğün için 3 farklı paketimiz var. Tarih belirlediyseniz hemen bloke edelim — Haziran doluluk oranı yüksek. Bütçe aralığınızı ve konsept tercihinizi (modern/kır/klasik) paylaşır mısınız?'
            }
        ]
    }
];
function sektorBul(id) {
    return SEKTORLER.find((s)=>s.id === id);
}
function sektorDavranisPrompt(sektorId, personaId) {
    const s = sektorBul(sektorId);
    if (!s || !s.knowHow && !s.aiDavranisi && !s.satisStratejisi) {
        // Persona var ama sektör bilgisi yoksa sadece persona dön
        if (personaId) {
            const { personaPromptEki } = __turbopack_context__.r("[project]/XinXia/apps/web/src/lib/persona/KulturelKimlikTypes.ts [app-client] (ecmascript)");
            return personaPromptEki(personaId);
        }
        return '';
    }
    const parts = [];
    if (s.knowHow) parts.push(`Know-how: ${s.knowHow}`);
    if (s.aiDavranisi) parts.push(`Davranış: ${s.aiDavranisi}`);
    if (s.satisStratejisi) parts.push(`Satış stratejisi: ${s.satisStratejisi}`);
    let prompt = `Senin Davranış Tarzın (${s.ad} sektörü — KESİNLİKLE UYGULA):\n${parts.join('\n')}\n`;
    // Persona varsa ton bilgisini ekle
    if (personaId) {
        const { personaPromptEki } = __turbopack_context__.r("[project]/XinXia/apps/web/src/lib/persona/KulturelKimlikTypes.ts [app-client] (ecmascript)");
        prompt += personaPromptEki(personaId);
    }
    return prompt;
}
const SEKTOR_KATEGORILERI = [
    ...new Set(SEKTORLER.map((s)=>s.kategori))
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectorCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$sektorler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/data/sektorler.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$2_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/framer-motion@12.35.2_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function SectorCarousel() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-24 border-y border-white/5 overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-rust/5 rounded-full blur-[100px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$2_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: true
                        },
                        className: "text-3xl md:text-5xl font-syne font-extrabold text-white mb-4",
                        children: [
                            "Sektörünüze Özel ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-transparent bg-clip-text bg-gradient-to-r from-rust to-orange-400",
                                children: "Yapay Zeka"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                lineNumber: 19,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$2_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        viewport: {
                            once: true
                        },
                        className: "text-muted-foreground-300 text-lg max-w-2xl mx-auto",
                        children: "Tam 25 farklı yerel B2B ve B2C pazarının dilinden anlayan, size özel otonom çalışma arkadaşları."
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `
                }
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex overflow-x-auto gap-6 px-8 sm:px-12 lg:px-32 py-8 snap-x snap-mandatory hide-scroll scroll-smooth",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$sektorler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEKTORLER"].map((sektor, i)=>{
                            const MotionLink = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$2_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].create(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionLink, {
                                href: `/sektorler/${sektor.id}`,
                                initial: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                whileInView: {
                                    opacity: 1,
                                    scale: 1
                                },
                                viewport: {
                                    once: true
                                },
                                transition: {
                                    delay: i % 5 * 0.1,
                                    duration: 0.4
                                },
                                whileHover: {
                                    y: -8,
                                    scale: 1.02,
                                    transition: {
                                        duration: 0.2
                                    }
                                },
                                className: "snap-center shrink-0 w-[280px] sm:w-[320px] bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.08] hover:border-rust/40 transition-all group flex flex-col justify-between relative overflow-hidden shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-br from-rust/0 to-rust/0 group-hover:from-rust/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                        lineNumber: 60,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-4xl mb-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(220,70,30,0.3)] transition-all duration-300",
                                                children: sektor.emoji
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                                lineNumber: 63,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold text-white mb-3 font-syne group-hover:text-rust transition-colors",
                                                children: sektor.ad
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                                lineNumber: 66,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground-300 leading-relaxed mb-8 line-clamp-3 font-lora",
                                                children: sektor.altBaslik || `${sektor.ad} sektörü için 7/24 randevu kapan ve fiyat veren kurumsal asistan.`
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                                lineNumber: 67,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                        lineNumber: 62,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10 text-rust text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all",
                                        children: [
                                            "Sektörü İncele ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2.5,
                                                    d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 131
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                                lineNumber: 73,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                        lineNumber: 72,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, sektor.id, true, {
                                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                                lineNumber: 49,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_c = SectorCarousel;
var _c;
__turbopack_context__.k.register(_c, "SectorCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/XinXia/apps/web/src/components/sections/SectorCarousel.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=XinXia_apps_web_src_ef4a158f._.js.map