// ═══════════════════════════════════════════════════════════
// Anasayfa.js — IONICA DRY — Anasayfa Section Animasyonları
// ═══════════════════════════════════════════════════════════
// Sprint 2 + 5: Tüm anasayfa section'ları ve etkileşimler
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import wixAnimations from 'wix-animations';

$w.onReady(function () {

    // ─── SECTION 1: HERO BANNER ────────────────────────────────

    // Hero başlangıç animasyonu
    const timeline = wixAnimations.timeline();
    timeline
        .add($w("#heroTitle"), {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutCubic'
        })
        .add($w("#heroSubtitle"), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutCubic'
        }, "-=400")
        .add($w("#heroCta"), {
            opacity: 1,
            scale: 1,
            duration: 500,
            easing: 'easeOutBack'
        }, "-=300");

    // Hero elementleri başlangıçta gizli olmalı (Wix'te Varsayılan Değerler > Gizli ☑)
    timeline.play();

    // ─── SECTION 2: ÜRÜN SERİSİ SHOWCASE ──────────────────────

    $w("#productShowcase").onViewportEnter(() => {

        // GOLD Serisi kartı animasyonu
        $w("#goldSeriesCard").show("float", {
            duration: 800,
            delay: 200,
            direction: "bottom"
        });

        // PRO Serisi kartı animasyonu
        $w("#proSeriesCard").show("float", {
            duration: 800,
            delay: 400,
            direction: "bottom"
        });

        // Anti-gravity widget'a ürün görselini gönder
        if ($w("#htmlAntiGravityGold")) {
            $w("#htmlAntiGravityGold").postMessage({
                type: "updateProduct",
                imageUrl: "https://static.wixstatic.com/media/GOLD_URUN_ID.png"
            });
            $w("#htmlAntiGravityGold").postMessage({
                type: "setGlowColor",
                color: "245,197,24"  // Altın sarısı parıltı
            });
        }

        if ($w("#htmlAntiGravityPro")) {
            $w("#htmlAntiGravityPro").postMessage({
                type: "updateProduct",
                imageUrl: "https://static.wixstatic.com/media/PRO_URUN_ID.png"
            });
            $w("#htmlAntiGravityPro").postMessage({
                type: "setGlowColor",
                color: "100,180,255"  // Mavi/gümüş parıltı
            });
        }
    });

    // Hover efektleri — ürün kartları
    $w("#goldSeriesCard").onMouseIn(() => {
        $w("#goldSeriesCard").style.boxShadow = "0 20px 60px rgba(245,197,24,0.35)";
        $w("#goldSeriesCard").style.transform = "translateY(-8px)";
    });
    $w("#goldSeriesCard").onMouseOut(() => {
        $w("#goldSeriesCard").style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        $w("#goldSeriesCard").style.transform = "translateY(0)";
    });

    $w("#proSeriesCard").onMouseIn(() => {
        $w("#proSeriesCard").style.boxShadow = "0 20px 60px rgba(100,180,255,0.35)";
        $w("#proSeriesCard").style.transform = "translateY(-8px)";
    });
    $w("#proSeriesCard").onMouseOut(() => {
        $w("#proSeriesCard").style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        $w("#proSeriesCard").style.transform = "translateY(0)";
    });

    // "İncele" butonları
    $w("#goldSeriesBtn").onClick(() => {
        wixWindow.scrollTo(0, $w("#goldDetailSection").y);
    });
    $w("#proSeriesBtn").onClick(() => {
        wixWindow.scrollTo(0, $w("#proDetailSection").y);
    });

    // ─── SECTION 3: ÖZELLİKLER GRİD ──────────────────────────

    $w("#featuresGrid").onViewportEnter(() => {
        const features = [
            "#featureFilmtec",
            "#featureSensor",
            "#featureIade",
            "#featureVontron"
        ];

        features.forEach((id, index) => {
            $w(id).show("float", {
                duration: 600,
                delay: index * 150, // Sıralı cascade efekti
                direction: "bottom"
            });
        });
    });

    // ─── SECTION 4: MÜŞTERİ YORUMLARI ─────────────────────────

    $w("#testimonials").onViewportEnter(() => {
        $w("#testimonialsContainer").show("fade", {
            duration: 800,
            delay: 200
        });
    });

    // Yorum slider otomatik geçiş
    let currentTestimonial = 0;
    const totalTestimonials = 5;

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        // Wix Slideshow/Gallery widget kullanıyorsanız
        // $w("#testimonialSlider").changeSlide(currentTestimonial);
    }, 5000);

    // ─── SECTION 5: BLOG ÖNİZLEME ─────────────────────────────

    $w("#blogPreview").onViewportEnter(() => {
        $w("#blogCards").show("slide", {
            duration: 700,
            delay: 200,
            direction: "right"
        });
    });

    // ─── SECTION 6: İLETİŞİM / CTA FİNAL ─────────────────────

    $w("#contactCTA").onViewportEnter(() => {
        $w("#ctaFinalTitle").show("float", {
            duration: 800,
            direction: "bottom"
        });
        $w("#ctaFinalButton").show("spin", {
            duration: 600,
            delay: 400,
            cycles: 1,
            direction: "cw"
        });
    });

    // CTA buton tıklama
    $w("#ctaFinalButton").onClick(() => {
        // Mağaza sayfasına yönlendir
        wixWindow.openUrl("/urunler");
    });

    // ─── GENEL: SAYISAL ANİMASYON (Counter Up) ────────────────

    // İstatistik sayıları animasyonlu göster
    $w("#statsSection").onViewportEnter(() => {
        animateCounter("#statCustomers", 0, 12500, 2000, "+");
        animateCounter("#statSatisfaction", 0, 99, 1500, "%");
        animateCounter("#statYears", 0, 15, 1000, "");
        animateCounter("#statProducts", 0, 45, 1200, "+");
    });

});

// ─── YARDIMCI FONKSİYONLAR ─────────────────────────────────

/**
 * Sayı animasyonu — verilen element'in text'ini 
 * start'tan end'e animasyonlu olarak günceller
 */
function animateCounter(elementId, start, end, duration, suffix) {
    const element = $w(elementId);
    const range = end - start;
    const startTime = Date.now();

    const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + range * eased);

        element.text = current.toLocaleString('tr-TR') + suffix;

        if (progress < 1) {
            setTimeout(step, 16);
        }
    };
    step();
}
