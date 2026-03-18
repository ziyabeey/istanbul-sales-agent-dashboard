import React from 'react'
import Navbar from '@/components/layout/Navbar'
import FooterTrustSection from '@/components/sections/FooterTrustSection'

export default function GizlilikPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="mb-12">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-muted-foreground bg-warm mb-6">
                        Son Güncelleme: 08.03.2026
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold font-syne text-foreground mb-6">
                        Gizlilik <span className="text-rust">Politikası</span>
                    </h1>
                    <p className="text-muted-foreground text-lg font-lora italic leading-relaxed">
                        yzt.digital olarak, kullanıcılarımızın hizmetlerimizden güvenli ve eksiksiz şekilde faydalanmalarını
                        sağlamak amacıyla, gizliliğinizi korumaya büyük önem veriyoruz. Bu "Gizlilik Politikası",
                        ziyaretçilerimizin veya üyelerimizin kişisel verilerinin kanuna uygun olarak şeffaf bir şekilde işlenmesini şart koşar.
                    </p>
                </div>

                <div className="col-span-1 border-t border-border/20 pt-8 mt-12 mb-8"></div>

                <div className="prose prose-stone max-w-none space-y-8 text-muted-foreground">
                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">1. Toplanan Veriler ve Çerezler (Cookies)</h2>
                        <p className="leading-relaxed">
                            Siteye dışarıdan eriştiğinizde dahi, size daha alakalı ve hızlı bir deneyim sunmak amacıyla ip adresiniz,
                            tarayıcı tipiniz ve ziyaret edilen sayfalarınız loglarımızda tutulmaktadır.
                            Sitemizde, kullanıcı tercihlerini kaydetmek ve deneyiminizi kişiselleştirmek için çerezler (cookies) kullanılmaktadır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">2. Veri Güvenliği ve AI Mimarisi</h2>
                        <p className="leading-relaxed">
                            Yapay Zeka botumuz (kepenk.ai) sizden aldığı direktifleri ve verileri üçüncü taraf AI servislerine
                            (Örn: Anthropic, Google Gemini) minimum bilgi açıklama prensibi ile <strong>anonimize ederek</strong> (eğitim verisi dışında bırakma talebiyle) aktarmaktadır.
                            Müşteri iletişiminiz veya veritabanınız kesinlikle genel Yapay Zeka modellerinin eğitilmesi için kullanılmayacaktır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">3. Şifreleme (Encryption) Politikası</h2>
                        <p className="leading-relaxed">
                            İletişim ağlarındaki tüm veriler (Formlar, ödeme adımları, profil güncellemeleri)
                            <strong> 256-bit TLS (Transport Layer Security) </strong> standardıyla şifrelenir.
                            Ödeme altyapımız Iyzico® tarafından sağlanmakta olup, kredi kartı bilgileriniz sunucularımızda saklanmaz.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">4. İletişim</h2>
                        <p className="leading-relaxed">
                            Gizlilik politikamız ile ilgili her türlü soru, görüş ve veri talebiniz için bize
                            <strong> destek@kepenk.ai </strong> adresinden ulaşabilirsiniz.
                        </p>
                    </div>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    )
}
