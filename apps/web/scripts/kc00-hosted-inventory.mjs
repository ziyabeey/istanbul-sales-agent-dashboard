#!/usr/bin/env node
/**
 * KC-00 hosted numeric authority inventory — READ-ONLY BY CONSTRUCTION.
 *
 * Produces exact counts (or UNKNOWN) for the surfaces listed in Kepenk Issue #10
 * using the already-authorised Firebase Admin runtime credential from the
 * environment. The only remote calls are Firestore `listCollections()`,
 * `count()` aggregations, bounded `limit().get()` samples, Firebase Auth
 * `listUsers()` and two HTTP GETs against the Firebase Rules API. There is no
 * set/update/delete/add/batch/transaction, no user mutation, no rules release
 * and no secret rotation anywhere in this file; `test/unit/kc00HostedInventoryScript.test.ts`
 * pins that invariant on the source.
 *
 * Output is aggregate numbers, field *names*, enum-like distributions and
 * content hashes only. Every byte written to stdout/stderr passes through
 * `redact()`, which strips the credential values, so the receipt can be pasted
 * into the issue as-is.
 *
 * Usage (from apps/web, with FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL /
 * FIREBASE_PRIVATE_KEY exported or present in ../../.env.local). The flag is
 * `--env-path` because Node >= 20.6 claims `--env-file` for itself:
 *
 *   node scripts/kc00-hosted-inventory.mjs --env-path ../../.env.local > kc00-receipt.json
 */
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(here, '..')
const require = createRequire(path.join(webRoot, 'package.json'))
const admin = require('firebase-admin')

function parseArgs(argv) {
    const out = { envFile: null, sample: 500 }
    for (let i = 0; i < argv.length; i++) {
        if (argv[i] === '--env-path') out.envFile = argv[++i]
        else if (argv[i] === '--sample') out.sample = Number(argv[++i]) || 500
    }
    return out
}

function loadEnvFile(file) {
    const out = {}
    if (!file || !existsSync(file)) return out
    for (const line of readFileSync(file, 'utf8').split('\n')) {
        const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
        if (!m) continue
        let v = m[2].trim()
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
        out[m[1]] = v
    }
    return out
}

const args = parseArgs(process.argv.slice(2))
const fileEnv = loadEnvFile(args.envFile)
const env = (key) => process.env[key] ?? fileEnv[key]
const projectId = env('FIREBASE_PROJECT_ID')
const clientEmail = env('FIREBASE_CLIENT_EMAIL')
const rawPrivateKey = env('FIREBASE_PRIVATE_KEY') || ''
const privateKey = rawPrivateKey.replace(/\\n/g, '\n')

/** Credential material never reaches stdout/stderr, whatever an SDK error message contains. */
const SECRETS = [privateKey, rawPrivateKey, clientEmail].filter((value) => typeof value === 'string' && value.length >= 8)
function redact(text) {
    let out = String(text)
    for (const secret of SECRETS) out = out.split(secret).join('[REDACTED]')
    return out.replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, '[REDACTED]')
}
function emit(text) {
    process.stdout.write(redact(text) + '\n')
}
function fail(text, code) {
    process.stderr.write(redact(text) + '\n')
    process.exit(code)
}
const describeError = (error) => redact(error?.code || error?.message || String(error))

if (!projectId || !clientEmail || !privateKey) {
    fail('UNKNOWN: FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY runtime credential not available', 2)
}

const credential = admin.credential.cert({ projectId, clientEmail, privateKey })
admin.initializeApp({ credential })
const db = admin.firestore()

const receipt = {
    generatedAt: new Date().toISOString(),
    projectId,
    readOnlyMethod: 'firebase-admin Firestore count() aggregation + bounded limit() document samples + auth.listUsers() + Firebase Rules REST GET (read-only)',
    mutationsPerformed: 'none',
    firestoreRootCollections: {},
    firestoreCollectionGroups: {},
    esnaflar: {},
    authSessionsSample: null,
    firebaseAuth: null,
    deployedFirestoreRules: null,
    unknown: [],
}

async function count(ref, label) {
    try {
        const snapshot = await ref.count().get()
        return snapshot.data().count
    } catch (error) {
        receipt.unknown.push(`${label}: ${describeError(error)}`)
        return 'UNKNOWN'
    }
}

const sum = (tally) => Object.values(tally).reduce((a, b) => a + b, 0)
const duplicates = (tally) => Object.values(tally).filter((n) => n > 1).length
const tally = () => Object.create(null)
const bump = (counts, key) => { counts[key] = (counts[key] || 0) + 1 }

// 1) Every root collection, counted server-side.
for (const collection of await db.listCollections()) {
    receipt.firestoreRootCollections[collection.id] = await count(collection, `root:${collection.id}`)
}

// 2) Known subcollections relevant to KC-00.
for (const group of ['kredi', 'islemler', 'versions', 'pendingPayments', 'nps_responses', 'odemeler', 'abonelikler']) {
    receipt.firestoreCollectionGroups[group] = await count(db.collectionGroup(group), `group:${group}`)
}

// 3) esnaflar field map and alias conflicts over a bounded sample (keys and cardinalities only).
try {
    const sample = await db.collection('esnaflar').limit(args.sample).get()
    const keyFrequency = tally()
    const slugs = tally(), domains = tally(), subdomains = tally(), phones = tally()
    const durum = tally(), paket = tally()
    let withBusinessId = 0
    for (const doc of sample.docs) {
        const data = doc.data()
        for (const key of Object.keys(data)) bump(keyFrequency, key)
        for (const [field, counts] of [['slug', slugs], ['domain', domains], ['subdomain', subdomains], ['telefonTemiz', phones]]) {
            const value = data[field]
            if (typeof value === 'string' && value) bump(counts, value)
        }
        if (data.businessId || data.business_id) withBusinessId++
        bump(durum, String(data.durum ?? 'undefined'))
        bump(paket, String(data.paket ?? 'undefined'))
    }
    receipt.esnaflar = {
        sampled: sample.size,
        sampleIsComplete: sample.size < args.sample,
        distinctFieldKeys: Object.keys(keyFrequency).length,
        fieldPresence: Object.fromEntries(Object.entries(keyFrequency).sort((a, b) => b[1] - a[1])),
        docsWithSlug: sum(slugs),
        duplicateSlugValues: duplicates(slugs),
        docsWithDomain: sum(domains),
        duplicateDomainValues: duplicates(domains),
        docsWithSubdomain: sum(subdomains),
        duplicateSubdomainValues: duplicates(subdomains),
        docsWithTelefonTemiz: sum(phones),
        duplicateTelefonTemizValues: duplicates(phones),
        docsWithBusinessIdField: withBusinessId,
        durumDistribution: durum,
        paketDistribution: paket,
    }
} catch (error) {
    receipt.esnaflar = 'UNKNOWN'
    receipt.unknown.push(`esnaflar sample: ${describeError(error)}`)
}

// 4) auth_sessions kind distribution (legacy esnafId vs canonical) over a bounded sample.
try {
    const sessions = await db.collection('auth_sessions').limit(args.sample).get()
    const kinds = tally()
    for (const doc of sessions.docs) {
        const data = doc.data()
        const kind = String(data.kind ?? data.type ?? data.authType ?? data.sessionKind ?? 'unlabeled')
        bump(kinds, kind)
    }
    receipt.authSessionsSample = { sampled: sessions.size, sampleIsComplete: sessions.size < args.sample, kinds }
} catch (error) {
    receipt.authSessionsSample = 'UNKNOWN'
    receipt.unknown.push(`auth_sessions sample: ${describeError(error)}`)
}

// 5) Firebase Auth population and sign-in provider distribution.
try {
    let total = 0, disabled = 0, withSitesClaim = 0, pageToken
    const providers = tally()
    do {
        const page = await admin.auth().listUsers(1000, pageToken)
        for (const user of page.users) {
            total++
            if (user.disabled) disabled++
            const ids = user.providerData.map((p) => p.providerId)
            if (ids.length === 0) {
                const key = user.phoneNumber ? 'phone-only' : user.email ? 'email-only' : 'no-provider'
                bump(providers, key)
            }
            for (const id of ids) bump(providers, id)
            if (user.customClaims && user.customClaims.sites) withSitesClaim++
        }
        pageToken = page.pageToken
    } while (pageToken)
    receipt.firebaseAuth = { totalUsers: total, disabledUsers: disabled, providerDistribution: providers, usersWithSitesCustomClaim: withSitesClaim }
} catch (error) {
    receipt.firebaseAuth = 'UNKNOWN'
    receipt.unknown.push(`firebase auth listUsers: ${describeError(error)}`)
}

// 6) Deployed Firestore rules (release + ruleset metadata, content hash only).
// Uses the same Admin credential's OAuth access token; both calls are plain GETs.
async function rulesGet(accessToken, resource) {
    const response = await fetch(`https://firebaserules.googleapis.com/v1/${resource}`, {
        headers: { authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${resource}`)
    return response.json()
}
try {
    const { access_token: accessToken } = await credential.getAccessToken()
    const release = await rulesGet(accessToken, `projects/${projectId}/releases/cloud.firestore`)
    const ruleset = await rulesGet(accessToken, release.rulesetName)
    const files = ruleset.source?.files || []
    const deployed = files.map((f) => f.content).join('\n')
    const repoRulesPath = path.resolve(webRoot, '..', '..', 'firestore.rules')
    const repoRules = existsSync(repoRulesPath) ? readFileSync(repoRulesPath, 'utf8') : null
    const sha256 = (text) => createHash('sha256').update(text).digest('hex')
    receipt.deployedFirestoreRules = {
        release: release.name,
        rulesetName: release.rulesetName,
        releaseUpdateTime: release.updateTime,
        rulesetCreateTime: ruleset.createTime,
        fileNames: files.map((f) => f.name),
        deployedSha256: sha256(deployed),
        deployedLineCount: deployed.split('\n').length,
        deployedReferencesSitesClaim: /request\.auth\.token\.sites/.test(deployed),
        repoSha256: repoRules ? sha256(repoRules) : 'UNKNOWN',
        repoMatchesDeployed: repoRules ? sha256(repoRules) === sha256(deployed) : 'UNKNOWN',
    }
} catch (error) {
    receipt.deployedFirestoreRules = 'UNKNOWN'
    receipt.unknown.push(`firebase rules release: ${describeError(error)}`)
}

// Surfaces that this credential cannot measure are reported as UNKNOWN, never inferred.
receipt.notMeasurable = {
    hostedRuntimeCallersByRoute: 'UNKNOWN (needs Cloud Logging / request telemetry read access)',
    directBrowserFirestoreClientsOutsideRepo: 'UNKNOWN (needs Firestore usage metrics / rules evaluation logs)',
    activeLegacyEsnafIdJwtCallers: 'UNKNOWN unless auth_sessions kinds above are conclusive (needs request telemetry)',
    deployedCloudFunctionsOrWorkers: 'UNKNOWN (needs Cloud Functions / Cloud Run list permission)',
}

emit(JSON.stringify(receipt, null, 2))
