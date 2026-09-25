import type { CorePlatformClient } from './coreClient'
import type { CoreRequestContext } from './requestContext'
import { CoreEntrySnapshotSchema, type CoreEntrySnapshot } from './entryTypes'
import { CorePlatformError } from './errors'

/** A minimal display DTO, never a replacement authorization context. */
export async function readCoreEntrySnapshot(
  context: CoreRequestContext,
  client: Pick<CorePlatformClient, 'listMembershipLabels'>,
): Promise<CoreEntrySnapshot> {
  if (context.recovery) return { recovery: true, businessId: null, memberships: [] }
  const labels = context.memberships.length
    ? await client.listMembershipLabels(context.accessToken, context.userId)
    : []
  const byId = new Map(labels.map(label => [label.business_id, label]))
  if (byId.size !== labels.length || labels.length !== context.memberships.length) {
    throw new CorePlatformError('CORE_UNAVAILABLE')
  }
  const memberships = context.memberships.map(member => {
    const label = byId.get(member.business_id)
    // Concurrent membership changes require another read, never guessed labels.
    if (!member.active || !label?.active || label.id !== member.id || label.role !== member.role) {
      throw new CorePlatformError('CORE_UNAVAILABLE')
    }
    return { businessId: member.business_id, role: member.role, name: label.businesses.name, slug: label.businesses.slug }
  })
  return CoreEntrySnapshotSchema.parse({ recovery: false, businessId: context.businessId, memberships })
}
