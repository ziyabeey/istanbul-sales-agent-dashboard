const DEV_SESSION_SECRET = 'kepenk-dev-secret-change-in-production-32ch'

export function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || DEV_SESSION_SECRET

  if (process.env.NODE_ENV === 'production' && secret === DEV_SESSION_SECRET) {
    throw new Error('SESSION_SECRET production ortamında zorunludur')
  }

  return new TextEncoder().encode(secret)
}
