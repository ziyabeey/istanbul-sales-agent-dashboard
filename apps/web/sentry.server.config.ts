/**
 * Sentry Server Config — Cloud Run / Cloud Functions
 *
 * Payment errors → always captured
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,

  // Payment errors → 100% capture
  beforeSend(event) {
    if (event.tags?.module === 'payment') {
      return event
    }
    return event
  },
})
