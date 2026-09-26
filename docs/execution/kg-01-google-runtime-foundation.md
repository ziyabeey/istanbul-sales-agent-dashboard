# KG-01 — Google Runtime Foundation

**Status:** runtime foundation accepted; hosted no-traffic canary pending  
**Issue:** #45  
**Accepted main:** `2132d4f9aaaf48297cf3325e2706a777b89f77a0`  
**Hosted inventory receipt:** 2026-09-26  
**Non-goal:** moving canonical Booking, Business, Membership, Subscription, Entitlement, payment, or ledger truth into Firestore.

## 1. Canonical runtime target

Kepenk's hosted web/BFF runtime is Google Cloud Run.

```
Browser
  |
  v
Kepenk web / BFF
  |
  v
Cloud Run
  |
  +--> Firestore (projection/cache/preferences/telemetry)
  +--> Secret Manager / Cloud Storage / Logging
  +--> Cloud Tasks when queues are explicitly provisioned
  |
  +--> Supabase / Randevu canonical domain authorities
```

Firebase Auth is **not** part of the currently provisioned staging baseline. The
nonprod project is not registered as a Firebase project and Identity Toolkit is
not enabled. Do not recreate Firebase Auth merely because historical code or
documents mention it.

## 2. Authority boundary

Canonical outside Firestore:

- booking lifecycle and `appointment_events`
- canonical `business_id`
- Membership authorization
- Subscription / Entitlement / Quota authority
- payment / ledger truth
- Randevu salon operational state

Firestore may hold:

- opaque BFF session locator/cache where the accepted auth design requires it
- Action Card delivery/read state
- user preferences
- notification projection
- K5 UX telemetry
- Jev/Evidence derived projection/cache
- transient workflow state
- explicitly classified compatibility data

A Firestore projection must never silently become write authority for a
canonical relational domain.

## 3. Accepted hosted environment map

| Environment | Project ID | Hosted state |
| --- | --- | --- |
| development | `cs-project-rhx8yoks` | foundation APIs; app runtime/database not provisioned |
| staging / nonprod | `cs-project-ljhot8la` | active Kepenk staging runtime |
| production | `cs-project-evp0ac0k` | application runtime not provisioned |

Canonical staging details:

- region: `europe-west3`
- Cloud Run service: `kepenk-web-staging`
- observed ready revision: `kepenk-web-staging-00006-dzg`
- observed traffic: 100% to that revision
- Artifact Registry: `europe-west3-docker.pkg.dev/cs-project-ljhot8la/kepenk`
- image package: `kepenk-web`
- Firestore: `(default)`, Native mode, `europe-west3`
- asset bucket: `cs-project-ljhot8la-kepenk-assets`
- runtime identity: `kepenk-web-runtime@cs-project-ljhot8la.iam.gserviceaccount.com`
- observed revision creator: `kepenk-build@cs-project-ljhot8la.iam.gserviceaccount.com`
- Cloud Run invoker policy observed during inventory: `user:ziya@kepenk.ai` only
- Cloud Tasks API: enabled, no queues observed
- Cloud Scheduler API: not enabled
- Firebase Projects API: project lookup returned HTTP 404
- Identity Toolkit / Firebase Auth: not enabled
- recent Cloud Build listing: empty; existing image build provenance is therefore not accepted evidence

Secret names were inventoried without reading secret values. The active Cloud
Run revision references Secret Manager for session/auth/service/core principal
and Supabase anon-key material.

## 4. Historical Firebase evidence

KC-00 observations from the deleted/replaced infrastructure are historical
migration evidence only. They do **not** describe the new nonprod project and
must not be used to infer current Firebase Auth users, Firestore documents,
rules, or callers.

`.firebaserc` intentionally has no default project after this reconciliation.
A future Firebase registration or rules deployment must name an explicit project
and requires a separate acceptance receipt.

## 5. Build and deploy contract

The root Dockerfile remains the canonical image build input.

Required build:

```
pnpm install --frozen-lockfile
pnpm --filter @kepenk/web build --webpack
Next output: standalone
runtime port: 8080
health: /api/health
```

`cloudbuild.yaml` is staging-only and fails closed unless
`PROJECT_ID=cs-project-ljhot8la`. It:

1. builds `kepenk-web`;
2. pushes to the `kepenk` Artifact Registry repository;
3. deploys a tagged `kepenk-web-staging` revision with `--no-traffic`;
4. preserves the private service IAM policy;
5. uses the accepted runtime service account;
6. never promotes traffic.

GitHub/Depot CI no longer contains the stale `kepenk-api-staging` /
`gcr.io/kepenk-ai` deployment path. Hosted GitHub deployment remains disabled
until Workload Identity Federation or another accepted keyless identity path is
proven.

## 6. Authentication/runtime contract

KC-02 remains the implementation candidate for the BFF identity boundary.

Browser invariants:

- browser receives no Supabase access or refresh token
- host-only opaque BFF session locator
- server resolves/refreshes Supabase session material
- active Membership is re-read before business authority
- recovery sessions cannot gain normal business context
- no service-role browser bypass

Google runtime invariants:

- Cloud Run uses runtime identity / ADC
- no Firebase Admin private key is required for the accepted Firestore runtime
- provider secrets stay behind Secret Manager / CredentialRef boundaries
- Cloud Tasks/Scheduler identities are added only with the queues/jobs that use them
- no parent-domain auth cookie

The former Firebase dual-proof acceptance item is now **conditional legacy
compatibility scope**, not a prerequisite. Reintroduce it only if a live
consumer or migration requirement is proven.

## 7. K4b handoff

After the no-traffic revision and KC-02 hosted R2 matrix are green:

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

Failures remain fail-closed:

- no active business context -> no Randevu read
- Randevu 401/403 -> no fallback authority
- malformed/unavailable event response -> no fabricated card
- no Firestore booking fallback
- no service-role browser bypass

## 8. Rollout sequence

Completed:

1. KG-01 current-main Docker image contract and exact-head container smoke.
2. Hosted project/resource inventory.
3. Canonical development/staging/production project mapping.
4. Canonical staging region/service/registry/runtime identity mapping.

Next:

1. merge this hosted-inventory reconciliation;
2. build `main@2132d4f9` through the accepted Cloud Build contract;
3. deploy a private tagged **no-traffic** revision;
4. verify canary health/readiness without moving production traffic;
5. refresh KC-02 #44 onto the accepted main/runtime base;
6. run KC-02 hosted R2;
7. merge KC-02;
8. implement K4b live Randevu transport;
9. open K5b persistent telemetry only after tenant/privacy schema acceptance.

Production project `cs-project-evp0ac0k` remains untouched until a separate
production acceptance gate.

## 9. Explicitly retired paths

- `xinxia-v5-test` is not an active project default.
- `kepenk-ai`, `kepenk-ai-dev`, `kepenk-ai-staging`, and `kepenk-ai-prod`
  are not accepted hosted project IDs.
- `europe-west1` is not the accepted staging region.
- `kepenk-api-staging`, `kepenk-repo`, and `kepenk-ai-frontend` are not
  accepted staging service/repository/image names.
- Vercel is not a Kepenk runtime acceptance dependency.
