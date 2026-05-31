/**
 * @kepenk/templates — Sync Module: Product Catalog (Ürün Kataloğu)
 *
 * Sectors: kuyumcu, eczane, organik, mobilya
 * Live mode: Firestore realtime → ürün listesi
 * Preview mode: Static demo products
 */

'use client'

import { useState } from 'react'

export interface ProductCatalogProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  products?: { id: string; name: string; price: string; image?: string; category?: string; inStock?: boolean; description?: string }[]
  categories?: string[]
  currency?: string
}

export function ProductCatalog({ esnafId, mode, plan, products = [], categories, currency = '₺' }: ProductCatalogProps) {
  const [filter, setFilter] = useState<string>('all')
  const cats = categories || [...new Set(products.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

  const cols = plan === 'free' ? 'grid-cols-2' : plan === 'starter' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <div className="space-y-6">
      {cats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-accent text-on-accent' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>Tümü</button>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c!)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-accent text-on-accent' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>{c}</button>
          ))}
        </div>
      )}

      <div className={`grid ${cols} gap-4`}>
        {filtered.map(p => (
          <div key={p.id} className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/20 transition-all">
            {p.image && (
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            )}
            <div className="p-4">
              <p className="font-semibold text-foreground text-sm line-clamp-2">{p.name}</p>
              {p.description && <p className="text-xs text-foreground-secondary mt-1 line-clamp-2">{p.description}</p>}
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-accent">{p.price}</span>
                {p.inStock === false && <span className="text-xs text-red-500 font-medium">Stokta Yok</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-foreground-secondary"><p>Bu kategoride ürün bulunamadı.</p></div>
      )}
    </div>
  )
}
