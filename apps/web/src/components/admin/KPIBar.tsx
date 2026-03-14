export function KPIBar({ stats, yukleniyor, bostaNumara, son24sMesaj }: any) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Güncel MRR', value: yukleniyor ? '—' : `₺${(stats?.mrr || 0).toLocaleString('tr-TR')}`, sub: 'aktif × aylık paket' },
                { label: 'Aktif Esnaf', value: yukleniyor ? '—' : (stats?.aktifSayisi ?? 0).toString(), sub: `toplam ${stats?.toplamSayisi ?? 0} kayıt` },
                { label: 'Boşta Numara', value: yukleniyor ? '—' : bostaNumara.toString(), sub: 'atanmayı bekliyor' },
                { label: 'Son 24s Mesaj', value: yukleniyor ? '—' : son24sMesaj.toString(), sub: 'ajan aksiyonu' },
            ].map(kpi => (
                <div key={kpi.label} className="bg-background rounded p-6 shadow-sm border border-border/10">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-3">{kpi.label}</p>
                    <p className="font-syne text-3xl font-bold text-slate-100">{kpi.value}</p>
                    <p className="text-muted-foreground text-xs mt-2 font-mono">{kpi.sub}</p>
                </div>
            ))}
        </div>
    )
}
