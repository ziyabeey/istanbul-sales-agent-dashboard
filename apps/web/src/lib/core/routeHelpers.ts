import { NextResponse } from 'next/server'
import { isSameOriginMutation } from '../apiGuard'
import { isCoreBffEnabled } from './config'
import { getCoreRuntime, type CoreRuntime } from './deps'
import { CoreAuthError, CorePlatformError } from './errors'

/**
 * KC-02: shared route plumbing. The BFF surface is feature-gated and fails
 * closed (404) until CORE_BFF_ENABLED=true and the Supabase connection exists.
 */
export type CoreRouteRuntime = { ok: true; runtime: CoreRuntime } | { ok: false; response: NextResponse }

export function requireCoreRuntime(): CoreRouteRuntime {
  if (!isCoreBffEnabled()) {
    return { ok: false, response: NextResponse.json({ error: 'Not found' }, { status: 404 }) }
  }
  const runtime = getCoreRuntime()
  if (!runtime) {
    return { ok: false, response: NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 }) }
  }
  return { ok: true, runtime }
}

/**
 * Login and recovery entrypoints carry no session yet, so double-submit CSRF
 * cannot apply; they still refuse cross-site POSTs by Origin (KC-02 BFF contract).
 */
export function requireSameOrigin(request: Request): NextResponse | null {
  if (isSameOriginMutation(request)) return null
  return NextResponse.json({ error: 'ORIGIN_REJECTED' }, { status: 403 })
}

export async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

const AUTH_ERROR_STATUS: Record<CoreAuthError['code'], number> = {
  AUTH_UNAVAILABLE: 503,
  OTP_SEND_FAILED: 400,
  OTP_INVALID: 400,
  CREDENTIALS_INVALID: 401,
  RATE_LIMITED: 429,
  SESSION_EXPIRED: 401,
  RECOVERY_REQUIRED: 403,
}

const AUTH_ERROR_MESSAGE: Record<CoreAuthError['code'], string> = {
  AUTH_UNAVAILABLE: 'Kimlik servisi geçici olarak kullanılamıyor',
  OTP_SEND_FAILED: 'Kod gönderilemedi',
  OTP_INVALID: 'Kod hatalı veya süresi dolmuş',
  CREDENTIALS_INVALID: 'E-posta veya parola hatalı',
  RATE_LIMITED: 'Çok fazla deneme, lütfen bekleyin',
  SESSION_EXPIRED: 'Oturum süresi doldu',
  RECOVERY_REQUIRED: 'Önce parolanızı güncelleyin',
}

export function authErrorResponse(error: unknown): NextResponse {
  if (error instanceof CoreAuthError) {
    return NextResponse.json({ error: AUTH_ERROR_MESSAGE[error.code], code: error.code }, { status: AUTH_ERROR_STATUS[error.code] })
  }
  if (error instanceof CorePlatformError) {
    return NextResponse.json({ error: 'Platform servisi geçici olarak kullanılamıyor', code: error.code }, { status: 503 })
  }
  return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
}
