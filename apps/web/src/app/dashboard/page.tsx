'use client'

import React from 'react'
import { DashboardGridCard } from './components/DashboardGridCard'
import { StatsCard } from './components/StatsCard'
import { PACKAGES } from '@kepenk/config/packages'
import { useEsnaf } from '@/context/EsnafContext'
import { isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'
import {
  Eye, MessageCircle, Package, TrendingUp,
  Pencil, Bot, Globe, Sparkles, Target, BarChart3, Users, CalendarDays, FlaskConical,
} from 'lucide-react'

export default function DashboardHomePage() {
  const { esnaf } = useEsnaf()
  const isMvpTestRelease = isMvpTestReleaseEnabled()
  const isDemoDashboard = isMvpTestRelease || Boolean(esnaf?.isDemo)

  const packageId = (esnaf?.paket?.toLowerCase() || 'temel') as keyof typeof PACKAGES
  const pkg = PACKAGES[packageId] || PACKAGES['temel']
  const businessName = esnaf?.isletmeAdi || esnaf?.ad || 'Moda Usta Berber'
  const todayAppointments = Array.isArray(esnaf?.appointments)
    ? esnaf.appointments.length
    : esnaf?.istatistikler?.bugunRandevu || 0
  const activeConversations = Array.isArray(esnaf?.conversations) ? esnaf.conversations.length : 0
  const registeredCustomers = Array.isArray(esnaf?.customers)
    ? esnaf.customers.length
    : esnaf?.istatistikler?.aktifMusteri || 0
  const monthlyRevenue = esnaf?.istatistikler?.aylikCiro
  const monthlyRevenueLabel = typeof monthlyRevenue === 'number'
    ? `${monthlyRevenue.toLocaleString('tr-TR')} ₺`
    : '—'
  const aiSuggestionCount = Array.isArray(esnaf?.aiSuggestions) ? esnaf.aiSuggestions.length : 0
  const todaysStory = [
    'Can Bey 18:30 için sakal traşı sordu.',
    'AI uygun saati önerdi.',
    'Randevu takvime işlendi.',
    'Müşteri kaydı güncellendi.',
  ]

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">

      {/* Top Stats Row */}
      <div className={`grid grid-cols-2 gap-4 mb-8 ${isDemoDashboard ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
        {isDemoDashboard ? (
          <>
            <StatsCard
              title="Bugünkü Randevu"
              value={todayAppointments}
              icon={CalendarDays}
              variant="highlight"
            />
            <StatsCard
              title="Aktif Konuşma"
              value={activeConversations}
              icon={MessageCircle}
              variant="default"
            />
            <StatsCard
              title="Kayıtlı Müşteri"
              value={registeredCustomers}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title="Aylık Ciro"
              value={monthlyRevenueLabel}
              icon={TrendingUp}
              variant="default"
            />
            <StatsCard
              title="AI Cevap Önerisi"
              value={aiSuggestionCount}
              icon={Sparkles}
              variant="ai"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-syne font-extrabold text-[var(--kp-text)] drop-shadow-md">
            {isDemoDashboard ? `${businessName} Kokpiti` : 'Yönetim Paneli'}
          </h2>
          <p className="text-[var(--kp-text-secondary)] text-sm font-medium mt-1">
            {isDemoDashboard
              ? 'Mesajdan randevuya, müşteriden hazır web sitesine kadar bugünkü işletme akışını izleyin.'
              : 'Tüm dijital varlıklarınızı tek ekrandan yönetin.'}
          </p>
        </div>
      </div>

      {isDemoDashboard ? (
        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--kp-border-subtle)] bg-[var(--kp-surface)] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--kp-rust)]">Bugünün Hikayesi</p>
                <h3 className="mt-1 text-lg font-syne font-extrabold text-[var(--kp-text)]">
                  Bir müşteri mesajı randevuya dönüştü
                </h3>
              </div>
              <span className="w-fit rounded-full border border-[var(--kp-border-subtle)] bg-black/15 px-3 py-1 text-xs font-bold text-[var(--kp-text-secondary)]">
                Read-only demo akışı
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {todaysStory.map((step, index) => (
                <div key={step} className="rounded-xl border border-[var(--kp-border-subtle)] bg-black/10 p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--kp-rust-subtle)] text-sm font-black text-[var(--kp-rust)]">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold leading-6 text-[var(--kp-text)]">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardGridCard
              title="Mesajları yönet"
              description="Müşteri sorularını tek ekranda gör, AI önerisiyle hızlı cevapla."
              icon={MessageCircle}
              href="/dashboard/konusmalar"
            />

            <DashboardGridCard
              title="Müşterileri takip et"
              description="Sadık, yeni ve uyuyan müşterileri ayır; kime ne teklif edeceğini gör."
              icon={Users}
              href="/dashboard/musteriler"
            />

            <DashboardGridCard
              title="Bugünkü takvimi gör"
              description="Konuşmalardan oluşan randevuları ve saatlerini takip et."
              icon={CalendarDays}
              href="/dashboard/randevular"
            />

            <DashboardGridCard
              title="Hazır siteni incele"
              description="Hizmetlerin, yorumların ve randevu çağrın tek vitrinde."
              icon={Globe}
              href="/dashboard/sitem"
            />

            <DashboardGridCard
              title="Demo sağlığını kontrol et"
              description="Demo verileri ve güvenli route kontrollerini izle."
              icon={FlaskConical}
              href="/test-demo/status"
            />
          </div>
        </div>
      ) : (
        /* Feature Grid based on Package Limits */
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
      )}
    </div>
  )
}
