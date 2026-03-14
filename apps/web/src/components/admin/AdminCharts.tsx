import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function AdminCharts({ MRR_TREND, paketDagilim, PAKET_RENKLERI }: any) {
    return (
        <div className="grid grid-cols-2 gap-6 mb-8">
            {/* MRR Trendi */}
            <div className="bg-background rounded p-5 shadow-sm border border-border/10">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">MRR Trendi (6 Ay)</p>
                <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={MRR_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <XAxis dataKey="ay" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false}
                            tickFormatter={(v) => v === 0 ? '0' : `₺${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                            contentStyle={{ background: 'var(--color-popover)', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: 12 }}
                            labelStyle={{ color: 'var(--color-muted-foreground)' }}
                            formatter={(v: any) => [`₺${Number(v).toLocaleString('tr-TR')}`, 'MRR']}
                        />
                        <Line type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Paket Dağılımı */}
            <div className="bg-background rounded p-5 shadow-sm border border-border/10">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Paket Dağılımı</p>
                <div className="flex items-center gap-6">
                    <ResponsiveContainer width={130} height={130}>
                        <PieChart>
                            <Pie data={paketDagilim} cx="50%" cy="50%" innerRadius={38} outerRadius={58}
                                dataKey="value" paddingAngle={2}>
                                {paketDagilim.map((entry: any, i: number) => (
                                    <Cell key={`cell-${i}`} fill={PAKET_RENKLERI[entry.name] || '#475569'} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 flex-1">
                        {paketDagilim.map((p: any) => (
                            <div key={p.name} className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PAKET_RENKLERI[p.name] || '#475569' }} />
                                    {p.name}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">{p.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
