/** Server rollout gate. Neither setting is public or enabled by default. */
export function isCoreEntryEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.CORE_BFF_ENABLED === 'true' && env.CORE_ENTRY_ENABLED === 'true'
}

export function isCoreEntryPage(pathname: string): boolean {
  return ['/giris', '/baslangic', '/parola-yenile'].includes(pathname.replace(/\/$/, ''))
}

export function isCoreEntryRoute(pathname: string): boolean {
  return isCoreEntryPage(pathname) || pathname.startsWith('/api/core/auth/')
}
