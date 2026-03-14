export interface Tema {
  id:          string
  ad:          string
  emoji:       string
  aciklama:    string
  minPaket:    string
  onizlemeUrl: string
  stilTanım:   string
  cssOzellikleri: {
    borderRadius:  string
    fontStili:     string   // 'minimal' | 'serif' | 'mono' | 'display'
    layoutTipi:    string
    animasyon:     string
    kartStili:     string
  }
}

export const TEMALAR: Tema[] = [
  {
    id: 'modern-minimal',
    ad: 'Modern Minimal',
    emoji: '◻️',
    aciklama: 'Temiz çizgiler, bol beyaz alan, sade ama etkili',
    minPaket: 'TEMEL',
    onizlemeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
    stilTanım: 'Minimalist modern tasarım. Çok az element, bol negatif alan. Tek aksan rengi. Düz köşeler veya çok hafif yuvarlatma. Gereksiz hiçbir dekorasyon yok.',
    cssOzellikleri: {
      borderRadius: '4px',
      fontStili: 'minimal',
      layoutTipi: 'centered',
      animasyon: 'subtle',
      kartStili: 'flat',
    },
  },
  {
    id: 'bold-ekspresif',
    ad: 'Bold & Ekspresif',
    emoji: '🟥',
    aciklama: 'Güçlü tipografi, cesur renkler, dikkat çekici',
    minPaket: 'TEMEL',
    onizlemeUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    stilTanım: 'Cesur tasarım. Dev başlıklar (hero h1: 5-8rem), güçlü renkler, kalın sınırlar. Dikkat çekici, hafıza bırakıcı. Büyük ve etkili CTA butonları.',
    cssOzellikleri: {
      borderRadius: '0px',
      fontStili: 'display',
      layoutTipi: 'full-bleed',
      animasyon: 'bold',
      kartStili: 'flat',
    },
  },
  {
    id: 'retro-klasik',
    ad: 'Retro Klasik',
    emoji: '📺',
    aciklama: '70\'ler-80\'ler estetiği, vintage tipografi, nostaljik',
    minPaket: 'STANDART',
    onizlemeUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    stilTanım: 'Retro 1970s-1980s tasarım. Serif veya slab-serif font (Abril Fatface veya Playfair). Turuncu-krem-kahve palet. Dekoratif çerçeveler, kalın çizgiler, vintage badge\'ler. Gölgeli metin efektleri.',
    cssOzellikleri: {
      borderRadius: '0px',
      fontStili: 'serif',
      layoutTipi: 'centered',
      animasyon: 'none',
      kartStili: 'flat',
    },
  },
  {
    id: 'futuristik-neon',
    ad: 'Futuristik & Neon',
    emoji: '🚀',
    aciklama: 'Cyberpunk esintisi, neon ışıklar, karanlık fütürizm',
    minPaket: 'STANDART',
    onizlemeUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400',
    stilTanım: 'Cyberpunk/futuristik tasarım. Koyu arka plan (#0a0a0a veya #050510). Neon aksan renkleri (cyan #00f5ff, magenta #ff00aa veya lime #00ff88). Glow efektleri (text-shadow, box-shadow ile). Monospace font. Köşeli geometrik şekiller. Scanline efekti opsiyonel.',
    cssOzellikleri: {
      borderRadius: '2px',
      fontStili: 'mono',
      layoutTipi: 'full-bleed',
      animasyon: 'bold',
      kartStili: 'glassmorphism',
    },
  },
  {
    id: 'glassmorphism',
    ad: 'Glass & Fluid',
    emoji: '🪟',
    aciklama: 'Cam efektleri, şeffaf kartlar, yumuşak degrade arka planlar',
    minPaket: 'STANDART',
    onizlemeUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
    stilTanım: 'Glassmorphism tasarım. Gradient arka plan (çok renkli, blur\'lu). Kartlar: backdrop-filter: blur(20px), background: rgba(255,255,255,0.1), border: 1px solid rgba(255,255,255,0.2). Yumuşak, modern, premium his.',
    cssOzellikleri: {
      borderRadius: '16px',
      fontStili: 'minimal',
      layoutTipi: 'centered',
      animasyon: 'subtle',
      kartStili: 'glassmorphism',
    },
  },
  {
    id: 'brutalist',
    ad: 'Brutalist',
    emoji: '🏗️',
    aciklama: 'Sert, ham, dekorasyon yok — güç ve özgüven yayar',
    minPaket: 'BUYUME',
    onizlemeUrl: 'https://images.unsplash.com/photo-1618776851173-c97bf2a4f9da?w=400',
    stilTanım: 'Brutalist web tasarım. Siyah kalın border\'lar (3-5px). Düz köşeler (border-radius: 0). Yüksek kontrast. Karışık layout (simetri yok). Bold siyah tipografi beyaz üzerine. Çok az renk, çok fazla impact. Hover\'da offset shadow efekti.',
    cssOzellikleri: {
      borderRadius: '0px',
      fontStili: 'display',
      layoutTipi: 'full-bleed',
      animasyon: 'bold',
      kartStili: 'brutalist',
    },
  },
  {
    id: 'organik-dogal',
    ad: 'Organik & Doğal',
    emoji: '🌿',
    aciklama: 'Yumuşak organik şekiller, doğal renkler, sıcak ve samimi',
    minPaket: 'TEMEL',
    onizlemeUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400',
    stilTanım: 'Organik, biyo-morfik tasarım. Düzensiz blob şekiller (CSS clip-path veya SVG). Yeşil-bej-kahve palet. Serif font. Doğadan ilham alan tekstürler. Yumuşak gölgeler. Sıcak ve davetkar his.',
    cssOzellikleri: {
      borderRadius: '50%',
      fontStili: 'serif',
      layoutTipi: 'centered',
      animasyon: 'subtle',
      kartStili: 'flat',
    },
  },
  {
    id: 'elegant-luxury',
    ad: 'Elegant Lüks',
    emoji: '💎',
    aciklama: 'Altın detaylar, ince tipografi, premium ve sofistike',
    minPaket: 'STANDART',
    onizlemeUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    stilTanım: 'Lüks premium tasarım. Siyah/koyu lacivert arka plan. Altın (#d4af37) veya bakır (#b87333) aksan. İnce serif font (Cormorant, Didot). Çok ince border\'lar. Animasyonlu underline efektleri. Bol negatif alan. Her element\'te incelik ve özen var.',
    cssOzellikleri: {
      borderRadius: '0px',
      fontStili: 'serif',
      layoutTipi: 'centered',
      animasyon: 'subtle',
      kartStili: 'flat',
    },
  },
  {
    id: 'neumorphism',
    ad: 'Soft UI',
    emoji: '🫧',
    aciklama: 'Yumuşak gölgeler, çıkıntılı görünüm, modern ve dokunsal',
    minPaket: 'BUYUME',
    onizlemeUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    stilTanım: 'Neumorphism / Soft UI. Açık gri arka plan (#e0e5ec). Elementler hem içeri hem dışarı gölgeli: box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff. Butonlar basıldığında içeriye girer (inset shadow). Renk yok denecek kadar az, form ve gölge her şey.',
    cssOzellikleri: {
      borderRadius: '12px',
      fontStili: 'minimal',
      layoutTipi: 'centered',
      animasyon: 'subtle',
      kartStili: 'neumorphism',
    },
  },
  {
    id: 'japon-minimal',
    ad: 'Japon Minimalizm',
    emoji: '⛩️',
    aciklama: 'Wabi-sabi esintisi, asimetrik denge, huzur veren tasarım',
    minPaket: 'PREMIUM',
    onizlemeUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400',
    stilTanım: 'Japon minimalist tasarım (Wabi-sabi). Çok bol beyaz alan. Tek ince kırmızı veya siyah aksan rengi. Asimetrik yerleşim. Çok ince, zarif tipografi. Geometrik ama kusurlu şekiller. "Az çoktur" felsefesi. Haiku gibi kısa metinler.',
    cssOzellikleri: {
      borderRadius: '2px',
      fontStili: 'minimal',
      layoutTipi: 'centered',
      animasyon: 'none',
      kartStili: 'flat',
    },
  },
  {
    id: 'playful-renkli',
    ad: 'Playful & Renkli',
    emoji: '🎨',
    aciklama: 'Neşeli, enerjik, gökkuşağı renkler — eğlenceli işletmeler için',
    minPaket: 'TEMEL',
    onizlemeUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    stilTanım: 'Eğlenceli çok renkli tasarım. Parlak ve canlı renkler (sarı, pembe, mavi, yeşil bir arada). Yuvarlak köşeler (24px+). El yazısı veya yuvarlak display font (Nunito, Fredoka). Confetti veya baloncuk dekoratif elementler. Enerjik ve davetkar.',
    cssOzellikleri: {
      borderRadius: '24px',
      fontStili: 'display',
      layoutTipi: 'centered',
      animasyon: 'bold',
      kartStili: 'flat',
    },
  },
  {
    id: 'editorial-magazin',
    ad: 'Editorial / Magazin',
    emoji: '📰',
    aciklama: 'Dergi düzeni, güçlü fotoğraf kullanımı, içerik odaklı',
    minPaket: 'PREMIUM',
    onizlemeUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
    stilTanım: 'Editorial/magazin tasarım. Asimetrik çok sütunlu grid. Büyük tam genişlik fotoğraflar. Metin üzerine bindirme başlıklar. Serif başlık + sans-serif metin kombinasyonu. Yatay çizgiler, numaralı bölümler. Vogue veya NYT Times tarzı.',
    cssOzellikleri: {
      borderRadius: '0px',
      fontStili: 'serif',
      layoutTipi: 'full-bleed',
      animasyon: 'subtle',
      kartStili: 'flat',
    },
  },
]

export function temaMinPaketKontrol(temaId: string, paket: string): boolean {
  const tema = TEMALAR.find(t => t.id === temaId)
  if (!tema) return false
  const SIRASI = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']
  return SIRASI.indexOf(paket) >= SIRASI.indexOf(tema.minPaket)
}
