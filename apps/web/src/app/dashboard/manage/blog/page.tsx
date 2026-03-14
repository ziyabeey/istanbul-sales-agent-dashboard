'use client'

import { useState } from 'react'

export default function BlogPage() {
    const [posts] = useState([
        { id: '1', title: 'Su Arıtma Cihazı Nasıl Seçilir?', date: '12 Mar 2024', views: 234, status: 'Yayında' },
        { id: '2', title: 'Filtre Değişim Rehberi', date: '8 Mar 2024', views: 156, status: 'Yayında' },
        { id: '3', title: 'Suyun pH Değeri Neden Önemli?', date: '3 Mar 2024', views: 89, status: 'Taslak' },
    ])

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Bloga Genel Bakış</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 20 }}>İçerik stratejinizi yönetin ve performansı takip edin.</p>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                {[
                    { label: 'Yazı Görüntülenmeleri', value: '479' },
                    { label: 'Tekil Ziyaretçiler', value: '312' },
                    { label: 'Yeni Aboneler', value: '8' },
                    { label: 'Etkileşim', value: '%4.2' },
                ].map((k, i) => (
                    <div key={i} className="kpnk-card kpnk-kpi">
                        <div className="kpnk-kpi-title">{k.label}</div>
                        <div className="kpnk-kpi-value">{k.value}</div>
                    </div>
                ))}
            </div>

            {/* AI Suggestion */}
            <div style={{ background: 'linear-gradient(135deg, #F0F4FF, #E8F0FE)', border: '1px solid #D4E0FF', borderRadius: 10, padding: 18, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>✨ AI İçerik Önerisi</div>
                    <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginTop: 4 }}>&quot;Evde Su Arıtma Sistemleri: 2024 Karşılaştırma Rehberi&quot; başlığında bir yazı oluşturun.</div>
                </div>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 18px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Yazı Oluştur</button>
            </div>

            {/* Posts */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Yayınlanan Yazılar</h2>
                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 18px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Yazı</button>
            </div>

            {posts.map(post => (
                <div key={post.id} className="kpnk-card" style={{ padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{post.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{post.date} · {post.views} görüntülenme</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: post.status === 'Yayında' ? '#E8F8EF' : '#FFF8E6', color: post.status === 'Yayında' ? '#1A7F37' : '#9A6700' }}>{post.status}</span>
                </div>
            ))}
        </div>
    )
}
