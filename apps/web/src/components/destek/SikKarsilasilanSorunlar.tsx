'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { sorunBul } from '@/data/sorunGidermeVerileri'
import SorunGidermeKart from '@/components/destek/SorunGidermeKart'

interface SikKarsilasilanSorunlarProps {
  sorunIdleri: string[]
  baslik?: string
}

export default function SikKarsilasilanSorunlar({
  sorunIdleri,
  baslik = 'Sık Karşılaşılan Sorunlar',
}: SikKarsilasilanSorunlarProps) {
  const sorunlar = sorunIdleri
    .map((id) => sorunBul(id))
    .filter(Boolean)

  if (sorunlar.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold font-syne text-foreground">{baslik}</h2>
      </div>
      <div className="space-y-3">
        {sorunlar.map((sorun) => sorun && (
          <SorunGidermeKart key={sorun.id} sorun={sorun} />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Daha fazla sorun ve çözüm için{' '}
        <Link href="/destek/sorun-giderme" className="text-primary hover:underline">
          Sorun Giderme Merkezi
        </Link>
        &apos;ni ziyaret edin.
      </p>
    </section>
  )
}
