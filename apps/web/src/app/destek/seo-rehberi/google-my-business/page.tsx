import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Google My Business Optimizasyonu',
  description: 'Google My Business profilinizi optimize ederek yerel aramalarda üst sıralara çıkın. GMB rehberi.',
  alternates: { canonical: 'https://destek.kepenk.ai/seo-rehberi/google-my-business' },
  openGraph: { title: 'Google My Business — KPNK SEO', url: 'https://destek.kepenk.ai/seo-rehberi/google-my-business', type: 'article' },
}

export default function GoogleMyBusiness() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Google My Business Optimizasyonu</h1>
      <p className="text-lg text-muted-foreground mb-8">Google My Business (GMB), yerel işletmelerin Google Arama ve Haritalar&apos;da görünmesini sağlayan ücretsiz bir araçtır. Doğru optimize edildiğinde müşterilerinizin sizi bulma ihtimalini %70&apos;e kadar artırır.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">GMB Profili Oluşturma</h2>
      <AdimAdim adimlar={[
        { baslik: 'business.google.com adresine gidin', aciklama: 'Google hesabınız ile giriş yapın ve "İşletmenizi ekleyin" butonuna tıklayın.' },
        { baslik: 'İşletme bilgilerinizi girin', aciklama: 'İşletme adı, kategori, adres ve telefon numarasını eksiksiz doldurun.' },
        { baslik: 'Doğrulama yapın', aciklama: 'Google, adresinize bir doğrulama kartpostalı gönderecektir. Karttaki kodu girin (genellikle 5-7 iş günü).' },
        { baslik: 'Profili zenginleştirin', aciklama: 'Fotoğraflar ekleyin, çalışma saatlerini girin, hizmetlerinizi listeleyin ve web sitenizin linkini ekleyin.' },
      ]} />

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Optimizasyon İpuçları</h2>
      <div className="space-y-3 mb-6">
        {[
          { baslik: 'Düzenli fotoğraf ekleyin', aciklama: 'Ayda en az 5 yeni fotoğraf yükleyin. İşletme içi, dışı, ürünler ve ekip fotoğrafları.' },
          { baslik: 'Gönderiler paylaşın', aciklama: 'GMB gönderileri ile kampanya, etkinlik ve güncellemelerinizi paylaşın. Google bunu aktiflik sinyali olarak değerlendirir.' },
          { baslik: 'Yorumlara yanıt verin', aciklama: 'Tüm yorumlara (olumlu ve olumsuz) 24 saat içinde yanıt verin. KPNK AI bu işi otomatikleştirir.' },
          { baslik: 'Soru-Cevap bölümünü kullanın', aciklama: 'Sık sorulan soruları kendiniz ekleyin ve cevaplayın. Bu, potansiyel müşterilere bilgi sağlar.' },
          { baslik: 'Kategorileri doğru seçin', aciklama: 'Ana kategori + en fazla 9 ek kategori seçebilirsiniz. Sektörünüze uygun tüm kategorileri ekleyin.' },
        ].map((t) => (
          <div key={t.baslik} className="p-4 bg-gray-50 rounded-xl">
            <p className="font-semibold text-foreground text-sm">{t.baslik}</p>
            <p className="text-muted-foreground text-xs mt-1">{t.aciklama}</p>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="tip" baslik="KPNK + GMB Entegrasyonu">
        KPNK, GMB profilinizi otomatik olarak sitenize bağlar. Google yorumlarınız sitenizde gösterilir, sitenizin linki GMB profilinde yer alır ve NAP tutarlılığı sağlanır.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Temel SEO', href: '/destek/seo-rehberi/temel-seo' },
        { baslik: 'Google Yorum Kurulumu', href: '/destek/google-yorumlar/kurulum' },
        { baslik: 'İşletme Bilgileri', href: '/destek/baslangic/isletme-bilgileri' },
      ]} />
      <SayfaDegerlendirme />
    </article>
  )
}
