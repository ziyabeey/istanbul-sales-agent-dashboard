/**
 * Firestore Backup Cloud Functions
 *
 * 3-Layer backup strategy:
 * Layer 1: PITR (automatic, 7 days, minute precision)
 * Layer 2: Daily export → Cloud Storage
 * Layer 3: Monthly archive → Nearline Storage (1 year retention)
 */

import { onSchedule } from 'firebase-functions/v2/scheduler'

const PROJECT_ID = 'kepenk-ai'

// Layer 2: Daily export → Cloud Storage
export const dailyBackup = onSchedule(
  {
    schedule: '0 3 * * *',
    timeZone: 'Europe/Istanbul',
    region: 'europe-west1',
  },
  async () => {
    const { v1 } = await import('@google-cloud/firestore')
    const client = new v1.FirestoreAdminClient()
    const databaseName = client.databasePath(PROJECT_ID, '(default)')

    const date = new Date().toISOString().split('T')[0]
    const outputUriPrefix = `gs://kepenk-ai-backups/daily/${date}`

    await client.exportDocuments({
      name: databaseName,
      outputUriPrefix,
      collectionIds: [], // Empty = all collections
    })

    console.log(`Daily backup completed: ${outputUriPrefix}`)
  },
)

// Layer 3: Monthly archive → Nearline Storage
export const monthlyArchive = onSchedule(
  {
    schedule: '0 4 1 * *',
    timeZone: 'Europe/Istanbul',
    region: 'europe-west1',
  },
  async () => {
    const { v1 } = await import('@google-cloud/firestore')
    const client = new v1.FirestoreAdminClient()
    const databaseName = client.databasePath(PROJECT_ID, '(default)')

    const month = new Date().toISOString().slice(0, 7)
    const outputUriPrefix = `gs://kepenk-ai-archives/monthly/${month}`

    await client.exportDocuments({
      name: databaseName,
      outputUriPrefix,
      collectionIds: [],
    })

    console.log(`Monthly archive completed: ${outputUriPrefix}`)
  },
)
