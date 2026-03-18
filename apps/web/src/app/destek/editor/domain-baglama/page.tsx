import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'
import SikKarsilasilanSorunlar from '@/components/destek/SikKarsilasilanSorunlar'

export const metadata: Metadata = {
  title: 'Özel Domain Bağlama',
  description: 'Kendi alan adınızı (domain) KPNK sitenize bağlayın. DNS ayarları, CNAME kaydı ve SSL sertifikası rehberi.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/domain-baglama' },
  openGraph: {
    title: 'Özel Domain Bağlama — KPNK',
    description: 'Kendi alan adınızı KPNK sitenize bağlayın.',
    url: 'https://destek.kepenk.ai/editor/domain-baglama',
    type: 'article',
  },
}

export default function DomainBaglama() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Özel Domain Bağlama
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Kendi alan adınız (ör. isletmem.com veya isletmem.com.tr) ile KPNK sitenize profesyonel bir
        görünüm kazandırın. Domain bağlama işlemi birkaç dakikada tamamlanır.
      </p>

      <BilgiKutusu tip="info" baslik="Ücretsiz Domain">
        Premium ve Premium Plus paketlerinde .com.tr veya .com domain hediye edilir.
        Diğer paketlerde varsayılan olarak isletmeadi.kepenk.ai subdomain&apos;i kullanılır.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Domain Bağlama Adımları</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Dashboard > Sitem > Domain sayfasına gidin', aciklama: 'Sol menüden "Sitem" ve ardından "Domain" sekmesine tıklayın.' },
          { baslik: 'Alan adınızı girin', aciklama: 'Sahip olduğunuz alan adını (ör. isletmem.com) girin ve "Bağla" butonuna tıklayın.' },
          { baslik: 'DNS kayıtlarını güncelleyin', aciklama: 'Ekranda gösterilen CNAME kaydını domain sağlayıcınızın DNS ayarlarına ekleyin. Genellikle "isletmem.com" için bir CNAME kaydı oluşturmanız gerekir.' },
          { baslik: 'Doğrulama bekleyin', aciklama: 'DNS değişiklikleri 5 dakika ile 48 saat arasında yayılabilir. Genellikle 15-30 dakika içinde aktif olur.' },
          { baslik: 'SSL sertifikası otomatik aktif olur', aciklama: 'Domain doğrulandıktan sonra KPNK otomatik olarak ücretsiz SSL sertifikası oluşturur. Siteniz https:// ile güvenli şekilde açılacaktır.' },
        ]}
      />

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">DNS Kaydı Nasıl Eklenir?</h2>
      <p className="text-muted-foreground mb-4">
        Domain sağlayıcınıza göre DNS ayarlarına erişim farklılık gösterebilir.
        En yaygın sağlayıcılar için kısa yollar:
      </p>
      <div className="space-y-3 mb-6">
        {[
          { saglayici: 'Natro', yol: 'Müşteri Paneli > Domain Yönetimi > DNS Ayarları' },
          { saglayici: 'İsimTescil', yol: 'Domain Yönetim > DNS Yönetimi > CNAME Ekle' },
          { saglayici: 'Turhost', yol: 'cPanel > Zone Editor > CNAME Record' },
          { saglayici: 'GoDaddy', yol: 'My Products > DNS > Add Record > CNAME' },
          { saglayici: 'Cloudflare', yol: 'Dashboard > DNS > Add Record > CNAME' },
        ].map((s) => (
          <div key={s.saglayici} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="font-semibold text-foreground text-sm min-w-[100px]">{s.saglayici}</span>
            <span className="text-muted-foreground text-sm">{s.yol}</span>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="warning" baslik="Önemli">
        Mevcut web siteniz varsa ve o domain&apos;i KPNK&apos;ya yönlendirirseniz, eski siteniz artık görüntülenemez.
        Emin olduğunuzda DNS kaydını değiştirin.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Sık Karşılaşılan Sorunlar</h2>
      <div className="space-y-4 mb-6">
        <div>
          <p className="font-semibold text-foreground text-sm">Domain bağlandı ama site açılmıyor</p>
          <p className="text-muted-foreground text-sm">DNS değişiklikleri henüz yayılmamış olabilir. 48 saate kadar bekleyin. Daha hızlı kontrol için dnschecker.org sitesini kullanabilirsiniz.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">SSL sertifikası aktif olmuyor</p>
          <p className="text-muted-foreground text-sm">SSL, DNS doğrulamasından sonra otomatik oluşturulur. DNS doğrulanmadan SSL oluşturulamaz. DNS&apos;in doğru yapılandırıldığından emin olun.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">www ile açılıyor ama www&apos;suz açılmıyor</p>
          <p className="text-muted-foreground text-sm">Hem www hem de @ (root) için CNAME kaydı eklediğinizden emin olun. Bazı sağlayıcılarda root domain için A kaydı gerekebilir.</p>
        </div>
      </div>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Siteyi Yayınlama', href: '/destek/editor/yayinlama' },
          { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
          { baslik: 'İlk Kurulum', href: '/destek/baslangic/ilk-kurulum' },
          { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
        ]}
      />

      <SikKarsilasilanSorunlar sorunIdleri={['dns-yayilmadi', 'ssl-aktif-degil', 'www-yonlendirme', 'domain-baglama-hatasi']} />
      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK Sitenize Özel Domain Bağlama',
            description: 'Kendi alan adınızı KPNK sitenize bağlayın.',
            step: [
              { '@type': 'HowToStep', name: 'Domain sayfasına gidin', text: 'Dashboard > Sitem > Domain.' },
              { '@type': 'HowToStep', name: 'Alan adınızı girin', text: 'Domain adresinizi girin ve Bağla butonuna tıklayın.' },
              { '@type': 'HowToStep', name: 'DNS kaydı ekleyin', text: 'CNAME kaydını domain sağlayıcınıza ekleyin.' },
              { '@type': 'HowToStep', name: 'Doğrulama bekleyin', text: 'DNS yayılımı 15-30 dakika sürer.' },
              { '@type': 'HowToStep', name: 'SSL aktif olur', text: 'Otomatik SSL sertifikası oluşturulur.' },
            ],
          }),
        }}
      />
    </article>
  )
}
