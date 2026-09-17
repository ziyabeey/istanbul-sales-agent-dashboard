/**
 * KC-03: canonical public business slug derivation.
 *
 * Mirrors the Randevu worker `slugify` (NFKD, Turkish letter folding,
 * `[a-z0-9-]`, max 60) so a legacy Kepenk tenant lands on the same slug
 * shape Randevu produces. Reserved names cover the platform hostnames and
 * product surfaces until DOMAIN-01 fixes the canonical list; a reserved or
 * invalid slug fails closed and is reported, never silently renamed.
 */
export const CORE_SLUG_MAX_LENGTH = 60
export const CORE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const CORE_RESERVED_SLUGS: ReadonlySet<string> = new Set([
  'www', 'api', 'app', 'admin', 'manage', 'edit', 'destek', 'auth', 'login', 'giris',
  'randevu', 'kepenk', 'kolayapp', 'static', 'assets', 'cdn', 'mail', 'smtp', 'ftp',
  'm', 'blog', 'docs', 'status', 'health', 'test', 'staging', 'dev', 'demo',
])

export function slugifyBusinessName(value: string): string {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, CORE_SLUG_MAX_LENGTH)
    .replace(/-+$/g, '')
}

export type SlugDecision =
  | { ok: true; slug: string; source: 'existing' | 'derived' }
  | { ok: false; reason: 'invalid' | 'reserved'; candidate: string }

/** Prefer an existing legacy slug when it is already canonical; otherwise derive from the name. */
export function decideBusinessSlug(input: { existingSlug?: string | null; name: string }): SlugDecision {
  const existing = typeof input.existingSlug === 'string' ? input.existingSlug.trim().toLowerCase() : ''
  const candidate = existing && CORE_SLUG_RE.test(existing) && existing.length <= CORE_SLUG_MAX_LENGTH
    ? { slug: existing, source: 'existing' as const }
    : { slug: slugifyBusinessName(input.name), source: 'derived' as const }
  if (!candidate.slug || !CORE_SLUG_RE.test(candidate.slug)) return { ok: false, reason: 'invalid', candidate: candidate.slug }
  if (CORE_RESERVED_SLUGS.has(candidate.slug)) return { ok: false, reason: 'reserved', candidate: candidate.slug }
  return { ok: true, ...candidate }
}
