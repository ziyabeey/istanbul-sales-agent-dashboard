/**
 * Firestore Mock Helper — Test ortamı için adminDb mock'u.
 * vi.mock('@/lib/firebaseAdmin') ile kullanılır.
 */
import { vi } from 'vitest'

// In-memory Firestore koleksiyonu
const store: Record<string, Record<string, any>> = {}

function mockDocRef(collection: string, id: string) {
    return {
        get: vi.fn(async () => {
            const data = store[collection]?.[id]
            return {
                exists: !!data,
                data: () => data ? { ...data } : undefined,
                id,
            }
        }),
        set: vi.fn(async (data: any, opts?: any) => {
            if (!store[collection]) store[collection] = {}
            if (opts?.merge) {
                store[collection][id] = { ...(store[collection][id] || {}), ...data }
            } else {
                store[collection][id] = { ...data }
            }
        }),
        update: vi.fn(async (data: any) => {
            if (!store[collection]) store[collection] = {}
            store[collection][id] = { ...(store[collection][id] || {}), ...data }
        }),
        delete: vi.fn(async () => {
            if (store[collection]) delete store[collection][id]
        }),
        collection: vi.fn((subCol: string) => mockCollectionRef(`${collection}/${id}/${subCol}`)),
    }
}

function mockCollectionRef(path: string) {
    return {
        doc: vi.fn((id?: string) => {
            const docId = id || `auto_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
            return mockDocRef(path, docId)
        }),
        add: vi.fn(async (data: any) => {
            const id = `auto_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
            if (!store[path]) store[path] = {}
            store[path][id] = { ...data }
            return { id }
        }),
        where: vi.fn(() => ({
            where: vi.fn().mockReturnThis(),
            select: vi.fn().mockReturnThis(),
            orderBy: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            get: vi.fn(async () => ({
                empty: true,
                size: 0,
                docs: [],
            })),
        })),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        get: vi.fn(async () => ({
            empty: true,
            size: 0,
            docs: [],
        })),
    }
}

export const mockAdminDb = {
    collection: vi.fn((name: string) => mockCollectionRef(name)),
    runTransaction: vi.fn(async (fn: any) => {
        const tx = {
            get: vi.fn(async (ref: any) => ref.get()),
            set: vi.fn(async (ref: any, data: any) => ref.set(data)),
            update: vi.fn(async (ref: any, data: any) => ref.update(data)),
        }
        return fn(tx)
    }),
}

export const mockTimestamp = {
    now: vi.fn(() => ({ seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 })),
    fromDate: vi.fn((d: Date) => ({ seconds: Math.floor(d.getTime() / 1000), nanoseconds: 0 })),
}

export const mockFieldValue = {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    increment: vi.fn((n: number) => `INCREMENT_${n}`),
}

/** Store'u temizle — her test öncesi çağır */
export function resetStore() {
    for (const key of Object.keys(store)) delete store[key]
}
