import type { Metadata } from 'next'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'WhatsApp AI SSS',
  description: 'KPNK WhatsApp AI asistanı hakkında sık sorulan sorular: kurulum, kredi, mesaj limiti, güvenlik ve daha fazlası.',
  alternates: { canonical: 'https://destek.kepenk.ai/whatsapp/sss' },
  openGraph: { title: 'WhatsApp AI SSS — KPNK', description: 'WhatsApp AI asistanı hakkında sık sorulan sorular.', url: 'https://destek.kepenk.ai/whatsapp/sss', type: 'article' },
}

const SSS_LISTESI = [
  { soru: 'AI asistan kişisel mesajlarımı okuyabilir mi?', cevap: 'Hayır. KPNK AI asistanı sadece işletme WhatsApp Business numaranıza gelen mesajları işler. Kişisel WhatsApp hesabınıza erişimi yoktur.' },
  { soru: 'AI yanlış bilgi verirse ne olur?', cevap: 'AI asistan sektörünüze özel eğitilmiştir ancak hata yapabilir. Dashboard > Konuşmalar bölümünden tüm diyalogları inceleyebilir, yanlış yanıtları düzeltebilirsiniz. AI, düzeltmelerden öğrenir.' },
  { soru: 'İşlem kredim biterse ne olur?', cevap: 'Aylık işlem krediniz bittiğinde AI asistan devre dışı kalır ve müşterilere "Şu an meşgulüz, lütfen daha sonra tekrar deneyin" mesajı gösterilir. Ek kredi satın alabilir veya paketinizi yükseltebilirsiniz.' },
  { soru: 'Mesai dışında AI çalışır mı?', cevap: 'Evet, 7/24 çalışabilir. Ayarlardan mesai dışı modu aktifleştirirseniz farklı bir karşılama mesajı gösterilir. İsterseniz mesai dışında tamamen kapatabilirsiniz.' },
  { soru: 'Birden fazla numara bağlayabilir miyim?', cevap: 'Standart planlarda 1 numara bağlanır. Premium Plus paketinde birden fazla numara desteği mevcuttur.' },
  { soru: 'Müşteri fotoğraf/ses mesajı gönderirse?', cevap: 'AI asistan metin mesajlarını anlar. Fotoğraf ve ses mesajları alındığında "Mesajınızı aldık, en kısa sürede inceleyeceğiz" yanıtı verilir ve size bildirim gönderilir.' },
  { soru: 'Grup mesajlarında çalışır mı?', cevap: 'Hayır, AI asistan sadece birebir (DM) mesajlarda aktiftir. Grup mesajları işlenmez.' },
  { soru: 'AI asistanı geçici olarak kapatabilir miyim?', cevap: 'Evet, Dashboard > Ayarlar > AI Asistan bölümünden tek tıkla aktif/pasif yapabilirsiniz. Pasif durumda gelen mesajlara AI yanıt vermez.' },
]

export default function WhatsAppSSS() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">WhatsApp AI — Sık Sorulan Sorular</h1>
      <p className="text-lg text-muted-foreground mb-8">
        WhatsApp AI asistanı hakkında en çok merak edilen sorular ve detaylı cevapları.
      </p>

      <div className="space-y-6 mb-8">
        {SSS_LISTESI.map((s, i) => (
          <div key={i} className="p-5 bg-white border border-gray-200 rounded-2xl">
            <h3 className="text-foreground font-semibold mb-2">{s.soru}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.cevap}</p>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="info" baslik="Başka Sorunuz mu Var?">
        Burada cevabını bulamadığınız sorular için WhatsApp destek hattımıza yazabilirsiniz: 0850 XXX XX XX
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'WhatsApp AI Kurulumu', href: '/destek/whatsapp/kurulum' },
        { baslik: 'Otomatik Yanıt Ayarları', href: '/destek/whatsapp/otomatik-yanitlar' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: SSS_LISTESI.map((s) => ({
          '@type': 'Question', name: s.soru,
          acceptedAnswer: { '@type': 'Answer', text: s.cevap },
        })),
      }) }} />
    </article>
  )
}
