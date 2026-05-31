/**
 * @kepenk/templates — Sync Module: Price List (Fiyat Listesi)
 *
 * All sectors. Dashboard'dan yönetilen fiyat listesi.
 * Preview mode: Static demo prices.
 */

'use client'

import { useState } from 'react'

export interface PriceListProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  categories?: { name: string; items: { name: string; price: string; description?: string; duration?: string; popular?: boolean }[] }[]
  currency?: string
}

export function PriceList({ esnafId, mode, plan, categories = [], currency = '₺' }: PriceListProps) {
  const [activeTab, setActiveTab] = useState(0)
  const showTabs = categories.length > 1 && (plan === 'growth' || plan === 'pro' || plan === 'enterprise')

  return (
    <div className="space-y-6">
      {showTabs && (
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button key={i} onClick={() => setActiveTab(i)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === activeTab ? 'bg-accent text-on-accent' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>{c.name}</button>
          ))}
        </div>
      )}

      {categories.length > 0 ? (
        <div className="space-y-6">
          {(showTabs ? [categories[activeTab]] : categories).map((cat, ci) => (
            <div key={ci}>
              {!showTabs && categories.length > 1 && <h4 className="font-bold text-foreground text-lg mb-3">{cat.name}</h4>}
              <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden">
                {cat.items.map((item, ii) => (
                  <div key={ii} className={`flex items-center justify-between px-5 py-4 ${ii !== cat.items.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-bg/50 transition-colors`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm">{item.name}</span>
                        {item.popular && <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase">Popüler</span>}
                      </div>
                      {item.description && <p className="text-xs text-foreground-secondary mt-0.5">{item.description}</p>}
                      {item.duration && <p className="text-xs text-foreground-secondary mt-0.5">⏱ {item.duration}</p>}
                    </div>
                    <span className="font-bold text-accent ml-4 flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground-secondary text-sm py-8">Fiyat listesi henüz eklenmedi.</p>
      )}
    </div>
  )
}
