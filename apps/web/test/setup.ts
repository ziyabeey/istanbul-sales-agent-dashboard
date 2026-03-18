/**
 * Test Setup — Global mocks, Firebase emulator, cleanup
 */
import { vi, beforeAll, afterAll, afterEach } from 'vitest'

// ─── Mock Next.js modules ───
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: ResponseInit) => {
      const status = (init as any)?.status || 200
      return { json: async () => body, status, ok: status < 400, body }
    },
    redirect: (url: string) => ({ url, status: 307 }),
  },
  NextRequest: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
  headers: () => new Map(),
}))

// ─── Mock Firebase Admin ───
const mockFirestoreDoc = {
  exists: true,
  id: 'test-id',
  data: () => ({}),
  ref: { update: vi.fn(), delete: vi.fn(), set: vi.fn() },
}

const mockCollection = {
  doc: vi.fn(() => ({
    get: vi.fn(async () => mockFirestoreDoc),
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    collection: vi.fn(() => mockCollection),
  })),
  where: vi.fn(() => mockCollection),
  orderBy: vi.fn(() => mockCollection),
  limit: vi.fn(() => mockCollection),
  get: vi.fn(async () => ({ docs: [], empty: true, size: 0 })),
  count: vi.fn(() => ({ get: vi.fn(async () => ({ data: () => ({ count: 0 }) })) })),
}

vi.mock('@/lib/firebaseAdmin', () => ({
  adminDb: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({ set: vi.fn(), update: vi.fn(), delete: vi.fn(), commit: vi.fn() })),
  },
}))

// ─── Mock Session Manager ───
vi.mock('@/lib/sessionManager', () => ({
  oturumDogrulaServer: vi.fn(async () => 'test-esnaf-id'),
}))

// ─── Mock uuid ───
vi.mock('uuid', () => ({
  v4: () => 'test-uuid-' + Math.random().toString(36).slice(2, 8),
}))

// ─── Global cleanup ───
afterEach(() => {
  vi.clearAllMocks()
})

// Export mocks for test access
export { mockFirestoreDoc, mockCollection }
