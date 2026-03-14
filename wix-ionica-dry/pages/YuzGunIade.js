// ═══════════════════════════════════════════════════════════
// YuzGunIade.js — Wix Velo — 100 Gün İade Sayfası
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import wixAnimations from 'wix-animations';

$w.onReady(function () {

    // ─── 1. HERO GÜVENLİK BADGE ANİMASYONU ──────────────────

    const tl = wixAnimations.timeline();
    tl.add($w("#iadeHeroIcon"), {
        opacity: 1, scale: 1, duration: 600, easing: 'easeOutBack'
    })
    .add($w("#iadeHeroTitle"), {
        opacity: 1, y: 0, duration: 500
    }, "-=300")
    .add($w("#iadeHeroDesc"), {
        opacity: 1, y: 0, duration: 400
    }, "-=200");
    tl.play();

    // ─── 2. ADIM ADIM SÜREÇ ──────────────────────────────────

    const steps = [
        {
            icon: "📞",
            title: "1. Bizi Arayın",
            desc: "WhatsApp veya telefon ile iade talebinizi iletin. Herhangi bir sebep belirtmenize gerek yok."
        },
        {
            icon: "📦",
            title: "2. Kargo Bize Ait",
            desc: "Ücretsiz kargo kodunuzu alın. Cihazı orijinal kutusunda paketleyin, kuryeye teslim edin."
        },
        {
            icon: "🔍",
            title: "3. Kontrol (1 İş Günü)",
            desc: "Ürün merkezimize ulaştıktan sonra 1 iş günü içinde kontrol edilir."
        },
        {
            icon: "💳",
            title: "4. Anında İade",
            desc: "Kontrolden sonra 3 iş günü içinde ödemeniz iade edilir. Aynı ödeme yöntemine (kart/havale)."
        }
    ];

    try {
        $w("#stepsRepeater").data = steps.map((s, i) => ({ _id: `step-${i}`, ...s }));
        $w("#stepsRepeater").onItemReady(($item, data) => {
            $item("#stepIcon").text = data.icon;
            $item("#stepTitle").text = data.title;
            $item("#stepDesc").text = data.desc;
        });

        // Sıralı animasyon
        $w("#stepsSection").onViewportEnter(() => {
            steps.forEach((_, i) => {
                setTimeout(() => {
                    // Her step kartını sırayla göster
                }, i * 200);
            });
        });
    } catch (e) { }

    // ─── 3. GARANTİLER GRID ──────────────────────────────────

    const guarantees = [
        { icon: "✅", title: "Koşulsuz İade",       desc: "100 gün içinde memnun kalmadığınız ürünü koşulsuz iade edebilirsiniz." },
        { icon: "📦", title: "Ücretsiz Kargo",      desc: "İade kargo ücreti tamamen bize aittir." },
        { icon: "🔧", title: "Kullanılmış Olabilir", desc: "Ürünü denemiş/kurulmuş olmanız iade hakkınızı etkilemez." },
        { icon: "💰", title: "Tam Geri Ödeme",      desc: "Ödediğiniz tutarın %100'ü 3 iş günü içinde iade edilir." },
        { icon: "🛡", title: "5 Yıl Garanti",       desc: "İade olmasa bile 5 yıl tam garanti kapsamındasınız." },
        { icon: "📱", title: "Kolay Süreç",         desc: "WhatsApp'tan tek mesajla iade süreci başlatılır." },
    ];

    try {
        $w("#guaranteesSection").onViewportEnter(() => {
            guarantees.forEach((_, i) => {
                const cardId = `#guaranteeCard${i + 1}`;
                try {
                    $w(cardId).show("float", {
                        duration: 500,
                        delay: i * 100,
                        direction: "bottom"
                    });
                } catch (e) { }
            });
        });
    } catch (e) { }

    // ─── 4. SAYAÇ: KAÇ MÜŞTERİ İADE YAPTI ──────────────────

    try {
        $w("#iadeStats").onViewportEnter(() => {
            animateNum("#statIadeOrani", 0, 2, 1500, "%");
            // "%2 iade oranı — müşterilerimizin %98'i Ionica Dry'dan memnun"
        });
    } catch (e) { }

    // ─── 5. CTA ─────────────────────────────────────────────

    try {
        $w("#iadeCtaBtn").onClick(() => {
            const phone = "905XXXXXXXXX";
            const msg = encodeURIComponent("Merhaba, iade süreciyle ilgili bilgi almak istiyorum.");
            wixWindow.openUrl(`https://wa.me/${phone}?text=${msg}`);
        });
    } catch (e) { }
});

function animateNum(id, start, end, duration, suffix = '') {
    const el = $w(id);
    const startTime = Date.now();
    const step = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.text = (start + (end - start) * eased).toFixed(1) + suffix;
        if (progress < 1) setTimeout(step, 16);
    };
    step();
}
