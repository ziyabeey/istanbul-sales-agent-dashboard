# KC-02 Hosted R2 Acceptance Runbook

**Scope:** PR #44 hosted-only acceptance  
**Target:** exact `kpnk/kepenk-web` Vercel Preview for the PR head  
**Authority:** Supabase/PostgreSQL remains canonical; Firestore is only the BFF session locator/cache.

This runbook does not approve production, change DNS, promote a Vercel deployment, or enable K4b.

## 1. Automated core matrix

Run:

```bash
node scripts/kc-02-hosted-r2-core.mjs
```

Required environment variables:

```text
KC02_BASE_URL
STAGING_DATABASE_URL
STAGING_OWNER_B_EMAIL
STAGING_OWNER_B_PASSWORD
```

Optional when Vercel Deployment Protection is enabled:

```text
VERCEL_AUTOMATION_BYPASS_SECRET
```

Optional safety override for a non-Vercel hosted target:

```text
KC02_ALLOW_NON_VERCEL=true
```

The script refuses plain HTTP and, by default, any hostname outside `.vercel.app`.

### Confidential bundle scan

If these variables are present in the runner environment, the harness also compares their **values** against every discovered client JavaScript chunk without logging the values:

```text
CORE_PRINCIPAL_SECRET
SESSION_SECRET
FIREBASE_PRIVATE_KEY
SUPABASE_JWT_SECRET
```

Even when values are unavailable locally, the bundle scan rejects the confidential environment **names**.

The staging project currently exposes an ES256 public JWKS endpoint, so `SUPABASE_JWT_SECRET` is not required for the current hosted acceptance setup.

## 2. What the automated matrix proves

The script must produce `PASS_PARTIAL_R2` only after all of these pass:

1. `GET /api/core/auth/me` without a session returns 401, proving the Core gate is enabled rather than 404/503.
2. Login without Origin and with a cross-site Origin returns 403.
3. Real staging Owner B password login succeeds.
4. The browser receives:
   - `kepenk_core_session`: HttpOnly, Secure, SameSite=Strict, host-only
   - `kepenk_core_csrf`: readable, Secure, SameSite=Strict, host-only
5. Login and `/me` responses expose no Supabase access/refresh token markers.
6. `/me` resolves the real staging user and canonical Business B membership.
7. State-changing business selection rejects missing CSRF and cross-site Origin.
8. A bounded temporary Owner-B → Business-A membership is created.
9. With two active memberships and no explicit selection, `businessId` remains null.
10. Business A can be explicitly selected only because the user now has an active membership.
11. The temporary Business-A membership is deactivated.
12. The next request drops the now-invalid selected business and resolves the single remaining canonical Business-B membership.
13. The temporary membership is deleted in `finally`.
14. Logout revokes the server-side BFF session.
15. Replaying the old session against `/me` and logout returns 401.
16. Client chunks contain neither confidential env names nor any supplied confidential values.

## 3. Staging mutation boundary

The automated fixture phase is intentionally narrow.

Canonical fixture identities:

```text
Business A: f1700000-0000-4000-8000-000000000001
Business B: f1700000-0000-4000-8000-000000000002
Owner A membership: f1710000-0000-4000-8000-000000000001
Owner B membership: f1710000-0000-4000-8000-000000000002
```

Before mutation the harness verifies:

- Business B is still `Staging Salon B`
- canonical Owner B membership is active owner
- Owner B does not already have a Business-A membership

It then inserts exactly one random temporary `staff` membership and deletes only that row in `finally`.

It does **not**:

- change the canonical Owner A/B membership rows
- modify appointments/customers/payments
- modify Core subscriptions/entitlements
- use production data
- touch Firebase tenant authority
- create a permanent test tenant

If the fixture is not in the expected canonical state, the harness fails before mutation.

## 4. Manual/browser evidence still required

The automated core harness is deliberately not the full R2 gate.

### A. Recovery flow

Hosted browser evidence must prove:

1. `POST /api/core/auth/parola-kurtar` starts the recovery flow from the same browser.
2. Supabase recovery e-mail uses the configured redirect and carries `token_hash`, not a browser access-token fragment.
3. Opening the link in another browser/session fails.
4. Correct same-browser state creates a recovery-class BFF session.
5. The state is one-time; replay fails.
6. Recovery session cannot use normal business routes.
7. `POST /api/core/auth/parola-guncelle` requires CSRF and recovery class.
8. Successful password update revokes the recovery session and clears cookies.
9. Replaying the old recovery session fails.
10. Standard password login works afterwards.

Never paste the recovery token/hash into PR comments or logs.

### B. Firebase dual-proof alias

Hosted browser evidence must prove:

1. User has a standard Core BFF session.
2. A **fresh real Firebase sign-in** produces an ID token.
3. `POST /api/core/auth/firebase-bagla` requires same Origin + CSRF.
4. Firebase Admin verifies the token server-side with revocation checking.
5. Anonymous/custom/stale/invalid identities fail closed.
6. Only verified `firebase:<uid>` is sent to the Core alias command.
7. The Firebase ID token is never forwarded to Core, stored in the browser response, or logged.
8. Conflict returns 409 and Core outage returns 503.
9. Repeating the same link operation keeps the same idempotency semantics.

Never put a Firebase ID token in PR comments or permanent artifacts.

## 5. Final acceptance receipt

The final PR receipt must identify:

- exact PR head SHA
- exact Vercel deployment ID / preview origin
- automated core-matrix result
- number of client chunks scanned
- whether exact secret values were available for bundle comparison
- recovery browser result
- Firebase dual-proof browser result
- independent reviewer identity and review result

Do not merge #44 until all hosted R2 items above are green.

After merge, K4b may start from the accepted KC-02 boundary. K4b must still preserve:

```text
browser
  -> Kepenk BFF
  -> user access token server-side
  -> Randevu requireMember
  -> canonical appointment_events
  -> deterministic adapter
  -> K2 attention planner
  -> Action Card
```

No service-role fallback, no browser Supabase token, no caller-authoritative businessId, and no Firestore business authority.
