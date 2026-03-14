'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Globe } from 'lucide-react'

export function OmnichannelPieChart({ esnafId }: { esnafId: string }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!esnafId) return
        const fetchData = async () => {
            try {
                const req = await fetch(`/api/dashboard/omnichannel?esnafId=${esnafId}`)
                if (!req.ok) throw new Error('Omnichannel Verisi Hatası')
                const res = await req.json()
                setData(res)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [esnafId])

    if (loading) return <div className="min-h-[300px] w-full animate-pulse bg-gray-900 rounded-xl" />

    // Eğrisi 0 olan dataları göstermeyelim ki chart çirkinleşmesin (opsiyonel)
    const renderData = data.filter((d: any) => d.value > 0)

    if (renderData.length === 0 && !loading) {
        return (
            <Card className="bg-gray-900 border-gray-800 h-full drop-shadow-lg flex flex-col justify-center items-center text-gray-500">
                <Globe className="w-8 h-8 mb-2 opacity-50" />
                Henüz yeterli Omnichannel verisi yok
            </Card>
        )
    }

    return (
        <Card className="bg-gray-900 border-gray-800 h-full drop-shadow-lg overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-gray-200 font-medium">
                    <Globe className="text-blue-400 w-5 h-5" />
                    Kanal Bazlı Etkileşim
                </CardTitle>
                <div className="text-sm text-gray-400">Hangi platformdan daha çok trafik alıyorsunuz?</div>
            </CardHeader>

            <CardContent className="pt-4">
                <div className="min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
                                itemStyle={{ color: '#e5e7eb' }}
                                formatter={(value: any) => [`${value} Mesajlaşma`, 'Miktar']}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
                            />
                            <Pie
                                data={renderData}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={6}
                            >
                                {renderData.map((entry: any, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
