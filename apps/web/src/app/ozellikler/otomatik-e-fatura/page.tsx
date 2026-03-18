import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { DashboardMockup } from '@/components/ui/DashboardMockup'

export const metadata = {
    title: 'Otomatik E-Fatura ve Finans | kepenk.ai',
    description: 'Masaüstündeki fişleri ve irsaliyeleri fotoğraflayın, yapay zeka saniyeler içinde okuyup e-fatura taslağına dönüştürsün.',
}

export default function EFaturaPage() {
    return (
        <main className="min-h-screen bg-[#0e1111] pt-32 pb-24 text-foreground">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-syne font-extrabold mb-6">
                    Fiş Çöplüğüne Son. <br /> <span className="text-sage">Muhasebenizi Otopilota Alın.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Paraşüt ve Luca entegrasyonu sayesinde cebinizden çıkan şirket masraflarını WhatsApp'a fotoğraf atarak masraf fişi olarak işletin. Müşterilerin VKN bilgilerini anında e-fatura taslağına dönüştürün.
                </p>
            </section>

            {/* Visual Mockup */}
            <section className="px-4 sm:px-6 lg:px-8 mb-32">
                <DashboardMockup title="Finans ve Muhasebe (CFO Ajanı)" delay={0.2}>
                    <div className="flex flex-col gap-4">
                        <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 flex items-start gap-4">
                            <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center text-2xl">📸</div>
                            <div className="flex-1">
                                <h4 className="text-sage font-bold">Giden Fiş (Yemek Masrafı) Tespit Edildi</h4>
                                <p className="text-muted-foreground text-sm mt-1">"Köfteci Yusuf - 450 TL" %1 KDV ile masraf merkezine işlendi ve muhasebecinize Luca üzerinden iletildi.</p>
                            </div>
                        </div>
                        <div className="bg-white border border-foreground/10 shadow-sm rounded-xl p-4 flex items-start gap-4 opacity-70">
                            <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center text-2xl">⚡</div>
                            <div className="flex-1">
                                <h4 className="text-foreground font-bold">Taslak E-Fatura Oluşturuldu</h4>
                                <p className="text-muted-foreground text-sm mt-1">Ahmet Turizm A.Ş. için 12.000 TL değerinde hizmet faturası e-Arşiv'de imzalanmayı bekliyor.</p>
                            </div>
                        </div>
                    </div>
                </DashboardMockup>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BentoGrid>
                    <BentoCard
                        title="Görsel Okuma (OCR)"
                        description="Buruşuk fişleri ve okunması zor irsaliyeleri yapay zeka kamerası (GCP Vision) hatasız okur."
                        icon={<span className="text-xl">👁️</span>}
                    />
                    <BentoCard
                        title="Sıfır Vergi Cezası"
                        description="Kaybolan masraf fişleri yüzünden fazla vergi ödemezsiniz. Her an giderlerinizi dijitalleştirip vergi matrahından düşersiniz."
                        icon={<span className="text-xl">🛡️</span>}
                    />
                    <BentoCard
                        title="Cari Hesap Yönetimi"
                        description="Aylık ödemesi geciken B2B müşterilerinize otomatik WhatsApp vade hatırlatmaları gönderilir."
                        icon={<span className="text-xl">📈</span>}
                    />
                </BentoGrid>
            </section>
        </main>
    )
}
