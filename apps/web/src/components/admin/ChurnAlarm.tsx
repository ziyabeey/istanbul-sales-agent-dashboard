import { MessageCircle, ExternalLink } from 'lucide-react'

const DURUM_DOT: Record<string, string> = {
    aktif: 'bg-emerald-400', pasif: 'bg-slate-600', riskli: 'bg-amber-400',
    onboarding: 'bg-blue-400', silindi: 'bg-rose-400',
}

export function ChurnAlarm({ stats }: { stats: any }) {
    if (!stats || stats.churnYuksek.length === 0) return null

    return (
        <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                Churn Alarmı — {stats.churnYuksek.length} esnaf risk altında
            </p>
            <div className="bg-background rounded shadow-sm border border-border/10 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50">
                            {['Esnaf', 'Paket', 'Risk Skoru', 'Durum', 'İşlem'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                        {stats.churnYuksek.map((e: any) => (
                            <tr key={e.id} className="hover:bg-card/30 transition-colors">
                                <td className="px-4 py-3 text-muted-foreground">{e.ad}</td>
                                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{e.paket}</td>
                                <td className="px-4 py-3">
                                    <span className={`font-mono text-sm font-bold ${e.churnSkoru > 85 ? 'text-rose-400' : 'text-amber-400'}`}>
                                        {e.churnSkoru}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1.5 ${DURUM_DOT[e.durum] || 'bg-slate-600'}`} />
                                    <span className="text-muted-foreground text-xs">{e.durum}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {e.waNumarasi && (
                                            <a href={`https://wa.me/${e.waNumarasi.replace(/\D/g, '')}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-emerald-400 transition-colors" title="WhatsApp">
                                                <MessageCircle className="w-4 h-4" />
                                            </a>
                                        )}
                                        {e.instagramUsername && (
                                            <a href={`https://instagram.com/${e.instagramUsername}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-pink-400 transition-colors" title="Instagram">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
