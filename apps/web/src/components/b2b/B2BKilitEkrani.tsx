import { Lock, ChevronRight, Star } from 'lucide-react'

export function B2BKilitEkrani({ onUpgrade }: { onUpgrade: () => void }) {
    return (
        <div className="relative min-h-screen">
            {/* Bulanık arka plan — sahte içerik */}
            <div className="p-6 max-w-4xl mx-auto space-y-6 filter blur-[6px] opacity-30 select-none pointer-events-none">
                <div className="h-16 bg-card rounded-2xl" />
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-40 bg-card rounded-2xl" />
                    <div className="h-40 bg-card rounded-2xl" />
                    <div className="h-40 bg-card rounded-2xl" />
                </div>
                <div className="h-64 bg-card rounded-2xl" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-48 bg-card rounded-2xl" />
                    <div className="h-48 bg-card rounded-2xl" />
                </div>
            </div>

            {/* Glassmorphism Kilit Overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-slate-950/70 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-amber-400" />
                    </div>
                    <h2 className="font-syne font-extrabold text-3xl text-slate-100 mb-3">
                        B2B Tedarik Ağı
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                        Türkiye'nin en büyük esnaf tedarik ağına katılın. Toptancılardan indirimli fiyatlarla malzeme alın, 
                        AI ile otomatik sipariş verin.
                    </p>

                    {/* Özellik listesi */}
                    <div className="bg-background/50 rounded-2xl p-4 mb-6 text-left space-y-3">
                        {[
                            'Sektörünüze özel toptancı eşleştirme',
                            'AI ile otomatik stok takibi ve sipariş',
                            'Gelen siparişler için Kanban takip panosu',
                            'Toptan fiyat karşılaştırma motoru',
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm">{f}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onUpgrade}
                        className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3.5 rounded-2xl
                                   font-syne font-bold text-base transition-all
                                   hover:from-amber-500 hover:to-amber-400
                                   shadow-lg shadow-amber-600/25
                                   flex items-center justify-center gap-2 mx-auto"
                    >
                        Ağımıza Katılın → Paketi Yükselt
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-muted-foreground text-xs mt-3">Büyüme paketi ve üstü için geçerlidir</p>
                </div>
            </div>
        </div>
    )
}
