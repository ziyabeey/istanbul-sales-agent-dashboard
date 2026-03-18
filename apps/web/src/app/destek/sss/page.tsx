import type { Metadata } from 'next'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular',
  description: 'KPNK platformu hakkında sık sorulan sorular ve cevapları. Genel, ödeme, teknik ve AI asistan soruları.',
  alternates: { canonical: 'https://destek.kepenk.ai/sss' },
}

const SSS_GRUPLARI = [
  {
    baslik: 'Genel',
    sorular: [
      { s: 'KPNK nedir?', c: 'KPNK (Kepenk), küçük işletmelerin dijitalleşmesini sağlayan AI destekli bir SaaS platformudur. Web sitesi oluşturma, WhatsApp AI asistanı, Google yorum yönetimi ve daha fazlasını tek çatı altında sunar.' },
      { s: 'Hangi sektörlere hizmet veriyorsunuz?', c: '28 farklı sektöre hizmet veriyoruz: berber, restoran, elektrikçi, kuaför, avukat, diş hekimi ve daha fazlası. Her sektör için özelleştirilmiş AI asistan ve site şablonları mevcuttur.' },
      { s: 'Ücretsiz deneme var mı?', c: 'Temel paket ile başlayarak platformu tanıyabilirsiniz. İstediğiniz zaman üst pakete geçebilirsiniz.' },
      { s: 'Sözleşme süresi ne kadar?', c: 'Aylık ödeme seçeneğinde sözleşme yoktur, istediğiniz zaman iptal edebilirsiniz. Yıllık ödemede 12 aylık taahhüt geçerlidir.' },
    ],
  },
  {
    baslik: 'Teknik',
    sorular: [
      { s: 'Sitem ne kadar hızlı yüklenir?', c: 'KPNK siteleri global CDN ağı üzerinden sunulur. Ortalama yüklenme süresi 1-2 saniyedir. Görseller otomatik optimize edilir.' },
      { s: 'Kendi domainimi kullanabilir miyim?', c: 'Evet. Premium ve Premium Plus paketlerinde ücretsiz domain hediye edilir. Diğer paketlerde kendi domaininizi bağlayabilirsiniz.' },
      { s: 'Sitenin koduna erişebilir miyim?', c: 'KPNK siteleri yönetilen bir hizmet olarak sunulur. Doğrudan kod erişimi yoktur ancak editör ile tüm içerik ve tasarımı değiştirebilirsiniz.' },
      { s: 'Verilerim güvende mi?', c: 'Evet. Tüm veriler Google Cloud altyapısında şifreli olarak saklanır. KVKK uyumlu veri işleme politikamız mevcuttur.' },
    ],
  },
  {
    baslik: 'Ödeme',
    sorular: [
      { s: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', c: 'Kredi kartı (Visa, Mastercard, Troy), banka kartı ve sanal kart ile ödeme yapabilirsiniz. Tüm ödemeler iyzico 3D Secure ile güvenlidir.' },
      { s: 'Fatura alabilir miyim?', c: 'Evet. Her ödeme sonrası otomatik e-arşiv fatura oluşturulur. Dashboard > Profil > Aboneliğim > Ödeme Geçmişi bölümünden indirebilirsiniz.' },
      { s: 'İade politikanız nedir?', c: 'İlk 14 gün içinde memnun kalmazsanız tam iade yapılır. 14 günden sonra kalan süre için oransal iade hesaplanır.' },
    ],
  },
  {
    baslik: 'AI Asistan',
    sorular: [
      { s: 'AI asistan hangi dilleri destekliyor?', c: 'Şu anda sadece Türkçe desteklenmektedir. İngilizce desteği yakında eklenecektir.' },
      { s: 'AI asistan yanlış bilgi verirse?', c: 'AI sektörünüze özel eğitilmiştir ancak hata yapabilir. Konuşmalar bölümünden tüm diyalogları inceleyebilir ve düzeltebilirsiniz.' },
      { s: 'İşlem kredisi nedir?', c: 'Her AI yanıtı (WhatsApp mesajı, yorum yanıtı, içerik üretimi) bir işlem kredisi harcar. Paketinize dahil aylık kredi limitiniz vardır.' },
    ],
  },
]

export default function SSSSayfasi() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Sık Sorulan Sorular</h1>
      <p className="text-lg text-muted-foreground mb-8">KPNK hakkında merak edilen her şey, tek sayfada.</p>

      {SSS_GRUPLARI.map((grup) => (
        <section key={grup.baslik} className="mb-10">
          <h2 className="text-xl font-bold font-syne text-foreground mb-4">{grup.baslik}</h2>
          <div className="space-y-3">
            {grup.sorular.map((soru) => (
              <div key={soru.s} className="p-5 bg-white border border-gray-200 rounded-2xl">
                <h3 className="text-foreground font-semibold mb-2">{soru.s}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{soru.c}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: SSS_GRUPLARI.flatMap((g) => g.sorular.map((s) => ({
          '@type': 'Question', name: s.s,
          acceptedAnswer: { '@type': 'Answer', text: s.c },
        }))),
      }) }} />
    </article>
  )
}
