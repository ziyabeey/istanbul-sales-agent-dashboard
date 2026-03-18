'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
type SiteRole = 'owner' | 'admin' | 'editor' | 'viewer'

interface Member {
    userId: string
    displayName: string
    email: string
    role: SiteRole
    joinedAt: string
}

interface PendingInvite {
    id: string
    email: string
    role: SiteRole
    sentAt: string
    expiresAt: string
}

const ROLE_CONFIG: Record<SiteRole, { label: string; emoji: string; color: string; bg: string }> = {
    owner: { label: 'Sahip', emoji: '👑', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    admin: { label: 'Yönetici', emoji: '🛡️', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    editor: { label: 'Editör', emoji: '✏️', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    viewer: { label: 'İzleyici', emoji: '👁️', color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
}

const DEMO_MEMBERS: Member[] = [
    { userId: '1', displayName: 'Yusuf Ziya Bey', email: 'yusuf@kepenk.ai', role: 'owner', joinedAt: '2025-01-01' },
    { userId: '2', displayName: 'Ahmet Yılmaz', email: 'ahmet@firma.com', role: 'admin', joinedAt: '2025-06-15' },
    { userId: '3', displayName: 'Fatma Kaya', email: 'fatma@firma.com', role: 'editor', joinedAt: '2025-09-20' },
]

const DEMO_INVITES: PendingInvite[] = [
    { id: '1', email: 'mehmet@firma.com', role: 'editor', sentAt: '2026-03-15', expiresAt: '2026-03-22' },
]

export default function EkipYonetimiPage() {
    const [members, setMembers] = useState(DEMO_MEMBERS)
    const [invites, setInvites] = useState(DEMO_INVITES)
    const [showInvite, setShowInvite] = useState(false)
    const [showTransfer, setShowTransfer] = useState(false)
    const [newInvite, setNewInvite] = useState({ email: '', role: 'editor' as SiteRole })
    const currentUserRole: SiteRole = 'owner' // from auth context in real app

    const handleInvite = async () => {
        if (!newInvite.email.trim()) return
        const inv: PendingInvite = {
            id: `inv-${Date.now()}`, email: newInvite.email, role: newInvite.role,
            sentAt: new Date().toISOString().split('T')[0],
            expiresAt: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        }
        setInvites(prev => [...prev, inv])
        setNewInvite({ email: '', role: 'editor' })
        setShowInvite(false)
    }

    const handleRemove = (userId: string) => {
        if (members.find(m => m.userId === userId)?.role === 'owner') return
        setMembers(prev => prev.filter(m => m.userId !== userId))
    }

    const handleRoleChange = (userId: string, newRole: SiteRole) => {
        if (newRole === 'owner') return // can't promote to owner via dropdown
        setMembers(prev => prev.map(m => m.userId === userId ? { ...m, role: newRole } : m))
    }

    const handleCancelInvite = (id: string) => {
        setInvites(prev => prev.filter(i => i.id !== id))
    }

    return (
        <div style={{ maxWidth: 800 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>👥 Ekip Yönetimi</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Ekip üyelerinizi yönetin, roller atayın ve davet gönderin.</p>
                </div>
                {(currentUserRole === 'owner' || currentUserRole === 'admin') && (
                    <button onClick={() => setShowInvite(true)} style={{
                        padding: '9px 18px', borderRadius: 10, border: 'none',
                        background: '#C84B31', color: 'white', fontSize: 13, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>+ Davet Gönder</button>
                )}
            </div>

            {/* Role Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
                {(Object.entries(ROLE_CONFIG) as [SiteRole, typeof ROLE_CONFIG[SiteRole]][]).map(([role, cfg]) => (
                    <div key={role} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: 22, marginBottom: 2 }}>{cfg.emoji}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color }}>{cfg.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginTop: 2 }}>{members.filter(m => m.role === role).length}</div>
                    </div>
                ))}
            </div>

            {/* Members List */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>🧑‍💼 Ekip Üyeleri</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
                {members.map(m => {
                    const rc = ROLE_CONFIG[m.role]
                    return (
                        <div key={m.userId} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                                background: rc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 16, fontWeight: 800, color: rc.color,
                            }}>{m.displayName.charAt(0)}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{m.displayName}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{m.email} · Katılım: {new Date(m.joinedAt).toLocaleDateString('tr')}</div>
                            </div>
                            <span style={{
                                fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                                background: rc.bg, color: rc.color,
                            }}>{rc.emoji} {rc.label}</span>

                            {/* Role Change Dropdown — only shown if current user can manage */}
                            {currentUserRole === 'owner' && m.role !== 'owner' && (
                                <select
                                    value={m.role}
                                    onChange={e => handleRoleChange(m.userId, e.target.value as SiteRole)}
                                    style={{
                                        padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                                        color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
                                    }}
                                >
                                    <option value="admin">Yönetici</option>
                                    <option value="editor">Editör</option>
                                    <option value="viewer">İzleyici</option>
                                </select>
                            )}

                            {/* Remove button — can't remove owner or self */}
                            {currentUserRole === 'owner' && m.role !== 'owner' && (
                                <button onClick={() => handleRemove(m.userId)} style={{
                                    padding: '4px 8px', borderRadius: 6, border: 'none', fontSize: 10,
                                    background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 600,
                                    cursor: 'pointer', fontFamily: 'inherit',
                                }}>✕ Çıkar</button>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Pending Invitations */}
            {invites.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>📨 Bekleyen Davetler</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {invites.map(inv => {
                            const rc = ROLE_CONFIG[inv.role]
                            return (
                                <div key={inv.id} style={{
                                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                                }}>
                                    <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📧</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{inv.email}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                                            Gönderildi: {new Date(inv.sentAt).toLocaleDateString('tr')} · Son: {new Date(inv.expiresAt).toLocaleDateString('tr')}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 4, background: rc.bg, color: rc.color }}>{rc.label}</span>
                                    <button onClick={() => handleCancelInvite(inv.id)} style={{
                                        padding: '3px 8px', borderRadius: 5, border: 'none', fontSize: 9,
                                        background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 600,
                                        cursor: 'pointer', fontFamily: 'inherit',
                                    }}>İptal</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Ownership Transfer — only owner */}
            {currentUserRole === 'owner' && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.04))',
                    border: '1px solid rgba(245,158,11,0.15)', borderRadius: 14, padding: 16,
                }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 6 }}>⚠️ Sahiplik Devri</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12, lineHeight: 1.5 }}>
                        Site sahipliğini bir ekip üyesine devredebilirsiniz. Bu işlem geri alınamaz. Devir sonrasında yönetici (admin) rolüne düşersiniz.
                    </p>
                    <button onClick={() => setShowTransfer(true)} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)',
                        background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontSize: 12, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>Sahipliği Devret</button>
                </div>
            )}

            {/* ═══════ Invite Modal ═══════ */}
            {showInvite && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowInvite(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 420, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>📨 Ekip Üyesi Davet Et</h3>

                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>E-posta Adresi</label>
                        <input value={newInvite.email} onChange={e => setNewInvite(p => ({ ...p, email: e.target.value }))}
                            placeholder="ornek@email.com" type="email"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit', marginTop: 4, marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />

                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Rol</label>
                        <div style={{ display: 'flex', gap: 6, marginTop: 6, marginBottom: 16 }}>
                            {(['admin', 'editor', 'viewer'] as SiteRole[]).map(role => {
                                const rc = ROLE_CONFIG[role]
                                return (
                                    <button key={role} onClick={() => setNewInvite(p => ({ ...p, role }))} style={{
                                        flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                                        background: newInvite.role === role ? rc.bg : 'rgba(255,255,255,0.03)',
                                        color: newInvite.role === role ? rc.color : 'rgba(255,255,255,0.3)',
                                        fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                                    }}>
                                        <span style={{ fontSize: 18 }}>{rc.emoji}</span>
                                        {rc.label}
                                    </button>
                                )
                            })}
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowInvite(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button onClick={handleInvite} disabled={!newInvite.email.trim()} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#C84B31', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📨 Davet Gönder</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════ Transfer Modal ═══════ */}
            {showTransfer && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowTransfer(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 400, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 8 }}>⚠️ Sahiplik Devri</h3>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16, lineHeight: 1.5 }}>Bu işlem geri alınamaz. Devir sonrası yönetici olursunuz.</p>

                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Devredilecek Kişi</label>
                        <select style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit', marginTop: 4, marginBottom: 16, outline: 'none' }}>
                            {members.filter(m => m.role !== 'owner').map(m => (
                                <option key={m.userId} value={m.userId}>{m.displayName} ({m.email})</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowTransfer(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#ef4444', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Devret</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
