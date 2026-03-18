'use client'
import { useState } from 'react'

const SSS = [
  {
    soru: 'Sitem ne zaman hazır olur?',
    cevap: 'Ödemeniz onaylandıktan sonra yapay zeka sitenizi 1-3 dakika içinde hazırlar. Hazır olunca WhatsApp\'ınıza link gelir.',
  },
  {
    soru: 'Sitenin adresini değiştirebilir miyim?',
    cevap: 'Temel, Standart ve Büyüme paketlerinde adresiniz adi.kepenk.ai formatında olur. Premium ve Premium+ paketlerde kendi .com adresinizi bağlayabilirsiniz.',
  },
  {
    soru: 'İçerikler otomatik mi üretiliyor?',
    cevap: 'Evet. Her pazartesi sabahı yapay zeka o hafta için tüm içeriklerinizi üretir. Siz dashboard\'dan kopyalayıp paylaşırsınız. Büyüme paketinden itibaren Google My Business\'a otomatik gönderilir.',
  },
  {
    soru: 'Telefon numaram değişirse ne olur?',
    cevap: 'Profil sayfanızdan telefon numaranızı güncelleyin. Site 30 dakika içinde otomatik güncellenir.',
  },
  {
    soru: 'Paket değiştirebilir miyim?',
    cevap: 'Evet, dashboard\'daki Abonelik sayfasından istediğiniz zaman üst pakete geçebilirsiniz. Alt pakete geçiş için WhatsApp\'tan bize ulaşın.',
  },
  {
    soru: 'İptal etmek istersem param iade edilir mi?',
    cevap: 'İptal & İade politikamıza göre, ilk 3 gün içinde talep halinde tam iade yapılır. Detaylar için iade-kosullari sayfamıza bakın.',
  },
  {
    soru: 'Faturamı nereden görebilirim?',
    cevap: 'Fatura için destek@kepenk.ai adresine mail atabilirsiniz.',
  },
]

export default function SSSAccordion() {
  const [acik, setAcik] = useState<number | null>(null)

  return (
    <div className="space-y-2" role="region" aria-label="Sık Sorulan Sorular">
      {SSS.map((item, i) => (
        <div key={i} className="bg-card rounded-2xl overflow-hidden">
          <button
            onClick={() => setAcik(acik === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            aria-expanded={acik === i}
            aria-controls={`sss-panel-${i}`}
            id={`sss-header-${i}`}
          >
            <p className="text-foreground font-syne font-semibold text-sm pr-4">
              {item.soru}
            </p>
            <span
              className={`text-rust text-xl transition-transform flex-shrink-0 ${acik === i ? 'rotate-45' : ''}`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {acik === i && (
            <div className="px-5 pb-4" id={`sss-panel-${i}`} role="region" aria-labelledby={`sss-header-${i}`}>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.cevap}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
