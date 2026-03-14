// ═══════════════════════════════════════════════════════════
// Hakkimizda.js — Wix Velo — Hakkımızda Sayfası
// ═══════════════════════════════════════════════════════════

import wixAnimations from 'wix-animations';

$w.onReady(function () {

    // ─── 1. HERO ANİMASYONU ──────────────────────────────────

    const timeline = wixAnimations.timeline();
    timeline
        .add($w("#aboutHeroTitle"), {
            opacity: 1, y: 0, duration: 700, easing: 'easeOutCubic'
        })
        .add($w("#aboutHeroDesc"), {
            opacity: 1, y: 0, duration: 500, easing: 'easeOutCubic'
        }, "-=300");
    timeline.play();

    // ─── 2. MİSYON & VİZYON ─────────────────────────────────

    try {
        $w("#missionSection").onViewportEnter(() => {
            $w("#missionCard").show("float", { duration: 600, direction: "left" });
            $w("#visionCard").show("float", { duration: 600, delay: 200, direction: "right" });
        });
    } catch (e) { }

    // ─── 3. SAYAÇ ANİMASYONU (NumCounter) ────────────────────

    try {
        $w("#aboutStats").onViewportEnter(() => {
            animateNum("#statYears", 0, 15, 1500);
            animateNum("#statCustomers", 0, 12500, 2000);
            animateNum("#statCities", 0, 81, 1200);
            animateNum("#statSatisfaction", 0, 99, 1800);
        });
    } catch (e) { }

    // ─── 4. ZAMAN ÇİZGİSİ (Timeline) ────────────────────────

    const timelineEvents = [
        { yil: "2010", baslik: "Kuruluş",          desc: "İstanbul'da ilk ofisimizi açtık." },
        { yil: "2013", baslik: "FilmTec™ Ortaklığı", desc: "DuPont FilmTec™ ile resmi distribütörlük anlaşması." },
        { yil: "2016", baslik: "PRO Serisi",         desc: "Endüstriyel segmente giriş — PRO serisi lansmanı." },
        { yil: "2019", baslik: "Kaçak Sensörü",      desc: "Patentli kaçak su sensörü teknolojisi geliştirildi." },
        { yil: "2021", baslik: "GOLD Serisi",        desc: "Altın nano-parçacıklı membran ile premium seri." },
        { yil: "2024", baslik: "100.000 Müşteri",    desc: "Türkiye genelinde 100.000 mutlu müşteri." },
    ];

    try {
        $w("#timelineRepeater").data = timelineEvents.map((e, i) => ({
            _id: `tl-${i}`, ...e
        }));

        $w("#timelineRepeater").onItemReady(($item, data) => {
            $item("#tlYear").text = data.yil;
            $item("#tlTitle").text = data.baslik;
            $item("#tlDesc").text = data.desc;
        });
    } catch (e) { }

    // ─── 5. EKİP KARTI HOVER ─────────────────────────────────

    const teamCards = ["#teamCard1", "#teamCard2", "#teamCard3", "#teamCard4"];
    teamCards.forEach(id => {
        try {
            $w(id).onMouseIn(() => {
                $w(id).style.transform = "translateY(-8px) scale(1.02)";
                $w(id).style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
            });
            $w(id).onMouseOut(() => {
                $w(id).style.transform = "";
                $w(id).style.boxShadow = "";
            });
        } catch (e) { }
    });
});

function animateNum(id, start, end, duration) {
    const el = $w(id);
    const range = end - start;
    const startTime = Date.now();
    const step = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const suffix = id.includes("Satisfaction") ? "%" : id.includes("Customers") ? "+" : "";
        el.text = Math.round(start + range * eased).toLocaleString('tr-TR') + suffix;
        if (progress < 1) setTimeout(step, 16);
    };
    step();
}
