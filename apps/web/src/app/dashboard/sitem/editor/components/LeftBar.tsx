'use client'

import { useState, useMemo } from 'react'
import { useEditorStore } from '../store/editor-store'
import { SEKTORLER, type Sektor } from '@/data/sektorler'
import { DEMOLAR } from '@/data/demoVitrinData'
import MediaPanel from './MediaPanel'

/* ── Section Thumbnail SVG Previews ── */
function SectionThumbnail({ type, accent = '#3b82f6' }: { type: string; accent?: string }) {
    const w = 120, h = 68
    const bg = '#f1f5f9', line = '#cbd5e1', dark = '#64748b'
    const common = { width: w, height: h, viewBox: `0 0 ${w} ${h}`, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }

    const THUMBNAILS: Record<string, React.ReactNode> = {
        'form': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="10" y="8" width="45" height="6" rx="2" fill={dark} />
                <rect x="10" y="20" width="100" height="8" rx="2" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="10" y="32" width="100" height="8" rx="2" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="10" y="44" width="100" height="14" rx="2" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="65" y="48" width="40" height="6" rx="2" fill={line} opacity="0.5" />
            </svg>
        ),
        'chat': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="55" y="6" width="58" height="14" rx="7" fill={accent} />
                <rect x="60" y="10" width="30" height="3" rx="1" fill="#fff" />
                <rect x="7" y="24" width="50" height="14" rx="7" fill="#e2e8f0" />
                <rect x="12" y="28" width="25" height="3" rx="1" fill={dark} />
                <rect x="55" y="42" width="58" height="14" rx="7" fill={accent} opacity="0.7" />
                <rect x="60" y="46" width="35" height="3" rx="1" fill="#fff" />
            </svg>
        ),
        'map': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill="#d1fae5" />
                <path d="M20 15 L50 10 L80 20 L100 15 L100 55 L80 50 L50 58 L20 50 Z" fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1" />
                <circle cx="60" cy="32" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                <path d="M37 40 Q50 25 63 35" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="2 2" />
            </svg>
        ),
        'clock': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <circle cx="30" cy="34" r="18" fill="#fff" stroke={line} strokeWidth="1.5" />
                <line x1="30" y1="34" x2="30" y2="22" stroke={dark} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="30" y1="34" x2="38" y2="34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="30" cy="34" r="2" fill={accent} />
                <rect x="58" y="16" width="50" height="4" rx="1" fill={dark} />
                <rect x="58" y="24" width="40" height="3" rx="1" fill={line} />
                <rect x="58" y="32" width="50" height="4" rx="1" fill={dark} />
                <rect x="58" y="40" width="40" height="3" rx="1" fill={line} />
                <rect x="58" y="48" width="35" height="3" rx="1" fill={line} />
            </svg>
        ),
        'gallery': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="6" y="6" width="34" height="26" rx="3" fill="#ddd6fe" />
                <rect x="44" y="6" width="34" height="26" rx="3" fill="#bfdbfe" />
                <rect x="82" y="6" width="32" height="26" rx="3" fill="#fecaca" />
                <rect x="6" y="36" width="34" height="26" rx="3" fill="#d9f99d" />
                <rect x="44" y="36" width="34" height="26" rx="3" fill="#fbcfe8" />
                <rect x="82" y="36" width="32" height="26" rx="3" fill="#fde68a" />
                <circle cx="16" cy="16" r="4" fill="#a78bfa" opacity="0.5" />
                <circle cx="54" cy="16" r="4" fill="#60a5fa" opacity="0.5" />
            </svg>
        ),
        'video': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill="#1e293b" />
                <rect x="8" y="8" width="104" height="52" rx="4" fill="#334155" />
                <polygon points="52,26 52,42 68,34" fill="#fff" opacity="0.8" />
                <circle cx="60" cy="34" r="14" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
            </svg>
        ),
        'blog': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="6" y="6" width="50" height="28" rx="3" fill="#e0e7ff" />
                <rect x="6" y="38" width="30" height="3" rx="1" fill={dark} />
                <rect x="6" y="44" width="50" height="2" rx="1" fill={line} />
                <rect x="6" y="49" width="40" height="2" rx="1" fill={line} />
                <rect x="64" y="6" width="50" height="28" rx="3" fill="#fce7f3" />
                <rect x="64" y="38" width="30" height="3" rx="1" fill={dark} />
                <rect x="64" y="44" width="50" height="2" rx="1" fill={line} />
                <rect x="64" y="49" width="40" height="2" rx="1" fill={line} />
            </svg>
        ),
        'team': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <circle cx="25" cy="22" r="10" fill="#dbeafe" />
                <circle cx="25" cy="19" r="4" fill="#93c5fd" />
                <rect x="10" y="36" width="30" height="3" rx="1" fill={dark} />
                <rect x="14" y="42" width="22" height="2" rx="1" fill={line} />
                <circle cx="65" cy="22" r="10" fill="#fce7f3" />
                <circle cx="65" cy="19" r="4" fill="#f9a8d4" />
                <rect x="50" y="36" width="30" height="3" rx="1" fill={dark} />
                <rect x="54" y="42" width="22" height="2" rx="1" fill={line} />
                <circle cx="100" cy="22" r="10" fill="#d9f99d" />
                <circle cx="100" cy="19" r="4" fill="#a3e635" />
                <rect x="88" y="36" width="24" height="3" rx="1" fill={dark} />
            </svg>
        ),
        'pricing': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="6" y="6" width="32" height="56" rx="3" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="11" y="11" width="22" height="3" rx="1" fill={dark} />
                <rect x="11" y="18" width="16" height="6" rx="1" fill={accent} opacity="0.2" />
                <rect x="11" y="28" width="18" height="2" rx="1" fill={line} />
                <rect x="11" y="33" width="18" height="2" rx="1" fill={line} />
                <rect x="44" y="4" width="32" height="60" rx="3" fill="#fff" stroke={accent} strokeWidth="1.5" />
                <rect x="49" y="9" width="22" height="3" rx="1" fill={dark} />
                <rect x="49" y="16" width="16" height="6" rx="1" fill={accent} />
                <rect x="49" y="26" width="18" height="2" rx="1" fill={line} />
                <rect x="49" y="31" width="18" height="2" rx="1" fill={line} />
                <rect x="49" y="36" width="18" height="2" rx="1" fill={line} />
                <rect x="82" y="6" width="32" height="56" rx="3" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="87" y="11" width="22" height="3" rx="1" fill={dark} />
                <rect x="87" y="18" width="16" height="6" rx="1" fill={accent} opacity="0.2" />
            </svg>
        ),
        'stats': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="8" y="30" width="16" height="28" rx="2" fill={accent} opacity="0.3" />
                <rect x="30" y="20" width="16" height="38" rx="2" fill={accent} opacity="0.5" />
                <rect x="52" y="10" width="16" height="48" rx="2" fill={accent} opacity="0.7" />
                <rect x="74" y="22" width="16" height="36" rx="2" fill={accent} opacity="0.4" />
                <rect x="96" y="14" width="16" height="44" rx="2" fill={accent} />
                <rect x="8" y="8" width="40" height="4" rx="1" fill={dark} />
            </svg>
        ),
        'reviews': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="8" y="8" width="46" height="52" rx="4" fill="#fff" stroke={line} strokeWidth="1" />
                <path d="M20 18 L22.5 23 L28 23 L23.5 26.5 L25 32 L20 28.5 L15 32 L16.5 26.5 L12 23 L17.5 23 Z" fill="#fbbf24" />
                <rect x="13" y="36" width="36" height="2" rx="1" fill={line} />
                <rect x="13" y="41" width="30" height="2" rx="1" fill={line} />
                <rect x="66" y="8" width="46" height="52" rx="4" fill="#fff" stroke={line} strokeWidth="1" />
                <path d="M78 18 L80.5 23 L86 23 L81.5 26.5 L83 32 L78 28.5 L73 32 L74.5 26.5 L70 23 L75.5 23 Z" fill="#fbbf24" />
                <rect x="71" y="36" width="36" height="2" rx="1" fill={line} />
                <rect x="71" y="41" width="30" height="2" rx="1" fill={line} />
            </svg>
        ),
        'faq': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="8" y="8" width="104" height="14" rx="3" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="14" y="12" width="60" height="3" rx="1" fill={dark} />
                <text x="104" y="18" fill={dark} fontSize="10" fontWeight="bold">+</text>
                <rect x="8" y="26" width="104" height="14" rx="3" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1" />
                <rect x="14" y="30" width="50" height="3" rx="1" fill={accent} />
                <text x="104" y="36" fill={accent} fontSize="10" fontWeight="bold">−</text>
                <rect x="8" y="44" width="104" height="14" rx="3" fill="#fff" stroke={line} strokeWidth="1" />
                <rect x="14" y="48" width="55" height="3" rx="1" fill={dark} />
                <text x="104" y="54" fill={dark} fontSize="10" fontWeight="bold">+</text>
            </svg>
        ),
        'cta': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill="#1e293b" />
                <rect x="25" y="12" width="70" height="6" rx="2" fill="#fff" />
                <rect x="30" y="22" width="60" height="3" rx="1" fill="#94a3b8" />
                <rect x="35" y="36" width="50" height="16" rx="8" fill={accent} />
                <rect x="45" y="41" width="30" height="4" rx="1" fill="#fff" />
            </svg>
        ),
        'menu': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="6" y="6" width="50" height="4" rx="1" fill={dark} />
                <rect x="6" y="16" width="50" height="22" rx="3" fill="#fef3c7" />
                <rect x="60" y="18" width="35" height="3" rx="1" fill={dark} />
                <rect x="60" y="24" width="50" height="2" rx="1" fill={line} />
                <rect x="95" y="18" width="16" height="3" rx="1" fill={accent} />
                <rect x="6" y="42" width="50" height="22" rx="3" fill="#fce7f3" />
                <rect x="60" y="44" width="35" height="3" rx="1" fill={dark} />
                <rect x="60" y="50" width="50" height="2" rx="1" fill={line} />
                <rect x="95" y="44" width="16" height="3" rx="1" fill={accent} />
            </svg>
        ),
        'products': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="6" y="6" width="32" height="32" rx="3" fill="#e0e7ff" />
                <rect x="6" y="42" width="20" height="3" rx="1" fill={dark} />
                <rect x="6" y="48" width="14" height="3" rx="1" fill={accent} />
                <rect x="44" y="6" width="32" height="32" rx="3" fill="#fce7f3" />
                <rect x="44" y="42" width="20" height="3" rx="1" fill={dark} />
                <rect x="44" y="48" width="14" height="3" rx="1" fill={accent} />
                <rect x="82" y="6" width="32" height="32" rx="3" fill="#d9f99d" />
                <rect x="82" y="42" width="20" height="3" rx="1" fill={dark} />
                <rect x="82" y="48" width="14" height="3" rx="1" fill={accent} />
            </svg>
        ),
        'hero': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill="#1e293b" />
                <rect x="10" y="14" width="60" height="7" rx="2" fill="#fff" />
                <rect x="10" y="26" width="45" height="3" rx="1" fill="#94a3b8" />
                <rect x="10" y="32" width="50" height="3" rx="1" fill="#94a3b8" />
                <rect x="10" y="42" width="32" height="12" rx="6" fill={accent} />
                <rect x="16" y="46" width="20" height="3" rx="1" fill="#fff" />
                <rect x="80" y="10" width="32" height="48" rx="4" fill="#334155" />
            </svg>
        ),
        'default': (
            <svg {...common}>
                <rect width={w} height={h} rx="4" fill={bg} />
                <rect x="10" y="10" width="100" height="6" rx="2" fill={dark} opacity="0.5" />
                <rect x="10" y="22" width="80" height="3" rx="1" fill={line} />
                <rect x="10" y="28" width="90" height="3" rx="1" fill={line} />
                <rect x="10" y="38" width="40" height="10" rx="3" fill={accent} opacity="0.2" />
                <rect x="56" y="38" width="40" height="10" rx="3" fill={accent} opacity="0.15" />
                <rect x="10" y="52" width="60" height="3" rx="1" fill={line} />
            </svg>
        ),
    }

    return <>{THUMBNAILS[type] || THUMBNAILS['default']}</>
}

/* ── Module → Thumbnail Type Mapping ── */
const MODUL_THUMBNAIL: Record<string, string> = {
    'iletisim-formu': 'form', 'whatsapp-canli': 'chat', 'whatsapp-teklif': 'chat',
    'harita-yol-tarifi': 'map', 'calisma-saatleri': 'clock', 'bize-ulasin-sticky': 'cta',
    'acil-buton': 'cta', 'canli-destek': 'chat', 'randevu': 'form', 'online-rezervasyon': 'form',
    'online-danisma': 'video', 'galeri': 'gallery', 'instagram-feed': 'gallery',
    'video-tanitim': 'video', 'blog-makaleler': 'blog', 'hakkimizda-hikaye': 'hero',
    'ekip-uyeleri': 'team', 'rakamlarla-biz': 'stats', 'sertifika-belgeler': 'reviews',
    'hizmet-fiyat-listesi': 'pricing', 'paket-listesi': 'pricing', 'uyelik-paketleri': 'pricing',
    'menu': 'menu', 'qr-menu': 'menu', 'katalog': 'products', 'ders-programi': 'clock',
    'urun-listesi': 'products', 'online-odeme': 'form', 'siparis-linki': 'cta',
    'indirim-kuponu': 'cta', 'google-yorumlar': 'reviews', 'musteri-referanslari': 'reviews',
    'sss-genis': 'faq', 'anket-form': 'form', 'musteri-anketi': 'form', 'teklif-formu': 'form',
    'kampanya-afisi': 'hero', 'duyuru-bandi': 'cta', 'eposta-bulteni': 'form',
    'geri-sayim': 'stats', 'sosyal-medya': 'cta', 'kvkk-gizlilik': 'blog',
    'cerez-bildirimi': 'cta', 'hizmet-bolgeleri': 'map', 'oncesi-sonrasi-slider': 'gallery',
    'proje-portfoy': 'gallery', 'kariyer-ilanlari': 'blog', 'sikca-arananlar': 'faq',
    'yol-haritasi': 'stats', 'gunun-ozel': 'cta', 'masadan-siparis': 'menu',
    'kds-mutfak-ekrani': 'stats', 'garson-dispatch': 'team', 'masa-yasam-dongusu': 'stats',
    'dijital-bahsis': 'pricing', 'kpi-sla-radari': 'stats', 'salon-radari': 'map',
    'platform-sendikasyonu': 'products', 'musteri-eslestirme-crm': 'team',
    'degerleme-motoru': 'stats', 'danisman-performans': 'stats', 'portfoy-yonetimi': 'products',
}

/* ── Module Display Info ── */
const MODUL_BILGI: Record<string, { ad: string; aciklama: string; kategori: string }> = {
    // İletişim
    'iletisim-formu': { ad: 'İletişim Formu', aciklama: 'İsim, e-posta, mesaj formu', kategori: 'İletişim' },
    'whatsapp-canli': { ad: 'WhatsApp Canlı', aciklama: 'Anlık mesajlaşma widget', kategori: 'İletişim' },
    'whatsapp-teklif': { ad: 'WhatsApp Teklif', aciklama: 'Tek tıkla WhatsApp', kategori: 'İletişim' },
    'harita-yol-tarifi': { ad: 'Harita', aciklama: 'Konum ve yol tarifi', kategori: 'İletişim' },
    'calisma-saatleri': { ad: 'Çalışma Saatleri', aciklama: 'Haftalık program', kategori: 'İletişim' },
    'bize-ulasin-sticky': { ad: 'Sticky İletişim', aciklama: 'Sabit alt bar', kategori: 'İletişim' },
    'acil-buton': { ad: 'Acil Buton', aciklama: '7/24 acil arama', kategori: 'İletişim' },
    'canli-destek': { ad: 'Canlı Destek', aciklama: 'Chat widget', kategori: 'İletişim' },

    // Randevu & Rezervasyon
    'randevu': { ad: 'Randevu Sistemi', aciklama: 'Online randevu al', kategori: 'Randevu' },
    'online-rezervasyon': { ad: 'Online Rezervasyon', aciklama: 'Masa/alan ayırtma', kategori: 'Randevu' },
    'online-danisma': { ad: 'Online Danışma', aciklama: 'Video görüşme', kategori: 'Randevu' },

    // İçerik & Tanıtım
    'galeri': { ad: 'Galeri', aciklama: 'Fotoğraf galerisi', kategori: 'İçerik' },
    'instagram-feed': { ad: 'Instagram Feed', aciklama: 'IG postları', kategori: 'İçerik' },
    'video-tanitim': { ad: 'Video Tanıtım', aciklama: 'Tanıtım videosu', kategori: 'İçerik' },
    'blog-makaleler': { ad: 'Blog', aciklama: 'Makale ve yazılar', kategori: 'İçerik' },
    'hakkimizda-hikaye': { ad: 'Hakkımızda', aciklama: 'İşletme hikayesi', kategori: 'İçerik' },
    'ekip-uyeleri': { ad: 'Ekip', aciklama: 'Ekip tanıtımı', kategori: 'İçerik' },
    'rakamlarla-biz': { ad: 'Rakamlarla Biz', aciklama: 'İstatistikler', kategori: 'İçerik' },
    'sertifika-belgeler': { ad: 'Sertifikalar', aciklama: 'Belgeler & ödüller', kategori: 'İçerik' },

    // Hizmetler & Fiyat
    'hizmet-fiyat-listesi': { ad: 'Fiyat Listesi', aciklama: 'Hizmet fiyatları', kategori: 'Hizmetler' },
    'paket-listesi': { ad: 'Paket Listesi', aciklama: 'Paket karşılaştırma', kategori: 'Hizmetler' },
    'uyelik-paketleri': { ad: 'Üyelik Paketleri', aciklama: 'Üyelik planları', kategori: 'Hizmetler' },
    'menu': { ad: 'Menü', aciklama: 'Yemek/içecek menüsü', kategori: 'Hizmetler' },
    'qr-menu': { ad: 'QR Menü', aciklama: 'QR kod ile menü', kategori: 'Hizmetler' },
    'katalog': { ad: 'Katalog', aciklama: 'Ürün kataloğu', kategori: 'Hizmetler' },
    'ders-programi': { ad: 'Ders Programı', aciklama: 'Haftalık program', kategori: 'Hizmetler' },

    // E-Ticaret & Satış
    'urun-listesi': { ad: 'Ürün Listesi', aciklama: 'Ürün vitrini', kategori: 'Satış' },
    'online-odeme': { ad: 'Online Ödeme', aciklama: 'Ödeme sistemi', kategori: 'Satış' },
    'siparis-linki': { ad: 'Sipariş Linki', aciklama: 'Hızlı sipariş', kategori: 'Satış' },
    'indirim-kuponu': { ad: 'İndirim Kuponu', aciklama: 'Kampanya kodu', kategori: 'Satış' },

    // Etkileşim
    'google-yorumlar': { ad: 'Google Yorumlar', aciklama: 'Müşteri yorumları', kategori: 'Etkileşim' },
    'musteri-referanslari': { ad: 'Referanslar', aciklama: 'Müşteri referansları', kategori: 'Etkileşim' },
    'sss-genis': { ad: 'SSS', aciklama: 'Sık sorulanlar', kategori: 'Etkileşim' },
    'anket-form': { ad: 'Anket', aciklama: 'Müşteri anketi', kategori: 'Etkileşim' },
    'musteri-anketi': { ad: 'Değerlendirme', aciklama: 'Memnuniyet anketi', kategori: 'Etkileşim' },
    'teklif-formu': { ad: 'Teklif Formu', aciklama: 'Fiyat teklifi al', kategori: 'Etkileşim' },

    // Pazarlama
    'kampanya-afisi': { ad: 'Kampanya', aciklama: 'Kampanya banner', kategori: 'Pazarlama' },
    'duyuru-bandi': { ad: 'Duyuru Bandı', aciklama: 'Üst bilgi çubuğu', kategori: 'Pazarlama' },
    'eposta-bulteni': { ad: 'E-posta Bülteni', aciklama: 'Abone formu', kategori: 'Pazarlama' },
    'geri-sayim': { ad: 'Geri Sayım', aciklama: 'Kampanya sayacı', kategori: 'Pazarlama' },
    'sosyal-medya': { ad: 'Sosyal Medya', aciklama: 'SM linkleri', kategori: 'Pazarlama' },

    // Yasal
    'kvkk-gizlilik': { ad: 'KVKK', aciklama: 'Gizlilik politikası', kategori: 'Yasal' },
    'cerez-bildirimi': { ad: 'Çerez Bildirimi', aciklama: 'Cookie banner', kategori: 'Yasal' },

    // Diğer
    'hizmet-bolgeleri': { ad: 'Hizmet Bölgeleri', aciklama: 'Servis alanları', kategori: 'Diğer' },
    'oncesi-sonrasi-slider': { ad: 'Önce/Sonra', aciklama: 'Karşılaştırma slider', kategori: 'Diğer' },
    'proje-portfoy': { ad: 'Portföy', aciklama: 'Proje portföyü', kategori: 'Diğer' },
    'kariyer-ilanlari': { ad: 'Kariyer', aciklama: 'İş ilanları', kategori: 'Diğer' },
    'sikca-arananlar': { ad: 'Aramanlar', aciklama: 'Popüler aramalar', kategori: 'Diğer' },
    'yol-haritasi': { ad: 'Yol Haritası', aciklama: 'Gelişim planı', kategori: 'Diğer' },
    'gunun-ozel': { ad: 'Günün Özel', aciklama: 'Günlük fırsat', kategori: 'Pazarlama' },

    // Premium+ Restoran
    'masadan-siparis': { ad: 'Masadan Sipariş', aciklama: 'QR ile sipariş', kategori: 'Premium+' },
    'kds-mutfak-ekrani': { ad: 'KDS Mutfak', aciklama: 'Mutfak ekranı', kategori: 'Premium+' },
    'garson-dispatch': { ad: 'Garson Dispatch', aciklama: 'Otonom dağıtım', kategori: 'Premium+' },
    'masa-yasam-dongusu': { ad: 'Masa Döngüsü', aciklama: '8 aşamalı takip', kategori: 'Premium+' },
    'dijital-bahsis': { ad: 'Dijital Bahşiş', aciklama: 'Bahşiş motoru', kategori: 'Premium+' },
    'kpi-sla-radari': { ad: 'KPI Radarı', aciklama: 'Performans analiz', kategori: 'Premium+' },
    'salon-radari': { ad: 'Salon Radarı', aciklama: 'Kuşbakışı salon', kategori: 'Premium+' },

    // Premium+ Emlak
    'platform-sendikasyonu': { ad: 'İlan Sendikasyon', aciklama: 'Çoklu platform', kategori: 'Premium+' },
    'musteri-eslestirme-crm': { ad: 'CRM Eşleştirme', aciklama: 'AI müşteri eşleme', kategori: 'Premium+' },
    'degerleme-motoru': { ad: 'Değerleme', aciklama: 'Otomatik değerleme', kategori: 'Premium+' },
    'danisman-performans': { ad: 'Danışman Performans', aciklama: 'Komisyon takibi', kategori: 'Premium+' },
    'portfoy-yonetimi': { ad: 'Portföy Yönetimi', aciklama: 'Mülk envanter', kategori: 'Premium+' },
}

/* ── Package tier → max free modules ── */
const PAKET_MODUL_LIMITI: Record<string, number> = {
    'TEMEL': 5,
    'STANDART': 10,
    'BUYUME': 18,
    'PREMIUM': 30,
    'PREMIUMPLUS': 999,
}

const LEFT_BAR_ITEMS = [
    { id: 'modules', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" /><rect x="12" y="3" width="7" height="7" rx="2" fill="currentColor" opacity=".5" /><rect x="3" y="12" width="7" height="7" rx="2" fill="currentColor" opacity=".5" /><rect x="12" y="12" width="7" height="7" rx="2" fill="currentColor" opacity=".3" /></svg>), label: 'Modüller' },
    { id: 'design', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="7" r="4" fill="#3B82F6" /><circle cx="14" cy="7" r="4" fill="#F59E0B" /><circle cx="11" cy="13" r="4" fill="#10B981" /></svg>), label: 'Tasarım' },
    { id: 'pages', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="2" width="14" height="18" rx="2" fill="currentColor" /><rect x="7" y="8" width="8" height="1.5" rx=".5" fill="#fff" /><rect x="7" y="12" width="8" height="1.5" rx=".5" fill="#fff" /></svg>), label: 'Sayfalar' },
    { id: 'media', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="4" width="18" height="14" rx="2" fill="currentColor" /><circle cx="7.5" cy="9" r="1.5" fill="#fff" /><path d="M2 15l5-4 3 2 5-4 5 4v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-1z" fill="#fff" opacity=".6" /></svg>), label: 'Medya' },
    { id: 'embed', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8 6l-5 5 5 5M14 6l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>), label: 'Kod' },
    { id: 'apps', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" fill="currentColor" /><rect x="13" y="3" width="6" height="6" rx="1.5" fill="currentColor" opacity=".6" /><rect x="3" y="13" width="6" height="6" rx="1.5" fill="currentColor" opacity=".6" /><rect x="13" y="13" width="6" height="6" rx="3" fill="currentColor" opacity=".3" /></svg>), label: 'Eklentiler' },
    { id: 'seo', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="9" r="5" stroke="currentColor" strokeWidth="2" /><path d="M14.5 13.5L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="4" y="18" width="14" height="2" rx="1" fill="currentColor" opacity=".3" /></svg>), label: 'SEO' },
    { id: 'cms', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" /><rect x="6" y="6" width="10" height="3" rx="1" fill="currentColor" /><rect x="6" y="11" width="6" height="2" rx=".5" fill="currentColor" opacity=".4" /><rect x="6" y="15" width="8" height="2" rx=".5" fill="currentColor" opacity=".3" /></svg>), label: 'CMS' },
    { id: 'inbox', icon: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9l8 4 8-4" stroke="currentColor" strokeWidth="1.5" /><circle cx="17" cy="5" r="3" fill="#ef4444" /><text x="17" y="7" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle">3</text></svg>), label: 'Mesajlar' },
]

export default function LeftBar() {
    const activeLeftPanel = useEditorStore(s => s.activeLeftPanel)
    const setActiveLeftPanel = useEditorStore(s => s.setActiveLeftPanel)

    return (
        <>
            <style>{`
                .ke-left { display: flex; height: 100%; flex-shrink: 0; }
                .ke-lb-icons { width: 62px; background: #f5f7fa; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; padding: 10px 0; gap: 4px; flex-shrink: 0; }
                .ke-lb-btn { width: 50px; height: 52px; border-radius: 10px; border: none; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; transition: all 0.15s; position: relative; font-family: inherit; color: #64748b; }
                .ke-lb-btn:hover { background: #e8edf3; color: #334155; }
                .ke-lb-btn.active { background: #dbeafe; color: #2563eb; }
                .ke-lb-btn-label { font-size: 9px; font-weight: 700; letter-spacing: -0.01em; max-width: 48px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1; }

                .ke-lb-panel { width: 340px; background: #fff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden; animation: keSlideRight 0.2s ease-out; flex-shrink: 0; }
                @keyframes keSlideRight { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
                .ke-lb-panel-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid #e8ecf1; background: #fafbfc; }
                .ke-lb-panel-title { font-size: 14px; font-weight: 700; color: #17191c; }
                .ke-lb-close-btn { width: 28px; height: 28px; border: none; background: transparent; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: 0.15s; }
                .ke-lb-close-btn:hover { background: #f1f5f9; color: #17191c; }
                .ke-lb-panel-body { flex: 1; overflow-y: auto; }

                /* Module catalog */
                .ke-mod-search { margin: 12px; padding: 9px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; width: calc(100% - 24px); outline: none; font-family: inherit; background: #f8fafc; box-sizing: border-box; }
                .ke-mod-search:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.08); }
                .ke-mod-cat-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; padding: 16px 16px 6px; }
                .ke-mod-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 0 8px 8px; }
                .ke-mod-item { display: flex; flex-direction: column; padding: 0; border-radius: 10px; cursor: pointer; transition: all 0.2s; border: 1px solid #e8ecf1; position: relative; overflow: hidden; background: #fff; }
                .ke-mod-item:hover { border-color: #93c5fd; box-shadow: 0 2px 8px rgba(59,130,246,0.08); transform: translateY(-1px); }
                .ke-mod-item.active { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.12); }
                .ke-mod-item.locked { opacity: 0.45; cursor: default; }
                .ke-mod-item.locked:hover { background: #fef2f2; border-color: #fecaca; transform: none; box-shadow: none; }
                .ke-mod-thumb { width: 100%; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-bottom: 1px solid #f1f5f9; padding: 6px 4px; }
                .ke-mod-thumb svg { width: 100%; height: auto; display: block; border-radius: 3px; }
                .ke-mod-info { padding: 8px 10px; min-width: 0; }
                .ke-mod-name { font-size: 11px; font-weight: 700; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .ke-mod-desc { font-size: 9px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .ke-mod-lock { font-size: 10px; position: absolute; top: 6px; right: 6px; }
                .ke-mod-badge { font-size: 8px; font-weight: 800; padding: 2px 5px; border-radius: 4px; background: #fef3c7; color: #92400e; position: absolute; top: 6px; right: 6px; }
                .ke-mod-check { position: absolute; top: 6px; right: 6px; width: 18px; height: 18px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

                /* Paket info */
                .ke-paket-info { margin: 8px 12px; padding: 10px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; display: flex; align-items: center; gap: 8px; }
                .ke-paket-name { font-size: 12px; font-weight: 800; color: #166534; }
                .ke-paket-count { font-size: 10px; color: #15803d; }

                /* Design panel */
                .ke-design-section { padding: 16px; }
                .ke-design-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
                .ke-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
                .ke-theme-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 10px; cursor: pointer; text-align: center; transition: 0.15s; }
                .ke-theme-card:hover { border-color: #93c5fd; }
                .ke-theme-card.active { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
                .ke-theme-dots { display: flex; gap: 3px; justify-content: center; margin-bottom: 6px; }
                .ke-theme-dot { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.08); }
                .ke-theme-name { font-size: 10px; font-weight: 600; color: #475569; }
            `}</style>

            <div className="ke-left">
                <div className="ke-lb-icons">
                    {LEFT_BAR_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`ke-lb-btn${activeLeftPanel === item.id ? ' active' : ''}`}
                            onClick={() => setActiveLeftPanel(activeLeftPanel === item.id ? null : item.id)}
                            title={item.label}
                        >
                            {item.icon}
                            <span className="ke-lb-btn-label">{item.label}</span>
                        </button>
                    ))}
                </div>

                {activeLeftPanel && (
                    <div className="ke-lb-panel">
                        <div className="ke-lb-panel-head">
                            <span className="ke-lb-panel-title">
                                {activeLeftPanel === 'modules' && 'Modüller'}
                                {activeLeftPanel === 'design' && 'Site Tasarımı'}
                                {activeLeftPanel === 'pages' && 'Sayfalar'}
                                {activeLeftPanel === 'media' && 'Medya'}
                                {activeLeftPanel === 'embed' && 'Gömülü Kod'}
                                {activeLeftPanel === 'apps' && 'Eklentiler'}
                                {activeLeftPanel === 'seo' && 'SEO'}
                                {activeLeftPanel === 'cms' && 'Blog / İçerik'}
                                {activeLeftPanel === 'inbox' && 'Form Mesajları'}
                            </span>
                            <button className="ke-lb-close-btn" onClick={() => setActiveLeftPanel(null)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="ke-lb-panel-body">
                            {activeLeftPanel === 'modules' && <ModuleCatalog />}
                            {activeLeftPanel === 'design' && <DesignPanel />}
                            {activeLeftPanel === 'pages' && <PagesPanel />}
                            {activeLeftPanel === 'media' && <MediaPanel />}
                            {activeLeftPanel === 'embed' && <EmbedPanel />}
                            {activeLeftPanel === 'apps' && <AppMarketPanel />}
                            {activeLeftPanel === 'seo' && <SeoPanel />}
                            {activeLeftPanel === 'cms' && <CmsPanel />}
                            {activeLeftPanel === 'inbox' && <FormInboxPanel />}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

/* ═══════ Module Catalog ═══════ */
function ModuleCatalog() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const setRightPanelOpen = useEditorStore(s => s.setRightPanelOpen)
    const [search, setSearch] = useState('')
    const [draggedMod, setDraggedMod] = useState<string | null>(null)
    const [dropTarget, setDropTargetMod] = useState<string | null>(null)

    // Find matching sector from SEKTORLER
    const sektor = useMemo(() => {
        if (!siteData) return null
        const demo = DEMOLAR.find(d => d.id === siteData.sektorId)
        if (!demo) return null
        return SEKTORLER.find(s => s.ad.toLowerCase().includes(demo.ad.split(' ')[0].toLowerCase())) || null
    }, [siteData])

    const paket = siteData?.paket || 'STANDART'
    const limit = PAKET_MODUL_LIMITI[paket] || 10
    const activeModules = siteData?.moduller || []

    // Get all available modules for this sector
    const allModules = useMemo(() => {
        const mods = sektor?.moduller || Object.keys(MODUL_BILGI)
        return mods.filter(m => {
            if (!search) return true
            const info = MODUL_BILGI[m]
            if (!info) return false
            return info.ad.toLowerCase().includes(search.toLowerCase())
        })
    }, [sektor, search])

    // Group by category
    const grouped = useMemo(() => {
        const map: Record<string, string[]> = {}
        allModules.forEach(m => {
            const info = MODUL_BILGI[m]
            const cat = info?.kategori || 'Diğer'
            if (!map[cat]) map[cat] = []
            map[cat].push(m)
        })
        return map
    }, [allModules])

    const toggleModule = (modulId: string, isLocked: boolean) => {
        if (isLocked) return
        const current = [...activeModules]
        const idx = current.indexOf(modulId)
        if (idx >= 0) {
            current.splice(idx, 1)
        } else {
            current.push(modulId)
        }
        updateSiteData({ moduller: current })
    }

    // Drag handlers for reordering active modules
    const handleDragStart = (e: React.DragEvent, modulId: string) => {
        setDraggedMod(modulId)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', modulId)
        const el = e.currentTarget as HTMLElement
        setTimeout(() => { el.style.opacity = '0.4' }, 0)
    }

    const handleDragEnd = (e: React.DragEvent) => {
        (e.currentTarget as HTMLElement).style.opacity = '1'
        setDraggedMod(null)
        setDropTargetMod(null)
    }

    const handleDragOver = (e: React.DragEvent, modulId: string) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        if (modulId !== draggedMod) {
            setDropTargetMod(modulId)
        }
    }

    const handleDrop = (e: React.DragEvent, targetModulId: string) => {
        e.preventDefault()
        if (!draggedMod || draggedMod === targetModulId) return
        const current = [...activeModules]
        const fromIdx = current.indexOf(draggedMod)
        const toIdx = current.indexOf(targetModulId)
        if (fromIdx < 0 || toIdx < 0) return
        current.splice(fromIdx, 1)
        current.splice(toIdx, 0, draggedMod)
        updateSiteData({ moduller: current })
        setDraggedMod(null)
        setDropTargetMod(null)
    }

    if (!siteData) return <PlaceholderPanel text="Site verisi yükleniyor" emoji="⏳" />

    return (
        <div>
            <div className="ke-paket-info">
                <span style={{ fontSize: '16px' }}>📦</span>
                <div>
                    <div className="ke-paket-name">{paket} Paket</div>
                    <div className="ke-paket-count">{activeModules.length} / {limit === 999 ? '∞' : limit} modül aktif</div>
                </div>
            </div>

            {/* Active modules — drag to reorder */}
            {activeModules.length > 0 && (
                <div style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: '#22c55e', marginBottom: 6 }}>
                        ✓ Aktif Modüller — sürükle bırak ile sırala
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {activeModules.map((m) => {
                            const info = MODUL_BILGI[m]
                            if (!info) return null
                            const isDropHere = dropTarget === m

                            return (
                                <div
                                    key={m}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, m)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => handleDragOver(e, m)}
                                    onDrop={(e) => handleDrop(e, m)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        padding: '7px 10px', borderRadius: 8,
                                        background: isDropHere ? '#dbeafe' : '#f0fdf4',
                                        border: isDropHere ? '2px dashed #3b82f6' : '1px solid #bbf7d0',
                                        cursor: 'grab', transition: 'all 0.15s',
                                        fontSize: 12, fontWeight: 600, color: '#166534',
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                        <circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/>
                                        <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>
                                        <circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/>
                                    </svg>
                                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{info.ad}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleModule(m, false) }}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 14, padding: 2, lineHeight: 1, display: 'flex' }}
                                        title="Kaldır"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            <div style={{ height: 1, background: '#e2e8f0', margin: '4px 12px' }} />

            <input
                className="ke-mod-search"
                placeholder="Modül ara…"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {Object.entries(grouped).map(([cat, mods]) => (
                <div key={cat}>
                    <div className="ke-mod-cat-label">{cat}</div>
                    <div className="ke-mod-list">
                        {mods.map((m) => {
                            const info = MODUL_BILGI[m]
                            if (!info) return null
                            const isActive = activeModules.includes(m)
                            const isLocked = !isActive && activeModules.length >= limit
                            const isPremiumPlus = info.kategori === 'Premium+'

                            return (
                                <div
                                    key={m}
                                    className={`ke-mod-item${isActive ? ' active' : ''}${isLocked || (isPremiumPlus && paket !== 'PREMIUMPLUS') ? ' locked' : ''}`}
                                    onClick={() => {
                                        if (isPremiumPlus && paket !== 'PREMIUMPLUS') return
                                        toggleModule(m, isLocked)
                                    }}
                                >
                                    <div className="ke-mod-thumb"><SectionThumbnail type={MODUL_THUMBNAIL[m] || 'default'} /></div>
                                    <div className="ke-mod-info">
                                        <div className="ke-mod-name">{info.ad}</div>
                                        <div className="ke-mod-desc">{info.aciklama}</div>
                                    </div>
                                    {isActive && <span className="ke-mod-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>}
                                    {isPremiumPlus && paket !== 'PREMIUMPLUS' && <span className="ke-mod-badge">P+</span>}
                                    {isLocked && !isPremiumPlus && <span className="ke-mod-lock">🔒</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}

            <div style={{ padding: '16px', textAlign: 'center' }}>
                <button
                    onClick={() => setRightPanelOpen(true)}
                    style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                    ✏️ İçerik Düzenle
                </button>
            </div>
        </div>
    )
}

/* ═══════ Design Panel ═══════ */
function DesignPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    const THEMES = [
        { id: 'dark-1', name: 'Gece', bg: '#0f172a', accent: '#3b82f6', text: '#f8fafc' },
        { id: 'dark-2', name: 'Kömür', bg: '#0d0d0d', accent: '#e63946', text: '#f5f5f5' },
        { id: 'warm', name: 'Toprak', bg: '#1e0f05', accent: '#c2440e', text: '#f5ede0' },
        { id: 'elegant', name: 'Zarif', bg: '#faf4ed', accent: '#c2773a', text: '#2c1a0e' },
        { id: 'forest', name: 'Orman', bg: '#f0faf4', accent: '#52b788', text: '#1b4332' },
        { id: 'ocean', name: 'Okyanus', bg: '#f0f8ff', accent: '#2e86de', text: '#0a2a4a' },
        { id: 'neon', name: 'Neon', bg: '#0a0a0f', accent: '#7c3aed', text: '#f0e6ff' },
        { id: 'pastel', name: 'Pastel', bg: '#fdf8f9', accent: '#d4709a', text: '#2d1527' },
    ]

    const FONTS = [
        { id: 'inter', name: 'Inter', family: 'Inter' },
        { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display' },
        { id: 'poppins', name: 'Poppins', family: 'Poppins' },
        { id: 'roboto', name: 'Roboto', family: 'Roboto' },
        { id: 'montserrat', name: 'Montserrat', family: 'Montserrat' },
        { id: 'outfit', name: 'Outfit', family: 'Outfit' },
        { id: 'raleway', name: 'Raleway', family: 'Raleway' },
        { id: 'dm-sans', name: 'DM Sans', family: 'DM Sans' },
    ]

    return (
        <div>
            {/* ── Quick Themes ── */}
            <div className="ke-design-section">
                <div className="ke-design-label">Hızlı Tema</div>
                <div className="ke-theme-grid">
                    {THEMES.map(t => (
                        <div
                            key={t.id}
                            className={`ke-theme-card${siteData?.bg === t.bg ? ' active' : ''}`}
                            onClick={() => updateSiteData({ bg: t.bg, accent: t.accent, text: t.text })}
                        >
                            <div className="ke-theme-dots">
                                <div className="ke-theme-dot" style={{ background: t.bg }} />
                                <div className="ke-theme-dot" style={{ background: t.accent }} />
                                <div className="ke-theme-dot" style={{ background: t.text }} />
                            </div>
                            <div className="ke-theme-name">{t.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ height: 1, background: '#e2e8f0', margin: '0 16px' }} />

            {/* ── Custom Colors ── */}
            <div className="ke-design-section">
                <div className="ke-design-label">Özel Renkler</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                        { key: 'bg', label: 'Arka Plan', val: siteData?.bg || '#0f172a' },
                        { key: 'accent', label: 'Vurgu Rengi', val: siteData?.accent || '#3b82f6' },
                        { key: 'text', label: 'Metin Rengi', val: siteData?.text || '#f8fafc' },
                    ].map(c => (
                        <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input
                                type="color"
                                value={c.val}
                                onChange={e => updateSiteData({ [c.key]: e.target.value })}
                                style={{ width: 32, height: 32, border: '2px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', padding: 2, background: '#fff' }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{c.label}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>{c.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ height: 1, background: '#e2e8f0', margin: '0 16px' }} />

            {/* ── Font Selection ── */}
            <div className="ke-design-section">
                <div className="ke-design-label">Yazı Tipi</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {FONTS.map(f => (
                        <div
                            key={f.id}
                            onClick={() => updateSiteData({ font: f.family })}
                            style={{
                                padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: siteData?.font === f.family ? '1.5px solid #3b82f6' : '1px solid #e2e8f0',
                                background: siteData?.font === f.family ? '#eff6ff' : '#fff',
                                transition: 'all 0.12s',
                            }}
                        >
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155', fontFamily: f.family }}>{f.name}</span>
                            {siteData?.font === f.family && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ═══════ Pages Panel ═══════ */
function PagesPanel() {
    const pages = useEditorStore(s => s.pages)
    const activePageId = useEditorStore(s => s.activePageId)
    const setActivePageId = useEditorStore(s => s.setActivePageId)
    const addPage = useEditorStore(s => s.addPage)
    const removePage = useEditorStore(s => s.removePage)
    const renamePage = useEditorStore(s => s.renamePage)
    const [isAdding, setIsAdding] = useState(false)
    const [newPageName, setNewPageName] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('')

    const handleAdd = () => {
        const name = newPageName.trim()
        if (!name) return
        const slug = name.toLowerCase()
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        addPage(name, `/${slug}`)
        setNewPageName('')
        setIsAdding(false)
    }

    const handleRename = (pageId: string) => {
        const name = editName.trim()
        if (!name) { setEditingId(null); return }
        const slug = name.toLowerCase()
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        const p = pages.find(pg => pg.id === pageId)
        renamePage(pageId, name, p?.isHome ? '/' : `/${slug}`)
        setEditingId(null)
    }

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Page List */}
            {pages.map(p => (
                <div
                    key={p.id}
                    onClick={() => { setActivePageId(p.id); setEditingId(null) }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                        border: p.id === activePageId ? '1.5px solid #3b82f6' : '1px solid #e2e8f0',
                        background: p.id === activePageId ? '#eff6ff' : '#fff',
                        transition: 'all 0.12s',
                    }}
                >
                    <span style={{ fontSize: 15, width: 22, textAlign: 'center' }}>
                        {p.isHome ? '🏠' : '📄'}
                    </span>

                    {editingId === p.id ? (
                        <input
                            autoFocus
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            onBlur={() => handleRename(p.id)}
                            onKeyDown={e => { if (e.key === 'Enter') handleRename(p.id); if (e.key === 'Escape') setEditingId(null) }}
                            onClick={e => e.stopPropagation()}
                            style={{ flex: 1, border: '1px solid #3b82f6', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', outline: 'none' }}
                        />
                    ) : (
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#17191c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {p.name}
                            </div>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>{p.slug}</div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 2 }}>
                        {/* Rename */}
                        <button
                            onClick={e => { e.stopPropagation(); setEditingId(p.id); setEditName(p.name) }}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, borderRadius: 4, display: 'flex' }}
                            title="Yeniden Adlandır"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        {/* Delete (not home) */}
                        {!p.isHome && (
                            <button
                                onClick={e => { e.stopPropagation(); if (confirm(`"${p.name}" sayfasını silmek istediğinize emin misiniz?`)) removePage(p.id) }}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: 4, borderRadius: 4, display: 'flex' }}
                                title="Sayfayı Sil"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* Add Page */}
            {isAdding ? (
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <input
                        autoFocus
                        value={newPageName}
                        onChange={e => setNewPageName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setIsAdding(false) }}
                        placeholder="Sayfa adı..."
                        style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #3b82f6', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
                    />
                    <button onClick={handleAdd} style={{ padding: '8px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ekle</button>
                    <button onClick={() => setIsAdding(false)} style={{ padding: '8px 10px', background: '#f1f5f9', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer', color: '#64748b', fontFamily: 'inherit' }}>×</button>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    style={{
                        marginTop: 8, padding: '10px', borderRadius: 10,
                        border: '1.5px dashed #cbd5e1', background: 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        fontSize: 12, fontWeight: 700, color: '#64748b', fontFamily: 'inherit',
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#3b82f6'; (e.target as HTMLElement).style.color = '#3b82f6' }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#cbd5e1'; (e.target as HTMLElement).style.color = '#64748b' }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    Yeni Sayfa Ekle
                </button>
            )}

            {/* Page count info */}
            <div style={{ marginTop: 16, padding: '10px 12px', background: '#f8fafc', borderRadius: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                {pages.length} sayfa • Anasayfa silinemez
            </div>
        </div>
    )
}

/* ═══════ Embed Panel (HTML/CSS/JS) ═══════ */
function EmbedPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const [code, setCode] = useState('')
    const [activeTab, setActiveTab] = useState<'custom' | 'templates'>('templates')

    const EMBED_TEMPLATES = [
        { id: 'whatsapp-float', name: 'WhatsApp Butonu', icon: '💬', desc: 'Sabit sağ alt köşe', code: `<!-- WhatsApp Floating Button -->\n<a href="https://wa.me/905XXXXXXXXX" target="_blank" style="position:fixed;bottom:20px;right:20px;width:56px;height:56px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.4);z-index:9999;text-decoration:none;font-size:28px;transition:transform .2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">\n  💬\n</a>` },
        { id: 'cookie-banner', name: 'Çerez Bildirimi', icon: '🍪', desc: 'KVKK uyumlu banner', code: `<!-- Cookie Banner -->\n<div id="cookieBanner" style="position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,.9);color:#fff;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;z-index:9999;font-family:system-ui;font-size:13px">\n  <span>🍪 Bu site çerez kullanır. Devam ederek kabul etmiş olursunuz.</span>\n  <button onclick="document.getElementById('cookieBanner').remove();localStorage.setItem('cookies','1')" style="background:#3b82f6;color:#fff;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;font-weight:700;white-space:nowrap">Kabul Et</button>\n</div>\n<script>if(localStorage.getItem('cookies'))document.getElementById('cookieBanner')?.remove()</script>` },
        { id: 'scroll-top', name: 'Yukarı Kaydır', icon: '⬆️', desc: 'Scroll-to-top butonu', code: `<!-- Scroll to Top -->\n<button id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" style="position:fixed;bottom:80px;right:20px;width:44px;height:44px;background:#1e293b;color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:18px;box-shadow:0 2px 12px rgba(0,0,0,.2);opacity:0;transition:opacity .3s;z-index:9998" aria-label="Yukarı Kaydır">↑</button>\n<script>\nwindow.addEventListener('scroll',()=>{\n  document.getElementById('scrollTop').style.opacity=window.scrollY>300?'1':'0'\n})\n</script>` },
        { id: 'counter', name: 'Geri Sayım', icon: '⏱', desc: 'Kampanya sayacı', code: `<!-- Countdown Timer -->\n<div style="background:linear-gradient(135deg,#1e293b,#334155);padding:24px;border-radius:16px;text-align:center;color:#fff;font-family:system-ui">\n  <div style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;margin-bottom:8px">Kampanya Bitimine</div>\n  <div id="countdown" style="font-size:36px;font-weight:900;letter-spacing:2px"></div>\n</div>\n<script>\n(function(){\n  const end=new Date();end.setDate(end.getDate()+7);\n  setInterval(()=>{\n    const d=end-new Date(),h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);\n    document.getElementById('countdown').textContent=h+'s '+m+'dk '+s+'sn'\n  },1000)\n})()\n</script>` },
        { id: 'instagram', name: 'Instagram Feed', icon: '📸', desc: 'IG profil linki', code: `<!-- Instagram CTA -->\n<a href="https://instagram.com/KULLANICI_ADI" target="_blank" style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);border-radius:14px;text-decoration:none;color:#fff;font-family:system-ui;transition:transform .2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">\n  <span style="font-size:24px">📸</span>\n  <div><div style="font-weight:800;font-size:14px">Bizi Instagram'da Takip Edin</div><div style="font-size:11px;opacity:.8">@KULLANICI_ADI</div></div>\n</a>` },
        { id: 'google-maps', name: 'Google Harita', icon: '📍', desc: 'Gömülü harita', code: `<!-- Google Maps Embed -->\n<div style="border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1)">\n  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48172.0!2d28.93!3d41.01!5e0!3m2!1str!2str" width="100%" height="300" style="border:0" allowfullscreen loading="lazy"></iframe>\n</div>` },
    ]

    const handleInsert = (embedCode: string) => {
        // Store custom embeds as a module
        const current = siteData?.moduller || []
        if (!current.includes('custom-embed')) {
            updateSiteData({ moduller: [...current, 'custom-embed'] })
        }
        setCode(embedCode)
    }

    return (
        <div>
            {/* Tab Switcher */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                {[
                    { id: 'templates' as const, label: '📦 Hazır Şablonlar' },
                    { id: 'custom' as const, label: '✏️ Özel Kod' },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        flex: 1, padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer',
                        fontSize: 12, fontWeight: activeTab === t.id ? 800 : 500,
                        color: activeTab === t.id ? '#2563eb' : '#64748b',
                        borderBottom: activeTab === t.id ? '2px solid #2563eb' : '2px solid transparent',
                        fontFamily: 'inherit', transition: '0.15s',
                    }}>{t.label}</button>
                ))}
            </div>

            {activeTab === 'templates' && (
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {EMBED_TEMPLATES.map(t => (
                        <div key={t.id} onClick={() => handleInsert(t.code)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                            border: '1px solid #e2e8f0', borderRadius: 10, cursor: 'pointer',
                            background: '#fff', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { (e.currentTarget).style.borderColor = '#93c5fd'; (e.currentTarget).style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { (e.currentTarget).style.borderColor = '#e2e8f0'; (e.currentTarget).style.transform = '' }}
                        >
                            <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{t.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#17191c' }}>{t.name}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8' }}>{t.desc}</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'custom' && (
                <div style={{ padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>HTML / CSS / JavaScript</div>
                    <textarea
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder={'<div style="padding:20px">\n  Özel HTML kodunuz...\n</div>'}
                        style={{
                            width: '100%', minHeight: 200, padding: 12, border: '1.5px solid #e2e8f0',
                            borderRadius: 10, fontFamily: "'SF Mono', 'Fira Code', monospace",
                            fontSize: 11, lineHeight: 1.6, resize: 'vertical', outline: 'none',
                            background: '#0f172a', color: '#e2e8f0', boxSizing: 'border-box',
                        }}
                    />
                    {code && (
                        <>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginTop: 16, marginBottom: 8 }}>Önizleme</div>
                            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                                <iframe
                                    srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>*{margin:0;box-sizing:border-box}body{font-family:system-ui}</style></head><body>${code}</body></html>`}
                                    style={{ width: '100%', height: 200, border: 'none' }}
                                    sandbox="allow-scripts"
                                    title="Embed Preview"
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

/* ═══════ App Market Panel ═══════ */
function AppMarketPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    const APPS = [
        { id: 'whatsapp-canli', name: 'WhatsApp Chat', icon: '💬', desc: 'Anlık müşteri iletişimi', color: '#dcfce7', border: '#86efac', installed: false },
        { id: 'harita-yol-tarifi', name: 'Google Harita', icon: '📍', desc: 'Konum ve yol tarifi', color: '#dbeafe', border: '#93c5fd', installed: false },
        { id: 'instagram-feed', name: 'Instagram Feed', icon: '📸', desc: 'IG postlarını göster', color: '#fce7f3', border: '#f9a8d4', installed: false },
        { id: 'google-yorumlar', name: 'Google Yorumlar', icon: '⭐', desc: 'Müşteri yorumları', color: '#fef9c3', border: '#fde047', installed: false },
        { id: 'online-rezervasyon', name: 'Rezervasyon', icon: '📅', desc: 'Online randevu al', color: '#e0e7ff', border: '#a5b4fc', installed: false },
        { id: 'canli-destek', name: 'Canlı Destek', icon: '🎧', desc: 'Chat widget', color: '#f0fdf4', border: '#86efac', installed: false },
        { id: 'eposta-bulteni', name: 'Newsletter', icon: '✉️', desc: 'E-posta abone formu', color: '#faf5ff', border: '#c4b5fd', installed: false },
        { id: 'cerez-bildirimi', name: 'KVKK Çerez', icon: '🍪', desc: 'Çerez uyarı banner', color: '#fff7ed', border: '#fdba74', installed: false },
    ].map(app => ({
        ...app,
        installed: (siteData?.moduller || []).includes(app.id),
    }))

    const toggleApp = (appId: string) => {
        const current = [...(siteData?.moduller || [])]
        const idx = current.indexOf(appId)
        if (idx >= 0) {
            current.splice(idx, 1)
        } else {
            current.push(appId)
        }
        updateSiteData({ moduller: current })
    }

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ padding: '8px 4px', fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>
                Tek tıkla sitenize ekleyin. Aktif eklentiler otomatik olarak demo önizlemesine yansır.
            </div>

            {APPS.map(app => (
                <div key={app.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                    border: `1px solid ${app.installed ? app.border : '#e2e8f0'}`,
                    borderRadius: 12, background: app.installed ? app.color : '#fff',
                    transition: 'all 0.2s',
                }}>
                    <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{app.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#17191c' }}>{app.name}</div>
                        <div style={{ fontSize: 10, color: '#64748b' }}>{app.desc}</div>
                    </div>
                    <button
                        onClick={() => toggleApp(app.id)}
                        style={{
                            padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                            fontSize: 10, fontWeight: 800, fontFamily: 'inherit',
                            background: app.installed ? '#ef4444' : '#2563eb',
                            color: '#fff', transition: '0.15s',
                        }}
                    >
                        {app.installed ? 'Kaldır' : 'Ekle'}
                    </button>
                </div>
            ))}

            <div style={{ marginTop: 8, padding: '12px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, fontSize: 11, color: '#0369a1', lineHeight: 1.5 }}>
                💡 <strong>İpucu:</strong> Eklentiler Modüller panelindeki aktif modüllerle senkronize çalışır.
            </div>
        </div>
    )
}

/* ═══════ SEO Panel ═══════ */
function SeoPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const siteSettings = useEditorStore(s => s.siteSettings)
    const updateSiteSettings = useEditorStore(s => s.updateSiteSettings)
    const pages = useEditorStore(s => s.pages)
    const activePageId = useEditorStore(s => s.activePageId)

    const activePage = pages.find(p => p.id === activePageId)
    const title = siteSettings.seoTitle || siteData?.isletmeAdi || 'Site Başlığı'
    const desc = siteSettings.seoDescription || 'Sitenizin açıklaması burada görünecek'
    const domain = siteSettings.subdomain ? `${siteSettings.subdomain}.kepenk.ai` : 'isletme.kepenk.ai'
    const slug = activePage?.slug || '/'

    // Simple SEO score
    const checks = [
        { label: 'Sayfa Başlığı', ok: (siteSettings.seoTitle || '').length >= 10, tip: 'Min 10 karakter' },
        { label: 'Meta Açıklama', ok: (siteSettings.seoDescription || '').length >= 50, tip: 'Min 50 karakter' },
        { label: 'Anahtar Kelimeler', ok: (siteSettings.seoKeywords || '').length > 0, tip: 'En az 1 kelime' },
        { label: 'İşletme Adı', ok: (siteSettings.businessName || siteData?.isletmeAdi || '').length > 0, tip: 'Zorunlu' },
        { label: 'Telefon', ok: (siteSettings.businessPhone || siteData?.telefon || '').length > 0, tip: 'Yerel SEO için önemli' },
        { label: 'Sosyal Paylaşım Görseli', ok: (siteSettings.ogImage || '').length > 0, tip: '1200x630px önerilen' },
    ]
    const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100)

    return (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* SEO Score */}
            <div style={{
                background: score >= 80 ? '#f0fdf4' : score >= 50 ? '#fefce8' : '#fef2f2',
                border: `1px solid ${score >= 80 ? '#86efac' : score >= 50 ? '#fde047' : '#fca5a5'}`,
                borderRadius: 14, padding: 16, textAlign: 'center',
            }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: score >= 80 ? '#16a34a' : score >= 50 ? '#ca8a04' : '#dc2626' }}>
                    {score}%
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginTop: 4 }}>SEO Skoru</div>
            </div>

            {/* Checklist */}
            <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b', marginBottom: 8 }}>Kontrol Listesi</div>
                {checks.map((c, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0',
                        borderBottom: i < checks.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                        <span style={{ fontSize: 14 }}>{c.ok ? '✅' : '⚠️'}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: c.ok ? '#16a34a' : '#ca8a04' }}>{c.label}</div>
                            {!c.ok && <div style={{ fontSize: 10, color: '#94a3b8' }}>{c.tip}</div>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Google Preview */}
            <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b', marginBottom: 8 }}>Google Önizleme</div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 15, color: '#1a0dab', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
                    <div style={{ fontSize: 11, color: '#006621', margin: '2px 0 4px' }}>https://{domain}{slug}</div>
                    <div style={{ fontSize: 11, color: '#545454', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{desc}</div>
                </div>
            </div>

            {/* Quick Edit */}
            <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b', marginBottom: 8 }}>Hızlı Düzenle</div>

                <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>Sayfa Başlığı</label>
                    <input
                        value={siteSettings.seoTitle}
                        onChange={e => updateSiteSettings({ seoTitle: e.target.value })}
                        placeholder="İşletme Adı — Hizmet"
                        maxLength={70}
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <div style={{ fontSize: 10, color: (siteSettings.seoTitle || '').length > 60 ? '#ef4444' : '#94a3b8', marginTop: 3, textAlign: 'right' }}>
                        {(siteSettings.seoTitle || '').length}/70
                    </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>Meta Açıklama</label>
                    <textarea
                        value={siteSettings.seoDescription}
                        onChange={e => updateSiteSettings({ seoDescription: e.target.value })}
                        placeholder="155 karakterlik açıklama..."
                        maxLength={160}
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none', minHeight: 56, resize: 'vertical', boxSizing: 'border-box' }}
                    />
                    <div style={{ fontSize: 10, color: (siteSettings.seoDescription || '').length > 155 ? '#ef4444' : '#94a3b8', marginTop: 3, textAlign: 'right' }}>
                        {(siteSettings.seoDescription || '').length}/160
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>Anahtar Kelimeler</label>
                    <input
                        value={siteSettings.seoKeywords}
                        onChange={e => updateSiteSettings({ seoKeywords: e.target.value })}
                        placeholder="berber, kuaför, saç kesimi"
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>
            </div>

            {/* Open Settings for full access */}
            <button
                onClick={() => useEditorStore.getState().openSettingsModal('seo')}
                style={{
                    padding: '10px', borderRadius: 10, border: '1.5px dashed #cbd5e1',
                    background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                    color: '#64748b', fontFamily: 'inherit', transition: '0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
            >
                ⚙️ Tüm SEO Ayarları
            </button>
        </div>
    )
}

/* ═══════ CMS / Blog Panel ═══════ */
function CmsPanel() {
    const [posts, setPosts] = useState([
        { id: '1', title: 'İlk Blog Yazımız', slug: 'ilk-blog-yazimiz', status: 'published' as const, date: '2024-03-10', category: 'Haberler' },
        { id: '2', title: 'Hizmetlerimiz Hakkında', slug: 'hizmetlerimiz-hakkinda', status: 'draft' as const, date: '2024-03-12', category: 'Hizmetler' },
        { id: '3', title: 'Müşteri Memnuniyeti', slug: 'musteri-memnuniyeti', status: 'published' as const, date: '2024-03-14', category: 'Referanslar' },
    ])
    const [isAdding, setIsAdding] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

    const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter)

    const addPost = () => {
        const title = newTitle.trim()
        if (!title) return
        const slug = title.toLowerCase()
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        setPosts(prev => [...prev, {
            id: `post-${Date.now()}`, title, slug, status: 'draft' as const,
            date: new Date().toISOString().split('T')[0], category: 'Genel',
        }])
        setNewTitle('')
        setIsAdding(false)
    }

    const toggleStatus = (id: string) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === 'published' ? 'draft' as const : 'published' as const } : p
        ))
    }

    const deletePost = (id: string) => {
        setPosts(prev => prev.filter(p => p.id !== id))
    }

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[
                    { id: 'all' as const, label: 'Tümü', count: posts.length },
                    { id: 'published' as const, label: 'Yayında', count: posts.filter(p => p.status === 'published').length },
                    { id: 'draft' as const, label: 'Taslak', count: posts.filter(p => p.status === 'draft').length },
                ].map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id)} style={{
                        flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        fontSize: 10, fontWeight: 800, fontFamily: 'inherit',
                        background: filter === f.id ? '#2563eb' : '#f1f5f9',
                        color: filter === f.id ? '#fff' : '#64748b',
                        transition: '0.15s',
                    }}>{f.label} ({f.count})</button>
                ))}
            </div>

            {/* Post List */}
            {filtered.map(post => (
                <div key={post.id} style={{
                    padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0',
                    background: '#fff', display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#17191c', marginBottom: 2 }}>{post.title}</div>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>/{post.slug}</div>
                        </div>
                        <span style={{
                            fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
                            background: post.status === 'published' ? '#dcfce7' : '#fef3c7',
                            color: post.status === 'published' ? '#16a34a' : '#ca8a04',
                            whiteSpace: 'nowrap',
                        }}>{post.status === 'published' ? '● Yayında' : '◯ Taslak'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>{post.category}</span>
                            <span style={{ fontSize: 10, color: '#94a3b8' }}>{post.date}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            <button onClick={() => toggleStatus(post.id)} title={post.status === 'published' ? 'Taslağa Al' : 'Yayınla'}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, padding: 2 }}>
                                {post.status === 'published' ? '📤' : '📥'}
                            </button>
                            <button onClick={() => deletePost(post.id)} title="Sil"
                                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, padding: 2, color: '#ef4444' }}>
                                🗑
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Post */}
            {isAdding ? (
                <div style={{ display: 'flex', gap: 6 }}>
                    <input autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') addPost(); if (e.key === 'Escape') setIsAdding(false) }}
                        placeholder="Yazı başlığı..."
                        style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #3b82f6', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none' }} />
                    <button onClick={addPost} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ekle</button>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} style={{
                    padding: '10px', borderRadius: 10, border: '1.5px dashed #cbd5e1', background: 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, color: '#64748b', fontFamily: 'inherit',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    Yeni Yazı
                </button>
            )}
        </div>
    )
}

/* ═══════ Form Inbox Panel ═══════ */
function FormInboxPanel() {
    const [messages] = useState([
        { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@gmail.com', message: 'Randevu almak istiyorum, müsait saatleriniz nelerdir?', date: '2024-03-14 14:30', read: false, type: 'İletişim' },
        { id: '2', name: 'Fatma Kaya', email: 'fatma@hotmail.com', message: 'Fiyat listesi hakkında bilgi alabilir miyim?', date: '2024-03-14 10:15', read: false, type: 'Teklif' },
        { id: '3', name: 'Mehmet Demir', email: 'mehmet@outlook.com', message: 'Harika hizmet, teşekkürler! Herkese tavsiye ederim.', date: '2024-03-13 18:45', read: true, type: 'İletişim' },
        { id: '4', name: 'Zeynep Ak', email: 'zeynep@gmail.com', message: 'Cumartesi günü açık mısınız?', date: '2024-03-13 09:00', read: true, type: 'İletişim' },
        { id: '5', name: 'Ali Öz', email: 'ali@icloud.com', message: 'Newsletter aboneliği onaylandı.', date: '2024-03-12 20:30', read: true, type: 'Abone' },
    ])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const unread = messages.filter(m => !m.read).length

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Stats bar */}
            <div style={{ padding: '10px 14px', background: '#fafbfc', borderBottom: '1px solid #e8ecf1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                    <strong style={{ color: '#17191c' }}>{messages.length}</strong> mesaj • <strong style={{ color: '#ef4444' }}>{unread}</strong> okunmamış
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: unread > 0 ? '#fef2f2' : '#f0fdf4', color: unread > 0 ? '#ef4444' : '#16a34a' }}>
                    {unread > 0 ? `${unread} yeni` : '✓ Tümü okundu'}
                </div>
            </div>

            {/* Message List */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {messages.map(msg => (
                    <div key={msg.id}>
                        <div
                            onClick={() => setSelectedId(selectedId === msg.id ? null : msg.id)}
                            style={{
                                padding: '12px 14px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9',
                                background: selectedId === msg.id ? '#eff6ff' : !msg.read ? '#fefce8' : '#fff',
                                transition: 'background 0.12s',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                {!msg.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />}
                                <div style={{ fontSize: 12, fontWeight: msg.read ? 600 : 800, color: '#17191c', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.name}</div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#f1f5f9', color: '#64748b' }}>{msg.type}</span>
                            </div>
                            <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: msg.read ? 0 : 14 }}>{msg.message}</div>
                            <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, paddingLeft: msg.read ? 0 : 14 }}>{msg.date}</div>
                        </div>

                        {/* Expanded detail */}
                        {selectedId === msg.id && (
                            <div style={{ padding: '12px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>📧 {msg.email}</div>
                                <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.6, marginBottom: 10 }}>{msg.message}</div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <a href={`mailto:${msg.email}`} style={{
                                        padding: '6px 14px', background: '#2563eb', color: '#fff', borderRadius: 8,
                                        fontSize: 10, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
                                    }}>✉️ Yanıtla</a>
                                    <a href={`https://wa.me/${msg.email.includes('@') ? '' : msg.email}`} target="_blank" rel="noreferrer" style={{
                                        padding: '6px 14px', background: '#25d366', color: '#fff', borderRadius: 8,
                                        fontSize: 10, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
                                    }}>💬 WhatsApp</a>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ═══════ Placeholder Panel ═══════ */
function PlaceholderPanel({ text, emoji }: { text: string; emoji: string }) {
    return (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{emoji}</div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>{text}</p>
            <p style={{ fontSize: '12px' }}>Yakında burada olacak.</p>
        </div>
    )
}
