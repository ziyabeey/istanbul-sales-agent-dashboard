"use client";

import React, { useState, useEffect } from "react";
import { Bell, Mail, Smartphone, AlertTriangle, CheckCircle2, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation"; // Assuming useRouter is from next/navigation
import { useEsnaf } from "@/context/EsnafContext";

export default function BildirimlerPage() {
    const router = useRouter()
    const { esnafId } = useEsnaf()
    const [bildirimler, setBildirimler] = useState<any[]>([])

    const [ayarlar, setAyarlar] = useState({
        yeniRandevuSms: true,
        yeniRandevuWa: true,
        haftalikRapor: true,
        krediUyarisi: true,
    });

    const [saved, setSaved] = useState(false);

    const toggleAyar = (key: keyof typeof ayarlar) => {
        setAyarlar(prev => ({ ...prev, [key]: !prev[key] }))
    }

    useEffect(() => {
        if (!esnafId) return
        const fetchUyari = async () => {
            const res = await fetch(`/api/dashboard/bildirimler?esnafId=${esnafId}`)
            if (res.ok) {
                const data = await res.json()
                setBildirimler(data.bildirimler || [])
            }
        }
        fetchUyari()
    }, [esnafId])

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const notifications = [
        { id: 1, type: "system", title: "Sistem Güncellemesi", desc: "Veritabanı optimizasyonu nedeniyle sisteme 03:00'da 10 dakikalık bakım yapılacaktır.", date: "1 Saat Önce", read: false },
        { id: 2, type: "lead", title: "Yeni Lead Yakalandı", desc: "Instagram üzerinden 'Ahmet Yılmaz' randevu talep etti.", date: "Bugün 14:30", read: true },
        { id: 3, type: "report", title: "Haftalık Ciro Raporu", desc: "Geçen haftaya göre satışlarınız %15 artış gösterdi.", date: "Dün", read: true },
        { id: 4, type: "billing", title: "Fatura Kesildi", desc: "Bu aya e-faturanız sisteme yüklendi ve e-postanıza iletildi.", date: "5 Gün Önce", read: true },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold font-syne text-foreground mb-2">
                Bildirim <span className="text-rust">Merkezi</span>
            </h1>

            {bildirimler.length > 0 && (
                <div className="mb-6 space-y-2">
                    <h2 className="text-muted-foreground text-xs font-syne font-bold uppercase tracking-widest pl-1">Sistem Uyarıları</h2>
                    {bildirimler.map((b: any) => (
                        <div key={b.id} className={`p-4 rounded-xl border ${b.tip === 'critical' || b.tip === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-100' : 'bg-amber-500/10 border-amber-500/30 text-amber-100'}`}>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{b.tip === 'critical' || b.tip === 'error' ? '⚠️' : '🔔'}</span>
                                <div>
                                    <p className="font-syne font-bold">{b.baslik}</p>
                                    <p className="text-sm opacity-80 mt-1">{b.detay}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Sol Taraf: Bildirim Listesi */}
                <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-sm border border-border-light/20 overflow-hidden">
                    <div className="p-6 border-b border-border-light/20 flex justify-between items-center bg-warm/10">
                        <h2 className="font-bold text-foreground flex items-center gap-2">
                            <Bell className="w-5 h-5 text-rust" /> Son Bildirimler
                        </h2>
                        <button className="text-xs font-bold text-muted-foreground hover:text-rust transition-colors">Tümünü Okundu İşaretle</button>
                    </div>

                    <div className="divide-y divide-stone-light/10">
                        {notifications.map((notif) => (
                            <div key={notif.id} className={`p-6 transition-colors ${notif.read ? 'bg-white' : 'bg-rust-light/5'}`}>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        {notif.type === 'system' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                        {notif.type === 'lead' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                        {notif.type === 'report' && <Bell className="w-5 h-5 text-blue-500" />}
                                        {notif.type === 'billing' && <CheckCircle2 className="w-5 h-5 text-muted-foreground" />}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-semibold ${notif.read ? 'text-foreground' : 'text-rust'}`}>{notif.title}</h3>
                                            <span className="text-xs text-muted-foreground-light">{notif.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{notif.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sağ Taraf: İletişim Tercihleri */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-border-light/20">
                        <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-muted-foreground" />
                            İletişim Tercihleri
                        </h3>

                        <div className="space-y-5">
                            {/* Option 1 */}
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="relative flex items-center mt-1">
                                    <input type="checkbox" className="sr-only peer"
                                        checked={ayarlar.yeniRandevuWa}
                                        onChange={() => toggleAyar('yeniRandevuWa')}
                                    />    <div className="w-10 h-6 bg-stone-light/30 rounded-full peer peer-checked:bg-rust transition-colors"></div>
                                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-muted-foreground" /> WhatsApp Çıktıları
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Anlık lead ve müşteri bildirimlerini WhatsApp asistanımdan almak istiyorum.</p>
                                </div>
                            </label>

                            {/* Option 2 */}
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="relative flex items-center mt-1">
                                    <input type="checkbox" className="sr-only peer"
                                        checked={ayarlar.haftalikRapor}
                                        onChange={() => toggleAyar('haftalikRapor')}
                                    />    <div className="w-10 h-6 bg-stone-light/30 rounded-full peer peer-checked:bg-rust transition-colors"></div>
                                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" /> Haftalık E-Posta Raporu
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Pazartesi sabahları sistem performans özetimi PDF olarak mail almak istiyorum.</p>
                                </div>
                            </label>

                            {/* Option 3 */}
                            <label className="flex items-start gap-4 cursor-pointer group opacity-60">
                                <div className="relative flex items-center mt-1">
                                    <input type="checkbox" className="sr-only peer"
                                        checked={ayarlar.krediUyarisi}
                                        disabled={true} // Zorunlu
                                    />
                                    <div className="w-10 h-6 bg-stone-light/30 rounded-full peer peer-checked:bg-stone transition-colors"></div>
                                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                                        Kritik Uyarılar
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Fatura ve güvenlik bildirimleri zorunludur kapatılamaz.</p>
                                </div>
                            </label>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border-light/10">
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                className="w-full relative"
                            >
                                {saved ? "Tercihler Kaydedildi!" : "Tercihleri Kaydet"}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
