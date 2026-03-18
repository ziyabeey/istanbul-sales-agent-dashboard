import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Mail, TicketCheck } from 'lucide-react'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Bize Ulaşın',
  description: 'KPNK destek ekibiyle iletişime geçin. WhatsApp, e-posta ve telefon ile destek alın.',
  alternates: { canonical: 'https://destek.kepenk.ai/iletisim' },
}

export default function Iletisim() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Bize Ulaşın</h1>
      <p className="text-lg text-muted-foreground mb-8">Aradığınız cevabı bulamadınız mı? Destek ekibimiz size yardımcı olmak için hazır.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-3">
            <MessageCircle className="w-6 h-6 text-green-700" />
          </div>
          <h3 className="text-foreground font-bold mb-1">WhatsApp Destek</h3>
          <p className="text-muted-foreground text-sm mb-3">En hızlı yanıt kanalımız</p>
          <p className="text-green-700 font-semibold">0850 XXX XX XX</p>
          <p className="text-xs text-muted-foreground mt-1">Hafta içi 09:00 - 18:00</p>
        </div>
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-3">
            <Mail className="w-6 h-6 text-blue-700" />
          </div>
          <h3 className="text-foreground font-bold mb-1">E-posta Destek</h3>
          <p className="text-muted-foreground text-sm mb-3">Detaylı sorularınız için</p>
          <p className="text-blue-700 font-semibold">destek@kepenk.ai</p>
          <p className="text-xs text-muted-foreground mt-1">24 saat içinde yanıt</p>
        </div>
        <Link
          href="/destek/talep"
          className="p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center hover:border-teal-300 hover:shadow-md transition-all group"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 mb-3">
            <TicketCheck className="w-6 h-6 text-teal-700" />
          </div>
          <h3 className="text-foreground font-bold mb-1 group-hover:text-primary transition-colors">Destek Talebi Oluştur</h3>
          <p className="text-muted-foreground text-sm mb-3">Sorunuzu takip edilebilir şekilde bildirin</p>
          <p className="text-teal-700 font-semibold">Talep Aç →</p>
          <p className="text-xs text-muted-foreground mt-1">Referans numarasıyla takip</p>
        </Link>
      </div>

      <BilgiKutusu tip="tip" baslik="Hızlı Çözüm">
        Destek talebi göndermeden önce{' '}
        <Link href="/destek/sorun-giderme" className="text-primary underline">Sorun Giderme</Link>
        {' '}sayfasını kontrol edin — birçok sorunun çözümü zaten hazırlanmıştır.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Destek Saatleri</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            {[
              { gun: 'Pazartesi - Cuma', saat: '09:00 - 18:00' },
              { gun: 'Cumartesi', saat: '10:00 - 14:00' },
              { gun: 'Pazar', saat: 'Kapalı' },
            ].map((s) => (
              <tr key={s.gun} className="border-b border-gray-100 last:border-b-0">
                <td className="px-4 py-3 font-medium text-foreground">{s.gun}</td>
                <td className="px-4 py-3 text-muted-foreground text-right">{s.saat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SayfaDegerlendirme />
    </article>
  )
}
