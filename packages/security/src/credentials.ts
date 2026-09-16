import { z } from 'zod'

export const CredentialStorageKindSchema = z.enum(['env', 'encrypted_store'])
export type CredentialStorageKind = z.infer<typeof CredentialStorageKindSchema>

export const CredentialStatusSchema = z.enum(['active', 'revoked'])
export type CredentialStatus = z.infer<typeof CredentialStatusSchema>

export const CredentialVersionStatusSchema = z.enum(['active', 'decrypt_only', 'revoked'])
export type CredentialVersionStatus = z.infer<typeof CredentialVersionStatusSchema>

export const CredentialRefSchema = z.object({
  credentialId: z.string().min(1),
  provider: z.string().min(1),
  purpose: z.string().min(1),
  storageKind: CredentialStorageKindSchema,
  tenantId: z.string().min(1).nullable().default(null),
  version: z.number().int().positive().nullable().default(null),
}).strict()

export type CredentialRef = z.infer<typeof CredentialRefSchema>

export const CredentialDefinitionSchema = z.object({
  credentialId: z.string().min(1),
  provider: z.string().min(1),
  purpose: z.string().min(1),
  storageKind: CredentialStorageKindSchema,
  tenantId: z.string().min(1).nullable(),
  status: CredentialStatusSchema,
  activeVersion: z.number().int().positive().nullable(),
  requiredFields: z.array(z.string().min(1)).min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict()

export type CredentialDefinition = z.infer<typeof CredentialDefinitionSchema>

export const CredentialVersionMetadataSchema = z.object({
  credentialId: z.string().min(1),
  version: z.number().int().positive(),
  kid: z.string().min(1),
  status: CredentialVersionStatusSchema,
  createdAt: z.string().datetime(),
  retiredAt: z.string().datetime().nullable(),
}).strict()

export type CredentialVersionMetadata = z.infer<typeof CredentialVersionMetadataSchema>

export const EncryptionEnvelopeV1Schema = z.object({
  v: z.literal(1),
  kid: z.string().min(1),
  alg: z.literal('A256GCM'),
  iv: z.string().min(1),
  tag: z.string().min(1),
  ciphertext: z.string().min(1),
}).strict()

export type EncryptionEnvelopeV1 = z.infer<typeof EncryptionEnvelopeV1Schema>

export const EncryptedCredentialVersionSchema = CredentialVersionMetadataSchema.extend({
  envelope: z.string().min(1),
}).strict()

export type EncryptedCredentialVersion = z.infer<typeof EncryptedCredentialVersionSchema>

export interface ResolvedCredential {
  ref: CredentialRef
  version: number | null
  values: Readonly<Record<string, string>>
}

export interface CredentialResolver {
  resolve(ref: CredentialRef): Promise<ResolvedCredential | null>
}

export function assertResolvedCredentialFields(
  credential: ResolvedCredential,
  requiredFields: readonly string[]
): ResolvedCredential {
  for (const field of requiredFields) {
    const value = credential.values[field]
    if (!value?.trim()) {
      throw new Error(`Credential ${credential.ref.credentialId} is missing required field ${field}`)
    }
  }
  return credential
}
