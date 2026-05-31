/**
 * @kepenk/templates — Sync Module: Blog Preview
 *
 * Dashboard blog editörü bağlantılı.
 * Preview mode: Static demo posts.
 */

'use client'

export interface BlogPreviewModuleProps {
  esnafId: string
  mode: 'live' | 'preview' | 'editor'
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise'
  posts?: { title: string; excerpt: string; image?: string; date: string; slug: string; category?: string }[]
  siteUrl?: string
}

export function BlogPreviewModule({ esnafId, mode, plan, posts = [], siteUrl }: BlogPreviewModuleProps) {
  const visiblePosts = posts.slice(0, plan === 'free' ? 2 : plan === 'starter' ? 3 : 4)
  const cols = plan === 'free' ? 'grid-cols-1' : plan === 'starter' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="space-y-6">
      <div className={`grid ${cols} gap-6`}>
        {visiblePosts.map((p, i) => (
          <article key={i} className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/20 transition-all">
            {p.image && (
              <div className="aspect-[16/9] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            )}
            <div className="p-5">
              {p.category && <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full mb-2">{p.category}</span>}
              <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground-secondary leading-relaxed line-clamp-2">{p.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-foreground-secondary">{p.date}</span>
                <span className="text-xs font-semibold text-accent group-hover:underline">Devamını Oku →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {posts.length === 0 && <p className="text-center text-foreground-secondary text-sm py-8">Henüz blog yazısı yok.</p>}
    </div>
  )
}
