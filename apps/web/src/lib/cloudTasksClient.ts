import { CloudTasksClient, protos } from '@google-cloud/tasks'
import { issueServiceToken, SERVICE_AUDIENCES, SERVICE_SCOPES } from './serviceAuth'

const credentials = {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.FIREBASE_PROJECT_ID,
}

const client = (credentials.client_email && credentials.private_key && credentials.project_id)
    ? new CloudTasksClient({ credentials, projectId: credentials.project_id })
    : null

export interface CloudTaskAuthOptions {
    subject?: string
    audience?: string
    scopes?: string[]
    tokenTtlSeconds?: number
}

function resolveTaskBaseUrl(): string {
    const raw = process.env.INTERNAL_APP_URL || process.env.NEXT_PUBLIC_APP_URL
    if (!raw) {
        throw new Error('INTERNAL_APP_URL or NEXT_PUBLIC_APP_URL is required for Cloud Tasks')
    }

    const parsed = new URL(raw)
    if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
        throw new Error('Cloud Tasks production target must use HTTPS')
    }

    return parsed.origin
}

function defaultTaskAuth(urlPath: string): Required<Pick<CloudTaskAuthOptions, 'audience' | 'scopes'>> {
    if (urlPath === '/api/workers/site-ureticisi') {
        return {
            audience: SERVICE_AUDIENCES.siteGenerator,
            scopes: [SERVICE_SCOPES.siteGenerate],
        }
    }

    if (urlPath === '/api/cron/kuyruk-isleyici') {
        return {
            audience: SERVICE_AUDIENCES.queueProcessor,
            scopes: [SERVICE_SCOPES.queueProcess],
        }
    }

    return {
        audience: `kepenk.ai:${urlPath}`,
        scopes: [SERVICE_SCOPES.taskInvoke],
    }
}

export async function createHttpTask(
    queueId: string,
    urlPath: string,
    payload: Record<string, unknown>,
    scheduleInSeconds: number = 0,
    authOptions: CloudTaskAuthOptions = {}
) {
    if (!client) {
        throw new Error('Cloud Tasks credentials are required; insecure direct HTTP fallback is disabled')
    }

    if (!urlPath.startsWith('/')) {
        throw new Error('Cloud Tasks urlPath must start with /')
    }
    if (!Number.isFinite(scheduleInSeconds) || scheduleInSeconds < 0) {
        throw new Error('scheduleInSeconds must be a non-negative number')
    }

    const projectId = process.env.FIREBASE_PROJECT_ID!
    const location = process.env.GCP_LOCATION || 'europe-west1'
    const parent = client.queuePath(projectId, location, queueId)

    const baseUrl = resolveTaskBaseUrl()
    const fullUrl = `${baseUrl}${urlPath}`
    const defaults = defaultTaskAuth(urlPath)
    const subject = authOptions.subject || 'cloud-tasks'
    const audience = authOptions.audience || defaults.audience
    const scopes = authOptions.scopes || defaults.scopes

    const scheduledFor = new Date(Date.now() + scheduleInSeconds * 1000)
    const tokenNotBefore = new Date(Math.max(Date.now(), scheduledFor.getTime() - 30_000))
    const serviceToken = issueServiceToken({
        subject,
        audience,
        scopes,
        ttlSeconds: authOptions.tokenTtlSeconds,
        notBefore: tokenNotBefore,
    })

    const task: protos.google.cloud.tasks.v2.ITask = {
        httpRequest: {
            httpMethod: protos.google.cloud.tasks.v2.HttpMethod.POST,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${serviceToken}`,
            },
            body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        },
    }

    if (scheduleInSeconds > 0) {
        task.scheduleTime = {
            seconds: Math.floor(Date.now() / 1000) + Math.floor(scheduleInSeconds),
        }
    }

    const [response] = await client.createTask({ parent, task })
    return response
}
