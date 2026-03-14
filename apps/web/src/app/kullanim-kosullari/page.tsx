import Link from 'next/link'

export const metadata = {
    title: 'Kullanım Koşulları | kepenk.ai',
}

export default function KullanimKosullariPage() {
    return (
        <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
            <Link href="/" className="text-muted-foreground text-sm mb-6 block hover:text-rust transition-colors">
                ← Ana Sayfa
            </Link>
            <h1 className="text-foreground font-syne font-extrabold text-3xl mb-6">
                Kullanım Koşulları
            </h1>
            <div className="text-muted-foreground space-y-4 font-lora leading-relaxed">
                <p>
                    kepenk.ai'yi kullanarak aşağıdaki koşulları kabul etmiş olursunuz.
                </p>

                <h2 className="text-foreground font-syne font-bold text-lg mt-6">Hizmet</h2>
                <p>kepenk.ai, esnaf işletmelerine dijital varlık yönetimi ve yapay zeka destekli asistanlık hizmeti sunar.</p>

                <h2 className="text-foreground font-syne font-bold text-lg mt-6">Ödeme ve İptal</h2>
                <p>Abonelikler aylık olarak yenilenir. İptal durumunda dönem sonuna kadar hizmet devam eder. Ücret iadesi yapılmaz.</p>

                <h2 className="text-foreground font-syne font-bold text-lg mt-6">Sorumluluk Sınırları</h2>
                <p>kepenk.ai, yapay zeka tarafından üretilen içeriklerin doğruluğundan tam olarak sorumlu tutulamaz. Yayınlanmadan önce içerikleri kontrol etmek kullanıcının sorumluluğundadır.</p>

                <h2 className="text-foreground font-syne font-bold text-lg mt-6">İletişim</h2>
                <p>Sorularınız için: <strong className="text-foreground">destek@kepenk.ai</strong></p>

                <p className="text-muted-foreground/50 text-sm mt-8">Son güncelleme: Ocak 2026</p>
            </div>
        </div>
    )
}
