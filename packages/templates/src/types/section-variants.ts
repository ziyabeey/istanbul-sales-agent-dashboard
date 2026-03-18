/**
 * @kepenk/templates — Section Variant Definitions
 *
 * Maps each SectionType to its available variants, plan requirements,
 * suitable sectors, and editable field configs.
 */

import type { SectionType, AnimationPreset } from './section-types'

// ═══════════════════════════════════════════
// VARIANT DEFINITION
// ═══════════════════════════════════════════

export interface VariantDef {
  id: string
  name: string
  description: string
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  sectors: string[]
  defaultAnimation: AnimationPreset
}

export interface SectionDef {
  type: SectionType
  nameTr: string
  global: boolean
  position?: 'top' | 'bottom' | 'floating'
  removable: boolean
  variants: VariantDef[]
  editableFields: EditableFieldDef[]
}

export interface EditableFieldDef {
  path: string
  type: 'text' | 'richtext' | 'image' | 'link' | 'color' | 'number' | 'select' | 'array'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

// ═══════════════════════════════════════════
// UNIVERSAL SECTION DEFINITIONS
// ═══════════════════════════════════════════

export const UNIVERSAL_SECTIONS: SectionDef[] = [
  // ─── 01: HEADER ───
  {
    type: 'header', nameTr: 'Üst Menü', global: true, position: 'top', removable: false,
    variants: [
      { id: 'minimal_sticky',  name: 'Minimal Yapışkan', description: 'Sade, beyaz, sticky', plan: 'free',       sectors: ['*'], defaultAnimation: 'none' },
      { id: 'warm_medical',    name: 'Sıcak Medikal',    description: 'İki satır, üst bilgi barı', plan: 'starter',  sectors: ['doktor','disci','veteriner','guzellik','eczane'], defaultAnimation: 'none' },
      { id: 'dark_glass',      name: 'Koyu Cam',         description: 'Transparan→solid koyu', plan: 'starter',  sectors: ['berber','restoran','bar','fotografci','kuyumcu'], defaultAnimation: 'none' },
      { id: 'luxury_centered', name: 'Lüks Ortalı',      description: 'Logo ortada, nav iki yana', plan: 'growth',  sectors: ['berber','kafe','dugun','guzellik','kuyumcu'], defaultAnimation: 'none' },
      { id: 'dark_industrial', name: 'Endüstriyel',      description: 'Koyu + acil servis barı', plan: 'starter',  sectors: ['oto','elektrikci','tesisatci','klima'], defaultAnimation: 'none' },
      { id: 'corporate_mega',  name: 'Kurumsal Mega',    description: 'Mega dropdown, çoklu CTA', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'none' },
      { id: 'modern_app',      name: 'Modern Uygulama',  description: 'Temiz, renkli CTA', plan: 'starter',  sectors: ['spor','fastfood','fotografci'], defaultAnimation: 'none' },
      { id: 'overlay_menu',    name: 'Overlay Menü',     description: 'Tam ekran overlay', plan: 'pro',       sectors: ['fotografci','mimarlik','bar'], defaultAnimation: 'none' },
      { id: 'dual_bar',        name: 'Çift Bar',         description: 'Bilgi barı + nav barı', plan: 'starter',  sectors: ['doktor','eczane'], defaultAnimation: 'none' },
    ],
    editableFields: [
      { path: 'logo.text', type: 'text', label: 'Logo Metni' },
      { path: 'logo.imageUrl', type: 'image', label: 'Logo Görseli' },
      { path: 'menuItems', type: 'array', label: 'Menü Öğeleri' },
      { path: 'cta.text', type: 'text', label: 'CTA Buton Metni' },
      { path: 'cta.href', type: 'link', label: 'CTA Link' },
      { path: 'topBar.phone', type: 'text', label: 'Telefon (Üst Bar)' },
      { path: 'topBar.email', type: 'text', label: 'E-posta (Üst Bar)' },
      { path: 'topBar.workingHours', type: 'text', label: 'Çalışma Saatleri (Üst Bar)' },
    ],
  },

  // ─── 02: HERO ───
  {
    type: 'hero', nameTr: 'Ana Banner', global: false, removable: false,
    variants: [
      { id: 'fullscreen_overlay', name: 'Tam Ekran Overlay',    description: 'Fotoğraf + koyu overlay + merkez metin', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'split_left',         name: 'Bölünmüş Sol',         description: 'Sol metin, sağ fotoğraf', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'video_cinematic',    name: 'Video Sinematik',       description: 'Arka plan video, koyu overlay', plan: 'growth',  sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'fullscreen_kenburns',name: 'Ken Burns Zoom',        description: 'Yavaş zoom efekti, lüks', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'search_centric',     name: 'Arama Odaklı',          description: 'Büyük arama barı + hızlı kartlar', plan: 'growth',  sectors: ['emlakci','doktor','ozelders'], defaultAnimation: 'fadeUp' },
      { id: 'fullscreen_single',  name: 'Tek Fotoğraf',          description: 'Tam ekran, minimal metin', plan: 'pro',     sectors: ['fotografci','mimarlik'], defaultAnimation: 'fadeIn' },
      { id: 'fullscreen_slider',  name: 'Tam Ekran Slider',      description: '3-5 slide, autoplay', plan: 'growth',  sectors: ['kuyumcu','emlakci','dugun'], defaultAnimation: 'fadeIn' },
      { id: 'image_card',         name: 'Bilgi Kartı',           description: 'Sol kart + sağ fotoğraf', plan: 'free',    sectors: ['doktor','psikolog','muhasebeci'], defaultAnimation: 'fadeUp' },
      { id: 'promo_carousel',     name: 'Kampanya Carousel',     description: 'Kampanya banner slider', plan: 'growth',  sectors: ['fastfood','eczane'], defaultAnimation: 'fadeIn' },
      { id: 'warm_image',         name: 'Sıcak Görsel',          description: 'Büyük fotoğraf + overlay kutu', plan: 'free',    sectors: ['kafe','firin','kasap','cicekci'], defaultAnimation: 'fadeUp' },
      { id: 'soft_carousel',      name: 'Yumuşak Carousel',      description: 'Pastel, yumuşak slide', plan: 'starter',  sectors: ['guzellik','firin','eczane','petshop'], defaultAnimation: 'fadeIn' },
    ],
    editableFields: [
      { path: 'badge', type: 'text', label: 'Üst Etiket' },
      { path: 'title', type: 'text', label: 'Ana Başlık', required: true },
      { path: 'subtitle', type: 'richtext', label: 'Alt Başlık' },
      { path: 'cta1.text', type: 'text', label: 'Birincil Buton Metni' },
      { path: 'cta1.href', type: 'link', label: 'Birincil Buton Linki' },
      { path: 'cta2.text', type: 'text', label: 'İkincil Buton Metni' },
      { path: 'cta2.href', type: 'link', label: 'İkincil Buton Linki' },
      { path: 'backgroundImage', type: 'image', label: 'Arka Plan Görseli' },
      { path: 'backgroundVideo.url', type: 'text', label: 'Video URL' },
      { path: 'badges', type: 'array', label: 'Bilgi Badge\'leri' },
    ],
  },

  // ─── 03: SERVICES ───
  {
    type: 'services', nameTr: 'Hizmetler', global: false, removable: true,
    variants: [
      { id: 'card_grid',          name: 'Kart Grid',          description: '2×3 veya 3×3 kart grid', plan: 'free',    sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'filtered_tabs',      name: 'Filtreli Tab',       description: 'Kategori tab + filtrelenen grid', plan: 'starter',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'hover_reveal',       name: 'Hover Reveal',       description: 'Liste, hover\'da fotoğraf', plan: 'growth',  sectors: ['berber','restoran','bar'], defaultAnimation: 'fadeUp' },
      { id: 'pricing_accordion',  name: 'Fiyat Accordion',    description: 'Tıkla-aç detay + fiyat', plan: 'free',    sectors: ['oto','elektrikci','tesisatci'], defaultAnimation: 'fadeUp' },
      { id: 'visual_cards',       name: 'Görsel Kart',        description: 'Büyük fotoğraflı kartlar', plan: 'growth',  sectors: ['guzellik','dugun','kafe'], defaultAnimation: 'stagger' },
      { id: 'sticky_scroll',      name: 'Sticky Scroll',      description: 'Sol sticky fotoğraf + sağ scroll', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'editorial_zigzag',   name: 'Editoryal Zigzag',   description: 'Sol-sağ alternatif', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Section Başlığı', required: true },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'services', type: 'array', label: 'Hizmetler' },
      { path: 'services[].name', type: 'text', label: 'Hizmet Adı', required: true },
      { path: 'services[].description', type: 'text', label: 'Açıklama' },
      { path: 'services[].price', type: 'text', label: 'Fiyat' },
      { path: 'services[].duration', type: 'text', label: 'Süre' },
      { path: 'services[].icon', type: 'select', label: 'İkon' },
      { path: 'services[].image', type: 'image', label: 'Hizmet Görseli' },
    ],
  },

  // ─── 04: ABOUT ───
  {
    type: 'about', nameTr: 'Hakkımızda', global: false, removable: true,
    variants: [
      { id: 'split_left',   name: 'Bölünmüş Sol', description: 'Sol metin, sağ fotoğraf, statlar', plan: 'free',   sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'split_right',  name: 'Bölünmüş Sağ', description: 'Sol fotoğraf, sağ metin', plan: 'free',   sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'full_story',   name: 'Tam Hikaye',    description: 'Timeline + fotoğraflar', plan: 'growth', sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'values_grid',  name: 'Değerler Grid', description: 'Değerler/ilkeler kartları', plan: 'starter', sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık', required: true },
      { path: 'description', type: 'richtext', label: 'Açıklama', required: true },
      { path: 'image', type: 'image', label: 'Fotoğraf' },
      { path: 'stats', type: 'array', label: 'İstatistikler' },
      { path: 'signature.name', type: 'text', label: 'İmza İsmi' },
      { path: 'signature.role', type: 'text', label: 'İmza Unvanı' },
    ],
  },

  // ─── 05: TEAM ───
  {
    type: 'team', nameTr: 'Ekibimiz', global: false, removable: true,
    variants: [
      { id: 'card_horizontal',  name: 'Yatay Kart',      description: 'Fotoğraf sol, bilgi sağ', plan: 'free',       sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'carousel',         name: 'Carousel',         description: '3 kart görünür, kaydırılır', plan: 'growth',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'full_page_snap',   name: 'Tam Sayfa Snap',   description: 'Her kişi bir ekran', plan: 'pro',       sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'mono_to_color',    name: 'Mono→Renkli',      description: 'S/B fotoğraf, hover\'da renkli', plan: 'growth',    sectors: ['berber','restoran','bar'], defaultAnimation: 'stagger' },
      { id: 'filterable_grid',  name: 'Filtreli Grid',    description: 'Departman bazlı filtre', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık', required: true },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'members', type: 'array', label: 'Ekip Üyeleri' },
      { path: 'members[].name', type: 'text', label: 'İsim', required: true },
      { path: 'members[].role', type: 'text', label: 'Unvan', required: true },
      { path: 'members[].photo', type: 'image', label: 'Fotoğraf' },
      { path: 'members[].bio', type: 'text', label: 'Biyografi' },
    ],
  },

  // ─── 06: GALLERY ───
  {
    type: 'gallery', nameTr: 'Galeri', global: false, removable: true,
    variants: [
      { id: 'simple_grid',          name: 'Basit Grid',       description: '3×3 eşit boyutlu', plan: 'free',   sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'masonry',              name: 'Masonry',           description: 'Pinterest tarzı', plan: 'starter', sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'horizontal_snap',      name: 'Yatay Snap',       description: 'Yatay scroll', plan: 'starter', sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'filterable_masonry',   name: 'Filtreli Masonry',  description: 'Masonry + kategori filtre', plan: 'growth',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'asymmetric_editorial', name: 'Asimetrik',         description: '1 büyük + 2 küçük editoryal', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'images', type: 'array', label: 'Fotoğraflar' },
      { path: 'images[].url', type: 'image', label: 'Fotoğraf' },
      { path: 'images[].alt', type: 'text', label: 'Alt Metin', required: true },
      { path: 'categories', type: 'array', label: 'Kategoriler' },
    ],
  },

  // ─── 07: TESTIMONIALS ───
  {
    type: 'testimonials', nameTr: 'Müşteri Yorumları', global: false, removable: true,
    variants: [
      { id: 'carousel',          name: 'Carousel',            description: '1 yorum slider', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'grid_cards',        name: 'Grid Kartlar',        description: '2-3 kolon kart', plan: 'growth',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'editorial_single',  name: 'Editoryal Tek',       description: 'Tek büyük yorum, tırnak işareti', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'marquee',           name: 'Marquee',             description: 'Sonsuz yatay scroll', plan: 'growth',  sectors: ['*'], defaultAnimation: 'none' },
      { id: 'with_photo',        name: 'Fotoğraflı',          description: 'Büyük müşteri fotoğrafı + yorum', plan: 'growth',  sectors: ['dugun','fotografci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'reviews', type: 'array', label: 'Yorumlar' },
      { path: 'reviews[].name', type: 'text', label: 'Müşteri Adı', required: true },
      { path: 'reviews[].text', type: 'richtext', label: 'Yorum Metni', required: true },
      { path: 'reviews[].rating', type: 'number', label: 'Puan (1-5)' },
      { path: 'reviews[].photo', type: 'image', label: 'Müşteri Fotoğrafı' },
    ],
  },

  // ─── 08: FAQ ───
  {
    type: 'faq', nameTr: 'Sık Sorulan Sorular', global: false, removable: true,
    variants: [
      { id: 'accordion',   name: 'Accordion',    description: 'Tıkla-aç sorular', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'two_column',  name: 'İki Kolon',    description: 'Sorular iki kolonda', plan: 'growth',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'with_search', name: 'Aramalı',      description: 'Arama barı + accordion', plan: 'pro',     sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'questions', type: 'array', label: 'Sorular' },
      { path: 'questions[].question', type: 'text', label: 'Soru', required: true },
      { path: 'questions[].answer', type: 'richtext', label: 'Cevap', required: true },
      { path: 'ctaText', type: 'text', label: 'Alt CTA Metni' },
    ],
  },

  // ─── 09: CONTACT ───
  {
    type: 'contact', nameTr: 'İletişim Formu', global: false, removable: true,
    variants: [
      { id: 'simple_form',    name: 'Basit Form',      description: 'Tek kolon form', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'split_form_map', name: 'Form + Harita',   description: 'Sol form, sağ harita', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'full_width',     name: 'Tam Genişlik',    description: 'Tam genişlik, ortalı form', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'fields', type: 'array', label: 'Form Alanları' },
      { path: 'submitText', type: 'text', label: 'Gönder Butonu' },
      { path: 'successMessage', type: 'text', label: 'Başarı Mesajı' },
    ],
  },

  // ─── 10: MAP ───
  {
    type: 'map', nameTr: 'Harita', global: false, removable: true,
    variants: [
      { id: 'full_width',     name: 'Tam Genişlik',  description: 'Tam genişlik harita + info kartlar', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'split_info',     name: 'Bilgi + Harita', description: 'Sol bilgi + sağ harita', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'static_image',   name: 'Statik Görsel',  description: 'JS yok, statik harita görseli', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeIn' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'address', type: 'text', label: 'Adres', required: true },
      { path: 'embedUrl', type: 'text', label: 'Google Maps Embed URL' },
    ],
  },

  // ─── 11: STATS ───
  {
    type: 'stats', nameTr: 'İstatistikler', global: false, removable: true,
    variants: [
      { id: 'animated_row',  name: 'Animasyonlu Sıra', description: 'Yatay, sayaç animasyonlu', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'dark_bar',      name: 'Koyu Bant',        description: 'Koyu arka plan, beyaz metin', plan: 'free',     sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'gradient_bar',  name: 'Gradient Bant',    description: 'Gradient arka plan', plan: 'pro',      sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'stats', type: 'array', label: 'İstatistikler' },
      { path: 'stats[].value', type: 'text', label: 'Değer', required: true },
      { path: 'stats[].label', type: 'text', label: 'Etiket', required: true },
    ],
  },

  // ─── 12: FOOTER ───
  {
    type: 'footer', nameTr: 'Alt Bilgi', global: true, position: 'bottom', removable: false,
    variants: [
      { id: 'minimal',         name: 'Minimal',           description: 'Tek satır, logo + copyright', plan: 'free',       sectors: ['*'], defaultAnimation: 'none' },
      { id: 'warm_columns',    name: 'Sıcak Kolonlar',    description: '3-4 kolon, bg-surface', plan: 'starter',    sectors: ['*'], defaultAnimation: 'none' },
      { id: 'dark_columns',    name: 'Koyu Kolonlar',     description: '3-4 kolon, koyu arka plan', plan: 'starter',    sectors: ['*'], defaultAnimation: 'none' },
      { id: 'luxury_minimal',  name: 'Lüks Minimal',      description: 'Ortala, zarif, az metin', plan: 'pro',        sectors: ['*'], defaultAnimation: 'none' },
      { id: 'corporate_mega',  name: 'Kurumsal Mega',     description: '5+ kolon + newsletter + harita', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'none' },
    ],
    editableFields: [
      { path: 'businessName', type: 'text', label: 'İşletme Adı' },
      { path: 'description', type: 'text', label: 'Kısa Açıklama' },
      { path: 'columns', type: 'array', label: 'Kolon Grupları' },
      { path: 'contact.phone', type: 'text', label: 'Telefon' },
      { path: 'contact.email', type: 'text', label: 'E-posta' },
      { path: 'contact.address', type: 'text', label: 'Adres' },
      { path: 'copyright', type: 'text', label: 'Telif Hakkı Metni' },
    ],
  },

  // ─── 13: WORKING HOURS ───
  {
    type: 'working_hours', nameTr: 'Çalışma Saatleri', global: false, removable: true,
    variants: [
      { id: 'compact',     name: 'Kompakt',      description: 'Liste formatı, bugün vurgulu', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'card',        name: 'Kart',          description: 'Kart içinde, ikonlu', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'side_panel',  name: 'Yan Panel',     description: 'Sabit yan panel', plan: 'growth',   sectors: ['*'], defaultAnimation: 'slideRight' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'hours', type: 'array', label: 'Saatler' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  // ─── 14: WHATSAPP CTA ───
  {
    type: 'whatsapp_cta', nameTr: 'WhatsApp Butonu', global: true, position: 'floating', removable: false,
    variants: [
      { id: 'floating',  name: 'Yuvarlak Buton', description: 'Sağ alt köşe, sabit', plan: 'free',    sectors: ['*'], defaultAnimation: 'none' },
      { id: 'banner',    name: 'Alt Bant',       description: 'Footer üstünde yeşil bant', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'phone', type: 'text', label: 'WhatsApp Numarası', required: true },
      { path: 'message', type: 'text', label: 'Varsayılan Mesaj' },
      { path: 'label', type: 'text', label: 'Bant Metni' },
    ],
  },

  // ─── 15: COOKIE BANNER ───
  {
    type: 'cookie_banner', nameTr: 'Çerez Bildirimi', global: true, position: 'floating', removable: false,
    variants: [
      { id: 'bottom_bar',   name: 'Alt Bar',     description: 'Sayfa altında sabit bar', plan: 'free',    sectors: ['*'], defaultAnimation: 'none' },
      { id: 'modal',        name: 'Modal',        description: 'Ortada modal pencere', plan: 'starter',  sectors: ['*'], defaultAnimation: 'none' },
    ],
    editableFields: [
      { path: 'text', type: 'text', label: 'Bildirim Metni' },
      { path: 'acceptText', type: 'text', label: 'Kabul Butonu' },
      { path: 'detailsLink', type: 'link', label: 'Detay Linki' },
    ],
  },

  // ─── 16: CTA ───
  {
    type: 'cta', nameTr: 'Aksiyon Çağrısı', global: false, removable: true,
    variants: [
      { id: 'full_width_banner', name: 'Tam Genişlik Bant', description: 'bg-accent veya bg-image, merkez metin', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'split_card',        name: 'Bölünmüş Kart',    description: 'Sol metin + sağ görsel', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'floating_bar',      name: 'Sticky Alt Bar',    description: 'Scroll\'da görünen sabit bar', plan: 'starter',  sectors: ['*'], defaultAnimation: 'none' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık', required: true },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'cta.text', type: 'text', label: 'Buton Metni', required: true },
      { path: 'cta.href', type: 'link', label: 'Buton Linki', required: true },
      { path: 'backgroundImage', type: 'image', label: 'Arka Plan Görseli' },
    ],
  },

  // ─── 17: PRICING ───
  {
    type: 'pricing', nameTr: 'Fiyatlandırma', global: false, removable: true,
    variants: [
      { id: 'columns',     name: 'Kolonlar',     description: '2-3 paket kolon', plan: 'free',    sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'comparison',  name: 'Karşılaştırma', description: 'Tablo formatı', plan: 'growth',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'toggle',      name: 'Aylık/Yıllık',  description: 'Toggle ile periyod seçimi', plan: 'growth',  sectors: ['spor','ozelders'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'packages', type: 'array', label: 'Paketler' },
      { path: 'packages[].name', type: 'text', label: 'Paket Adı', required: true },
      { path: 'packages[].price', type: 'text', label: 'Fiyat', required: true },
      { path: 'packages[].features', type: 'array', label: 'Özellikler' },
    ],
  },

  // ─── 18: PROCESS STEPS ───
  {
    type: 'process_steps', nameTr: 'Süreç Adımları', global: false, removable: true,
    variants: [
      { id: 'horizontal_timeline', name: 'Yatay Timeline', description: 'Yatay adımlar, bağlantı çizgisi', plan: 'free',    sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'vertical_timeline',   name: 'Dikey Timeline',  description: 'Sol çizgi + sağ adımlar', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'numbered_cards',      name: 'Numaralı Kartlar', description: 'Büyük numara + kart grid', plan: 'starter',  sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'steps', type: 'array', label: 'Adımlar' },
      { path: 'steps[].title', type: 'text', label: 'Adım Başlığı', required: true },
      { path: 'steps[].description', type: 'text', label: 'Açıklama', required: true },
    ],
  },

  // ─── 19: PHILOSOPHY ───
  {
    type: 'philosophy', nameTr: 'Felsefemiz', global: false, removable: true,
    variants: [
      { id: 'full_width_quote', name: 'Tam Genişlik Alıntı', description: 'Büyük italik metin, overlay', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'split_quote',      name: 'Bölünmüş Alıntı',    description: 'Sol metin, sağ fotoğraf', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'quote', type: 'richtext', label: 'Alıntı Metni', required: true },
      { path: 'author', type: 'text', label: 'Yazar' },
      { path: 'backgroundImage', type: 'image', label: 'Arka Plan Görseli' },
    ],
  },

  // ─── 20: BRANDS LOGOS ───
  {
    type: 'brands_logos', nameTr: 'Markalar', global: false, removable: true,
    variants: [
      { id: 'row',     name: 'Sıra',    description: 'Yatay sıra, grayscale→renkli hover', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'marquee', name: 'Marquee', description: 'Sonsuz yatay scroll', plan: 'starter',  sectors: ['*'], defaultAnimation: 'none' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'logos', type: 'array', label: 'Logolar' },
      { path: 'logos[].imageUrl', type: 'image', label: 'Logo Görseli' },
      { path: 'logos[].name', type: 'text', label: 'Marka Adı' },
    ],
  },

  // ─── 21: PROMOTIONS ───
  {
    type: 'promotions', nameTr: 'Kampanyalar', global: false, removable: true,
    variants: [
      { id: 'carousel', name: 'Carousel', description: 'Kampanya slider', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'grid',     name: 'Grid',     description: 'Kampanya kart grid', plan: 'free',     sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'promotions', type: 'array', label: 'Kampanyalar' },
      { path: 'promotions[].title', type: 'text', label: 'Kampanya Başlığı', required: true },
      { path: 'promotions[].description', type: 'text', label: 'Açıklama' },
      { path: 'promotions[].image', type: 'image', label: 'Kampanya Görseli' },
      { path: 'promotions[].badge', type: 'text', label: 'İndirim Badge' },
    ],
  },

  // ─── 22: EMERGENCY BANNER ───
  {
    type: 'emergency_banner', nameTr: 'Acil Servis Bandı', global: false, removable: true,
    variants: [
      { id: 'top_bar',    name: 'Üst Bar',    description: 'Kırmızı bant, büyük telefon', plan: 'free',    sectors: ['oto','elektrikci','tesisatci','klima','cilingir'], defaultAnimation: 'none' },
      { id: 'full_width', name: 'Tam Genişlik', description: 'Büyük bant, animasyonlu ikon', plan: 'starter',  sectors: ['oto','elektrikci','tesisatci','klima','cilingir'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık', required: true },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'phone', type: 'text', label: 'ACİL Telefon', required: true },
    ],
  },

  // ─── 23: SOCIAL PROOF ───
  {
    type: 'social_proof', nameTr: 'Basın & Ödüller', global: false, removable: true,
    variants: [
      { id: 'logo_row',  name: 'Logo Sırası', description: 'Basın/ödül logoları sıralı', plan: 'growth',  sectors: ['*'], defaultAnimation: 'fadeIn' },
      { id: 'cards',     name: 'Kartlar',     description: 'Ödül/sertifika kartları', plan: 'growth',  sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'items', type: 'array', label: 'Öğeler' },
      { path: 'items[].title', type: 'text', label: 'Başlık', required: true },
      { path: 'items[].logo', type: 'image', label: 'Logo' },
    ],
  },

  // ─── 24: BLOG PREVIEW ───
  {
    type: 'blog_preview', nameTr: 'Blog Önizleme', global: false, removable: true,
    variants: [
      { id: 'card_grid',   name: 'Kart Grid',   description: '3 kolon kart grid', plan: 'starter',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'list',         name: 'Liste',       description: 'Dikey liste formatı', plan: 'free',     sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'featured',     name: 'Öne Çıkan',   description: '1 büyük + 2 küçük', plan: 'growth',   sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'ctaText', type: 'text', label: 'CTA Metni' },
      { path: 'ctaHref', type: 'link', label: 'CTA Linki' },
    ],
  },

  // ─── 25a: NEWSLETTER ───
  {
    type: 'newsletter', nameTr: 'Bülten Aboneliği', global: false, removable: true,
    variants: [
      { id: 'inline',    name: 'Satır İçi',   description: 'Compact input + buton', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'card',      name: 'Kart',         description: 'Kart içinde form', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık', required: true },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'placeholder', type: 'text', label: 'Placeholder' },
      { path: 'submitText', type: 'text', label: 'Buton Metni' },
    ],
  },

  // ─── 25b: INSTAGRAM FEED ───
  {
    type: 'instagram_feed', nameTr: 'Instagram Akışı', global: false, removable: true,
    variants: [
      { id: 'grid_3x2',  name: '3×2 Grid',  description: '6 fotoğraf grid', plan: 'starter',  sectors: ['*'], defaultAnimation: 'stagger' },
      { id: 'carousel',   name: 'Carousel',  description: 'Yatay scroll fotoğraflar', plan: 'starter',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'username', type: 'text', label: 'Instagram Kullanıcı Adı', required: true },
      { path: 'images', type: 'array', label: 'Fotoğraflar' },
      { path: 'followText', type: 'text', label: 'Takip Butonu Metni' },
    ],
  },
]

/** Quick lookup: sectionType → SectionDef */
export const SECTION_DEF_MAP = new Map<SectionType, SectionDef>(
  UNIVERSAL_SECTIONS.map(s => [s.type, s])
)

/** Get all variant IDs for a section type */
export function getVariantIds(type: SectionType): string[] {
  return SECTION_DEF_MAP.get(type)?.variants.map(v => v.id) ?? []
}

/** Check if a variant is available for a given plan */
export function isVariantAvailable(
  type: SectionType,
  variantId: string,
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise',
): boolean {
  const planOrder = ['free', 'starter', 'growth', 'pro', 'enterprise']
  const def = SECTION_DEF_MAP.get(type)
  if (!def) return false

  const variant = def.variants.find(v => v.id === variantId)
  if (!variant) return false

  return planOrder.indexOf(plan) >= planOrder.indexOf(variant.plan)
}
