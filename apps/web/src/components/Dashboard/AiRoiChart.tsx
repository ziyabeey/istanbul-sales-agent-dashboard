'use client'

import { useEffect, useState } from 'react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TrendingUp, Activity } from 'lucide-react'

export function AiRoiChart({ esnafId }: { esnafId: string }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!esnafId) return
        const fetchData = async () => {
            try {
                const req = await fetch(`/api/dashboard/ai-roi?esnafId=${esnafId}`)
                if (!req.ok) throw new Error('Ciro Datası Alınamadı')
                const res = await req.json()

                // Gun formatını '1 Mar', '15 Mar' şeklinde kısaltarak daha estetik yapma
                const formatted = res.zamanSerisi.map((d: any) => ({
                    ...d,
                    tarih: new Date(d.gun).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
                }))
                setData(formatted)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [esnafId])

    if (loading) return <div className="min-h-[300px] w-full animate-pulse bg-gray-900 rounded-xl" />

    return (
        <Card className="bg-gray-900 border-gray-800 h-full drop-shadow-lg overflow-hidden relative">
            {/* Arkaplan Soft Glow */}
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <CardHeader className="pb-2 border-b border-gray-800/50">
                <CardTitle className="flex items-center gap-2 text-gray-200 font-medium">
                    <TrendingUp className="text-emerald-400 w-5 h-5" />
                    AI Tarafından Üretilen Ekstra Ciro
                </CardTitle>
                <div className="text-sm text-gray-400">Son 30 Günlük Dinamik Fiyatlandırma & Tahsilat Performansı</div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="min-h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorSurge" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorTahsilat" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="tarih"
                                stroke="#4b5563"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                minTickGap={20}
                            />
                            <YAxis
                                stroke="#4b5563"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `₺${val}`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
                                itemStyle={{ color: '#e5e7eb' }}
                                labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
                                formatter={(value: any, name: any) => [`₺${Number(value).toLocaleString()}`, name === 'surgeFiyatFarki' ? '💰 Surge (Zam) Ciro' : '📩 Kurtarılan Tahsilat']}
                            />

                            <Area
                                type="monotone"
                                dataKey="tahsilEdilen"
                                stackId="1"
                                stroke="#3b82f6"
                                fill="url(#colorTahsilat)"
                                strokeWidth={2}
                                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1e3a8a', strokeWidth: 2 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="surgeFiyatFarki"
                                stackId="1"
                                stroke="#10b981"
                                fill="url(#colorSurge)"
                                strokeWidth={2}
                                activeDot={{ r: 6, fill: '#10b981', stroke: '#064e3b', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
