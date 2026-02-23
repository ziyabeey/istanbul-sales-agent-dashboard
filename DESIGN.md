# XINXIA v5.0 Tasarım Sistemi (Design System)

Bu doküman, XINXIA v5.0 Esnaf Asistanı Ekosistemi için dönüşüm odaklı (conversion-driven), güven veren ve mobil öncelikli web platformunun temel tasarım prensiplerini içerir.

## 1. Renk Paleti (Color Palette)

Proje, esnafa güven vermek ve harekete geçirmek üzere özenle seçilmiş renkler üzerine kuruludur:

- **Birincil (Primary - Güven & Kurumsallık):**
  - Koyu Mavi (`#1A365D`) - Tailwind: `bg-blue-900` / `text-blue-900`
  - Açık Mavi (`#2563EB`) - Tailwind: `bg-blue-600` (Vurgular için)

- **İkincil (Secondary - Enerji & Aksiyon / CTA):**
  - Turuncu (`#F97316`) - Tailwind: `bg-orange-500` / `text-orange-500`
  - Koyu Turuncu (`#EA580C`) - Tailwind: `bg-orange-600` (Hover durumları için)

- **Zemin & Nötr Renkler (Okunabilirlik):**
  - Ana Zemin: Açık Gri (`#F8FAFC`) - Tailwind: `bg-slate-50`
  - Kart ve Temiz Alanlar: Beyaz (`#FFFFFF`) - Tailwind: `bg-white`
  - Ana Metin: Koyu Gri (`#1E293B`) - Tailwind: `text-slate-800`
  - İkincil Metin (Mute): Gri (`#64748B`) - Tailwind: `text-slate-500`

## 2. Tipografi (Typography)

Tüm metinlerde sade, modern ve yüksek okunabilirliğe sahip **Inter** fontu kullanılacaktır.

- **Başlıklar (Headings):**
  - Font Ağırlığı: `Bold (700)` veya `ExtraBold (800)`
  - Renk: Genellikle Koyu Mavi (`#1A365D`)
  - Dar ekranlarda (mobil) kırılmaları önlemek için responsive typography (`text-3xl md:text-5xl`) uygulanacak.

- **Gövde Metni (Body Text):**
  - Font Ağırlığı: `Normal (400)` veya `Medium (500)`
  - Renk: Koyu Gri (`#1E293B`) ve Gri (`#64748B`)
  - Satır Aralığı (Line Height): Okunabilirliği artırmak için `leading-relaxed`.

## 3. Arayüz Bileşenleri (UI Components)

### 3.1 Butonlar (Buttons)
Butonlar "Harekete Geçirici Mesaj" (Call-To-Action) hedefini maksimize etmek üzere tasarlanmıştır. Tüm butonlarda hafif gölge ve hover animasyonları (`transition-all duration-300 transform hover:scale-105`) olacaktır.

- **Birincil CTA (Örn: "Asistanla Tanış"):**
  - Arka Plan: Turuncu (`#F97316`)
  - Metin: Beyaz (`#FFFFFF`), `font-bold`
  - Hover: Arka plan Koyu Turuncu (`#EA580C`), hafif gölge artışı (`shadow-lg`).

- **İkincil / Hayalet CTA (Örn: "Paketleri İncele"):**
  - Arka Plan: Transparan
  - Kenarlık: Koyu Mavi (`border-2 border-blue-900`)
  - Metin: Koyu Mavi (`#1A365D`), `font-bold`
  - Hover: Arka plan Açık Mavi/Gri, metin rengi korunur.

### 3.2 Kartlar ve Gölgeler (Cards & Shadows)
Kart yapıları özellikleri ve fiyatları sunarken kullanılır.
- **Standart Kart:** `bg-white rounded-2xl shadow-sm border border-slate-100 p-6`
- **Hover Efekti:** `hover:shadow-md hover:-translate-y-1 transition-all duration-300`
- **Vurgulu Kart (Örn: Premium Paket):** `border-2 border-orange-500 shadow-xl relative` (İçinde "En Çok Tercih Edilen" etiketi yer alacak).

## 4. Mikro Animasyonlar (Micro-Animations - Framer Motion)

Site durağan olmamalıdır. Framer Motion ile platforma canlılık katılacaktır:
- **Fade-Up Sayfa Yüklemesi:** Sayfaya girildiğinde başlıklar ve ana görsel aşağıdan yukarıya şeffaflıktan görünürlüğe doğru 0.5sn'de gelir (`initial={{ opacity: 0, y: 20 }}`).
- **Stagger Özellik Kartları:** Özellik kartları aynı anda değil, 0.1 saniye aralıklarla sırayla yüklenerek (Dizi animasyonu) akıcılık sağlar.
- **Scroll Animasyonları (WhileInView):** Kullanıcı aşağı kaydırdıkça (`Viewport` içine girdiğinde) bölümler yumuşak bir şekilde belirir.

## 5. Mobil Öncelikli Yaklaşım (Mobile-First)

Hedef kitlenin (esnaf) sayfayı %90 ihtimalle cep telefonundan ziyaret edeceği varsayımıyla:
- Tüm padding ve margin değerleri mobil için optimize edilecek (`p-4 md:p-8`).
- Fiyatlandırma tabloları mobilde alt alta akordeon biçiminde ya da yatay olarak sorunsuzca kaydırılarak (`overflow-x-auto`) izlenecek.
- Yapışkan (Sticky) "Satın Al / Tanış" butonu sayfa kaydırılırken mobil ekranın en altında görünür kalacaktır.
