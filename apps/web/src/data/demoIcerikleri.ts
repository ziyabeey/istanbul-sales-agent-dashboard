/**
 * demoIcerikleri.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Sektöre özgü kurgusal (ama gerçekçi) demo verileri.
 * SablonMarket.tsx önizlemelerinde kullanılır.
 * Lorem ipsum YASAKTIR — her metin sektörel ve inandırıcıdır.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface DemoIcerik {
  isletmeAdi: string
  kisaAd: string
  sektor: string
  ilce: string
  sehir: string
  telefon: string
  telefonGosterim: string
  whatsapp: string
  adres: string
  heroBaslik: string
  heroSlogan: string
  ctaBirincil: string
  ctaIkincil: string
  hizmetlerHtml: string
  nedenBizHtml: string
  yorumlarHtml: string
  seoBaslik: string
  seoAciklama: string
}

// ── RESTORAN / GIDA ──────────────────────────────────────────────────────
const restoranDemo: DemoIcerik = {
  isletmeAdi: 'Yıldız Fırını & Restoran',
  kisaAd: 'Yıldız',
  sektor: 'Restoran',
  ilce: 'Kadıköy',
  sehir: 'İstanbul',
  telefon: '02165550101',
  telefonGosterim: '0216 555 01 01',
  whatsapp: '902165550101',
  adres: 'Moda Cad. No:42, Kadıköy, İstanbul',
  heroBaslik: `Kadıköy'de Lezzetin Yeni Adresi`,
  heroSlogan: `Taze pişmiş ekmekler, geleneksel Türk kahvaltısı ve ev yapımı tariflerle 1998'den beri sofralarınızı şenlendiriyoruz.`,
  ctaBirincil: 'Rezervasyon Yap',
  ctaIkincil: 'Menüyü İncele',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🍳</div><h3 style="font-size:1rem;font-weight:700">Serpme Kahvaltı</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">40 çeşit açık büfe kahvaltı, taze sıkılmış portakal suyu ve köy kahvaltısı seçenekleri.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🥘</div><h3 style="font-size:1rem;font-weight:700">Ev Yemekleri</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Her gün taze hazırlanan 15+ çeşit ev yemeği. Kuru fasulye, yaprak sarma, mantı ve daha fazlası.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🍰</div><h3 style="font-size:1rem;font-weight:700">Taze Pasta & Tatlı</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Günlük üretim San Sebastiyan, profiterol ve mevsim meyvalı cheesecake.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🫖</div><h3 style="font-size:1rem;font-weight:700">Çay & Kahve Keyfi</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Özel harman Türk kahvesi, demli çay ve 3. dalga espresso seçenekleri.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏆</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">25 Yıllık Tecrübe</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">1998'den beri Kadıköy'ün vazgeçilmez lezzet durağıyız.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🌾</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Doğal Malzemeler</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Köyden gelen taze ürünler, katkısız un ve organik yumurta kullanıyoruz.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">⭐</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">4.8 Google Puanı</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">1200+ değerlendirmeyle bölgenin en çok tercih edilen restoranıyız.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Kahvaltısı muhteşem! Özellikle köy peyniri ve bal tabağı inanılmaz taze. Her hafta sonu mutlaka geliyoruz."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Elif A.</span><span style="color:var(--renk-alt);font-size:0.75rem">2 hafta önce</span></div></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Ev yemeklerinin tadı annemin elinden çıkmış gibi. Kuru fasulye ve pilav harika, fiyatlar da çok makul."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Mehmet K.</span><span style="color:var(--renk-alt);font-size:0.75rem">1 ay önce</span></div></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"İş çıkışı paket sipariş veriyorum, her seferinde sıcacık ve lezzetli geliyor. WhatsApp'tan sipariş de çok pratik."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Ayşe D.</span><span style="color:var(--renk-alt);font-size:0.75rem">3 hafta önce</span></div></div>`,
  seoBaslik: 'Yıldız Fırını & Restoran | Kadıköy\'de Kahvaltı ve Ev Yemekleri',
  seoAciklama: 'Kadıköy Moda\'da 25 yıldır hizmet veren Yıldız Fırını. Serpme kahvaltı, ev yemekleri ve taze pastalarla sofranıza lezzet katıyoruz.'
}

// ── OTO SERVİS ──────────────────────────────────────────────────────────
const otoServisDemo: DemoIcerik = {
  isletmeAdi: 'Kartal Oto Servis & Boya',
  kisaAd: 'Kartal Oto',
  sektor: 'Oto Servis',
  ilce: 'Kartal',
  sehir: 'İstanbul',
  telefon: '02164550202',
  telefonGosterim: '0216 455 02 02',
  whatsapp: '902164550202',
  adres: 'Sanayi Mah. 3. Sok. No:18, Kartal, İstanbul',
  heroBaslik: 'Aracınız Güvende, Biz Yanınızdayız',
  heroSlogan: 'Mekanik bakım, kaporta-boya ve ekspertiz hizmetlerinde Kartal\'ın 15 yıllık güvenilir adresi.',
  ctaBirincil: 'Hemen Ara',
  ctaIkincil: 'WhatsApp\'tan Teklif Al',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🔧</div><h3 style="font-size:1rem;font-weight:700">Mekanik Bakım</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Motor, şanzıman, fren sistemi ve periyodik bakım. Tüm marka ve modellere uygun servis.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🎨</div><h3 style="font-size:1rem;font-weight:700">Kaporta & Boya</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Çizik, göçük onarımı ve komple boyama. Orijinal renk koduna uygun fabrika kalitesinde sonuç.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🔍</div><h3 style="font-size:1rem;font-weight:700">Ekspertiz</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">İkinci el araç alım-satımında detaylı 120 nokta ekspertiz raporu.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🚗</div><h3 style="font-size:1rem;font-weight:700">Lastik & Rot Balans</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Lastik değişimi, rot ayarı ve balans işlemleri. Kış/yaz lastik depo hizmeti.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏆</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">15 Yıl Güveni</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">2009'dan beri Kartal'da binlerce aracı güvenle onardık.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">💰</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Şeffaf Fiyat</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">İşe başlamadan önce detaylı maliyet çıkarıyoruz; sürpriz fatura yok.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">✅</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">2 Yıl Garanti</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Boya ve kaporta işlemlerimize 2 yıl yazılı garanti veriyoruz.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Aracımın boyasını yaptırdım, fabrika çıkışlı gibi oldu. Fiyat da gayet makuldü, kesinlikle tavsiye ederim."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Hasan T.</span><span style="color:var(--renk-alt);font-size:0.75rem">1 hafta önce</span></div></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Motor bakımı için geldim, sorunları net açıkladılar ve aynı gün teslim ettiler. Güvenilir bir yer."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Zeynep M.</span><span style="color:var(--renk-alt);font-size:0.75rem">3 hafta önce</span></div></div>`,
  seoBaslik: 'Kartal Oto Servis & Boya | Mekanik Bakım, Kaporta, Ekspertiz',
  seoAciklama: 'Kartal\'da 15 yıllık güvenle oto mekanik bakım, kaporta-boya ve ekspertiz hizmetleri. Şeffaf fiyat, garantili işçilik.'
}

// ── HUKUK BÜROSU ──────────────────────────────────────────────────────
const hukukDemo: DemoIcerik = {
  isletmeAdi: 'Av. Yılmaz & Ortakları Hukuk Bürosu',
  kisaAd: 'Yılmaz Hukuk',
  sektor: 'Avukatlık',
  ilce: 'Şişli',
  sehir: 'İstanbul',
  telefon: '02123550303',
  telefonGosterim: '0212 355 03 03',
  whatsapp: '902123550303',
  adres: 'Halaskargazi Cad. No:220 K:5, Şişli, İstanbul',
  heroBaslik: 'Hak Arama Yolculuğunuzda Yanınızdayız',
  heroSlogan: 'Ticaret, iş ve aile hukuku alanlarında 20 yılı aşkın deneyimle, müvekkillerimizin haklarını kararlılıkla savunuyoruz.',
  ctaBirincil: 'Ücretsiz Ön Görüşme',
  ctaIkincil: 'WhatsApp\'tan Danışın',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">⚖️</div><h3 style="font-size:1rem;font-weight:700">Ticaret Hukuku</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Şirket kuruluşu, ortaklık uyuşmazlıkları, ticari sözleşmeler ve alacak takibi.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">👨‍👩‍👧</div><h3 style="font-size:1rem;font-weight:700">Aile Hukuku</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Boşanma, velayet, nafaka ve miras davaları. Arabuluculuk öncelikli hassas yaklaşım.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">📋</div><h3 style="font-size:1rem;font-weight:700">İş Hukuku</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">İşe iade, kıdem-ihbar tazminatı, iş kazası ve SGK uyuşmazlıkları.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🏠</div><h3 style="font-size:1rem;font-weight:700">Gayrimenkul Hukuku</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Tapu iptal, kamulaştırma, kira uyuşmazlıkları ve kat mülkiyeti davaları.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏛️</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">20+ Yıl Baro Deneyimi</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">2003'ten beri İstanbul barosuna kayıtlı, binlerce dosya tecrübesi.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🤝</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">İlk Görüşme Ücretsiz</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Hukuki durumunuzu birlikte değerlendirelim, yol haritası belirleyelim.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">📊</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">%92 Kazanım Oranı</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Takip ettiğimiz davaların %92'sini müvekkil lehine sonuçlandırdık.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"İşe iade davamı büyük bir titizlikle ele aldılar. Haklarımı tam olarak aldım; çok profesyonel bir ekip."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Burak S.</span><span style="color:var(--renk-alt);font-size:0.75rem">1 ay önce</span></div></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Boşanma sürecimde hem hukuki hem insani açıdan çok desteklendim. Tavsiye ederim."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Fatma Y.</span><span style="color:var(--renk-alt);font-size:0.75rem">2 ay önce</span></div></div>`,
  seoBaslik: 'Av. Yılmaz & Ortakları | Şişli Avukat, Ticaret ve İş Hukuku',
  seoAciklama: 'Şişli\'de 20 yıllık deneyimle ticaret, iş, aile ve gayrimenkul hukuku alanlarında profesyonel avukatlık hizmeti.'
}

// ── GÜZELLİK / KUAFÖR ──────────────────────────────────────────────────
const guzellikDemo: DemoIcerik = {
  isletmeAdi: 'Belle Güzellik Stüdyosu',
  kisaAd: 'Belle',
  sektor: 'Güzellik Salonu',
  ilce: 'Bakırköy',
  sehir: 'İstanbul',
  telefon: '02125550404',
  telefonGosterim: '0212 555 04 04',
  whatsapp: '902125550404',
  adres: 'İstanbul Cad. No:55, Bakırköy, İstanbul',
  heroBaslik: 'Kendinizi Özel Hissedin',
  heroSlogan: 'Saç bakımı, cilt yenileme ve nail art hizmetlerimizle Bakırköy\'ün en şık güzellik deneyimini yaşayın.',
  ctaBirincil: 'Randevu Al',
  ctaIkincil: 'Hizmetleri İncele',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">💇‍♀️</div><h3 style="font-size:1rem;font-weight:700">Saç Bakım & Kesim</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Trend kesimler, keratin bakım, brezilya fönü ve profesyonel saç boyama.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">✨</div><h3 style="font-size:1rem;font-weight:700">Cilt Bakımı</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Hydrafacial, dermalogica bakım, anti-aging tedavileri ve medikal cilt analizi.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">💅</div><h3 style="font-size:1rem;font-weight:700">Nail Art & Manikür</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Kalıcı oje, protez tırnak, nail art tasarımlar ve spa pedikür uygulamaları.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🌿</div><h3 style="font-size:1rem;font-weight:700">Epilasyon</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Lazer ve ağda uygulamaları. FDA onaylı cihazlarla güvenli ve kalıcı sonuçlar.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏅</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Sertifikalı Uzmanlar</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Tüm ekibimiz uluslararası sertifikalara sahiptir.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">💎</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Premium Ürünler</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Sadece Kerastas, L'Oréal Pro ve Dermalogica gibi premium markaları kullanıyoruz.</p></div></div>
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">📸</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">12K+ Instagram Takipçi</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Çalışmalarımızı Instagram'dan canlı olarak takip edebilirsiniz.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Saç boyamı her zaman burada yaptırıyorum. Renk geçişleri mükemmel, saçım çok sağlıklı görünüyor."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Selin K.</span><span style="color:var(--renk-alt);font-size:0.75rem">5 gün önce</span></div></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Cilt bakım seansından sonra cildim resmen yenilendi. Ortam çok temiz ve hijyenik. Herkese öneririm!"</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Derya B.</span><span style="color:var(--renk-alt);font-size:0.75rem">2 hafta önce</span></div></div>`,
  seoBaslik: 'Belle Güzellik Stüdyosu | Bakırköy Kuaför, Cilt Bakım, Nail Art',
  seoAciklama: 'Bakırköy\'de profesyonel saç bakımı, hydrafacial cilt bakımı, nail art ve lazer epilasyon. Randevu almak için hemen arayın.'
}

// ── GENEL / HIZMET ──────────────────────────────────────────────────────
const genelDemo: DemoIcerik = {
  isletmeAdi: 'Örnek İşletme',
  kisaAd: 'Örnek',
  sektor: 'Hizmet Sektörü',
  ilce: 'Beşiktaş',
  sehir: 'İstanbul',
  telefon: '05551234567',
  telefonGosterim: '0555 123 45 67',
  whatsapp: '905551234567',
  adres: 'Beşiktaş, İstanbul',
  heroBaslik: 'Sektörünüzün Lideri Olun',
  heroSlogan: 'Profesyonel hizmet ve müşteri memnuniyeti garantisiyle yanınızdayız.',
  ctaBirincil: 'Hemen Ara',
  ctaIkincil: 'WhatsApp',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">⭐</div><h3 style="font-size:1rem;font-weight:700">Profesyonel Hizmet</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Alanında uzman kadromuzla kaliteli ve güvenilir hizmet sunuyoruz.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🕐</div><h3 style="font-size:1rem;font-weight:700">Hızlı Teslimat</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Zamanında ve eksiksiz teslimat garantisi veriyoruz.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏆</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Güvenilir</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Yılların tecrübesi ile hizmetinizdeyiz.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Harika hizmet! Çok memnun kaldık, kesinlikle tavsiye ederim."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Ahmet Y.</span><span style="color:var(--renk-alt);font-size:0.75rem">1 hafta önce</span></div></div>`,
  seoBaslik: 'Örnek İşletme',
  seoAciklama: 'İşletme açıklaması'
}

// ── OTEL / KONAKLAMA ────────────────────────────────────────────────
const otelDemo: DemoIcerik = {
  isletmeAdi: 'Grand Sapphire Hotel & SPA',
  kisaAd: 'Sapphire',
  sektor: 'Otel',
  ilce: 'Beyoğlu',
  sehir: 'İstanbul',
  telefon: '02122550505',
  telefonGosterim: '0212 255 05 05',
  whatsapp: '902122550505',
  adres: 'Asmalımescit Mah. No:12, Beyoğlu, İstanbul',
  heroBaslik: 'İstanbul\'un Kalbinde Lüks Konaklama',
  heroSlogan: 'Boğaz manzaralı odalar, SPA merkezi ve fine dining restoran ile unutulmaz bir İstanbul deneyimi sizi bekliyor.',
  ctaBirincil: 'Rezervasyon Yap',
  ctaIkincil: 'WhatsApp Bilgi Al',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🛏️</div><h3 style="font-size:1rem;font-weight:700">Lüks Odalar</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">28m² ile 72m² arası odalar. Deniz veya şehir manzaralı seçenekler.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">💆</div><h3 style="font-size:1rem;font-weight:700">SPA & Wellness</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Türk hamamı, sauna, jakuzi ve profesyonel masaj hizmetleri.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🍽️</div><h3 style="font-size:1rem;font-weight:700">Fine Dining</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">A la carte restoran, teras bar ve zengin açık büfe kahvaltı.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🏆</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">5 Yıldızlı Hizmet</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Uluslararası standartlarda misafirperverlik.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"Boğaz manzaralı odamız harikaydı! Kahvaltı çok zengindi. Kesinlikle tekrar geleceğiz."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Sarah B.</span><span style="color:var(--renk-alt);font-size:0.75rem">1 hafta önce</span></div></div>`,
  seoBaslik: 'Grand Sapphire Hotel & SPA | Beyoğlu Lüks Otel',
  seoAciklama: 'İstanbul Beyoğlu\'nda boğaz manzaralı lüks otel. SPA, fine dining ve şehir merkezinde konfor.'
}

// ── MARKET / BAKKAL ──────────────────────────────────────────────────
const marketDemo: DemoIcerik = {
  isletmeAdi: 'Yeşil Çarşı Market',
  kisaAd: 'Yeşil Çarşı',
  sektor: 'Market',
  ilce: 'Üsküdar',
  sehir: 'İstanbul',
  telefon: '02163550606',
  telefonGosterim: '0216 355 06 06',
  whatsapp: '902163550606',
  adres: 'Çengelköy Mah. Çarşı Cad. No:8, Üsküdar, İstanbul',
  heroBaslik: 'Taze Ürünler, Uygun Fiyatlar',
  heroSlogan: 'Halden masanıza günlük taze meyve-sebze, ev yapımı yöresel ürünler ve WhatsApp ile kapıya teslimat.',
  ctaBirincil: 'Ürünleri Keşfet',
  ctaIkincil: 'WhatsApp Sipariş',
  hizmetlerHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🥬</div><h3 style="font-size:1rem;font-weight:700">Taze Meyve & Sebze</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Her sabah halden taze gelen organik ürünler.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🧀</div><h3 style="font-size:1rem;font-weight:700">Yöresel Ürünler</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">Karadeniz tereyağı, Ezine peyniri, doğal bal.</p></div>
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div style="font-size:2rem">🚚</div><h3 style="font-size:1rem;font-weight:700">Eve Teslimat</h3><p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6">150₺ üzeri siparişlerde ücretsiz kapıya teslimat.</p></div>`,
  nedenBizHtml: `
    <div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)"><div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">🌿</div><div><h3 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">Taze Garanti</h3><p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">Taze olmayanı iade alıyoruz.</p></div></div>`,
  yorumlarHtml: `
    <div class="kart" style="display:flex;flex-direction:column;gap:12px"><div>⭐⭐⭐⭐⭐</div><p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6">"WhatsApp'tan liste gönderiyorum, 1 saat içinde eve geliyor. Ürünler hep taze ve fiyatlar makul."</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;font-size:0.85rem">Nihan K.</span><span style="color:var(--renk-alt);font-size:0.75rem">3 gün önce</span></div></div>`,
  seoBaslik: 'Yeşil Çarşı Market | Üsküdar Online Market, Eve Teslimat',
  seoAciklama: 'Üsküdar Çengelköy\'de taze meyve-sebze, yöresel ürünler ve günlük ihtiyaçlarınız. WhatsApp sipariş, ücretsiz teslimat.'
}

// ── EXPORT MAP ──────────────────────────────────────────────────────────

/** Şablon ID'sine veya etiketlerine göre en uygun demo içeriği seç */
export function demoIcerikSec(sablonId: string, etiketler?: string[]): DemoIcerik {
  // Doğrudan şablon ID bazlı eşleştirme
  if (sablonId.includes('restoran') || sablonId.includes('gida')) return restoranDemo
  if (sablonId.includes('hizmet') || sablonId.includes('oto') || sablonId.includes('otomotiv')) return otoServisDemo
  if (sablonId.includes('kurumsal') || sablonId.includes('ajans')) return hukukDemo
  if (sablonId.includes('guzellik') || sablonId.includes('vitrin')) return guzellikDemo
  if (sablonId.includes('saglik')) return { ...guzellikDemo, isletmeAdi: 'Hayat Klinik', kisaAd: 'Hayat', sektor: 'Klinik', heroBaslik: 'Sağlığınız Emanetimiz', heroSlogan: 'Modern tıbbi cihazlar ve uzman kadromuzla sağlığınıza değer katıyoruz.' }
  if (sablonId.includes('insaat')) return { ...otoServisDemo, isletmeAdi: 'Atlas İnşaat', kisaAd: 'Atlas', sektor: 'İnşaat', heroBaslik: 'Güvenin Temeli, Kalitenin Adresi', heroSlogan: 'Konut, ticari ve endüstriyel projelerde 20 yıllık güven.' }
  if (sablonId.includes('spor')) return { ...otoServisDemo, isletmeAdi: 'PowerZone Fitness', kisaAd: 'PowerZone', sektor: 'Spor Salonu', heroBaslik: 'Limitlerini Aş, Gücünü Keşfet', heroSlogan: '500m² modern salon, kişisel antrenörler ve grup dersleriyle hedeflerine ulaş.' }
  if (sablonId.includes('egitim')) return { ...hukukDemo, isletmeAdi: 'Bilgi Akademi', kisaAd: 'Bilgi', sektor: 'Eğitim', heroBaslik: 'Geleceğinize Yatırım Yapın', heroSlogan: 'Dil, yazılım ve kariyer kurslarıyla kendinizi geliştirin.' }
  if (sablonId.includes('eticaret')) return { ...guzellikDemo, isletmeAdi: 'Moda Butik', kisaAd: 'Moda', sektor: 'E-Ticaret', heroBaslik: 'Yeni Sezon Koleksiyonu', heroSlogan: 'En yeni trendleri uygun fiyatlarla keşfedin.' }
  // Yeni sektörler
  if (sablonId.includes('otel')) return otelDemo
  if (sablonId.includes('hukuk')) return hukukDemo
  if (sablonId.includes('market')) return marketDemo

  // Etiket bazlı fallback
  if (etiketler?.some(e => ['Restoran', 'Kafe', 'Gıda'].includes(e))) return restoranDemo
  if (etiketler?.some(e => ['Acil', 'Oto', 'Tesisat'].includes(e))) return otoServisDemo
  if (etiketler?.some(e => ['Güzellik', 'Klinik', 'Soft'].includes(e))) return guzellikDemo
  if (etiketler?.some(e => ['Kurumsal', 'Finans', 'Teknoloji'].includes(e))) return hukukDemo
  if (etiketler?.some(e => ['Otel', 'Konaklama'].includes(e))) return otelDemo
  if (etiketler?.some(e => ['Market', 'Bakkal'].includes(e))) return marketDemo

  return genelDemo
}

