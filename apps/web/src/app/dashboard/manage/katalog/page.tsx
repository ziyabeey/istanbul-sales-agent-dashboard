'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

interface Urun {
  id: string
  ad: string
  aciklama: string
  fiyat: number
  gorsel: string
  sku: string
  kategori: string
  tur: 'Fiziksel' | 'Dijital'
  stok?: number
  aktif: boolean
  sira: number
}

const BOST_URUN: Omit<Urun, 'id' | 'sira'> = {
  ad: '', aciklama: '', fiyat: 0, gorsel: '', sku: '', kategori: '', tur: 'Fiziksel', stok: undefined, aktif: true,
}

export default function UrunlerPage() {
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [selected, setSelected] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editUrun, setEditUrun] = useState<Partial<Urun> | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const fetchUrunler = useCallback(async () => {
    try {
      const res = await fetch('/api/urunler')
      const data = await res.json()
      if (data.ok) {
        setUrunler(data.urunler)
      }
    } catch {
      toast.error('Ürünler yüklenemedi')
    } finally {
      setYukleniyor(false)
    }
  }, [])

  useEffect(() => { fetchUrunler() }, [fetchUrunler])

  const toggleSelect = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(s => s.length === urunler.length ? [] : urunler.map(p => p.id))

  const openAdd = () => { setEditUrun({ ...BOST_URUN }); setModalOpen(true) }
  const openEdit = (u: Urun) => { setEditUrun({ ...u }); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditUrun(null) }

  const handleSave = async () => {
    if (!editUrun || !editUrun.ad || editUrun.fiyat === undefined) {
      toast.error('Ad ve fiyat zorunlu'); return
    }
    setSaving(true)
    try {
      const isEdit = !!editUrun.id
      const url = isEdit ? `/api/urunler/${editUrun.id}` : '/api/urunler'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUrun),
      })
      const data = await res.json()

      if (data.ok) {
        toast.success(isEdit ? 'Ürün güncellendi' : 'Ürün eklendi', {
          description: 'Değişiklikler site editörüne de yansıyacak.',
        })
        closeModal()
        fetchUrunler()
      } else {
        toast.error(data.error || 'Hata oluştu')
      }
    } catch {
      toast.error('Sunucu hatası')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
    try {
      const res = await fetch(`/api/urunler/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.ok) {
        toast.success('Ürün silindi')
        fetchUrunler()
        setSelected(s => s.filter(x => x !== id))
      } else {
        toast.error(data.error || 'Silinemedi')
      }
    } catch {
      toast.error('Sunucu hatası')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selected.length} ürünü silmek istediğinize emin misiniz?`)) return
    for (const id of selected) {
      await fetch(`/api/urunler/${id}`, { method: 'DELETE' })
    }
    toast.success(`${selected.length} ürün silindi`)
    setSelected([])
    fetchUrunler()
  }

  const filtered = urunler.filter(u =>
    !search || u.ad.toLowerCase().includes(search.toLowerCase()) || (u.sku || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="kpnk-main">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mağaza Ürünleri</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={openAdd}
            style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}
          >
            + Yeni Ürün
          </button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 16 }}>
        Buraya eklediğiniz ürünler, site editöründeki <strong>Ürün Listesi</strong> ve <strong>Katalog</strong> modüllerinde otomatik olarak gösterilir.
      </p>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0 12px' }}>
        <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', fontWeight: 600 }}>
          {urunler.length} ürün
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <input
            placeholder="Ürün ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--kpnk-font)', width: 180, outline: 'none' }}
          />
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div style={{ background: 'var(--kpnk-primary)', color: '#fff', padding: '8px 16px', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
          <span>{selected.length} ürün seçildi</span>
          <button onClick={handleBulkDelete} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Sil</button>
        </div>
      )}

      {/* Product Table */}
      {yukleniyor ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--kpnk-text-secondary)' }}>Yükleniyor...</div>
      ) : urunler.length === 0 ? (
        <div className="kpnk-card" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Henüz ürün eklenmemiş</h3>
          <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 16 }}>
            İlk ürününüzü ekleyin, sitenizde otomatik olarak görünsün.
          </p>
          <button
            onClick={openAdd}
            style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}
          >
            + İlk Ürünü Ekle
          </button>
        </div>
      ) : (
        <div className="kpnk-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', width: 30 }}><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ürün</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tür</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Stok Kodu</th>
              <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Fiyat</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600, width: 80 }}>İşlem</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--kpnk-border-light)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--kpnk-bg-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}>
                  <td style={{ padding: '12px 14px' }}><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                  <td style={{ padding: '12px 14px' }} onClick={() => openEdit(p)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--kpnk-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, overflow: 'hidden' }}>
                        {p.gorsel ? <img src={p.gorsel} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>{p.ad}</span>
                        {p.kategori && <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', marginLeft: 6 }}>{p.kategori}</span>}
                        {!p.aktif && <span style={{ fontSize: 10, color: '#ef4444', marginLeft: 6, fontWeight: 700 }}>Pasif</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{p.tur}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{p.sku || '—'}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600 }}>₺{p.fiyat.toLocaleString('tr-TR')}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <button onClick={() => openEdit(p)} title="Düzenle" style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, padding: 2 }}>✏️</button>
                    <button onClick={() => handleDelete(p.id)} title="Sil" style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, padding: 2, marginLeft: 4 }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && editUrun && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeModal}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{editUrun.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>

            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Ürün Adı *</label>
                <input value={editUrun.ad || ''} onChange={e => setEditUrun({ ...editUrun, ad: e.target.value })} placeholder="Ürün adı" style={inputStyle} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Açıklama</label>
                <textarea value={editUrun.aciklama || ''} onChange={e => setEditUrun({ ...editUrun, aciklama: e.target.value })} placeholder="Kısa açıklama" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Fiyat (₺) *</label>
                  <input type="number" value={editUrun.fiyat || ''} onChange={e => setEditUrun({ ...editUrun, fiyat: Number(e.target.value) })} placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Stok Kodu</label>
                  <input value={editUrun.sku || ''} onChange={e => setEditUrun({ ...editUrun, sku: e.target.value })} placeholder="SKU-001" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Kategori</label>
                  <input value={editUrun.kategori || ''} onChange={e => setEditUrun({ ...editUrun, kategori: e.target.value })} placeholder="Genel" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Tür</label>
                  <select value={editUrun.tur || 'Fiziksel'} onChange={e => setEditUrun({ ...editUrun, tur: e.target.value as 'Fiziksel' | 'Dijital' })} style={inputStyle}>
                    <option value="Fiziksel">Fiziksel</option>
                    <option value="Dijital">Dijital</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Görsel URL</label>
                <input value={editUrun.gorsel || ''} onChange={e => setEditUrun({ ...editUrun, gorsel: e.target.value })} placeholder="https://..." style={inputStyle} />
                {editUrun.gorsel && (
                  <div style={{ marginTop: 8, width: 60, height: 60, borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={editUrun.gorsel} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              {editUrun.id && (
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={editUrun.aktif !== false} onChange={e => setEditUrun({ ...editUrun, aktif: e.target.checked })} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Aktif (sitede göster)</span>
                  </label>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', fontFamily: 'var(--kpnk-font)' }}>İptal</button>
              <button onClick={handleSave} disabled={saving} style={{ padding: '10px 24px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: 'var(--kpnk-primary)', color: '#fff', fontFamily: 'var(--kpnk-font)', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Kaydediliyor...' : editUrun.id ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13,
  fontFamily: 'var(--kpnk-font)', outline: 'none', boxSizing: 'border-box',
}
