/**
 * @kepenk/templates — Sector-Specific Section Variant Definitions
 *
 * Maps sector section types to variants, plan requirements, and cross-sector reuse.
 */

import type { SectionType, AnimationPreset } from './section-types'
import type { SectionDef, VariantDef, EditableFieldDef } from './section-variants'

// ═══════════════════════════════════════════
// SECTOR SECTION DEFINITIONS
// ═══════════════════════════════════════════

export const SECTOR_SECTIONS: SectionDef[] = [
  // ── CLUSTER A: Randevu + Portfolyo ──

  {
    type: 'before_after' as SectionType, nameTr: 'Öncesi / Sonrası', global: false, removable: true,
    variants: [
      { id: 'slider',        name: 'Sürükle Slider',   description: 'Sürüklenebilir dikey çizgi', plan: 'starter', sectors: ['berber','guzellik','disci','terzi'], defaultAnimation: 'fadeUp' },
      { id: 'curtain_reveal',name: 'Perde Efekti',     description: 'Scroll ile otomatik açılma', plan: 'growth',  sectors: ['berber','guzellik','disci'], defaultAnimation: 'fadeIn' },
      { id: 'side_by_side',  name: 'Yan Yana',         description: 'Basit iki fotoğraf yan yana', plan: 'free',    sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'items', type: 'array', label: 'Öncesi/Sonrası Öğeleri' },
      { path: 'items[].before', type: 'image', label: 'Öncesi Fotoğrafı' },
      { path: 'items[].after', type: 'image', label: 'Sonrası Fotoğrafı' },
      { path: 'items[].caption', type: 'text', label: 'Açıklama' },
    ],
  },

  {
    type: 'booking' as SectionType, nameTr: 'Randevu Alma', global: false, removable: true,
    variants: [
      { id: 'inline_calendar', name: 'Sayfa İçi Takvim', description: 'Tarih+saat+hizmet seçimi', plan: 'growth',  sectors: ['berber','guzellik','doktor','disci','psikolog','veteriner'], defaultAnimation: 'fadeUp' },
      { id: 'cta_only',        name: 'Sadece CTA',       description: 'Telefon/WhatsApp butonları', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'external_link',   name: 'Dış Link',         description: '3rd party booking sistemi', plan: 'free',    sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'cta.text', type: 'text', label: 'Buton Metni' },
      { path: 'cta.phone', type: 'text', label: 'Telefon' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  {
    type: 'portfolio_grid' as SectionType, nameTr: 'Portfolyo', global: false, removable: true,
    variants: [
      { id: 'masonry_lightbox', name: 'Masonry + Lightbox', description: 'Pinterest tarzı + tam ekran galeri', plan: 'growth',  sectors: ['fotografci','mimarlik','dugun','guzellik'], defaultAnimation: 'stagger' },
      { id: 'horizontal_scroll',name: 'Yatay Scroll',       description: 'Yatay snap scroll kartlar', plan: 'growth',  sectors: ['fotografci','mimarlik'], defaultAnimation: 'fadeUp' },
      { id: 'simple_grid',      name: 'Basit Grid',         description: 'Eşit boyutlu grid', plan: 'free',     sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'projects', type: 'array', label: 'Projeler' },
      { path: 'projects[].title', type: 'text', label: 'Proje Adı' },
      { path: 'projects[].coverImage', type: 'image', label: 'Kapak Görseli' },
      { path: 'categories', type: 'array', label: 'Kategoriler' },
    ],
  },

  {
    type: 'video_showreel' as SectionType, nameTr: 'Video Showreel', global: false, removable: true,
    variants: [
      { id: 'bg_video',    name: 'Arka Plan Video', description: 'Otomatik oynat + overlay', plan: 'pro',    sectors: ['fotografci','dugun','berber','restoran'], defaultAnimation: 'fadeIn' },
      { id: 'modal_play',  name: 'Modal Oynatıcı', description: 'Thumbnail + play butonu', plan: 'growth',  sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'featuredVideo.url', type: 'text', label: 'Video URL' },
      { path: 'featuredVideo.thumbnailUrl', type: 'image', label: 'Kapak Görseli' },
    ],
  },

  // ── CLUSTER B: Restoran + Yemek ──

  {
    type: 'menu_display' as SectionType, nameTr: 'Menü', global: false, removable: true,
    variants: [
      { id: 'tab_categories', name: 'Kategori Tab',   description: 'Tab + liste formatı', plan: 'free',    sectors: ['restoran','kafe','firin','fastfood','bar','kasap'], defaultAnimation: 'fadeUp' },
      { id: 'visual_grid',    name: 'Görsel Grid',    description: 'Fotoğraflı kart grid', plan: 'starter', sectors: ['fastfood','kafe','firin'], defaultAnimation: 'stagger' },
      { id: 'coffee_notes',   name: 'Kahve Notları', description: 'Origin + tat notları', plan: 'starter', sectors: ['kafe'], defaultAnimation: 'fadeUp' },
      { id: 'drink_menu',     name: 'İçki Menüsü',   description: 'Kokteyl/bira/şarap tab', plan: 'starter', sectors: ['bar','restoran'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Menü Başlığı' },
      { path: 'categories', type: 'array', label: 'Kategoriler' },
      { path: 'categories[].name', type: 'text', label: 'Kategori Adı' },
      { path: 'categories[].items', type: 'array', label: 'Menü Öğeleri' },
      { path: 'categories[].items[].name', type: 'text', label: 'Yemek Adı' },
      { path: 'categories[].items[].price', type: 'text', label: 'Fiyat' },
      { path: 'categories[].items[].image', type: 'image', label: 'Fotoğraf' },
    ],
  },

  {
    type: 'daily_special' as SectionType, nameTr: 'Günün Özel', global: false, removable: true,
    variants: [
      { id: 'banner',    name: 'Bant',      description: 'Yatay bilgi bandı', plan: 'free',    sectors: ['firin','restoran','kafe','kasap'], defaultAnimation: 'fadeUp' },
      { id: 'card_list', name: 'Kart Liste', description: 'Ürün kartları', plan: 'starter', sectors: ['firin','restoran','kafe','kasap'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'items', type: 'array', label: 'Öğeler' },
      { path: 'items[].name', type: 'text', label: 'Ürün Adı' },
      { path: 'items[].price', type: 'text', label: 'Fiyat' },
    ],
  },

  {
    type: 'reservation' as SectionType, nameTr: 'Masa Rezervasyonu', global: false, removable: true,
    variants: [
      { id: 'form',    name: 'Form',    description: 'Tarih+saat+kişi sayısı form', plan: 'starter', sectors: ['restoran','bar'], defaultAnimation: 'fadeUp' },
      { id: 'cta',     name: 'CTA',     description: 'Telefon/WhatsApp CTA', plan: 'free',    sectors: ['restoran','bar'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'submitText', type: 'text', label: 'Gönder Butonu' },
    ],
  },

  {
    type: 'delivery_zone' as SectionType, nameTr: 'Teslimat Bölgesi', global: false, removable: true,
    variants: [
      { id: 'map_with_zones', name: 'Harita + Bölgeler', description: 'Harita + semt listesi', plan: 'starter', sectors: ['fastfood','firin','kasap','restoran'], defaultAnimation: 'fadeUp' },
      { id: 'list_only',      name: 'Sadece Liste',      description: 'Semt listesi + bilgi', plan: 'free',    sectors: ['fastfood','firin','kasap','restoran'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'zones', type: 'array', label: 'Bölgeler' },
      { path: 'orderCta.text', type: 'text', label: 'Sipariş Butonu' },
    ],
  },

  // ── CLUSTER C: Sağlık ──

  {
    type: 'doctor_profile' as SectionType, nameTr: 'Hekim Profili', global: false, removable: true,
    variants: [
      { id: 'split',     name: 'Bölünmüş',   description: 'Sol fotoğraf, sağ detaylar', plan: 'free',    sectors: ['doktor','disci','psikolog'], defaultAnimation: 'fadeUp' },
      { id: 'carousel',  name: 'Carousel',    description: 'Çoklu hekim slider', plan: 'starter', sectors: ['doktor','disci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'doctors', type: 'array', label: 'Hekimler' },
      { path: 'doctors[].name', type: 'text', label: 'İsim' },
      { path: 'doctors[].specialty', type: 'text', label: 'Uzmanlık' },
      { path: 'doctors[].photo', type: 'image', label: 'Fotoğraf' },
      { path: 'doctors[].bio', type: 'richtext', label: 'Biyografi' },
    ],
  },

  {
    type: 'insurance_logos' as SectionType, nameTr: 'Anlaşmalı Sigortalar', global: false, removable: true,
    variants: [
      { id: 'row',     name: 'Logo Sırası', description: 'Yatay logo sırası', plan: 'free',    sectors: ['doktor','disci','eczane','optik'], defaultAnimation: 'fadeIn' },
      { id: 'grid',    name: 'Logo Grid',   description: 'Logo kartları grid', plan: 'starter', sectors: ['doktor','disci','eczane','optik'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'logos', type: 'array', label: 'Logolar' },
      { path: 'sgkNote', type: 'text', label: 'SGK Notu' },
    ],
  },

  {
    type: 'price_calculator' as SectionType, nameTr: 'Fiyat Hesaplama', global: false, removable: true,
    variants: [
      { id: 'interactive', name: 'İnteraktif',  description: 'Slider/sayaç ile hesaplama', plan: 'growth',  sectors: ['disci'], defaultAnimation: 'fadeUp' },
      { id: 'table',       name: 'Tablo',       description: 'Statik fiyat tablosu', plan: 'free',    sectors: ['disci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'treatments', type: 'array', label: 'Tedaviler' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  {
    type: 'pet_species' as SectionType, nameTr: 'Hayvan Türleri', global: false, removable: true,
    variants: [
      { id: 'emoji_cards', name: 'Emoji Kartlar', description: 'Büyük emoji + tür + hizmetler', plan: 'free', sectors: ['veteriner'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'species', type: 'array', label: 'Türler' },
    ],
  },

  // ── CLUSTER D: Hizmet + Teknik ──

  {
    type: 'warranty_badge' as SectionType, nameTr: 'Garanti Bilgisi', global: false, removable: true,
    variants: [
      { id: 'row', name: 'Yatay Sıra', description: 'İkon + başlık yatay', plan: 'free', sectors: ['oto','elektrikci','tesisatci','klima','telefon'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'badges', type: 'array', label: 'Garanti Badge\'leri' },
      { path: 'badges[].title', type: 'text', label: 'Başlık' },
      { path: 'badges[].description', type: 'text', label: 'Açıklama' },
    ],
  },

  {
    type: 'service_area' as SectionType, nameTr: 'Hizmet Bölgesi', global: false, removable: true,
    variants: [
      { id: 'map_districts', name: 'Harita + Semtler', description: 'Sol semt listesi, sağ harita', plan: 'starter', sectors: ['elektrikci','tesisatci','klima','cilingir'], defaultAnimation: 'fadeUp' },
      { id: 'list_only',     name: 'Sadece Liste',     description: 'Semt listesi', plan: 'free',    sectors: ['elektrikci','tesisatci','klima','cilingir'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'districts', type: 'array', label: 'Semtler' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  {
    type: 'device_repair_pricing' as SectionType, nameTr: 'Cihaz Tamir Fiyatları', global: false, removable: true,
    variants: [
      { id: 'tab_accordion', name: 'Tab + Accordion', description: 'Marka tab → model accordion → fiyat tablo', plan: 'starter', sectors: ['telefon'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'devices', type: 'array', label: 'Cihazlar' },
    ],
  },

  {
    type: 'certifications' as SectionType, nameTr: 'Belgeler & Sertifikalar', global: false, removable: true,
    variants: [
      { id: 'grid',    name: 'Grid',    description: 'Belge kartları grid', plan: 'free',    sectors: ['elektrikci','tesisatci','klima','oto','avukat','muhasebeci'], defaultAnimation: 'stagger' },
      { id: 'carousel',name: 'Carousel',description: 'Belge slider', plan: 'starter', sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'certs', type: 'array', label: 'Belgeler' },
      { path: 'certs[].name', type: 'text', label: 'Belge Adı' },
      { path: 'certs[].issuer', type: 'text', label: 'Veren Kurum' },
    ],
  },

  // ── CLUSTER E: Hukuk + Finans ──

  {
    type: 'practice_areas' as SectionType, nameTr: 'Çalışma Alanları', global: false, removable: true,
    variants: [
      { id: 'card_grid',  name: 'Kart Grid',   description: 'İkon + isim + açıklama kartları', plan: 'free',    sectors: ['avukat'], defaultAnimation: 'stagger' },
      { id: 'list',       name: 'Liste',        description: 'Sol ikon + sağ metin listesi', plan: 'free',    sectors: ['avukat'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'areas', type: 'array', label: 'Alanlar' },
      { path: 'areas[].name', type: 'text', label: 'Alan Adı' },
      { path: 'areas[].description', type: 'text', label: 'Açıklama' },
    ],
  },

  {
    type: 'case_results' as SectionType, nameTr: 'Dava Sonuçları', global: false, removable: true,
    variants: [
      { id: 'stats_row', name: 'Rakam Sırası', description: 'Büyük rakamlar + açıklama', plan: 'growth', sectors: ['avukat'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'cases', type: 'array', label: 'Davalar' },
      { path: 'disclaimer', type: 'text', label: 'Sorumluluk Reddi' },
    ],
  },

  {
    type: 'confidentiality' as SectionType, nameTr: 'Gizlilik Güvencesi', global: false, removable: true,
    variants: [
      { id: 'banner', name: 'Bant', description: 'Tam genişlik güven bandı', plan: 'free', sectors: ['avukat','psikolog','muhasebeci'], defaultAnimation: 'fadeIn' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'description', type: 'text', label: 'Açıklama' },
    ],
  },

  {
    type: 'tax_calendar' as SectionType, nameTr: 'Vergi Takvimi', global: false, removable: true,
    variants: [
      { id: 'timeline', name: 'Zaman Çizelgesi', description: 'Kalan gün badge\'leri ile liste', plan: 'starter', sectors: ['muhasebeci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'deadlines', type: 'array', label: 'Son Tarihler' },
    ],
  },

  {
    type: 'free_quote' as SectionType, nameTr: 'Ücretsiz Teklif', global: false, removable: true,
    variants: [
      { id: 'form',    name: 'Form',    description: 'Teklif talep formu', plan: 'free',    sectors: ['sigorta','muhasebeci','dugun','catering'], defaultAnimation: 'fadeUp' },
      { id: 'split',   name: 'Bölünmüş',description: 'Sol form, sağ bilgi', plan: 'starter', sectors: ['sigorta','muhasebeci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'fields', type: 'array', label: 'Form Alanları' },
      { path: 'submitText', type: 'text', label: 'Gönder Butonu' },
    ],
  },

  // ── CLUSTER F: Eğitim + Spor ──

  {
    type: 'class_schedule' as SectionType, nameTr: 'Ders Programı', global: false, removable: true,
    variants: [
      { id: 'table',      name: 'Tablo',      description: 'Haftalık tablo formatı', plan: 'starter', sectors: ['spor','yoga','yuzme','dil','ozelders','muzik','halisaha'], defaultAnimation: 'fadeUp' },
      { id: 'day_tabs',   name: 'Gün Tab',    description: 'Gün seçici + slot listesi', plan: 'free',    sectors: ['spor','yoga','yuzme','dil','ozelders','muzik','halisaha'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'schedule', type: 'array', label: 'Program' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  {
    type: 'membership_pricing' as SectionType, nameTr: 'Üyelik Paketleri', global: false, removable: true,
    variants: [
      { id: 'columns',    name: 'Kolon',      description: '2-3 paket kolon', plan: 'free',    sectors: ['spor','yoga','yuzme','dil','ozelders','muzik','halisaha','surucu'], defaultAnimation: 'stagger' },
      { id: 'toggle',     name: 'Aylık/Yıllık',description: 'Toggle ile periyod seçimi', plan: 'growth',  sectors: ['spor','yoga','yuzme','dil'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'packages', type: 'array', label: 'Paketler' },
      { path: 'note', type: 'text', label: 'Not' },
    ],
  },

  {
    type: 'transformation' as SectionType, nameTr: 'Dönüşüm Hikayeleri', global: false, removable: true,
    variants: [
      { id: 'carousel', name: 'Carousel', description: 'Before/after slider + bilgi', plan: 'growth', sectors: ['spor'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'stories', type: 'array', label: 'Hikayeler' },
    ],
  },

  {
    type: 'success_stories' as SectionType, nameTr: 'Başarı Hikayeleri', global: false, removable: true,
    variants: [
      { id: 'cards',    name: 'Kartlar',    description: 'Before→after puan kartları', plan: 'free',    sectors: ['ozelders','surucu','dil','muzik'], defaultAnimation: 'stagger' },
      { id: 'carousel', name: 'Carousel',   description: 'Başarı hikayesi slider', plan: 'starter', sectors: ['ozelders','surucu','dil'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'stories', type: 'array', label: 'Hikayeler' },
    ],
  },

  {
    type: 'free_trial' as SectionType, nameTr: 'Ücretsiz Deneme', global: false, removable: true,
    variants: [
      { id: 'banner', name: 'Bant', description: 'CTA bant formatı', plan: 'free', sectors: ['spor','yoga','ozelders','dil','muzik'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'subtitle', type: 'text', label: 'Alt Başlık' },
      { path: 'cta.text', type: 'text', label: 'Buton Metni' },
    ],
  },

  {
    type: 'level_path' as SectionType, nameTr: 'Seviye Yolu', global: false, removable: true,
    variants: [
      { id: 'stepper', name: 'Stepper', description: 'Yatay seviye adımları', plan: 'starter', sectors: ['dil'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'levels', type: 'array', label: 'Seviyeler' },
    ],
  },

  // ── CLUSTER G: Emlak ──

  {
    type: 'property_search' as SectionType, nameTr: 'İlan Arama', global: false, removable: true,
    variants: [
      { id: 'hero_search', name: 'Hero Arama', description: 'Büyük arama barı + filtreler', plan: 'growth', sectors: ['emlakci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'searchButtonText', type: 'text', label: 'Ara Butonu' },
    ],
  },

  {
    type: 'property_listing' as SectionType, nameTr: 'İlan Listesi', global: false, removable: true,
    variants: [
      { id: 'card_grid', name: 'Kart Grid', description: 'İlan kartları grid', plan: 'starter', sectors: ['emlakci'], defaultAnimation: 'stagger' },
      { id: 'list',      name: 'Liste',     description: 'Yatay liste formatı', plan: 'free',    sectors: ['emlakci'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'properties', type: 'array', label: 'İlanlar' },
      { path: 'viewAllText', type: 'text', label: 'Tümünü Gör Metni' },
    ],
  },

  // ── CLUSTER H: Kuyumcu ──

  {
    type: 'gold_price_ticker' as SectionType, nameTr: 'Altın Fiyat Bandı', global: false, removable: true,
    variants: [
      { id: 'top_bar',  name: 'Üst Bant',   description: 'Header altı yatay scroll bant', plan: 'starter', sectors: ['kuyumcu'], defaultAnimation: 'none' },
      { id: 'card',     name: 'Kart',        description: 'Fiyat kartları grid', plan: 'free',    sectors: ['kuyumcu'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'prices', type: 'array', label: 'Fiyatlar' },
      { path: 'source', type: 'text', label: 'Kaynak' },
    ],
  },

  {
    type: 'jewelry_grid' as SectionType, nameTr: 'Mücevherat Vitrini', global: false, removable: true,
    variants: [
      { id: 'filtered_grid', name: 'Filtreli Grid', description: 'Kategori tab + ürün kartları', plan: 'starter', sectors: ['kuyumcu'], defaultAnimation: 'stagger' },
      { id: 'carousel',      name: 'Carousel',      description: 'Ürün slider', plan: 'free',    sectors: ['kuyumcu'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'products', type: 'array', label: 'Ürünler' },
      { path: 'categories', type: 'array', label: 'Kategoriler' },
    ],
  },

  // ── CLUSTER I: Kurumsal ──

  {
    type: 'multi_location' as SectionType, nameTr: 'Şubelerimiz', global: false, removable: true,
    variants: [
      { id: 'map_list', name: 'Harita + Liste', description: 'Sol şube kartları, sağ harita', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'fadeUp' },
      { id: 'grid',     name: 'Grid',           description: 'Şube kartları grid', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'locations', type: 'array', label: 'Şubeler' },
    ],
  },

  {
    type: 'career_listings' as SectionType, nameTr: 'Kariyer Fırsatları', global: false, removable: true,
    variants: [
      { id: 'accordion', name: 'Accordion', description: 'İlan accordion listesi', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'positions', type: 'array', label: 'Pozisyonlar' },
    ],
  },

  {
    type: 'franchise_section' as SectionType, nameTr: 'Bayilik', global: false, removable: true,
    variants: [
      { id: 'split', name: 'Bölünmüş', description: 'Sol bilgi + sağ görsel', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'fadeUp' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'benefits', type: 'array', label: 'Avantajlar' },
      { path: 'cta.text', type: 'text', label: 'Buton Metni' },
    ],
  },

  {
    type: 'loyalty_program' as SectionType, nameTr: 'Sadakat Programı', global: false, removable: true,
    variants: [
      { id: 'tiers', name: 'Kademeler', description: 'Bronz/Gümüş/Altın kademeler', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'title', type: 'text', label: 'Başlık' },
      { path: 'description', type: 'text', label: 'Açıklama' },
      { path: 'tiers', type: 'array', label: 'Kademeler' },
    ],
  },

  {
    type: 'quick_access_cards' as SectionType, nameTr: 'Hızlı Erişim', global: false, removable: true,
    variants: [
      { id: 'icon_grid', name: 'İkon Grid', description: '4 kart ikon grid', plan: 'enterprise', sectors: ['*'], defaultAnimation: 'stagger' },
    ],
    editableFields: [
      { path: 'cards', type: 'array', label: 'Kartlar' },
      { path: 'cards[].title', type: 'text', label: 'Başlık' },
      { path: 'cards[].href', type: 'link', label: 'Link' },
    ],
  },
]

// ═══════════════════════════════════════════
// CROSS-SECTOR REUSE MAP
// ═══════════════════════════════════════════

/**
 * Maps sector section types to their applicable sectors.
 * '*' means all sectors (enterprise plans).
 */
export const CROSS_SECTOR_MAP: Record<string, string[]> = {
  before_after:        ['berber','guzellik','disci','terzi','oto','klima'],
  booking:             ['berber','guzellik','doktor','disci','psikolog','veteriner'],
  portfolio_grid:      ['fotografci','mimarlik','dugun','guzellik'],
  menu_display:        ['restoran','kafe','firin','fastfood','bar','kasap'],
  emergency_banner:    ['oto','elektrikci','tesisatci','klima','cilingir','veteriner'],
  class_schedule:      ['spor','yoga','yuzme','dil','ozelders','muzik','halisaha'],
  membership_pricing:  ['spor','yoga','yuzme','dil','ozelders','surucu','muzik'],
  success_stories:     ['ozelders','surucu','dil','muzik'],
  confidentiality:     ['avukat','psikolog','muhasebeci'],
  insurance_logos:     ['doktor','disci','eczane','optik'],
  certifications:      ['elektrikci','tesisatci','klima','oto','avukat','muhasebeci'],
  service_area:        ['elektrikci','tesisatci','klima','cilingir'],
  warranty_badge:      ['oto','elektrikci','tesisatci','klima','telefon'],
  multi_location:      ['*'],
  career_listings:     ['*'],
  franchise_section:   ['*'],
  quick_access_cards:  ['*'],
}

/** Get all sector-specific sections applicable to a given sector */
export function getSectorSections(sector: string): SectionDef[] {
  return SECTOR_SECTIONS.filter(s =>
    s.variants.some(v =>
      v.sectors.includes('*') || v.sectors.includes(sector)
    )
  )
}
