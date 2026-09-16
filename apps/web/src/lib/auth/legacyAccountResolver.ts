import { adminDb } from '../firebaseAdmin'

export interface LegacyTenantAccount {
  tenantId: string
  data: Record<string, unknown>
}

export type UniqueLegacyAccountResult =
  | { kind: 'unique'; account: LegacyTenantAccount }
  | { kind: 'none' }
  | { kind: 'ambiguous' }

function requireDb() {
  if (!adminDb) throw new Error('Veritabanı bağlantısı kurulamadı')
  return adminDb
}

export function normalizeLoginPhone(value: string): string {
  return value.replace(/[^0-9]/g, '')
}

export function normalizeLoginEmail(value: string): string {
  return value.trim().toLowerCase()
}

export async function findUniqueActiveTenantByPhone(
  phone: string
): Promise<UniqueLegacyAccountResult> {
  const snapshot = await requireDb()
    .collection('esnaflar')
    .where('telefonTemiz', '==', normalizeLoginPhone(phone))
    .where('durum', '==', 'aktif')
    .limit(2)
    .get()

  if (snapshot.empty) return { kind: 'none' }
  if (snapshot.size !== 1) return { kind: 'ambiguous' }

  return {
    kind: 'unique',
    account: {
      tenantId: snapshot.docs[0].id,
      data: snapshot.docs[0].data() as Record<string, unknown>,
    },
  }
}

export async function findUniqueTenantByEmail(
  email: string
): Promise<UniqueLegacyAccountResult> {
  const snapshot = await requireDb()
    .collection('esnaflar')
    .where('email', '==', normalizeLoginEmail(email))
    .limit(2)
    .get()

  if (snapshot.empty) return { kind: 'none' }
  if (snapshot.size !== 1) return { kind: 'ambiguous' }

  return {
    kind: 'unique',
    account: {
      tenantId: snapshot.docs[0].id,
      data: snapshot.docs[0].data() as Record<string, unknown>,
    },
  }
}
