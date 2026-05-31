/**
 * @kepenk/templates — Sync Module: Order (Sipariş)
 *
 * Sectors: restoran, pastane, çiçekçi, kasap
 * Live mode: Firestore → sipariş yönetimi
 * Preview mode: Static demo data
 */

'use client'

import { useState } from 'react'

export interface OrderModuleProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  items?: { id: string; name: string; price: string; image?: string; category?: string }[]
  businessName?: string
  currency?: string
}

export function OrderModule({ esnafId, mode, plan, items = [], businessName, currency = '₺' }: OrderModuleProps) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const isPreview = mode === 'preview'

  const addToCart = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const removeFromCart = (id: string) => setCart(c => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n })
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  if (submitted) {
    return (
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 text-center">
        <span className="text-5xl block mb-4">🎉</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Siparişiniz Alındı!</h3>
        <p className="text-foreground-secondary text-sm">Siparişiniz hazırlanıyor. WhatsApp üzerinden bilgilendirileceksiniz.</p>
        <button onClick={() => { setSubmitted(false); setCart({}) }} className="mt-6 px-6 py-2 rounded-lg bg-accent text-on-accent text-sm font-semibold hover:bg-accent-hover transition-colors">Yeni Sipariş</button>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-foreground mb-1">🛒 Sipariş Ver</h3>
      <p className="text-sm text-foreground-secondary mb-6">{isPreview ? 'Demo sipariş modülü' : `${businessName || 'İşletme'} menüsünden sipariş verin`}</p>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 bg-bg rounded-xl p-3 border border-border-subtle">
            {item.image && <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
              <p className="text-accent font-bold text-sm">{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              {cart[item.id] ? (
                <>
                  <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm hover:bg-accent/20 transition-colors">−</button>
                  <span className="text-sm font-bold text-foreground w-5 text-center">{cart[item.id]}</span>
                  <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-full bg-accent text-on-accent flex items-center justify-center text-sm hover:bg-accent-hover transition-colors">+</button>
                </>
              ) : (
                <button onClick={() => addToCart(item.id)} className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors">Ekle</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-foreground-secondary">{totalItems} ürün</span>
          </div>
          <button
            onClick={() => !isPreview && setSubmitted(true)}
            disabled={isPreview}
            className="w-full py-3 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all disabled:opacity-50"
          >
            {isPreview ? 'Demo — Sipariş Ver' : 'Sipariş Ver'}
          </button>
        </div>
      )}
    </div>
  )
}
