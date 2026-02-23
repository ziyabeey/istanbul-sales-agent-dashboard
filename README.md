# XINXIA v5.0 - Esnaf Asistanı Ekosistemi

XINXIA v5.0, Türkiye'deki 3.5 milyon kayıtlı esnaf için geliştirilmiş, yüksek performanslı, dönüşüm odaklı (conversion-driven) ve mobil öncelikli bir landing page ve dijital asistan vitrinidir.

## 🚀 Teknolojik Altyapı (Tech Stack)

Proje, modern web standartlarına ve performans metriklerine (Core Web Vitals) uygun olarak tasarlanmıştır:
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Client Components)
- **UI Kütüphanesi:** React 18+
- **Stil & Tasarım:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Tipografi:** Google Fonts `Inter` (Next.js font optimizasyonu)
- **Animasyon:** [Framer Motion](https://www.framer.com/motion/) (Mikro animasyonlar ve whileInView scroll efektleri)
- **İkonlar:** Lucide React

## 📂 Mimari Tasarım (Mimari Yaklaşım & SOLID)

Proje, Sürdürülebilirlik (Maintainability) ve Tekrar Kullanılabilirlik (DRY) prensiplerine göre yapılandırılmıştır:

```bash
src/
├── app/                  # Next.js App Router (Sayfalar, Layout ve Global CSS)
├── components/
│   ├── ui/               # Yeniden kullanılabilir, izole temel UI bileşenleri (Button vb.)
│   └── sections/         # Mantıksal olarak bölünmüş işlevsel sayfa bölümleri (Hero, Pricing vb.)
└── lib/                  # Yardımcı araçlar (clsx, tailwind-merge util fonksiyonları vb.)
```

### 🧩 Temel Bileşenler (Components)
*   **`HeroSection`**: İlk izlenim, harekete geçirici mesajlar (CTA) ve asistan ön izlemesi.
*   **`ProblemSolutionSection`**: Geleneksel ajans/freelancer çözümleriyle XINXIA'nın farkını anlatan performans odaklı statik veri karşılaştırması. Veriler component dışında (DRY prensibi) tanımlanmıştır.
*   **`FeaturesSection`** & **`PowerFeaturesSection`**: 17 Yapay Zeka ajanı, WA The Closer botu ve Premium+ Sesli Asistan tanıtımı.
*   **`PricingSection`**: Masaüstü (grid) ve Mobil (yatay kaydırılabilir sekmeler) uyarlanabilir, dönüşüm garantili fiyatlandırma matrisi.
*   **`FooterTrustSection`**: İYS ETK muafiyetleri ve KVKK beyanlarını içeren güven inşa paneli.

Tüm bileşenler **TSDoc** standartlarında belgelendirilmiştir.

## 💻 Geliştirme Ortamı Kurulumu

Projeyi bilgisayarınızda çalıştırmak için:

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Sayfayı tarayıcınızdan `http://localhost:3000` adresine giderek görüntüleyebilirsiniz.

## 🏗 Üretim (Production) Sürümü

Üretime hazır bir build almak için aşağıdaki komutları kullanın. Proje `Next.js Compiler` kullanarak optimize edilmiş statik çıktılar üretir:

```bash
npm run build
npm start
```
