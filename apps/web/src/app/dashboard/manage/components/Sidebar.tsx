'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const BASE = '/dashboard/manage'

interface MenuItem {
    id: string
    icon: React.ReactNode
    label: string
    href?: string
    badge?: { type: 'new' | 'count' | 'gray'; text: string }
    hasSubmenu?: boolean
    children?: MenuItem[]
}

const MENU: (MenuItem | 'divider')[] = [
    { id: 'home', icon: <SvgHome />, label: 'Ana Sayfa', href: BASE },
    { id: 'ai', icon: <SvgSparkle />, label: 'AI Temsilciler', href: `${BASE}/ai-temsilciler`, badge: { type: 'new', text: 'YENİ' }, hasSubmenu: true },
    { id: 'sales', icon: <SvgDollar />, label: 'Satış', href: `${BASE}/satis`, hasSubmenu: true },
    { id: 'catalog', icon: <SvgCart />, label: 'Katalog', href: `${BASE}/katalog`, hasSubmenu: true },
    { id: 'blog', icon: <SvgBlog />, label: 'Blog', href: `${BASE}/blog`, hasSubmenu: true },
    { id: 'blog-motoru', icon: <SvgBrain />, label: 'AI Blog Motoru', href: `${BASE}/blog-motoru`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'restoran', icon: <SvgCart />, label: 'Restoran OS', href: `${BASE}/restoran`, hasSubmenu: true },
    { id: 'mutfak', icon: <SvgZap />, label: 'Mutfak (KDS)', href: `${BASE}/restoran/mutfak` },
    { id: 'qr-siparis', icon: <SvgGrid />, label: 'QR Sipariş', href: `${BASE}/restoran/qr-siparis`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'garson', icon: <SvgPeople />, label: 'Garson Paneli', href: `${BASE}/restoran/garson` },
    { id: 'apps', icon: <SvgGrid />, label: 'Uygulamalar', href: `${BASE}/uygulamalar`, badge: { type: 'count', text: '1' }, hasSubmenu: true },
    'divider',
    { id: 'site', icon: <SvgDevice />, label: 'Site ve Mobil Uygulama', href: `${BASE}/site`, hasSubmenu: true },
    { id: 'editor', icon: <SvgCode />, label: 'Standart Editör', href: `${BASE}/editor` },
    { id: 'ai-editor', icon: <SvgBrain />, label: 'AI Editör', href: `${BASE}/editor/ai`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'marketing', icon: <SvgMegaphone />, label: 'Pazarlama', href: `${BASE}/pazarlama`, hasSubmenu: true },
    { id: 'icerik', icon: <SvgPalette />, label: 'İçerik Stüdyo', href: `${BASE}/icerik-studyo`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'eposta', icon: <SvgMail />, label: 'E-posta Stüdyo', href: `${BASE}/eposta`, hasSubmenu: true },
    { id: 'payments', icon: <SvgWallet />, label: 'Ödeme Alma', href: `${BASE}/odemeler`, hasSubmenu: true },
    { id: 'whatsapp', icon: <SvgPhone />, label: 'WhatsApp AI', href: `${BASE}/whatsapp`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'inbox', icon: <SvgInbox />, label: 'Gelen Kutusu', href: `${BASE}/gelen-kutusu`, badge: { type: 'gray', text: '2' } },
    { id: 'crm', icon: <SvgPeople />, label: 'CRM — Müşteriler', href: `${BASE}/crm`, hasSubmenu: true },
    { id: 'muhasebe', icon: <SvgCoins />, label: 'Muhasebe', href: `${BASE}/muhasebe`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'analytics', icon: <SvgChart />, label: 'Analizler', href: `${BASE}/analizler`, hasSubmenu: true },
    { id: 'automations', icon: <SvgZap />, label: 'Otomasyonlar', href: `${BASE}/otomasyonlar`, hasSubmenu: true },
    { id: 'b2b', icon: <SvgShop />, label: 'B2B Pazar', href: `${BASE}/b2b-pazar` },
    { id: 'partner', icon: <SvgHandshake />, label: 'Partner Programı', href: `${BASE}/partner`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'ai-tracking', icon: <SvgBrain />, label: 'AI Tracking', href: `${BASE}/ai-tracking`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'mobil', icon: <SvgPhone />, label: 'Mobil Uygulama', href: `${BASE}/mobil` },
    'divider',
    { id: 'settings', icon: <SvgGear />, label: 'Ayarlar', href: `${BASE}/ayarlar`, hasSubmenu: true },
    { id: 'ekip', icon: <SvgPeople />, label: 'Ekip Yönetimi', href: `${BASE}/ayarlar/ekip` },
    { id: 'sablonlar', icon: <SvgPalette />, label: 'Şablon Galerisi', href: `${BASE}/site/sablonlar`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'cms', icon: <SvgTable />, label: 'CMS', href: `${BASE}/cms` },
    { id: 'destek', icon: <SvgInbox />, label: 'Destek Merkezi', href: `${BASE}/destek`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'studio-editor', icon: <SvgPalette />, label: 'Stüdyo Editör', href: `${BASE}/icerik-studyo/editor`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'pazarlama-oto', icon: <SvgZap />, label: '360° Pazarlama', href: `${BASE}/pazarlama/otomasyon`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'influencer', icon: <SvgPeople />, label: 'Influencer Ağı', href: `${BASE}/influencer`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'tedarik', icon: <SvgCart />, label: 'B2B Tedarik', href: `${BASE}/tedarik`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'pazaryeri', icon: <SvgGrid />, label: 'Hizmet Pazaryeri', href: `${BASE}/pazaryeri`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'usta-panel', icon: <SvgPeople />, label: 'Usta Paneli', href: `${BASE}/pazaryeri/usta` },
    { id: 'chatbot', icon: <SvgInbox />, label: 'Şirket Asistanı', href: `${BASE}/chatbot`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'akilli', icon: <SvgZap />, label: 'Akıllı Özellikler', href: `${BASE}/akilli`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'lansman', icon: <SvgCode />, label: 'Lansman Kontrol', href: `${BASE}/lansman`, badge: { type: 'new', text: 'YENİ' } },
    { id: 'admin', icon: <SvgGear />, label: 'Super Admin', href: `${BASE}/admin` },
    { id: 'devtools', icon: <SvgCode />, label: 'Geliştirici Araçları', href: `${BASE}/gelistirici`, hasSubmenu: true },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="kpnk-sidebar">
            {/* Favorites */}
            <button className="kpnk-sb-fav">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Favoriler
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}><path d="M6 9l6 6 6-6"/></svg>
            </button>

            {/* Menu Items */}
            <nav style={{ flex: 1, padding: '4px 0' }}>
                {MENU.map((item, i) => {
                    if (item === 'divider') return <div key={`d-${i}`} className="kpnk-sb-divider" />
                    const isActive = item.href ? pathname === item.href || (item.href !== BASE && pathname.startsWith(item.href + '/')) : false
                    return (
                        <Link key={item.id} href={item.href || '#'} className={`kpnk-sb-item${isActive ? ' active' : ''}`}>
                            <span className="kpnk-sb-item-icon">{item.icon}</span>
                            <span className="kpnk-sb-item-label">{item.label}</span>
                            {item.badge && (
                                <span className={`kpnk-sb-badge kpnk-sb-badge-${item.badge.type}`}>{item.badge.text}</span>
                            )}
                            {item.hasSubmenu && <span className="kpnk-sb-item-arrow">›</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="kpnk-sb-footer">
                <Link href="/dashboard/manage/site" className="kpnk-sb-edit">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Düzenle
                </Link>
            </div>
        </aside>
    )
}

/* ═══════ SVG Icon Components ═══════ */
function SvgHome() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function SvgSparkle() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> }
function SvgDollar() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }
function SvgCart() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> }
function SvgBlog() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> }
function SvgGrid() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> }
function SvgDevice() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> }
function SvgMegaphone() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }
function SvgWallet() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg> }
function SvgMail() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg> }
function SvgPeople() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function SvgChart() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
function SvgZap() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> }
function SvgGear() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }
function SvgTable() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg> }
function SvgCode() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> }
function SvgPalette() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> }
function SvgCoins() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><line x1="7" y1="6" x2="7" y2="10"/><line x1="9" y1="8" x2="5" y2="8"/></svg> }
function SvgShop() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l1-4h16l1 4"/><path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9"/><path d="M9 21V9"/></svg> }
function SvgInbox() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg> }
function SvgHandshake() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 17a1 1 0 0 1-1 1H6l-4-4 6.77-6.77a1 1 0 0 1 1.41 0L11 8"/><path d="M13 7a1 1 0 0 1 1-1h4l4 4-6.77 6.77a1 1 0 0 1-1.41 0L13 16"/><path d="M8 12l4 4"/></svg> }
function SvgBrain() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3 3 3 0 0 0 0 4 3 3 0 0 0 3 3v1a4 4 0 0 0 8 0v-1a3 3 0 0 0 3-3 3 3 0 0 0 0-4 3 3 0 0 0-3-3V6a4 4 0 0 0-4-4z"/><path d="M12 2v20"/></svg> }
function SvgPhone() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> }
