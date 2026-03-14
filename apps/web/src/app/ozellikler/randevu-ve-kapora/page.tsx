import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { WhatsAppMockup } from '@/components/ui/WhatsAppMockup'
import Link from 'next/link'

export const metadata = {
    title: 'Randevu ve Kapora Yönetimi | kepenk.ai',
    description: 'Boşta geçen koltukları Iyzico entegrasyonuyla WhatsApp üzerinden satarak gelmeyen müşteri zararından kurtulun.',
}

export default function RandevuPage() {
    const mockupData = [
        { musteri: 'Bugün akşam 6 için protez tırnak boşluğunuz var mı?' },
        { ai: 'Akşam 18:00 dolumuz maalesef, ancak 18:45 iptali oldu ve boş. Sizin için tutalım mı?' },
        { musteri: 'Olur çok sevinirim' },
        { ai: 'Harika. Randevuyu kesinleştirmem için sistem gereği 250 TL kapora alıyoruz. Aşağıdaki güvenli linkten ödemeyi geçerseniz takvimi kilitliyorum. (Link: paytr.com/k/abc1234)' }
    ]

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 text-foreground">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-syne font-extrabold mb-6">
                    Gelmeyen Müşteriye Son: <br /> <span className="text-white/80 border-b-4 border-rust">Garanti Randevular.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground-light/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Kuaför, Psikolog, Oto Servis ve Özel Ders Merkezleri için otonom takvim! Asistanınız boşlukları yönetir ve "Gelicem deyip ekilen" randevular için kapora/tahsilat kalkanı kurar.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 w-full flex justify-center">
                    <WhatsAppMockup messages={mockupData} />
                </div>
                <div className="flex-1 w-full space-y-6">
                    <h2 className="text-3xl font-bold font-syne">Iyzico & PayTR Cüzdanı Entegredir</h2>
                    <p className="text-muted-foreground-light">Uygulamanız arka planda gerçek bir pos cihazı gibi çalışır. Yüksek tutarlı çekimlerde veya ilk kez gelen müşterilerde AI inisiyatif alıp ödeme tahsil edilmeden koltuğu ayırmaz.</p>
                    <ul className="space-y-4 font-medium text-muted-foreground">
                        <li className="flex items-center gap-2">✅ Kapora gelince anında Google Takviminize yazılır.</li>
                        <li className="flex items-center gap-2">✅ Müşteri randevusuna 1 saat kala SMS veya WhatsApp ile hatırlatma atılır.</li>
                        <li className="flex items-center gap-2">✅ Geciken müşteriye "Neredesiniz?" diyalogu başlatır.</li>
                    </ul>
                </div>
            </section>

        </main>
    )
}
