export function InfraDot({ ok }: { ok: boolean | null }) {
    if (ok === null) return <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse inline-block" />
    return <span className={`w-2 h-2 rounded-full inline-block ${ok ? 'bg-emerald-400' : 'bg-amber-400'}`} />
}

export function InfraSummary({ twilioOk }: { twilioOk: boolean | null }) {
    return (
        <div className="bg-background rounded p-5 shadow-sm border border-border/10">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-5">Altyapı</p>
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-muted-foreground">GCE Cloud Run</span>
                        <span className="flex items-center gap-1.5">
                            <InfraDot ok={true} />
                            <span className="text-xs text-muted-foreground font-mono">CPU 23%</span>
                        </span>
                    </div>
                    <div className="h-1 bg-card rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '23%' }} />
                    </div>
                </div>
                {[
                    { label: 'Firebase', ok: true, detail: '8ms · 1.2k okuma' },
                    { label: 'Twilio', ok: twilioOk, detail: twilioOk === null ? 'kontrol...' : twilioOk ? 'operasyonel' : 'uyarı var' },
                    { label: 'NetGSM', ok: true, detail: '180ms' },
                    { label: 'VAPI', ok: true, detail: '110ms' },
                ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{s.label}</span>
                        <span className="flex items-center gap-1.5">
                            <InfraDot ok={s.ok} />
                            <span className="text-xs text-muted-foreground font-mono">{s.detail}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
