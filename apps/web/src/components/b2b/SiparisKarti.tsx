import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

export interface Siparis {
    id: string
    aliciAd: string
    saticiAd: string
    urunler: { ad: string; miktar: number; fiyat: number }[]
    toplam: number
    durum: 'bekliyor' | 'hazirlaniyor' | 'yola_cikti' | 'teslim_edildi'
    tarih: string
}

export const DURUM_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    bekliyor:       { label: 'Onayda',      color: 'text-amber-400',   bg: 'bg-amber-500/10', icon: Clock },
    hazirlaniyor:   { label: 'Hazırlanıyor', color: 'text-blue-400',    bg: 'bg-blue-500/10',  icon: Package },
    yola_cikti:     { label: 'Yolda',       color: 'text-violet-400',  bg: 'bg-violet-500/10', icon: Truck },
    teslim_edildi:  { label: 'Teslim',      color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle },
}

interface Props {
    siparis: Siparis
    onDurumGuncelle: (id: string, durum: string) => void
}

export function SiparisKarti({ siparis, onDurumGuncelle }: Props) {
    const cfg = DURUM_CONFIG[siparis.durum] || DURUM_CONFIG.bekliyor
    const Icon = cfg.icon

    return (
        <div className="bg-background border border-border/50 rounded-xl p-4 hover:border-border/50 transition-all">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div>
                        <p className="text-foreground font-semibold text-sm">{siparis.aliciAd}</p>
                        <p className="text-muted-foreground text-xs">{siparis.tarih}</p>
                    </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} font-semibold`}>
                    {cfg.label}
                </span>
            </div>

            {/* Ürünler */}
            <div className="space-y-1.5 mb-3">
                {siparis.urunler.map((u, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{u.miktar}x {u.ad}</span>
                        <span className="text-muted-foreground font-mono">₺{u.fiyat}</span>
                    </div>
                ))}
            </div>

            {/* Toplam */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-muted-foreground text-xs">Toplam</span>
                <span className="text-emerald-400 font-syne font-bold">₺{siparis.toplam.toLocaleString('tr-TR')}</span>
            </div>

            {/* Durum butonları */}
            <div className="flex gap-1.5 mt-3">
                {(['bekliyor', 'hazirlaniyor', 'yola_cikti', 'teslim_edildi'] as const).map(d => {
                    const c = DURUM_CONFIG[d]
                    const aktif = siparis.durum === d
                    return (
                        <button
                            key={d}
                            onClick={() => onDurumGuncelle(siparis.id, d)}
                            className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg border transition-all ${
                                aktif
                                    ? `${c.bg} ${c.color} border-current`
                                    : 'text-muted-foreground border-border hover:text-muted-foreground'
                            }`}
                        >
                            {c.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
