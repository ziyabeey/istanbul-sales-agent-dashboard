'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
  icon: LucideIcon
  variant?: 'default' | 'highlight' | 'ai'
  loading?: boolean
  onClick?: () => void
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
  loading = false,
  onClick,
}: StatsCardProps) {
  const iconContainerClass =
    variant === 'ai'
      ? 'bg-[var(--kp-ai-subtle)] text-[var(--kp-ai)]'
      : variant === 'highlight'
        ? 'bg-[var(--kp-rust-subtle)] text-[var(--kp-rust)]'
        : 'bg-white/5 text-[var(--kp-text-secondary)]'

  const changeIcon =
    change?.direction === 'up' ? TrendingUp :
    change?.direction === 'down' ? TrendingDown : Minus

  const changeColor =
    change?.direction === 'up' ? 'text-[var(--kp-success)]' :
    change?.direction === 'down' ? 'text-[var(--kp-error)]' :
    'text-[var(--kp-text-muted)]'

  if (loading) {
    return (
      <div className="bg-[var(--kp-surface)] border border-[var(--kp-border-subtle)] rounded-xl p-5">
        <div className="animate-pulse space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white/5" />
          <div className="h-7 w-20 bg-white/5 rounded" />
          <div className="h-3 w-24 bg-white/5 rounded" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`bg-[var(--kp-surface)] border border-[var(--kp-border-subtle)] rounded-xl p-5
        hover:border-[var(--kp-border)] transition-colors duration-200
        ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconContainerClass}`}>
          <Icon className="w-5 h-5" />
        </span>
        {change && (
          <span className={`text-xs font-semibold flex items-center gap-1 ${changeColor}`}>
            {React.createElement(changeIcon, { className: 'w-3 h-3' })}
            {change.direction === 'up' ? '+' : change.direction === 'down' ? '' : ''}
            {change.value}%
          </span>
        )}
      </div>

      <p className="text-2xl font-bold font-syne text-[var(--kp-text)] mt-1">
        {value}
      </p>
      <p className="text-[var(--kp-text-secondary)] text-xs font-medium uppercase tracking-wide mt-1">
        {title}
      </p>
    </motion.div>
  )
}
