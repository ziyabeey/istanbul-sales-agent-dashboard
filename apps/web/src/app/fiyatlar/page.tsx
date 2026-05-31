import React from "react";
import PublicPageShell from "@/components/layout/PublicPageShell";
import PricingCards from "@/components/sections/PricingCards";
import { CheckCircle2, HelpCircle, Globe, Shield, Zap, HeadphonesIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fiyatlandırma | KPNK",
    description: "Esnaf dijital asistan çözümleri için taahhütsüz ve saydam fiyatlandırma paketleri.",
};

const sssData = [
    {
        q: "Gizli Bir Ücret veya Kurulum Maliyeti Var mı?",
        a: "Hayır! KPNK fiyatlandırması son derece saydamdır. Belirtilen aylık paket fiyatı dışında kurulum, sunucu, teknik destek veya güncelleme için ek hiçbir ücret ödemezsiniz."
    },
    {
        q: "Aboneliğimi İstediğim Zaman İptal Edebilir Miyim?",
        a: "Kesinlikle. Bizde uzun süreli senetler veya zorunlu taahhütler yoktur. Memnun kalmadığınız takdirde kontrol panelinizden tek tıkla aboneliğinizi iptal edebilirsiniz."
    },
    {
        q: "Web Sitemin ve Asistanın Kurulumu Ne Kadar Sürüyor?",
        a: "Ödemenizi tamamladığınız saniye içerisinde yapay zeka bulut sunucularımızı tetikler. Siteniz ve asistan altyapınız 60 saniye içinde kullanıma hazır hale gelir."
    },
    {
        q: "17 Ajanın Tamamını Kullanabilecek miyim?",
        a: "Evet! Hangi paketi seçerseniz seçin, tüm yapay zeka ajanları dükkanınız için aynı anda mesaiye başlar."
    }
];

const allPlansInclude = [
    { icon: Globe, label: "Özel alan adı" },
    { icon: Shield, label: "Güvenli web hosting" },
    { icon: Zap, label: "AI oluşturma araçları" },
    { icon: HeadphonesIcon, label: "7/24 destek" },
];

export default function FiyatlarPage() {
    return (
        <PublicPageShell>

            {/* Single clean header */}
            <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 font-syne">
                    Taahhütsüz, Net <span className="text-primary">Fiyatlar</span>
                </h1>
                <p className="font-lora italic text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                    Sadece ihtiyacınız kadar ödeyin. Esnafın bütçesini yormayan, dijital ajansların %90&apos;ından daha ucuz ve daha akıllı çözümler.
                </p>

                {/* All plans include bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-muted-foreground text-sm">
                    <span className="font-syne font-bold text-foreground text-xs uppercase tracking-widest">Tüm paketlerde:</span>
                    {allPlansInclude.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Cards - Wix style comparison */}
            <PricingCards />

            {/* Value badges */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "Sıfır Kurulum Ücreti",
                            "Sınırsız Sunucu / Hosting",
                            "Tüm 17 Ajan Erişimi",
                            "Aylık İptal Opsiyonu"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center justify-center p-5 bg-white rounded-xl border border-foreground/10">
                                <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                                <span className="font-bold text-foreground text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-background text-foreground">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-syne">Sıkça Sorulan Sorular</h2>
                    </div>

                    <div className="space-y-4">
                        {sssData.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-foreground/10">
                                <h3 className="text-lg font-bold font-syne text-foreground flex items-start gap-3 mb-2">
                                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    {faq.q}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-8 text-sm">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </PublicPageShell>
    );
}
