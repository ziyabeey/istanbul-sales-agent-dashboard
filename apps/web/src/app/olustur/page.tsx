'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

/* ═══════════════════════════════════════════════
   kepenk.ai — Site Oluşturma Platformu
   AI Destekli Form + Şablon Galerisi + Generation UX
   ═══════════════════════════════════════════════ */

const GENERATION_STEPS = [
    "Sektörel veriler (lokasyon/hedef kitle) analiz ediliyor...",
    "Endüstri standardı renk paletleri uyarlandı...",
    "Framer Motion yüksek performans fizik motoru entegre ediliyor...",
    "İşletme modelinize uygun başlıklar GPT-4o ile yazılıyor...",
    "GlobalSections UX Modülleri arayüze bağlanıyor...",
    "Responsive Headless (Edge) altyapısı derleniyor...",
    "Siteniz yayına asılıyor..."
]

// Template Data
const TEMPLATES = [
    { id: 't1', name: 'Modern İşletme', category: 'Designed', industry: 'İşletme', style: 'Minimal', features: ['Mağaza', 'Blog', 'İletişim'], color: '#1a1a2e', popular: true },
    { id: 't2', name: 'E-Ticaret Pro', category: 'Designed', industry: 'Teknoloji', style: 'Minimal', features: ['Mağaza', 'Ödeme', 'Stok'], color: '#16213e', popular: true },
    { id: 't3', name: 'Yaratıcı Ajans', category: 'Designed', industry: 'Yaratıcı', style: 'Dark', features: ['Portfolyo', 'Blog', 'İletişim'], color: '#0f3460', popular: false },
    { id: 't4', name: 'Restoran & Kafe', category: 'Designed', industry: 'İşletme', style: 'Illustrative', features: ['Rezervasyon', 'Menü', 'Sipariş'], color: '#533483', popular: true },
    { id: 't5', name: 'Kişisel Portfolio', category: 'Designed', industry: 'Yaratıcı', style: 'Minimal', features: ['Portfolyo', 'Blog'], color: '#2b2d42', popular: false },
    { id: 't6', name: 'Güzellik & Spa', category: 'Designed', industry: 'Moda & Güzellik', style: 'Typography', features: ['Randevu', 'Galeri', 'Fiyatlandırma'], color: '#8d6e63', popular: false },
    { id: 't7', name: 'Teknoloji Startup', category: 'Designed', industry: 'Teknoloji', style: 'Dark', features: ['Blog', 'Fiyatlandırma', 'CMS'], color: '#1B1B21', popular: true },
    { id: 't8', name: 'Fitness & Spor', category: 'Designed', industry: 'İşletme', style: 'Dark', features: ['Randevu', 'Blog', 'Etkinlik'], color: '#212529', popular: false },
    { id: 't9', name: 'Eğitim & Kurs', category: 'Designed', industry: 'İşletme', style: 'Minimal', features: ['Blog', 'CMS', 'E-Ticaret'], color: '#1d3557', popular: false },
    { id: 't10', name: 'Hukuk Bürosu', category: 'Designed', industry: 'İşletme', style: 'Typography', features: ['Blog', 'İletişim', 'CMS'], color: '#2d3436', popular: false },
    { id: 't11', name: 'Wireframe Basic', category: 'Wireframes', industry: 'İşletme', style: 'Minimal', features: ['Blog', 'İletişim'], color: '#636e72', popular: false },
    { id: 't12', name: 'Wireframe eCommerce', category: 'Wireframes', industry: 'Teknoloji', style: 'Minimal', features: ['Mağaza', 'Ödeme'], color: '#636e72', popular: false },
]

const INSPIRATIONAL = [
    { id: 'i1', name: 'Antigravity Lab', desc: 'Uzay temalı immersive deneyim merkezi. Koyu lacivert, neon aksan, parallax scroll.', features: ['Scroll Animation', 'Loop Animation', 'Hover Effects', 'Custom CSS', 'Transparent Video'], tag: 'Yeni' },
    { id: 'i2', name: 'Neon District', desc: 'Cyberpunk tarzı gece hayatı ve etkinlik sitesi. Dinamik animasyonlar.', features: ['Glassmorphism', 'Parallax Scroll', 'Gradient Meshes', 'Micro-animations'], tag: 'Popüler' },
    { id: 'i3', name: 'Botanica Studio', desc: 'Organik ve doğal ürünler için minimalist tasarım. Soft renkler.', features: ['Masonry Grid', 'Lightbox', 'Smooth Scroll', 'Lazy Loading'], tag: 'Editörün Seçimi' },
]

const CATEGORIES = {
    'Ana': ['Tüm Şablonlar', 'Wireframe', 'Tasarlanmış', 'İlham Verici'],
    'Tür': ['Tek Sayfa', 'E-Ticaret', 'Portfolyo', 'Kurumsal', 'CMS'],
    'Sektör': ['İşletme', 'Teknoloji', 'Moda & Güzellik', 'Yaratıcı'],
    'Özellik': ['Mağaza', 'Randevu', 'Portfolyo', 'Blog', 'Etkinlik', 'Fiyatlandırma', 'Restoran'],
    'Stil': ['Dark', 'Minimal', 'Illustrative', 'Typography'],
}

const SERVICES = [
    { id: 'sell', label: 'Ürün/hizmet satışı', icon: '🛒' },
    { id: 'booking', label: 'Online randevu', icon: '📅' },
    { id: 'blog', label: 'Blog yazma', icon: '✍️' },
    { id: 'events', label: 'Etkinlik düzenleme', icon: '🎪' },
    { id: 'portfolio', label: 'Portfolyo sergileme', icon: '🖼️' },
    { id: 'restaurant', label: 'Restoran/Kafe', icon: '🍽️' },
    { id: 'education', label: 'Eğitim/Kurs', icon: '📚' },
    { id: 'consulting', label: 'Danışmanlık', icon: '💼' },
]

const TONES = ['Nötr', 'Profesyonel', 'Bilgilendirici', 'Eğlenceli', 'Dostça', 'Samimi', 'Saygılı', 'Kendinden emin']

const FILTERS_QUICK = ['Öne Çıkanlar', 'Tek Sayfa', 'Portfolyo', 'Pazarlama', 'E-Ticaret', 'Wireframe', 'Minimal']

/* ═══════ MAIN COMPONENT ═══════ */
export default function SiteOlusturPage() {
    const router = useRouter()
    const [view, setView] = useState<'choose' | 'ai' | 'templates' | 'generating'>('choose')
    const [step, setStep] = useState(0)
    const [showBrowse, setShowBrowse] = useState(false)
    const [search, setSearch] = useState('')
    const [activeFilter, setActiveFilter] = useState('Öne Çıkanlar')
    const [currentPage, setCurrentPage] = useState(1)
    const [quickViewId, setQuickViewId] = useState<string | null>(null)
    const inspCarouselRef = useRef<HTMLDivElement>(null)

    // Generation state
    const [genStep, setGenStep] = useState(0)

    // AI Form state
    const [form, setForm] = useState({
        businessType: '', description: '', services: [] as string[], name: '', location: '',
        audience: '', differentiator: '', goals: '', tones: [] as string[],
    })
    const updateForm = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))
    const toggleService = (id: string) => setForm(f => ({ ...f, services: f.services.includes(id) ? f.services.filter(s => s !== id) : [...f.services, id] }))
    const toggleTone = (t: string) => setForm(f => ({ ...f, tones: f.tones.includes(t) ? f.tones.filter(x => x !== t) : f.tones.length < 2 ? [...f.tones, t] : f.tones }))

    // Actual Generation Flow via API
    useEffect(() => {
        let isCancelled = false;

        const generateAIContent = async () => {
            try {
                setGenStep(0);
                
                const res = await fetch('/api/generate-site', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                
                const data = await res.json();
                
                if (!isCancelled) {
                    if (data.success) {
                        // AI'dan gelen veriyi kaydediyoruz
                        localStorage.setItem('kepenk_ai_generated_site', JSON.stringify(data.result));
                    }
                    
                    // API yanıt verdikten sonra son adıma geç ve yönlendir
                    setGenStep(GENERATION_STEPS.length - 1);
                    setTimeout(() => router.push('/dashboard/sitem'), 1800);
                }
            } catch (error) {
                console.error("AI Generation failed:", error);
                if (!isCancelled) {
                    setGenStep(GENERATION_STEPS.length - 1);
                    setTimeout(() => router.push('/dashboard/sitem'), 1800);
                }
            }
        };

        if (view === 'generating') {
            generateAIContent();
            
            // Kullanıcıya yükleme hissi vermek için arkaplanda adımları ilerleten görsel sayaç
            // API bitene kadar son 2 adıma geçmez.
            const timer = setInterval(() => {
                setGenStep(prev => {
                    if (prev < GENERATION_STEPS.length - 2) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 1500);

            return () => {
                isCancelled = true;
                clearInterval(timer);
            }
        }
    }, [view, router, form])

    // Filter templates
    const filtered = TEMPLATES.filter(t => {
        if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false
        if (activeFilter === 'Öne Çıkanlar') return t.popular
        if (activeFilter === 'Wireframe') return t.category === 'Wireframes'
        if (activeFilter === 'E-Ticaret') return t.features.includes('Mağaza')
        if (activeFilter === 'Portfolyo') return t.features.includes('Portfolyo')
        if (activeFilter === 'Minimal') return t.style === 'Minimal'
        if (activeFilter === 'Tek Sayfa') return true
        if (activeFilter === 'Pazarlama') return true
        return true
    })
    const perPage = 6
    const totalPages = Math.ceil(filtered.length / perPage)
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

    /* ═══════ GENERATING VIEW (THE CRM AUTOMATION SCREEN) ═══════ */
    if (view === 'generating') {
        const progressPercent = Math.min(100, Math.round(((genStep + 1) / GENERATION_STEPS.length) * 100))
        return (
            <div style={{ ...S.page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle at center, rgba(220, 70, 32, 0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: 640, width: '100%', padding: 40, textAlign: 'center', zIndex: 10 }}>
                    
                    {/* Glowing Core / Pulse Radar */}
                    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'conic-gradient(from 0deg, transparent, #DC4620, #8b5cf6)', animation: 'spin 2s linear infinite', filter: 'blur(20px)', opacity: 0.6 }} />
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', animation: 'pulse 2s ease-in-out infinite' }} />
                        <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(220, 70, 32, 0.4)' }}>
                           <span style={{ fontSize: 32, animation: 'heartbeat 1.5s ease-in-out infinite' }}>🤖</span>
                        </div>
                    </div>

                    <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, fontFamily: "'Inter', system-ui", letterSpacing: '-0.03em' }}>
                        Site Otonom İnşa Ediliyor
                    </h1>
                    <p style={{ color: '#868686', marginBottom: 32, fontSize: 16 }}>
                        Milyonlarca satır kod sizin yerinize yazılırken lütfen bekleyin.
                    </p>
                    
                    <div style={{ height: 6, background: '#1A1A1A', borderRadius: 10, overflow: 'hidden', marginBottom: 32, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                        <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #8b5cf6, #DC4620, #FF6B45)', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 0 10px rgba(220, 70, 32, 0.5)' }} />
                    </div>
                    
                    {/* Fake Terminal UI */}
                    <div style={{ background: '#000', border: '1px solid #222', borderRadius: 16, padding: 24, textAlign: 'left', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#34d399', height: 260, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)' }}>
                        {GENERATION_STEPS.slice(0, genStep + 1).map((stepText, idx) => (
                            <div key={idx} style={{ opacity: idx === genStep ? 1 : 0.5, marginBottom: 12, animation: 'slideUp 0.4s ease-out' }}>
                                <span style={{ color: '#6b7280', marginRight: 8, fontSize: 11 }}>[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                                {idx === genStep ? '>> ' : '> '}{stepText}
                                {idx === genStep && <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>}
                            </div>
                        ))}
                    </div>

                    {genStep === GENERATION_STEPS.length - 1 && (
                       <div style={{ marginTop: 24, padding: '16px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 12, color: '#34d399', fontSize: 15, fontWeight: 'bold', animation: 'fadeIn 0.5s ease-out' }}>
                           ✅ Mükemmel. Sistem entegrasyonu tamamlandı, panele geçiş yapılıyor...
                       </div>
                    )}
                </div>

                <style>{`
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(0.95); opacity: 0.5; } }
                    @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
                    @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes blink { 50% { opacity: 0; } }
                `}</style>
            </div>
        )
    }

    /* ═══════ CHOOSE VIEW ═══════ */
    if (view === 'choose') return (
        <div style={S.page}>
            <nav style={S.nav}>
                <a href="/dashboard" style={S.logo}>kepenk<span style={{ color: '#DC4620' }}>.ai</span></a>
                <div style={{ flex: 1 }} />
                <a href="/dashboard" style={S.navLink}>Dashboard</a>
            </nav>
            <div style={{ maxWidth: 800, margin: '80px auto', textAlign: 'center' as const, padding: '0 24px' }}>
                <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.15, marginBottom: 16, fontFamily: "'Inter', system-ui" }}>
                    Web Sitenizi <span style={{ background: 'linear-gradient(135deg, #DC4620, #FF6B45)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Oluşturun</span>
                </h1>
                <p style={{ fontSize: 16, color: '#868686', marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
                    Yapay zeka ile sıfırdan site oluşturun veya profesyonel şablonlardan birini seçerek başlayın.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 600, margin: '0 auto' }}>
                    <button onClick={() => setView('ai')} style={S.choiceCard}>
                        <div style={S.choiceIcon}>✨</div>
                        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Yapay Zeka ile Oluştur</div>
                        <p style={{ fontSize: 13, color: '#868686', lineHeight: 1.5 }}>İşletmenizi tanımlayın, yapay zeka sitenizi saniyeler içinde oluştursun.</p>
                        <div style={S.choiceArrow}>→</div>
                    </button>
                    <button onClick={() => setView('templates')} style={S.choiceCard}>
                        <div style={S.choiceIcon}>🎨</div>
                        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Şablonla Başlayın</div>
                        <p style={{ fontSize: 13, color: '#868686', lineHeight: 1.5 }}>Profesyonel şablonları inceleyin ve sitenize uygun olanı seçin.</p>
                        <div style={S.choiceArrow}>→</div>
                    </button>
                </div>
            </div>
        </div>
    )

    /* ═══════ AI FORM VIEW ═══════ */
    if (view === 'ai') {
        const steps = [
            // Step 0: Business Type + Description
            <div key="s0">
                <h2 style={S.stepTitle}>İşletmenizi Tanımlayın</h2>
                <p style={S.stepSub}>Yapay zeka bu bilgileri kullanarak sitenizin içeriklerini, yapısını ve tasarımını oluşturacak.</p>
                <label style={S.label}>
                    İşletme türü nedir? <span style={S.required}>*</span>
                    <input value={form.businessType} onChange={e => updateForm('businessType', e.target.value)} maxLength={100} placeholder="örn: Berber salonu, e-ticaret mağazası, blog..." style={S.input} />
                    <span style={S.charCount}>{form.businessType.length}/100</span>
                </label>
                <label style={S.label}>
                    Bu işletmeyi açıklayın <span style={S.required}>*</span>
                    <textarea value={form.description} onChange={e => updateForm('description', e.target.value)} maxLength={1000} rows={4} placeholder="İşletmenizi detaylı olarak tanımlayın. Ne iş yapıyorsunuz? Hangi ürün veya hizmetleri sunuyorsunuz?" style={{ ...S.input, resize: 'vertical' as const, minHeight: 100 }} />
                    <span style={S.charCount}>{form.description.length}/1000</span>
                </label>
            </div>,
            // Step 1: Services
            <div key="s1">
                <h2 style={S.stepTitle}>Temel Hizmetleriniz</h2>
                <p style={S.stepSub}>Sitenizin temel hizmetini seçin. Birden fazla seçebilirsiniz.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {SERVICES.map(s => (
                        <button key={s.id} onClick={() => toggleService(s.id)} style={{ ...S.serviceChip, background: form.services.includes(s.id) ? '#DC4620' : '#F8F8F8', color: form.services.includes(s.id) ? '#fff' : '#000', borderColor: form.services.includes(s.id) ? '#DC4620' : '#E8E8E8' }}>
                            <span style={{ fontSize: 20 }}>{s.icon}</span>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                        </button>
                    ))}
                </div>
            </div>,
            // Step 2: Name + Location + Audience
            <div key="s2">
                <h2 style={S.stepTitle}>İşletme Detayları</h2>
                <label style={S.label}>
                    İşletmenizin adı nedir?
                    <input value={form.name} onChange={e => updateForm('name', e.target.value)} maxLength={100} placeholder="örn: Antigravity Experience Lab" style={S.input} />
                    <span style={S.charCount}>{form.name.length}/100</span>
                </label>
                <label style={S.label}>
                    İşletmeniz nerede bulunuyor?
                    <input value={form.location} onChange={e => updateForm('location', e.target.value)} placeholder="Adres veya şehir arayın..." style={S.input} />
                </label>
                <label style={S.label}>
                    Hedef kitle kimlerden oluşuyor?
                    <input value={form.audience} onChange={e => updateForm('audience', e.target.value)} maxLength={200} placeholder="örn: 18-45 yaş macera meraklıları, kurumsal etkinlik planlayıcıları" style={S.input} />
                    <span style={S.charCount}>{form.audience.length}/200</span>
                </label>
            </div>,
            // Step 3: Differentiator + Goals
            <div key="s3">
                <h2 style={S.stepTitle}>Fark Yaratan Özellikler</h2>
                <label style={S.label}>
                    Bu işletmeyi diğerlerinden ayıran nedir?
                    <textarea value={form.differentiator} onChange={e => updateForm('differentiator', e.target.value)} maxLength={1000} rows={3} placeholder="Sizi rakiplerinizden ayıran benzersiz özellikleriniz neler?" style={{ ...S.input, resize: 'vertical' as const }} />
                    <span style={S.charCount}>{form.differentiator.length}/1000</span>
                </label>
                <label style={S.label}>
                    Bu site için temel hedefleriniz nelerdir?
                    <textarea value={form.goals} onChange={e => updateForm('goals', e.target.value)} maxLength={1000} rows={3} placeholder="örn: Online satışları artırmak, marka bilinirliği oluşturmak..." style={{ ...S.input, resize: 'vertical' as const }} />
                    <span style={S.charCount}>{form.goals.length}/1000</span>
                </label>
            </div>,
            // Step 4: Tone
            <div key="s4">
                <h2 style={S.stepTitle}>Metin Üslubu</h2>
                <p style={S.stepSub}>Site içeriklerinizin yazım tonunu belirleyin. En fazla 2 adet seçin.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                    {TONES.map(t => (
                        <button key={t} onClick={() => toggleTone(t)} style={{ padding: '8px 18px', borderRadius: 20, border: '1px solid', borderColor: form.tones.includes(t) ? '#DC4620' : '#E8E8E8', background: form.tones.includes(t) ? '#DC4620' : '#fff', color: form.tones.includes(t) ? '#fff' : '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', system-ui", transition: '0.15s' }}>
                            {t}
                        </button>
                    ))}
                </div>
                {form.tones.length === 2 && <p style={{ fontSize: 12, color: '#868686', marginTop: 8 }}>Maksimum 2 üslup seçtiniz.</p>}
            </div>,
        ]

        return (
            <div style={S.page}>
                <nav style={S.nav}>
                    <a href="/dashboard" style={S.logo}>kepenk<span style={{ color: '#DC4620' }}>.ai</span></a>
                    <div style={{ flex: 1 }} />
                    <button onClick={() => setView('choose')} style={S.navLink}>← Geri</button>
                </nav>
                <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 24px' }}>
                    {/* Progress */}
                    <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
                        {steps.map((_, i) => (
                            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? 'linear-gradient(90deg, #DC4620, #FF6B45)' : '#E8E8E8', transition: '0.3s' }} />
                        ))}
                    </div>

                    {/* Step Content */}
                    {steps[step]}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                        <button onClick={() => step > 0 ? setStep(step - 1) : setView('choose')} style={S.btnSecondary}>
                            {step === 0 ? '← Geri' : '← Önceki'}
                        </button>
                        {step < steps.length - 1 ? (
                            <button onClick={() => setStep(step + 1)} style={S.btnPrimary}>
                                Devam Et →
                            </button>
                        ) : (
                            <button onClick={() => setView('generating')} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg, #DC4620, #FF6B45)' }}>
                                ✨ Siteyi Oluştur
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    /* ═══════ TEMPLATES VIEW ═══════ */
    return (
        <div style={S.page}>
            <nav style={S.nav}>
                <a href="/dashboard" style={S.logo}>kepenk<span style={{ color: '#DC4620' }}>.ai</span></a>
                <div style={{ flex: 1 }} />
                <button onClick={() => setView('choose')} style={S.navLink}>← Geri</button>
            </nav>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
                {/* Search & Filter Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1) }} placeholder="Şablon ara..." style={{ flex: 1, maxWidth: 300, padding: '10px 14px 10px 36px', border: '1px solid #E8E8E8', borderRadius: 10, fontSize: 13, fontFamily: "'Inter', system-ui", outline: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23868686' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: '12px center' }} />
                    <button onClick={() => setShowBrowse(!showBrowse)} style={{ padding: '10px 16px', border: '1px solid #E8E8E8', borderRadius: 10, fontSize: 13, fontWeight: 600, background: showBrowse ? '#DC4620' : '#fff', color: showBrowse ? '#fff' : '#000', cursor: 'pointer', fontFamily: "'Inter', system-ui" }}>
                        Kategoriler {showBrowse ? '✕' : '▾'}
                    </button>
                </div>

                {/* Quick Filters */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' as const }}>
                    {FILTERS_QUICK.map(f => (
                        <button key={f} onClick={() => { setActiveFilter(f); setCurrentPage(1) }} style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid', borderColor: activeFilter === f ? '#DC4620' : '#E8E8E8', background: activeFilter === f ? '#FFF0EC' : '#fff', color: activeFilter === f ? '#DC4620' : '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', system-ui", transition: '0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 24 }}>
                    {/* Browse Panel */}
                    {showBrowse && (
                        <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #E8E8E8', paddingRight: 20 }}>
                            {Object.entries(CATEGORIES).map(([group, items]) => (
                                <div key={group} style={{ marginBottom: 18 }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#868686', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 8 }}>{group}</div>
                                    {items.map(item => (
                                        <button key={item} onClick={() => setActiveFilter(item)} style={{ display: 'block', width: '100%', textAlign: 'left' as const, padding: '6px 10px', fontSize: 13, color: '#000', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, fontFamily: "'Inter', system-ui", fontWeight: 500 }}>
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Template Grid */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                            {paged.map(t => (
                                <div key={t.id} style={S.templateCard}>
                                    <div style={{ height: 180, background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`, borderRadius: '8px 8px 0 0', position: 'relative' as const, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 32, opacity: 0.3 }}>🌐</span>
                                        {t.popular && <span style={{ position: 'absolute' as const, top: 8, right: 8, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, background: '#DC4620', color: '#fff' }}>Popüler</span>}
                                    </div>
                                    <div style={{ padding: '14px 16px' }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{t.name}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4, marginBottom: 12 }}>
                                            {t.features.map(f => <span key={f} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#F8F8F8', color: '#868686' }}>{f}</span>)}
                                        </div>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button style={S.btnEdit}>Düzenle</button>
                                            <button style={S.btnView}>Önizle</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 32 }}>
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={S.pageBtn}>←</button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ ...S.pageBtn, background: currentPage === i + 1 ? '#DC4620' : '#fff', color: currentPage === i + 1 ? '#fff' : '#000' }}>{i + 1}</button>
                                ))}
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={S.pageBtn}>→</button>
                            </div>
                        )}

                        {/* Inspirational Templates */}
                        <div style={{ marginBottom: 32 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>İlham Verici Şablonlar</h2>
                            <div style={{ display: 'flex', gap: 16, overflow: 'hidden', position: 'relative' as const }} ref={inspCarouselRef}>
                                {INSPIRATIONAL.map(t => (
                                    <div key={t.id} style={{ minWidth: 320, flex: '0 0 auto', border: '1px solid #E8E8E8', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setQuickViewId(quickViewId === t.id ? null : t.id)}>
                                        <div style={{ height: 140, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const }}>
                                            <span style={{ fontSize: 36, opacity: 0.4 }}>✨</span>
                                            <span style={{ position: 'absolute' as const, top: 8, left: 8, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)' }}>İlham Verici</span>
                                            <span style={{ position: 'absolute' as const, top: 8, right: 8, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, background: '#DC4620', color: '#fff' }}>{t.tag}</span>
                                        </div>
                                        <div style={{ padding: 16 }}>
                                            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.name}</div>
                                            <p style={{ fontSize: 12, color: '#868686', lineHeight: 1.5, marginBottom: 10 }}>{t.desc}</p>
                                            {quickViewId === t.id && (
                                                <div style={{ marginBottom: 10 }}>
                                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#868686', marginBottom: 6 }}>ÖZELLİKLER</div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>
                                                        {t.features.map(f => <span key={f} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, background: '#FFF0EC', color: '#DC4620', fontWeight: 600 }}>{f}</span>)}
                                                    </div>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button style={S.btnEdit}>Düzenle</button>
                                                <button style={S.btnView}>Önizle</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Marketplace Banner */}
                        <div style={{ background: 'linear-gradient(135deg, #F8F8F8, #FFF0EC)', border: '1px solid #E8E8E8', borderRadius: 12, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Daha fazla şablon arayın.</div>
                                <div style={{ fontSize: 13, color: '#868686' }}>Partnerlerimiz tarafından oluşturulan şablonları keşfedin.</div>
                            </div>
                            <a href="#" style={{ fontSize: 13, fontWeight: 700, color: '#DC4620', textDecoration: 'none' }}>Marketplace&apos;i Keşfet →</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid #E8E8E8', padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, fontSize: 12 }}>
                    <div>
                        <div style={{ fontWeight: 800, marginBottom: 10, color: '#000' }}>Ürün</div>
                        {['Site Editörü', 'Şablonlar', 'AI Oluşturucu', 'Hosting'].map(l => <a key={l} href="#" style={{ display: 'block', color: '#868686', marginBottom: 6, textDecoration: 'none' }}>{l}</a>)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, marginBottom: 10, color: '#000' }}>Kaynaklar</div>
                        {['Yardım Merkezi', 'Blog', 'API Dokümantasyon', 'Topluluk'].map(l => <a key={l} href="#" style={{ display: 'block', color: '#868686', marginBottom: 6, textDecoration: 'none' }}>{l}</a>)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, marginBottom: 10, color: '#000' }}>Şirket</div>
                        {['Hakkımızda', 'Kariyer', 'İletişim', 'Basın'].map(l => <a key={l} href="#" style={{ display: 'block', color: '#868686', marginBottom: 6, textDecoration: 'none' }}>{l}</a>)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, marginBottom: 10, color: '#000' }}>Sosyal Medya</div>
                        <div style={{ display: 'flex', gap: 10, fontSize: 18 }}>
                            {['📺', '🐦', '📸', '👤', '🎵'].map((i, idx) => <span key={idx} style={{ cursor: 'pointer' }}>{i}</span>)}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 24, fontSize: 11, color: '#868686', display: 'flex', gap: 16 }}>
                    <span>© 2026 kepenk.ai</span>
                    <a href="#" style={{ color: '#868686', textDecoration: 'none' }}>Kullanım Koşulları</a>
                    <a href="#" style={{ color: '#868686', textDecoration: 'none' }}>Gizlilik Politikası</a>
                </div>
            </footer>
        </div>
    )
}

/* ═══════ STYLE CONSTANTS ═══════ */
const S: Record<string, React.CSSProperties> = {
    page: { background: '#fff', minHeight: '100vh', fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif", color: '#000' },
    nav: { display: 'flex', alignItems: 'center', padding: '0 24px', height: 56, borderBottom: '1px solid #E8E8E8', position: 'sticky', top: 0, background: '#fff', zIndex: 100 },
    logo: { fontSize: 18, fontWeight: 900, color: '#000', textDecoration: 'none', letterSpacing: '-0.02em' },
    navLink: { fontSize: 13, fontWeight: 600, color: '#868686', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', fontFamily: "'Inter', system-ui" },
    choiceCard: { background: '#fff', border: '1px solid #E8E8E8', borderRadius: 16, padding: '32px 24px', textAlign: 'left' as const, cursor: 'pointer', transition: '0.2s', fontFamily: "'Inter', system-ui", position: 'relative' as const },
    choiceIcon: { fontSize: 36, marginBottom: 14 },
    choiceArrow: { position: 'absolute' as const, bottom: 16, right: 16, fontSize: 20, color: '#DC4620', fontWeight: 700 },
    stepTitle: { fontSize: 24, fontWeight: 800, marginBottom: 6 },
    stepSub: { fontSize: 13, color: '#868686', marginBottom: 24, lineHeight: 1.5 },
    label: { display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 18, position: 'relative' as const },
    required: { color: '#DC4620' },
    input: { display: 'block', width: '100%', padding: '10px 14px', border: '1px solid #E8E8E8', borderRadius: 10, fontSize: 13, marginTop: 6, fontFamily: "'Inter', system-ui", outline: 'none' },
    charCount: { position: 'absolute' as const, right: 0, top: 0, fontSize: 11, color: '#aaa' },
    serviceChip: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1px solid', borderRadius: 12, cursor: 'pointer', fontFamily: "'Inter', system-ui", transition: '0.15s', textAlign: 'left' as const },
    btnPrimary: { padding: '10px 24px', borderRadius: 10, border: 'none', background: '#DC4620', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', system-ui" },
    btnSecondary: { padding: '10px 24px', borderRadius: 10, border: '1px solid #E8E8E8', background: '#fff', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', system-ui" },
    templateCard: { border: '1px solid #E8E8E8', borderRadius: 10, overflow: 'hidden', transition: '0.2s', cursor: 'pointer' },
    btnEdit: { flex: 1, padding: '7px', borderRadius: 8, border: 'none', background: '#DC4620', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', system-ui" },
    btnView: { flex: 1, padding: '7px', borderRadius: 8, border: '1px solid #E8E8E8', background: '#fff', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', system-ui" },
    pageBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid #E8E8E8', background: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', system-ui" },
}
