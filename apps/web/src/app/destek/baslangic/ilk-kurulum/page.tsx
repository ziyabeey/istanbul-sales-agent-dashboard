import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'
import SikKarsilasilanSorunlar from '@/components/destek/SikKarsilasilanSorunlar'

export const metadata: Metadata = {
  title: 'İlk Kurulum Adımları',
  description: 'KPNK hesabınızı oluşturun ve ilk web sitenizi 5 dakikada kurun. Adım adım kurulum rehberi.',
  alternates: { canonical: 'https://destek.kepenk.ai/baslangic/ilk-kurulum' },
  openGraph: { title: 'İlk Kurulum Adımları — KPNK', description: 'Hesap oluşturun ve sitenizi 5 dakikada kurun.', url: 'https://destek.kepenk.ai/baslangic/ilk-kurulum', type: 'article' },
}

export default function IlkKurulum() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">İlk Kurulum Adımları</h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK ile web sitenizi oluşturmak sadece 5 dakika sürer. Aşağıdaki adımları takip ederek hemen başlayın.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Hesap Oluşturma</h2>
      <AdimAdim adimlar={[
        { baslik: 'kepenk.ai/kayit adresine gidin', aciklama: 'Ana sayfadaki "Ücretsiz Başla" veya "Kayıt Ol" butonuna tıklayarak kayıt sayfasına ulaşabilirsiniz.' },
        { baslik: 'Telefon numaranızı girin', aciklama: 'İşletmenize ait WhatsApp Business numaranızı girin. Bu numara hem giriş hem de WhatsApp AI asistanı için kullanılacaktır.' },
        { baslik: 'Doğrulama kodunu girin', aciklama: 'WhatsApp\'a gelen 6 haneli doğrulama kodunu girin. Kod 5 dakika geçerlidir.' },
        { baslik: 'Sektörünüzü seçin', aciklama: '28 sektör arasından işletmenize en uygun olanı seçin. Bu seçime göre AI asistanınız ve site şablonunuz özelleştirilecektir.' },
        { baslik: 'Paketinizi seçin ve ödeme yapın', aciklama: 'İhtiyaçlarınıza uygun paketi seçin. Kredi kartı ile güvenli ödeme (iyzico 3D Secure) yapın.' },
      ]} />

      <BilgiKutusu tip="tip" baslik="Ücretsiz Deneme">
        Temel paket ile başlayarak platformu tanıyabilir, istediğiniz zaman üst pakete geçebilirsiniz.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Site Oluşturma</h2>
      <p className="text-muted-foreground mb-4">
        Kayıt tamamlandıktan sonra KPNK, AI destekli sektörünüze özel bir web sitesi otomatik olarak oluşturur. Bu süreç yaklaşık 30-60 saniye sürer ve şunları içerir:
      </p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Sektörünüze uygun şablon seçimi</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> AI tarafından yazılmış hizmet açıklamaları</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> İletişim bilgilerinizin entegrasyonu</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> WhatsApp butonunun aktifleştirilmesi</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> SEO ayarlarının otomatik yapılandırılması</li>
      </ul>

      <BilgiKutusu tip="info" baslik="Sonraki Adım">
        Siteniz oluşturulduktan sonra editör ile istediğiniz her şeyi değiştirebilirsiniz. Editörü nasıl kullanacağınızı öğrenmek için Editör Kullanım Kılavuzu rehberimize göz atın.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Hangi Paket Bana Uygun?', href: '/destek/baslangic/paket-secimi' },
        { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
        { baslik: 'WhatsApp Bağlantısı', href: '/destek/baslangic/whatsapp-baglantisi' },
        { baslik: 'İşletme Bilgileri', href: '/destek/baslangic/isletme-bilgileri' },
      ]} />
      <SikKarsilasilanSorunlar sorunIdleri={['otp-gelmiyor', 'hesap-bulunamadi', 'odeme-basarili-site-yok']} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'KPNK İlk Kurulum Adımları',
        description: 'KPNK hesabı oluşturma ve ilk web sitesini kurma rehberi.',
        step: [
          { '@type': 'HowToStep', name: 'Kayıt sayfasına gidin', text: 'kepenk.ai/kayit adresine gidin.' },
          { '@type': 'HowToStep', name: 'Telefon numarası girin', text: 'WhatsApp Business numaranızı girin.' },
          { '@type': 'HowToStep', name: 'Doğrulama kodu', text: 'WhatsApp\'a gelen kodu girin.' },
          { '@type': 'HowToStep', name: 'Sektör seçin', text: '28 sektör arasından seçim yapın.' },
          { '@type': 'HowToStep', name: 'Ödeme yapın', text: 'Paket seçin ve ödeme yapın.' },
        ],
      }) }} />
    </article>
  )
}
