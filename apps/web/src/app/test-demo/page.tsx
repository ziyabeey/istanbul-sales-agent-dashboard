import Link from 'next/link'
import {
    ArrowRight,
    BadgeCheck,
    Braces,
    Building2,
    CalendarDays,
    CheckCircle2,
    ClipboardCheck,
    Activity,
    MessageCircle,
    Scissors,
    ShieldCheck,
    Users,
} from 'lucide-react'
import { demoBusiness } from '@/data/demoBusiness'

const metrics = [
    { label: 'Hizmet', value: demoBusiness.services.length, icon: Scissors },
    { label: 'Müşteri', value: demoBusiness.customers.length, icon: Users },
    { label: 'Konuşma', value: demoBusiness.conversations.length, icon: MessageCircle },
    { label: 'Randevu', value: demoBusiness.appointments.length, icon: CalendarDays },
]

const checklist = [
    'Dashboard açılıyor mu?',
    'İşletme profili geliyor mu?',
    'Müşteri konuşmaları görünüyor mu?',
    'Randevular görünüyor mu?',
    'Site önizleme çalışıyor mu?',
]

const ctas = [
    {
        label: 'Demo Dashboard’a Gir',
        href: '/api/auth/demo-login?redirect=/dashboard',
        icon: ArrowRight,
        primary: true,
    },
    {
        label: 'Demo İşletme JSON’unu Gör',
        href: '/api/esnaf/demo-berber-01',
        icon: Braces,
    },
    {
        label: 'Auth Durumunu Kontrol Et',
        href: '/api/auth/me',
        icon: ShieldCheck,
    },
    {
        label: 'Demo Durum Panelini Aç',
        href: '/test-demo/status',
        icon: Activity,
    },
]

export default function TestDemoPage() {
    return (
        <main className="min-h-screen bg-[#05050A] text-white px-5 py-8 md:px-8 md:py-12">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-200">
                            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                            MVP test girişi
                        </div>
                        <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                            Kepenk AI Demo Laboratuvarı
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
                            Bu sayfa, MVP akışını gerçek Firebase, OTP, Twilio, ödeme, Cloudflare,
                            cron işleri veya ajan orkestrasyonu kullanmadan test etmemizi sağlar.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                        kepenk.ai ana sayfa
                    </Link>
                </header>

                <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-300">
                                    demo-berber-01
                                </p>
                                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                                    {demoBusiness.isletmeAdiTam}
                                </h2>
                                <p className="mt-2 text-sm text-white/60">
                                    {demoBusiness.sektorEtiketi} · {demoBusiness.ilce}, {demoBusiness.il}
                                </p>
                            </div>
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
                                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                                {demoBusiness.paket} paket
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {metrics.map(({ label, value, icon: Icon }) => (
                                <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                                    <Icon className="h-5 w-5 text-indigo-300" aria-hidden="true" />
                                    <div className="mt-3 text-2xl font-black">{value}</div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-white/45">{label}</div>
                                </div>
                            ))}
                        </div>

                        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                            <InfoRow label="İşletme adı" value={demoBusiness.isletmeAdi} />
                            <InfoRow label="Sektör" value={demoBusiness.sektorEtiketi} />
                            <InfoRow label="Şehir / ilçe" value={`${demoBusiness.il} / ${demoBusiness.ilce}`} />
                            <InfoRow label="Paket" value={demoBusiness.paket} />
                        </dl>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-200">
                                <Building2 className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black">Demo girişleri</h2>
                                <p className="text-sm text-white/50">Dashboard ve API kontrolleri</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            {ctas.map(({ label, href, icon: Icon, primary }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`inline-flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition ${primary
                                        ? 'border-indigo-300/30 bg-indigo-500 text-white hover:bg-indigo-400'
                                        : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                        {label}
                                    </span>
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h2 className="text-xl font-black">MVP kontrol listesi</h2>
                    <div className="mt-5 grid gap-3 md:grid-cols-5">
                        {checklist.map((item) => (
                            <div key={item} className="rounded-xl border border-white/10 bg-black/20 p-4">
                                <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" aria-hidden="true" />
                                <p className="text-sm font-semibold leading-5 text-white/75">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
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
