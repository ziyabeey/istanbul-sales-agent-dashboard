'use client'

import React from 'react'
import Link from 'next/link'
import { Lock, ArrowRight, type LucideIcon } from 'lucide-react'

interface DashboardGridCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  locked?: boolean
  lockMessage?: string
  ctaText?: string
}

export function DashboardGridCard({
  title,
  description,
  icon: Icon,
  href,
  locked = false,
  lockMessage = 'Bu özellik paketinizde bulunmuyor.',
  ctaText = 'Yönet',
}: DashboardGridCardProps) {
  return (
    <div
      className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
        locked
          ? 'bg-[var(--kp-surface)]/50 border-[var(--kp-border-subtle)] grayscale pointer-events-none opacity-50'
          : 'bg-[var(--kp-surface)] border-[var(--kp-border-subtle)] hover:bg-[var(--kp-surface-hover)] hover:border-[var(--kp-border-focus)]/30 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(200,75,49,0.15)] group'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--kp-rust-subtle)] text-[var(--kp-rust)] group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </span>
        {locked && (
          <span className="text-[10px] font-bold text-[var(--kp-text-muted)] bg-black/30 border border-[var(--kp-border-subtle)] px-2.5 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" /> KİLİTLİ
          </span>
        )}
      </div>

      <h3 className="text-lg font-syne font-bold text-[var(--kp-text)] mb-2 group-hover:text-[var(--kp-rust)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[var(--kp-text-secondary)] mb-6 flex-1 font-medium group-hover:text-[var(--kp-text)] transition-colors">
        {description}
      </p>

      {locked ? (
        <div className="text-[11px] font-semibold text-[var(--kp-text-muted)] mt-auto flex items-center gap-1.5 bg-black/15 p-2.5 rounded-lg border border-[var(--kp-border-subtle)]">
          <Lock className="w-3 h-3 shrink-0" /> {lockMessage}
          <Link
            href="/dashboard/paket-yukselt"
            className="text-[var(--kp-rust)] hover:text-[var(--kp-rust-hover)] hover:underline ml-auto font-bold px-2 py-1 bg-white/5 rounded transition-colors pointer-events-auto"
          >
            Yükselt
          </Link>
        </div>
      ) : (
        <Link
          href={href}
          className="text-sm font-bold text-[var(--kp-rust)] hover:text-[var(--kp-rust-hover)] transition-colors mt-auto inline-flex items-center gap-1.5 group/btn"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
      )}
    </div>
  )
}
