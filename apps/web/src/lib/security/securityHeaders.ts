/**
 * Security Headers + CSRF Protection
 * ─────────────────────────────────────
 * Applied via Next.js middleware or response helpers
 */

export const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',  // Deprecated — CSP is sufficient
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(self), microphone=(), geolocation=(self), payment=(self)',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' https://apis.google.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.kepenk.ai https://firestore.googleapis.com",
    "frame-src https://js.iyzipay.com",
  ].join('; '),
}

/** Apply security headers to a Response */
export function applySecurityHeaders(response: Response): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

/* ═══════ CORS Configuration ═══════ */

export const CORS_CONFIG = {
  allowedOrigins: [
    'https://dashboard.kepenk.ai',
    /^https:\/\/.*\.kepenk\.site$/,  // Esnaf subdomains
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'X-CSRF-Token', 'X-Kepenk-API-Key'],
  credentials: true,
  maxAge: 86400,  // 24h preflight cache
}

export function isOriginAllowed(origin: string): boolean {
  return CORS_CONFIG.allowedOrigins.some(allowed =>
    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
  )
}

/* ═══════ CSRF Protection — Double Submit Cookie ═══════ */

export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
}

export function validateCSRFToken(cookieToken: string, headerToken: string): boolean {
  if (!cookieToken || !headerToken) return false
  // Constant-time comparison to prevent timing attacks
  if (cookieToken.length !== headerToken.length) return false
  let result = 0
  for (let i = 0; i < cookieToken.length; i++) {
    result |= cookieToken.charCodeAt(i) ^ headerToken.charCodeAt(i)
  }
  return result === 0
}

/* ═══════ Cookie Configuration ═══════ */

export const COOKIE_CONFIG = {
  refreshToken: {
    name: 'kpnk_rt',
    httpOnly: true,
    secure: true,
    sameSite: 'Strict' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/api/v1/auth',
  },
  csrf: {
    name: 'kpnk_csrf',
    httpOnly: true,
    secure: true,
    sameSite: 'Strict' as const,
    path: '/',
  },
  session: {
    name: 'kpnk_sid',
    httpOnly: true,
    secure: true,
    sameSite: 'Lax' as const,
    maxAge: 12 * 60 * 60, // 12 hours
    path: '/',
  },
}
