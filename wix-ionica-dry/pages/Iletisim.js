// ═══════════════════════════════════════════════════════════
// Iletisim.js — Wix Velo — İletişim Sayfası
// ═══════════════════════════════════════════════════════════
// Velo > Sayfa Kodları > Iletisim.js
// ═══════════════════════════════════════════════════════════

import wixWindow from 'wix-window';
import { sendNotification } from 'backend/notifications';

$w.onReady(function () {

    // ─── 1. İLETİŞİM FORMU ──────────────────────────────────

    $w("#contactForm").onSubmit(() => {
        const formData = {
            name: $w("#inputName").value,
            email: $w("#inputEmail").value,
            phone: $w("#inputPhone").value,
            subject: $w("#inputSubject").value,
            message: $w("#inputMessage").value,
            timestamp: new Date().toISOString()
        };

        // Basit validasyon
        if (!formData.name || !formData.phone) {
            $w("#formError").text = "Lütfen adınızı ve telefon numaranızı girin.";
            $w("#formError").show("fade", { duration: 300 });
            return;
        }

        // Backend'e gönder
        sendNotification(formData)
            .then(() => {
                // Başarılı
                $w("#contactForm").hide("fade", { duration: 400 });
                $w("#formSuccess").show("float", {
                    duration: 600,
                    direction: "bottom"
                });
            })
            .catch((err) => {
                $w("#formError").text = "Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.";
                $w("#formError").show("fade", { duration: 300 });
                console.error("Form gönderim hatası:", err);
            });
    });

    // ─── 2. HIZLI İLETİŞİM BUTONLARI ────────────────────────

    // WhatsApp
    try {
        $w("#contactWhatsapp").onClick(() => {
            const phone = "905XXXXXXXXX";
            const msg = encodeURIComponent("Merhaba! Ionica Dry hakkında bilgi almak istiyorum.");
            wixWindow.openUrl(`https://wa.me/${phone}?text=${msg}`);
        });
    } catch (e) { }

    // Telefon
    try {
        $w("#contactPhone").onClick(() => {
            wixWindow.openUrl("tel:+905XXXXXXXXX");
        });
    } catch (e) { }

    // E-posta
    try {
        $w("#contactEmail").onClick(() => {
            wixWindow.openUrl("mailto:info@ionicadry.com?subject=Bilgi%20Talebi");
        });
    } catch (e) { }

    // ─── 3. HARİTA (HTML Gömme Widget) ───────────────────────

    // Google Maps embed widget'ına konum gönder
    try {
        $w("#htmlMap").postMessage({
            type: "setLocation",
            lat: 41.0082,   // İstanbul
            lng: 28.9784,
            zoom: 14,
            title: "Ionica Dry Merkez Ofis"
        });
    } catch (e) { }

    // ─── 4. ANİMASYONLAR ─────────────────────────────────────

    try {
        $w("#contactSection").onViewportEnter(() => {
            $w("#contactInfoCards").show("slide", {
                duration: 600,
                direction: "left"
            });
            $w("#contactFormContainer").show("slide", {
                duration: 600,
                delay: 200,
                direction: "right"
            });
        });
    } catch (e) { }

    // ─── 5. ÇALIŞMA SAATLERİ ─────────────────────────────────

    try {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0=Pazar

        const isOpen = day >= 1 && day <= 6 && hour >= 9 && hour < 18;

        if (isOpen) {
            $w("#statusBadge").text = "🟢 Şu an açığız";
            $w("#statusBadge").style.color = "#4A6741";
        } else {
            $w("#statusBadge").text = "🔴 Şu an kapalıyız";
            $w("#statusBadge").style.color = "#C0392B";
            $w("#nextOpen").text = day === 0 || (day === 6 && hour >= 18)
                ? "Pazartesi 09:00'da açılıyoruz"
                : "Yarın 09:00'da açılıyoruz";
        }
    } catch (e) { }
});
