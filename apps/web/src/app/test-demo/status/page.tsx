"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    CircleAlert,
    CircleX,
    ClipboardCheck,
    Database,
    ShieldCheck,
} from 'lucide-react'
import { demoBusiness } from '@/data/demoBusiness'

type CheckState = 'pending' | 'ok' | 'warning' | 'error'

type RouteCheck = {
    key: string
    label: string
    path: string
    state: CheckState
    httpStatus?: number
    count?: number
    message?: string
}

type AuthResult = {
    authenticated: boolean
    isDemo?: boolean
    esnafId?: string
    status?: number
    message?: string
}

const DEMO_ID = 'demo-berber-01'
const firstDemoNumber = demoBusiness.conversations[0]?.musteriNumara || demoBusiness.customers[0]?.telefon || ''

const initialChecks: RouteCheck[] = [
    { key: 'auth', label: 'Auth kimliği', path: '/api/auth/me', state: 'pending' },
    { key: 'business', label: 'Demo işletme', path: `/api/esnaf/${DEMO_ID}`, state: 'pending' },
    { key: 'conversations', label: 'Konuşmalar', path: `/api/dashboard/konusmalar?esnafId=${DEMO_ID}`, state: 'pending' },
    {
        key: 'messages',
        label: 'İlk konuşma mesajları',
        path: `/api/dashboard/konusmalar/mesajlar?esnafId=${DEMO_ID}&musteriNumara=${encodeURIComponent(firstDemoNumber)}`,
        state: 'pending',
    },
    { key: 'customers', label: 'Müşteriler', path: `/api/dashboard/musteriler?esnafId=${DEMO_ID}`, state: 'pending' },
    { key: 'appointments', label: 'Randevular', path: `/api/randevu?esnafId=${DEMO_ID}`, state: 'pending' },
]

const pageLinks = [
    { label: 'Demo Hub', href: '/test-demo' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Konuşmalar', href: '/dashboard/konusmalar' },
    { label: 'Müşteriler', href: '/dashboard/musteriler' },
    { label: 'Randevular', href: '/dashboard/randevular' },
    { label: 'Web Sitem', href: '/dashboard/sitem' },
]

export default function DemoStatusPage() {
    const [auth, setAuth] = useState<AuthResult>({ authenticated: false })
    const [checks, setChecks] = useState<RouteCheck[]>(initialChecks)

    useEffect(() => {
        let cancelled = false

        async function runChecks() {
            const results = await Promise.all(initialChecks.map(runRouteCheck))
            if (cancelled) return

            setChecks(results)
            const authCheck = results.find((item) => item.key === 'auth')
            const authData = authCheck?.message ? parseJsonSafe(authCheck.message) : null
            setAuth({
                authenticated: authCheck?.state === 'ok',
                isDemo: Boolean(authData?.isDemo),
                esnafId: typeof authData?.esnafId === 'string' ? authData.esnafId : undefined,
                status: authCheck?.httpStatus,
                message: authCheck?.state === 'ok' ? undefined : authCheck?.message,
            })
        }

        runChecks()
        return () => { cancelled = true }
    }, [])

    const countMap = useMemo(() => {
        const findCount = (key: string) => checks.find((item) => item.key === key)?.count
        return {
            conversations: findCount('conversations'),
            customers: findCount('customers'),
            appointments: findCount('appointments'),
        }
    }, [checks])

    const needsDemoLogin = checks.find((item) => item.key === 'business')?.httpStatus === 403
        || checks.find((item) => item.key === 'auth')?.httpStatus === 401

    return (
        <main className="min-h-screen bg-[#05050A] px-5 py-8 text-white md:px-8 md:py-12">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                            Read-only MVP kontrol
                        </div>
                        <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                            Kepenk AI Demo Durum Paneli
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
                            Demo oturumu, demo işletme verisi ve MVP ekranlarının kullandığı güvenli GET rotaları burada izlenir.
                        </p>
                    </div>
                    <Link
                        href="/test-demo"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                        Demo laboratuvarına dön
                    </Link>
                </header>

                {needsDemoLogin && (
                    <section className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5">
                        <h2 className="text-lg font-black text-amber-100">Demo verilerini görmek için önce demo giriş yapmalısınız.</h2>
                        <p className="mt-2 text-sm leading-6 text-amber-100/70">
                            Giriş sonrası bu sayfa aynı adrese döner ve demo oturumu ile güvenli kontrolleri tekrar çalıştırır.
                        </p>
                        <Link
                            href="/api/auth/demo-login?redirect=/test-demo/status"
                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-black text-black transition hover:bg-amber-200"
                        >
                            Demo Giriş Yap
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </section>
                )}

                <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                    <AuthCard auth={auth} />
                    <BusinessCard />
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-200">
                            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">API Sağlık Kontrolleri</h2>
                            <p className="text-sm text-white/50">Sadece izin verilen GET rotaları çağrılır.</p>
                        </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {checks.map((check) => (
                            <RouteCard key={check.key} check={check} />
                        ))}
                    </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                    <DataCompatibility counts={countMap} />
                    <MvpLinks />
                </section>
            </div>
        </main>
    )
}

async function runRouteCheck(check: RouteCheck): Promise<RouteCheck> {
    try {
        if (check.key === 'messages' && !firstDemoNumber) {
            return { ...check, state: 'warning', message: 'Demo konuşma numarası yok' }
        }

        const res = await fetch(check.path, { method: 'GET', credentials: 'include' })
        const text = await res.text()
        const data = parseJsonSafe(text)
        const count = countFromData(data)

        return {
            ...check,
            state: res.ok ? 'ok' : res.status === 401 || res.status === 403 ? 'warning' : 'error',
            httpStatus: res.status,
            count,
            message: check.key === 'auth' ? text : data?.error || undefined,
        }
    } catch (error) {
        return {
            ...check,
            state: 'error',
            message: error instanceof Error ? error.message : 'İstek başarısız',
        }
    }
}

function parseJsonSafe(text: string): Record<string, unknown> | unknown[] | null {
    try {
        return JSON.parse(text)
    } catch {
        return null
    }
}

function countFromData(data: Record<string, unknown> | unknown[] | null): number | undefined {
    if (Array.isArray(data)) return data.length
    if (data && Array.isArray(data.randevular)) return data.randevular.length
    return undefined
}

function AuthCard({ auth }: { auth: AuthResult }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-200">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="text-xl font-black">Auth Durumu</h2>
                    <p className="text-sm text-white/50">Demo oturumu ve kimlik bilgisi</p>
                </div>
            </div>
            <dl className="grid gap-3 text-sm">
                <InfoRow label="Giriş durumu" value={auth.authenticated ? 'Giriş var' : 'Giriş yok'} />
                <InfoRow label="Demo mu?" value={auth.isDemo ? 'Evet' : 'Hayır / bilinmiyor'} />
                <InfoRow label="Esnaf ID" value={auth.esnafId || '—'} />
                <InfoRow label="HTTP" value={auth.status ? String(auth.status) : '—'} />
            </dl>
            {!auth.authenticated && (
                <Link
                    href="/api/auth/demo-login?redirect=/test-demo/status"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-black text-white transition hover:bg-indigo-400"
                >
                    Demo Giriş Yap
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            )}
        </section>
    )
}

function BusinessCard() {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-200">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="text-xl font-black">Demo İşletme</h2>
                    <p className="text-sm text-white/50">{DEMO_ID}</p>
                </div>
            </div>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow label="İşletme" value={demoBusiness.isletmeAdiTam} />
                <InfoRow label="Sektör" value={demoBusiness.sektorEtiketi} />
                <InfoRow label="Şehir / ilçe" value={`${demoBusiness.il} / ${demoBusiness.ilce}`} />
                <InfoRow label="Paket" value={demoBusiness.paket} />
            </dl>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
                <Metric label="Hizmet" value={demoBusiness.services.length} />
                <Metric label="Müşteri" value={demoBusiness.customers.length} />
                <Metric label="Konuşma" value={demoBusiness.conversations.length} />
                <Metric label="Randevu" value={demoBusiness.appointments.length} />
            </div>
        </section>
    )
}

function RouteCard({ check }: { check: RouteCheck }) {
    const Icon = check.state === 'ok' ? CheckCircle2 : check.state === 'error' ? CircleX : CircleAlert
    const tone = check.state === 'ok'
        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
        : check.state === 'error'
            ? 'border-rose-400/20 bg-rose-400/10 text-rose-200'
            : 'border-amber-400/20 bg-amber-400/10 text-amber-200'

    return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-black text-white">{check.label}</h3>
                    <p className="mt-1 break-all font-mono text-[11px] leading-5 text-white/40">{check.path}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-black uppercase ${tone}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {check.state === 'ok' ? 'OK' : check.state === 'error' ? 'Error' : 'Warning'}
                </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
                <span>HTTP: {check.httpStatus || '—'}</span>
                {check.count !== undefined && <span>Count: {check.count}</span>}
            </div>
            {check.message && check.key !== 'auth' && (
                <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-xs leading-5 text-white/55">{check.message}</p>
            )}
        </div>
    )
}

function DataCompatibility({ counts }: { counts: { conversations?: number; customers?: number; appointments?: number } }) {
    const rows = [
        { label: 'Konuşmalar', seed: demoBusiness.conversations.length, live: counts.conversations },
        { label: 'Müşteriler', seed: demoBusiness.customers.length, live: counts.customers },
        { label: 'Randevular', seed: demoBusiness.appointments.length, live: counts.appointments },
        { label: 'Site önizleme', seed: demoBusiness.siteData ? 1 : 0, live: demoBusiness.siteData ? 1 : 0 },
    ]

    return (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
                    <Database className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="text-xl font-black">Veri Uyum Kontrolü</h2>
                    <p className="text-sm text-white/50">Seed verisi ve API sonucu karşılaştırması</p>
                </div>
            </div>
            <div className="space-y-3">
                {rows.map((row) => {
                    const ok = row.live !== undefined && row.seed === row.live
                    return (
                        <div key={row.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
                            <div>
                                <p className="font-bold">{row.label}</p>
                                <p className="mt-1 text-xs text-white/45">Seed: {row.seed} · API: {row.live ?? '—'}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-black ${ok ? 'bg-emerald-400/10 text-emerald-200' : 'bg-amber-400/10 text-amber-200'}`}>
                                {ok ? 'Uyumlu' : 'Kontrol gerekli'}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

function MvpLinks() {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-black">MVP Sayfa Linkleri</h2>
            <p className="mt-2 text-sm text-white/50">Demo akışını hızlı doğrulamak için.</p>
            <div className="mt-5 grid gap-3">
                {pageLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                        {link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                ))}
            </div>
        </section>
    )
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-white/40">{label}</dt>
            <dd className="mt-1 font-semibold text-white/85">{value}</dd>
        </div>
    )
}

function Metric({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-2xl font-black">{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-white/45">{label}</div>
        </div>
    )
}
