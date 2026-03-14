import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import Link from 'next/link'

export const metadata = {
    title: 'Entegrasyonlar | kepenk.ai Sinerji Ekosistemi',
    description: 'Trendyol, Yemeksepeti, Iyzico, Paraşüt, Google LSA ve TikTok. İşletmenizin bağlı olduğu tüm platformları tek bir yapay zeka beyninde toplayın.',
}

export default function EntegrasyonlarPage() {

    const integrations = [
        { name: 'Iyzico & PayTR', desc: 'Sohbetin tam ortasında müşteriye güvenli ödeme/kapora linki fırlatır ve ödeme geldiğinde rezervasyonu onaylar.', color: 'border-blue-500/30 hover:border-blue-500', icon: '💳' },
        { name: 'Trendyol & Yemeksepeti', desc: 'API üzerinden gelen siparişlerin yoğunluğunu analiz edip WhatsApp\'tan soran müşteriye tahmini teslimat süresi söyler.', color: 'border-orange-500/30 hover:border-orange-500', icon: '🛵' },
        { name: 'Paraşüt & Luca', desc: 'İrsaliye ve fişlerin fotoğrafını çekip yolladığınız anda OCR ile okuyup muhasebe yazılımınıza e-fatura taslağı olarak düşürür.', color: 'border-emerald-500/30 hover:border-emerald-500', icon: '🧾' },
        { name: 'Google LSA (Local Services)', desc: 'Google üzerinden gelen "Lead" potansiyellerine 5 saniye içinde dönüş yaparak Google güven puanınızı tavan yaptırır.', color: 'border-red-500/30 hover:border-red-500', icon: '🔍' },
        { name: 'TikTok & Meta Ads', desc: 'Instagram DM ve Facebook Messenger\'dan gelen binlerce spam ve ciddi mesajı filtreler, reklam bütçenizi boşa harcatmaz.', color: 'border-purple-500/30 hover:border-purple-500', icon: '📱' },
        { name: 'Takvim (Google & Apple)', desc: 'Randevuları saniyeler içinde senkronize eder. Siz sadece sabah kalkıp nereye gideceğinize bakarsınız.', color: 'border-cyan-500/30 hover:border-cyan-500', icon: '📅' }
    ]

    return (
        <main className="min-h-screen bg-[#060b0e] pt-32 pb-24 text-foreground">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-syne font-extrabold mb-6">
                    Sınırları <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Ortadan Kaldırın</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground-light/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Kullandığınız mevcut muhasebe, pazaryeri, takvim ve ödeme yazılımları çöpe gitmez. kepenk.ai tüm bu sistemlerin ortasına yerleşip orkestra şefi gibi yönetimi devralır.
                </p>
            </section>

            {/* Grid Ecosystem */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((int, i) => (
                        <div key={i} className={`bg-background/50 backdrop-blur-md rounded-3xl p-8 border ${int.color} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                            <div className="text-4xl mb-6">{int.icon}</div>
                            <h3 className="text-xl font-syne font-bold text-white mb-3">{int.name}</h3>
                            <p className="text-muted-foreground-light/80 text-sm leading-relaxed">{int.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Box */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full bg-gradient-to-br from-ink to-[#1a2b3c] rounded-[3rem] p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-sage/5 blur-3xl pointer-events-none" />
                    <h2 className="text-3xl font-syne font-bold mb-4 relative z-10">Özel Bir Yazılım Mı Kullanıyorsunuz?</h2>
                    <p className="text-muted-foreground-light mb-8 max-w-xl mx-auto relative z-10">Premium ve PremiumPlus paketlerimizde Webhook API uç noktalarımızı dilediğiniz kendi yerel ERP ve MRP sisteminize doğrudan bağlayabilirsiniz.</p>
                    <Link href="/fiyatlar" className="relative z-10 inline-block bg-white text-foreground font-bold py-3 px-8 rounded-full transition-all hover:scale-105">
                        Paketleri İncele
                    </Link>
                </div>
            </section>

        </main>
    )
}
