import React from "react";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Metadata } from "next";
import { Book, ShieldQuestion, Zap, LayoutTemplate } from "lucide-react";
import SSSAccordion from "./SSSAccordion";
import { waLink } from "@/data/iletisim";

export const metadata: Metadata = {
    title: "Yardım Merkezi | kepenk.ai",
    description: "Yapay zeka asistanı ve web sitesi kurulumları hakkında sıkça sorulan sorular, destek dökümanları.",
};

const guideCategories = [
    {
        title: "Sisteme Başlarken",
        icon: <Zap className="w-6 h-6" />,
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        links: ["Hesap Kurulumu ve Doğrulama", "İlk Yapay Zeka Ajanının Eğitimi", "Site Adresinin Değiştirilmesi", "Mobil Görünüm Ayarları"]
    },
    {
        title: "Abonelik & Ödeme",
        icon: <ShieldQuestion className="w-6 h-6" />,
        color: "text-rust bg-rust/10 border-rust/20",
        links: ["Kart Bilgilerini Güncelleme", "Fatura İndirme ve Muhasebeleştirme", "İptal ve İade İşlemleri", "Sonraki Fatura Kesim Tarihi"]
    },
    {
        title: "Modüller & Entegrasyon",
        icon: <LayoutTemplate className="w-6 h-6" />,
        color: "text-steel bg-steel/10 border-steel/20",
        links: ["WhatsApp WhatsApp Business Bağlantısı", "Google Yorumlarını Otomatik Yanıtlama", "Instagram DM Okuma Modülü", "Menü veya Fiyat Listesi Güncelleme"]
    }
];

export default function YardimPage() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Header with Search */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-muted-foreground bg-warm mb-6">
                    Destek & Kaynaklar
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-8 font-syne">
                    Nasıl Yardımcı <span className="text-rust">Olabiliriz?</span>
                </h1>

                <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
                    Aşağıdaki rehberlerden veya sık sorulan sorulardan aradığınız cevabı bulabilirsiniz.
                </p>
            </section>

            {/* Categories */}
            <section className="py-16 bg-background text-foreground rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {guideCategories.map((cat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-border-light/30 shadow-sm hover:shadow-lg transition-shadow">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${cat.color}`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold font-syne mb-4 text-foreground">{cat.title}</h3>
                                <ul className="space-y-3">
                                    {cat.links.map((link, j) => (
                                        <li key={j}>
                                            <span className="flex items-center text-muted-foreground text-sm font-medium">
                                                <Book className="w-4 h-4 mr-2 text-muted-foreground" />
                                                {link}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Support Banner */}
                    <div className="bg-background rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne mb-4">
                                Aradığınızı Bulamadınız mı?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                                Destek mühendislerimiz spesifik sorunlarınıza çözüm üretmek için buradalar. Hemen bir bilet oluşturun.
                            </p>
                            <a href="/iletisim" className="inline-block bg-rust hover:bg-rust-light text-foreground font-bold px-8 py-3 rounded-xl transition-colors">
                                Bize Ulaşın
                            </a>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-steel rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
                        <div className="absolute right-0 top-0 w-32 h-32 bg-rust rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
                    </div>

                </div>
            </section>

            {/* SSS Accordion */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
                <h2 className="text-foreground font-syne font-extrabold text-2xl mb-6 text-center">
                    Sık Sorulan Sorular
                </h2>
                <SSSAccordion />
                <div className="mt-8 bg-card rounded-2xl p-5 text-center">
                    <p className="text-foreground font-syne font-semibold mb-2">Bulamadın mı?</p>
                    <p className="text-muted-foreground text-sm mb-4">
                        WhatsApp&#39;tan bize yaz, 1 saat içinde cevap verelim.
                    </p>
                    <a
                        href={waLink()}
                        className="inline-block bg-green-600 text-foreground font-bold py-3 px-6 rounded-xl text-sm"
                    >
                        💬 WhatsApp Destek
                    </a>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
