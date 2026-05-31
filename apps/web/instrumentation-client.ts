/**
 * Sentry Client Instrumentation — Next.js Browser
 *
 * KVKK hassas veri filtreleme + replay + ad blocker bypass
 */

import * as Sentry from '@sentry/nextjs'

const SENSITIVE_FIELDS = [
  'identityNumber', 'iban', 'cardNumber', 'cvv', 'tcKimlik',
  'password', 'token', 'secret', 'creditCard',
]

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,

  // KVKK — hassas veri sansürleme
  beforeSend(event) {
    if (event.request?.data && typeof event.request.data === 'object') {
      for (const field of SENSITIVE_FIELDS) {
        if (field in (event.request.data as Record<string, unknown>)) {
          (event.request.data as Record<string, unknown>)[field] = '[REDACTED]'
        }
      }
    }
    return event
  },

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
})
