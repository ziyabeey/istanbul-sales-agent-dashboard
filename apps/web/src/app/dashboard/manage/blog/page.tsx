'use client'

import { useState, useEffect } from 'react'

/* ═══════ Types ═══════ */
interface BlogPost {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    status: 'draft' | 'published' | 'scheduled' | 'archived'
    publishedAt?: string
    scheduledAt?: string
    createdAt: string
    updatedAt: string
    category?: string
    tags?: string[]
    seo?: { metaTitle?: string; metaDescription?: string }
    stats?: { views?: number; readTime?: number }
}

type TabStatus = 'all' | 'published' | 'draft' | 'scheduled'

/* ═══════ Blog Dashboard ═══════ */
export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<TabStatus>('all')
    const [showNewPost, setShowNewPost] = useState(false)
    const [showAIGen, setShowAIGen] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [aiTopics, setAiTopics] = useState<{ title: string; summary: string }[]>([])
    const [newTitle, setNewTitle] = useState('')
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [editContent, setEditContent] = useState('')
    const [saving, setSaving] = useState(false)

    // Fetch blog posts
    useEffect(() => {
        fetch('/api/v1/blog/posts')
            .then(r => r.ok ? r.json() : { posts: [] })
            .then(data => setPosts(data.posts || []))
            .catch(() => setPosts([]))
            .finally(() => setLoading(false))
    }, [])

    // Filter by tab
    const filtered = activeTab === 'all' ? posts : posts.filter(p => p.status === activeTab)

    // Stats
    const totalViews = posts.reduce((s, p) => s + (p.stats?.views || 0), 0)
    const publishedCount = posts.filter(p => p.status === 'published').length
    const draftCount = posts.filter(p => p.status === 'draft').length
    const scheduledCount = posts.filter(p => p.status === 'scheduled').length

    // Create new post
    const handleCreatePost = async () => {
        if (!newTitle.trim()) return
        setSaving(true)
        try {
            const res = await fetch('/api/v1/blog/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTitle.trim(),
                    content: '',
                    status: 'draft',
                }),
            })
            if (res.ok) {
                const data = await res.json()
                if (data.post) {
                    setPosts(prev => [data.post, ...prev])
                }
                setNewTitle('')
                setShowNewPost(false)
            }
        } catch { /* silent */ }
        setSaving(false)
    }

    // AI Blog Generation
    const handleAIGenerate = async () => {
        setAiLoading(true)
        setAiTopics([])
        try {
            const res = await fetch('/api/v1/blog/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'suggest_topics' }),
            })
            if (res.ok) {
                const data = await res.json()
                setAiTopics(data.topics || [
                    { title: 'Sektörünüzde Dijital Dönüşüm Adımları', summary: 'İşletmenizi dijitalleştirmek için 7 pratik adım ve 2024 trendleri.' },
                    { title: 'Müşteri Sadakati Nasıl Artırılır?', summary: 'Tekrar gelen müşteri oranınızı %40 artıracak stratejiler.' },
                    { title: 'Google\'da Üst Sıralara Çıkma Rehberi', summary: 'Yerel SEO ile çevrenizde en çok aranan işletme olun.' },
                ])
            }
        } catch {
            setAiTopics([
                { title: 'Sektörünüzde Dijital Dönüşüm Adımları', summary: 'İşletmenizi dijitalleştirmek için 7 pratik adım.' },
                { title: 'Müşteri Sadakati Nasıl Artırılır?', summary: 'Tekrar gelen müşteri oranınızı %40 artıracak stratejiler.' },
                { title: 'Google\'da Üst Sıralara Çıkma Rehberi', summary: 'Yerel SEO ile çevrenizde en çok aranan işletme olun.' },
            ])
        }
        setAiLoading(false)
    }

    // AI Write Blog
    const handleAIWrite = async (topic: { title: string; summary: string }) => {
        setAiLoading(true)
        try {
            const res = await fetch('/api/v1/blog/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'generate', title: topic.title, summary: topic.summary }),
            })
            if (res.ok) {
                const data = await res.json()
                if (data.post) {
                    setPosts(prev => [data.post, ...prev])
                    setShowAIGen(false)
                    setAiTopics([])
                    setEditingPost(data.post)
                    setEditContent(data.post.content || '')
                }
            }
        } catch { /* silent */ }
        setAiLoading(false)
    }

    // Update post
    const handleSavePost = async () => {
        if (!editingPost) return
        setSaving(true)
        try {
            await fetch(`/api/v1/blog/posts/${editingPost.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editContent, title: editingPost.title }),
            })
            setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, content: editContent } : p))
        } catch { /* silent */ }
        setSaving(false)
    }

    // Publish post
    const handlePublish = async (postId: string) => {
        try {
            await fetch(`/api/v1/blog/posts/${postId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'publish' }),
            })
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, status: 'published' as const } : p))
            setEditingPost(null)
        } catch { /* silent */ }
    }

    // Delete post
    const handleDelete = async (postId: string) => {
        if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return
        try {
            await fetch(`/api/v1/blog/posts/${postId}`, { method: 'DELETE' })
            setPosts(prev => prev.filter(p => p.id !== postId))
            if (editingPost?.id === postId) setEditingPost(null)
        } catch { /* silent */ }
    }

    const STATUS_BADGE: Record<string, { label: string; bg: string; color: string }> = {
        published: { label: 'Yayında', bg: '#dcfce7', color: '#166534' },
        draft: { label: 'Taslak', bg: '#fef9c3', color: '#854d0e' },
        scheduled: { label: 'Zamanlanmış', bg: '#dbeafe', color: '#1e40af' },
        archived: { label: 'Arşiv', bg: '#f1f5f9', color: '#475569' },
    }

    return (
        <div style={{ maxWidth: 900 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>📝 Blog Yönetimi</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>İçerik stratejinizi AI destekli yönetin.</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setShowAIGen(true)} style={{
                        padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(168,85,247,0.3)',
                        background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))',
                        color: '#c084fc', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>✨ AI ile Yaz</button>
                    <button onClick={() => setShowNewPost(true)} style={{
                        padding: '9px 18px', borderRadius: 10, border: 'none',
                        background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>+ Yeni Yazı</button>
                </div>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam Yazı', value: posts.length, emoji: '📄' },
                    { label: 'Yayında', value: publishedCount, emoji: '🟢' },
                    { label: 'Taslak', value: draftCount, emoji: '📝' },
                    { label: 'Görüntülenme', value: totalViews.toLocaleString(), emoji: '👁️' },
                ].map((k, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Status tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                {([
                    ['all', 'Tümü', posts.length],
                    ['published', 'Yayında', publishedCount],
                    ['draft', 'Taslak', draftCount],
                    ['scheduled', 'Zamanlanmış', scheduledCount],
                ] as const).map(([key, label, count]) => (
                    <button key={key} onClick={() => setActiveTab(key)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none',
                        background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                        color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                        {label} ({count})
                    </button>
                ))}
            </div>

            {/* Posts list */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)' }}>Yükleniyor...</div>
            ) : filtered.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: 48, color: 'rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📝</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Henüz blog yazınız yok</div>
                    <div style={{ fontSize: 12 }}>AI ile ilk yazınızı oluşturun!</div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filtered.map(post => {
                        const badge = STATUS_BADGE[post.status] || STATUS_BADGE.draft
                        return (
                            <div key={post.id} style={{
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 12, padding: '16px 18px', cursor: 'pointer', transition: '0.15s',
                                display: 'flex', alignItems: 'center', gap: 14,
                            }}
                                onClick={() => { setEditingPost(post); setEditContent(post.content || '') }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{post.title}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr') : '—'}</span>
                                        {post.stats?.views !== undefined && <span>👁️ {post.stats.views}</span>}
                                        {post.stats?.readTime && <span>⏱️ {post.stats.readTime} dk</span>}
                                        {post.category && <span>📁 {post.category}</span>}
                                    </div>
                                </div>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
                                    background: badge.bg, color: badge.color,
                                }}>{badge.label}</span>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(post.id) }} style={{
                                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)',
                                    cursor: 'pointer', fontSize: 14, padding: 4,
                                }}>🗑️</button>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* ═══════ New Post Modal ═══════ */}
            {showNewPost && (
                <ModalOverlay onClose={() => setShowNewPost(false)}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>📝 Yeni Blog Yazısı</h3>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Başlık</label>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Blog yazınızın başlığı..."
                        style={{
                            width: '100%', padding: '10px 14px', borderRadius: 8,
                            border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                            color: 'white', fontSize: 14, fontFamily: 'inherit', marginTop: 6, marginBottom: 16,
                            outline: 'none', boxSizing: 'border-box',
                        }}
                        onKeyDown={e => e.key === 'Enter' && handleCreatePost()}
                        autoFocus
                    />
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowNewPost(false)} style={cancelBtnStyle}>İptal</button>
                        <button onClick={handleCreatePost} disabled={saving || !newTitle.trim()} style={primaryBtnStyle}>
                            {saving ? 'Oluşturuluyor...' : 'Taslak Oluştur'}
                        </button>
                    </div>
                </ModalOverlay>
            )}

            {/* ═══════ AI Generate Modal ═══════ */}
            {showAIGen && (
                <ModalOverlay onClose={() => { setShowAIGen(false); setAiTopics([]) }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>✨ AI Blog Yazı Üretici</h3>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
                        AI sektörünüzü analiz eder ve SEO-optimize konu önerileri sunar.
                    </p>

                    {aiTopics.length === 0 ? (
                        <button onClick={handleAIGenerate} disabled={aiLoading} style={{
                            width: '100%', padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(168,85,247,0.2)',
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.08))',
                            color: '#c084fc', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                            {aiLoading ? '🔄 AI analiz ediyor...' : '🚀 Konu Önerileri Al'}
                        </button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                                3 KONU ÖNERİSİ — birini seçin
                            </div>
                            {aiTopics.map((topic, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 10, padding: 14, cursor: 'pointer', transition: '0.15s',
                                }}
                                    onClick={() => handleAIWrite(topic)}
                                >
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>{topic.title}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{topic.summary}</div>
                                </div>
                            ))}
                            {aiLoading && (
                                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                                    ✍️ AI yazınızı oluşturuyor... (~30 sn)
                                </div>
                            )}
                        </div>
                    )}
                </ModalOverlay>
            )}

            {/* ═══════ Post Editor Modal ═══════ */}
            {editingPost && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'stretch',
                }} onClick={() => setEditingPost(null)}>
                    <div style={{
                        margin: '20px auto', width: '90vw', maxWidth: 800,
                        background: '#0c0c14', borderRadius: 16,
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    }} onClick={e => e.stopPropagation()}>
                        {/* Editor header */}
                        <div style={{
                            padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                            <input
                                value={editingPost.title}
                                onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                                style={{
                                    fontSize: 18, fontWeight: 800, color: 'white', background: 'transparent',
                                    border: 'none', outline: 'none', fontFamily: 'inherit', flex: 1,
                                }}
                            />
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button onClick={handleSavePost} disabled={saving} style={cancelBtnStyle}>
                                    {saving ? '...' : '💾 Kaydet'}
                                </button>
                                {editingPost.status !== 'published' && (
                                    <button onClick={() => handlePublish(editingPost.id)} style={primaryBtnStyle}>🚀 Yayınla</button>
                                )}
                                <button onClick={() => setEditingPost(null)} style={{ ...cancelBtnStyle, padding: '6px 10px' }}>✕</button>
                            </div>
                        </div>

                        {/* Content area */}
                        <textarea
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            placeholder="Blog içeriğinizi buraya yazın... (Markdown desteklenir)"
                            style={{
                                flex: 1, padding: 20, background: 'transparent', border: 'none',
                                color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.8,
                                fontFamily: 'inherit', resize: 'none', outline: 'none',
                                minHeight: 400,
                            }}
                        />

                        {/* Status bar */}
                        <div style={{
                            padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', gap: 16,
                            fontSize: 11, color: 'rgba(255,255,255,0.3)',
                        }}>
                            <span>{editContent.split(/\s+/).filter(Boolean).length} kelime</span>
                            <span>⏱️ ~{Math.max(1, Math.round(editContent.split(/\s+/).filter(Boolean).length / 200))} dk okuma</span>
                            <span style={{ marginLeft: 'auto' }}>
                                {(STATUS_BADGE[editingPost.status] || STATUS_BADGE.draft).label}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ═══════ Modal Overlay ═══════ */
function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={onClose}>
            <div style={{
                background: '#0c0c14', borderRadius: 18, padding: 24,
                width: 440, maxWidth: '90vw',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

/* ═══════ Shared Button Styles ═══════ */
const primaryBtnStyle: React.CSSProperties = {
    padding: '8px 16px', borderRadius: 8, border: 'none',
    background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
}

const cancelBtnStyle: React.CSSProperties = {
    padding: '8px 16px', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
    color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
}
