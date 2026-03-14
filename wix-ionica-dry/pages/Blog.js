// ═══════════════════════════════════════════════════════════
// Blog.js — Wix Velo — Blog Sayfası
// ═══════════════════════════════════════════════════════════

import wixBlog from 'wix-blog-backend';

$w.onReady(function () {

    // ─── 1. BLOG KARTLARI HOVER EFEKTİ ──────────────────────

    try {
        $w("#blogPostRepeater").onItemReady(($item) => {
            $item("#blogCard").onMouseIn(() => {
                $item("#blogCard").style.transform = "translateY(-6px)";
                $item("#blogCard").style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)";
                $item("#blogImage").style.transform = "scale(1.05)";
            });
            $item("#blogCard").onMouseOut(() => {
                $item("#blogCard").style.transform = "";
                $item("#blogCard").style.boxShadow = "";
                $item("#blogImage").style.transform = "scale(1)";
            });
        });
    } catch (e) { }

    // ─── 2. KATEGORİ FİLTRELEME ─────────────────────────────

    const categories = [
        { label: "Tümü", value: "all" },
        { label: "Su Arıtma", value: "su-aritma" },
        { label: "Sağlıklı Yaşam", value: "saglikli-yasam" },
        { label: "Teknoloji", value: "teknoloji" },
        { label: "Haberler", value: "haberler" },
    ];

    try {
        categories.forEach((cat, i) => {
            const btnId = `#blogCat${i}`;
            try {
                $w(btnId).label = cat.label;
                $w(btnId).onClick(() => {
                    if (cat.value === "all") {
                        $w("#blogPostRepeater").setFilter(null);
                    } else {
                        // Wix Blog kategori filtresi
                        $w("#blogPostRepeater").setFilter(
                            wixBlog.filter().eq("category", cat.value)
                        );
                    }

                    // Aktif filtre stili
                    categories.forEach((_, j) => {
                        try {
                            const id = `#blogCat${j}`;
                            if (j === i) {
                                $w(id).style.backgroundColor = "#F5C518";
                                $w(id).style.color = "#1A1A1A";
                            } else {
                                $w(id).style.backgroundColor = "transparent";
                                $w(id).style.color = "#666";
                            }
                        } catch (e) { }
                    });
                });
            } catch (e) { }
        });
    } catch (e) { }

    // ─── 3. NEWSLETTER FORM ──────────────────────────────────

    try {
        $w("#newsletterBtn").onClick(() => {
            const email = $w("#newsletterInput").value;
            if (!email || !email.includes("@")) {
                $w("#newsletterMsg").text = "Geçerli bir e-posta adresi girin.";
                $w("#newsletterMsg").style.color = "#C0392B";
                $w("#newsletterMsg").show();
                return;
            }

            // CMS'e kaydet
            // wixData.insert("Subscribers", { email, date: new Date() });

            $w("#newsletterMsg").text = "✅ Abone oldunuz! Yeni yazılardan haberdar olacaksınız.";
            $w("#newsletterMsg").style.color = "#4A6741";
            $w("#newsletterMsg").show("fade", { duration: 400 });
            $w("#newsletterInput").value = "";
        });
    } catch (e) { }

    // ─── 4. VIEWPORT ANİMASYON ───────────────────────────────

    try {
        $w("#blogHero").onViewportEnter(() => {
            $w("#blogHeroTitle").show("fade", { duration: 700 });
        });
    } catch (e) { }
});
