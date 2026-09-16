import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * KC-00 (Issue #10): the hosted inventory script must be non-mutating by
 * construction and must never print credential material. These assertions run
 * against the script source (comments stripped) so the guarantee holds without
 * hosted access.
 */
const here = path.dirname(fileURLToPath(import.meta.url))
const raw = fs.readFileSync(path.resolve(here, '../../scripts/kc00-hosted-inventory.mjs'), 'utf8')
const source = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
const occurrences = (needle: string) => source.split(needle).length - 1

describe('KC-00 hosted inventory script (read-only by construction)', () => {
  it('references no Firestore write, batch or transaction API', () => {
    for (const forbidden of ['.set(', '.delete(', '.add(', '.batch(', 'bulkWriter', 'runTransaction', 'recursiveDelete', 'FieldValue', 'Map(']) {
      expect(source, forbidden).not.toContain(forbidden)
    }
    // The only `.update(` is the sha256 hash builder, never a DocumentReference.
    expect(occurrences('.update(')).toBe(occurrences("createHash('sha256').update("))
    expect(occurrences('.update(')).toBe(1)
    // The only `.create(` is Object.create(null) for prototype-free tallies.
    expect(occurrences('.create(')).toBe(occurrences('Object.create(null)'))
    expect(occurrences('.create(')).toBe(1)
    expect(occurrences('.count().get()')).toBe(1)
    expect(occurrences('.limit(args.sample).get()')).toBe(2)
    expect(occurrences('.get(')).toBe(3)
    expect(source).toContain('db.listCollections()')
  })

  it('references no Firebase Auth mutation API', () => {
    for (const forbidden of ['createUser', 'updateUser', 'deleteUser', 'setCustomUserClaims', 'revokeRefreshTokens', 'importUsers', 'createCustomToken', 'createSessionCookie', 'generatePasswordResetLink', 'generateEmailVerificationLink', 'generateSignInWithEmailLink']) {
      expect(source, forbidden).not.toContain(forbidden)
    }
    expect(occurrences('admin.auth().listUsers(')).toBe(1)
  })

  it('only issues HTTP GETs to the Firebase Rules API and never releases or creates rulesets', () => {
    expect(occurrences('fetch(')).toBe(1)
    expect(source).not.toMatch(/method\s*:/)
    expect(source).not.toMatch(/['"](POST|PUT|PATCH|DELETE)['"]/)
    for (const forbidden of ['releases:', 'rulesets:', 'createRuleset', 'updateRelease', ':test']) {
      expect(source, forbidden).not.toContain(forbidden)
    }
    expect(source).toContain('https://firebaserules.googleapis.com/v1/')
    expect(source).toContain('credential.getAccessToken()')
  })

  it('spawns nothing and writes no files', () => {
    for (const forbidden of ['writeFileSync', 'appendFileSync', 'writeFile(', 'child_process', 'execSync', 'spawn', 'firebase-tools']) {
      expect(source, forbidden).not.toContain(forbidden)
    }
    expect(source).toContain("require('firebase-admin')")
    expect(occurrences('require(')).toBe(1)
  })

  it('routes every stdout/stderr byte through redact() and prints no credential value', () => {
    expect(source).not.toContain('console.')
    expect(occurrences('process.stdout.write(')).toBe(1)
    expect(occurrences('process.stderr.write(')).toBe(1)
    expect(source).toContain('process.stdout.write(redact(text)')
    expect(source).toContain('process.stderr.write(redact(text)')
    expect(source).toContain('const SECRETS = [privateKey, rawPrivateKey, clientEmail]')
    expect(source).toMatch(/BEGIN \[A-Z \]\*PRIVATE KEY/)
    // The receipt object literal must not carry the credential fields.
    const receiptLiteral = source.slice(source.indexOf('const receipt = {'), source.indexOf('async function count('))
    expect(receiptLiteral).not.toContain('privateKey')
    expect(receiptLiteral).not.toContain('clientEmail')
    expect(receiptLiteral).toContain("mutationsPerformed: 'none'")
  })

  it('reports UNKNOWN instead of inferring unmeasurable surfaces', () => {
    for (const surface of ['hostedRuntimeCallersByRoute', 'directBrowserFirestoreClientsOutsideRepo', 'activeLegacyEsnafIdJwtCallers', 'deployedCloudFunctionsOrWorkers']) {
      expect(source).toMatch(new RegExp(`${surface}: 'UNKNOWN`))
    }
    expect(source).toContain("return 'UNKNOWN'")
    expect(source).toContain("--env-path")
  })
})
