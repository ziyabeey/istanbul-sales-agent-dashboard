import { RefObject } from 'react'

export interface AjanLog {
    id: string
    ajan: string
    esnafId: string | null
    tip: string
    basari: boolean
    zaman: string | null
    kanal: string | null
}

function formatLogTime(iso: string | null): string {
    if (!iso) return '--:--:--'
    const d = new Date(iso)
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

interface Props {
    ajanLogs: AjanLog[]
    logEndRef: RefObject<HTMLDivElement | null>
}

export function SystemLogs({ ajanLogs, logEndRef }: Props) {
    return (
        <div className="col-span-2 bg-background rounded shadow-sm border border-border/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Sistem Logları</span>
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-muted-foreground font-mono">canlı · 5s</span>
                </span>
            </div>
            <div className="font-mono text-xs p-4 space-y-1.5 h-80 overflow-y-auto bg-[#0A0A0A]" ref={logEndRef}>
                {ajanLogs.length === 0 && (
                    <p className="text-muted-foreground text-opacity-50">Henüz log girişi yok...</p>
                )}
                {ajanLogs.map(log => (
                    <div key={log.id} className="flex items-start gap-3">
                        <span className="text-muted-foreground text-opacity-50 shrink-0 w-20">{formatLogTime(log.zaman)}</span>
                        <span className={`shrink-0 w-40 truncate ${log.basari ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {log.ajan}
                        </span>
                        <span className="text-muted-foreground truncate flex-1">{log.tip}</span>
                        {log.esnafId && (
                            <span className="text-muted-foreground text-opacity-50 font-mono shrink-0">#{log.esnafId.slice(-6)}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
