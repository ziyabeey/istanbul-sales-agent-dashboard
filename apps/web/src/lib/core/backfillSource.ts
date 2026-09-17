import { FieldPath, type Firestore } from 'firebase-admin/firestore'
import type { LegacyTenantDoc, LegacyTenantSource } from './backfill'

export const CORE_MIGRATION_REPORTS_COLLECTION = 'core_migration_reports'

/**
 * KC-03: Firestore adapter for the legacy tenant collection. Reads page by
 * document id, writes only the Core shadow fields, and stores job reports.
 */
export class FirestoreLegacyTenantSource implements LegacyTenantSource {
  constructor(private readonly db: Firestore) {}

  async listTenants(input: { startAfter: string | null; limit: number }): Promise<LegacyTenantDoc[]> {
    let query = this.db.collection('esnaflar').orderBy(FieldPath.documentId()).limit(input.limit)
    if (input.startAfter) query = query.startAfter(input.startAfter)
    const snapshot = await query.get()
    return snapshot.docs.map((doc) => {
      const data = doc.data() ?? {}
      return {
        id: doc.id,
        isletmeAdiTam: typeof data.isletmeAdiTam === 'string' ? data.isletmeAdiTam : null,
        isletmeAdi: typeof data.isletmeAdi === 'string' ? data.isletmeAdi : null,
        ad: typeof data.ad === 'string' ? data.ad : null,
        slug: typeof data.slug === 'string' ? data.slug : null,
        subdomain: typeof data.subdomain === 'string' ? data.subdomain : null,
        durum: typeof data.durum === 'string' ? data.durum : null,
        telefonTemiz: typeof data.telefonTemiz === 'string' ? data.telefonTemiz : null,
        coreUserId: typeof data.coreUserId === 'string' ? data.coreUserId : null,
        coreBusinessId: typeof data.coreBusinessId === 'string' ? data.coreBusinessId : null,
      }
    })
  }

  async markLinked(esnafId: string, patch: Record<string, unknown>): Promise<void> {
    await this.db.collection('esnaflar').doc(esnafId).update(patch)
  }

  async saveReport(kind: 'backfill' | 'parity', report: Record<string, unknown>): Promise<void> {
    const id = `${kind}-${new Date().toISOString().replace(/[:.]/g, '-')}`
    await this.db.collection(CORE_MIGRATION_REPORTS_COLLECTION).doc(id).set({ kind, ...report })
    await this.db.collection(CORE_MIGRATION_REPORTS_COLLECTION).doc(`latest-${kind}`).set({ kind, ...report })
  }
}
