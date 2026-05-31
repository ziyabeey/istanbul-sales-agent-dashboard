/**
 * sectionHtmlGenerators.ts
 *
 * Vanilla HTML section generators for the site editor.
 * Each function produces self-contained HTML that renders inside the editor iframe.
 *
 * Source of truth: packages/templates/src/types/section-variants.ts
 * CSS convention: uses --color-* tokens (aliased from --renk-* and --bg/--text/--accent)
 */

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export interface SectionCtx {
  business: {
    name: string
    phone: string
    phoneClean: string
    address: string
    slogan?: string
    email?: string
  }
  colors: {
    bg: string
    text: string
    accent: string
    card?: string
    sub?: string
    border?: string
  }
  fonts: { heading: string; body: string }
  dark: boolean
  content: Record<string, unknown>
  variant: string
}

type Generator = (ctx: SectionCtx) => string

// ═══════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════

function esc(s: unknown): string {
  if (!s) return ''
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function waLink(phone: string, msg = ''): string {
  const clean = phone.replace(/\D/g, '')
  const num = clean.startsWith('0') ? `90${clean.slice(1)}` : clean.startsWith('90') ? clean : `90${clean}`
  return `https://wa.me/${num}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
}

function telLink(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  return `tel:+90${clean.startsWith('0') ? clean.slice(1) : clean}`
}

const sectionWrap = (id: string, inner: string, style = '') =>
  `<section id="${id}" style="padding:var(--section-py, 80px) 24px;${style}">\n<div style="max-width:var(--container-default, 1200px);margin:0 auto;">\n${inner}\n</div>\n</section>`

const sectionTitle = (title: string, subtitle?: string, align = 'center') => `
  <div style="text-align:${align};margin-bottom:48px;">
    <h2 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,2.8rem);color:var(--color-text);margin-bottom:12px;">${esc(title)}</h2>
    ${subtitle ? `<p style="font-size:1.1rem;color:var(--color-text-secondary);max-width:640px;${align === 'center' ? 'margin:0 auto;' : ''}">${esc(subtitle)}</p>` : ''}
  </div>`

// ═══════════════════════════════════════════
// 01. HERO (11 variants)
// ═══════════════════════════════════════════

function heroFullscreenOverlay(ctx: SectionCtx): string {
  const { title, subtitle, cta1, cta2, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:url('${esc(backgroundImage)}') center/cover no-repeat;">
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.55);"></div>
  <div style="position:relative;z-index:2;max-width:800px;padding:40px 24px;">
    ${badge ? `<span style="display:inline-block;padding:6px 16px;background:var(--color-accent);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:20px;letter-spacing:0.05em;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2.5rem,6vw,4.5rem);color:#fff;line-height:1.08;margin-bottom:20px;">${esc(title)}</h1>
    ${subtitle ? `<p style="font-size:clamp(1rem,2vw,1.3rem);color:rgba(255,255,255,0.85);margin-bottom:32px;max-width:600px;margin-left:auto;margin-right:auto;">${esc(subtitle)}</p>` : ''}
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      ${cta1 ? `<a href="${esc(cta1.href)}" style="padding:14px 36px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:1rem;">${esc(cta1.text)}</a>` : ''}
      ${cta2 ? `<a href="${esc(cta2.href)}" style="padding:14px 36px;border:2px solid #fff;color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:1rem;">${esc(cta2.text)}</a>` : ''}
    </div>
  </div>
</section>`
}

function heroSplitLeft(ctx: SectionCtx): string {
  const { title, subtitle, cta1, cta2, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="display:grid;grid-template-columns:1fr 1fr;min-height:85vh;overflow:hidden;">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px;max-width:640px;margin-left:auto;">
    ${badge ? `<span style="display:inline-block;padding:6px 16px;background:var(--color-accent);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:20px;width:fit-content;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2.2rem,4vw,3.5rem);color:var(--color-text);line-height:1.1;margin-bottom:16px;">${esc(title)}</h1>
    ${subtitle ? `<p style="font-size:1.15rem;color:var(--color-text-secondary);margin-bottom:32px;line-height:1.6;">${esc(subtitle)}</p>` : ''}
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      ${cta1 ? `<a href="${esc(cta1.href)}" style="padding:14px 32px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
      ${cta2 ? `<a href="${esc(cta2.href)}" style="padding:14px 32px;border:2px solid var(--color-border,#e5e7eb);color:var(--color-text);border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta2.text)}</a>` : ''}
    </div>
  </div>
  <div style="background:url('${esc(backgroundImage)}') center/cover no-repeat;min-height:400px;"></div>
</section>`
}

function heroVideoCinematic(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundVideo, badge } = ctx.content as Record<string, any>
  const videoUrl = backgroundVideo?.url || ''
  return `<section id="hero" style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:#000;">
  ${videoUrl ? `<video autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.5;"><source src="${esc(videoUrl)}" type="video/mp4"></video>` : '<div style="position:absolute;inset:0;background:linear-gradient(135deg,#1a1a2e,#16213e);"></div>'}
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);"></div>
  <div style="position:relative;z-index:2;max-width:800px;padding:40px 24px;">
    ${badge ? `<span style="display:inline-block;padding:6px 16px;border:1px solid rgba(255,255,255,0.3);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:20px;backdrop-filter:blur(4px);">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2.5rem,6vw,5rem);color:#fff;line-height:1.05;margin-bottom:20px;">${esc(title)}</h1>
    ${subtitle ? `<p style="font-size:1.2rem;color:rgba(255,255,255,0.8);margin-bottom:36px;">${esc(subtitle)}</p>` : ''}
    ${cta1 ? `<a href="${esc(cta1.href)}" style="padding:16px 40px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:1.1rem;">${esc(cta1.text)}</a>` : ''}
  </div>
</section>`
}

function heroFullscreenKenburns(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;">
  <div style="position:absolute;inset:-10%;width:120%;height:120%;background:url('${esc(backgroundImage)}') center/cover;animation:kenburns 20s ease infinite alternate;"></div>
  <style>@keyframes kenburns{0%{transform:scale(1)}100%{transform:scale(1.1)}}</style>
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>
  <div style="position:relative;z-index:2;max-width:700px;padding:40px 24px;">
    ${badge ? `<span style="display:inline-block;padding:8px 20px;border:1px solid rgba(255,255,255,0.4);color:#fff;border-radius:0;font-size:0.8rem;margin-bottom:24px;letter-spacing:0.15em;text-transform:uppercase;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,4rem);color:#fff;line-height:1.1;margin-bottom:20px;letter-spacing:-0.02em;">${esc(title)}</h1>
    ${subtitle ? `<p style="font-size:1.1rem;color:rgba(255,255,255,0.75);margin-bottom:36px;font-style:italic;">${esc(subtitle)}</p>` : ''}
    ${cta1 ? `<a href="${esc(cta1.href)}" style="padding:14px 36px;background:transparent;border:2px solid #fff;color:#fff;border-radius:0;font-weight:600;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;font-size:0.9rem;">${esc(cta1.text)}</a>` : ''}
  </div>
</section>`
}

function heroSearchCentric(ctx: SectionCtx): string {
  const { title, subtitle, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;background:var(--color-bg);">
  ${badge ? `<span style="display:inline-block;padding:6px 16px;background:var(--color-accent);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:20px;">${esc(badge)}</span>` : ''}
  <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,5vw,3.5rem);color:var(--color-text);margin-bottom:16px;">${esc(title)}</h1>
  ${subtitle ? `<p style="font-size:1.1rem;color:var(--color-text-secondary);margin-bottom:32px;">${esc(subtitle)}</p>` : ''}
  <div style="display:flex;gap:8px;max-width:600px;width:100%;">
    <input type="text" placeholder="Arama yapın..." style="flex:1;padding:14px 20px;border:2px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);font-size:1rem;outline:none;background:var(--color-surface,#fff);">
    <button style="padding:14px 28px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;">Ara</button>
  </div>
</section>`
}

function heroFullscreenSingle(ctx: SectionCtx): string {
  const { title, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;height:100vh;overflow:hidden;">
  <div style="position:absolute;inset:0;background:url('${esc(backgroundImage)}') center/cover;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;padding:60px 48px;background:linear-gradient(transparent,rgba(0,0,0,0.7));">
    <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;">${esc(title)}</h1>
  </div>
</section>`
}

function heroFullscreenSlider(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:url('${esc(backgroundImage)}') center/cover;">
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45);"></div>
  <div style="position:relative;z-index:2;max-width:700px;padding:40px 24px;">
    <h1 style="font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,4rem);color:#fff;margin-bottom:16px;">${esc(title)}</h1>
    ${subtitle ? `<p style="font-size:1.1rem;color:rgba(255,255,255,0.8);margin-bottom:32px;">${esc(subtitle)}</p>` : ''}
    ${cta1 ? `<a href="${esc(cta1.href)}" style="padding:14px 36px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
  </div>
  <div style="position:absolute;bottom:24px;display:flex;gap:8px;z-index:2;">
    <span style="width:32px;height:4px;background:#fff;border-radius:2px;"></span>
    <span style="width:32px;height:4px;background:rgba(255,255,255,0.4);border-radius:2px;"></span>
    <span style="width:32px;height:4px;background:rgba(255,255,255,0.4);border-radius:2px;"></span>
  </div>
</section>`
}

function heroImageCard(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh;overflow:hidden;background:var(--color-bg);">
  <div style="display:flex;align-items:center;padding:60px 48px;">
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:48px;max-width:500px;">
      ${badge ? `<span style="display:inline-block;padding:4px 12px;background:var(--color-accent);color:#fff;border-radius:4px;font-size:0.8rem;margin-bottom:16px;">${esc(badge)}</span>` : ''}
      <h1 style="font-family:var(--font-heading);font-size:clamp(1.8rem,3vw,2.5rem);color:var(--color-text);margin-bottom:12px;">${esc(title)}</h1>
      ${subtitle ? `<p style="color:var(--color-text-secondary);margin-bottom:24px;line-height:1.6;">${esc(subtitle)}</p>` : ''}
      ${cta1 ? `<a href="${esc(cta1.href)}" style="display:inline-block;padding:12px 28px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
    </div>
  </div>
  <div style="background:url('${esc(backgroundImage)}') center/cover;min-height:400px;"></div>
</section>`
}

function heroPromoCarousel(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;min-height:70vh;display:flex;align-items:center;overflow:hidden;background:var(--color-accent);">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:60px 24px;align-items:center;">
    <div>
      <span style="display:inline-block;padding:6px 14px;background:rgba(255,255,255,0.2);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:16px;">Kampanya</span>
      <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:12px;">${esc(title)}</h1>
      ${subtitle ? `<p style="color:rgba(255,255,255,0.85);font-size:1.1rem;margin-bottom:24px;">${esc(subtitle)}</p>` : ''}
      ${cta1 ? `<a href="${esc(cta1.href)}" style="display:inline-block;padding:14px 32px;background:#fff;color:var(--color-accent);border-radius:var(--radius-md,8px);font-weight:700;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
    </div>
    ${backgroundImage ? `<div style="text-align:center;"><img src="${esc(backgroundImage)}" alt="" style="max-width:100%;max-height:400px;border-radius:var(--radius-lg,12px);"></div>` : ''}
  </div>
</section>`
}

function heroWarmImage(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="position:relative;min-height:80vh;display:flex;align-items:flex-end;overflow:hidden;background:url('${esc(backgroundImage)}') center/cover;">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%);"></div>
  <div style="position:relative;z-index:2;padding:60px 48px;max-width:700px;">
    ${badge ? `<span style="display:inline-block;padding:6px 14px;background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:16px;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,5vw,3.5rem);color:#fff;margin-bottom:12px;">${esc(title)}</h1>
    ${subtitle ? `<p style="color:rgba(255,255,255,0.85);font-size:1.1rem;margin-bottom:24px;">${esc(subtitle)}</p>` : ''}
    ${cta1 ? `<a href="${esc(cta1.href)}" style="display:inline-block;padding:14px 32px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
  </div>
</section>`
}

function heroSoftCarousel(ctx: SectionCtx): string {
  const { title, subtitle, cta1, backgroundImage, badge } = ctx.content as Record<string, any>
  return `<section id="hero" style="min-height:80vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px;padding:60px 48px;background:var(--color-surface,#faf8f5);">
  <div>
    ${badge ? `<span style="display:inline-block;padding:6px 16px;background:var(--color-accent);color:#fff;border-radius:20px;font-size:0.85rem;margin-bottom:16px;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin-bottom:12px;">${esc(title)}</h1>
    ${subtitle ? `<p style="color:var(--color-text-secondary);font-size:1.05rem;margin-bottom:28px;line-height:1.7;">${esc(subtitle)}</p>` : ''}
    ${cta1 ? `<a href="${esc(cta1.href)}" style="display:inline-block;padding:14px 32px;background:var(--color-accent);color:#fff;border-radius:99px;font-weight:600;text-decoration:none;">${esc(cta1.text)}</a>` : ''}
  </div>
  ${backgroundImage ? `<div style="border-radius:var(--radius-xl,24px);overflow:hidden;aspect-ratio:4/3;"><img src="${esc(backgroundImage)}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>` : '<div></div>'}
</section>`
}

// ═══════════════════════════════════════════
// 02. SERVICES (7 variants)
// ═══════════════════════════════════════════

function servicesCardGrid(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map(s => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:32px;text-align:center;">
      ${s.icon ? `<div style="font-size:2rem;margin-bottom:12px;">${s.icon}</div>` : ''}
      <h3 style="font-family:var(--font-heading);font-size:1.1rem;color:var(--color-text);margin-bottom:8px;">${esc(s.name)}</h3>
      ${s.description ? `<p style="font-size:0.9rem;color:var(--color-text-secondary);line-height:1.5;">${esc(s.description)}</p>` : ''}
      ${s.price ? `<p style="font-weight:700;color:var(--color-accent);margin-top:12px;">${esc(s.price)}</p>` : ''}
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;">${items}</div>`)
}

function servicesFilteredTabs(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map(s => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-md,8px);padding:24px;border-left:4px solid var(--color-accent);">
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:6px;">${esc(s.name)}</h3>
      ${s.description ? `<p style="font-size:0.9rem;color:var(--color-text-secondary);">${esc(s.description)}</p>` : ''}
      ${s.price ? `<span style="display:inline-block;margin-top:8px;font-weight:700;color:var(--color-accent);">${esc(s.price)}</span>` : ''}
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">${items}</div>`)
}

function servicesHoverReveal(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-bottom:1px solid var(--color-border,#e5e7eb);cursor:pointer;">
      <div>
        <h3 style="font-family:var(--font-heading);font-size:1.2rem;color:var(--color-text);">${esc(s.name)}</h3>
        ${s.description ? `<p style="font-size:0.9rem;color:var(--color-text-secondary);margin-top:4px;">${esc(s.description)}</p>` : ''}
      </div>
      ${s.price ? `<span style="font-weight:700;color:var(--color-accent);font-size:1.1rem;white-space:nowrap;margin-left:24px;">${esc(s.price)}</span>` : ''}
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle, 'left')}<div>${items}</div>`)
}

function servicesPricingAccordion(ctx: SectionCtx): string {
  const uid = `spa-${Date.now()}`
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map((s, i) => `
    <div style="border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);overflow:hidden;margin-bottom:8px;">
      <button onclick="var p=this.nextElementSibling;p.style.display=p.style.display==='none'?'block':'none'" style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:var(--color-surface,#f8f8f8);border:none;cursor:pointer;font-family:var(--font-heading);font-size:1rem;color:var(--color-text);">
        <span>${esc(s.name)}</span>
        ${s.price ? `<span style="color:var(--color-accent);font-weight:700;">${esc(s.price)}</span>` : '<span>&#9660;</span>'}
      </button>
      <div style="display:none;padding:16px 20px;background:var(--color-bg);">
        ${s.description ? `<p style="color:var(--color-text-secondary);font-size:0.9rem;">${esc(s.description)}</p>` : ''}
        ${s.duration ? `<p style="margin-top:8px;font-size:0.85rem;color:var(--color-text-secondary);">Sure: ${esc(s.duration)}</p>` : ''}
      </div>
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle)}<div style="max-width:700px;margin:0 auto;">${items}</div>`)
}

function servicesVisualCards(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map(s => `
    <div style="border-radius:var(--radius-lg,12px);overflow:hidden;background:var(--color-surface,#f8f8f8);">
      ${s.image ? `<div style="height:200px;background:url('${esc(s.image)}') center/cover;"></div>` : ''}
      <div style="padding:24px;">
        <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(s.name)}</h3>
        ${s.description ? `<p style="font-size:0.9rem;color:var(--color-text-secondary);line-height:1.5;">${esc(s.description)}</p>` : ''}
        ${s.price ? `<p style="font-weight:700;color:var(--color-accent);margin-top:12px;">${esc(s.price)}</p>` : ''}
      </div>
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;">${items}</div>`)
}

function servicesStickyScroll(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map(s => `
    <div style="padding:32px 0;border-bottom:1px solid var(--color-border,#e5e7eb);">
      <h3 style="font-family:var(--font-heading);font-size:1.2rem;color:var(--color-text);margin-bottom:8px;">${esc(s.name)}</h3>
      ${s.description ? `<p style="font-size:0.95rem;color:var(--color-text-secondary);line-height:1.6;">${esc(s.description)}</p>` : ''}
      ${s.price ? `<p style="font-weight:700;color:var(--color-accent);margin-top:12px;">${esc(s.price)}</p>` : ''}
    </div>`).join('')
  return `<section id="hizmetler" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;">
    <div style="position:sticky;top:100px;height:fit-content;">
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,2.8rem);color:var(--color-text);margin-bottom:12px;">${esc(title || 'Hizmetlerimiz')}</h2>
      ${subtitle ? `<p style="color:var(--color-text-secondary);font-size:1.05rem;">${esc(subtitle)}</p>` : ''}
    </div>
    <div>${items}</div>
  </div>
</section>`
}

function servicesEditorialZigzag(ctx: SectionCtx): string {
  const { title, subtitle, services = [] } = ctx.content as Record<string, any>
  const items = (services as any[]).map((s, i) => `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:40px 0;${i > 0 ? 'border-top:1px solid var(--color-border,#e5e7eb);' : ''}${i % 2 !== 0 ? 'direction:rtl;' : ''}">
      <div style="direction:ltr;">
        <h3 style="font-family:var(--font-heading);font-size:1.3rem;color:var(--color-text);margin-bottom:8px;">${esc(s.name)}</h3>
        ${s.description ? `<p style="color:var(--color-text-secondary);line-height:1.6;">${esc(s.description)}</p>` : ''}
        ${s.price ? `<p style="font-weight:700;color:var(--color-accent);margin-top:12px;font-size:1.1rem;">${esc(s.price)}</p>` : ''}
      </div>
      ${s.image ? `<div style="direction:ltr;border-radius:var(--radius-lg,12px);overflow:hidden;aspect-ratio:4/3;background:url('${esc(s.image)}') center/cover;"></div>` : '<div></div>'}
    </div>`).join('')
  return sectionWrap('hizmetler', `${sectionTitle(title || 'Hizmetlerimiz', subtitle)}${items}`)
}

// ═══════════════════════════════════════════
// 03. ABOUT (4 variants)
// ═══════════════════════════════════════════

function aboutSplitLeft(ctx: SectionCtx): string {
  const { title, description, image, stats, signature } = ctx.content as Record<string, any>
  const statsHtml = (stats as any[])?.map(s => `
    <div style="text-align:center;">
      <div style="font-family:var(--font-heading);font-size:1.8rem;color:var(--color-accent);font-weight:700;">${esc(s.value)}</div>
      <div style="font-size:0.85rem;color:var(--color-text-secondary);margin-top:4px;">${esc(s.label)}</div>
    </div>`).join('') || ''
  return `<section id="hakkimizda" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
    <div>
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,2.5rem);color:var(--color-text);margin-bottom:16px;">${esc(title || 'Hakkımızda')}</h2>
      <p style="color:var(--color-text-secondary);line-height:1.7;font-size:1.05rem;">${esc(description)}</p>
      ${signature ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--color-border,#e5e7eb);"><strong style="color:var(--color-text);">${esc(signature.name)}</strong><br><span style="font-size:0.9rem;color:var(--color-text-secondary);">${esc(signature.role)}</span></div>` : ''}
      ${statsHtml ? `<div style="display:grid;grid-template-columns:repeat(${Math.min((stats as any[]).length, 4)},1fr);gap:16px;margin-top:32px;">${statsHtml}</div>` : ''}
    </div>
    ${image ? `<div style="border-radius:var(--radius-lg,12px);overflow:hidden;aspect-ratio:4/3;"><img src="${esc(image)}" alt="Hakkımızda" style="width:100%;height:100%;object-fit:cover;"></div>` : '<div></div>'}
  </div>
</section>`
}

function aboutSplitRight(ctx: SectionCtx): string {
  const { title, description, image, stats, signature } = ctx.content as Record<string, any>
  const statsHtml = (stats as any[])?.map(s => `
    <div style="text-align:center;"><div style="font-family:var(--font-heading);font-size:1.8rem;color:var(--color-accent);font-weight:700;">${esc(s.value)}</div><div style="font-size:0.85rem;color:var(--color-text-secondary);margin-top:4px;">${esc(s.label)}</div></div>`).join('') || ''
  return `<section id="hakkimizda" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
    ${image ? `<div style="border-radius:var(--radius-lg,12px);overflow:hidden;aspect-ratio:4/3;"><img src="${esc(image)}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>` : '<div></div>'}
    <div>
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,2.5rem);color:var(--color-text);margin-bottom:16px;">${esc(title || 'Hakkımızda')}</h2>
      <p style="color:var(--color-text-secondary);line-height:1.7;">${esc(description)}</p>
      ${signature ? `<div style="margin-top:24px;"><strong>${esc(signature.name)}</strong><br><span style="font-size:0.9rem;color:var(--color-text-secondary);">${esc(signature.role)}</span></div>` : ''}
      ${statsHtml ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:16px;margin-top:32px;">${statsHtml}</div>` : ''}
    </div>
  </div>
</section>`
}

function aboutFullStory(ctx: SectionCtx): string {
  const { title, description, image, stats } = ctx.content as Record<string, any>
  return sectionWrap('hakkimizda', `
    ${sectionTitle(title || 'Hikayemiz')}
    ${image ? `<div style="margin-bottom:40px;border-radius:var(--radius-lg,12px);overflow:hidden;max-height:500px;"><img src="${esc(image)}" alt="" style="width:100%;object-fit:cover;"></div>` : ''}
    <div style="max-width:800px;margin:0 auto;text-align:center;">
      <p style="color:var(--color-text-secondary);line-height:1.8;font-size:1.1rem;">${esc(description)}</p>
    </div>`)
}

function aboutValuesGrid(ctx: SectionCtx): string {
  const { title, subtitle, stats = [] } = ctx.content as Record<string, any>
  const items = (stats as any[]).map(s => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-md,8px);padding:28px;text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">${s.icon || '&#x2713;'}</div>
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(s.value || s.label)}</h3>
      ${s.label && s.value ? `<p style="font-size:0.9rem;color:var(--color-text-secondary);">${esc(s.label)}</p>` : ''}
    </div>`).join('')
  return sectionWrap('hakkimizda', `${sectionTitle(title || 'Değerlerimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 04. CONTACT (3 variants)
// ═══════════════════════════════════════════

function contactSimpleForm(ctx: SectionCtx): string {
  const { title, subtitle, submitText, successMessage } = ctx.content as Record<string, any>
  const waUrl = waLink(ctx.business.phone)
  return sectionWrap('iletisim', `
    ${sectionTitle(title || 'İletişim', subtitle)}
    <div style="max-width:560px;margin:0 auto;" id="cf-wrap">
      <input type="text" id="cf-ad" placeholder="Adınız Soyadınız" style="width:100%;padding:14px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;background:var(--color-surface,#fff);color:var(--color-text);">
      <input type="tel" id="cf-tel" placeholder="Telefon" style="width:100%;padding:14px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;background:var(--color-surface,#fff);color:var(--color-text);">
      <textarea id="cf-msg" rows="4" placeholder="Mesajınız" style="width:100%;padding:14px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);margin-bottom:16px;font-size:1rem;resize:vertical;background:var(--color-surface,#fff);color:var(--color-text);"></textarea>
      <button onclick="var a=document.getElementById('cf-ad').value,t=document.getElementById('cf-tel').value,m=document.getElementById('cf-msg').value;if(!a||!t){alert('Lütfen adınızı ve telefonunuzu giriniz');return;}window.open('${waUrl}?text='+encodeURIComponent('Ad: '+a+'\\nTel: '+t+'\\nMesaj: '+m),'_blank');document.getElementById('cf-ok').style.display='block'" style="width:100%;padding:14px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;font-size:1rem;cursor:pointer;">${esc(submitText || 'Gönder')}</button>
      <div id="cf-ok" style="display:none;margin-top:16px;padding:12px;background:var(--color-surface);border-radius:var(--radius-md,8px);text-align:center;color:var(--color-text);">${esc(successMessage || 'Mesajınız iletildi!')}</div>
    </div>`)
}

function contactSplitFormMap(ctx: SectionCtx): string {
  const { title, subtitle, submitText } = ctx.content as Record<string, any>
  const waUrl = waLink(ctx.business.phone)
  return `<section id="iletisim" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;">
    ${sectionTitle(title || 'İletişim', subtitle)}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
      <div>
        <input type="text" id="cf2-ad" placeholder="Adınız" style="width:100%;padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;">
        <input type="tel" id="cf2-tel" placeholder="Telefon" style="width:100%;padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;">
        <textarea id="cf2-msg" rows="4" placeholder="Mesajınız" style="width:100%;padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;resize:vertical;"></textarea>
        <button onclick="var a=document.getElementById('cf2-ad').value,t=document.getElementById('cf2-tel').value,m=document.getElementById('cf2-msg').value;window.open('${waUrl}?text='+encodeURIComponent('Ad: '+a+'\\nTel: '+t+'\\nMesaj: '+m),'_blank')" style="width:100%;padding:14px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;">${esc(submitText || 'Gönder')}</button>
      </div>
      <div style="border-radius:var(--radius-lg,12px);overflow:hidden;min-height:300px;background:var(--color-surface,#eee);">
        <div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);">
          <div style="text-align:center;">
            <div style="font-size:2rem;margin-bottom:8px;">&#x1F4CD;</div>
            <p>${esc(ctx.business.address)}</p>
            <p style="margin-top:8px;"><a href="${telLink(ctx.business.phone)}" style="color:var(--color-accent);text-decoration:none;">${esc(ctx.business.phone)}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
}

function contactFullWidth(ctx: SectionCtx): string {
  const { title, subtitle, submitText } = ctx.content as Record<string, any>
  const waUrl = waLink(ctx.business.phone)
  return `<section id="iletisim" style="padding:var(--section-py,80px) 24px;background:var(--color-surface,#f8f8f8);">
  <div style="max-width:700px;margin:0 auto;text-align:center;">
    ${sectionTitle(title || 'Bize Ulaşın', subtitle)}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <input type="text" id="cf3-ad" placeholder="Adınız" style="padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);font-size:1rem;">
      <input type="tel" id="cf3-tel" placeholder="Telefon" style="padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);font-size:1rem;">
    </div>
    <textarea id="cf3-msg" rows="4" placeholder="Mesajınız" style="width:100%;padding:14px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md,8px);margin-top:12px;font-size:1rem;resize:vertical;"></textarea>
    <button onclick="var a=document.getElementById('cf3-ad').value,t=document.getElementById('cf3-tel').value,m=document.getElementById('cf3-msg').value;window.open('${waUrl}?text='+encodeURIComponent('Ad: '+a+'\\nTel: '+t+'\\nMesaj: '+m),'_blank')" style="margin-top:16px;padding:14px 48px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;font-size:1rem;cursor:pointer;">${esc(submitText || 'Gönder')}</button>
  </div>
</section>`
}

// ═══════════════════════════════════════════
// 05. TESTIMONIALS (5 variants)
// ═══════════════════════════════════════════

function testimonialsCarousel(ctx: SectionCtx): string {
  const { title, reviews = [] } = ctx.content as Record<string, any>
  const items = (reviews as any[]).map(r => `
    <div style="flex:0 0 100%;min-width:0;text-align:center;padding:0 40px;">
      <div style="font-size:3rem;color:var(--color-accent);margin-bottom:16px;">&ldquo;</div>
      <p style="font-size:1.15rem;color:var(--color-text);line-height:1.7;margin-bottom:20px;font-style:italic;">${esc(r.text)}</p>
      <div style="color:var(--color-accent);margin-bottom:8px;">${'&#9733;'.repeat(r.rating || 5)}</div>
      <strong style="color:var(--color-text);">${esc(r.name)}</strong>
    </div>`).join('')
  return sectionWrap('yorumlar', `
    ${sectionTitle(title || 'Müşteri Yorumları')}
    <div style="overflow:hidden;"><div style="display:flex;transition:transform 0.5s;">${items}</div></div>`)
}

function testimonialsGridCards(ctx: SectionCtx): string {
  const { title, reviews = [] } = ctx.content as Record<string, any>
  const items = (reviews as any[]).map(r => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:28px;">
      <div style="color:var(--color-accent);margin-bottom:12px;">${'&#9733;'.repeat(r.rating || 5)}</div>
      <p style="color:var(--color-text);line-height:1.6;margin-bottom:16px;">${esc(r.text)}</p>
      <div style="display:flex;align-items:center;gap:12px;">
        ${r.photo ? `<img src="${esc(r.photo)}" alt="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">` : `<div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">${(r.name || '?')[0]}</div>`}
        <strong style="color:var(--color-text);">${esc(r.name)}</strong>
      </div>
    </div>`).join('')
  return sectionWrap('yorumlar', `${sectionTitle(title || 'Müşteri Yorumları')}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;">${items}</div>`)
}

function testimonialsEditorialSingle(ctx: SectionCtx): string {
  const { title, reviews = [] } = ctx.content as Record<string, any>
  const r = (reviews as any[])[0] || { text: '', name: '', rating: 5 }
  return `<section id="yorumlar" style="padding:var(--section-py,80px) 24px;background:var(--color-surface,#f8f8f8);">
  <div style="max-width:800px;margin:0 auto;text-align:center;">
    <div style="font-size:5rem;color:var(--color-accent);line-height:1;margin-bottom:24px;">&ldquo;</div>
    <p style="font-family:var(--font-heading);font-size:clamp(1.3rem,3vw,2rem);color:var(--color-text);line-height:1.5;margin-bottom:32px;font-style:italic;">${esc(r.text)}</p>
    <div style="color:var(--color-accent);margin-bottom:8px;">${'&#9733;'.repeat(r.rating || 5)}</div>
    <strong style="color:var(--color-text);font-size:1.1rem;">${esc(r.name)}</strong>
  </div>
</section>`
}

function testimonialsMarquee(ctx: SectionCtx): string {
  const { title, reviews = [] } = ctx.content as Record<string, any>
  const cards = (reviews as any[]).map(r => `
    <div style="flex:0 0 350px;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:24px;margin-right:20px;">
      <div style="color:var(--color-accent);margin-bottom:8px;">${'&#9733;'.repeat(r.rating || 5)}</div>
      <p style="color:var(--color-text);line-height:1.5;margin-bottom:12px;font-size:0.95rem;">${esc(r.text)}</p>
      <strong style="color:var(--color-text);font-size:0.9rem;">${esc(r.name)}</strong>
    </div>`).join('')
  return `<section id="yorumlar" style="padding:var(--section-py,80px) 0;overflow:hidden;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;padding:0 24px;">${sectionTitle(title || 'Müşteri Yorumları')}</div>
  <div style="display:flex;animation:marquee 30s linear infinite;">
    ${cards}${cards}
  </div>
  <style>@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>
</section>`
}

function testimonialsWithPhoto(ctx: SectionCtx): string {
  const { title, reviews = [] } = ctx.content as Record<string, any>
  const items = (reviews as any[]).map(r => `
    <div style="display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:center;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);overflow:hidden;">
      ${r.photo ? `<img src="${esc(r.photo)}" alt="" style="width:200px;height:200px;object-fit:cover;">` : '<div style="width:200px;height:200px;background:var(--color-accent);"></div>'}
      <div style="padding:24px 24px 24px 0;">
        <div style="color:var(--color-accent);margin-bottom:8px;">${'&#9733;'.repeat(r.rating || 5)}</div>
        <p style="color:var(--color-text);line-height:1.6;margin-bottom:12px;">${esc(r.text)}</p>
        <strong style="color:var(--color-text);">${esc(r.name)}</strong>
      </div>
    </div>`).join('')
  return sectionWrap('yorumlar', `${sectionTitle(title || 'Müşteri Yorumları')}<div style="display:grid;gap:24px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 06. GALLERY (5 variants)
// ═══════════════════════════════════════════

function gallerySimpleGrid(ctx: SectionCtx): string {
  const { title, images = [] } = ctx.content as Record<string, any>
  const items = (images as any[]).map(img => `
    <div style="border-radius:var(--radius-md,8px);overflow:hidden;aspect-ratio:1;">
      <img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
    </div>`).join('')
  return sectionWrap('galeri', `${sectionTitle(title || 'Galeri')}<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">${items}</div>`)
}

function galleryMasonry(ctx: SectionCtx): string {
  const { title, images = [] } = ctx.content as Record<string, any>
  const items = (images as any[]).map((img, i) => `
    <div style="break-inside:avoid;margin-bottom:16px;border-radius:var(--radius-md,8px);overflow:hidden;">
      <img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;display:block;" loading="lazy">
    </div>`).join('')
  return sectionWrap('galeri', `${sectionTitle(title || 'Galeri')}<div style="column-count:3;column-gap:16px;">${items}</div>`)
}

function galleryHorizontalSnap(ctx: SectionCtx): string {
  const { title, images = [] } = ctx.content as Record<string, any>
  const items = (images as any[]).map(img => `
    <div style="flex:0 0 350px;scroll-snap-align:start;border-radius:var(--radius-lg,12px);overflow:hidden;aspect-ratio:4/3;">
      <img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
    </div>`).join('')
  return sectionWrap('galeri', `${sectionTitle(title || 'Galeri')}<div style="display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:16px;-webkit-overflow-scrolling:touch;">${items}</div>`)
}

function galleryFilterableMasonry(ctx: SectionCtx): string {
  const { title, images = [], categories = [] } = ctx.content as Record<string, any>
  const cats = (categories as string[]).length ? categories as string[] : ['Tümü']
  const tabs = cats.map((c, i) => `<button style="padding:8px 20px;border-radius:20px;border:1px solid var(--color-border,#e5e7eb);background:${i === 0 ? 'var(--color-accent)' : 'transparent'};color:${i === 0 ? '#fff' : 'var(--color-text)'};cursor:pointer;font-size:0.9rem;">${esc(c)}</button>`).join('')
  const items = (images as any[]).map(img => `
    <div style="break-inside:avoid;margin-bottom:16px;border-radius:var(--radius-md,8px);overflow:hidden;">
      <img src="${esc(img.url)}" alt="${esc(img.alt)}" style="width:100%;display:block;" loading="lazy">
    </div>`).join('')
  return sectionWrap('galeri', `${sectionTitle(title || 'Galeri')}<div style="display:flex;gap:8px;justify-content:center;margin-bottom:32px;flex-wrap:wrap;">${tabs}</div><div style="column-count:3;column-gap:16px;">${items}</div>`)
}

function galleryAsymmetricEditorial(ctx: SectionCtx): string {
  const { title, images = [] } = ctx.content as Record<string, any>
  const imgs = images as any[]
  const big = imgs[0] || { url: '', alt: '' }
  const small1 = imgs[1] || { url: '', alt: '' }
  const small2 = imgs[2] || { url: '', alt: '' }
  return sectionWrap('galeri', `${sectionTitle(title || 'Galeri')}
    <div style="display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:16px;min-height:500px;">
      <div style="grid-row:1/3;border-radius:var(--radius-lg,12px);overflow:hidden;"><img src="${esc(big.url)}" alt="${esc(big.alt)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>
      <div style="border-radius:var(--radius-lg,12px);overflow:hidden;"><img src="${esc(small1.url)}" alt="${esc(small1.alt)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>
      <div style="border-radius:var(--radius-lg,12px);overflow:hidden;"><img src="${esc(small2.url)}" alt="${esc(small2.alt)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>
    </div>`)
}

// ═══════════════════════════════════════════
// 07. FAQ (3 variants)
// ═══════════════════════════════════════════

function faqAccordion(ctx: SectionCtx): string {
  const { title, questions = [], ctaText } = ctx.content as Record<string, any>
  const items = (questions as any[]).map(q => `
    <div style="border-bottom:1px solid var(--color-border,#e5e7eb);">
      <button onclick="var p=this.nextElementSibling;p.style.display=p.style.display==='none'?'block':'none';this.querySelector('span:last-child').textContent=p.style.display==='none'?'+':'−'" style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;background:none;border:none;cursor:pointer;text-align:left;">
        <span style="font-family:var(--font-heading);font-size:1.05rem;color:var(--color-text);font-weight:600;">${esc(q.question)}</span>
        <span style="font-size:1.5rem;color:var(--color-accent);flex-shrink:0;margin-left:16px;">+</span>
      </button>
      <div style="display:none;padding:0 0 20px;color:var(--color-text-secondary);line-height:1.7;">${esc(q.answer)}</div>
    </div>`).join('')
  return sectionWrap('sss', `${sectionTitle(title || 'Sık Sorulan Sorular')}<div style="max-width:800px;margin:0 auto;">${items}</div>
    ${ctaText ? `<div style="text-align:center;margin-top:40px;"><p style="color:var(--color-text-secondary);">${esc(ctaText)}</p></div>` : ''}`)
}

function faqTwoColumn(ctx: SectionCtx): string {
  const { title, questions = [] } = ctx.content as Record<string, any>
  const items = (questions as any[]).map(q => `
    <div style="padding:20px;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-md,8px);">
      <h4 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;font-size:1rem;">${esc(q.question)}</h4>
      <p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.6;">${esc(q.answer)}</p>
    </div>`).join('')
  return sectionWrap('sss', `${sectionTitle(title || 'Sık Sorulan Sorular')}<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">${items}</div>`)
}

function faqWithSearch(ctx: SectionCtx): string {
  const { title, questions = [] } = ctx.content as Record<string, any>
  const items = (questions as any[]).map(q => `
    <div class="faq-item" style="border-bottom:1px solid var(--color-border,#e5e7eb);">
      <button onclick="var p=this.nextElementSibling;p.style.display=p.style.display==='none'?'block':'none'" style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;background:none;border:none;cursor:pointer;text-align:left;">
        <span style="font-family:var(--font-heading);color:var(--color-text);font-weight:600;">${esc(q.question)}</span>
        <span style="color:var(--color-accent);">&#9660;</span>
      </button>
      <div style="display:none;padding:0 0 20px;color:var(--color-text-secondary);line-height:1.7;">${esc(q.answer)}</div>
    </div>`).join('')
  return sectionWrap('sss', `${sectionTitle(title || 'Sık Sorulan Sorular')}
    <div style="max-width:500px;margin:0 auto 32px;">
      <input type="text" placeholder="Soru ara..." style="width:100%;padding:12px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);font-size:1rem;background:var(--color-surface);">
    </div>
    <div style="max-width:800px;margin:0 auto;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 08. FOOTER (5 variants)
// ═══════════════════════════════════════════

function footerMinimal(ctx: SectionCtx): string {
  const { businessName, copyright } = ctx.content as Record<string, any>
  const name = businessName || ctx.business.name
  return `<footer id="footer" style="padding:24px;text-align:center;border-top:1px solid var(--color-border,#e5e7eb);background:var(--color-bg);">
  <p style="color:var(--color-text-secondary);font-size:0.9rem;">${esc(copyright || `© ${new Date().getFullYear()} ${name}. Tüm hakları saklıdır.`)}</p>
</footer>`
}

function footerWarmColumns(ctx: SectionCtx): string {
  const { businessName, description, columns = [], copyright } = ctx.content as Record<string, any>
  const name = businessName || ctx.business.name
  const colsHtml = (columns as any[]).map(col => `
    <div>
      <h4 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:16px;font-size:1rem;">${esc(col.title)}</h4>
      <ul style="list-style:none;padding:0;margin:0;">
        ${(col.links || []).map((l: any) => `<li style="margin-bottom:8px;"><a href="${esc(l.href)}" style="color:var(--color-text-secondary);text-decoration:none;font-size:0.9rem;">${esc(l.text)}</a></li>`).join('')}
      </ul>
    </div>`).join('')
  return `<footer id="footer" style="padding:60px 24px 24px;background:var(--color-surface,#f8f8f8);">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:2fr repeat(${Math.max((columns as any[]).length, 1)},1fr);gap:40px;">
    <div>
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:12px;">${esc(name)}</h3>
      ${description ? `<p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.6;max-width:300px;">${esc(description)}</p>` : ''}
      <p style="margin-top:12px;font-size:0.9rem;color:var(--color-text-secondary);">${esc(ctx.business.phone)}</p>
    </div>
    ${colsHtml}
  </div>
  <div style="max-width:var(--container-default,1200px);margin:32px auto 0;padding-top:24px;border-top:1px solid var(--color-border,#e5e7eb);text-align:center;">
    <p style="color:var(--color-text-secondary);font-size:0.85rem;">${esc(copyright || `© ${new Date().getFullYear()} ${name}`)}</p>
  </div>
</footer>`
}

function footerDarkColumns(ctx: SectionCtx): string {
  const { businessName, description, columns = [], copyright } = ctx.content as Record<string, any>
  const name = businessName || ctx.business.name
  const colsHtml = (columns as any[]).map(col => `
    <div>
      <h4 style="color:#fff;margin-bottom:16px;font-size:1rem;font-family:var(--font-heading);">${esc(col.title)}</h4>
      <ul style="list-style:none;padding:0;margin:0;">
        ${(col.links || []).map((l: any) => `<li style="margin-bottom:8px;"><a href="${esc(l.href)}" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.9rem;">${esc(l.text)}</a></li>`).join('')}
      </ul>
    </div>`).join('')
  return `<footer id="footer" style="padding:60px 24px 24px;background:#1a1a2e;color:#fff;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:2fr repeat(${Math.max((columns as any[]).length, 1)},1fr);gap:40px;">
    <div>
      <h3 style="font-family:var(--font-heading);margin-bottom:12px;">${esc(name)}</h3>
      ${description ? `<p style="color:rgba(255,255,255,0.6);font-size:0.9rem;line-height:1.6;max-width:300px;">${esc(description)}</p>` : ''}
    </div>
    ${colsHtml}
  </div>
  <div style="max-width:var(--container-default,1200px);margin:32px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;">
    <p style="color:rgba(255,255,255,0.4);font-size:0.85rem;">${esc(copyright || `© ${new Date().getFullYear()} ${name}`)}</p>
  </div>
</footer>`
}

function footerLuxuryMinimal(ctx: SectionCtx): string {
  const { businessName, copyright } = ctx.content as Record<string, any>
  const name = businessName || ctx.business.name
  return `<footer id="footer" style="padding:48px 24px;text-align:center;background:var(--color-bg);border-top:1px solid var(--color-border,#e5e7eb);">
  <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--color-text);margin-bottom:16px;letter-spacing:0.1em;text-transform:uppercase;">${esc(name)}</h3>
  <p style="color:var(--color-text-secondary);font-size:0.9rem;margin-bottom:8px;">${esc(ctx.business.address)}</p>
  <p style="color:var(--color-text-secondary);font-size:0.9rem;margin-bottom:24px;"><a href="${telLink(ctx.business.phone)}" style="color:var(--color-accent);text-decoration:none;">${esc(ctx.business.phone)}</a></p>
  <p style="color:var(--color-text-secondary);font-size:0.8rem;">${esc(copyright || `© ${new Date().getFullYear()} ${name}`)}</p>
</footer>`
}

function footerCorporateMega(ctx: SectionCtx): string {
  const { businessName, description, columns = [], copyright } = ctx.content as Record<string, any>
  const name = businessName || ctx.business.name
  const colsHtml = (columns as any[]).map(col => `
    <div>
      <h4 style="color:#fff;margin-bottom:16px;font-size:0.95rem;font-family:var(--font-heading);">${esc(col.title)}</h4>
      <ul style="list-style:none;padding:0;margin:0;">
        ${(col.links || []).map((l: any) => `<li style="margin-bottom:8px;"><a href="${esc(l.href)}" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.85rem;">${esc(l.text)}</a></li>`).join('')}
      </ul>
    </div>`).join('')
  return `<footer id="footer" style="padding:60px 24px 24px;background:#111827;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;">
    <div style="display:grid;grid-template-columns:2fr repeat(${Math.max((columns as any[]).length, 1)},1fr);gap:32px;margin-bottom:40px;">
      <div>
        <h3 style="font-family:var(--font-heading);color:#fff;margin-bottom:12px;">${esc(name)}</h3>
        ${description ? `<p style="color:rgba(255,255,255,0.6);font-size:0.9rem;line-height:1.6;max-width:300px;">${esc(description)}</p>` : ''}
        <div style="margin-top:16px;">
          <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;">${esc(ctx.business.address)}</p>
          <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin-top:4px;">${esc(ctx.business.phone)}</p>
        </div>
      </div>
      ${colsHtml}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);flex-wrap:wrap;gap:16px;">
      <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;">${esc(copyright || `© ${new Date().getFullYear()} ${name}`)}</p>
      <div style="display:flex;gap:16px;">
        <span style="color:rgba(255,255,255,0.4);font-size:0.8rem;">Gizlilik Politikası</span>
        <span style="color:rgba(255,255,255,0.4);font-size:0.8rem;">Kullanım Şartları</span>
      </div>
    </div>
  </div>
</footer>`
}

// ═══════════════════════════════════════════
// 09. HEADER (9 variants)
// ═══════════════════════════════════════════

function headerMinimalSticky(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.95rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;background:var(--color-bg);border-bottom:1px solid var(--color-border,#e5e7eb);padding:16px 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
    ${logo?.imageUrl ? `<img src="${esc(logo.imageUrl)}" alt="${esc(logoText)}" style="height:36px;">` : `<span style="font-family:var(--font-heading);font-size:1.3rem;font-weight:700;color:var(--color-text);">${esc(logoText)}</span>`}
    <nav style="display:flex;gap:24px;align-items:center;">${nav}
      ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.9rem;">${esc(cta.text)}</a>` : ''}
    </nav>
  </div>
</header>`
}

function headerWarmMedical(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta, topBar } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;">
  <div style="background:var(--color-accent);padding:8px 24px;display:flex;justify-content:center;gap:24px;">
    ${topBar?.phone ? `<span style="color:#fff;font-size:0.85rem;">${esc(topBar.phone)}</span>` : ''}
    ${topBar?.email ? `<span style="color:#fff;font-size:0.85rem;">${esc(topBar.email)}</span>` : ''}
    ${topBar?.workingHours ? `<span style="color:rgba(255,255,255,0.8);font-size:0.85rem;">${esc(topBar.workingHours)}</span>` : ''}
  </div>
  <div style="background:var(--color-bg);padding:14px 24px;border-bottom:1px solid var(--color-border,#e5e7eb);">
    <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:var(--color-text);">${esc(logoText)}</span>
      <nav style="display:flex;gap:20px;align-items:center;">${nav}
        ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.85rem;">${esc(cta.text)}</a>` : ''}
      </nav>
    </div>
  </div>
</header>`
}

function headerDarkGlass(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:#fff;text-decoration:none;font-size:0.9rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);padding:16px 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
    <span style="font-family:var(--font-heading);font-size:1.3rem;font-weight:700;color:#fff;">${esc(logoText)}</span>
    <nav style="display:flex;gap:24px;align-items:center;">${nav}
      ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.9rem;">${esc(cta.text)}</a>` : ''}
    </nav>
  </div>
</header>`
}

function headerLuxuryCentered(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const half = Math.ceil((menuItems as any[]).length / 2)
  const leftNav = (menuItems as any[]).slice(0, half).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;letter-spacing:0.05em;">${esc(m.text)}</a>`).join('')
  const rightNav = (menuItems as any[]).slice(half).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;letter-spacing:0.05em;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;background:var(--color-bg);border-bottom:1px solid var(--color-border,#e5e7eb);padding:20px 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px;">
    <nav style="display:flex;gap:24px;">${leftNav}</nav>
    <span style="font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-text);letter-spacing:0.1em;text-transform:uppercase;">${esc(logoText)}</span>
    <nav style="display:flex;gap:24px;">${rightNav}</nav>
  </div>
</header>`
}

function headerDarkIndustrial(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta, topBar } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:#fff;text-decoration:none;font-size:0.9rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;">
  ${topBar?.phone ? `<div style="background:#dc2626;padding:8px 24px;text-align:center;"><a href="${telLink(topBar.phone)}" style="color:#fff;text-decoration:none;font-weight:700;font-size:0.95rem;">ACİL SERVİS: ${esc(topBar.phone)}</a></div>` : ''}
  <div style="background:#1a1a2e;padding:14px 24px;">
    <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:#fff;">${esc(logoText)}</span>
      <nav style="display:flex;gap:20px;align-items:center;">${nav}
        ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.85rem;">${esc(cta.text)}</a>` : ''}
      </nav>
    </div>
  </div>
</header>`
}

function headerCorporateMega(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta, topBar } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;font-weight:500;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;">
  <div style="background:var(--color-surface,#f8f8f8);padding:8px 24px;display:flex;justify-content:flex-end;gap:16px;font-size:0.8rem;">
    ${topBar?.phone ? `<span style="color:var(--color-text-secondary);">${esc(topBar.phone)}</span>` : ''}
    ${topBar?.email ? `<span style="color:var(--color-text-secondary);">${esc(topBar.email)}</span>` : ''}
  </div>
  <div style="background:var(--color-bg);padding:14px 24px;border-bottom:1px solid var(--color-border,#e5e7eb);">
    <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-heading);font-size:1.3rem;font-weight:700;color:var(--color-text);">${esc(logoText)}</span>
      <nav style="display:flex;gap:24px;align-items:center;">${nav}
        ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(cta.text)}</a>` : ''}
      </nav>
    </div>
  </div>
</header>`
}

function headerModernApp(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;background:var(--color-bg);padding:12px 24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
    <span style="font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:var(--color-accent);">${esc(logoText)}</span>
    <nav style="display:flex;gap:20px;align-items:center;">${nav}
      ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 24px;background:var(--color-accent);color:#fff;border-radius:99px;font-weight:600;text-decoration:none;font-size:0.85rem;">${esc(cta.text)}</a>` : ''}
    </nav>
  </div>
</header>`
}

function headerOverlayMenu(ctx: SectionCtx): string {
  const { logo, menuItems = [] } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const uid = `ov-${Math.random().toString(36).slice(2, 8)}`
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:#fff;text-decoration:none;font-family:var(--font-heading);font-size:2rem;display:block;margin-bottom:16px;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:fixed;top:0;left:0;right:0;z-index:50;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <span style="font-family:var(--font-heading);font-size:1.3rem;font-weight:700;color:var(--color-text);">${esc(logoText)}</span>
  <button onclick="document.getElementById('${uid}').style.display='flex'" style="background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--color-text);">&#9776;</button>
  <div id="${uid}" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:100;flex-direction:column;align-items:center;justify-content:center;">
    <button onclick="this.parentElement.style.display='none'" style="position:absolute;top:24px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;">&times;</button>
    ${nav}
  </div>
</header>`
}

function headerDualBar(ctx: SectionCtx): string {
  const { logo, menuItems = [], cta, topBar } = ctx.content as Record<string, any>
  const logoText = logo?.text || ctx.business.name
  const nav = (menuItems as any[]).map(m => `<a href="${esc(m.href)}" style="color:var(--color-text);text-decoration:none;font-size:0.9rem;">${esc(m.text)}</a>`).join('')
  return `<header id="header" style="position:sticky;top:0;z-index:50;">
  <div style="background:var(--color-accent);padding:6px 24px;display:flex;justify-content:center;gap:24px;font-size:0.8rem;">
    ${topBar?.phone ? `<a href="${telLink(topBar.phone)}" style="color:#fff;text-decoration:none;">${esc(topBar.phone)}</a>` : ''}
    ${topBar?.email ? `<a href="mailto:${esc(topBar.email)}" style="color:rgba(255,255,255,0.8);text-decoration:none;">${esc(topBar.email)}</a>` : ''}
    ${topBar?.workingHours ? `<span style="color:rgba(255,255,255,0.8);">${esc(topBar.workingHours)}</span>` : ''}
  </div>
  <div style="background:var(--color-bg);padding:14px 24px;border-bottom:1px solid var(--color-border,#e5e7eb);">
    <div style="max-width:var(--container-default,1200px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:var(--color-text);">${esc(logoText)}</span>
      <nav style="display:flex;gap:20px;align-items:center;">${nav}
        ${cta ? `<a href="${esc(cta.href)}" style="padding:10px 20px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.85rem;">${esc(cta.text)}</a>` : ''}
      </nav>
    </div>
  </div>
</header>`
}

// ═══════════════════════════════════════════
// 10. STATS (3 variants)
// ═══════════════════════════════════════════

function statsAnimatedRow(ctx: SectionCtx): string {
  const { stats = [] } = ctx.content as Record<string, any>
  const items = (stats as any[]).map(s => `
    <div style="text-align:center;">
      <div style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-accent);font-weight:700;">${esc(s.value)}</div>
      <div style="font-size:0.9rem;color:var(--color-text-secondary);margin-top:4px;">${esc(s.label)}</div>
    </div>`).join('')
  return sectionWrap('istatistikler', `<div style="display:grid;grid-template-columns:repeat(${Math.min((stats as any[]).length, 4)},1fr);gap:32px;">${items}</div>`)
}

function statsDarkBar(ctx: SectionCtx): string {
  const { stats = [] } = ctx.content as Record<string, any>
  const items = (stats as any[]).map(s => `
    <div style="text-align:center;">
      <div style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;font-weight:700;">${esc(s.value)}</div>
      <div style="font-size:0.9rem;color:rgba(255,255,255,0.7);margin-top:4px;">${esc(s.label)}</div>
    </div>`).join('')
  return `<section id="istatistikler" style="padding:60px 24px;background:#1a1a2e;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min((stats as any[]).length, 4)},1fr);gap:32px;">${items}</div>
</section>`
}

function statsGradientBar(ctx: SectionCtx): string {
  const { stats = [] } = ctx.content as Record<string, any>
  const items = (stats as any[]).map(s => `
    <div style="text-align:center;">
      <div style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;font-weight:700;">${esc(s.value)}</div>
      <div style="font-size:0.9rem;color:rgba(255,255,255,0.8);margin-top:4px;">${esc(s.label)}</div>
    </div>`).join('')
  return `<section id="istatistikler" style="padding:60px 24px;background:linear-gradient(135deg,var(--color-accent),#1a1a2e);">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min((stats as any[]).length, 4)},1fr);gap:32px;">${items}</div>
</section>`
}

// ═══════════════════════════════════════════
// 11. CTA (3 variants)
// ═══════════════════════════════════════════

function ctaFullWidthBanner(ctx: SectionCtx): string {
  const { title, subtitle, cta: ctaBtn, backgroundImage } = ctx.content as Record<string, any>
  const bg = backgroundImage ? `background:url('${esc(backgroundImage)}') center/cover;` : 'background:var(--color-accent);'
  return `<section id="cta" style="position:relative;padding:80px 24px;text-align:center;${bg}">
  ${backgroundImage ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>' : ''}
  <div style="position:relative;z-index:2;max-width:700px;margin:0 auto;">
    <h2 style="font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,2.8rem);color:#fff;margin-bottom:12px;">${esc(title)}</h2>
    ${subtitle ? `<p style="color:rgba(255,255,255,0.85);font-size:1.1rem;margin-bottom:28px;">${esc(subtitle)}</p>` : ''}
    ${ctaBtn ? `<a href="${esc(ctaBtn.href)}" style="display:inline-block;padding:14px 36px;background:${backgroundImage ? 'var(--color-accent)' : '#fff'};color:${backgroundImage ? '#fff' : 'var(--color-accent)'};border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:1rem;">${esc(ctaBtn.text)}</a>` : ''}
  </div>
</section>`
}

function ctaSplitCard(ctx: SectionCtx): string {
  const { title, subtitle, cta: ctaBtn, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="cta" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:var(--radius-lg,12px);overflow:hidden;background:var(--color-accent);">
    <div style="padding:48px;display:flex;flex-direction:column;justify-content:center;">
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.2rem);color:#fff;margin-bottom:12px;">${esc(title)}</h2>
      ${subtitle ? `<p style="color:rgba(255,255,255,0.85);margin-bottom:24px;">${esc(subtitle)}</p>` : ''}
      ${ctaBtn ? `<a href="${esc(ctaBtn.href)}" style="display:inline-block;width:fit-content;padding:12px 28px;background:#fff;color:var(--color-accent);border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">${esc(ctaBtn.text)}</a>` : ''}
    </div>
    ${backgroundImage ? `<div style="background:url('${esc(backgroundImage)}') center/cover;min-height:300px;"></div>` : '<div style="background:rgba(255,255,255,0.1);min-height:300px;"></div>'}
  </div>
</section>`
}

function ctaFloatingBar(ctx: SectionCtx): string {
  const { title, cta: ctaBtn } = ctx.content as Record<string, any>
  return `<div id="cta" style="position:fixed;bottom:0;left:0;right:0;z-index:40;background:var(--color-accent);padding:14px 24px;display:flex;justify-content:center;align-items:center;gap:24px;box-shadow:0 -2px 10px rgba(0,0,0,0.1);">
  <span style="color:#fff;font-weight:600;font-size:1rem;">${esc(title)}</span>
  ${ctaBtn ? `<a href="${esc(ctaBtn.href)}" style="padding:10px 24px;background:#fff;color:var(--color-accent);border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;font-size:0.9rem;">${esc(ctaBtn.text)}</a>` : ''}
</div>`
}

// ═══════════════════════════════════════════
// 12. TEAM (5 variants)
// ═══════════════════════════════════════════

function teamCardHorizontal(ctx: SectionCtx): string {
  const { title, subtitle, members = [] } = ctx.content as Record<string, any>
  const items = (members as any[]).map(m => `
    <div style="display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);overflow:hidden;">
      ${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" style="width:120px;height:120px;object-fit:cover;">` : `<div style="width:120px;height:120px;background:var(--color-accent);display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem;font-weight:700;">${(m.name || '?')[0]}</div>`}
      <div style="padding:16px 16px 16px 0;">
        <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:4px;">${esc(m.name)}</h3>
        <p style="color:var(--color-accent);font-size:0.9rem;margin-bottom:8px;">${esc(m.role)}</p>
        ${m.bio ? `<p style="color:var(--color-text-secondary);font-size:0.85rem;line-height:1.5;">${esc(m.bio)}</p>` : ''}
      </div>
    </div>`).join('')
  return sectionWrap('ekibimiz', `${sectionTitle(title || 'Ekibimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:20px;">${items}</div>`)
}

function teamCarousel(ctx: SectionCtx): string {
  const { title, subtitle, members = [] } = ctx.content as Record<string, any>
  const items = (members as any[]).map(m => `
    <div style="flex:0 0 280px;text-align:center;scroll-snap-align:start;">
      ${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" style="width:180px;height:180px;border-radius:50%;object-fit:cover;margin:0 auto 16px;">` : `<div style="width:180px;height:180px;border-radius:50%;background:var(--color-accent);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:3rem;font-weight:700;">${(m.name || '?')[0]}</div>`}
      <h3 style="font-family:var(--font-heading);color:var(--color-text);">${esc(m.name)}</h3>
      <p style="color:var(--color-accent);font-size:0.9rem;">${esc(m.role)}</p>
    </div>`).join('')
  return sectionWrap('ekibimiz', `${sectionTitle(title || 'Ekibimiz', subtitle)}<div style="display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:16px;">${items}</div>`)
}

function teamFullPageSnap(ctx: SectionCtx): string {
  const { title, members = [] } = ctx.content as Record<string, any>
  const m = (members as any[])[0] || { name: '', role: '', photo: '', bio: '' }
  return `<section id="ekibimiz" style="min-height:80vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;">
  ${m.photo ? `<div style="background:url('${esc(m.photo)}') center/cover;min-height:500px;"></div>` : '<div style="background:var(--color-accent);min-height:500px;"></div>'}
  <div style="display:flex;flex-direction:column;justify-content:center;padding:60px 48px;">
    <h2 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin-bottom:8px;">${esc(m.name)}</h2>
    <p style="color:var(--color-accent);font-size:1.1rem;margin-bottom:20px;">${esc(m.role)}</p>
    ${m.bio ? `<p style="color:var(--color-text-secondary);line-height:1.7;">${esc(m.bio)}</p>` : ''}
  </div>
</section>`
}

function teamMonoToColor(ctx: SectionCtx): string {
  const { title, subtitle, members = [] } = ctx.content as Record<string, any>
  const items = (members as any[]).map(m => `
    <div style="text-align:center;">
      ${m.photo ? `<div style="width:200px;height:200px;border-radius:50%;overflow:hidden;margin:0 auto 16px;filter:grayscale(100%);transition:filter 0.3s;" onmouseenter="this.style.filter='none'" onmouseleave="this.style.filter='grayscale(100%)'"><img src="${esc(m.photo)}" alt="${esc(m.name)}" style="width:100%;height:100%;object-fit:cover;"></div>` : `<div style="width:200px;height:200px;border-radius:50%;background:var(--color-accent);margin:0 auto 16px;"></div>`}
      <h3 style="font-family:var(--font-heading);color:var(--color-text);">${esc(m.name)}</h3>
      <p style="color:var(--color-accent);font-size:0.9rem;">${esc(m.role)}</p>
    </div>`).join('')
  return sectionWrap('ekibimiz', `${sectionTitle(title || 'Ekibimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:32px;">${items}</div>`)
}

function teamFilterableGrid(ctx: SectionCtx): string {
  const { title, subtitle, members = [] } = ctx.content as Record<string, any>
  const items = (members as any[]).map(m => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);overflow:hidden;text-align:center;">
      ${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" style="width:100%;aspect-ratio:1;object-fit:cover;">` : `<div style="width:100%;aspect-ratio:1;background:var(--color-accent);display:flex;align-items:center;justify-content:center;color:#fff;font-size:3rem;font-weight:700;">${(m.name || '?')[0]}</div>`}
      <div style="padding:20px;">
        <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:4px;">${esc(m.name)}</h3>
        <p style="color:var(--color-accent);font-size:0.9rem;">${esc(m.role)}</p>
      </div>
    </div>`).join('')
  return sectionWrap('ekibimiz', `${sectionTitle(title || 'Ekibimiz', subtitle)}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 13. PRICING (3 variants)
// ═══════════════════════════════════════════

function pricingColumns(ctx: SectionCtx): string {
  const { title, packages = [] } = ctx.content as Record<string, any>
  const items = (packages as any[]).map((p, i) => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:32px;text-align:center;${p.featured ? 'border:2px solid var(--color-accent);transform:scale(1.05);' : ''}">
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(p.name)}</h3>
      <div style="font-size:2rem;font-weight:700;color:var(--color-accent);margin-bottom:16px;">${esc(p.price)}</div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;text-align:left;">
        ${(p.features || []).map((f: string) => `<li style="padding:8px 0;border-bottom:1px solid var(--color-border,#e5e7eb);color:var(--color-text-secondary);font-size:0.9rem;">&#10003; ${esc(f)}</li>`).join('')}
      </ul>
      <a href="#iletisim" style="display:block;padding:12px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">Seç</a>
    </div>`).join('')
  return sectionWrap('fiyatlandirma', `${sectionTitle(title || 'Fiyatlandırma')}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:start;">${items}</div>`)
}

function pricingComparison(ctx: SectionCtx): string {
  const { title, packages = [] } = ctx.content as Record<string, any>
  const pkgs = packages as any[]
  const allFeatures = Array.from(new Set(pkgs.flatMap(p => p.features || [])))
  const headerCells = pkgs.map(p => `<th style="padding:16px;background:var(--color-surface,#f8f8f8);font-family:var(--font-heading);font-size:1rem;">${esc(p.name)}<br><span style="color:var(--color-accent);font-weight:700;font-size:1.3rem;">${esc(p.price)}</span></th>`).join('')
  const rows = allFeatures.map(f => `<tr><td style="padding:12px 16px;border-bottom:1px solid var(--color-border,#e5e7eb);color:var(--color-text);">${esc(f)}</td>${pkgs.map(p => `<td style="padding:12px 16px;text-align:center;border-bottom:1px solid var(--color-border,#e5e7eb);">${(p.features || []).includes(f) ? '<span style="color:var(--color-accent);font-weight:700;">&#10003;</span>' : '<span style="color:var(--color-text-secondary);">—</span>'}</td>`).join('')}</tr>`).join('')
  return sectionWrap('fiyatlandirma', `${sectionTitle(title || 'Paketleri Karşılaştır')}
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;"><thead><tr><th style="padding:16px;"></th>${headerCells}</tr></thead><tbody>${rows}</tbody></table></div>`)
}

function pricingToggle(ctx: SectionCtx): string {
  const { title, packages = [] } = ctx.content as Record<string, any>
  const items = (packages as any[]).map(p => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:32px;text-align:center;">
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(p.name)}</h3>
      <div style="font-size:2rem;font-weight:700;color:var(--color-accent);margin-bottom:16px;">${esc(p.price)}<span style="font-size:0.9rem;font-weight:400;color:var(--color-text-secondary);">/ay</span></div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;">
        ${(p.features || []).map((f: string) => `<li style="padding:6px 0;color:var(--color-text-secondary);font-size:0.9rem;">&#10003; ${esc(f)}</li>`).join('')}
      </ul>
      <a href="#iletisim" style="display:block;padding:12px;background:var(--color-accent);color:#fff;border-radius:var(--radius-md,8px);font-weight:600;text-decoration:none;">Başla</a>
    </div>`).join('')
  return sectionWrap('fiyatlandirma', `${sectionTitle(title || 'Fiyatlandırma')}
    <div style="display:flex;justify-content:center;margin-bottom:32px;gap:8px;align-items:center;">
      <span style="color:var(--color-text);font-weight:600;">Aylık</span>
      <div style="width:48px;height:26px;border-radius:13px;background:var(--color-accent);position:relative;cursor:pointer;"><div style="width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;"></div></div>
      <span style="color:var(--color-text-secondary);">Yıllık</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 14. PROCESS STEPS (3 variants)
// ═══════════════════════════════════════════

function processStepsHorizontalTimeline(ctx: SectionCtx): string {
  const { title, steps = [] } = ctx.content as Record<string, any>
  const items = (steps as any[]).map((s, i) => `
    <div style="text-align:center;flex:1;position:relative;">
      <div style="width:48px;height:48px;border-radius:50%;background:var(--color-accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;margin:0 auto 16px;">${i + 1}</div>
      <h4 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(s.title)}</h4>
      <p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.5;">${esc(s.description)}</p>
    </div>`).join('')
  return sectionWrap('surec', `${sectionTitle(title || 'Nasıl Çalışır?')}<div style="display:flex;gap:24px;position:relative;">${items}</div>`)
}

function processStepsVerticalTimeline(ctx: SectionCtx): string {
  const { title, steps = [] } = ctx.content as Record<string, any>
  const items = (steps as any[]).map((s, i) => `
    <div style="display:flex;gap:24px;align-items:flex-start;">
      <div style="flex-shrink:0;position:relative;">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">${i + 1}</div>
        ${i < (steps as any[]).length - 1 ? '<div style="position:absolute;top:44px;left:50%;transform:translateX(-50%);width:2px;height:calc(100% + 8px);background:var(--color-border,#e5e7eb);"></div>' : ''}
      </div>
      <div style="padding-bottom:32px;">
        <h4 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:4px;">${esc(s.title)}</h4>
        <p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.6;">${esc(s.description)}</p>
      </div>
    </div>`).join('')
  return sectionWrap('surec', `${sectionTitle(title || 'Sürecimiz', undefined, 'left')}<div style="max-width:600px;">${items}</div>`)
}

function processStepsNumberedCards(ctx: SectionCtx): string {
  const { title, steps = [] } = ctx.content as Record<string, any>
  const items = (steps as any[]).map((s, i) => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:32px;">
      <span style="font-family:var(--font-heading);font-size:3rem;color:var(--color-accent);opacity:0.3;font-weight:800;">${String(i + 1).padStart(2, '0')}</span>
      <h4 style="font-family:var(--font-heading);color:var(--color-text);margin:8px 0;">${esc(s.title)}</h4>
      <p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.5;">${esc(s.description)}</p>
    </div>`).join('')
  return sectionWrap('surec', `${sectionTitle(title || 'Nasıl Çalışır?')}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 15. WORKING HOURS (3 variants)
// ═══════════════════════════════════════════

function workingHoursCompact(ctx: SectionCtx): string {
  const { title, hours = [], note } = ctx.content as Record<string, any>
  const rows = (hours as any[]).map(h => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border,#e5e7eb);">
      <span style="color:var(--color-text);font-weight:500;">${esc(h.day)}</span>
      <span style="color:${h.closed ? 'var(--color-error,#ef4444)' : 'var(--color-text-secondary)'};">${h.closed ? 'Kapalı' : esc(h.hours)}</span>
    </div>`).join('')
  return sectionWrap('calisma-saatleri', `${sectionTitle(title || 'Çalışma Saatleri')}<div style="max-width:500px;margin:0 auto;">${rows}${note ? `<p style="text-align:center;margin-top:16px;color:var(--color-text-secondary);font-size:0.9rem;">${esc(note)}</p>` : ''}</div>`)
}

function workingHoursCard(ctx: SectionCtx): string {
  const { title, hours = [], note } = ctx.content as Record<string, any>
  const rows = (hours as any[]).map(h => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;${h.closed ? '' : 'border-bottom:1px solid var(--color-border,#e5e7eb);'}">
      <span style="color:var(--color-text);">${esc(h.day)}</span>
      <span style="color:${h.closed ? 'var(--color-error,#ef4444)' : 'var(--color-accent)'};">${h.closed ? 'Kapalı' : esc(h.hours)}</span>
    </div>`).join('')
  return sectionWrap('calisma-saatleri', `
    <div style="max-width:480px;margin:0 auto;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:32px;">
      <h3 style="font-family:var(--font-heading);text-align:center;color:var(--color-text);margin-bottom:24px;">${esc(title || 'Çalışma Saatleri')}</h3>
      ${rows}
      ${note ? `<p style="text-align:center;margin-top:16px;color:var(--color-text-secondary);font-size:0.85rem;">${esc(note)}</p>` : ''}
    </div>`)
}

function workingHoursSidePanel(ctx: SectionCtx): string {
  const { title, hours = [], note } = ctx.content as Record<string, any>
  const rows = (hours as any[]).map(h => `
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:rgba(255,255,255,0.9);">${esc(h.day)}</span>
      <span style="color:${h.closed ? '#ef4444' : 'rgba(255,255,255,0.7)'};">${h.closed ? 'Kapalı' : esc(h.hours)}</span>
    </div>`).join('')
  return `<aside id="calisma-saatleri" style="position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:30;background:#1a1a2e;color:#fff;padding:24px;border-radius:var(--radius-lg,12px) 0 0 var(--radius-lg,12px);min-width:240px;box-shadow:-4px 0 15px rgba(0,0,0,0.1);">
  <h4 style="font-family:var(--font-heading);margin-bottom:16px;font-size:1rem;">${esc(title || 'Çalışma Saatleri')}</h4>
  ${rows}
</aside>`
}

// ═══════════════════════════════════════════
// 16. MAP (3 variants)
// ═══════════════════════════════════════════

function mapFullWidth(ctx: SectionCtx): string {
  const { title, address, embedUrl } = ctx.content as Record<string, any>
  const addr = address || ctx.business.address
  return `<section id="harita" style="position:relative;">
  ${embedUrl ? `<iframe src="${esc(embedUrl)}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` : `<div style="height:400px;background:var(--color-surface,#eee);display:flex;align-items:center;justify-content:center;"><p style="color:var(--color-text-secondary);">${esc(addr)}</p></div>`}
</section>`
}

function mapSplitInfo(ctx: SectionCtx): string {
  const { title, address, embedUrl } = ctx.content as Record<string, any>
  const addr = address || ctx.business.address
  return `<section id="harita" style="padding:var(--section-py,80px) 24px;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;">
    <div>
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2rem);color:var(--color-text);margin-bottom:20px;">${esc(title || 'Bizi Ziyaret Edin')}</h2>
      <p style="color:var(--color-text-secondary);line-height:1.7;margin-bottom:16px;">${esc(addr)}</p>
      <p style="margin-bottom:8px;"><a href="${telLink(ctx.business.phone)}" style="color:var(--color-accent);text-decoration:none;font-weight:600;">${esc(ctx.business.phone)}</a></p>
      ${ctx.business.email ? `<p><a href="mailto:${esc(ctx.business.email)}" style="color:var(--color-accent);text-decoration:none;">${esc(ctx.business.email)}</a></p>` : ''}
    </div>
    <div style="border-radius:var(--radius-lg,12px);overflow:hidden;min-height:300px;">
      ${embedUrl ? `<iframe src="${esc(embedUrl)}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` : `<div style="height:300px;background:var(--color-surface,#eee);display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);">Harita</div>`}
    </div>
  </div>
</section>`
}

function mapStaticImage(ctx: SectionCtx): string {
  const { title, address } = ctx.content as Record<string, any>
  const addr = address || ctx.business.address
  return sectionWrap('harita', `${sectionTitle(title || 'Konumumuz')}
    <div style="background:var(--color-surface,#eee);border-radius:var(--radius-lg,12px);padding:48px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:16px;">&#x1F4CD;</div>
      <p style="color:var(--color-text);font-size:1.1rem;font-weight:600;margin-bottom:8px;">${esc(addr)}</p>
      <a href="${telLink(ctx.business.phone)}" style="color:var(--color-accent);text-decoration:none;">${esc(ctx.business.phone)}</a>
    </div>`)
}

// ═══════════════════════════════════════════
// 17. PHILOSOPHY (2 variants)
// ═══════════════════════════════════════════

function philosophyFullWidthQuote(ctx: SectionCtx): string {
  const { quote, author, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="felsefemiz" style="position:relative;padding:120px 24px;text-align:center;${backgroundImage ? `background:url('${esc(backgroundImage)}') center/cover;` : 'background:var(--color-surface,#f8f8f8);'}">
  ${backgroundImage ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>' : ''}
  <div style="position:relative;z-index:2;max-width:800px;margin:0 auto;">
    <div style="font-size:5rem;color:${backgroundImage ? 'rgba(255,255,255,0.3)' : 'var(--color-accent)'};line-height:1;margin-bottom:16px;">&ldquo;</div>
    <p style="font-family:var(--font-heading);font-size:clamp(1.3rem,3vw,2rem);color:${backgroundImage ? '#fff' : 'var(--color-text)'};line-height:1.5;font-style:italic;margin-bottom:24px;">${esc(quote)}</p>
    ${author ? `<span style="color:${backgroundImage ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)'};font-size:1rem;">— ${esc(author)}</span>` : ''}
  </div>
</section>`
}

function philosophySplitQuote(ctx: SectionCtx): string {
  const { quote, author, backgroundImage } = ctx.content as Record<string, any>
  return `<section id="felsefemiz" style="display:grid;grid-template-columns:1fr 1fr;min-height:500px;overflow:hidden;">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:60px 48px;">
    <div style="font-size:4rem;color:var(--color-accent);line-height:1;margin-bottom:16px;">&ldquo;</div>
    <p style="font-family:var(--font-heading);font-size:clamp(1.2rem,2.5vw,1.8rem);color:var(--color-text);line-height:1.5;font-style:italic;margin-bottom:24px;">${esc(quote)}</p>
    ${author ? `<span style="color:var(--color-text-secondary);">— ${esc(author)}</span>` : ''}
  </div>
  ${backgroundImage ? `<div style="background:url('${esc(backgroundImage)}') center/cover;"></div>` : '<div style="background:var(--color-surface,#f8f8f8);"></div>'}
</section>`
}

// ═══════════════════════════════════════════
// 18. BRANDS / LOGOS (2 variants)
// ═══════════════════════════════════════════

function brandsLogosRow(ctx: SectionCtx): string {
  const { title, logos = [] } = ctx.content as Record<string, any>
  const items = (logos as any[]).map(l => `
    <div style="flex:0 0 auto;filter:grayscale(100%);opacity:0.6;transition:all 0.3s;" onmouseenter="this.style.filter='none';this.style.opacity='1'" onmouseleave="this.style.filter='grayscale(100%)';this.style.opacity='0.6'">
      ${l.imageUrl ? `<img src="${esc(l.imageUrl)}" alt="${esc(l.name)}" style="height:40px;object-fit:contain;">` : `<span style="font-size:0.9rem;color:var(--color-text-secondary);">${esc(l.name)}</span>`}
    </div>`).join('')
  return sectionWrap('markalar', `${title ? sectionTitle(title) : ''}<div style="display:flex;justify-content:center;align-items:center;gap:40px;flex-wrap:wrap;">${items}</div>`)
}

function brandsLogosMarquee(ctx: SectionCtx): string {
  const { title, logos = [] } = ctx.content as Record<string, any>
  const items = (logos as any[]).map(l => `
    <div style="flex:0 0 auto;margin:0 32px;">
      ${l.imageUrl ? `<img src="${esc(l.imageUrl)}" alt="${esc(l.name)}" style="height:36px;object-fit:contain;filter:grayscale(100%);opacity:0.5;">` : `<span style="color:var(--color-text-secondary);white-space:nowrap;">${esc(l.name)}</span>`}
    </div>`).join('')
  return `<section id="markalar" style="padding:40px 0;overflow:hidden;">
  ${title ? `<div style="padding:0 24px;">${sectionTitle(title)}</div>` : ''}
  <div style="display:flex;align-items:center;animation:marquee 25s linear infinite;">
    ${items}${items}
  </div>
  <style>@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>
</section>`
}

// ═══════════════════════════════════════════
// 19. PROMOTIONS (2 variants)
// ═══════════════════════════════════════════

function promotionsCarousel(ctx: SectionCtx): string {
  const { promotions = [] } = ctx.content as Record<string, any>
  const items = (promotions as any[]).map(p => `
    <div style="flex:0 0 100%;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:var(--radius-lg,12px);overflow:hidden;background:var(--color-accent);">
      ${p.image ? `<div style="background:url('${esc(p.image)}') center/cover;min-height:300px;"></div>` : '<div style="background:rgba(255,255,255,0.1);min-height:300px;"></div>'}
      <div style="padding:40px;display:flex;flex-direction:column;justify-content:center;">
        ${p.badge ? `<span style="display:inline-block;width:fit-content;padding:4px 12px;background:rgba(255,255,255,0.2);color:#fff;border-radius:4px;font-size:0.85rem;margin-bottom:12px;">${esc(p.badge)}</span>` : ''}
        <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:#fff;margin-bottom:8px;">${esc(p.title)}</h3>
        ${p.description ? `<p style="color:rgba(255,255,255,0.8);line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>
    </div>`).join('')
  return sectionWrap('kampanyalar', `<div style="overflow:hidden;"><div style="display:flex;">${items}</div></div>`)
}

function promotionsGrid(ctx: SectionCtx): string {
  const { promotions = [] } = ctx.content as Record<string, any>
  const items = (promotions as any[]).map(p => `
    <div style="border-radius:var(--radius-lg,12px);overflow:hidden;background:var(--color-surface,#f8f8f8);position:relative;">
      ${p.image ? `<div style="height:200px;background:url('${esc(p.image)}') center/cover;"></div>` : ''}
      ${p.badge ? `<span style="position:absolute;top:12px;right:12px;padding:6px 14px;background:var(--color-accent);color:#fff;border-radius:4px;font-size:0.85rem;font-weight:600;">${esc(p.badge)}</span>` : ''}
      <div style="padding:20px;">
        <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(p.title)}</h3>
        ${p.description ? `<p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>
    </div>`).join('')
  return sectionWrap('kampanyalar', `${sectionTitle('Kampanyalar')}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;">${items}</div>`)
}

// ═══════════════════════════════════════════
// 20. EMERGENCY BANNER (2 variants)
// ═══════════════════════════════════════════

function emergencyBannerTopBar(ctx: SectionCtx): string {
  const { title, phone } = ctx.content as Record<string, any>
  const tel = phone || ctx.business.phone
  return `<div id="acil-servis" style="background:#dc2626;padding:12px 24px;text-align:center;position:sticky;top:0;z-index:60;">
  <a href="${telLink(tel)}" style="color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem;">
    ${esc(title || 'ACİL SERVİS')} — ${esc(tel)}
  </a>
</div>`
}

function emergencyBannerFullWidth(ctx: SectionCtx): string {
  const { title, subtitle, phone } = ctx.content as Record<string, any>
  const tel = phone || ctx.business.phone
  return `<section id="acil-servis" style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:48px 24px;text-align:center;">
  <div style="max-width:var(--container-default,1200px);margin:0 auto;">
    <div style="font-size:3rem;margin-bottom:16px;animation:pulse 2s infinite;">&#9888;</div>
    <h2 style="font-family:var(--font-heading);font-size:clamp(1.5rem,4vw,2.5rem);color:#fff;margin-bottom:12px;">${esc(title || '7/24 Acil Servis')}</h2>
    ${subtitle ? `<p style="color:rgba(255,255,255,0.85);margin-bottom:20px;">${esc(subtitle)}</p>` : ''}
    <a href="${telLink(tel)}" style="display:inline-block;padding:16px 40px;background:#fff;color:#dc2626;border-radius:var(--radius-md,8px);font-weight:700;text-decoration:none;font-size:1.2rem;">${esc(tel)}</a>
  </div>
  <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}</style>
</section>`
}

// ═══════════════════════════════════════════
// 21. SOCIAL PROOF (2 variants)
// ═══════════════════════════════════════════

function socialProofLogoRow(ctx: SectionCtx): string {
  const { title, items = [] } = ctx.content as Record<string, any>
  const logos = (items as any[]).map(it => `
    <div style="display:flex;align-items:center;gap:12px;">
      ${it.logo ? `<img src="${esc(it.logo)}" alt="${esc(it.title)}" style="height:48px;object-fit:contain;">` : ''}
      <span style="color:var(--color-text);font-weight:600;font-size:0.9rem;">${esc(it.title)}</span>
    </div>`).join('')
  return sectionWrap('basinodulleri', `${sectionTitle(title || 'Basında Biz')}<div style="display:flex;justify-content:center;align-items:center;gap:40px;flex-wrap:wrap;">${logos}</div>`)
}

function socialProofCards(ctx: SectionCtx): string {
  const { title, items = [] } = ctx.content as Record<string, any>
  const cards = (items as any[]).map(it => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:28px;text-align:center;">
      ${it.logo ? `<img src="${esc(it.logo)}" alt="${esc(it.title)}" style="height:48px;margin-bottom:16px;object-fit:contain;">` : ''}
      <h4 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:4px;">${esc(it.title)}</h4>
    </div>`).join('')
  return sectionWrap('basinodulleri', `${sectionTitle(title || 'Ödüller & Sertifikalar')}<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;">${cards}</div>`)
}

// ═══════════════════════════════════════════
// 22. BLOG PREVIEW (3 variants)
// ═══════════════════════════════════════════

function blogPreviewCardGrid(ctx: SectionCtx): string {
  const { title, ctaText, ctaHref } = ctx.content as Record<string, any>
  const placeholder = Array.from({ length: 3 }, (_, i) => `
    <div style="background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);overflow:hidden;">
      <div style="height:180px;background:var(--color-border,#e5e7eb);"></div>
      <div style="padding:20px;">
        <span style="font-size:0.8rem;color:var(--color-text-secondary);">Blog Yazısı ${i + 1}</span>
        <h4 style="font-family:var(--font-heading);color:var(--color-text);margin:8px 0;">Yakında...</h4>
        <p style="color:var(--color-text-secondary);font-size:0.9rem;">Bu alan blog yazılarınız ile dolacak.</p>
      </div>
    </div>`).join('')
  return sectionWrap('blog', `${sectionTitle(title || 'Blog')}<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">${placeholder}</div>
    ${ctaText ? `<div style="text-align:center;margin-top:32px;"><a href="${esc(ctaHref || '#')}" style="color:var(--color-accent);text-decoration:none;font-weight:600;">${esc(ctaText)} &rarr;</a></div>` : ''}`)
}

function blogPreviewList(ctx: SectionCtx): string {
  const { title, ctaText, ctaHref } = ctx.content as Record<string, any>
  const placeholder = Array.from({ length: 3 }, (_, i) => `
    <div style="display:flex;gap:20px;padding:20px 0;border-bottom:1px solid var(--color-border,#e5e7eb);">
      <div style="flex:0 0 120px;height:90px;border-radius:var(--radius-md,8px);background:var(--color-surface,#eee);"></div>
      <div>
        <span style="font-size:0.8rem;color:var(--color-text-secondary);">Blog</span>
        <h4 style="font-family:var(--font-heading);color:var(--color-text);margin:4px 0;">Yazı Başlığı ${i + 1}</h4>
        <p style="color:var(--color-text-secondary);font-size:0.85rem;">Kısa açıklama burada yer alacak...</p>
      </div>
    </div>`).join('')
  return sectionWrap('blog', `${sectionTitle(title || 'Blog', undefined, 'left')}<div>${placeholder}</div>
    ${ctaText ? `<div style="margin-top:24px;"><a href="${esc(ctaHref || '#')}" style="color:var(--color-accent);text-decoration:none;font-weight:600;">${esc(ctaText)} &rarr;</a></div>` : ''}`)
}

function blogPreviewFeatured(ctx: SectionCtx): string {
  const { title } = ctx.content as Record<string, any>
  return sectionWrap('blog', `${sectionTitle(title || 'Blog')}
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;min-height:400px;">
      <div style="background:var(--color-surface,#eee);border-radius:var(--radius-lg,12px);padding:32px;display:flex;flex-direction:column;justify-content:flex-end;">
        <span style="font-size:0.8rem;color:var(--color-text-secondary);">Öne Çıkan</span>
        <h3 style="font-family:var(--font-heading);color:var(--color-text);margin:8px 0;">Ana Yazı Başlığı</h3>
        <p style="color:var(--color-text-secondary);font-size:0.9rem;">Bu alan blog yazılarınız ile dolacak.</p>
      </div>
      <div style="display:grid;gap:24px;">
        <div style="background:var(--color-surface,#eee);border-radius:var(--radius-lg,12px);padding:20px;">
          <h4 style="font-family:var(--font-heading);color:var(--color-text);">Yazı 2</h4>
        </div>
        <div style="background:var(--color-surface,#eee);border-radius:var(--radius-lg,12px);padding:20px;">
          <h4 style="font-family:var(--font-heading);color:var(--color-text);">Yazı 3</h4>
        </div>
      </div>
    </div>`)
}

// ═══════════════════════════════════════════
// 23. NEWSLETTER (2 variants)
// ═══════════════════════════════════════════

function newsletterInline(ctx: SectionCtx): string {
  const { title, subtitle, placeholder, submitText } = ctx.content as Record<string, any>
  return sectionWrap('bulten', `
    <div style="text-align:center;max-width:600px;margin:0 auto;">
      <h2 style="font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2rem);color:var(--color-text);margin-bottom:8px;">${esc(title || 'Bültenimize Abone Olun')}</h2>
      ${subtitle ? `<p style="color:var(--color-text-secondary);margin-bottom:24px;">${esc(subtitle)}</p>` : ''}
      <div style="display:flex;gap:8px;">
        <input type="email" placeholder="${esc(placeholder || 'E-posta adresiniz')}" style="flex:1;padding:12px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);font-size:1rem;">
        <button style="padding:12px 24px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;">${esc(submitText || 'Abone Ol')}</button>
      </div>
    </div>`)
}

function newsletterCard(ctx: SectionCtx): string {
  const { title, subtitle, placeholder, submitText } = ctx.content as Record<string, any>
  return sectionWrap('bulten', `
    <div style="max-width:560px;margin:0 auto;background:var(--color-surface,#f8f8f8);border-radius:var(--radius-lg,12px);padding:40px;text-align:center;">
      <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">${esc(title || 'Bültenimize Abone Olun')}</h3>
      ${subtitle ? `<p style="color:var(--color-text-secondary);margin-bottom:20px;font-size:0.95rem;">${esc(subtitle)}</p>` : ''}
      <input type="email" placeholder="${esc(placeholder || 'E-posta adresiniz')}" style="width:100%;padding:12px 16px;border:1px solid var(--color-border,#e5e7eb);border-radius:var(--radius-md,8px);margin-bottom:12px;font-size:1rem;">
      <button style="width:100%;padding:12px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;">${esc(submitText || 'Abone Ol')}</button>
    </div>`)
}

// ═══════════════════════════════════════════
// 24. INSTAGRAM FEED (2 variants)
// ═══════════════════════════════════════════

function instagramFeedGrid3x2(ctx: SectionCtx): string {
  const { title, username, images = [], followText } = ctx.content as Record<string, any>
  const items = (images as any[]).slice(0, 6).map(img => `
    <div style="aspect-ratio:1;border-radius:var(--radius-md,8px);overflow:hidden;background:var(--color-surface,#eee);">
      ${img.url ? `<img src="${esc(img.url)}" alt="" style="width:100%;height:100%;object-fit:cover;" loading="lazy">` : ''}
    </div>`).join('')
  const empty = 6 - Math.min((images as any[]).length, 6)
  const placeholders = Array.from({ length: empty }, () => `<div style="aspect-ratio:1;border-radius:var(--radius-md,8px);background:var(--color-surface,#eee);"></div>`).join('')
  return sectionWrap('instagram', `${sectionTitle(title || 'Instagram', username ? `@${username}` : undefined)}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">${items}${placeholders}</div>
    ${followText ? `<div style="text-align:center;margin-top:24px;"><a href="https://instagram.com/${esc(username)}" target="_blank" style="color:var(--color-accent);text-decoration:none;font-weight:600;">${esc(followText)}</a></div>` : ''}`)
}

function instagramFeedCarousel(ctx: SectionCtx): string {
  const { title, username, images = [], followText } = ctx.content as Record<string, any>
  const items = (images as any[]).map(img => `
    <div style="flex:0 0 250px;aspect-ratio:1;scroll-snap-align:start;border-radius:var(--radius-md,8px);overflow:hidden;">
      ${img.url ? `<img src="${esc(img.url)}" alt="" style="width:100%;height:100%;object-fit:cover;" loading="lazy">` : '<div style="width:100%;height:100%;background:var(--color-surface,#eee);"></div>'}
    </div>`).join('')
  return sectionWrap('instagram', `${sectionTitle(title || 'Instagram', username ? `@${username}` : undefined)}
    <div style="display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:12px;-webkit-overflow-scrolling:touch;">${items}</div>
    ${followText ? `<div style="text-align:center;margin-top:20px;"><a href="https://instagram.com/${esc(username)}" target="_blank" style="color:var(--color-accent);text-decoration:none;font-weight:600;">${esc(followText)}</a></div>` : ''}`)
}

// ═══════════════════════════════════════════
// 25. WHATSAPP CTA (2 variants)
// ═══════════════════════════════════════════

function whatsappCtaFloating(ctx: SectionCtx): string {
  const { phone, message } = ctx.content as Record<string, any>
  const tel = phone || ctx.business.phone
  return `<a href="${waLink(tel, message)}" target="_blank" id="whatsapp-cta" style="position:fixed;bottom:24px;right:24px;z-index:70;width:60px;height:60px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.15);text-decoration:none;color:#fff;font-size:1.8rem;" title="WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.518 5.838L0 24l6.336-1.662C8.065 23.434 9.987 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.855 0-3.63-.494-5.19-1.432l-.372-.22-3.858 1.012 1.03-3.764-.242-.385C2.347 15.408 1.818 13.744 1.818 12 1.818 6.38 6.38 1.818 12 1.818S22.182 6.38 22.182 12 17.62 21.818 12 21.818z"/></svg>
</a>`
}

function whatsappCtaBanner(ctx: SectionCtx): string {
  const { phone, message, label } = ctx.content as Record<string, any>
  const tel = phone || ctx.business.phone
  return `<div id="whatsapp-cta" style="background:#25D366;padding:16px 24px;text-align:center;">
  <a href="${waLink(tel, message)}" target="_blank" style="color:#fff;text-decoration:none;font-weight:600;font-size:1rem;display:inline-flex;align-items:center;gap:8px;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.518 5.838L0 24l6.336-1.662C8.065 23.434 9.987 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.855 0-3.63-.494-5.19-1.432l-.372-.22-3.858 1.012 1.03-3.764-.242-.385C2.347 15.408 1.818 13.744 1.818 12 1.818 6.38 6.38 1.818 12 1.818S22.182 6.38 22.182 12 17.62 21.818 12 21.818z"/></svg>
    ${esc(label || 'WhatsApp ile İletişime Geçin')}
  </a>
</div>`
}

// ═══════════════════════════════════════════
// 26. COOKIE BANNER (2 variants)
// ═══════════════════════════════════════════

function cookieBannerBottomBar(ctx: SectionCtx): string {
  const { text, acceptText, detailsLink } = ctx.content as Record<string, any>
  const uid = `cb-${Math.random().toString(36).slice(2, 8)}`
  return `<div id="${uid}" style="position:fixed;bottom:0;left:0;right:0;z-index:80;background:var(--color-bg,#fff);border-top:1px solid var(--color-border,#e5e7eb);padding:16px 24px;display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;box-shadow:0 -2px 10px rgba(0,0,0,0.05);">
  <p style="color:var(--color-text-secondary);font-size:0.9rem;margin:0;">${esc(text || 'Bu site çerez kullanmaktadır.')} ${detailsLink ? `<a href="${esc(detailsLink)}" style="color:var(--color-accent);text-decoration:underline;">Detaylar</a>` : ''}</p>
  <button onclick="document.getElementById('${uid}').style.display='none'" style="padding:8px 20px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;font-size:0.85rem;">${esc(acceptText || 'Kabul Et')}</button>
</div>`
}

function cookieBannerModal(ctx: SectionCtx): string {
  const { text, acceptText, detailsLink } = ctx.content as Record<string, any>
  const uid = `cm-${Math.random().toString(36).slice(2, 8)}`
  return `<div id="${uid}" style="position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);">
  <div style="background:var(--color-bg,#fff);border-radius:var(--radius-lg,12px);padding:32px;max-width:420px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.15);">
    <div style="font-size:2rem;margin-bottom:12px;">&#x1F36A;</div>
    <h3 style="font-family:var(--font-heading);color:var(--color-text);margin-bottom:8px;">Çerez Politikası</h3>
    <p style="color:var(--color-text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:20px;">${esc(text || 'Bu site deneyiminizi iyileştirmek için çerez kullanmaktadır.')} ${detailsLink ? `<a href="${esc(detailsLink)}" style="color:var(--color-accent);text-decoration:underline;">Detaylar</a>` : ''}</p>
    <div style="display:flex;gap:12px;justify-content:center;">
      <button onclick="document.getElementById('${uid}').style.display='none'" style="padding:10px 24px;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md,8px);font-weight:600;cursor:pointer;">${esc(acceptText || 'Kabul Et')}</button>
      <button onclick="document.getElementById('${uid}').style.display='none'" style="padding:10px 24px;border:1px solid var(--color-border,#e5e7eb);background:none;border-radius:var(--radius-md,8px);cursor:pointer;color:var(--color-text-secondary);">Reddet</button>
    </div>
  </div>
</div>`
}

// ═══════════════════════════════════════════
// REGISTRY — maps (sectionType, variant) → generator
// ═══════════════════════════════════════════

const GENERATORS: Record<string, Record<string, Generator>> = {
  hero: {
    fullscreen_overlay: heroFullscreenOverlay,
    split_left: heroSplitLeft,
    video_cinematic: heroVideoCinematic,
    fullscreen_kenburns: heroFullscreenKenburns,
    search_centric: heroSearchCentric,
    fullscreen_single: heroFullscreenSingle,
    fullscreen_slider: heroFullscreenSlider,
    image_card: heroImageCard,
    promo_carousel: heroPromoCarousel,
    warm_image: heroWarmImage,
    soft_carousel: heroSoftCarousel,
  },
  services: {
    card_grid: servicesCardGrid,
    filtered_tabs: servicesFilteredTabs,
    hover_reveal: servicesHoverReveal,
    pricing_accordion: servicesPricingAccordion,
    visual_cards: servicesVisualCards,
    sticky_scroll: servicesStickyScroll,
    editorial_zigzag: servicesEditorialZigzag,
  },
  about: {
    split_left: aboutSplitLeft,
    split_right: aboutSplitRight,
    full_story: aboutFullStory,
    values_grid: aboutValuesGrid,
  },
  contact: {
    simple_form: contactSimpleForm,
    split_form_map: contactSplitFormMap,
    full_width: contactFullWidth,
  },
  testimonials: {
    carousel: testimonialsCarousel,
    grid_cards: testimonialsGridCards,
    editorial_single: testimonialsEditorialSingle,
    marquee: testimonialsMarquee,
    with_photo: testimonialsWithPhoto,
  },
  gallery: {
    simple_grid: gallerySimpleGrid,
    masonry: galleryMasonry,
    horizontal_snap: galleryHorizontalSnap,
    filterable_masonry: galleryFilterableMasonry,
    asymmetric_editorial: galleryAsymmetricEditorial,
  },
  faq: {
    accordion: faqAccordion,
    two_column: faqTwoColumn,
    with_search: faqWithSearch,
  },
  footer: {
    minimal: footerMinimal,
    warm_columns: footerWarmColumns,
    dark_columns: footerDarkColumns,
    luxury_minimal: footerLuxuryMinimal,
    corporate_mega: footerCorporateMega,
  },
  header: {
    minimal_sticky: headerMinimalSticky,
    warm_medical: headerWarmMedical,
    dark_glass: headerDarkGlass,
    luxury_centered: headerLuxuryCentered,
    dark_industrial: headerDarkIndustrial,
    corporate_mega: headerCorporateMega,
    modern_app: headerModernApp,
    overlay_menu: headerOverlayMenu,
    dual_bar: headerDualBar,
  },
  stats: {
    animated_row: statsAnimatedRow,
    dark_bar: statsDarkBar,
    gradient_bar: statsGradientBar,
  },
  cta: {
    full_width_banner: ctaFullWidthBanner,
    split_card: ctaSplitCard,
    floating_bar: ctaFloatingBar,
  },
  team: {
    card_horizontal: teamCardHorizontal,
    carousel: teamCarousel,
    full_page_snap: teamFullPageSnap,
    mono_to_color: teamMonoToColor,
    filterable_grid: teamFilterableGrid,
  },
  pricing: {
    columns: pricingColumns,
    comparison: pricingComparison,
    toggle: pricingToggle,
  },
  process_steps: {
    horizontal_timeline: processStepsHorizontalTimeline,
    vertical_timeline: processStepsVerticalTimeline,
    numbered_cards: processStepsNumberedCards,
  },
  working_hours: {
    compact: workingHoursCompact,
    card: workingHoursCard,
    side_panel: workingHoursSidePanel,
  },
  map: {
    full_width: mapFullWidth,
    split_info: mapSplitInfo,
    static_image: mapStaticImage,
  },
  philosophy: {
    full_width_quote: philosophyFullWidthQuote,
    split_quote: philosophySplitQuote,
  },
  brands_logos: {
    row: brandsLogosRow,
    marquee: brandsLogosMarquee,
  },
  promotions: {
    carousel: promotionsCarousel,
    grid: promotionsGrid,
  },
  emergency_banner: {
    top_bar: emergencyBannerTopBar,
    full_width: emergencyBannerFullWidth,
  },
  social_proof: {
    logo_row: socialProofLogoRow,
    cards: socialProofCards,
  },
  blog_preview: {
    card_grid: blogPreviewCardGrid,
    list: blogPreviewList,
    featured: blogPreviewFeatured,
  },
  newsletter: {
    inline: newsletterInline,
    card: newsletterCard,
  },
  instagram_feed: {
    grid_3x2: instagramFeedGrid3x2,
    carousel: instagramFeedCarousel,
  },
  whatsapp_cta: {
    floating: whatsappCtaFloating,
    banner: whatsappCtaBanner,
  },
  cookie_banner: {
    bottom_bar: cookieBannerBottomBar,
    modal: cookieBannerModal,
  },
}

// Default variant per section type
const DEFAULT_VARIANTS: Record<string, string> = {
  hero: 'fullscreen_overlay',
  services: 'card_grid',
  about: 'split_left',
  contact: 'simple_form',
  testimonials: 'carousel',
  gallery: 'simple_grid',
  faq: 'accordion',
  footer: 'minimal',
  header: 'minimal_sticky',
  stats: 'dark_bar',
  cta: 'full_width_banner',
  team: 'card_horizontal',
  pricing: 'columns',
  process_steps: 'horizontal_timeline',
  working_hours: 'compact',
  map: 'full_width',
  philosophy: 'full_width_quote',
  brands_logos: 'row',
  promotions: 'grid',
  emergency_banner: 'top_bar',
  social_proof: 'logo_row',
  blog_preview: 'card_grid',
  newsletter: 'inline',
  instagram_feed: 'grid_3x2',
  whatsapp_cta: 'floating',
  cookie_banner: 'bottom_bar',
}

// ═══════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════

/**
 * Generate HTML for a section type + variant.
 * Falls back to default variant if the requested one is not found.
 */
export function generateSection(
  sectionType: string,
  variant: string,
  ctx: SectionCtx,
): string {
  const typeGenerators = GENERATORS[sectionType]
  if (!typeGenerators) return `<!-- unknown section: ${sectionType} -->`

  const gen = typeGenerators[variant] || typeGenerators[DEFAULT_VARIANTS[sectionType] || 'default']
  if (!gen) return `<!-- unknown variant: ${sectionType}::${variant} -->`

  return gen({ ...ctx, variant })
}

/** List all registered section types */
export function getRegisteredTypes(): string[] {
  return Object.keys(GENERATORS)
}

/** List variants for a section type */
export function getRegisteredVariants(sectionType: string): string[] {
  return Object.keys(GENERATORS[sectionType] || {})
}

/** Export generators map for testing */
export { GENERATORS, DEFAULT_VARIANTS }
