import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Otomatik Yanıt Ayarları',
  description: 'KPNK WhatsApp AI asistanının otomatik yanıt şablonlarını, tonunu ve davranışını özelleştirin.',
  alternates: { canonical: 'https://destek.kepenk.ai/whatsapp/otomatik-yanitlar' },
  openGraph: { title: 'Otomatik Yanıt Ayarları — KPNK WhatsApp', description: 'AI asistanın yanıt davranışını özelleştirin.', url: 'https://destek.kepenk.ai/whatsapp/otomatik-yanitlar', type: 'article' },
}

export default function OtomatikYanitlar() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Otomatik Yanıt Ayarları</h1>
      <p className="text-lg text-muted-foreground mb-8">
        AI asistanınızın müşterilerinize nasıl yanıt vereceğini tam kontrol edin. Üslup, çalışma saatleri, fiyat paylaşım politikası ve daha fazlasını özelleştirin.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Yanıt Ayarlarına Erişim</h2>
      <AdimAdim adimlar={[
        { baslik: 'Dashboard > Ayarlar > AI Asistan', aciklama: 'Sol menüden Ayarlar sekmesine, ardından AI Asistan bölümüne gidin.' },
        { baslik: 'Genel ayarları yapılandırın', aciklama: 'Asistan adı, üslup (resmi/samimi), dil ve çalışma saatlerini belirleyin.' },
        { baslik: 'Yanıt şablonlarını düzenleyin', aciklama: 'Karşılama mesajı, mesai dışı mesajı ve özel yanıt şablonlarını özelleştirin.' },
      ]} />

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Özelleştirilebilir Ayarlar</h2>
      <div className="space-y-4 mb-6">
        <div className="p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-foreground mb-2">Üslup / Ton</h3>
          <p className="text-muted-foreground text-sm">AI asistanınızın konuşma tarzını seçin: Resmi (&quot;Sayın müşterimiz, randevunuz oluşturulmuştur&quot;), Samimi (&quot;Merhaba! Randevunuz hazır 🎉&quot;) veya Profesyonel (sektöre özel teknik dil).</p>
        </div>
        <div className="p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-foreground mb-2">Çalışma Saatleri</h3>
          <p className="text-muted-foreground text-sm">AI asistanın hangi saatlerde aktif olacağını belirleyin. Mesai dışında farklı bir mesaj gösterilir (ör. &quot;Şu an kapalıyız, mesai saatlerimizde size dönüş yapacağız&quot;).</p>
        </div>
        <div className="p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-foreground mb-2">Fiyat Politikası</h3>
          <p className="text-muted-foreground text-sm">AI&apos;ın fiyat bilgisi paylaşıp paylaşmayacağını seçin. &quot;Fiyat ver&quot;, &quot;Sadece aralık ver&quot; veya &quot;Fiyat için arayın desin&quot; seçenekleri mevcuttur.</p>
        </div>
        <div className="p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-foreground mb-2">İnsan Devir Kuralları</h3>
          <p className="text-muted-foreground text-sm">AI&apos;ın hangi durumlarda size (insan operatöre) yönlendireceğini belirleyin. Şikayet, karmaşık sorular veya belirli anahtar kelimeler için otomatik devir ayarlayabilirsiniz.</p>
        </div>
      </div>

      <BilgiKutusu tip="tip" baslik="En İyi Uygulama">
        İlk hafta AI&apos;ın yanıtlarını yakından takip edin. Yanlış veya eksik yanıtları Dashboard &gt; Konuşmalar bölümünden inceleyerek AI&apos;ın davranışını iyileştirin.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'WhatsApp AI Kurulumu', href: '/destek/whatsapp/kurulum' },
        { baslik: 'WhatsApp SSS', href: '/destek/whatsapp/sss' },
        { baslik: 'Sektör Rehberleri', href: '/destek/sektorler' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'KPNK WhatsApp Otomatik Yanıt Ayarları',
        description: 'AI asistanın yanıt davranışını özelleştirin.',
        step: [
          { '@type': 'HowToStep', name: 'AI Asistan ayarlarına gidin', text: 'Dashboard > Ayarlar > AI Asistan.' },
          { '@type': 'HowToStep', name: 'Genel ayarları yapın', text: 'Üslup, dil ve çalışma saatleri belirleyin.' },
          { '@type': 'HowToStep', name: 'Şablonları düzenleyin', text: 'Karşılama ve mesai dışı mesajlarını özelleştirin.' },
        ],
      }) }} />
    </article>
  )
}
