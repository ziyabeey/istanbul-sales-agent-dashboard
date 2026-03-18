import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'İşletme Bilgilerini Girme',
  description: 'İşletme adı, adres, telefon numarası ve çalışma saatlerinizi KPNK\'ya nasıl girersiniz? Adım adım rehber.',
  alternates: { canonical: 'https://destek.kepenk.ai/baslangic/isletme-bilgileri' },
  openGraph: { title: 'İşletme Bilgileri — KPNK', description: 'İşletme bilgilerinizi nasıl gireceğinizi öğrenin.', url: 'https://destek.kepenk.ai/baslangic/isletme-bilgileri', type: 'article' },
}

export default function IsletmeBilgileri() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">İşletme Bilgilerini Girme</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Doğru işletme bilgileri hem müşterilerinizin sizi bulmasını sağlar hem de Google&apos;da üst sıralarda çıkmanıza yardımcı olur. Bu rehberde tüm bilgilerinizi nasıl gireceğinizi öğreneceksiniz.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Profil Bilgilerini Düzenleme</h2>
      <AdimAdim adimlar={[
        { baslik: 'Dashboard > Profil sayfasına gidin', aciklama: 'Sol menüden veya sağ üst köşedeki profil simgesinden "Profil" sekmesine tıklayın.' },
        { baslik: 'İşletme adınızı girin', aciklama: 'Google\'da görünmesini istediğiniz resmi işletme adınızı yazın. Örn: "Ali Usta Berber" veya "Lezzet Köşesi Restoran".' },
        { baslik: 'Adres bilgisini girin', aciklama: 'Tam adresinizi girin. Bu bilgi Google Haritalar entegrasyonu ve müşteri yönlendirmesi için kullanılır.' },
        { baslik: 'Telefon numarası doğrulayın', aciklama: 'Kayıt sırasında girdiğiniz numarayı doğrulayın veya güncelleyin. Bu numara WhatsApp butonunda ve iletişim formunda kullanılır.' },
        { baslik: 'Çalışma saatlerini ayarlayın', aciklama: 'Her gün için açılış-kapanış saatlerini belirleyin. Tatil günlerini "Kapalı" olarak işaretleyebilirsiniz.' },
      ]} />

      <BilgiKutusu tip="tip" baslik="Google İçin Önemli">
        İşletme adı, adres ve telefon (NAP bilgisi) tutarlılığı Google sıralamalarında kritik rol oynar. Bu bilgilerin Google My Business&apos;taki bilgilerinizle aynı olduğundan emin olun.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Logo ve Kapak Görseli</h2>
      <p className="text-muted-foreground mb-4">
        İşletme logonuzu ve kapak görselinizi profil sayfasından yükleyebilirsiniz. Logo, sitenizin navbar ve footer bölümlerinde, WhatsApp mesajlarında ve Google arama sonuçlarında kullanılır.
      </p>

      <BilgiKutusu tip="info" baslik="Önerilen Boyutlar">
        Logo: En az 200x200 piksel, kare format önerilir (PNG veya SVG).<br />
        Kapak görseli: 1200x630 piksel (sosyal medya paylaşımlarında da kullanılır).
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'İlk Kurulum Adımları', href: '/destek/baslangic/ilk-kurulum' },
        { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
        { baslik: 'Google My Business', href: '/destek/seo-rehberi/google-my-business' },
        { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'KPNK İşletme Bilgileri Girme',
        description: 'İşletme adı, adres, telefon ve çalışma saatlerini nasıl gireceğinizi öğrenin.',
        step: [
          { '@type': 'HowToStep', name: 'Profil sayfasına gidin', text: 'Dashboard > Profil.' },
          { '@type': 'HowToStep', name: 'İşletme adı girin', text: 'Resmi işletme adınızı yazın.' },
          { '@type': 'HowToStep', name: 'Adres girin', text: 'Tam adresinizi girin.' },
          { '@type': 'HowToStep', name: 'Telefon doğrulayın', text: 'Numaranızı doğrulayın.' },
          { '@type': 'HowToStep', name: 'Çalışma saatleri', text: 'Her gün için saatleri ayarlayın.' },
        ],
      }) }} />
    </article>
  )
}
