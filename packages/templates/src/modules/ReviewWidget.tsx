/**
 * @kepenk/templates — Sync Module: Review Widget (Yorumlar)
 *
 * All sectors. Google Reviews integration.
 * Preview mode: Static demo reviews.
 */

'use client'

export interface ReviewWidgetProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  reviews?: { name: string; text: string; rating: number; date: string; source?: string }[]
  overallRating?: number
  reviewCount?: number
}

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'text-lg' : 'text-sm'
  return (
    <div className={`flex gap-0.5 ${cls}`}>
      {[1, 2, 3, 4, 5].map(n => <span key={n} className={n <= rating ? 'text-yellow-400' : 'text-foreground-secondary/20'}>★</span>)}
    </div>
  )
}

export function ReviewWidget({ esnafId, mode, plan, reviews = [], overallRating, reviewCount }: ReviewWidgetProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">⭐ Müşteri Yorumları</h3>
        {overallRating && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">{overallRating}</span>
            <div>
              <Stars rating={Math.round(overallRating)} />
              {reviewCount && <p className="text-xs text-foreground-secondary">{reviewCount} yorum</p>}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {reviews.slice(0, plan === 'free' ? 3 : plan === 'starter' ? 4 : 6).map((r, i) => (
          <div key={i} className="bg-bg rounded-xl p-4 border border-border-subtle">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{r.name[0]}</div>
                <span className="font-medium text-foreground text-sm">{r.name}</span>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="text-sm text-foreground-secondary leading-relaxed">{r.text}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-foreground-secondary">
              <span>{r.date}</span>
              {r.source && <><span>·</span><span>{r.source}</span></>}
            </div>
          </div>
        ))}
      </div>
      {reviews.length === 0 && <p className="text-center text-foreground-secondary text-sm py-8">Henüz değerlendirme yok.</p>}
    </div>
  )
}
