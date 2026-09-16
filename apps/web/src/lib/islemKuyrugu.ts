/**
 * İşlem Kuyruğu — Durable webhook/background job adapter.
 *
 * Existing collection name is preserved for migration compatibility, while the
 * job semantics now include idempotency, leases, heartbeats and bounded retry.
 */

import { createHash, randomUUID } from 'node:crypto'
import type { DocumentData, QueryDocumentSnapshot, Transaction } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebaseAdmin'
import {
    DEFAULT_JOB_LEASE_MS,
    DEFAULT_MAX_ATTEMPTS,
    canAttemptJob,
    isLeaseExpired,
    leaseExpiresAt,
    nextRetryAt,
} from '@/lib/jobs/durableJob'

export type IslemTipi = 'whatsapp' | 'instagram_dm' | 'email' | 'site_formu'
export type IslemDurumu = 'bekliyor' | 'isleniyor' | 'tamamlandi' | 'hata'

export interface KuyrukPayload {
    telefon?: string
    mesaj: string
    mediaUrl?: string | null
    mimeType?: string | null
    sessionId?: string
    context?: string
}

export interface KuyrukIslemi {
    jobId: string
    tip: IslemTipi
    durum: IslemDurumu
    esnafId: string | null
    payload: KuyrukPayload
    olusturma: Date
    guncelleme: Date
    islemBaslangic?: Date | null
    islemBitis?: Date | null
    sonuc?: string
    hata?: string
    denemeSayisi: number
    maxDeneme: number
    idempotencyKey?: string | null
    leaseToken?: string | null
    leaseUntil?: Date | null
    heartbeatAt?: Date | null
    nextAttemptAt?: Date | null
    correlationId?: string | null
    causationId?: string | null
}

export interface YeniKuyrukIslemi {
    tip: IslemTipi
    esnafId: string | null
    payload: KuyrukPayload
    sonuc?: string
    hata?: string
}

export interface KuyrukEkleOptions {
    idempotencyKey?: string
    maxAttempts?: number
    correlationId?: string
    causationId?: string
}

export interface IslemLease {
    leaseToken: string
    attempt: number
}

function asDate(value: unknown): Date | null {
    if (!value) return null
    if (value instanceof Date) return value
    if (typeof value === 'object' && value !== null && 'toDate' in value) {
        const candidate = value as { toDate?: () => Date }
        if (typeof candidate.toDate === 'function') return candidate.toDate()
    }
    const parsed = new Date(value as string | number)
    return Number.isNaN(parsed.getTime()) ? null : parsed
}

function normalizedJob(id: string, raw: DocumentData): KuyrukIslemi {
    const createdAt = asDate(raw.olusturma) ?? new Date(0)
    return {
        ...raw,
        jobId: raw.jobId || id,
        denemeSayisi: Number.isInteger(raw.denemeSayisi) ? raw.denemeSayisi : 0,
        maxDeneme: Number.isInteger(raw.maxDeneme) ? raw.maxDeneme : DEFAULT_MAX_ATTEMPTS,
        olusturma: createdAt,
        guncelleme: asDate(raw.guncelleme) ?? createdAt,
        islemBaslangic: asDate(raw.islemBaslangic),
        islemBitis: asDate(raw.islemBitis),
        leaseUntil: asDate(raw.leaseUntil),
        heartbeatAt: asDate(raw.heartbeatAt),
        nextAttemptAt: asDate(raw.nextAttemptAt),
        idempotencyKey: raw.idempotencyKey ?? null,
        leaseToken: raw.leaseToken ?? null,
        correlationId: raw.correlationId ?? null,
        causationId: raw.causationId ?? null,
    } as KuyrukIslemi
}

function deterministicJobId(
    tip: IslemTipi,
    tenantScope: string | null,
    idempotencyKey: string
): string {
    const digest = createHash('sha256')
        .update(tip)
        .update('\0')
        .update(tenantScope || 'unscoped')
        .update('\0')
        .update(idempotencyKey)
        .digest('hex')
    return `job_${digest}`
}

export async function kuyruğaEkle(
    islem: YeniKuyrukIslemi,
    options: KuyrukEkleOptions = {}
): Promise<string> {
    const now = new Date()
    const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 20) {
        throw new Error('maxAttempts must be between 1 and 20')
    }

    const idempotencyKey = options.idempotencyKey?.trim() || null
    const collection = adminDb.collection('islem_kuyrugu')
    const ref = idempotencyKey
        ? collection.doc(deterministicJobId(islem.tip, islem.esnafId, idempotencyKey))
        : collection.doc()

    const document: KuyrukIslemi = {
        ...islem,
        jobId: ref.id,
        durum: 'bekliyor',
        olusturma: now,
        guncelleme: now,
        denemeSayisi: 0,
        maxDeneme: maxAttempts,
        idempotencyKey,
        leaseToken: null,
        leaseUntil: null,
        heartbeatAt: null,
        nextAttemptAt: now,
        correlationId: options.correlationId ?? null,
        causationId: options.causationId ?? null,
    }

    if (!idempotencyKey) {
        await ref.create(document)
        return ref.id
    }

    await adminDb.runTransaction(async (tx: Transaction) => {
        const snapshot = await tx.get(ref)
        if (snapshot.exists) return
        tx.create(ref, document)
    })

    return ref.id
}

export async function kuyruktanAl(limit = 5): Promise<{ id: string; data: KuyrukIslemi }[]> {
    const now = new Date()
    const snap = await adminDb
        .collection('islem_kuyrugu')
        .where('durum', '==', 'bekliyor')
        .orderBy('olusturma', 'asc')
        .limit(Math.max(limit * 5, limit))
        .get()

    return snap.docs
        .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            data: normalizedJob(doc.id, doc.data()),
        }))
        .filter(({ data }: { data: KuyrukIslemi }) => canAttemptJob(
            data.durum,
            data.nextAttemptAt,
            data.denemeSayisi,
            data.maxDeneme,
            now
        ))
        .slice(0, limit)
}

export async function islemClaimEt(
    islemId: string,
    leaseMs: number = DEFAULT_JOB_LEASE_MS
): Promise<IslemLease | null> {
    const ref = adminDb.collection('islem_kuyrugu').doc(islemId)
    const now = new Date()

    return adminDb.runTransaction(async (tx: Transaction) => {
        const doc = await tx.get(ref)
        if (!doc.exists) return null

        const data = normalizedJob(doc.id, doc.data())
        if (!canAttemptJob(data.durum, data.nextAttemptAt, data.denemeSayisi, data.maxDeneme, now)) {
            return null
        }

        const leaseToken = randomUUID()
        const attempt = data.denemeSayisi + 1
        tx.update(ref, {
            durum: 'isleniyor',
            islemBaslangic: now,
            guncelleme: now,
            denemeSayisi: attempt,
            leaseToken,
            leaseUntil: leaseExpiresAt(now, leaseMs),
            heartbeatAt: now,
        })

        return { leaseToken, attempt }
    })
}

export async function islemBaslat(islemId: string): Promise<boolean> {
    return Boolean(await islemClaimEt(islemId))
}

export async function islemHeartbeat(
    islemId: string,
    leaseToken: string,
    leaseMs: number = DEFAULT_JOB_LEASE_MS
): Promise<boolean> {
    const ref = adminDb.collection('islem_kuyrugu').doc(islemId)
    const now = new Date()

    return adminDb.runTransaction(async (tx: Transaction) => {
        const doc = await tx.get(ref)
        if (!doc.exists) return false
        const data = normalizedJob(doc.id, doc.data())
        if (data.durum !== 'isleniyor' || data.leaseToken !== leaseToken) return false

        tx.update(ref, {
            heartbeatAt: now,
            leaseUntil: leaseExpiresAt(now, leaseMs),
            guncelleme: now,
        })
        return true
    })
}

export async function islemTamamla(
    islemId: string,
    sonuc: string,
    leaseToken?: string
): Promise<void> {
    const ref = adminDb.collection('islem_kuyrugu').doc(islemId)
    const now = new Date()

    await adminDb.runTransaction(async (tx: Transaction) => {
        const doc = await tx.get(ref)
        if (!doc.exists) throw new Error('İşlem bulunamadı')
        const data = normalizedJob(doc.id, doc.data())
        if (data.durum === 'tamamlandi') return
        if (data.durum !== 'isleniyor') throw new Error('İşlem aktif lease altında değil')
        if (data.leaseToken && data.leaseToken !== leaseToken) {
            throw new Error('İşlem lease token uyuşmuyor')
        }

        tx.update(ref, {
            durum: 'tamamlandi',
            sonuc,
            islemBitis: now,
            guncelleme: now,
            leaseToken: null,
            leaseUntil: null,
            heartbeatAt: null,
            nextAttemptAt: null,
        })
    })
}

export async function islemHata(
    islemId: string,
    hata: string,
    leaseToken?: string
): Promise<void> {
    const ref = adminDb.collection('islem_kuyrugu').doc(islemId)
    const now = new Date()

    await adminDb.runTransaction(async (tx: Transaction) => {
        const doc = await tx.get(ref)
        if (!doc.exists) throw new Error('İşlem bulunamadı')
        const data = normalizedJob(doc.id, doc.data())
        if (data.durum !== 'isleniyor') return
        if (data.leaseToken && data.leaseToken !== leaseToken) {
            throw new Error('İşlem lease token uyuşmuyor')
        }

        if (data.denemeSayisi < data.maxDeneme) {
            tx.update(ref, {
                durum: 'bekliyor',
                hata,
                guncelleme: now,
                leaseToken: null,
                leaseUntil: null,
                heartbeatAt: null,
                nextAttemptAt: nextRetryAt(data.denemeSayisi, now),
            })
            return
        }

        tx.update(ref, {
            durum: 'hata',
            hata,
            islemBitis: now,
            guncelleme: now,
            leaseToken: null,
            leaseUntil: null,
            heartbeatAt: null,
            nextAttemptAt: null,
        })
    })
}

export async function suresiDolanLeaseKurtar(limit = 25): Promise<number> {
    const now = new Date()
    const snap = await adminDb
        .collection('islem_kuyrugu')
        .where('durum', '==', 'isleniyor')
        .limit(limit)
        .get()

    let recovered = 0
    for (const snapshot of snap.docs as QueryDocumentSnapshot<DocumentData>[]) {
        const current = normalizedJob(snapshot.id, snapshot.data())
        if (!isLeaseExpired(current.leaseUntil, now)) continue

        const didRecover = await adminDb.runTransaction(async (tx: Transaction) => {
            const fresh = await tx.get(snapshot.ref)
            if (!fresh.exists) return false
            const data = normalizedJob(fresh.id, fresh.data())
            if (data.durum !== 'isleniyor' || !isLeaseExpired(data.leaseUntil, now)) return false

            tx.update(snapshot.ref, {
                durum: data.denemeSayisi >= data.maxDeneme ? 'hata' : 'bekliyor',
                hata: 'worker_lease_expired',
                guncelleme: now,
                islemBitis: data.denemeSayisi >= data.maxDeneme ? now : null,
                leaseToken: null,
                leaseUntil: null,
                heartbeatAt: null,
                nextAttemptAt: data.denemeSayisi >= data.maxDeneme ? null : now,
            })
            return true
        })

        if (didRecover) recovered += 1
    }

    return recovered
}
