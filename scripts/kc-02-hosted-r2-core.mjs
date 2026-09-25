#!/usr/bin/env node
import { randomUUID } from 'node:crypto'
import { spawnSync } from 'node:child_process'

const REQUIRED = [
  'KC02_BASE_URL',
  'STAGING_DATABASE_URL',
  'STAGING_OWNER_B_EMAIL',
  'STAGING_OWNER_B_PASSWORD',
]

for (const name of REQUIRED) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`)
}

const base = new URL(process.env.KC02_BASE_URL)
if (base.protocol !== 'https:') throw new Error('KC02_BASE_URL must use https')
if (!base.hostname.endsWith('.vercel.app') && process.env.KC02_ALLOW_NON_VERCEL !== 'true') {
  throw new Error('KC02_BASE_URL must be an exact Vercel Preview origin unless KC02_ALLOW_NON_VERCEL=true')
}

const origin = base.origin
const dbUrl = process.env.STAGING_DATABASE_URL
const email = process.env.STAGING_OWNER_B_EMAIL.trim().toLowerCase()
const password = process.env.STAGING_OWNER_B_PASSWORD
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim() || null

const BUSINESS_A = 'f1700000-0000-4000-8000-000000000001'
const BUSINESS_B = 'f1700000-0000-4000-8000-000000000002'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function splitSetCookies(headers) {
  if (typeof headers.getSetCookie === 'function') return headers.getSetCookie()
  const value = headers.get('set-cookie')
  if (!value) return []
  return value.split(/,(?=\s*[^;,\s]+=)/g)
}

function cookieAttributes(setCookie) {
  return setCookie.split(';').map((part) => part.trim())
}

class CookieJar {
  constructor() {
    this.values = new Map()
  }

  absorb(response) {
    for (const raw of splitSetCookies(response.headers)) {
      const [pair, ...attrs] = raw.split(';')
      const index = pair.indexOf('=')
      if (index <= 0) continue
      const name = pair.slice(0, index).trim()
      const value = pair.slice(index + 1).trim()
      const expired = !value || attrs.some((attr) => /^max-age=0$/i.test(attr.trim()))
      if (expired) this.values.delete(name)
      else this.values.set(name, value)
    }
  }

  header() {
    return [...this.values.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
  }

  get(name) {
    return this.values.get(name) ?? null
  }

  has(name) {
    return this.values.has(name)
  }
}

function baseHeaders(extra = {}) {
  const headers = new Headers(extra)
  headers.set('accept', 'application/json')
  if (bypass) {
    headers.set('x-vercel-protection-bypass', bypass)
    headers.set('x-vercel-set-bypass-cookie', 'true')
  }
  return headers
}

async function request(path, { method = 'GET', jar = null, headers = {}, body } = {}) {
  const h = baseHeaders(headers)
  if (jar?.values.size) h.set('cookie', jar.header())
  if (body !== undefined && !h.has('content-type')) h.set('content-type', 'application/json')
  const response = await fetch(new URL(path, origin), {
    method,
    headers: h,
    body: body === undefined ? undefined : JSON.stringify(body),
    redirect: 'manual',
    signal: AbortSignal.timeout(20_000),
  })
  jar?.absorb(response)
  const text = await response.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch {}
  return { response, text, data, setCookies: splitSetCookies(response.headers) }
}

function expectStatus(result, status, label) {
  if (result.response.status !== status) {
    const contentType = result.response.headers.get('content-type') ?? ''
    throw new Error(`${label}: expected HTTP ${status}, got ${result.response.status} (${contentType || 'unknown content type'})`)
  }
}

function psqlScalar(statement) {
  const result = spawnSync(
    'psql',
    ['--dbname', dbUrl, '-X', '-q', '-A', '-t', '-v', 'ON_ERROR_STOP=1', '-v', 'VERBOSITY=sqlstate'],
    {
      input: statement,
      encoding: 'utf8',
      timeout: 25_000,
      maxBuffer: 1024 * 1024,
      env: {
        ...process.env,
        PGCONNECT_TIMEOUT: '10',
        PGOPTIONS: '-c statement_timeout=15000 -c lock_timeout=10000',
      },
    },
  )
  if (result.error || result.status !== 0) {
    const processCode = result.error?.code
    const reason = processCode === 'ENOENT'
      ? 'psql unavailable'
      : processCode === 'ETIMEDOUT'
        ? 'psql timed out'
        : Number.isInteger(result.status)
          ? `psql exit ${result.status}`
          : 'psql process failed'
    throw new Error(`Staging fixture SQL failed (${reason}); details suppressed`)
  }
  return result.stdout.trim()
}

function sqlLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

function fixtureOwnerB() {
  const row = psqlScalar(`
    select concat_ws(':', m.user_id::text, m.role::text, m.active::text)
    from public.memberships m
    join public.businesses b on b.id=m.business_id
    where m.business_id='${BUSINESS_B}'::uuid
      and b.name='Staging Salon B'
      and m.id='f1710000-0000-4000-8000-000000000002'::uuid;
  `)
  const [userId, role, active] = row.split(':')
  assert(UUID.test(userId), 'Canonical Owner B fixture user id is missing')
  assert(role === 'owner' && active === 'true', 'Canonical Owner B fixture is not active owner')
  return userId
}

function ensureNoPreexistingCrossMembership(userId) {
  const count = psqlScalar(`
    select count(*)
    from public.memberships
    where business_id='${BUSINESS_A}'::uuid
      and user_id=${sqlLiteral(userId)}::uuid;
  `)
  assert(count === '0', 'Refusing to mutate: Owner B already has a Business A membership')
}

function createTemporaryMembership(userId, membershipId) {
  const inserted = psqlScalar(`
    insert into public.memberships(id, business_id, user_id, role, active)
    values (
      ${sqlLiteral(membershipId)}::uuid,
      '${BUSINESS_A}'::uuid,
      ${sqlLiteral(userId)}::uuid,
      'staff',
      true
    )
    returning 1;
  `)
  assert(inserted === '1', 'Temporary multi-membership fixture was not created')
}

function deactivateTemporaryMembership(userId, membershipId) {
  const changed = psqlScalar(`
    update public.memberships
    set active=false, updated_at=now()
    where id=${sqlLiteral(membershipId)}::uuid
      and business_id='${BUSINESS_A}'::uuid
      and user_id=${sqlLiteral(userId)}::uuid
      and active
    returning 1;
  `)
  assert(changed === '1', 'Temporary membership deactivation failed')
}

function cleanupTemporaryMembership(userId, membershipId) {
  psqlScalar(`
    delete from public.memberships
    where id=${sqlLiteral(membershipId)}::uuid
      and business_id='${BUSINESS_A}'::uuid
      and user_id=${sqlLiteral(userId)}::uuid;
  `)
}

function assertSessionCookies(setCookies) {
  const session = setCookies.find((value) => value.startsWith('kepenk_core_session='))
  const csrf = setCookies.find((value) => value.startsWith('kepenk_core_csrf='))
  assert(session, 'Login did not set kepenk_core_session')
  assert(csrf, 'Login did not set kepenk_core_csrf')

  const sessionAttrs = cookieAttributes(session).map((x) => x.toLowerCase())
  const csrfAttrs = cookieAttributes(csrf).map((x) => x.toLowerCase())

  assert(sessionAttrs.includes('httponly'), 'Session cookie is not HttpOnly')
  assert(sessionAttrs.includes('secure'), 'Session cookie is not Secure')
  assert(sessionAttrs.includes('samesite=strict'), 'Session cookie is not SameSite=Strict')
  assert(!sessionAttrs.some((x) => x.startsWith('domain=')), 'Session cookie must be host-only')

  assert(!csrfAttrs.includes('httponly'), 'CSRF cookie must be readable by the browser')
  assert(csrfAttrs.includes('secure'), 'CSRF cookie is not Secure')
  assert(csrfAttrs.includes('samesite=strict'), 'CSRF cookie is not SameSite=Strict')
  assert(!csrfAttrs.some((x) => x.startsWith('domain=')), 'CSRF cookie must be host-only')
}

function assertNoTokenMaterial(text, label) {
  const lower = text.toLowerCase()
  for (const marker of ['access_token', 'refresh_token', 'service_role', 'core_principal_secret']) {
    assert(!lower.includes(marker), `${label} exposed token/secret marker: ${marker}`)
  }
}

async function scanClientBundles() {
  const pages = ['/', '/giris', '/parola-yenile']
  const scripts = new Set()
  for (const path of pages) {
    const result = await request(path)
    assert(result.response.status === 200 || result.response.status === 404, `Bundle scan page ${path} returned HTTP ${result.response.status}`)
    for (const match of result.text.matchAll(/<script[^>]+src=["']([^"']+\.js(?:\?[^"']*)?)["']/g)) {
      scripts.add(new URL(match[1], origin).toString())
    }
  }
  assert(scripts.size > 0, 'No client JS chunks discovered for secret-negative scan')

  const forbiddenNames = [
    'CORE_PRINCIPAL_SECRET',
    'SESSION_SECRET',
    'FIREBASE_PRIVATE_KEY',
    'SUPABASE_JWT_SECRET',
  ]
  const secretValues = forbiddenNames
    .map((name) => process.env[name]?.trim())
    .filter((value) => value && value.length >= 8)

  let scanned = 0
  for (const url of scripts) {
    const h = baseHeaders()
    const response = await fetch(url, { headers: h, signal: AbortSignal.timeout(20_000) })
    assert(response.ok, `Client chunk fetch failed with HTTP ${response.status}`)
    const content = await response.text()
    for (const name of forbiddenNames) {
      assert(!content.includes(name), `Client bundle contains confidential environment name ${name}`)
    }
    for (const value of secretValues) {
      assert(!content.includes(value), 'Client bundle contains a confidential environment value')
    }
    scanned += 1
  }
  return { scanned, exactSecretValuesChecked: secretValues.length }
}

async function main() {
  const receipt = {
    origin,
    gate: false,
    originNegatives: false,
    loginCookies: false,
    context: false,
    csrfNegatives: false,
    multiMembership: false,
    liveDeactivation: false,
    logoutReplay: false,
    clientBundleSecretNegative: false,
    recovery: 'MANUAL_REQUIRED',
    firebaseDualProof: 'MANUAL_REQUIRED',
  }

  const ownerBId = fixtureOwnerB()
  ensureNoPreexistingCrossMembership(ownerBId)

  const unauthenticated = await request('/api/core/auth/me')
  expectStatus(unauthenticated, 401, 'Core feature gate / unauthenticated context')
  receipt.gate = true

  const noOrigin = await request('/api/core/auth/parola-giris', {
    method: 'POST',
    body: { email, parola: password },
  })
  expectStatus(noOrigin, 403, 'Origin-less login')

  const evilOrigin = await request('/api/core/auth/parola-giris', {
    method: 'POST',
    headers: { origin: 'https://evil.example' },
    body: { email, parola: password },
  })
  expectStatus(evilOrigin, 403, 'Cross-site login')
  receipt.originNegatives = true

  const jar = new CookieJar()
  const login = await request('/api/core/auth/parola-giris', {
    method: 'POST',
    jar,
    headers: { origin },
    body: { email, parola: password },
  })
  expectStatus(login, 200, 'Real staging login')
  assert(login.data?.userId === ownerBId, 'Logged-in user is not canonical staging Owner B')
  assertNoTokenMaterial(login.text, 'Login response')
  assertSessionCookies(login.setCookies)
  assert(jar.has('kepenk_core_session') && jar.has('kepenk_core_csrf'), 'BFF cookies were not retained')
  receipt.loginCookies = true

  const me = await request('/api/core/auth/me', { jar })
  expectStatus(me, 200, 'Authenticated /me')
  assert(me.data?.userId === ownerBId, '/me user mismatch')
  assert(Array.isArray(me.data?.memberships) && me.data.memberships.length === 1, 'Expected one canonical active membership before fixture transition')
  assert(me.data?.businessId === BUSINESS_B, 'Single canonical membership did not resolve Business B')
  assertNoTokenMaterial(me.text, '/me response')
  receipt.context = true

  const csrfToken = jar.get('kepenk_core_csrf')
  assert(csrfToken, 'CSRF cookie missing after login')

  const noCsrf = await request('/api/core/auth/isletme-sec', {
    method: 'POST',
    jar,
    headers: { origin },
    body: { businessId: BUSINESS_B },
  })
  expectStatus(noCsrf, 403, 'Business selection without CSRF')

  const crossOrigin = await request('/api/core/auth/isletme-sec', {
    method: 'POST',
    jar,
    headers: { origin: 'https://evil.example', 'x-kepenk-csrf': csrfToken },
    body: { businessId: BUSINESS_B },
  })
  expectStatus(crossOrigin, 403, 'Business selection with cross-site Origin')
  receipt.csrfNegatives = true

  const tempMembershipId = randomUUID()
  let tempCreated = false
  try {
    createTemporaryMembership(ownerBId, tempMembershipId)
    tempCreated = true

    const ambiguous = await request('/api/core/auth/me', { jar })
    expectStatus(ambiguous, 200, 'Multi-membership /me')
    assert(Array.isArray(ambiguous.data?.memberships) && ambiguous.data.memberships.length === 2, 'Temporary multi-membership was not observed')
    assert(ambiguous.data?.businessId === null, 'Unselected multi-membership session must not invent a business')
    receipt.multiMembership = true

    const selected = await request('/api/core/auth/isletme-sec', {
      method: 'POST',
      jar,
      headers: { origin, 'x-kepenk-csrf': csrfToken },
      body: { businessId: BUSINESS_A },
    })
    expectStatus(selected, 200, 'Select temporary Business A membership')

    const selectedMe = await request('/api/core/auth/me', { jar })
    expectStatus(selectedMe, 200, 'Selected-business /me')
    assert(selectedMe.data?.businessId === BUSINESS_A, 'Selected Business A was not authoritative on the next request')

    deactivateTemporaryMembership(ownerBId, tempMembershipId)

    const afterDeactivation = await request('/api/core/auth/me', { jar })
    expectStatus(afterDeactivation, 200, 'Membership deactivation /me')
    assert(Array.isArray(afterDeactivation.data?.memberships) && afterDeactivation.data.memberships.length === 1, 'Inactive temporary membership survived active-membership filtering')
    assert(afterDeactivation.data?.memberships[0]?.businessId === BUSINESS_B, 'Canonical Business B membership was not preserved')
    assert(afterDeactivation.data?.businessId === BUSINESS_B, 'Invalid selected business was not dropped/re-resolved after deactivation')
    receipt.liveDeactivation = true
  } finally {
    if (tempCreated) cleanupTemporaryMembership(ownerBId, tempMembershipId)
  }

  const logout = await request('/api/core/auth/cikis', {
    method: 'POST',
    jar,
    headers: { origin, 'x-kepenk-csrf': csrfToken },
    body: {},
  })
  expectStatus(logout, 200, 'Logout')
  receipt.logoutReplay = true

  // Reconstruct the stale browser cookies from the successful login for explicit replay.
  const staleJar = new CookieJar()
  for (const raw of login.setCookies) {
    const fake = new Response(null, { headers: { 'set-cookie': raw } })
    staleJar.absorb(fake)
  }

  const staleMe = await request('/api/core/auth/me', { jar: staleJar })
  expectStatus(staleMe, 401, 'Revoked session replay /me')
  const staleCsrf = staleJar.get('kepenk_core_csrf')
  assert(staleCsrf, 'Stale CSRF cookie missing for replay check')
  const logoutReplay = await request('/api/core/auth/cikis', {
    method: 'POST',
    jar: staleJar,
    headers: { origin, 'x-kepenk-csrf': staleCsrf },
    body: {},
  })
  expectStatus(logoutReplay, 401, 'Logout replay')

  const bundle = await scanClientBundles()
  receipt.clientBundleSecretNegative = true
  receipt.clientChunksScanned = bundle.scanned
  receipt.exactSecretValuesChecked = bundle.exactSecretValuesChecked

  console.log(JSON.stringify({ status: 'PASS_PARTIAL_R2', receipt }, null, 2))
  console.log('Manual hosted evidence still required: recovery flow and Firebase dual-proof alias path.')
}

main().catch((error) => {
  console.error(`KC-02 hosted R2 core matrix failed: ${error.message}`)
  process.exitCode = 1
})
