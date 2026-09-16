import { z } from 'zod'
import { CoreAuthError } from './errors'

/**
 * KC-02: server-side GoTrue (Supabase Auth) adapter.
 *
 * Every call runs on the Kepenk server with the project anon key. Tokens are
 * returned to the BFF session layer only; the browser never receives them.
 */
export const SupabaseSessionSchema = z.object({
  access_token: z.string().min(20),
  refresh_token: z.string().min(10),
  expires_in: z.number().int().positive(),
  token_type: z.string().optional(),
  user: z.object({
    id: z.string().uuid(),
    phone: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  }),
})
export type SupabaseSession = z.infer<typeof SupabaseSessionSchema>

export interface SupabaseAuthOptions {
  supabaseUrl: string
  anonKey: string
  fetch?: typeof fetch
  timeoutMs?: number
}

/** Turkish mobile number to E.164 (+90 5XX XXX XX XX). Returns null when not a TR mobile. */
export function toTurkishE164(input: string): string | null {
  const digits = String(input ?? '').replace(/\D/g, '')
  let national = digits
  if (national.startsWith('0090')) national = national.slice(4)
  else if (national.startsWith('90') && national.length === 12) national = national.slice(2)
  else if (national.startsWith('0') && national.length === 11) national = national.slice(1)
  if (!/^5[0-9]{9}$/.test(national)) return null
  return `+90${national}`
}

export class SupabaseAuthClient {
  private readonly fetchImpl: typeof fetch
  private readonly timeoutMs: number

  constructor(private readonly options: SupabaseAuthOptions) {
    this.fetchImpl = options.fetch ?? fetch
    this.timeoutMs = options.timeoutMs ?? 10_000
  }

  private async call(path: string, body: Record<string, unknown> | null, bearer?: string): Promise<{ status: number; json: unknown }> {
    const url = `${this.options.supabaseUrl}/auth/v1/${path}`
    let response: Response
    try {
      response = await this.fetchImpl(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: this.options.anonKey,
          authorization: `Bearer ${bearer ?? this.options.anonKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(this.timeoutMs),
      })
    } catch (cause) {
      throw new CoreAuthError('AUTH_UNAVAILABLE', { cause })
    }
    let json: unknown = null
    try {
      json = await response.json()
    } catch {
      json = null
    }
    return { status: response.status, json }
  }

  private static failure(status: number, fallback: CoreAuthError['code']): CoreAuthError {
    if (status === 429) return new CoreAuthError('RATE_LIMITED', { status })
    if (status >= 500) return new CoreAuthError('AUTH_UNAVAILABLE', { status })
    return new CoreAuthError(fallback, { status })
  }

  async sendPhoneOtp(phoneE164: string): Promise<void> {
    const { status } = await this.call('otp', { phone: phoneE164, channel: 'sms', create_user: true })
    if (status >= 200 && status < 300) return
    throw SupabaseAuthClient.failure(status, 'OTP_SEND_FAILED')
  }

  async verifyPhoneOtp(phoneE164: string, token: string): Promise<SupabaseSession> {
    const { status, json } = await this.call('verify', { type: 'sms', phone: phoneE164, token })
    if (status < 200 || status >= 300) throw SupabaseAuthClient.failure(status, 'OTP_INVALID')
    const parsed = SupabaseSessionSchema.safeParse(json)
    if (!parsed.success) throw new CoreAuthError('AUTH_UNAVAILABLE', { status })
    return parsed.data
  }

  async signInWithPassword(email: string, password: string): Promise<SupabaseSession> {
    const { status, json } = await this.call('token?grant_type=password', { email, password })
    if (status < 200 || status >= 300) throw SupabaseAuthClient.failure(status, 'CREDENTIALS_INVALID')
    const parsed = SupabaseSessionSchema.safeParse(json)
    if (!parsed.success) throw new CoreAuthError('AUTH_UNAVAILABLE', { status })
    return parsed.data
  }

  async refreshSession(refreshToken: string): Promise<SupabaseSession> {
    const { status, json } = await this.call('token?grant_type=refresh_token', { refresh_token: refreshToken })
    if (status < 200 || status >= 300) throw SupabaseAuthClient.failure(status, 'SESSION_EXPIRED')
    const parsed = SupabaseSessionSchema.safeParse(json)
    if (!parsed.success) throw new CoreAuthError('AUTH_UNAVAILABLE', { status })
    return parsed.data
  }

  /** Best effort: a failed remote logout never keeps a local session alive. */
  async signOut(accessToken: string): Promise<boolean> {
    try {
      const { status } = await this.call('logout', null, accessToken)
      return status >= 200 && status < 300
    } catch {
      return false
    }
  }

  async requestPasswordRecovery(email: string): Promise<void> {
    const { status } = await this.call('recover', { email })
    if (status >= 200 && status < 300) return
    throw SupabaseAuthClient.failure(status, 'AUTH_UNAVAILABLE')
  }
}
