import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Otomatik Yorum Yanıtlama',
  description: 'KPNK AI ile Google yorumlarına otomatik, kişiselleştirilmiş ve profesyonel yanıtlar verin.',
  alternates: { canonical: 'https://destek.kepenk.ai/google-yorumlar/otomatik-yanitlar' },
  openGraph: { title: 'Otomatik Yorum Yanıtlama — KPNK', description: 'AI ile Google yorumlarına otomatik yanıt verin.', url: 'https://destek.kepenk.ai/google-yorumlar/otomatik-yanitlar', type: 'article' },
}

export default function OtomatikYorumYanitlama() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Otomatik Yorum Yanıtlama</h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK AI, Google yorumlarınızı analiz ederek her bir yorum için kişiselleştirilmiş, profesyonel yanıtlar oluşturur. Olumlu yorumlara teşekkür eder, olumsuz yorumlara empati ile yaklaşır.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Otomatik Yanıtlamayı Aktifleştirme</h2>
      <AdimAdim adimlar={[
        { baslik: 'Google Yorumlar bağlantısını kurun', aciklama: 'Henüz bağlamadıysanız Google Yorum Kurulumu rehberimizi takip edin.' },
        { baslik: 'Otomatik yanıtlamayı açın', aciklama: 'Dashboard > Ayarlar > Google Yorumlar > Otomatik Yanıt toggle\'ını aktifleştirin.' },
        { baslik: 'Yanıt tonunu ayarlayın', aciklama: 'AI\'ın yanıt üslubunu seçin: Resmi, Samimi veya Sektörel. Sektörel mod, sektörünüze özel terminoloji kullanır.' },
        { baslik: 'İnceleme modunu seçin', aciklama: '"Otomatik yayınla" veya "Önce bana göster" seçeneklerinden birini seçin. İkinci seçenekte AI yanıtı oluşturur ama siz onaylamadan yayınlanmaz.' },
      ]} />

      <BilgiKutusu tip="tip" baslik="Önerilen Ayar">
        İlk hafta &quot;Önce bana göster&quot; modunu kullanarak AI yanıtlarını kontrol edin. Memnun kaldığınızda &quot;Otomatik yayınla&quot; moduna geçebilirsiniz.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">AI Yanıt Örnekleri</h2>
      <div className="space-y-4 mb-6">
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-emerald-700 font-medium">5 Yıldız</span>
          </div>
          <p className="text-sm text-foreground mb-2"><strong>Müşteri:</strong> &quot;Harika bir hizmet aldık, çok memnunuz. Kesinlikle tavsiye ederim!&quot;</p>
          <p className="text-sm text-emerald-700"><strong>AI Yanıt:</strong> &quot;Çok teşekkür ederiz! Memnuniyetiniz bizim en büyük motivasyonumuz. Sizi tekrar ağırlamaktan mutluluk duyarız. 🙏&quot;</p>
        </div>
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">★★☆☆☆</span>
            <span className="text-sm text-rose-700 font-medium">2 Yıldız</span>
          </div>
          <p className="text-sm text-foreground mb-2"><strong>Müşteri:</strong> &quot;Bekleme süresi çok uzundu, 45 dakika bekledik.&quot;</p>
          <p className="text-sm text-rose-700"><strong>AI Yanıt:</strong> &quot;Değerli geri bildiriminiz için teşekkür ederiz. Bekleme süreniz için çok üzgünüz — bu bizim standartlarımızın altında. Randevu sistemi ile bekleme süresini minimuma indiriyoruz. Bir sonraki ziyaretinizde size daha iyi hizmet vermek isteriz.&quot;</p>
        </div>
      </div>

      <BilgiKutusu tip="warning" baslik="Olumsuz Yorum Politikası">
        AI, 1-2 yıldızlı olumsuz yorumlarda asla savunmacı veya tartışmacı bir ton kullanmaz. Empati gösterir, özür diler ve çözüm önerir. Çok hassas durumlarda size bildirim gönderir.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Google Yorum Kurulumu', href: '/destek/google-yorumlar/kurulum' },
        { baslik: 'Google My Business Optimizasyonu', href: '/destek/seo-rehberi/google-my-business' },
        { baslik: 'WhatsApp AI Kurulumu', href: '/destek/whatsapp/kurulum' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'Google Yorumlarına Otomatik AI Yanıt Verme',
        description: 'KPNK AI ile Google yorumlarına otomatik yanıt verin.',
        step: [
          { '@type': 'HowToStep', name: 'Google bağlantısını kurun', text: 'Google Yorumlar bağlantısını aktifleştirin.' },
          { '@type': 'HowToStep', name: 'Otomatik yanıtı açın', text: 'Otomatik Yanıt toggle\'ını aktifleştirin.' },
          { '@type': 'HowToStep', name: 'Tonu ayarlayın', text: 'AI yanıt üslubunu seçin.' },
          { '@type': 'HowToStep', name: 'İnceleme modu', text: 'Otomatik yayınla veya önce göster seçin.' },
        ],
      }) }} />
    </article>
  )
}
