'use client'

import { useState } from 'react'

/* ═══════ Module Content Editor ═══════
 * Inline content editing for modules that have list-based data
 * ═══════════════════════════════════════ */

interface ContentItem { id: string; [key: string]: any }
function genId() { return Math.random().toString(36).slice(2, 9) }

const S: Record<string, React.CSSProperties> = {
    input: { width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 12, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
    label: { fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 4, display: 'block' },
    card: { background: '#f8fafc', borderRadius: 10, padding: 14, marginBottom: 8, border: '1px solid #e2e8f0' },
    addBtn: { width: '100%', padding: '10px', background: '#eff6ff', border: '1px dashed #93c5fd', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#2563eb', fontFamily: 'inherit' },
    moveBtn: { border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, padding: 2 },
    delBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 12, padding: 2 },
}

const CONTENT_MODULES = ['sss-genis', 'ekip-uyeleri', 'musteri-referanslari', 'menu', 'hakkimizda-hikaye', 'rakamlarla-biz', 'hizmet-fiyat-listesi', 'kampanya-afisi', 'google-yorumlar']

export default function ModuleContentEditor({ modulId, siteData, updateSiteData, onClose }: {
    modulId: string; siteData: any; updateSiteData: (data: any) => void; onClose: () => void
}) {
    const icerik = siteData?.modulIcerik?.[modulId] || { items: [], text: '' }
    const items: ContentItem[] = icerik.items || []

    const save = (updates: Record<string, any>) => {
        const current = siteData?.modulIcerik || {}
        updateSiteData({ modulIcerik: { ...current, [modulId]: { ...icerik, ...updates } } })
    }
    const updateItems = (newItems: ContentItem[]) => save({ items: newItems })
    const addItem = (tpl: Record<string, any>) => updateItems([...items, { id: genId(), ...tpl }])
    const removeItem = (id: string) => updateItems(items.filter(i => i.id !== id))
    const updateItem = (id: string, u: Record<string, any>) => updateItems(items.map(i => i.id === id ? { ...i, ...u } : i))
    const moveItem = (id: string, dir: -1 | 1) => {
        const idx = items.findIndex(i => i.id === id)
        if ((dir === -1 && idx === 0) || (dir === 1 && idx === items.length - 1)) return
        const arr = [...items]; [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
        updateItems(arr)
    }

    const ItemToolbar = ({ id }: { id: string }) => (
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            <button onClick={() => moveItem(id, -1)} style={S.moveBtn}>⬆</button>
            <button onClick={() => moveItem(id, 1)} style={S.moveBtn}>⬇</button>
            <div style={{ flex: 1 }} />
            <button onClick={() => removeItem(id)} style={S.delBtn}>🗑️</button>
        </div>
    )

    const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div style={{ marginBottom: 6 }}><span style={S.label}>{label}</span>{children}</div>
    )

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 560, maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>✏️ İçerik Düzenle</h3>
                    <button onClick={onClose} style={{ border: 'none', background: '#f1f5f9', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✕</button>
                </div>

                {/* ─── SSS ─── */}
                {modulId === 'sss-genis' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Sık sorulan soruları ekleyin ve düzenleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <Field label="Soru"><input style={S.input} value={item.soru || ''} onChange={e => updateItem(item.id, { soru: e.target.value })} placeholder="Soru..." /></Field>
                            <Field label="Cevap"><textarea style={{ ...S.input, resize: 'vertical' }} rows={3} value={item.cevap || ''} onChange={e => updateItem(item.id, { cevap: e.target.value })} placeholder="Cevap..." /></Field>
                            <Field label="İkon">
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['chevron', 'plus', 'arrow'].map(ic => (
                                        <button key={ic} onClick={() => updateItem(item.id, { ikon: ic })} style={{ padding: '4px 10px', borderRadius: 6, border: item.ikon === ic ? '2px solid #2563eb' : '1px solid #e2e8f0', background: item.ikon === ic ? '#eff6ff' : '#fff', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>
                                            {ic === 'chevron' ? '▼' : ic === 'plus' ? '+' : '→'}
                                        </button>
                                    ))}
                                </div>
                            </Field>
                        </div>
                    ))}
                    <button onClick={() => addItem({ soru: '', cevap: '', ikon: 'chevron' })} style={S.addBtn}>+ Yeni Soru Ekle</button>
                </div>)}

                {/* ─── EKİP ─── */}
                {modulId === 'ekip-uyeleri' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Ekip üyelerinizi ekleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="İsim"><input style={S.input} value={item.isim || ''} onChange={e => updateItem(item.id, { isim: e.target.value })} /></Field>
                                <Field label="Pozisyon"><input style={S.input} value={item.pozisyon || ''} onChange={e => updateItem(item.id, { pozisyon: e.target.value })} /></Field>
                            </div>
                            <Field label="Görsel URL"><input style={S.input} value={item.gorsel || ''} onChange={e => updateItem(item.id, { gorsel: e.target.value })} placeholder="https://..." /></Field>
                            <Field label="Biyografi (kısa)"><textarea style={{ ...S.input, resize: 'vertical' }} rows={2} value={item.bio || ''} onChange={e => updateItem(item.id, { bio: e.target.value })} placeholder="Bu kişi hakkında kısa bilgi..." /></Field>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="E-posta"><input style={S.input} value={item.email || ''} onChange={e => updateItem(item.id, { email: e.target.value })} placeholder="ad@firma.com" /></Field>
                                <Field label="Telefon"><input style={S.input} value={item.telefon || ''} onChange={e => updateItem(item.id, { telefon: e.target.value })} placeholder="05XX" /></Field>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="Instagram"><input style={S.input} value={item.instagram || ''} onChange={e => updateItem(item.id, { instagram: e.target.value })} placeholder="@kullanici" /></Field>
                                <Field label="LinkedIn"><input style={S.input} value={item.linkedin || ''} onChange={e => updateItem(item.id, { linkedin: e.target.value })} placeholder="linkedin.com/in/..." /></Field>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem({ isim: '', pozisyon: '', gorsel: '', bio: '', email: '', telefon: '', instagram: '', linkedin: '' })} style={S.addBtn}>+ Yeni Üye Ekle</button>
                </div>)}

                {/* ─── REFERANSLAR ─── */}
                {modulId === 'musteri-referanslari' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Referanslarınızı ekleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="İsim / Firma"><input style={S.input} value={item.isim || ''} onChange={e => updateItem(item.id, { isim: e.target.value })} /></Field>
                                <Field label="Web Sitesi"><input style={S.input} value={item.link || ''} onChange={e => updateItem(item.id, { link: e.target.value })} placeholder="https://..." /></Field>
                            </div>
                            <Field label="Logo URL"><input style={S.input} value={item.logo || ''} onChange={e => updateItem(item.id, { logo: e.target.value })} placeholder="https://..." /></Field>
                            <Field label="Yorum / Değerlendirme"><textarea style={{ ...S.input, resize: 'vertical' }} rows={2} value={item.yorum || ''} onChange={e => updateItem(item.id, { yorum: e.target.value })} placeholder="Müşteri yorumu..." /></Field>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="Puan (1-5)">
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {[1,2,3,4,5].map(n => (
                                            <button key={n} onClick={() => updateItem(item.id, { puan: n })} style={{ width: 28, height: 28, borderRadius: 6, border: (item.puan || 5) >= n ? '2px solid #f59e0b' : '1px solid #e2e8f0', background: (item.puan || 5) >= n ? '#fef3c7' : '#fff', cursor: 'pointer', fontSize: 12 }}>⭐</button>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="Tarih"><input style={S.input} type="date" value={item.tarih || ''} onChange={e => updateItem(item.id, { tarih: e.target.value })} /></Field>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem({ isim: '', link: '', logo: '', yorum: '', puan: 5, tarih: '' })} style={S.addBtn}>+ Yeni Referans Ekle</button>
                </div>)}

                {/* ─── MENÜ ─── */}
                {modulId === 'menu' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Menü kalemlerinizi düzenleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 6 }}>
                                <Field label="Ürün Adı"><input style={S.input} value={item.ad || ''} onChange={e => updateItem(item.id, { ad: e.target.value })} /></Field>
                                <Field label="Fiyat (₺)"><input style={S.input} type="number" value={item.fiyat || ''} onChange={e => updateItem(item.id, { fiyat: e.target.value })} /></Field>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="Kategori"><input style={S.input} value={item.kategori || ''} onChange={e => updateItem(item.id, { kategori: e.target.value })} /></Field>
                                <Field label="Badge">
                                    <select style={S.input} value={item.badge || ''} onChange={e => updateItem(item.id, { badge: e.target.value })}>
                                        <option value="">Yok</option><option value="yeni">🆕 Yeni</option><option value="populer">🔥 Popüler</option><option value="vegan">🌱 Vegan</option><option value="sef">👨‍🍳 Şef Önerisi</option>
                                    </select>
                                </Field>
                            </div>
                            <Field label="Açıklama"><input style={S.input} value={item.aciklama || ''} onChange={e => updateItem(item.id, { aciklama: e.target.value })} placeholder="Malzeme veya kısa açıklama" /></Field>
                            <Field label="Görsel URL"><input style={S.input} value={item.gorsel || ''} onChange={e => updateItem(item.id, { gorsel: e.target.value })} placeholder="https://..." /></Field>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                <Field label="Allerjen">
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                        {['Gluten','Süt','Fındık','Yumurta','Soya'].map(a => (
                                            <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, cursor: 'pointer' }}>
                                                <input type="checkbox" checked={(item.allerjen || []).includes(a)} onChange={e => {
                                                    const curr = item.allerjen || []
                                                    updateItem(item.id, { allerjen: e.target.checked ? [...curr, a] : curr.filter((x: string) => x !== a) })
                                                }} />{a}
                                            </label>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="Kalori (kcal)"><input style={S.input} type="number" value={item.kalori || ''} onChange={e => updateItem(item.id, { kalori: e.target.value })} /></Field>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addItem({ ad: '', fiyat: '', kategori: '', badge: '', aciklama: '', gorsel: '', allerjen: [], kalori: '' })} style={S.addBtn}>+ Yeni Menü Kalemi</button>
                </div>)}

                {/* ─── HAKKIMIZDA ─── */}
                {modulId === 'hakkimizda-hikaye' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>İşletme hikayenizi yazın.</p>
                    <Field label="Başlık"><input style={S.input} value={icerik.baslik || 'Hakkımızda'} onChange={e => save({ baslik: e.target.value })} /></Field>
                    <Field label="Alt Başlık"><input style={S.input} value={icerik.altBaslik || ''} onChange={e => save({ altBaslik: e.target.value })} placeholder="Kalite ve deneyimle..." /></Field>
                    <Field label="Metin"><textarea style={{ ...S.input, resize: 'vertical' }} rows={5} value={icerik.metin || ''} onChange={e => save({ metin: e.target.value })} placeholder="İşletmenizin hikayesini anlatın..." /></Field>
                    <Field label="Görsel URL"><input style={S.input} value={icerik.gorsel || ''} onChange={e => save({ gorsel: e.target.value })} placeholder="https://..." /></Field>
                    <Field label="Kuruluş Yılı"><input style={S.input} value={icerik.yil || ''} onChange={e => save({ yil: e.target.value })} placeholder="1995" /></Field>
                </div>)}

                {/* ─── İSTATİSTİKLER ─── */}
                {modulId === 'rakamlarla-biz' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Rakamsal verilerinizi ekleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 6 }}>
                                <Field label="Sayı"><input style={{ ...S.input, fontSize: 16, fontWeight: 700, textAlign: 'center' } as React.CSSProperties} value={item.sayi || ''} onChange={e => updateItem(item.id, { sayi: e.target.value })} placeholder="1500+" /></Field>
                                <Field label="Etiket"><input style={S.input} value={item.etiket || ''} onChange={e => updateItem(item.id, { etiket: e.target.value })} placeholder="Mutlu müşteri" /></Field>
                            </div>
                            <Field label="İkon (emoji)"><input style={S.input} value={item.ikon || ''} onChange={e => updateItem(item.id, { ikon: e.target.value })} placeholder="🏆" /></Field>
                        </div>
                    ))}
                    <button onClick={() => addItem({ sayi: '', etiket: '', ikon: '' })} style={S.addBtn}>+ Yeni İstatistik</button>
                </div>)}

                {/* ─── HİZMET FİYAT LİSTESİ ─── */}
                {modulId === 'hizmet-fiyat-listesi' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Hizmetlerinizi ve fiyatlarınızı ekleyin.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 6 }}>
                                <Field label="Hizmet Adı"><input style={S.input} value={item.ad || ''} onChange={e => updateItem(item.id, { ad: e.target.value })} /></Field>
                                <Field label="Fiyat"><input style={S.input} value={item.fiyat || ''} onChange={e => updateItem(item.id, { fiyat: e.target.value })} placeholder="₺250" /></Field>
                            </div>
                            <Field label="Açıklama"><input style={S.input} value={item.aciklama || ''} onChange={e => updateItem(item.id, { aciklama: e.target.value })} placeholder="Hizmet detayı..." /></Field>
                            <Field label="Süre"><input style={S.input} value={item.sure || ''} onChange={e => updateItem(item.id, { sure: e.target.value })} placeholder="45 dk" /></Field>
                        </div>
                    ))}
                    <button onClick={() => addItem({ ad: '', fiyat: '', aciklama: '', sure: '' })} style={S.addBtn}>+ Yeni Hizmet</button>
                </div>)}

                {/* ─── KAMPANYA ─── */}
                {modulId === 'kampanya-afisi' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Kampanya banner içeriğinizi düzenleyin.</p>
                    <Field label="Başlık"><input style={S.input} value={icerik.baslik || ''} onChange={e => save({ baslik: e.target.value })} placeholder="Yaz İndirimi!" /></Field>
                    <Field label="Alt Metin"><textarea style={{ ...S.input, resize: 'vertical' }} rows={2} value={icerik.altMetin || ''} onChange={e => save({ altMetin: e.target.value })} placeholder="Tüm ürünlerde %30 indirim..." /></Field>
                    <Field label="CTA Buton Metni"><input style={S.input} value={icerik.ctaMetin || 'Fırsatı Yakala'} onChange={e => save({ ctaMetin: e.target.value })} /></Field>
                    <Field label="CTA Link"><input style={S.input} value={icerik.ctaLink || ''} onChange={e => save({ ctaLink: e.target.value })} placeholder="https://..." /></Field>
                    <Field label="Arka Plan Görseli"><input style={S.input} value={icerik.bgGorsel || ''} onChange={e => save({ bgGorsel: e.target.value })} placeholder="https://..." /></Field>
                </div>)}

                {/* ─── GOOGLE YORUMLAR ─── */}
                {modulId === 'google-yorumlar' && (<div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Müşteri yorumlarınızı ekleyin. Google yorumlarınızdan kopyalayabilirsiniz.</p>
                    {items.map(item => (
                        <div key={item.id} style={S.card}>
                            <ItemToolbar id={item.id} />
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 6 }}>
                                <Field label="Müşteri Adı"><input style={S.input} value={item.ad || ''} onChange={e => updateItem(item.id, { ad: e.target.value })} placeholder="Ahmet K." /></Field>
                                <Field label="Yıldız">
                                    <div style={{ display: 'flex', gap: 2 }}>
                                        {[1,2,3,4,5].map(n => (
                                            <button key={n} onClick={() => updateItem(item.id, { yildiz: n })} style={{ width: 26, height: 26, borderRadius: 5, border: (item.yildiz || 5) >= n ? '2px solid #f59e0b' : '1px solid #e2e8f0', background: (item.yildiz || 5) >= n ? '#fef3c7' : '#fff', cursor: 'pointer', fontSize: 11, padding: 0 }}>⭐</button>
                                        ))}
                                    </div>
                                </Field>
                            </div>
                            <Field label="Yorum"><textarea style={{ ...S.input, resize: 'vertical' }} rows={2} value={item.yorum || ''} onChange={e => updateItem(item.id, { yorum: e.target.value })} placeholder="Harika hizmet, çok memnun kaldık..." /></Field>
                            <Field label="Zaman"><input style={S.input} value={item.sure || ''} onChange={e => updateItem(item.id, { sure: e.target.value })} placeholder="2 hafta önce" /></Field>
                        </div>
                    ))}
                    <button onClick={() => addItem({ ad: '', yildiz: 5, yorum: '', sure: '' })} style={S.addBtn}>+ Yeni Yorum Ekle</button>
                    <div style={{ marginTop: 8, padding: '10px 12px', background: '#fef3c7', borderRadius: 8, fontSize: 11, color: '#92400e', lineHeight: 1.5 }}>
                        💡 Google Business'tan gelen yorumlarınızı buraya kopyalayarak web sitenizde gösterebilirsiniz.
                    </div>
                </div>)}

                {/* ─── FALLBACK ─── */}
                {!CONTENT_MODULES.includes(modulId) && (
                    <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
                        <p style={{ fontSize: 40, marginBottom: 8 }}>🔧</p>
                        <p style={{ fontSize: 13 }}>Bu modülün içerik düzenleme paneli henüz hazır değil.</p>
                        <p style={{ fontSize: 11, color: '#94a3b8' }}>Modül ayarları için ⚙️ ikonunu kullanabilirsiniz.</p>
                    </div>
                )}

                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ padding: '8px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Tamam</button>
                </div>
            </div>
        </div>
    )
}
