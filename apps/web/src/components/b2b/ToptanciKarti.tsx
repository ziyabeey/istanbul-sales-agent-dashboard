import { Package, Star, MapPin, ShoppingCart } from 'lucide-react'

export interface Toptanci {
    esnafId: string
    isletmeAdi: string
    sektor: string
    ilce: string
    urunSayisi: number
    eslesmePuani: number
}

interface Props {
    toptanci: Toptanci
    onKatalogClick: () => void
}

export function ToptanciKarti({ toptanci, onKatalogClick }: Props) {
    return (
        <div className="bg-background border border-border/50 rounded-xl p-4 hover:border-amber-500/30 transition-all group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-foreground font-syne font-bold text-sm group-hover:text-amber-400 transition-colors">
                        {toptanci.isletmeAdi}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">{toptanci.sektor}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-400 text-xs font-bold">{toptanci.eslesmePuani}</span>
                </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {toptanci.ilce || 'İstanbul'}
                </span>
                <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" /> {toptanci.urunSayisi} ürün
                </span>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onKatalogClick()
                }}
                className="mt-3 w-full bg-amber-600/10 text-amber-400 border border-amber-500/20 py-2 rounded-lg text-xs font-semibold hover:bg-amber-600/20 transition-all flex items-center justify-center gap-1.5"
            >
                <ShoppingCart className="w-3.5 h-3.5" />
                Ürünlere Göz At
            </button>
        </div>
    )
}
