import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'WhatsApp AI Asistan Rehberi',
  description: 'KPNK WhatsApp AI asistanı kurulumu, otomatik yanıt ayarları ve sık sorulan sorular.',
  alternates: { canonical: 'https://destek.kepenk.ai/whatsapp' },
}

const REHBERLER = [
  { baslik: 'WhatsApp AI Kurulumu', ozet: 'WhatsApp Business hesabınızı AI asistanla 10 dakikada aktifleştirin.', href: '/destek/whatsapp/kurulum' },
  { baslik: 'Otomatik Yanıt Ayarları', ozet: 'AI asistanın müşteri mesajlarına nasıl yanıt vereceğini özelleştirin.', href: '/destek/whatsapp/otomatik-yanitlar' },
  { baslik: 'Sık Sorulan Sorular', ozet: 'WhatsApp AI asistan hakkında merak edilenler ve cevapları.', href: '/destek/whatsapp/sss' },
]

export default function WhatsAppHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">WhatsApp AI Asistan Rehberi</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        KPNK WhatsApp AI asistanı, müşterilerinize 7/24 otomatik yanıt verir. Randevu alır, fiyat bilgisi verir, soru cevaplar — siz meşgulken bile.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REHBERLER.map((r) => (
          <MakaleCard key={r.href} baslik={r.baslik} ozet={r.ozet} href={r.href} ikon="💬" kategoriRenk="bg-green-100 text-green-700" />
        ))}
      </div>
    </div>
  )
}
