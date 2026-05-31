import React from 'react'
import PublicPageShell from '@/components/layout/PublicPageShell'

export default function KVKKPage() {
  return (
    <PublicPageShell>
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold font-syne text-foreground mb-2">Kişisel Verilerin Korunması (KVKK) Aydınlatma Metni</h1>
        <p className="text-muted-foreground text-sm mb-10">6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca</p>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">1. Veri Sorumlusu</h2>
          <p>Kişisel verileriniz, kepenk.ai platformu üzerinden hizmet veren ilgili mağaza sahibi (Satıcı) tarafından veri sorumlusu sıfatıyla, aşağıda açıklanan amaçlar kapsamında işlenmektedir.</p>

          <h2 className="text-lg font-bold text-foreground">2. İşlenen Kişisel Veriler</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, teslimat adresi</li>
            <li><strong>İşlem Güvenliği:</strong> IP adresi, tarayıcı bilgileri, çerez verileri</li>
            <li><strong>Finansal Bilgiler:</strong> Sipariş tutarı, fatura bilgileri (kart bilgileri İyzico tarafından işlenir, tarafımızca saklanmaz)</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sipariş ve teslimat süreçlerinin yönetimi</li>
            <li>Müşteri hizmetleri desteği sağlanması</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi (fatura, vergi)</li>
            <li>İstatistiksel analizler ve hizmet iyileştirme</li>
            <li>İzin vermeniz halinde, pazarlama ve kampanya bildirimleri</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">4. Kişisel Verilerin Aktarımı</h2>
          <p>Kişisel verileriniz, yalnızca aşağıdaki durumlarda üçüncü taraflarla paylaşılır:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Kargo şirketleri:</strong> Teslimat için gerekli ad, adres ve telefon bilgileri</li>
            <li><strong>Ödeme altyapısı (İyzico):</strong> Ödeme işlemi için gerekli bilgiler</li>
            <li><strong>Yasal zorunluluklar:</strong> Yetkili kamu kurum ve kuruluşlarına bilgi verilmesi</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">5. Veri Saklama Süresi</h2>
          <p>Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca saklanır. Yasal saklama yükümlülükleri (Vergi Usul Kanunu: 5 yıl, Türk Ticaret Kanunu: 10 yıl) saklıdır.</p>

          <h2 className="text-lg font-bold text-foreground">6. Haklarınız (KVKK Madde 11)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>KVKK&apos;nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">7. Çerez Politikası</h2>
          <p>Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Zorunlu çerezler (oturum, sepet), analitik çerezler (Google Analytics) ve pazarlama çerezleri (Meta Pixel) kullanılır. Tarayıcı ayarlarından çerez tercihlerinizi yönetebilirsiniz.</p>

          <h2 className="text-lg font-bold text-foreground">8. İletişim</h2>
          <p>KVKK kapsamındaki taleplerinizi, mağaza iletişim bilgileri üzerinden veya <a href="mailto:destek@kepenk.ai" className="text-primary hover:underline">destek@kepenk.ai</a> adresine yazılı olarak iletebilirsiniz.</p>
        </div>
      </section>
    </PublicPageShell>
  )
}
