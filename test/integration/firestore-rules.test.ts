/**
 * Integration: Firestore Security Rules — Tenant Isolation + RBAC Matrix
 *
 * Requires Firebase Emulator running on localhost:8080
 * Run: firebase emulators:exec --only firestore,auth 'npx vitest run test/integration'
 */

import {
  initializeTestEnvironment,
  type RulesTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing'
import { readFileSync } from 'fs'
import { describe, test, beforeAll, afterEach, afterAll } from 'vitest'

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'kepenk-test',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  })
})

afterEach(async () => await testEnv.clearFirestore())
afterAll(async () => await testEnv.cleanup())

// ═══ TENANT İZOLASYONU ═══
describe('Tenant Isolation', () => {
  const ROLES = ['owner', 'admin', 'editor', 'viewer'] as const
  const TENANT_A = 'site-AAA'
  const TENANT_B = 'site-BBB'

  for (const role of ROLES) {
    test(`${role} can read own tenant data`, async () => {
      const userA = testEnv.authenticatedContext('user-a', {
        sites: { [TENANT_A]: role },
      })
      await assertSucceeds(
        userA.firestore().doc(`sites/${TENANT_A}/orders/o1`).get()
      )
    })

    test(`${role} CANNOT read another tenant's data`, async () => {
      const userA = testEnv.authenticatedContext('user-a', {
        sites: { [TENANT_A]: role },
      })
      await assertFails(
        userA.firestore().doc(`sites/${TENANT_B}/orders/o1`).get()
      )
    })
  }
})

// ═══ RBAC İZİN MATRİSİ ═══
describe('RBAC Permission Matrix', () => {
  const EXPECTED: Record<string, Record<string, boolean>> = {
    owner:  { 'products:get': true, 'products:create': true, 'products:update': true, 'products:delete': true, 'members:delete': true },
    admin:  { 'products:get': true, 'products:create': true, 'products:update': true, 'products:delete': true, 'members:delete': true },
    editor: { 'products:get': true, 'products:create': true, 'products:update': true, 'products:delete': false, 'members:delete': false },
    viewer: { 'products:get': true, 'products:create': false, 'products:update': false, 'products:delete': false, 'members:delete': false },
  }

  for (const [role, perms] of Object.entries(EXPECTED)) {
    for (const [permKey, allowed] of Object.entries(perms)) {
      test(`${role} ${allowed ? 'CAN' : 'CANNOT'} ${permKey}`, async () => {
        const user = testEnv.authenticatedContext(`user-${role}`, {
          sites: { 'site-test': role },
        })
        const db = user.firestore()
        const [resource, action] = permKey.split(':')
        const docRef = db.doc(`sites/site-test/${resource}/test-doc`)

        const op = action === 'get' ? docRef.get() :
                   action === 'create' ? docRef.set({ test: true }) :
                   action === 'update' ? docRef.update({ test: true }) :
                   docRef.delete()

        if (allowed) await assertSucceeds(op)
        else await assertFails(op)
      })
    }
  }
})

// ═══ UNAUTHENTICATED ACCESS ═══
describe('Unauthenticated Access', () => {
  test('Anonymous cannot read any site data', async () => {
    const unauth = testEnv.unauthenticatedContext()
    await assertFails(
      unauth.firestore().doc('sites/any-site/orders/o1').get()
    )
  })

  test('Anonymous cannot write any data', async () => {
    const unauth = testEnv.unauthenticatedContext()
    await assertFails(
      unauth.firestore().doc('sites/any-site/products/p1').set({ name: 'hack' })
    )
  })
})
