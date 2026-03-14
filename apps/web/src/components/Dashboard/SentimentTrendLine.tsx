'use client'

import { useEffect, useState } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function SentimentTrendLine({ esnafId }: { esnafId: string }) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!esnafId) return
        const fetchData = async () => {
            try {
                const req = await fetch(`/api/dashboard/sentiment?esnafId=${esnafId}`)
                if (!req.ok) throw new Error('Sentiment Alınamadı')
                const res = await req.json()

                const formatted = res.trend.map((d: any) => ({
                    ...d,
                    tarih: new Date(d.gun).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
                }))

                setData({ ...res, trend: formatted })
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [esnafId])

    if (loading) return <div className="min-h-[300px] w-full animate-pulse bg-gray-900 rounded-xl mt-4" />

    // AI Öncesi vs Sonrası Baseline Çizmek için (Referans Line'ı kendimiz sahte data üzerinden yürüterek çiziyoruz, ya da ReferenceLine de kullanılabilir)
    const esnafPuan = data?.guncelOrtalama || 0

    return (
        <Card className="bg-gray-900 border-gray-800 h-full drop-shadow-lg relative overflow-hidden">
            {/* Arkaplan Soft Glow */}
            <div className="absolute top-0 right-0 p-32 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-gray-800/50">
                <div>
                    <CardTitle className="flex items-center gap-2 text-gray-200 font-medium">
                        <Star className="text-amber-400 w-5 h-5 fill-amber-400" />
                        Google Haritalar Duygu Eğilimi
                    </CardTitle>
                    <div className="text-sm text-gray-400 mt-1">AI tabanlı kriz yönetimi ile itibar yükselişi.</div>
                </div>
                <div className="text-2xl font-bold text-gray-100">
                    {esnafPuan}⭐
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data.trend}
                            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorSkor" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5} />
                                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="tarih"
                                stroke="#4b5563"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                minTickGap={30}
                            />
                            {/* Puanlar 1 ile 5 arasında olduğu için domain fixed */}
                            <YAxis
                                domain={[1, 5]}
                                stroke="#4b5563"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
                                itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                                labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
                                formatter={(value: any) => [`${value} Puan`, '⭐ Göreceli Ort.']}
                            />

                            <Line
                                type="natural"
                                dataKey="skor"
                                stroke="url(#colorSkor)"
                                strokeWidth={4}
                                dot={false}
                                activeDot={{ r: 8, fill: '#f59e0b', stroke: '#1f2937', strokeWidth: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
