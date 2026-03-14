/**
 * demoVitrinData.ts — 40 Sektör Demo Verisi + srcdoc Template Generator
 */

export type DemoKategori = 'yerel-esnaf' | 'profesyonel' | 'saglik-guzellik' | 'etkinlik'

export interface DemoSector {
  id: number
  ad: string
  kategori: DemoKategori
  bg: string
  accent: string
  text: string
  font: string
  unsplash: string
  heroBaslik: string
  heroAlt: string
  hizmetler: [string, string, string]
}

export const KATEGORILER: Record<DemoKategori, { ad: string; sayi: number }> = {
  'yerel-esnaf': { ad: 'Yerel Esnaf', sayi: 19 },
  'profesyonel': { ad: 'Profesyonel', sayi: 11 },
  'saglik-guzellik': { ad: 'Sağlık & Güzellik', sayi: 11 },
  'etkinlik': { ad: 'Etkinlik', sayi: 1 },
}

export const DEMOLAR: DemoSector[] = [
  // ── YEREL ESNAF ──
  { id:1, ad:'Restoran & Lokanta', kategori:'yerel-esnaf', bg:'#1e0f05', accent:'#c2440e', text:'#f5ede0', font:'Cormorant Garamond', unsplash:'photo-1414235077428-338989a2e8c0', heroBaslik:'Ocakbaşı Sofrası', heroAlt:'Büyükannenin tarifi, şefin elinden', hizmetler:['Başlangıçlar','Ana Yemekler','Tatlılar'] },
  { id:2, ad:'Kafe & Coffee Shop', kategori:'yerel-esnaf', bg:'#faf4ed', accent:'#c2773a', text:'#2c1a0e', font:'Playfair Display', unsplash:'photo-1509042239860-f550ce710b93', heroBaslik:'Filtre & Köpük', heroAlt:'Her yudumda bir hikaye', hizmetler:['Filtre Kahve','Tatlılar','Kahvaltı'] },
  { id:3, ad:'Fırın & Pastane', kategori:'yerel-esnaf', bg:'#fffdf7', accent:'#e8a030', text:'#3b2507', font:'Abril Fatface', unsplash:'photo-1509440159596-0249088772ff', heroBaslik:'Un & Sıcaklık Pastanesi', heroAlt:'Sabahın ilk ışığında pişer', hizmetler:['Ekmekler','Börekler','Özel Pasta'] },
  { id:4, ad:'Berber & Kuaför', kategori:'yerel-esnaf', bg:'#0d0d0d', accent:'#b8960c', text:'#f2f2f2', font:'Bebas Neue', unsplash:'photo-1503951914875-452162b0f3f1', heroBaslik:'Tıraş Atölyesi', heroAlt:'Klasik tıraş, modern adam', hizmetler:['Saç Kesimi','Sakal','Cilt Bakımı'] },
  { id:5, ad:'Kadın Kuaförü', kategori:'yerel-esnaf', bg:'#fdf8f9', accent:'#d4709a', text:'#2d1527', font:'Cormorant', unsplash:'photo-1560066984-138dadb4c035', heroBaslik:'Papatya Güzellik Salonu', heroAlt:'Güzelliğin en doğal hali', hizmetler:['Saç','Manikür','Cilt Bakımı'] },
  { id:6, ad:'Çiçekçi', kategori:'yerel-esnaf', bg:'#f9f5f0', accent:'#c9856a', text:'#1a2e1c', font:'Gilda Display', unsplash:'photo-1487530811176-3780de880c2d', heroBaslik:'Tomurcuk Floral', heroAlt:'Her duygu bir çiçek kadar güzel', hizmetler:['Günlük Buket','Düğün','Abonelik'] },
  { id:7, ad:'Kasap & Et Market', kategori:'yerel-esnaf', bg:'#fafaf8', accent:'#c53030', text:'#1c0a08', font:'Syne', unsplash:'photo-1607623814075-e51df1bdc82f', heroBaslik:'Öz Anadolu Kasabı', heroAlt:'Kökten gelen lezzet', hizmetler:['Dana','Kuzu','Şarküteri'] },
  { id:8, ad:'Kuru Temizleme', kategori:'yerel-esnaf', bg:'#f0f8ff', accent:'#2e86de', text:'#0a2a4a', font:'Outfit', unsplash:'photo-1545173168-9f1947eebb7f', heroBaslik:'Tertemiz Laundry', heroAlt:'Kıyafetlerin en iyi hali', hizmetler:['Yıkama','Kuru Temizleme','Express'] },
  { id:9, ad:'Oto Servis', kategori:'yerel-esnaf', bg:'#111111', accent:'#e63946', text:'#f5f5f5', font:'Barlow Condensed', unsplash:'photo-1486262715619-67b85e0b08d3', heroBaslik:'Şahin Oto Merkezi', heroAlt:'Aracın güvencesi, yolun ustası', hizmetler:['Motor Bakım','Kaporta','Lastik'] },
  { id:10, ad:'Elektrikçi & Tesisatçı', kategori:'yerel-esnaf', bg:'#0a0a1a', accent:'#f5a623', text:'#e8e8f0', font:'Rajdhani', unsplash:'photo-1621905251189-08b45d6a269e', heroBaslik:'Voltaj Teknik', heroAlt:'7/24 arızaya hazır', hizmetler:['Elektrik','Tesisat','Doğalgaz'] },
  { id:11, ad:'Mobilya & Dekorasyon', kategori:'yerel-esnaf', bg:'#f7f3ee', accent:'#8b6f47', text:'#2a1f14', font:'Fraunces', unsplash:'photo-1555041469-a586c61ea9bc', heroBaslik:'Form & Doku Mobilya', heroAlt:'Yaşayan mekânlar, anlatılan hikayeler', hizmetler:['Oturma Odası','Yatak Odası','Ofis'] },
  { id:12, ad:'Terzi & Atölye', kategori:'yerel-esnaf', bg:'#f8f5f0', accent:'#c9a84c', text:'#1e1b2e', font:'Libre Baskerville', unsplash:'photo-1558618666-fcd25c85f82e', heroBaslik:'İnce İş Atölyesi', heroAlt:'Her dikişte özen', hizmetler:['Özel Dikim','Tamir','Nakış'] },
  { id:13, ad:'Kırtasiye & Baskı', kategori:'yerel-esnaf', bg:'#eae2b7', accent:'#003049', text:'#1a1a1a', font:'Space Mono', unsplash:'photo-1513364776144-60967b0f800f', heroBaslik:'Nokta Baskı & Kırtasiye', heroAlt:'Fikirleriniz kağıda dökülür', hizmetler:['Dijital Baskı','Kartvizit','Ciltleme'] },
  { id:14, ad:'Eczane', kategori:'yerel-esnaf', bg:'#f1fffe', accent:'#00897b', text:'#004d40', font:'Nunito', unsplash:'photo-1631549916768-4119b2e5f926', heroBaslik:'Sağlık Köşesi Eczanesi', heroAlt:'Sağlığınız bizim önceliğimiz', hizmetler:['Reçeteli İlaç','Takviye','Kozmetik'] },

  // ── PROFESYONEL ──
  { id:15, ad:'Hukuk Bürosu', kategori:'profesyonel', bg:'#f5f4f0', accent:'#c9a84c', text:'#1c2b3a', font:'Libre Baskerville', unsplash:'photo-1589829545856-d10d557cf95f', heroBaslik:'Karaağaç Hukuk Bürosu', heroAlt:'Haklarınız güçlü ellerde', hizmetler:['Ceza Hukuku','Aile Hukuku','Ticaret Hukuku'] },
  { id:16, ad:'Mali Müşavirlik', kategori:'profesyonel', bg:'#f0f4f8', accent:'#2d8653', text:'#0f2044', font:'Montserrat', unsplash:'photo-1554224155-6726b3ff858f', heroBaslik:'Güven Mali Müşavirlik', heroAlt:'Rakamların arkasında güvenilir bir el', hizmetler:['Vergi','Bordro','Şirket Kuruluşu'] },
  { id:17, ad:'Mimarlık Ofisi', kategori:'profesyonel', bg:'#f5f0eb', accent:'#c07941', text:'#1a1a1a', font:'Syne', unsplash:'photo-1487958449943-2429e8be8625', heroBaslik:'Küp Mimarlık Atölyesi', heroAlt:'Boşluğu anlama, mekânı dönüştürme', hizmetler:['Konut','Ticari','Tadilat'] },
  { id:18, ad:'Mühendislik', kategori:'profesyonel', bg:'#0b1929', accent:'#00bcd4', text:'#e0f7fa', font:'Exo 2', unsplash:'photo-1581092160607-ee22621dd758', heroBaslik:'Tekno Çözüm Mühendislik', heroAlt:'Kompleks sorunlar, akıllı çözümler', hizmetler:['Proje Yönetimi','Yapı Denetimi','Enerji'] },
  { id:19, ad:'Sigorta Acentesi', kategori:'profesyonel', bg:'#f8f9fa', accent:'#e87722', text:'#1a3a5c', font:'Raleway', unsplash:'photo-1450101499163-c8848c66ca85', heroBaslik:'Kalkan Sigorta', heroAlt:'Her riske karşı güvende olun', hizmetler:['Kasko','Sağlık','Konut Sigortası'] },
  { id:20, ad:'Emlak Ofisi', kategori:'profesyonel', bg:'#f9f7f2', accent:'#d4af37', text:'#1b2838', font:'Playfair Display', unsplash:'photo-1560518883-ce09059eeffa', heroBaslik:'Köşe Taşı Emlak', heroAlt:'Doğru adres, doğru zaman', hizmetler:['Satılık','Kiralık','Ticari'] },
  { id:21, ad:'Dijital Ajans', kategori:'profesyonel', bg:'#0a0a0f', accent:'#7c3aed', text:'#f0e6ff', font:'Space Grotesk', unsplash:'photo-1460925895917-afdab827c52f', heroBaslik:'Pulse Digital Ajans', heroAlt:'Markanı büyüt, rakiplerine bak', hizmetler:['SEO','Meta Ads','Web Tasarım'] },
  { id:22, ad:'Dershane & Kurs', kategori:'profesyonel', bg:'#f0f4ff', accent:'#4f46e5', text:'#1a2744', font:'Nunito', unsplash:'photo-1524178232363-1fb2b075b655', heroBaslik:'Zirve Eğitim Merkezi', heroAlt:'Başarı bir adım ötede', hizmetler:['YKS','KPSS','İngilizce'] },
  { id:23, ad:'Tercüme Bürosu', kategori:'profesyonel', bg:'#ecf0f1', accent:'#e74c3c', text:'#2c3e50', font:'Josefin Sans', unsplash:'photo-1456513080510-7bf3a84b82f8', heroBaslik:'Lingua Çeviri Akademisi', heroAlt:'Diller arasında köprü kuruyoruz', hizmetler:['Noterli Çeviri','Simultane','Dil Kursları'] },
  { id:24, ad:'Fotoğrafçı', kategori:'profesyonel', bg:'#111111', accent:'#ff6b35', text:'#f5f5f5', font:'Oswald', unsplash:'photo-1471341971476-ae15ff5dd4ea', heroBaslik:'Kare Prodüksiyon', heroAlt:'Her anı sanat eserine dönüştürün', hizmetler:['Düğün','Kurumsal','Ürün Çekimi'] },
  { id:25, ad:'Yazılım Şirketi', kategori:'profesyonel', bg:'#030712', accent:'#10b981', text:'#f0fdf4', font:'Inter', unsplash:'photo-1461749280684-dccba630e2f6', heroBaslik:'Nexus Yazılım', heroAlt:'Kodu değil, çözümü teslim ederiz', hizmetler:['Web','Mobil App','API Geliştirme'] },

  // ── SAĞLIK & GÜZELLİK ──
  { id:26, ad:'Diş Kliniği', kategori:'saglik-guzellik', bg:'#f0fbf9', accent:'#00c9a7', text:'#0d4f7c', font:'Poppins', unsplash:'photo-1629909613654-28e377c37b09', heroBaslik:'Beyaz Gülüş Polikliniği', heroAlt:'Sağlıklı dişler, özgür gülüşler', hizmetler:['İmplant','Ortodonti','Beyazlatma'] },
  { id:27, ad:'Özel Klinik', kategori:'saglik-guzellik', bg:'#f4fbfc', accent:'#4db8d4', text:'#1a3a4a', font:'Outfit', unsplash:'photo-1519494026892-80bbd2d6fd0d', heroBaslik:'Anadolu Sağlık Kliniği', heroAlt:'Sağlığınız profesyonel ellerde', hizmetler:['Dahiliye','Kardiyoloji','Check-Up'] },
  { id:28, ad:'Fizyoterapi', kategori:'saglik-guzellik', bg:'#f0faf4', accent:'#52b788', text:'#1b4332', font:'Nunito', unsplash:'photo-1576091160550-2173dba999ef', heroBaslik:'Hareket Fizyoterapi', heroAlt:'Ağrıdan harekete, hareketten özgürlüğe', hizmetler:['Manuel Terapi','Sporcu Rehab','Skolyoz'] },
  { id:29, ad:'Diyetisyen', kategori:'saglik-guzellik', bg:'#f6fbf0', accent:'#7bc950', text:'#2d4a22', font:'Quicksand', unsplash:'photo-1512621776951-a57141f2eefd', heroBaslik:'Denge Beslenme Danışmanlığı', heroAlt:'Sağlıklı vücut, dengeli yaşam', hizmetler:['Kilo Yönetimi','Sporcu Beslenmesi','Online'] },
  { id:30, ad:'Spor Salonu', kategori:'saglik-guzellik', bg:'#0a0a0a', accent:'#ff3c00', text:'#ffffff', font:'Anton', unsplash:'photo-1534438327276-14e5300c3a48', heroBaslik:'Iron Force Gym', heroAlt:'Limitlerini zorla, kendinle kazan', hizmetler:['Kişisel Antrenman','Grup Dersi','Beslenme'] },
  { id:31, ad:'Yoga & Pilates', kategori:'saglik-guzellik', bg:'#e7f6f2', accent:'#4a9e8e', text:'#2c3639', font:'Cormorant Garamond', unsplash:'photo-1544367567-0f2fcb009e0b', heroBaslik:'Nefes Yoga Stüdyo', heroAlt:'Bedenini dinle, zihnini özgür bırak', hizmetler:['Hatha','Vinyasa','Reformer Pilates'] },
  { id:32, ad:'Estetik Kliniği', kategori:'saglik-guzellik', bg:'#fdf6f6', accent:'#c9a0a0', text:'#1a0f12', font:'Gilda Display', unsplash:'photo-1570172619644-dfd03ed5d881', heroBaslik:'Aura Estetik Kliniği', heroAlt:'Doğal güzelliğini keşfet', hizmetler:['Botoks','Dolgu','Lazer Epilasyon'] },
  { id:33, ad:'Psikolog', kategori:'saglik-guzellik', bg:'#f5f7fb', accent:'#7b9bb8', text:'#2e3250', font:'Lora', unsplash:'photo-1573497019940-1c28c88b4f3e', heroBaslik:'Güvenli Alan Psikoloji', heroAlt:'Dinlenecek biri var, yardım alınabilir', hizmetler:['Bireysel Terapi','Çift Terapisi','Online Seans'] },
  { id:34, ad:'Veteriner Kliniği', kategori:'saglik-guzellik', bg:'#fff8f2', accent:'#f4a261', text:'#1b3a4b', font:'Nunito', unsplash:'photo-1548199973-03cce0bbc87b', heroBaslik:'Patici Veteriner Kliniği', heroAlt:'Dostlarınıza en iyi bakım', hizmetler:['Aşı','Ameliyat','Otelcilik'] },
  { id:35, ad:'Masaj & Spa', kategori:'saglik-guzellik', bg:'#f4f1eb', accent:'#8b7355', text:'#2c2418', font:'Cormorant Garamond', unsplash:'photo-1544161515-4ab6ce6db874', heroBaslik:'Serenity Spa', heroAlt:'Bedeninize huzur, zihninize dinlenme', hizmetler:['Aromaterapi','Taş Masajı','Çift Masajı'] },

  // ── YENİ YEREL ESNAF ──
  { id:36, ad:'Oto Yıkama', kategori:'yerel-esnaf', bg:'#0c1a2e', accent:'#38bdf8', text:'#e0f2fe', font:'Exo 2', unsplash:'photo-1520340356584-f9917d1eea6f', heroBaslik:'Aqua Clean Oto Yıkama', heroAlt:'Aracınıza showroom parlaklığı', hizmetler:['İç Temizlik','Pasta Cila','Detaylı Yıkama'] },
  { id:37, ad:'Nakliyeci', kategori:'yerel-esnaf', bg:'#1a0f05', accent:'#f59e0b', text:'#fef3c7', font:'Barlow Condensed', unsplash:'photo-1586528116311-ad8dd3c8310d', heroBaslik:'Güven Nakliyat', heroAlt:'Taşınmak artık stressiz', hizmetler:['Ev Taşıma','Ofis Taşıma','Depolama'] },
  { id:38, ad:'Temizlik Şirketi', kategori:'yerel-esnaf', bg:'#f0fdf4', accent:'#22c55e', text:'#14532d', font:'Nunito', unsplash:'photo-1581578731548-c64695cc6952', heroBaslik:'Pırıl Temizlik', heroAlt:'Profesyonel temizlik garantisi', hizmetler:['Ev Temizliği','Ofis','Dezenfeksiyon'] },
  { id:39, ad:'Boyacı', kategori:'yerel-esnaf', bg:'#fdf6e3', accent:'#d97706', text:'#451a03', font:'Outfit', unsplash:'photo-1562259929-b4e1fd3aef09', heroBaslik:'Renk Ustası Boya', heroAlt:'Mekanınıza renk katıyoruz', hizmetler:['İç Cephe','Dış Cephe','Dekoratif Boya'] },
  { id:40, ad:'Camcı', kategori:'yerel-esnaf', bg:'#f0f9ff', accent:'#0284c7', text:'#0c4a6e', font:'Raleway', unsplash:'photo-1596079890744-c1a0462d0975', heroBaslik:'Kristal Cam', heroAlt:'Cam ve pencere çözümleri', hizmetler:['Cam Balkon','Isıcam','Ayna Kesimi'] },

  // ── ETKİNLİK ──
  { id:41, ad:'Organizasyon & Düğün', kategori:'etkinlik', bg:'#1a0a2e', accent:'#a855f7', text:'#f5f3ff', font:'Playfair Display', unsplash:'photo-1519741497674-611481863552', heroBaslik:'Peri Masalı Organizasyon', heroAlt:'Unutulmaz anlar, kusursuz organizasyon', hizmetler:['Düğün','Nişan','Kurumsal'] },
]

// ── srcdoc Template Generator ──────────────────────────────────────────────

function isDark(bg: string): boolean {
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return (r * 0.299 + g * 0.587 + b * 0.114) < 128
}

export function srcdocUret(d: DemoSector): string {
  const dark = isDark(d.bg)
  const navBg = dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.85)'
  const navBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
  const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const subText = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const footBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'

  const hizmetIkonlar = ['🎯', '⭐', '💎']

  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'${d.font}',sans-serif;background:${d.bg};color:${d.text};overflow-x:hidden}a{color:inherit;text-decoration:none}.nav{position:sticky;top:0;z-index:50;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;background:${navBg};backdrop-filter:blur(12px);border-bottom:1px solid ${navBorder}}.nav-logo{font-size:1.5rem;font-weight:900;letter-spacing:-0.03em}.nav-links{display:flex;gap:28px;font-size:0.95rem;font-weight:500;color:${subText}}.hero{position:relative;min-height:85vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px;overflow:hidden}.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/${d.unsplash}?w=1440&q=75&auto=format') center/cover no-repeat}.hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,${d.bg}cc 0%,${d.bg}99 40%,${d.bg}ee 100%)}.hero-content{position:relative;z-index:2;max-width:800px}.hero h1{font-size:4rem;font-weight:900;line-height:1.05;margin-bottom:20px;letter-spacing:-0.03em}.hero p{font-size:1.3rem;color:${subText};margin-bottom:40px;line-height:1.6}.hero .cta{display:inline-flex;gap:12px}.hero .btn{padding:16px 36px;border-radius:10px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:transform 0.2s}.btn-primary{background:${d.accent};color:#fff}.btn-outline{background:transparent;border:1.5px solid ${d.accent};color:${d.accent}}.services{padding:100px 48px;max-width:1200px;margin:0 auto}.services h2{font-size:2.5rem;font-weight:800;text-align:center;margin-bottom:60px}.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.service-card{background:${cardBg};border:1px solid ${cardBorder};border-radius:18px;padding:40px 32px;text-align:center;transition:transform 0.3s}.service-card:hover{transform:translateY(-6px)}.service-card .icon{font-size:2.5rem;margin-bottom:16px}.service-card h3{font-size:1.3rem;font-weight:700;margin-bottom:10px}.service-card p{font-size:0.9rem;color:${subText};line-height:1.6}.testimonial{padding:80px 48px;text-align:center;background:${footBg}}.testimonial blockquote{max-width:600px;margin:0 auto;font-size:1.2rem;font-style:italic;line-height:1.7;color:${subText}}.testimonial .author{margin-top:20px;font-weight:700;font-size:0.95rem}.footer{padding:30px 48px;text-align:center;font-size:0.85rem;color:${subText};border-top:1px solid ${cardBorder}}</style></head><body><nav class="nav"><div class="nav-logo">${d.heroBaslik.split(' ')[0]}<span style="color:${d.accent}">.</span></div><div class="nav-links"><a>Anasayfa</a><a>Hizmetler</a><a>Hakkımızda</a><a>İletişim</a></div></nav><section class="hero"><div class="hero-bg"></div><div class="hero-overlay"></div><div class="hero-content"><h1>${d.heroBaslik}</h1><p>${d.heroAlt}</p><div class="cta"><button class="btn btn-primary">Randevu Al</button><button class="btn btn-outline">Bizi Arayın</button></div></div></section><section class="services"><h2>Hizmetlerimiz</h2><div class="services-grid">${d.hizmetler.map((h, i) => `<div class="service-card"><div class="icon">${hizmetIkonlar[i]}</div><h3>${h}</h3><p>Alanında uzman ekibimizle profesyonel ${h.toLowerCase()} hizmeti sunuyoruz.</p></div>`).join('')}</div></section><section class="testimonial"><blockquote>"Harika bir deneyimdi. Profesyonel kadroları ve kaliteli hizmetleriyle her zaman tercihim olacak."</blockquote><div class="author">— Mehmet K. ⭐⭐⭐⭐⭐</div></section><footer class="footer">© 2025 ${d.heroBaslik} · Powered by kepenk.ai</footer></body></html>`
}
