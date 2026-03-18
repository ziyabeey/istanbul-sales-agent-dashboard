'use client'

import React from 'react'
import { DashboardGridCard } from './components/DashboardGridCard'
import { StatsCard } from './components/StatsCard'
import { PACKAGES } from '@kepenk/config/packages'
import { useEsnaf } from '@/context/EsnafContext'
import {
  Eye, MessageCircle, Package, TrendingUp,
  Pencil, Bot, Globe, Sparkles, Target, BarChart3,
} from 'lucide-react'

export default function DashboardHomePage() {
  const { esnaf } = useEsnaf()

  const packageId = (esnaf?.paket?.toLowerCase() || 'temel') as keyof typeof PACKAGES
  const pkg = PACKAGES[packageId] || PACKAGES['temel']

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Aylık Site Ziyareti"
          value={esnaf?.istatistikler?.siteZiyaret?.toLocaleString() || '—'}
          icon={Eye}
          variant="default"
        />
        <StatsCard
          title="WA Gelen Mesaj"
          value={esnaf?.istatistikler?.waMesaj?.toString() || '—'}
          icon={MessageCircle}
          variant="default"
        />
        <StatsCard
          title="Aktif Ürünler"
          value={esnaf?.istatistikler?.aktifUrun?.toString() || '—'}
          icon={Package}
          variant="highlight"
        />
        <StatsCard
          title="Google Tıklaması"
          value={esnaf?.istatistikler?.googleTiklama?.toString() || '—'}
          icon={TrendingUp}
          variant="default"
        />
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-syne font-extrabold text-[var(--kp-text)] drop-shadow-md">
            Yönetim Paneli
          </h2>
          <p className="text-[var(--kp-text-secondary)] text-sm font-medium mt-1">
            Tüm dijital varlıklarınızı tek ekrandan yönetin.
          </p>
        </div>
      </div>

      {/* Feature Grid based on Package Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardGridCard
          title="Website Editörü"
          description="Sitenizin menüsünü, fotoğraflarını ve yazılarını güncelleyin."
          icon={Pencil}
          href="/dashboard/editor"
        />

        <DashboardGridCard
          title="WhatsApp Botu"
          description="Asistanınızın konuşma tarzını ve menüsünü eğitin."
          icon={Bot}
          href="/dashboard/whatsapp"
        />

        <DashboardGridCard
          title="Domain (Alan Adı)"
          description="Sitenize özel .com veya .com.tr alan adınızı bağlayın."
          icon={Globe}
          href="/dashboard/domain"
          locked={!pkg.limits.hasPremiumDomain}
          lockMessage="Büyüme paketi ve üzerinde aktiftir."
        />

        <DashboardGridCard
          title="AI Section Editör"
          description="Yapay zekaya sitenizin tasarımını bölgesel olarak değiştirtin."
          icon={Sparkles}
          href="/dashboard/editor/ai"
          locked={!pkg.limits.hasAiEditor}
          lockMessage="Büyüme paketi ve üzerinde aktiftir."
        />

        <DashboardGridCard
          title="Otonom Reklamlar"
          description="Facebook ve Google reklamlarınızı yapay zeka yönetsin."
          icon={Target}
          href="/dashboard/reklamlar"
          locked={packageId !== 'lider'}
          lockMessage="Lider paketi gerektirir."
        />

        <DashboardGridCard
          title="Detaylı SEO Raporu"
          description="Google aramalarındaki sıranızı ve analizleri görün."
          icon={BarChart3}
          href="/dashboard/raporlar"
          locked={!pkg.limits.advancedSeo}
          lockMessage="Gelişmiş paketlerde aktiftir."
        />
      </div>
    </div>
  )
}
