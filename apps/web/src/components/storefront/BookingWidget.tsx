'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Phone, ChevronRight, ChevronLeft, Check, X } from 'lucide-react'

interface BookingWidgetProps {
  /** Business name */
  businessName: string
  /** Available time slots per day */
  timeSlots?: string[]
  /** Available services */
  services?: { id: string; name: string; duration: string; price: string }[]
  /** Callback when booking is submitted */
  onSubmit?: (data: BookingData) => void
  /** Primary brand colour */
  accentColor?: string
}

interface BookingData {
  service: string
  date: string
  time: string
  name: string
  phone: string
}

const DEFAULT_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

export function BookingWidget({
  businessName,
  timeSlots = DEFAULT_SLOTS,
  services = [],
  onSubmit,
  accentColor = 'var(--site-primary)',
}: BookingWidgetProps) {
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState<BookingData>({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      label: d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' }),
      value: d.toISOString().split('T')[0],
      isToday: i === 0,
    }
  })

  const stepTitles = ['Hizmet Seçin', 'Tarih & Saat', 'Bilgileriniz']

  const canNext =
    step === 0 ? booking.service !== '' :
    step === 1 ? booking.date !== '' && booking.time !== '' :
    step === 2 ? booking.name.length >= 2 && booking.phone.length >= 10 :
    false

  const handleSubmit = () => {
    setSubmitted(true)
    onSubmit?.(booking)
  }

  if (submitted) {
    return (
      <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-8 text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-[var(--site-text)]">Randevunuz Alındı!</h3>
        <p className="text-sm text-[var(--site-text-secondary)]">
          {booking.date} tarihinde saat {booking.time} için randevunuz oluşturuldu.
          Size kısa süre içinde onay mesajı göndereceğiz.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setBooking({ service: '', date: '', time: '', name: '', phone: '' }) }}
          className="text-sm font-medium underline underline-offset-2"
          style={{ color: accentColor }}
        >
          Yeni Randevu Al
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--site-border)] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-[var(--site-text)]">Randevu Al</h3>
          <p className="text-xs text-[var(--site-text-secondary)]">{businessName}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {stepTitles.map((t, i) => (
            <div
              key={t}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i <= step ? '' : 'bg-gray-200'
              }`}
              style={i <= step ? { backgroundColor: accentColor } : undefined}
            />
          ))}
        </div>
      </div>

      {/* Step label */}
      <div className="px-6 pt-4 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--site-text-secondary)]">
          Adım {step + 1}/3 — {stepTitles[step]}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-4 min-h-[200px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              {services.length > 0 ? services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setBooking({ ...booking, service: s.id })}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    booking.service === s.id
                      ? 'border-current shadow-sm'
                      : 'border-[var(--site-border)] hover:border-gray-300'
                  }`}
                  style={booking.service === s.id ? { borderColor: accentColor, color: accentColor } : undefined}
                >
                  <div>
                    <p className="font-medium text-sm text-[var(--site-text)]">{s.name}</p>
                    <p className="text-xs text-[var(--site-text-secondary)]">{s.duration}</p>
                  </div>
                  <span className="text-sm font-bold">{s.price}</span>
                </button>
              )) : (
                <div className="py-6 text-center text-sm text-[var(--site-text-secondary)]">
                  Hizmet listesi henüz eklenmedi.
                  <button
                    onClick={() => { setBooking({ ...booking, service: 'genel' }); setStep(1) }}
                    className="block mx-auto mt-2 text-sm font-medium"
                    style={{ color: accentColor }}
                  >
                    Genel randevu al →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Date picker */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setBooking({ ...booking, date: d.value })}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      booking.date === d.value
                        ? 'text-white border-transparent shadow-sm'
                        : 'border-[var(--site-border)] text-[var(--site-text)] hover:border-gray-300'
                    }`}
                    style={booking.date === d.value ? { backgroundColor: accentColor } : undefined}
                  >
                    {d.isToday ? 'Bugün' : d.label}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBooking({ ...booking, time: t })}
                    className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                      booking.time === t
                        ? 'text-white border-transparent'
                        : 'border-[var(--site-border)] text-[var(--site-text)] hover:border-gray-300'
                    }`}
                    style={booking.time === t ? { backgroundColor: accentColor } : undefined}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--site-text-secondary)]" />
                <input
                  type="text"
                  value={booking.name}
                  onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                  placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--site-border)] text-sm text-[var(--site-text)] placeholder-[var(--site-text-secondary)] focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--site-bg)]"
                  style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--site-text-secondary)]" />
                <input
                  type="tel"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                  placeholder="05XX XXX XXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--site-border)] text-sm text-[var(--site-text)] placeholder-[var(--site-text-secondary)] focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--site-bg)]"
                  style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                />
              </div>
              <p className="text-[10px] text-[var(--site-text-secondary)] text-center">
                Randevu onayı WhatsApp ile gönderilecektir.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--site-border)] flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 text-sm font-medium text-[var(--site-text-secondary)] hover:text-[var(--site-text)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Geri
          </button>
        ) : <div />}

        {step < 2 ? (
          <button
            onClick={() => canNext && setStep(step + 1)}
            disabled={!canNext}
            className="flex items-center gap-1 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-40"
            style={{ backgroundColor: accentColor }}
          >
            Devam <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canNext}
            className="flex items-center gap-1 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-40"
            style={{ backgroundColor: accentColor }}
          >
            <Calendar className="w-4 h-4" /> Randevu Al
          </button>
        )}
      </div>
    </div>
  )
}
