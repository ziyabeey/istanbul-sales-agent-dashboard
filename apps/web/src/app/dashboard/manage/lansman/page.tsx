'use client'

import { useState } from 'react'

/* ═══════ Checklist Data ═══════ */
interface CheckItem { id: string; label: string; status: 'pass' | 'warn' | 'fail' | 'pending' }

const SECTIONS: { title: string; icon: string; items: CheckItem[] }[] = [
    { title: 'Altyapı', icon: '🏗️', items: [
        { id: 'a1', label: 'Cloud Run min-instances=1 (cold start)', status: 'pass' },
        { id: 'a2', label: 'Firestore PITR aktif (7 gün)', status: 'pass' },
        { id: 'a3', label: 'Günlük backup Cloud Function deploy', status: 'pass' },
        { id: 'a4', label: 'Yedek restore testi yapıldı', status: 'warn' },
        { id: 'a5', label: 'DNS subdomain çözümleme', status: 'pass' },
        { id: 'a6', label: 'SSL sertifikaları geçerli', status: 'pass' },
    ]},
    { title: 'Güvenlik', icon: '🔒', items: [
        { id: 's1', label: 'Firestore rules — tenant izolasyon testi', status: 'pass' },
        { id: 's2', label: 'Rate limiting tüm endpoint\'lerde', status: 'pass' },
        { id: 's3', label: 'Prompt injection 14 pattern testi', status: 'pass' },
        { id: 's4', label: 'CSP + HSTS header\'lar', status: 'pass' },
        { id: 's5', label: 'Sentry KVKK hassas veri sansürü', status: 'pass' },
        { id: 's6', label: 'API key\'ler Secret Manager\'da', status: 'warn' },
        { id: 's7', label: 'npm audit temiz', status: 'pass' },
    ]},
    { title: 'Ödeme', icon: '💳', items: [
        { id: 'p1', label: 'iyzico production key yapılandırıldı', status: 'pending' },
        { id: 'p2', label: '3DS akışı gerçek kartla test', status: 'pending' },
        { id: 'p3', label: 'Webhook URL HTTPS erişilebilir', status: 'pass' },
        { id: 'p4', label: 'İade akışı test edildi', status: 'pending' },
        { id: 'p5', label: 'Kuruş yuvarlama doğrulaması', status: 'pass' },
        { id: 'p6', label: 'SubMerchant KYC testi', status: 'pending' },
    ]},
    { title: 'Yasal (TR)', icon: '⚖️', items: [
        { id: 'l1', label: 'VERBİS kaydı', status: 'pending' },
        { id: 'l2', label: 'Aydınlatma Metni (KVKK)', status: 'warn' },
        { id: 'l3', label: 'İYS kaydı (pazarlama)', status: 'pending' },
        { id: 'l4', label: 'Cookie consent banner', status: 'pass' },
        { id: 'l5', label: 'Mesafeli satış sözleşmesi', status: 'warn' },
        { id: 'l6', label: '14 gün cayma hakkı bildirimi', status: 'pending' },
    ]},
    { title: 'İzleme', icon: '📊', items: [
        { id: 'm1', label: 'Sentry (web + server + mobile)', status: 'pass' },
        { id: 'm2', label: 'Better Stack uptime monitörleri', status: 'pass' },
        { id: 'm3', label: 'status.kepenk.ai canlı', status: 'warn' },
        { id: 'm4', label: 'GCP bütçe alarmları ($200/$500/$1K)', status: 'pass' },
        { id: 'm5', label: 'Claude token takibi çalışıyor', status: 'pass' },
    ]},
    { title: 'Performans', icon: '🚀', items: [
        { id: 'f1', label: 'Lighthouse Performance ≥90', status: 'pass' },
        { id: 'f2', label: 'LCP < 2.5s, INP < 200ms, CLS < 0.1', status: 'pass' },
        { id: 'f3', label: 'Bundle size < 200KB', status: 'warn' },
        { id: 'f4', label: 'Offline POS sync testi (5 sipariş)', status: 'pass' },
    ]},
]

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
    pass:    { bg: 'rgba(34,197,94,0.1)', color: '#22C55E', label: '✅ Geçti' },
    warn:    { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', label: '⚠️ Uyarı' },
    fail:    { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', label: '❌ Başarısız' },
    pending: { bg: 'rgba(107,114,128,0.1)', color: '#6B7280', label: '⏳ Bekliyor' },
}

export default function LansmanPage() {
    const [expandedSection, setExpandedSection] = useState<string | null>('Altyapı')

    const totals = { pass: 0, warn: 0, fail: 0, pending: 0 }
    SECTIONS.forEach(s => s.items.forEach(i => totals[i.status]++))
    const total = Object.values(totals).reduce((a, b) => a + b, 0)
    const readiness = Math.round((totals.pass / total) * 100)

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🚀 Lansman Kontrol</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>40 madde · 5 katman test · 6 kategori · Felaket kurtarma</p>
            </div>

            {/* Readiness Score */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: readiness >= 80 ? '#22C55E' : readiness >= 60 ? '#F59E0B' : '#EF4444' }}>%{readiness}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Lansman Hazırlık Skoru</div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10 }}>
                    {Object.entries(totals).map(([status, count]) => (
                        <div key={status}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: STATUS_STYLE[status].color }}>{count}</span>
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginLeft: 3 }}>{STATUS_STYLE[status].label.split(' ')[1]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CI/CD Pipeline */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', marginBottom: 12, display: 'flex', gap: 6, alignItems: 'center', overflowX: 'auto' }}>
                {['Lint+Type', 'Unit Test', 'Integration', 'Bundle', 'E2E', 'Lighthouse', 'Deploy'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 10 }}>→</span>}
                        <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: i < 5 ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: i < 5 ? '#22C55E' : '#F59E0B' }}>{step}</span>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SECTIONS.map(section => {
                    const sectionPass = section.items.filter(i => i.status === 'pass').length
                    const isExpanded = expandedSection === section.title
                    return (
                        <div key={section.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                            <div onClick={() => setExpandedSection(isExpanded ? null : section.title)} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <span style={{ fontSize: 14 }}>{section.icon}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'white', flex: 1 }}>{section.title}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: sectionPass === section.items.length ? '#22C55E' : '#F59E0B' }}>{sectionPass}/{section.items.length}</span>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>{isExpanded ? '▲' : '▼'}</span>
                            </div>
                            {isExpanded && (
                                <div style={{ padding: '0 14px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {section.items.map(item => (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, background: STATUS_STYLE[item.status].bg }}>
                                            <span style={{ fontSize: 10 }}>{STATUS_STYLE[item.status].label.split(' ')[0]}</span>
                                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', flex: 1 }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
