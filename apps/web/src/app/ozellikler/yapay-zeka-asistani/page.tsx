import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { WhatsAppMockup } from '@/components/ui/WhatsAppMockup'
import Link from 'next/link'

export const metadata = {
    title: 'Yapay Zeka Asistanı | kepenk.ai - İşletmenizin Otonom Beyni',
    description: 'Müşterilerinizle 7/24 konuşan, WhatsApp üzerinden saniyeler içinde komut alan ve sektörünüze özel eğitilmiş yapay zeka sekreterinizle tanışın.',
}

export default function YZAsistaniPage() {
    const mockupMessages = [
        { musteri: 'Merhaba, hizmetleriniz hakkında bilgi alabilir miyim?' },
        { ai: 'Merhabalar! Tabii ki, size nasıl yardımcı olabilirim? İşletmemiz 10 yıldır Kadıköy bölgesinde güvenle hizmet vermektedir. Hangi konuda fiyat veya randevu almak istersiniz?' },
        { musteri: 'Hafta sonu boş yeriniz var mı?' },
        { ai: 'Kontrol ettim, Cumartesi öğleden sonra 14:00 veya Pazar sabah 10:00 için takvimimizde boşluğumuz mevcut. Hangisini sizin adınıza ayıralım?' }
    ]

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 text-foreground">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-syne font-extrabold mb-6">
                    Siz Uyurken Bile <span className="text-rust">Satış Yapan</span><br />
                    Sanal Sekreteriniz
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground-light/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Müşterileriniz WhatsApp'tan yazdığı anda sektörünüze özel eğitilmiş yapay zekamız devreye girer. Soru yanıtlar, takvimi doldurur ve sizi angaryadan kurtarır.
                </p>
                <Link href="/kayit" className="inline-block bg-rust hover:bg-rust-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-rust/20">
                    Ustanızı Ücretsiz Test Edin
                </Link>
            </section>

            {/* Feature Showcase (Bento + Mockup) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-syne font-bold text-white mb-4">Neden Standart Bir Chatbot Değil?</h2>
                        <div className="flex flex-col gap-8">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-sage mb-2">1. Kesinlikle "Bot" Gibi Konuşmaz</h3>
                                <p className="text-muted-foreground-light">Hazır cevaplardan oluşan menüler kullanmaz. Müşterinin derdini tıpkı gerçek bir insan gibi dinler, anlar ve firmanızın belirlediği ses tonuyla doğal bir sohbet kurar.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-rust mb-2">2. Sadece Sektörünüzü Bilir</h3>
                                <p className="text-muted-foreground-light">Eğer bir kuaförseniz keratin bakımını veya balyajı bilir; bir tesisatçıysanız Pimaş borularından ve kaçak tespiti cihazından anlar.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-gold mb-2">3. Randevu ve Fiyat Kapatıcısıdır</h3>
                                <p className="text-muted-foreground-light">Müşteriyi sadece dinlemekle kalmaz, ustaca sorular sorarak fiyatı netleştirir, takvimi satar veya ofis görüşmesine ikna eder (Lead Generation).</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute inset-0 bg-rust/20 blur-3xl rounded-full scale-150 -z-10"></div>
                            <WhatsAppMockup messages={mockupMessages} delayMultiplier={0.8} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid */}
            <section className="px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-syne font-bold">Kaputun Altındaki Güç</h2>
                </div>
                <BentoGrid>
                    <BentoCard
                        index={0}
                        title="Sınırsız Hafıza (RAG)"
                        description="İşletmenizin 100 sayfalık PDF menüsünü, fiyat listesini veya sık sorulan sorularını saniyeler içinde öğrenir ve asla unutmaz."
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                    />
                    <BentoCard
                        index={1}
                        title="Duygu Analizi (Sentiment)"
                        description="Müşteri kızgınsa veya acil bir sorun yaşıyorsa durumu anlar, tonunu alttan alarak düzeltir ve anında size kırmızı alarm (bildirim) gönderir."
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        className="md:col-span-2"
                    />
                    <BentoCard
                        index={2}
                        title="24/7 Çoklu Dil"
                        description="Rusça yazan turiste Rusça, İngilizce yazana İngilizce yanıt verir. Sınırları ortadan kaldırır."
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>}
                        className="md:col-span-3"
                    />
                </BentoGrid>
            </section>

        </main>
    )
}
