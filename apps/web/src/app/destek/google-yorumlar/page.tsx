import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'Google Yorum Yönetimi',
  description: 'Google My Business yorumlarınızı KPNK ile yönetin. Otomatik AI yanıtları ve yorum takibi.',
  alternates: { canonical: 'https://destek.kepenk.ai/google-yorumlar' },
}

const REHBERLER = [
  { baslik: 'Google Yorum Kurulumu', ozet: 'Google My Business hesabınızı KPNK ile bağlayın ve yorumlarınızı tek panelden yönetin.', href: '/destek/google-yorumlar/kurulum' },
  { baslik: 'Otomatik Yorum Yanıtlama', ozet: 'AI ile Google yorumlarına profesyonel ve kişiselleştirilmiş yanıtlar verin.', href: '/destek/google-yorumlar/otomatik-yanitlar' },
]

export default function GoogleYorumlarHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Google Yorum Yönetimi</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Google yorumları müşterilerin işletmenizi değerlendirmesinde en etkili faktördür. KPNK ile yorumlarınızı takip edin ve AI destekli yanıtlar verin.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REHBERLER.map((r) => (
          <MakaleCard key={r.href} baslik={r.baslik} ozet={r.ozet} href={r.href} ikon="⭐" kategoriRenk="bg-yellow-100 text-yellow-700" />
        ))}
      </div>
    </div>
  )
}
