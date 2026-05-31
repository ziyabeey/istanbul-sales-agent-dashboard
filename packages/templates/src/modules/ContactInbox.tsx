/**
 * @kepenk/templates — Sync Module: Contact Inbox (İletişim Mesajları)
 *
 * All sectors. Site form submissions → dashboard inbox.
 * Preview mode: Shows form with demo data.
 */

'use client'

import { useState } from 'react'

export interface ContactInboxProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  businessName?: string
  phone?: string
  email?: string
}

export function ContactInbox({ esnafId, mode, plan, businessName, phone, email }: ContactInboxProps) {
  const [sent, setSent] = useState(false)
  const isPreview = mode === 'preview'

  if (sent) {
    return (
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 text-center">
        <span className="text-5xl block mb-4">📩</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Mesajınız İletildi!</h3>
        <p className="text-foreground-secondary text-sm">En kısa sürede size dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-foreground mb-1">💬 Mesaj Gönderin</h3>
      <p className="text-sm text-foreground-secondary mb-6">{businessName || 'İşletme'} ile iletişime geçin</p>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); if (!isPreview) setSent(true) }}>
        <input type="text" placeholder="Ad Soyad" required className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-foreground text-sm focus:ring-2 focus:ring-accent/40 transition" />
        <input type="tel" placeholder="Telefon" required className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-foreground text-sm focus:ring-2 focus:ring-accent/40 transition" />
        <textarea placeholder="Mesajınız..." rows={3} required className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-foreground text-sm focus:ring-2 focus:ring-accent/40 transition" />
        <button type="submit" disabled={isPreview} className="w-full py-3 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all disabled:opacity-50">
          {isPreview ? 'Demo — Gönder' : 'Gönder'}
        </button>
      </form>
    </div>
  )
}
