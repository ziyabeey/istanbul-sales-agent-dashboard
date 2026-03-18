import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Fatura İndirme',
  description: 'KPNK faturalarınızı görüntüleyin ve PDF olarak indirin. Geçmiş ödeme geçmişi ve fatura detayları.',
  alternates: { canonical: 'https://destek.kepenk.ai/odeme-fatura/fatura-indirme' },
  openGraph: { title: 'Fatura İndirme — KPNK', url: 'https://destek.kepenk.ai/odeme-fatura/fatura-indirme', type: 'article' },
}

export default function FaturaIndirme() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Fatura İndirme</h1>
      <p className="text-lg text-muted-foreground mb-8">Geçmiş faturalarınıza erişin ve PDF olarak indirin.</p>

      <AdimAdim adimlar={[
        { baslik: 'Dashboard > Profil > Aboneliğim', aciklama: 'Sol menüden Profil sekmesine, ardından Aboneliğim bölümüne gidin.' },
        { baslik: 'Ödeme Geçmişi bölümünü bulun', aciklama: 'Sayfanın alt kısmında ödeme geçmişi tablosunu göreceksiniz. Tarih, tutar ve durum bilgileri listelenir.' },
        { baslik: 'PDF İndir butonuna tıklayın', aciklama: 'İlgili ödemenin yanındaki "PDF İndir" butonuna tıklayarak faturanızı indirin.' },
      ]} />

      <BilgiKutusu tip="info" baslik="E-Fatura">
        KPNK faturalar e-arşiv fatura formatındadır ve muhasebe kayıtlarınızda kullanılabilir. Fatura üzerinde KDV dahil tutar, iyzico işlem numarası ve paket bilgisi yer alır.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
        { baslik: 'Paket Değiştirme', href: '/destek/odeme-fatura/paket-degistirme' },
      ]} />
      <SayfaDegerlendirme />
    </article>
  )
}
