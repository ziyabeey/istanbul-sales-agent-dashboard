/**
 * @kepenk/security — Next.js Security Headers
 */

export const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=(self)' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iyzipay.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://*.googleapis.com https://*.cloudflare.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.anthropic.com https://api.iyzipay.com https://graph.facebook.com https://api.deepgram.com https://*.pinecone.io https://firestore.googleapis.com wss://*.firebaseio.com",
      "frame-src https://cdn.iyzipay.com https://sandbox.iyzipay.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  },
] as const

/** Sensitive fields to redact in Sentry events */
export const SENTRY_REDACT_FIELDS = [
  'identityNumber', 'iban', 'cardNumber', 'cvv', 'tcKimlik',
  'password', 'token', 'secret', 'creditCard',
] as const
