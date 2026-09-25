# KG-01 — Google Runtime Foundation

**Status:** implementation candidate  
**Issue:** #45  
**Base decision:** Kepenk hosted runtime standardizes on Google infrastructure.  
**Non-goal:** returning canonical Booking / Commercial / tenant truth to legacy Firestore.

## 1. Canonical runtime target

Kepenk's server runtime is Google Cloud Run.

```
Browser
  |
  v
kepenk.ai / Next.js
  |
  v
Cloud Run (web + BFF)
  |
  +--> Firebase Auth / Identity adapter
  +--> Firestore (session/cache/projection/telemetry)
  +--> Cloud Tasks / Scheduler / PubSub
  +--> Secret Manager / Cloud Storage / Logging
  |
  +--> Randevu Worker / Supabase Core
```

The existing Next.js application and KC-02 BFF remain valid. There is no Vercel runtime dependency in the KC-02 contract.

## 2. Authority boundary

### Canonical outside Firestore

The following remain owned by their accepted relational/domain authorities:

- booking lifecycle and `appointment_events`
- canonical `business_id`
- Membership authorization
- Subscription / Entitlement / Quota authority
- payment / ledger truth
- Randevu salon operational state

### Firestore allowed roles

Firestore may hold:

- opaque BFF session locator/cache
- Action Card delivery/read state
- user preference state
- notification projection
- K5 UX telemetry
- Jev/Evidence derived projection/cache
- transient workflow state
- explicitly classified legacy compatibility data during cutover

A Firestore projection must never silently become write authority for a canonical relational domain.

## 3. Existing repository assets

The repository is already partially Google-native:

- root `Dockerfile` builds `@kepenk/web` into Next standalone output
- `cloudbuild.yaml` builds an image, pushes to Artifact Registry, and deploys Cloud Run
- `firebase-admin` is used server-side
- `firestore.rules` and `firestore.indexes.json` exist
- `cloudTasksClient.ts` exists
- `gcpAuthGuard.ts` exists
- scheduled Firestore backup code exists
- current CI names `kepenk-ai` as the GCP project and `europe-west1` as its region

KG-01 therefore modernizes and proves an existing Google path rather than creating a new provider stack.

## 4. Hosted inventory already accepted from KC-00

Do not reopen KC-00.

Accepted hosted evidence recorded on 2026-09-17 included:

- 7 legacy `esnaflar`
- 1 Firebase password user
- 0 legacy tenants carrying canonical `businessId/business_id`
- 0 `auth_sessions`
- measured commercial/usage collection groups at 0 in that inventory
- deployed Firestore rules were not equal to the repository ruleset
- direct/external runtime callers remained UNKNOWN and were deferred to cutover/canary evidence

This proves Firebase is not an empty historical artifact, but it does not make Firebase the canonical Business/Membership/Booking authority.

## 5. Open project-identity inventory

Repository configuration currently contains three incompatible naming stories:

| Source | Value |
| --- | --- |
| `.firebaserc` | `xinxia-v5-test` |
| CI / backups / current GCP metadata | `kepenk-ai` |
| intended environment map in `devopsConfig.ts` | `kepenk-ai-dev`, `kepenk-ai-staging`, `kepenk-ai-prod` |

Until hosted Google Console evidence resolves this:

- do not run destructive `firebase deploy` from the repository default project;
- do not rewrite `.firebaserc` by assumption;
- do not copy data between these project IDs;
- do not declare one of the environment-map projects live merely because it appears in source.

Required hosted receipt:

1. active Firebase project ID(s)
2. active GCP project ID(s)
3. Firestore database ownership and document population
4. Firebase Auth user population/providers
5. Cloud Run services
6. Artifact Registry repository
7. Cloud Tasks queues
8. Scheduler jobs
9. Storage buckets
10. current custom-domain mapping
11. deployed rules hash
12. current service-account / Workload Identity deployment path

## 6. Cloud Run build contract

The existing root Dockerfile is the canonical starting point.

Build intent:

```
pnpm install --frozen-lockfile
pnpm --filter @kepenk/web build
Next output: standalone
runtime port: 8080
health: /api/health
```

The Docker dependency manifest list must stay in sync with `@kepenk/web` workspace dependencies. KG-01 starts by adding the recently introduced `@kepenk/action-card-schema` and `@kepenk/templates` workspace manifests and transpilation entries.

## 7. Authentication/runtime contract

KC-02 remains the current implementation candidate.

Browser invariant:

- browser receives no Supabase access or refresh token
- host-only opaque BFF session locator
- server resolves/refreshes Supabase session material
- active Membership is re-read before business authority
- recovery sessions cannot gain normal business context

Google runtime improvement target:

- use runtime identity / ADC on Cloud Run instead of long-lived checked-in or manually copied Firebase Admin private keys
- provider secrets move behind Secret Manager / existing CredentialRef resolver boundary
- Cloud Tasks and Scheduler use narrow OIDC/service identities
- no parent-domain auth cookie

## 8. K4b handoff after acceptance

Once KG-01 hosted inventory and KC-02 Cloud Run acceptance are green:

```
Kepenk browser
 -> Kepenk Cloud Run BFF
 -> requireCoreContext
 -> server-side Randevu GET /api/bookings/:id/events
 -> canonical appointment event
 -> randevuEventToActionCard
 -> K2 Attention Engine
 -> Home Shell
```

Failures are fail-closed:

- no active business context -> no Randevu read
- Randevu 401/403 -> no fallback authority
- malformed/unavailable event response -> no fabricated card
- no legacy Firestore booking fallback
- no service-role browser bypass

## 9. Rollout sequence

1. KG-01 hosted project/resource inventory.
2. Reconcile canonical GCP/Firebase project naming.
3. Prove current-main Docker image build.
4. Deploy no-traffic Cloud Run revision.
5. Run health/readiness.
6. Rebase/refresh KC-02 onto the accepted Google-runtime base if needed.
7. Run KC-02 hosted R2 matrix.
8. Merge KC-02.
9. Implement K4b live Randevu transport.
10. Open K5b persistent pilot telemetry only after tenant/privacy schema is accepted.

## 10. Explicitly retired path

Vercel is no longer a Kepenk runtime acceptance dependency.

Historical Vercel deployment failures remain diagnostic history only. They must not block Google runtime work and must not be used as Cloud Run acceptance evidence.
