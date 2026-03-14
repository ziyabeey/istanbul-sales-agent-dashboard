// ═══════════════════════════════════════════════════════════
// SSS.js — Wix Velo — Sıkça Sorulan Sorular Sayfası
// ═══════════════════════════════════════════════════════════
// Velo > Sayfa Kodları > SSS.js
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import wixData from 'wix-data';

$w.onReady(function () {

    // ─── 1. FAQ VERİLERİ ─────────────────────────────────────
    // CMS koleksiyonu: "SSS" tablosu
    // Alanlar: soru (Text), cevap (Rich Text), kategori (Text), sira (Number)

    const faqData = [
        // ── GENEL ──
        {
            kategori: "Genel",
            soru: "Ionica Dry nedir?",
            cevap: "Ionica Dry, evler ve işyerleri için tasarlanmış premium su arıtma cihazları markasıdır. FilmTec™ ve Vontron™ gibi dünya standartlarında membran teknolojileri kullanarak suyunuzu %99.9 oranında arıtır."
        },
        {
            kategori: "Genel",
            soru: "GOLD ve PRO serisi arasındaki fark nedir?",
            cevap: "GOLD Serisi: Altın parçacıklı FilmTec™ membran ile premium arıtma, mineralce zenginleştirilmiş su. Ev kullanımı için ideal.\n\nPRO Serisi: Vontron™ endüstriyel membran, daha yüksek kapasite, işyerleri ve büyük aileler için tasarlandı. Her iki seride de kaçak su sensörü standarttır."
        },
        {
            kategori: "Genel",
            soru: "Hangi bölgelere hizmet veriyorsunuz?",
            cevap: "Tüm Türkiye'ye ücretsiz kargo ile gönderim yapıyoruz. İstanbul, Ankara, İzmir ve Antalya'da aynı gün kurulum hizmeti mevcuttur."
        },

        // ── KURULUM ──
        {
            kategori: "Kurulum",
            soru: "Kurulum ücreti var mı?",
            cevap: "Hayır! Tüm ürünlerimizde kurulum tamamen ücretsizdir. Uzman teknisyenimiz evinize gelir ve ortalama 45 dakikada kurulumu tamamlar."
        },
        {
            kategori: "Kurulum",
            soru: "Cihaz hangi tezgahaltına sığar?",
            cevap: "Ionica Dry cihazları kompakt tasarıma sahiptir. Standard mutfak tezgahaltı dolaplarına (min. 40cm x 35cm x 45cm) kolayca sığar. Kurulum öncesi teknisyenimiz ölçü kontrolü yapar."
        },
        {
            kategori: "Kurulum",
            soru: "Kiracı olarak taktırabilir miyim?",
            cevap: "Evet! Kurulum sırasında tesisata kalıcı hasar verilmez. Taşındığınızda cihazı söküp yeni adresinize taşıyabilirsiniz (söküm/kurulum ücretsiz)."
        },

        // ── FİLTRE & BAKIM ──
        {
            kategori: "Filtre & Bakım",
            soru: "Filtreler ne sıklıkla değiştirilmeli?",
            cevap: "Ön filtreler: 6 ayda bir\nMembran: 2-3 yılda bir\nPost-karbon: 12 ayda bir\n\nCihazınız filtre ömrünü otomatik takip eder ve değişim zamanı geldiğinde LED ile uyarır."
        },
        {
            kategori: "Filtre & Bakım",
            soru: "Filtre değişimini kendim yapabilir miyim?",
            cevap: "Evet! Tüm filtrelerimiz 'click & twist' sistemiyle çalışır — herhangi bir alet gerekmez. YouTube kanalımızda adım adım video rehberler mevcuttur. Dilerseniz ücretsiz bakım hizmetimizi de kullanabilirsiniz."
        },
        {
            kategori: "Filtre & Bakım",
            soru: "FilmTec™ membran nedir?",
            cevap: "FilmTec™, DuPont tarafından üretilen dünyanın en güvenilir reverse osmosis membranıdır. %99.9 oranında ağır metal, klor, bakteri ve virüs filtrasyonu sağlar. GOLD serimizde altın nano parçacık kaplı versiyonu kullanılır."
        },

        // ── İADE & GARANTİ ──
        {
            kategori: "İade & Garanti",
            soru: "100 gün iade garantisi nasıl çalışır?",
            cevap: "Ürünü teslim aldığınız tarihten itibaren 100 gün içinde herhangi bir sebepten memnun kalmazsanız, ücretsiz kargomuzla iade edebilirsiniz. Ücretiniz 3 iş günü içinde iade edilir. Ürünü kullanmış olmanız iade hakkınızı etkilemez."
        },
        {
            kategori: "İade & Garanti",
            soru: "Garanti süresi ne kadar?",
            cevap: "Tüm Ionica Dry cihazları 5 yıl üretici garantisine sahiptir. Garanti kapsamında: motor arızası, su kaçağı, elektronik arıza, basınç pompası sorunları. Garanti dışı: fiziksel hasar, donma kaynaklı hasar."
        },

        // ── KAÇAK SU SENSÖRÜ ──
        {
            kategori: "Kaçak Su Sensörü",
            soru: "Kaçak su sensörü ne yapar?",
            cevap: "Cihazın altına yerleştirilen sensör, herhangi bir su kaçağını anında algılar ve otomatik olarak su girişini kapatır. Bu sayede tezgahaltı su baskını riski %100 önlenir. Sensör algıladığında telefon uygulamanıza da bildirim gönderir."
        },
        {
            kategori: "Kaçak Su Sensörü",
            soru: "Sensörün pilini değiştirmem gerekir mi?",
            cevap: "Hayır. Kaçak su sensörü cihazın ana elektriğinden beslenir, pil gerektirmez. 7/24 aktif koruma sağlar."
        },
    ];

    // ─── 2. FAQ DİNAMİK RENDER (CMS veya statik) ─────────────

    // CMS'den veri çekme (eğer CMS kullanılıyorsa):
    // wixData.query("SSS")
    //     .ascending("sira")
    //     .find()
    //     .then((results) => {
    //         renderFAQ(results.items);
    //     });

    // Statik veri ile render:
    renderFAQ(faqData);

    // ─── 3. KATEGORİ FİLTRE BUTONLARI ────────────────────────

    const categories = [...new Set(faqData.map(f => f.kategori))];

    try {
        // "Tümü" butonu
        $w("#filterAll").onClick(() => {
            renderFAQ(faqData);
            setActiveFilter("#filterAll");
        });

        // Her kategori için dinamik filtre
        categories.forEach((cat, i) => {
            const btnId = `#filterCat${i + 1}`;
            try {
                $w(btnId).label = cat;
                $w(btnId).onClick(() => {
                    const filtered = faqData.filter(f => f.kategori === cat);
                    renderFAQ(filtered);
                    setActiveFilter(btnId);
                });
            } catch (e) { }
        });
    } catch (e) { }

    // ─── 4. ARAMA FONKSİYONU ──────────────────────────────────

    try {
        $w("#faqSearchInput").onInput((event) => {
            const query = event.target.value.toLowerCase().trim();
            if (query.length < 2) {
                renderFAQ(faqData);
                return;
            }
            const filtered = faqData.filter(f =>
                f.soru.toLowerCase().includes(query) ||
                f.cevap.toLowerCase().includes(query)
            );
            renderFAQ(filtered);
        });
    } catch (e) { }

    // ─── 5. VIEWPORT ANİMASYON ────────────────────────────────

    try {
        $w("#faqSection").onViewportEnter(() => {
            $w("#faqContainer").show("fade", { duration: 600 });
        });
    } catch (e) { }
});

// ─── YARDIMCI FONKSİYONLAR ────────────────────────────────────

function renderFAQ(items) {
    // Wix Repeater kullanıyorsanız:
    try {
        $w("#faqRepeater").data = items.map((item, i) => ({
            _id: `faq-${i}`,
            soru: item.soru,
            cevap: item.cevap,
            kategori: item.kategori
        }));

        $w("#faqRepeater").onItemReady(($item, itemData) => {
            $item("#faqQuestion").text = itemData.soru;
            $item("#faqAnswer").text = itemData.cevap;
            $item("#faqCategory").text = itemData.kategori;

            // Accordion toggle
            $item("#faqAnswer").collapse();
            let isOpen = false;

            $item("#faqQuestionRow").onClick(() => {
                if (isOpen) {
                    $item("#faqAnswer").collapse();
                    $item("#faqArrow").text = "+";
                } else {
                    $item("#faqAnswer").expand();
                    $item("#faqArrow").text = "−";
                }
                isOpen = !isOpen;
            });
        });
    } catch (e) {
        console.log("FAQ Repeater bulunamadı, HTML embed kullanılabilir.");
    }
}

function setActiveFilter(activeId) {
    const allFilters = ["#filterAll", "#filterCat1", "#filterCat2", "#filterCat3", "#filterCat4", "#filterCat5"];
    allFilters.forEach(id => {
        try {
            if (id === activeId) {
                $w(id).style.backgroundColor = "#F5C518";
                $w(id).style.color = "#1A1A1A";
            } else {
                $w(id).style.backgroundColor = "transparent";
                $w(id).style.color = "#666666";
            }
        } catch (e) { }
    });
}
