import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'
import SikKarsilasilanSorunlar from '@/components/destek/SikKarsilasilanSorunlar'

export const metadata: Metadata = {
  title: 'WhatsApp AI Kurulumu',
  description: 'WhatsApp Business hesabınızı KPNK AI asistanı ile 10 dakikada aktifleştirin. Adım adım kurulum rehberi.',
  alternates: { canonical: 'https://destek.kepenk.ai/whatsapp/kurulum' },
  openGraph: { title: 'WhatsApp AI Kurulumu — KPNK', description: 'WhatsApp AI asistanınızı 10 dakikada aktifleştirin.', url: 'https://destek.kepenk.ai/whatsapp/kurulum', type: 'article' },
}

export default function WhatsAppKurulum() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">WhatsApp AI Kurulumu</h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK AI asistanı, WhatsApp üzerinden gelen müşteri mesajlarını anlayarak sektörünüze özel yanıtlar verir.
        Randevu ayarlar, fiyat bilgisi paylaşır ve müşteri sorularını cevaplayarak size zaman kazandırır.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Kurulum Adımları</h2>
      <AdimAdim adimlar={[
        { baslik: 'Büyüme veya üzeri paket aktif olmalı', aciklama: 'WhatsApp AI asistanı Büyüme (₺2.999/ay), Premium (₺4.999/ay) ve Premium Plus (₺7.499/ay) paketlerinde aktiftir. Paketinizi Dashboard > Profil > Aboneliğim sayfasından kontrol edin.' },
        { baslik: 'WhatsApp numaranızın bağlı olduğunu doğrulayın', aciklama: 'Kayıt sırasında girdiğiniz WhatsApp Business numarası otomatik bağlanır. Dashboard > Ayarlar > WhatsApp bölümünden durumu kontrol edebilirsiniz.' },
        { baslik: 'AI asistan ayarlarını yapılandırın', aciklama: 'Dashboard > Ayarlar > AI Asistan bölümünden asistanınızın tonunu, çalışma saatlerini ve yanıt şablonlarını özelleştirin.' },
        { baslik: 'Test mesajı gönderin', aciklama: 'Kendi telefonunuzdan işletme WhatsApp numaranıza bir mesaj gönderin. AI asistanın doğru yanıt verdiğini kontrol edin.' },
        { baslik: 'Canlıya alın', aciklama: 'Her şey doğru çalışıyorsa asistanı "Aktif" durumuna getirin. Artık tüm gelen mesajlara otomatik yanıt verilecektir.' },
      ]} />

      <BilgiKutusu tip="info" baslik="AI Nasıl Çalışır?">
        KPNK AI asistanı, sektörünüze özel eğitilmiştir. Berber için saç modeli sorularını, restoran için menü sorularını, elektrikçi için acil arıza taleplerini anlar ve uygun yanıtlar verir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">AI Asistanın Yapabilecekleri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { baslik: 'Randevu Alma', aciklama: 'Müşteriden tarih/saat alır, takvime kaydeder' },
          { baslik: 'Fiyat Bilgisi', aciklama: 'Hizmet fiyatlarınızı paylaşır' },
          { baslik: 'Çalışma Saatleri', aciklama: 'Açık/kapalı durumunu bildirir' },
          { baslik: 'Konum Paylaşımı', aciklama: 'Google Haritalar linki gönderir' },
          { baslik: 'Soru Cevaplama', aciklama: 'Sektöre özel soruları yanıtlar' },
          { baslik: 'İnsan Yönlendirme', aciklama: 'Cevaplayamadığı soruları size aktarır' },
        ].map((y) => (
          <div key={y.baslik} className="p-4 bg-gray-50 rounded-xl">
            <p className="font-semibold text-foreground text-sm">{y.baslik}</p>
            <p className="text-muted-foreground text-xs mt-1">{y.aciklama}</p>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="warning" baslik="Kredi Kullanımı">
        Her AI yanıtı paketinize dahil işlem kredisinden düşer. Büyüme paketinde aylık 750, Premium'da 2.000, Premium Plus'ta 5.000 işlem kredisi bulunur.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Otomatik Yanıt Ayarları', href: '/destek/whatsapp/otomatik-yanitlar' },
        { baslik: 'WhatsApp SSS', href: '/destek/whatsapp/sss' },
        { baslik: 'WhatsApp Bağlantısı', href: '/destek/baslangic/whatsapp-baglantisi' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
      ]} />
      <SikKarsilasilanSorunlar sorunIdleri={['hosgeldin-mesaji-yok', 'ai-yanit-vermiyor', 'kredi-bitti']} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'KPNK WhatsApp AI Asistanı Kurulumu',
        description: 'WhatsApp Business AI asistanınızı 10 dakikada aktifleştirin.',
        step: [
          { '@type': 'HowToStep', name: 'Paket kontrolü', text: 'Büyüme veya üzeri paket aktif olmalı.' },
          { '@type': 'HowToStep', name: 'Numara doğrulama', text: 'WhatsApp numaranızın bağlı olduğunu doğrulayın.' },
          { '@type': 'HowToStep', name: 'AI ayarları', text: 'Asistan ayarlarını yapılandırın.' },
          { '@type': 'HowToStep', name: 'Test mesajı', text: 'Test mesajı gönderin.' },
          { '@type': 'HowToStep', name: 'Canlıya alın', text: 'Asistanı aktif duruma getirin.' },
        ],
      }) }} />
    </article>
  )
}
