import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Paket Yükseltme/Düşürme',
  description: 'KPNK paketinizi yükseltin veya düşürün. Paket değişikliği adımları, fark ücreti ve geçiş kuralları.',
  alternates: { canonical: 'https://destek.kepenk.ai/odeme-fatura/paket-degistirme' },
  openGraph: { title: 'Paket Değiştirme — KPNK', url: 'https://destek.kepenk.ai/odeme-fatura/paket-degistirme', type: 'article' },
}

export default function PaketDegistirme() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Paket Yükseltme/Düşürme</h1>
      <p className="text-lg text-muted-foreground mb-8">Mevcut paketinizi istediğiniz zaman değiştirebilirsiniz. İşte adım adım rehber.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Paket Yükseltme</h2>
      <AdimAdim adimlar={[
        { baslik: 'Dashboard > Profil > Aboneliğim', aciklama: 'Mevcut paketinizi ve kalan sürenizi göreceksiniz.' },
        { baslik: '"Paketi Yükselt" butonuna tıklayın', aciklama: 'Mevcut paketinizden daha üst paketler listelenecektir.' },
        { baslik: 'Yeni paketi seçin', aciklama: 'İstediğiniz paketi seçin. Fark ücreti otomatik hesaplanır.' },
        { baslik: 'Ödeme yapın', aciklama: 'Kalan dönem için fark ücreti kartınızdan çekilir. Yeni özellikler anında aktif olur.' },
      ]} />

      <BilgiKutusu tip="tip" baslik="Anında Aktivasyon">
        Paket yükseltme işlemi anında gerçekleşir. Yeni modüller, artırılmış AI kredi limiti ve ek özellikler hemen kullanılabilir hale gelir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Paket Düşürme</h2>
      <AdimAdim adimlar={[
        { baslik: 'Dashboard > Profil > Aboneliğim', aciklama: 'Mevcut paketinizi görüntüleyin.' },
        { baslik: '"Paketi Değiştir" butonuna tıklayın', aciklama: 'Alt paket seçenekleri listelenecektir.' },
        { baslik: 'Yeni paketi seçin ve onaylayın', aciklama: 'Değişiklik mevcut dönem sonunda geçerli olur. Kalan sürede mevcut özellikleriniz korunur.' },
      ]} />

      <BilgiKutusu tip="warning" baslik="Önemli">
        Paket düşürdüğünüzde bazı modüller ve özellikler devre dışı kalabilir. Örneğin Büyüme&apos;den Standart&apos;a geçerseniz WhatsApp otomasyonu kapanır. Mevcut verileriniz silinmez, sadece erişim kısıtlanır.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
        { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
        { baslik: 'Fatura İndirme', href: '/destek/odeme-fatura/fatura-indirme' },
      ]} />
      <SayfaDegerlendirme />
    </article>
  )
}
