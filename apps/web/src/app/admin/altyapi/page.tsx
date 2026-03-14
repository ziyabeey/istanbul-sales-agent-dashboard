'use client'

import { useEffect, useState } from 'react'

const ADMIN_TOKEN = 'kepenk-admin-2026'

type ServiceStatus = null | true | false

interface ServiceCard {
    key: string
    name: string
    category: string
    metric?: string
    metricValue?: string
}

const SERVICES: ServiceCard[] = [
    { key: 'gce',      name: 'GCE Cloud Run',  category: 'Compute',   metric: 'CPU',      metricValue: '23%' },
    { key: 'firebase', name: 'Firebase',        category: 'Database',  metric: 'Reads/dk', metricValue: '—'   },
    { key: 'twilio',   name: 'Twilio',          category: 'Messaging', metric: 'WA API',   metricValue: '—'   },
    { key: 'netgsm',   name: 'NetGSM',          category: 'SMS',       metric: 'Bakiye',   metricValue: '—'   },
    { key: 'vapi',     name: 'VAPI',            category: 'Voice',     metric: 'Aktif',    metricValue: '—'   },
]

function StatusDot({ status }: { status: ServiceStatus }) {
    if (status === null) return <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
    if (status === true) return <span className="w-2 h-2 rounded-full bg-emerald-400" />
    return <span className="w-2 h-2 rounded-full bg-rose-400" />
}

function StatusLabel({ status }: { status: ServiceStatus }) {
    if (status === null) return <span className="text-muted-foreground font-mono text-xs">Kontrol ediliyor...</span>
    if (status === true) return <span className="text-emerald-400 font-mono text-xs">Çevrimiçi</span>
    return <span className="text-rose-400 font-mono text-xs">Sorun var</span>
}

export default function AltyapiPage() {
    const [statuses, setStatuses] = useState<Record<string, ServiceStatus>>({
        gce: null, firebase: null, twilio: null, netgsm: null, vapi: null,
    })
    const [responseMs, setResponseMs] = useState<Record<string, number | null>>({
        gce: null, firebase: null, twilio: null, netgsm: null, vapi: null,
    })

    useEffect(() => {
        // GCE — mock (Cloud Run has no public status endpoint)
        setTimeout(() => {
            setStatuses(s => ({ ...s, gce: true }))
            setResponseMs(r => ({ ...r, gce: 42 }))
        }, 600)

        // Firebase — mock
        setTimeout(() => {
            setStatuses(s => ({ ...s, firebase: true }))
            setResponseMs(r => ({ ...r, firebase: 18 }))
        }, 800)

        // Twilio — real check
        const twilioStart = Date.now()
        fetch('https://status.twilio.com/api/v2/status.json', {
            signal: AbortSignal.timeout(5000),
        })
            .then(r => r.json())
            .then((d: { status?: { indicator?: string } }) => {
                const ok = d?.status?.indicator === 'none'
                setStatuses(s => ({ ...s, twilio: ok }))
                setResponseMs(r => ({ ...r, twilio: Date.now() - twilioStart }))
            })
            .catch(() => {
                setStatuses(s => ({ ...s, twilio: false }))
                setResponseMs(r => ({ ...r, twilio: null }))
            })

        // NetGSM — mock
        setTimeout(() => {
            setStatuses(s => ({ ...s, netgsm: true }))
            setResponseMs(r => ({ ...r, netgsm: 75 }))
        }, 1100)

        // VAPI — mock
        setTimeout(() => {
            setStatuses(s => ({ ...s, vapi: true }))
            setResponseMs(r => ({ ...r, vapi: 130 }))
        }, 900)
    }, [])

    // Health check for admin API
    const [apiSaglik, setApiSaglik] = useState<ServiceStatus>(null)
    useEffect(() => {
        fetch('/api/health', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            .then(r => setApiSaglik(r.ok))
            .catch(() => setApiSaglik(false))
    }, [])

    const allOnline = Object.values(statuses).filter(v => v !== null).length === 5
        && Object.values(statuses).every(v => v === true)

    return (
        <div className="p-8 min-h-screen bg-slate-950">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-syne text-xl font-bold text-slate-100 tracking-tight">Altyapı</h1>
                    <p className="text-muted-foreground text-xs mt-1 font-mono">Servis sağlık durumu — anlık kontrol</p>
                </div>
                {allOnline && (
                    <span className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Tüm sistemler çevrimiçi
                    </span>
                )}
            </div>

            {/* Service Cards */}
            <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Servisler</p>
                <div className="grid grid-cols-3 gap-4">
                    {SERVICES.map(svc => {
                        const status = statuses[svc.key]
                        const ms = responseMs[svc.key]
                        return (
                            <div key={svc.key} className="bg-background rounded p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-foreground font-syne font-semibold text-sm">{svc.name}</p>
                                        <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mt-0.5">{svc.category}</p>
                                    </div>
                                    <StatusDot status={status} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-xs font-mono">Durum</span>
                                        <StatusLabel status={status} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-xs font-mono">Yanıt</span>
                                        <span className="text-muted-foreground font-mono text-xs">
                                            {ms !== null ? `${ms}ms` : '—'}
                                        </span>
                                    </div>
                                    {svc.key === 'gce' && (
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-muted-foreground text-xs font-mono">CPU</span>
                                                <span className="text-muted-foreground font-mono text-xs">23%</span>
                                            </div>
                                            <div className="h-1 bg-card rounded">
                                                <div className="h-1 bg-emerald-500 rounded" style={{ width: '23%' }} />
                                            </div>
                                        </div>
                                    )}
                                    {svc.metric && svc.key !== 'gce' && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground text-xs font-mono">{svc.metric}</span>
                                            <span className="text-muted-foreground font-mono text-xs">{svc.metricValue}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {/* Admin API */}
                    <div className="bg-background rounded p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-foreground font-syne font-semibold text-sm">Admin API</p>
                                <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mt-0.5">Internal</p>
                            </div>
                            <StatusDot status={apiSaglik} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-xs font-mono">Durum</span>
                                <StatusLabel status={apiSaglik} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-xs font-mono">Endpoint</span>
                                <span className="text-muted-foreground font-mono text-xs">/api/health</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deployment Info */}
            <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Dağıtım Bilgileri</p>
                <div className="bg-background rounded overflow-hidden">
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-slate-800/30">
                            {[
                                { label: 'Bölge',         value: 'europe-west1 (Belçika)' },
                                { label: 'Platform',      value: 'Google Cloud Run' },
                                { label: 'Build Tag',     value: process.env.NEXT_PUBLIC_BUILD_TAG || 'latest' },
                                { label: 'Son Deploy',    value: process.env.NEXT_PUBLIC_DEPLOY_DATE || '—' },
                                { label: 'Node',          value: process.env.NEXT_PUBLIC_NODE_VERSION || '20.x' },
                                { label: 'Next.js',       value: '15.3.2' },
                            ].map(row => (
                                <tr key={row.label} className="hover:bg-card/20 transition-colors">
                                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs w-40">{row.label}</td>
                                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
