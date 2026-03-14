// ═══════════════════════════════════════════════════════════
// UrunSayfasi.js — Wix Velo — Ürün Detay Sayfası
// ═══════════════════════════════════════════════════════════
// Sprint 8: Mağaza Entegrasyonu
// Wix Stores ürün sayfası Velo kodu
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

$w.onReady(function () {

    // ─── 1. ÜRÜN BİLGİLERİNİ AL ─────────────────────────────

    $w("#productPage1").getProduct()
        .then((product) => {
            const mainImage = product.mainMedia ? product.mainMedia.image.url : '';
            const productName = product.name || '';
            const productDesc = product.description || '';
            const price = product.formattedPrice || '';

            // ─── 2. ANTI-GRAVITY EFEKTİNE ÜRÜN GÖRSELİ GÖNDER ───

            if ($w("#htmlProductFloat")) {
                $w("#htmlProductFloat").postMessage({
                    type: "updateProduct",
                    imageUrl: mainImage,
                    altText: productName
                });

                // Ürün serisine göre glow rengi
                if (productName.toLowerCase().includes("gold")) {
                    $w("#htmlProductFloat").postMessage({
                        type: "setGlowColor",
                        color: "245,197,24"  // Altın sarısı
                    });
                } else if (productName.toLowerCase().includes("pro")) {
                    $w("#htmlProductFloat").postMessage({
                        type: "setGlowColor",
                        color: "100,180,255"  // Mavi/gümüş
                    });
                } else {
                    // Varsayılan: turkuaz
                    $w("#htmlProductFloat").postMessage({
                        type: "setGlowColor",
                        color: "0,210,180"
                    });
                }
            }

            // ─── 3. ÖZELLİK BADGE'LERİ ─────────────────────────

            // Ürün etiketlerine göre badge göster
            const tags = product.productOptions || [];
            const badges = {
                "FilmTec™":      { el: "#badgeFilmtec",  show: false },
                "Vontron™":      { el: "#badgeVontron",  show: false },
                "Kaçak Sensörü": { el: "#badgeSensor",   show: false },
                "100 Gün İade":  { el: "#badgeIade",     show: false },
            };

            // Ürün açıklamasında geçen teknolojileri tespit et
            Object.keys(badges).forEach(keyword => {
                if (productDesc.includes(keyword) || productName.includes(keyword)) {
                    badges[keyword].show = true;
                }
            });

            Object.entries(badges).forEach(([key, val]) => {
                try {
                    if (val.show) {
                        $w(val.el).show("fade", { duration: 400 });
                    } else {
                        $w(val.el).hide();
                    }
                } catch (e) { }
            });
        })
        .catch(err => {
            console.error("Ürün bilgisi alınamadı:", err);
        });

    // ─── 4. SEPETE EKLE ANİMASYONU ──────────────────────────

    $w("#addToCartButton").onClick(() => {
        // Anti-gravity bounce efekti
        if ($w("#htmlProductFloat")) {
            $w("#htmlProductFloat").postMessage({ type: "triggerBounce" });
        }

        // Sepete eklendi bildirimi
        $w("#addedToCartMsg").show("float", {
            duration: 500,
            direction: "top"
        });

        setTimeout(() => {
            $w("#addedToCartMsg").hide("fade", { duration: 400 });
        }, 3000);
    });

    // ─── 5. ÜRÜN GALERİSİ — GÖRSEL DEĞİŞTİRME ──────────────

    // Wix galeri widget'ındaki görsel değiştiğinde
    $w("#productGallery1").onItemChanged((event) => {
        const newImage = event.item.src;
        if ($w("#htmlProductFloat") && newImage) {
            $w("#htmlProductFloat").postMessage({
                type: "updateProduct",
                imageUrl: newImage
            });
        }
    });

    // ─── 6. BENZER ÜRÜNLER — Hover Efektleri ─────────────────

    const relatedProducts = [
        "#relatedProduct1",
        "#relatedProduct2",
        "#relatedProduct3",
        "#relatedProduct4"
    ];

    relatedProducts.forEach(id => {
        try {
            $w(id).onMouseIn(() => {
                $w(id).style.transform = "translateY(-6px)";
                $w(id).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
            });
            $w(id).onMouseOut(() => {
                $w(id).style.transform = "translateY(0)";
                $w(id).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
            });
        } catch (e) { }
    });

    // ─── 7. SOSYAL PAYLAŞIM BUTONLARI ────────────────────────

    try {
        const currentUrl = wixLocation.url;

        $w("#shareWhatsapp").onClick(() => {
            const text = encodeURIComponent("Bu ürüne göz at! 💧");
            wixWindow.openUrl(`https://wa.me/?text=${text}%20${currentUrl}`);
        });

        $w("#shareTwitter").onClick(() => {
            const text = encodeURIComponent("Ionica Dry ile temiz su! 💧");
            wixWindow.openUrl(`https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}`);
        });

        $w("#shareFacebook").onClick(() => {
            wixWindow.openUrl(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`);
        });
    } catch (e) { }
});
