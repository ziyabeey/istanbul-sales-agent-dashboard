/**
 * Global test setup — MSW + fake-indexeddb + cleanup
 */

import 'fake-indexeddb/auto'
import { cleanup } from '@testing-library/react'
import { afterEach, afterAll, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => {
  server.resetHandlers()
  cleanup()
  vi.restoreAllMocks()
})
afterAll(() => server.close())
