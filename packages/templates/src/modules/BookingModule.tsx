/**
 * @kepenk/templates — Sync Module: Booking (Randevu)
 *
 * Sectors: berber, doktor, güzellik, fitness, dis, klinik
 * Live mode: Firestore realtime → randevu takvimi
 * Preview mode: Static demo data
 */

'use client'

import { useState } from 'react'

export interface BookingModuleProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  services?: { id: string; name: string; duration?: string; price?: string }[]
  businessName?: string
  phone?: string
}

const DEMO_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export function BookingModule({ esnafId, mode, plan, services = [], businessName, phone }: BookingModuleProps) {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isPreview = mode === 'preview'

  if (submitted) {
    return (
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Randevu Talebiniz Alındı!</h3>
        <p className="text-foreground-secondary text-sm">En kısa sürede onay bildirimi alacaksınız.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2 rounded-lg bg-accent text-on-accent text-sm font-semibold hover:bg-accent-hover transition-colors">Yeni Randevu</button>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-foreground mb-1">📅 Online Randevu</h3>
      <p className="text-sm text-foreground-secondary mb-6">{isPreview ? 'Demo randevu formu' : `${businessName || 'İşletme'} için randevu alın`}</p>

      <div className="space-y-4">
        {services.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Hizmet Seçin</label>
            <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-foreground text-sm focus:ring-2 focus:ring-accent/40 focus:border-accent transition">
              <option value="">Hizmet seçin...</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}{s.price ? ` — ${s.price}` : ''}{s.duration ? ` (${s.duration})` : ''}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tarih</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-foreground text-sm focus:ring-2 focus:ring-accent/40 transition" />
        </div>

        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Saat</label>
            <div className="grid grid-cols-4 gap-2">
              {DEMO_SLOTS.map(slot => (
                <button key={slot} onClick={() => setSelectedSlot(slot)} className={`py-2 rounded-lg text-sm font-medium transition-all ${selectedSlot === slot ? 'bg-accent text-on-accent' : 'bg-bg border border-border text-foreground hover:border-accent/30'}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => !isPreview && setSubmitted(true)}
          disabled={isPreview || !selectedSlot}
          className="w-full py-3 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPreview ? 'Demo — Randevu Al' : 'Randevu Al'}
        </button>
      </div>
    </div>
  )
}
