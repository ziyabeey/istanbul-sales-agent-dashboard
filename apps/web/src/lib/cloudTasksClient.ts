import { CloudTasksClient } from '@google-cloud/tasks'

// In a real production environment, you should initialize this with your service account
// and configure project, location and queue variables properly via env.
const credentials = {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.FIREBASE_PROJECT_ID,
}

// Sadece credentiallar tamamen sağlandığında instance oluştur
// Aksi takdirde build fail olmaması için null bırak
const client = (credentials.client_email && credentials.private_key && credentials.project_id)
    ? new CloudTasksClient({ credentials, projectId: credentials.project_id })
    : null

export async function createHttpTask(
    queueId: string,
    urlPath: string,
    payload: Record<string, any>,
    scheduleInSeconds: number = 0
) {
    if (!client) {
        console.warn('[CLOUD TASKS] Client credentials missing. Executing payload synchronously instead (Fallback mode).')
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        
        // Geliştirme ortamı için asenkron fetch fallback (gerçek promise beklemeden arka plana at)
        fetch(`${baseUrl}${urlPath}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.error('[CLOUD TASKS FALLBACK ERROR]', err))

        return { fallback: true }
    }

    const projectId = process.env.FIREBASE_PROJECT_ID!
    const location = process.env.GCP_LOCATION || 'europe-west1'
    
    // Construct the fully qualified queue name.
    const parent = client.queuePath(projectId, location, queueId)

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const fullUrl = `${baseUrl}${urlPath}`

    const task: any = {
        httpRequest: {
            httpMethod: 'POST',
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                // Internal API Gateway koruması için secret token ekliyoruz
                'x-cloud-task-secret': process.env.CRON_SECRET || 'dev-secret-123'
            },
            body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        },
    }

    if (scheduleInSeconds > 0) {
        task.scheduleTime = {
            seconds: scheduleInSeconds + Date.now() / 1000,
        }
    }

    try {
        const [response] = await client.createTask({ parent, task })
        console.log(`[CLOUD TASKS] Created task ${response.name} for ${fullUrl}`)
        return response
    } catch (error) {
        console.error('[CLOUD TASKS] Error creating task:', error)
        throw error
    }
}
