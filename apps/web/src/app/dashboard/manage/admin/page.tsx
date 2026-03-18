'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface AdminKPI { label: string; value: string; change: string; icon: string; color: string; positive: boolean }
interface FFlag { id: string; name: string; desc: string; enabled: boolean; rules: string; users: number }
interface AuditEntry { id: string; admin: string; action: string; target: string; severity: 'info' | 'warning' | 'critical'; time: string }

const KPIS: AdminKPI[] = [
    { label: 'MRR', value: '₺128.4K', change: '+12%', icon: '💰', color: '#22c55e', positive: true },
    { label: 'ARR', value: '₺1.54M', change: '+18%', icon: '📈', color: '#8B5CF6', positive: true },
    { label: 'Aktif Kullanıcı', value: '2,847', change: '+156', icon: '👥', color: '#3B82F6', positive: true },
    { label: 'Churn Rate', value: '%2.1', change: '-0.3%', icon: '📉', color: '#f59e0b', positive: true },
    { label: 'Yeni Kayıt (24h)', value: '34', change: '+8', icon: '🆕', color: '#10B981', positive: true },
    { label: 'Açık Ticket', value: '12', change: '-3', icon: '🎫', color: '#ef4444', positive: true },
]

const FLAGS: FFlag[] = [
    { id: 'f1', name: 'restaurant_os_v2', desc: 'Restoran OS yeni sürüm', enabled: true, rules: 'plan:professional,enterprise', users: 342 },
    { id: 'f2', name: 'ai_editor', desc: 'AI editör (Claude)', enabled: true, rules: '%25 canary', users: 711 },
    { id: 'f3', name: 'whatsapp_engine', desc: 'WhatsApp AI motoru', enabled: false, rules: 'user_ids:5 test', users: 5 },
    { id: 'f4', name: 'multi_language', desc: 'Çoklu dil desteği', enabled: false, rules: '—', users: 0 },
    { id: 'f5', name: 'custom_domain', desc: 'Özel alan adı', enabled: true, rules: 'plan:enterprise', users: 89 },
    { id: 'f6', name: 'advanced_analytics', desc: 'Gelişmiş analitik', enabled: true, rules: '%50 canary', users: 1423 },
]

const AUDIT: AuditEntry[] = [
    { id: 'a1', admin: 'admin@kepenk.ai', action: 'impersonation_start', target: 'user:ahmet@gmail.com', severity: 'warning', time: '14:55' },
    { id: 'a2', admin: 'admin@kepenk.ai', action: 'feature_flag_toggle', target: 'flag:ai_editor → ON', severity: 'info', time: '14:30' },
    { id: 'a3', admin: 'admin@kepenk.ai', action: 'user_plan_change', target: 'user:fatma@test.com → pro', severity: 'info', time: '13:45' },
    { id: 'a4', admin: 'super@kepenk.ai', action: 'user_suspend', target: 'user:spam@fake.com', severity: 'critical', time: '12:10' },
    { id: 'a5', admin: 'admin@kepenk.ai', action: 'ticket_assign', target: 'ticket:TK-005 → admin', severity: 'info', time: '11:30' },
]

const SEV_MAP = { info: { c: '#3B82F6', bg: 'rgba(59,130,246,0.1)' }, warning: { c: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }, critical: { c: '#ef4444', bg: 'rgba(239,68,68,0.1)' } }

export default function AdminPage() {
    const [flags, setFlags] = useState(FLAGS)
    const [activeTab, setActiveTab] = useState<'dashboard' | 'flags' | 'audit' | 'impersonate'>('dashboard')
    const [impersonateId, setImpersonateId] = useState('')
    const [impersonateReason, setImpersonateReason] = useState('')

    const toggleFlag = (id: string) => setFlags(f => f.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x))

    const tabs = [
        { id: 'dashboard' as const, label: '📊 Dashboard', count: null },
        { id: 'flags' as const, label: '🚩 Feature Flags', count: flags.filter(f => f.enabled).length },
        { id: 'audit' as const, label: '📋 Audit Log', count: AUDIT.length },
        { id: 'impersonate' as const, label: '👤 Impersonation', count: null },
    ]

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🛡️ Super Admin</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>admin.kepenk.ai · Sistem yönetimi · KPI · Feature flags · Audit</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>🔒 SUPER_ADMIN</span>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: activeTab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: activeTab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                        {t.label}
                        {t.count != null && <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>{t.count}</span>}
                    </button>
                ))}
            </div>

            {/* ═══ DASHBOARD TAB ═══ */}
            {activeTab === 'dashboard' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                        {KPIS.map(k => (
                            <div key={k.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 16 }}>{k.icon}</span>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: k.positive ? '#22c55e' : '#ef4444' }}>{k.change}</span>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{k.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* System Health */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 12 }}>🖥️ Sistem Sağlığı</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                            {[
                                { label: 'Cloud Run CPU', value: '23%', color: '#22c55e' },
                                { label: 'Memory', value: '512MB / 2GB', color: '#3B82F6' },
                                { label: 'Firestore R/W', value: '12K/3K', color: '#f59e0b' },
                                { label: 'Hata Oranı', value: '%0.02', color: '#22c55e' },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ FEATURE FLAGS TAB ═══ */}
            {activeTab === 'flags' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {flags.map(f => (
                        <div key={f.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div onClick={() => toggleFlag(f.id)} style={{
                                width: 40, height: 22, borderRadius: 11, cursor: 'pointer',
                                background: f.enabled ? '#22c55e' : 'rgba(255,255,255,0.1)', position: 'relative',
                            }}>
                                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: f.enabled ? 20 : 2, transition: '0.2s' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', fontFamily: 'monospace' }}>{f.name}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{f.desc}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{f.rules}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', marginTop: 1 }}>{f.users} kullanıcı</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ AUDIT LOG TAB ═══ */}
            {activeTab === 'audit' && (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr 0.6fr 0.5fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                        <span>Admin</span><span>Aksiyon</span><span>Hedef</span><span>Seviye</span><span>Saat</span>
                    </div>
                    {AUDIT.map(a => (
                        <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr 0.6fr 0.5fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{a.admin.split('@')[0]}</span>
                            <span style={{ fontSize: 10, color: 'white', fontFamily: 'monospace' }}>{a.action}</span>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{a.target}</span>
                            <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: SEV_MAP[a.severity].bg, color: SEV_MAP[a.severity].c }}>{a.severity}</span>
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{a.time}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ IMPERSONATION TAB ═══ */}
            {activeTab === 'impersonate' && (
                <div style={{ maxWidth: 480 }}>
                    <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 6 }}>⚠️ Kullanıcı Taklit (Impersonation)</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                            Hedef kullanıcının hesabına giriş yaparsınız. Tüm eylemler audit log'a kaydedilir. Max süre: 1 saat.
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Kullanıcı ID veya E-posta</label>
                            <input value={impersonateId} onChange={e => setImpersonateId(e.target.value)} placeholder="user_id veya email@example.com" style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Sebep (zorunlu, min 10 karakter)</label>
                            <textarea value={impersonateReason} onChange={e => setImpersonateReason(e.target.value)} placeholder="Müşterinin ödeme sorunu inceleniyor..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', resize: 'vertical', height: 80, boxSizing: 'border-box' }} />
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>🚫 Engellenen Eylemler</div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {['Şifre Değiştirme', 'Hesap Silme', 'Ödeme Bilgisi', 'Sahiplik Devri'].map(a => (
                                    <span key={a} style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>{a}</span>
                                ))}
                            </div>
                        </div>

                        <button disabled={!impersonateId || impersonateReason.length < 10} style={{
                            padding: '10px 0', borderRadius: 10, border: 'none',
                            background: impersonateId && impersonateReason.length >= 10 ? '#ef4444' : 'rgba(255,255,255,0.05)',
                            color: impersonateId && impersonateReason.length >= 10 ? 'white' : 'rgba(255,255,255,0.15)',
                            fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                        }}>👤 Impersonate Başlat (1 Saat)</button>
                    </div>
                </div>
            )}
        </div>
    )
}
