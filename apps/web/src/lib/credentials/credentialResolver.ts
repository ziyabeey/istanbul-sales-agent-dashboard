import type { Firestore } from 'firebase-admin/firestore'
import {
  CredentialDefinitionSchema,
  CredentialRefSchema,
  EncryptedCredentialVersionSchema,
  assertResolvedCredentialFields,
  type CredentialDefinition,
  type CredentialRef,
  type CredentialResolver,
  type ResolvedCredential,
} from '../../../../../packages/security/src/credentials'
import { adminDb } from '../firebaseAdmin'
import {
  credentialAktifKid,
  credentialEnvelopeCoz,
  credentialRotationGerekli,
  tokenCoz,
  tokenSifrele,
} from '../tokenSifreleme'

export const CREDENTIAL_COLLECTIONS = {
  definitions: 'credential_definitions',
  versions: 'versions',
} as const

export const PLATFORM_CREDENTIAL_REFS = {
  twilio: CredentialRefSchema.parse({
    credentialId: 'platform:twilio',
    provider: 'twilio',
    purpose: 'messaging',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
  iyzico: CredentialRefSchema.parse({
    credentialId: 'platform:iyzico',
    provider: 'iyzico',
    purpose: 'payments',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
  telegram: CredentialRefSchema.parse({
    credentialId: 'platform:telegram',
    provider: 'telegram',
    purpose: 'operations-notifications',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
  unsplash: CredentialRefSchema.parse({
    credentialId: 'platform:unsplash',
    provider: 'unsplash',
    purpose: 'media-search',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
} as const

type EnvFieldMap = Readonly<Record<string, string>>

type EnvCredentialDefinition = {
  ref: CredentialRef
  fields: EnvFieldMap
}

const ENV_CREDENTIALS: Readonly<Record<string, EnvCredentialDefinition>> = {
  [PLATFORM_CREDENTIAL_REFS.twilio.credentialId]: {
    ref: PLATFORM_CREDENTIAL_REFS.twilio,
    fields: {
      accountSid: 'TWILIO_ACCOUNT_SID',
      authToken: 'TWILIO_AUTH_TOKEN',
      fromNumber: 'TWILIO_WHATSAPP_NUMARASI',
    },
  },
  [PLATFORM_CREDENTIAL_REFS.iyzico.credentialId]: {
    ref: PLATFORM_CREDENTIAL_REFS.iyzico,
    fields: {
      apiKey: 'IYZICO_API_KEY',
      secretKey: 'IYZICO_SECRET_KEY',
      baseUrl: 'IYZICO_BASE_URL',
    },
  },
  [PLATFORM_CREDENTIAL_REFS.telegram.credentialId]: {
    ref: PLATFORM_CREDENTIAL_REFS.telegram,
    fields: {
      botToken: 'TELEGRAM_BOT_TOKEN',
      chatId: 'TELEGRAM_CHAT_ID',
    },
  },
  [PLATFORM_CREDENTIAL_REFS.unsplash.credentialId]: {
    ref: PLATFORM_CREDENTIAL_REFS.unsplash,
    fields: {
      accessKey: 'UNSPLASH_ACCESS_KEY',
    },
  },
}

function sameRefAuthority(expected: CredentialRef, actual: CredentialRef): boolean {
  return expected.credentialId === actual.credentialId
    && expected.provider === actual.provider
    && expected.purpose === actual.purpose
    && expected.storageKind === actual.storageKind
    && expected.tenantId === actual.tenantId
}

function safeEnvValue(envName: string): string | null {
  if (envName.startsWith('NEXT_PUBLIC_')) {
    throw new Error(`Confidential credential cannot resolve from public env: ${envName}`)
  }
  const value = process.env[envName]?.trim()
  return value || null
}

export class EnvCredentialResolver implements CredentialResolver {
  async resolve(refInput: CredentialRef): Promise<ResolvedCredential | null> {
    const ref = CredentialRefSchema.parse(refInput)
    if (ref.storageKind !== 'env') return null

    const definition = ENV_CREDENTIALS[ref.credentialId]
    if (!definition || !sameRefAuthority(definition.ref, ref)) return null

    const values: Record<string, string> = {}
    for (const [field, envName] of Object.entries(definition.fields)) {
      const value = safeEnvValue(envName)
      if (value) values[field] = value
    }

    return {
      ref,
      version: null,
      values: Object.freeze(values),
    }
  }
}

function requireCredentialDb(db: Firestore | null | undefined): Firestore {
  if (!db) throw new Error('Encrypted credential resolver requires Firestore')
  return db
}

function validateDefinitionForRef(definition: CredentialDefinition, ref: CredentialRef): boolean {
  return definition.credentialId === ref.credentialId
    && definition.provider === ref.provider
    && definition.purpose === ref.purpose
    && definition.storageKind === 'encrypted_store'
    && definition.tenantId === ref.tenantId
}

function parseSecretValues(plaintext: string): Record<string, string> {
  let parsed: unknown
  try {
    parsed = JSON.parse(plaintext)
  } catch {
    throw new Error('Encrypted credential payload is not valid JSON')
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Encrypted credential payload must be an object')
  }

  const values: Record<string, string> = {}
  for (const [field, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') {
      throw new Error(`Encrypted credential field ${field} must be a string`)
    }
    values[field] = value
  }
  return values
}

export class FirestoreEncryptedCredentialResolver implements CredentialResolver {
  private readonly db: Firestore

  constructor(db: Firestore | null | undefined = adminDb) {
    this.db = requireCredentialDb(db)
  }

  async resolve(refInput: CredentialRef): Promise<ResolvedCredential | null> {
    const ref = CredentialRefSchema.parse(refInput)
    if (ref.storageKind !== 'encrypted_store') return null

    const definitionRef = this.db.collection(CREDENTIAL_COLLECTIONS.definitions).doc(ref.credentialId)
    const definitionSnapshot = await definitionRef.get()
    if (!definitionSnapshot.exists) return null

    const definition = CredentialDefinitionSchema.parse(definitionSnapshot.data())
    if (!validateDefinitionForRef(definition, ref) || definition.status !== 'active') return null

    const version = ref.version ?? definition.activeVersion
    if (!version) return null

    const versionSnapshot = await definitionRef
      .collection(CREDENTIAL_COLLECTIONS.versions)
      .doc(String(version))
      .get()
    if (!versionSnapshot.exists) return null

    const credentialVersion = EncryptedCredentialVersionSchema.parse(versionSnapshot.data())
    if (credentialVersion.credentialId !== ref.credentialId || credentialVersion.version !== version) {
      throw new Error('Credential version authority mismatch')
    }
    if (credentialVersion.status === 'revoked') return null

    const envelope = credentialEnvelopeCoz(credentialVersion.envelope)
    if (!envelope || envelope.kid !== credentialVersion.kid) {
      throw new Error('Credential version kid does not match encryption envelope')
    }

    const credential: ResolvedCredential = {
      ref,
      version,
      values: Object.freeze(parseSecretValues(tokenCoz(credentialVersion.envelope))),
    }

    return assertResolvedCredentialFields(credential, definition.requiredFields)
  }
}

export class CompositeCredentialResolver implements CredentialResolver {
  constructor(private readonly resolvers: readonly CredentialResolver[]) {}

  async resolve(ref: CredentialRef): Promise<ResolvedCredential | null> {
    for (const resolver of this.resolvers) {
      const resolved = await resolver.resolve(ref)
      if (resolved) return resolved
    }
    return null
  }
}

export async function resolveRequiredCredential(
  resolver: CredentialResolver,
  ref: CredentialRef,
  requiredFields: readonly string[]
): Promise<ResolvedCredential> {
  const resolved = await resolver.resolve(ref)
  if (!resolved) throw new Error(`Required credential unavailable: ${ref.credentialId}`)
  return assertResolvedCredentialFields(resolved, requiredFields)
}

export function prepareEncryptedCredentialValues(values: Readonly<Record<string, string>>): {
  envelope: string
  kid: string
  needsRotation: boolean
} {
  const envelope = tokenSifrele(JSON.stringify(values))
  return {
    envelope,
    kid: credentialAktifKid(),
    needsRotation: credentialRotationGerekli(envelope),
  }
}
