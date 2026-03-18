'use client'

export default function TopNavbar() {
    return (
        <nav className="kpnk-navbar">
            {/* Left */}
            <a href="/dashboard/manage" className="kpnk-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}><span style={{ color: '#DC4620' }}>K</span>EPENK</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#DC4620', background: 'rgba(220,70,32,0.12)', border: '1px solid rgba(220,70,32,0.25)', borderRadius: 999, padding: '1px 6px' }}>AI</span>
            </a>
            <div className="kpnk-nav-avatar" style={{ borderColor: '#DC4620' }}>YZ</div>
            <span className="kpnk-nav-site">I...</span>
            <button className="kpnk-nav-btn">
                Kaynaklar
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="kpnk-nav-btn">
                Yardım
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="kpnk-nav-upgrade" style={{ background: '#DC4620', color: '#fff' }}>Yükselt</button>

            {/* Center */}
            <div className="kpnk-nav-spacer" />
            <input className="kpnk-nav-search" placeholder="Ara..." />
            <div className="kpnk-nav-spacer" />

            {/* Right */}
            <button className="kpnk-nav-icon" title="Mesajlar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </button>
            <button className="kpnk-nav-icon" title="Bildirimler">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <button className="kpnk-nav-icon" title="Uygulamalar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button className="kpnk-nav-icon" style={{ overflow: 'hidden' }} title="Profil">
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #DC4620, #FF6B45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>YZ</div>
            </button>
            <button className="kpnk-nav-ai">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" fill="currentColor"/></svg>
                Yapay Zeka
            </button>
        </nav>
    )
}
