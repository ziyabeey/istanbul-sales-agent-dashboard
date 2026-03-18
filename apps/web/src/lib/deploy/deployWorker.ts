/**
 * Cloudflare Pages Deploy Worker
 * ──────────────────────────────
 * Deploys static site output from publish-engine to Cloudflare Pages.
 * Uses Cloudflare API v4 Direct Upload.
 */

interface DeployConfig {
  accountId: string
  projectName: string
  apiToken: string
}

interface DeployFile {
  path: string    // e.g. "index.html", "about/index.html"
  content: string // HTML/XML/text content
}

interface DeployResult {
  ok: boolean
  url?: string
  deploymentId?: string
  error?: string
}

/**
 * Deploy static files to Cloudflare Pages via Direct Upload API.
 * 
 * Flow:
 *   1. Create a new deployment
 *   2. Upload files via presigned URLs
 *   3. Finalize deployment
 */
export async function deployCloudflarPages(
  config: DeployConfig,
  files: DeployFile[]
): Promise<DeployResult> {
  const { accountId, projectName, apiToken } = config
  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`

  try {
    // 1. Create deployment
    const formData = new FormData()
    
    // Build manifest: { "path": hash }
    const manifest: Record<string, string> = {}
    const fileMap = new Map<string, string>()

    for (const file of files) {
      const hash = await computeHash(file.content)
      manifest[`/${file.path}`] = hash
      fileMap.set(hash, file.content)
    }

    formData.append('manifest', JSON.stringify(manifest))

    // Append each file
    for (const [hash, content] of fileMap.entries()) {
      formData.append(hash, new Blob([content], { type: 'text/html' }), hash)
    }

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
      body: formData,
    })

    const data = await res.json()

    if (!data.success) {
      return {
        ok: false,
        error: data.errors?.[0]?.message || 'Deploy başarısız',
      }
    }

    return {
      ok: true,
      url: data.result?.url || '',
      deploymentId: data.result?.id || '',
    }
  } catch (error: any) {
    return {
      ok: false,
      error: error.message || 'Deploy hatası',
    }
  }
}

/**
 * Ensure a Cloudflare Pages project exists.
 * Creates it if it doesn't exist.
 */
export async function ensurePagesProject(
  config: Omit<DeployConfig, 'projectName'> & { projectName: string; productionBranch?: string }
): Promise<{ ok: boolean; projectName: string; error?: string }> {
  const { accountId, projectName, apiToken, productionBranch = 'main' } = config
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`

  try {
    // Check if project exists
    const checkRes = await fetch(`${url}/${projectName}`, {
      headers: { 'Authorization': `Bearer ${apiToken}` },
    })

    if (checkRes.ok) {
      return { ok: true, projectName }
    }

    // Create project
    const createRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        production_branch: productionBranch,
      }),
    })

    const data = await createRes.json()

    if (!data.success) {
      return {
        ok: false,
        projectName,
        error: data.errors?.[0]?.message || 'Proje oluşturma başarısız',
      }
    }

    return { ok: true, projectName }
  } catch (error: any) {
    return { ok: false, projectName, error: error.message }
  }
}

/**
 * Purge Cloudflare CDN cache for a domain.
 */
export async function purgeCDNCache(
  zoneId: string,
  apiToken: string,
  urls?: string[]
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          urls ? { files: urls } : { purge_everything: true }
        ),
      }
    )
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

/** Simple string hash using Web Crypto (or fallback) */
async function computeHash(content: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle !== 'undefined') {
    const encoder = new TextEncoder()
    const data = encoder.encode(content)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  // Fallback simple hash
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}
