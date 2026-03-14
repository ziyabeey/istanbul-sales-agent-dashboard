import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import Link from 'next/link'

export const metadata = {
    title: 'Sosyal Medya ve Meta Ads Yönetimi | kepenk.ai',
    description: 'TikTok, Google Ads ve Instagram kampanyalarınızı cironuza göre otonom olarak yöneten pazarlama zekasıyla tanışın.',
}

export default function SosyalMedyaPage() {
    return (
        <main className="min-h-screen bg-[#060b0e] pt-32 pb-24 text-foreground">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-syne font-extrabold mb-6">
                    Kendi Kendine Bütçe Basan <span className="text-purple-400">Pazarlama Ajansı.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground-light/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Cironuz mu düştü? kepenk.ai o saniye Meta Ads API ve TikTok üzerinden "Flaş İndirim" kampanyaları oluşturup yerel bölgenizde (LSA) müşteri potansiyeli yaratır.
                </p>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BentoGrid>
                    <BentoCard
                        title="TikTok Entegrasyonu"
                        description="Trend olan TikTok seslerini ve video formatlarını analiz edip işletmenize özel çekim fikirleri/senaryolar oluşturur."
                        icon={<span className="text-xl">🎵</span>}
                    />
                    <BentoCard
                        title="Instagram DM Kalkanı"
                        description="Reklamlardan gelen yüzlerce 'Fiyat nedir?' 'Neredesiniz?' sorusunu insan gibi yanıtlar, sizi trollerden ve rakiplerden korur."
                        icon={<span className="text-xl">📱</span>}
                        className="md:col-span-2"
                    />
                    <BentoCard
                        title="Google Local Services"
                        description="Mahallenizdeki potansiyel müşterilere (Haritalar/Sponsorlu) 50 TL gibi mikro bütçelerle doğrudan ulaşır. Optimizasyon Puanınızı >%95 tutar."
                        icon={<span className="text-xl">🎯</span>}
                        className="md:col-span-3"
                    />
                </BentoGrid>
            </section>
        </main>
    )
}
