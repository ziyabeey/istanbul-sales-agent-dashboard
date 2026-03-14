// ═══════════════════════════════════════════════════════════
// masterPage.js — IONICA DRY — Tüm Sayfalarda Çalışan Global Kod
// ═══════════════════════════════════════════════════════════
// Wix Velo: Bu dosya tüm sayfalarda çalışır.
// Header (#header1) + Footer + Kayan Şerit Banner
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

$w.onReady(function () {

    // ─── 1. HEADER SCROLL EFEKTİ ───────────────────────────────

    // Scroll'da header'ı kompakt hale getir
    wixWindow.onScroll(({ y }) => {
        const header = $w("#header1");

        if (y > 80) {
            // Scrolled: kompakt header
            header.style.backgroundColor = "rgba(255, 255, 255, 0.97)";
            $w("#headerLogo").style.fontSize = "18px";
            // Kayan şerit bandını gizle (scroll'da)
            if ($w("#marqueeStrip")) {
                $w("#marqueeStrip").collapse();
            }
        } else {
            // Sayfanın en üstü: tam header
            header.style.backgroundColor = "rgba(255, 255, 255, 0.92)";
            $w("#headerLogo").style.fontSize = "22px";
            if ($w("#marqueeStrip")) {
                $w("#marqueeStrip").expand();
            }
        }
    });

    // ─── 2. KAYAN ŞERİT BANT (MARQUEE) ────────────────────────

    // HTML Embed widget (#htmlMarquee) ile kayan şerit
    // Aşağıdaki mesajı Wix HTML Embed widget'ına gönder
    const marqueeMessages = [
        "🚚 Ücretsiz Kargo",
        "💧 FilmTec™ Membran",
        "🔍 Kaçak Su Sensörü",
        "↩️ 100 Gün İade",
        "🏆 Vontron™ Teknolojisi",
        "⭐ 4.9/5 Müşteri Puanı"
    ];

    if ($w("#htmlMarquee")) {
        $w("#htmlMarquee").postMessage({
            type: "setMessages",
            messages: marqueeMessages
        });
    }

    // ─── 3. AKTİF SAYFA MENÜ VURGULAMASİ ──────────────────────

    const currentPath = wixLocation.path;
    const menuItems = {
        "": "#menuHome",           // Anasayfa
        "urunler": "#menuProducts",
        "blog": "#menuBlog",
        "hakkimizda": "#menuAbout",
        "100-gun-iade": "#menuReturn",
        "sss": "#menuFaq",
        "iletisim": "#menuContact"
    };

    const currentPage = currentPath[0] || "";
    Object.entries(menuItems).forEach(([path, menuId]) => {
        try {
            if (path === currentPage) {
                $w(menuId).style.color = "#F5C518"; // Aktif: sarı
                $w(menuId).style.fontWeight = "700";
            } else {
                $w(menuId).style.color = "#333333";
                $w(menuId).style.fontWeight = "400";
            }
        } catch (e) {
            // Element bulunamazsa sessizce geç
        }
    });

    // ─── 4. FOOTER YILI OTOMATİK GÜNCELLE ─────────────────────

    try {
        const year = new Date().getFullYear();
        $w("#footerYear").text = `© ${year} Ionica Dry. Tüm hakları saklıdır.`;
    } catch (e) {
        // Element yoksa geç
    }

    // ─── 5. "YUKARI DÖN" BUTONU ───────────────────────────────

    try {
        $w("#scrollTopBtn").hide();

        wixWindow.onScroll(({ y }) => {
            if (y > 600) {
                $w("#scrollTopBtn").show("fade", { duration: 300 });
            } else {
                $w("#scrollTopBtn").hide("fade", { duration: 300 });
            }
        });

        $w("#scrollTopBtn").onClick(() => {
            wixWindow.scrollTo(0, 0);
        });
    } catch (e) {
        // Element yoksa geç
    }

    // ─── 6. WHATSAPP CHAT WIDGET ENTEGRASYONU ──────────────────

    try {
        $w("#whatsappBtn").onClick(() => {
            const phone = "905XXXXXXXXX"; // Ionica Dry WhatsApp numarası
            const message = encodeURIComponent("Merhaba! Ionica Dry ürünleri hakkında bilgi almak istiyorum.");
            wixWindow.openUrl(`https://wa.me/${phone}?text=${message}`);
        });
    } catch (e) {
        // Element yoksa geç
    }
});
