'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Copy, ArrowRight } from 'lucide-react'
import { useState, Suspense } from 'react'

function OlusturulduIcerik() {
  const searchParams = useSearchParams()
  const referans = searchParams.get('referans') || 'KPNK-????'
  const [kopyalandi, setKopyalandi] = useState(false)

  const kopyala = () => {
    navigator.clipboard.writeText(referans)
    setKopyalandi(true)
    setTimeout(() => setKopyalandi(false), 2000)
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold font-syne text-foreground mb-2">Talebiniz Oluşturuldu</h1>
        <p className="text-muted-foreground mb-6">
          Destek ekibimiz en kısa sürede talebinizi inceleyecek ve size dönüş yapacaktır.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Referans Numaranız</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold font-mono text-foreground">{referans}</span>
            <button
              onClick={kopyala}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              title="Kopyala"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {kopyalandi && <p className="text-xs text-emerald-600 mt-1">Kopyalandı!</p>}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Bu numarayı saklayın. Talebinizin durumunu takip etmek için kullanabilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/destek/talep/takip"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Talep Takip <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/destek"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Destek Merkezine Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function TalepOlusturulduSayfasi() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Yükleniyor...</div>}>
      <OlusturulduIcerik />
    </Suspense>
  )
}
