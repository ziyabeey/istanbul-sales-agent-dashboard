/**
 * Storefront E-Commerce Components
 * ──────────────────────────────────
 * Renderer components for published esnaf storefronts.
 * Used by @kepenk/renderer in the publish pipeline.
 */

'use client'

import React, { useState, useMemo } from 'react'

/* ═══════════════════════════════════════════════
   PRODUCT CARD — Grid/list display
   ═══════════════════════════════════════════════ */

interface ProductCardProps {
  product: {
    id: string
    name: string
    handle: string
    priceRange: { min: number; max: number }
    media: Array<{ url: string; alt: string }>
    ribbon?: string
    variants: Array<{ compareAtPrice?: number; price: number }>
  }
  onAddToCart?: (productId: string) => void
  onNavigate?: (handle: string) => void
  layout?: 'grid' | 'list'
}

export function ProductCard({ product, onAddToCart, onNavigate, layout = 'grid' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const mainImage = product.media?.[0]?.url
  const hoverImage = product.media?.[1]?.url
  const hasDiscount = product.variants?.some(v => v.compareAtPrice && v.compareAtPrice > v.price)
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceRange.min / (product.variants[0]?.compareAtPrice || product.priceRange.min)) * 100)
    : 0

  return (
    <>
      <style>{`
        .ke-pc { position: relative; cursor: pointer; border-radius: 12px; overflow: hidden; background: #fff; transition: box-shadow 0.2s, transform 0.2s; }
        .ke-pc:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .ke-pc-img { position: relative; aspect-ratio: 1; overflow: hidden; background: #f8f9fa; }
        .ke-pc-img img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s; }
        .ke-pc-ribbon { position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; color: #fff; z-index: 2; }
        .ke-pc-ribbon.sale { background: #ef4444; }
        .ke-pc-ribbon.new { background: #10b981; }
        .ke-pc-quick { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%) translateY(8px); opacity: 0; transition: 0.2s; padding: 8px 20px; border-radius: 8px; background: #0f172a; color: #fff; font-size: 12px; font-weight: 700; border: none; cursor: pointer; white-space: nowrap; }
        .ke-pc:hover .ke-pc-quick { opacity: 1; transform: translateX(-50%) translateY(0); }
        .ke-pc-info { padding: 12px; }
        .ke-pc-name { font-size: 14px; font-weight: 600; color: #1e293b; margin: 0 0 6px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .ke-pc-price { display: flex; align-items: center; gap: 6px; }
        .ke-pc-current { font-size: 16px; font-weight: 800; color: #0f172a; }
        .ke-pc-old { font-size: 13px; color: #94a3b8; text-decoration: line-through; }
        .ke-pc-discount { font-size: 11px; font-weight: 800; color: #ef4444; background: #fef2f2; padding: 2px 6px; border-radius: 4px; }
      `}</style>
      <div
        className="ke-pc"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate?.(product.handle)}
      >
        <div className="ke-pc-img">
          {mainImage && <img src={hovered && hoverImage ? hoverImage : mainImage} alt={product.media[0]?.alt || product.name} />}
          {product.ribbon && <span className={`ke-pc-ribbon ${product.ribbon === 'İndirimde' ? 'sale' : 'new'}`}>{product.ribbon}</span>}
          {!product.ribbon && discountPercent > 0 && <span className="ke-pc-ribbon sale">%{discountPercent}</span>}
          <button className="ke-pc-quick" onClick={(e) => { e.stopPropagation(); onAddToCart?.(product.id) }}>
            🛒 Sepete Ekle
          </button>
        </div>
        <div className="ke-pc-info">
          <h3 className="ke-pc-name">{product.name}</h3>
          <div className="ke-pc-price">
            <span className="ke-pc-current">₺{product.priceRange.min.toLocaleString('tr-TR')}</span>
            {hasDiscount && product.variants[0]?.compareAtPrice && (
              <span className="ke-pc-old">₺{product.variants[0].compareAtPrice.toLocaleString('tr-TR')}</span>
            )}
            {discountPercent > 0 && <span className="ke-pc-discount">%{discountPercent}</span>}
          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   PRODUCT GRID — Responsive product listing
   ═══════════════════════════════════════════════ */

interface ProductGridProps {
  products: ProductCardProps['product'][]
  columns?: 2 | 3 | 4
  onAddToCart?: (productId: string) => void
  onNavigate?: (handle: string) => void
}

export function ProductGrid({ products, columns = 3, onAddToCart, onNavigate }: ProductGridProps) {
  return (
    <>
      <style>{`
        .ke-pg { display: grid; gap: 20px; }
        .ke-pg.cols-2 { grid-template-columns: repeat(2, 1fr); }
        .ke-pg.cols-3 { grid-template-columns: repeat(3, 1fr); }
        .ke-pg.cols-4 { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 768px) { .ke-pg { grid-template-columns: repeat(2, 1fr) !important; gap: 12px; } }
        @media (max-width: 480px) { .ke-pg { grid-template-columns: 1fr !important; } }
        .ke-pg-empty { grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #94a3b8; font-size: 15px; }
      `}</style>
      <div className={`ke-pg cols-${columns}`}>
        {products.length === 0 ? (
          <div className="ke-pg-empty">Henüz ürün eklenmemiş</div>
        ) : (
          products.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onNavigate={onNavigate} />
          ))
        )}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   VARIANT SELECTOR — Color/Size/Custom options
   ═══════════════════════════════════════════════ */

interface VariantSelectorProps {
  options: Array<{
    name: string
    type: 'color' | 'size' | 'custom'
    choices: Array<{ value: string; colorHex?: string }>
  }>
  selected: Record<string, string>
  onSelect: (optionName: string, value: string) => void
  outOfStockCombinations?: string[]
}

export function VariantSelector({ options, selected, onSelect, outOfStockCombinations = [] }: VariantSelectorProps) {
  return (
    <>
      <style>{`
        .ke-vs { display: flex; flex-direction: column; gap: 16px; }
        .ke-vs-opt label { font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; display: block; }
        .ke-vs-choices { display: flex; flex-wrap: wrap; gap: 8px; }
        .ke-vs-chip { padding: 8px 16px; border: 2px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; transition: 0.15s; }
        .ke-vs-chip:hover { border-color: #94a3b8; }
        .ke-vs-chip.active { border-color: #0f172a; background: #0f172a; color: #fff; }
        .ke-vs-chip.oos { opacity: 0.4; text-decoration: line-through; cursor: not-allowed; }
        .ke-vs-color { width: 36px; height: 36px; border-radius: 50%; border: 3px solid #e2e8f0; cursor: pointer; transition: 0.15s; }
        .ke-vs-color.active { border-color: #0f172a; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0f172a; }
      `}</style>
      <div className="ke-vs">
        {options.map(opt => (
          <div key={opt.name} className="ke-vs-opt">
            <label>{opt.name}: <strong>{selected[opt.name] || '—'}</strong></label>
            <div className="ke-vs-choices">
              {opt.choices.map(choice => (
                opt.type === 'color' && choice.colorHex ? (
                  <div
                    key={choice.value}
                    className={`ke-vs-color ${selected[opt.name] === choice.value ? 'active' : ''}`}
                    style={{ backgroundColor: choice.colorHex }}
                    title={choice.value}
                    onClick={() => onSelect(opt.name, choice.value)}
                  />
                ) : (
                  <button
                    key={choice.value}
                    className={`ke-vs-chip ${selected[opt.name] === choice.value ? 'active' : ''}`}
                    onClick={() => onSelect(opt.name, choice.value)}
                  >
                    {choice.value}
                  </button>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   SIDE CART — Slide-in cart panel
   ═══════════════════════════════════════════════ */

interface SideCartProps {
  isOpen: boolean
  onClose: () => void
  items: Array<{
    id: string
    snapshot: { productName: string; price: number; imageUrl?: string; variantChoices: Record<string, string> }
    quantity: number
    lineTotal: number
  }>
  total: number
  onUpdateQuantity: (itemId: string, qty: number) => void
  onRemove: (itemId: string) => void
  onCheckout: () => void
}

export function SideCart({ isOpen, onClose, items, total, onUpdateQuantity, onRemove, onCheckout }: SideCartProps) {
  if (!isOpen) return null

  return (
    <>
      <style>{`
        .ke-sc-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100000; animation: keFadeIn 0.2s; }
        @keyframes keFadeIn { from { opacity: 0 } to { opacity: 1 } }
        .ke-sc { position: fixed; top: 0; right: 0; bottom: 0; width: 400px; max-width: 90vw; background: #fff; z-index: 100001; display: flex; flex-direction: column; animation: keSlideIn 0.3s ease-out; }
        @keyframes keSlideIn { from { transform: translateX(100%) } to { transform: none } }
        .ke-sc-head { padding: 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e8ecf1; }
        .ke-sc-title { font-size: 16px; font-weight: 900; color: #0f172a; }
        .ke-sc-close { width: 32px; height: 32px; border-radius: 8px; border: none; background: #f1f5f9; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .ke-sc-body { flex: 1; overflow-y: auto; padding: 16px; }
        .ke-sc-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .ke-sc-img { width: 64px; height: 64px; border-radius: 8px; background: #f8f9fa; overflow: hidden; flex-shrink: 0; }
        .ke-sc-img img { width: 100%; height: 100%; object-fit: cover; }
        .ke-sc-details { flex: 1; min-width: 0; }
        .ke-sc-iname { font-size: 13px; font-weight: 600; color: #1e293b; margin: 0 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ke-sc-ivars { font-size: 11px; color: #94a3b8; margin: 0 0 6px; }
        .ke-sc-qty { display: flex; align-items: center; gap: 8px; }
        .ke-sc-qty button { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .ke-sc-qty span { font-size: 13px; font-weight: 700; min-width: 20px; text-align: center; }
        .ke-sc-iprice { font-size: 14px; font-weight: 800; color: #0f172a; margin-left: auto; white-space: nowrap; }
        .ke-sc-rm { font-size: 11px; color: #ef4444; border: none; background: none; cursor: pointer; padding: 2px 0; }
        .ke-sc-empty { text-align: center; padding: 40px; color: #94a3b8; font-size: 14px; }
        .ke-sc-footer { padding: 16px 20px; border-top: 1px solid #e8ecf1; }
        .ke-sc-total { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 16px; font-weight: 800; color: #0f172a; }
        .ke-sc-btn { width: 100%; padding: 14px; border-radius: 10px; border: none; background: #0f172a; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; transition: background 0.15s; }
        .ke-sc-btn:hover { background: #1e293b; }
      `}</style>
      <div className="ke-sc-overlay" onClick={onClose} />
      <div className="ke-sc">
        <div className="ke-sc-head">
          <span className="ke-sc-title">🛒 Sepetim ({items.length})</span>
          <button className="ke-sc-close" onClick={onClose}>✕</button>
        </div>
        <div className="ke-sc-body">
          {items.length === 0 ? (
            <div className="ke-sc-empty">Sepetiniz boş</div>
          ) : items.map(item => (
            <div key={item.id} className="ke-sc-item">
              <div className="ke-sc-img">
                {item.snapshot.imageUrl && <img src={item.snapshot.imageUrl} alt={item.snapshot.productName} />}
              </div>
              <div className="ke-sc-details">
                <p className="ke-sc-iname">{item.snapshot.productName}</p>
                {Object.keys(item.snapshot.variantChoices || {}).length > 0 && (
                  <p className="ke-sc-ivars">{Object.values(item.snapshot.variantChoices).join(' / ')}</p>
                )}
                <div className="ke-sc-qty">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="ke-sc-rm" onClick={() => onRemove(item.id)}>Kaldır</button>
              </div>
              <span className="ke-sc-iprice">₺{item.lineTotal.toLocaleString('tr-TR')}</span>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="ke-sc-footer">
            <div className="ke-sc-total">
              <span>Toplam</span>
              <span>₺{total.toLocaleString('tr-TR')}</span>
            </div>
            <button className="ke-sc-btn" onClick={onCheckout}>Ödemeye Geç →</button>
          </div>
        )}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   INSTALLMENT TABLE — Native taksit UI
   ═══════════════════════════════════════════════ */

interface InstallmentTableProps {
  options: Array<{
    installmentCount: number
    installmentAmount: number
    totalAmount: number
    interestRate: number
    isInterestFree: boolean
  }>
  selected: number
  onSelect: (count: number) => void
}

export function InstallmentTable({ options, selected, onSelect }: InstallmentTableProps) {
  return (
    <>
      <style>{`
        .ke-it { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
        .ke-it th { padding: 10px 14px; font-size: 11px; font-weight: 800; color: #64748b; background: #f8fafc; text-align: left; text-transform: uppercase; letter-spacing: 0.5px; }
        .ke-it td { padding: 12px 14px; font-size: 13px; color: #334155; border-top: 1px solid #f1f5f9; }
        .ke-it tr { cursor: pointer; transition: background 0.1s; }
        .ke-it tr:hover td { background: #f8fafc; }
        .ke-it tr.active td { background: #eff6ff; }
        .ke-it-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #cbd5e1; display: inline-flex; align-items: center; justify-content: center; transition: 0.15s; }
        .ke-it tr.active .ke-it-radio { border-color: #2563eb; }
        .ke-it tr.active .ke-it-radio::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: #2563eb; }
        .ke-it-free { font-size: 10px; font-weight: 800; color: #10b981; background: #ecfdf5; padding: 2px 6px; border-radius: 4px; margin-left: 6px; }
        .ke-it-rate { font-size: 11px; color: #94a3b8; }
      `}</style>
      <table className="ke-it">
        <thead>
          <tr><th></th><th>Taksit</th><th>Aylık</th><th>Toplam</th><th></th></tr>
        </thead>
        <tbody>
          {options.map(opt => (
            <tr
              key={opt.installmentCount}
              className={selected === opt.installmentCount ? 'active' : ''}
              onClick={() => onSelect(opt.installmentCount)}
            >
              <td><div className="ke-it-radio" /></td>
              <td>{opt.installmentCount === 1 ? 'Tek çekim' : `${opt.installmentCount} Taksit`}</td>
              <td><strong>₺{opt.installmentAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></td>
              <td>₺{opt.totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td>
                {opt.isInterestFree && <span className="ke-it-free">Faizsiz ✨</span>}
                {!opt.isInterestFree && opt.interestRate > 0 && <span className="ke-it-rate">%{opt.interestRate}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
