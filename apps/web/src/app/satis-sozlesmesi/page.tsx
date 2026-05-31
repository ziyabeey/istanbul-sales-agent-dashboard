import React from 'react'
import PublicPageShell from '@/components/layout/PublicPageShell'

export default function MesafeliSatisSozlesmesi() {
  return (
    <PublicPageShell>
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold font-syne text-foreground mb-2">Mesafeli Satış Sözleşmesi</h1>
        <p className="text-muted-foreground text-sm mb-10">Son güncelleme: 11 Mart 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">Madde 1 — Taraflar</h2>
          <p><strong>SATICI:</strong> İşbu sözleşmede &quot;Satıcı&quot; olarak anılacak olan, kepenk.ai platformu üzerinden e-ticaret hizmeti veren mağaza sahibidir.</p>
          <p><strong>ALICI:</strong> İşbu sözleşmede &quot;Alıcı&quot; olarak anılacak olan, kepenk.ai platformu üzerinden sipariş veren kişidir.</p>

          <h2 className="text-lg font-bold text-foreground">Madde 2 — Sözleşmenin Konusu</h2>
          <p>İşbu sözleşmenin konusu, Alıcı&apos;nın Satıcı&apos;ya ait internet sitesinden elektronik ortamda siparişini verdiği ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>

          <h2 className="text-lg font-bold text-foreground">Madde 3 — Teslimat</h2>
          <p>Ürünler, Alıcı&apos;nın sipariş formunda belirttiği adrese, anlaşmalı kargo şirketi aracılığıyla teslim edilecektir. Teslimat süresi en geç 30 iş günüdür.</p>

          <h2 className="text-lg font-bold text-foreground">Madde 4 — Cayma Hakkı</h2>
          <p>Alıcı, ürünün teslim tarihinden itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin sözleşmeden cayma hakkına sahiptir.</p>

          <h2 className="text-lg font-bold text-foreground">Madde 5 — Ödeme ve Güvenlik</h2>
          <p>Ödemeler İyzico güvenli ödeme altyapısı üzerinden 3D Secure doğrulamalı olarak gerçekleştirilmektedir. Kart bilgileri sunucularımızda saklanmaz.</p>

          <h2 className="text-lg font-bold text-foreground">Madde 6 — Uyuşmazlık</h2>
          <p>İşbu sözleşmeden doğan uyuşmazlıklarda Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.</p>
        </div>
      </section>
    </PublicPageShell>
  )
}
