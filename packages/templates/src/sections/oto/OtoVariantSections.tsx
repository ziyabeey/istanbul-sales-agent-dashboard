'use client'
import React from 'react'

type SectionProps = { state?: any; children?: React.ReactNode }

// ── Oto Dinamik ──
export function OtoDinamikHero({ state }: SectionProps) {
 const h = state?.hero
 return (
 <section className="relative py-24 px-6 text-center">
 <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{h?.title ?? 'Dinamik Oto'}</h1>
 <p className="mt-4 text-lg opacity-70 max-w-xl mx-auto">{h?.subtitle}</p>
 {h?.buttonText && <a href={h.buttonLink ?? '#'} className="mt-8 inline-block px-8 py-3 bg-orange-600 text-white font-bold rounded">{h.buttonText}</a>}
 </section>
 )
}
export function OtoDinamikServices({ state }: SectionProps) {
 const items = state?.services?.items ?? []
 return (
 <section className="py-16 px-6 max-w-5xl mx-auto">
 <div className="grid gap-6 md:grid-cols-3">
 {items.map((s: any, i: number) => (
 <div key={i} className="border border-white/10 rounded-lg p-6">
 <div className="text-2xl mb-2">{s.icon}</div>
 <h3 className="text-xl font-bold">{s.title}</h3>
 <p className="mt-2 opacity-60 text-sm">{s.description}</p>
 </div>
 ))}
 </div>
 </section>
 )
}
export function OtoDinamikContact({ state }: SectionProps) {
 const c = state?.contact
 return (
 <section className="py-16 px-6 text-center">
 <h2 className="text-3xl font-bold">{c?.title ?? 'İletişim'}</h2>
 <p className="mt-2 opacity-60">{c?.subtitle}</p>
 {c?.phone && <p className="mt-4 font-mono">{c.phone}</p>}
 </section>
 )
}

// ── Oto Güven ──
export function OtoGuvenLayout({ children }: SectionProps) {
 return <div className="min-h-screen">{children}</div>
}
export function OtoGuvenHero({ state }: SectionProps) {
 const h = state?.hero
 return (
 <section className="py-24 px-6 text-center bg-gradient-to-b from-slate-100 to-white">
 <h1 className="text-5xl font-bold text-slate-900">{h?.title ?? 'Güven Oto'}</h1>
 <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">{h?.subtitle}</p>
 </section>
 )
}
export function OtoGuvenServices({ state }: SectionProps) {
 const items = state?.services?.items ?? []
 return (
 <section className="py-16 px-6 max-w-5xl mx-auto">
 <div className="grid gap-6 md:grid-cols-3">
 {items.map((s: any, i: number) => (
 <div key={i} className="bg-white shadow rounded-xl p-6">
 <div className="text-2xl mb-2">{s.icon}</div>
 <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
 <p className="mt-2 text-slate-500 text-sm">{s.description}</p>
 </div>
 ))}
 </div>
 </section>
 )
}
export function OtoGuvenContact({ state }: SectionProps) {
 const c = state?.contact
 return (
 <section className="py-16 px-6 text-center">
 <h2 className="text-3xl font-bold text-slate-900">{c?.title ?? 'İletişim'}</h2>
 <p className="mt-2 text-slate-500">{c?.subtitle}</p>
 </section>
 )
}

// ── Oto Hızlı ──
export function OtoHizliHero({ state }: SectionProps) {
 const h = state?.hero
 return (
 <section className="py-24 px-6 text-center">
 <h1 className="text-5xl md:text-7xl font-black">{h?.title ?? 'Hızlı Oto'}</h1>
 <p className="mt-4 text-lg opacity-70 max-w-xl mx-auto">{h?.subtitle}</p>
 </section>
 )
}
export function OtoHizliServices({ state }: SectionProps) {
 const items = state?.services?.items ?? []
 return (
 <section className="py-16 px-6 max-w-5xl mx-auto">
 <div className="grid gap-6 md:grid-cols-2">
 {items.map((s: any, i: number) => (
 <div key={i} className="border border-white/10 rounded p-6">
 <h3 className="text-xl font-bold">{s.title}</h3>
 <p className="mt-2 opacity-60 text-sm">{s.description}</p>
 </div>
 ))}
 </div>
 </section>
 )
}
export function OtoHizliContact({ state }: SectionProps) {
 const c = state?.contact
 return (
 <section className="py-16 px-6 text-center">
 <h2 className="text-3xl font-bold">{c?.title ?? 'İletişim'}</h2>
 <p className="mt-2 opacity-60">{c?.subtitle}</p>
 </section>
 )
}

// ── Oto Prestij ──
export function OtoPrestijHero({ state }: SectionProps) {
 const h = state?.hero
 return (
 <section className="h-screen snap-start flex flex-col items-center justify-center px-6">
 <h1 className="text-6xl font-black tracking-tight">{h?.title ?? 'Prestij Oto'}</h1>
 <p className="mt-4 text-lg opacity-60 max-w-lg text-center">{h?.subtitle}</p>
 </section>
 )
}
export function OtoPrestijServices({ state }: SectionProps) {
 const items = state?.services?.items ?? []
 return (
 <section className="h-screen snap-start flex flex-col items-center justify-center px-6">
 <div className="space-y-8 max-w-2xl w-full">
 {items.map((s: any, i: number) => (
 <div key={i} className="border-b border-white/10 pb-6">
 <h3 className="text-2xl font-bold">{s.title}</h3>
 <p className="mt-2 opacity-50">{s.description}</p>
 </div>
 ))}
 </div>
 </section>
 )
}
export function OtoPrestijContact({ state }: SectionProps) {
 const c = state?.contact
 return (
 <section className="h-screen snap-start flex flex-col items-center justify-center px-6">
 <h2 className="text-4xl font-bold">{c?.title ?? 'İletişim'}</h2>
 <p className="mt-2 opacity-50">{c?.subtitle}</p>
 </section>
 )
}

// ── Oto VIP ──
export function OtoVipHero({ state }: SectionProps) {
 const h = state?.hero
 return (
 <section className="py-32 px-6 text-center">
 <h1 className="text-6xl md:text-8xl font-black tracking-tighter">{h?.title ?? 'VIP Oto'}</h1>
 <p className="mt-6 text-lg opacity-60 max-w-lg mx-auto">{h?.subtitle}</p>
 </section>
 )
}
export function OtoVipAnatomy() {
 return (
 <section className="py-24 px-6 text-center">
 <h2 className="text-3xl font-bold mb-4">Araç Anatomisi</h2>
 <p className="opacity-50">Her detay, mükemmellik için tasarlandı.</p>
 </section>
 )
}
export function OtoVipContact({ state }: SectionProps) {
 const c = state?.contact
 return (
 <section className="py-24 px-6 text-center">
 <h2 className="text-3xl font-bold">{c?.title ?? 'Randevu'}</h2>
 <p className="mt-2 opacity-50">{c?.subtitle}</p>
 </section>
 )
}
