# W3 — Durable Execution + Credential + Integration Exact File / Task Manifest

> **Tarih:** 2026-09-16  
> **Durum:** PLAN KAPALI — implementation başlamadı  
> **Kaynak:** SÖKÜM 24, 29, 30, 31, 33, 34, 35, 41 + SENTEZ 1–5 + W1–W2  
> **Amaç:** Cloud Tasks, Firestore queue, cron/worker çağrıları, provider credential'ları, OAuth grants, provider resources, inbound webhooks ve outbound provider client'larını tek durable execution + integration lifecycle omurgasına exact file-level task'larla bağlamak.  
> **Kural:** Provider adapter business truth sahibi değildir; raw secret business document'ta yaşamaz; inbound provider event verified ve durable commit olmadan domain'e ulaşmaz.

---

# 1. W3 exit contract

W3 sonunda aşağıdaki canonical authority'ler tanımlı ve production path'lerinin prerequisite'i olmalıdır:

```text
DurableJob
CommandEnvelope / EventEnvelope
Outbox
ProviderEventInbox / IntegrationEventInbox
IdempotencyKey
Retry / Backoff / Lease
DLQ / Replay

CredentialDefinition
CredentialVersion / CredentialRef
EncryptionEnvelope(kid)
ServicePrincipal

IntegrationConnection
ProviderResourceBinding
WebhookSubscription
SyncCursor
ConnectionHealth
ReconciliationRun
```

Minimum invariants:

1. Production internal job transport credential eksikliğinde unauthenticated/direct HTTP downgrade yapmaz.
2. Worker/cron caller shared human-admin secret ile authenticate olmaz.
3. Raw tenant OAuth/access/refresh token business profile/root document truth'u değildir.
4. Connection health `token exists` veya `baglanti=true` ile eşit değildir.
5. Provider resource ID tenant lookup için canonical `ProviderResourceBinding` üzerinden çözülür.
6. Customer/sender phone tenant identity değildir.
7. Webhook signature doğrulanmadan provider event domain processing'e girmez.
8. Provider event durable inbox'a commit edilmeden 2xx ACK ile kaybedilemez.
9. Provider event idempotency domain collection'larına dağılmaz; ingress katmanında canonical olur.
10. Provider mock/simulated success production success sayılmaz.
11. Credential rotation connection identity'yi değiştirmez.
12. Provider adapter raw secret'in storage yerini bilmez; credential handle/ref alır.
13. Revoke/disconnect/offboarding external provider state reconcile edilmeden completed sayılmaz.

---

# 2. Durable execution seeds

## W3-JOB-001 — Cloud Tasks client

**Path**

- `apps/web/src/lib/cloudTasksClient.ts`

**Current strengths**

- real Google Cloud Tasks enqueue,
- queue + schedule support,
- provider retry semantics için uygun transport,
- structured payload.

**Critical current problems**

- Firebase service-account env'lerini doğrudan client oluşturmak için kullanır,
- credential yoksa direct HTTP fallback yapar,
- fallback asynchronous fire-and-forget,
- internal request header `x-cloud-task-secret = CRON_SECRET || 'dev-secret-123'`,
- production trust seviyesi transport availability'ye göre düşebilir.

**Disposition:** `PRESERVE TRANSPORT SEED + REWRITE TRUST/ENVELOPE`

**Canonical destination**

```text
DurableJob dispatcher
 -> queue transport adapter
 -> short-lived ServicePrincipal/OIDC
 -> worker audience verification
```

**Gate**

- production credentials missing -> job enqueue fails/DEGRADED, direct unauthenticated fallback yok,
- task has jobId, commandId/correlationId, attempt semantics and idempotency key,
- worker verifies issuer/audience/service principal.

---

## W3-JOB-002 — Firestore queue primitive

**Path**

- `apps/web/src/lib/islemKuyrugu.ts`

**Current strengths**

- persistent Firestore queue,
- FIFO fetch,
- transaction-based claim,
- attempt counter,
- explicit pending/processing/success/error state.

**Missing production semantics**

- lease expiry / heartbeat,
- stuck-processing recovery,
- retry/backoff schedule,
- max attempts,
- idempotency key,
- DLQ,
- replay,
- payload classification/retention,
- generic command/event causality.

**Disposition:** `PRESERVE ALGORITHM/SCHEMA SEED + PROMOTE TO DURABLE JOB`

**Action**

`islem_kuyrugu` can be migrated/adapted into canonical DurableJob store or become a compatibility producer. It cannot remain a messaging-only second queue authority beside Cloud Tasks without explicit role separation.

**Gate**

- worker crash after claim recoverable,
- duplicate enqueue idempotent where command requires it,
- retry policy explicit,
- terminal failure DLQ/replayable.

---

## W3-JOB-003 — Queue processor cron

**Path**

- `apps/web/src/app/api/cron/kuyruk-isleyici/route.ts`

**Current role**

- takes up to 3 waiting jobs,
- atomically claims,
- executes WhatsApp/agent work,
- marks complete/error.

**Critical trust issue**

Route comment states `/api/cron/*` is public; handler itself has no auth/service-principal verification.

**Disposition:** `REWRITE AS DURABLE WORKER ADAPTER`

**Canonical destination**

```text
verified ServicePrincipal
 -> lease Job
 -> capability-aware handler
 -> Provider/Domain result
 -> complete/retry/DLQ
```

**Gate:** random internet GET cannot process queue; replay/attempt state visible.

---

## W3-JOB-004 — Site generation worker

**Path**

- `apps/web/src/app/api/workers/site-ureticisi/route.ts`

**Current strengths**

- explicit internal token check,
- fail if `CRON_SECRET` absent,
- returns 500 on failure so Cloud Tasks retries,
- site feature gate.

**Current limit**

Shared `CRON_SECRET` is service identity and job authorization at once.

**Disposition:** `PRESERVE WORKER FAILURE SEMANTICS + REWIRE SERVICE AUTH`

Final site-generation business behavior belongs W4. W3 only establishes trusted job envelope and retry semantics.

---

# 3. Service principal split

## W3-SVC-001 — Shared cron/internal secret retirement

**Affected paths**

- `apps/web/src/lib/apiGuard.ts`
- `apps/web/src/lib/cloudTasksClient.ts`
- `apps/web/src/app/api/workers/site-ureticisi/route.ts`
- `apps/web/src/app/api/cron/**`

**Disposition:** `REWRITE`

Canonical guards:

```text
requireServicePrincipal(subject, audience, scopes)
requireTaskInvocation(queue/capability)
requireSchedulerInvocation(job/scope)
```

**Action**

- human admin auth remains W1 AdminPrincipal,
- service auth short-lived signed/OIDC where supported,
- subject/audience/environment/scope verified,
- `CRON_SECRET` compatibility only during migration, then retire.

**Gate:** one service credential compromise cannot impersonate human admin or arbitrary worker scope.

---

# 4. Credential Authority exact tasks

## W3-CRED-001 — AES-GCM token primitive

**Path**

- `apps/web/src/lib/tokenSifreleme.ts`

**Strengths**

- AES-256-GCM,
- random IV,
- auth tag,
- fail-closed key validation.

**Current limit**

Ciphertext format `iv:tag:data`; no key ID/version.

**Disposition:** `PRESERVE CRYPTO PRIMITIVE + REWRITE ENVELOPE`

Canonical envelope:

```text
EncryptionEnvelope {
  kid
  alg
  iv
  tag
  ciphertext
}
```

**Gate**

- encrypt uses active key only,
- decrypt supports explicit active + temporary verify/decrypt-only previous key,
- lazy re-encryption works,
- previous key can be retired without losing old grants.

---

## W3-CRED-002 — Credential registry / resolver

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Minimum metadata:

```text
CredentialDefinition
- credentialId
- provider
- kind
- ownerType platform|tenant|business|service
- ownerId?
- scopes
- status
- activeVersion
- allowedCallers
- rotationPolicy

CredentialVersion
- credentialId/version
- secretRef
- prepared|active|verify_only|retired|revoked
- activation/expiry/revocation timestamps
```

Secret bytes live in Secret Manager/KMS/provider-native secure storage, not canonical DB record.

---

## W3-CRED-003 — Environment readiness

**Path**

- `apps/web/src/lib/envReadiness.ts`

**Strength:** capability-before-launch readiness intent.

**Current limit:** hand-curated env-name lists cover only part of credential graph and still treat `ADMIN_SECRET_TOKEN` as recommended launch input.

**Disposition:** `PRESERVE UX/READINESS INTENT + REWIRE TO MACHINE REGISTRY`

Target:

```text
CapabilityDefinition.requiresCredentials[]
 -> Credential/Integration readiness
 -> DISABLED | MISSING_CREDENTIAL | MISCONFIGURED | READY | DEGRADED | ROTATING | REVOKED
```

Health outputs never reveal secret/ciphertext/prefix/private path.

---

## W3-CRED-004 — Confidential public-env fallback

**Path**

- `apps/web/src/lib/unsplashService.ts`

**Current behavior**

`UNSPLASH_ACCESS_KEY || NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ''`.

**Disposition:** `HARD-CUT CONFIDENTIAL NEXT_PUBLIC FALLBACK`

**Preserve:** Unsplash provider adapter, cache, rate-limit, circuit-breaker, legitimate content fallback behavior.

**Gate:** confidential provider credential never enters public build namespace.

---

## W3-CRED-005 — Provider clients direct env lookup

**Representative paths**

- `apps/web/src/lib/twilioClient.ts`
- `apps/web/src/lib/twilioProvisioning.ts`
- `apps/web/src/lib/googleBusinessClient.ts`
- `apps/web/src/lib/metaGraphClient.ts`
- `apps/web/src/lib/iyzicoClient.ts`
- `apps/web/src/lib/telegram.ts`
- Cloudflare provider primitives/package

**Disposition:** `PRESERVE PROVIDER KNOW-HOW + REWIRE CREDENTIAL RESOLUTION`

Provider adapter receives a credential handle/context; it does not decide which tenant/platform secret source is authoritative.

Payment business semantics remain W6; W3 only supplies secure credential/provider adapter boundary.

---

# 5. IntegrationConnection exact tasks

## W3-CONN-001 — Canonical connection aggregate

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

```text
IntegrationConnection {
  connectionId
  businessId
  provider
  authMode
  credentialRef?
  providerPrincipalId?
  scopes[]
  status
  connectedAt?
  lastHealthyAt?
  lastErrorCode?
  lastErrorAt?
  revision
}
```

State family:

```text
PENDING_AUTH
 -> CONNECTED
 -> DEGRADED
 -> REAUTH_REQUIRED / EXPIRED
 -> REVOKING -> REVOKED
 -> DISCONNECTING -> DISCONNECTED
```

---

## W3-CONN-002 — Google OAuth init

**Path**

- `apps/web/src/app/api/auth/google/init/route.ts`

**Strengths**

- authenticated start,
- `business.manage` scope,
- offline access,
- consent prompt,
- HMAC state.

**Current issue:** state is essentially `esnafId + signature`, not an authorization-attempt/connection identity.

**Disposition:** `PRESERVE PROVIDER OAUTH INTENT + REWIRE STATE`

Target:

```text
CreatePendingConnectionAttempt
 -> opaque one-time state
 -> provider auth URL
```

State binds user/session/business/provider/scopes/expiry and cannot be replayed.

---

## W3-CONN-003 — Google OAuth callback

**Path**

- `apps/web/src/app/api/auth/google/callback/route.ts`

**Strengths**

- timing-safe HMAC check,
- code exchange,
- refresh-token requirement,
- encrypted access/refresh token.

**Current issue**

Writes encrypted tokens into singleton `esnaflar/{id}/integrations/google_gmb` with `baglanti: true`; no stable connectionId/resource binding/reconnect lifecycle.

**Disposition:** `REWRITE TO CONNECTION + CREDENTIALREF`

Target:

```text
consume PendingConnectionAttempt
 -> exchange token
 -> Credential Authority stores envelope/reference
 -> IntegrationConnection transition
 -> discover/verify provider principal/resources
 -> ProviderResourceBinding(s)
 -> CONNECTED only when required readiness passes
```

---

## W3-CONN-004 — Google runtime client drift

**Path**

- `apps/web/src/lib/googleBusinessClient.ts`

**Current issue**

Reads `googleAccessToken`, `googleAccountId`, `googleLocationId` directly from tenant root, which differs from OAuth callback storage.

**Disposition:** `PRESERVE API KNOW-HOW + REWIRE CONNECTION RESOLVER`

Target function receives/resolves healthy connection + account/location binding + credential handle.

**Gate:** OAuth-completed connection is the same authority runtime client uses; refresh/re-auth state observable.

---

## W3-CONN-005 — Meta outbound client

**Path**

- `apps/web/src/lib/metaGraphClient.ts`

**Current issue:** reads `instagramAccessToken` + `instagramAccountId` from tenant root.

**Disposition:** `PRESERVE PROVIDER CALL + REWIRE CONNECTION/RESOURCE/CREDENTIAL`

---

# 6. ProviderResourceBinding / provisioning

## W3-RES-001 — Twilio provisioning helper

**Path**

- `apps/web/src/lib/twilioProvisioning.ts`

**Strengths**

- real account client,
- finds available number,
- configures webhook,
- friendly-name assignment.

**Critical problems**

- missing credential returns fake `+9055500000000`,
- writes `twilioNumarasi` + settings directly to tenant root,
- no binding lifecycle/reconciliation.

**Disposition:** `PRESERVE PROVIDER PROVISIONING KNOW-HOW + REWRITE RESOURCE AUTHORITY`

Target:

```text
ProvisionProviderResource Job
 -> Twilio adapter
 -> ProviderResourceBinding(status/resourceSid/phone/webhook config)
 -> projection to legacy field if still required
```

**HARD-CUT:** production mock number success.

---

## W3-RES-002 — Admin number pool purchase/list

**Path**

- `apps/web/src/app/api/admin/numara-havuzu/route.ts`

**Strengths**

- real Twilio availability lookup,
- TR then US fallback,
- real number purchase,
- records SID/webhook/source/state.

**Disposition:** `PRESERVE ADMIN UX/PROVISIONING INTENT + REWIRE COMMAND`

Canonical flow:

```text
AdminPrincipal
 -> ProvisionProviderResource command
 -> DurableJob
 -> Integration/Provider adapter
 -> resource inventory/binding
 -> admin read model
```

`numeraHavuzu` can migrate to provider resource inventory/read projection; admin is not resource authority.

---

## W3-RES-003 — Misnamed Twilio sync

**Path**

- `apps/web/src/app/api/admin/numara-havuzu/[id]/twilio-esitle/route.ts`

**Current behavior:** only updates local `twilioWebhook` string; no provider API reconciliation.

**Disposition:** `REWRITE AS REAL RECONCILIATION OR RENAME/RETIRE`

**Gate:** “sync” means provider state read/compare/repair, not local field edit.

---

# 7. Inbound webhook exact tasks

## W3-IN-001 — WhatsApp legacy ingress A

**Path**

- `apps/web/src/app/api/whatsapp/route.ts`

**Strengths**

- quick ACK intent,
- queue handoff,
- rate/opt-out/quota seeds.

**Critical issue:** tenant lookup derives from inbound customer `From` phone using `getEsnafByPhone()`; sender identity cannot select tenant. No canonical Twilio request signature verification shown.

**Disposition:** `ADAPTER THEN CONSOLIDATE`

Ingress target:

```text
verify Twilio signature
 -> parse event
 -> resolve destination resource
 -> ProviderResourceBinding
 -> IntegrationConnection
 -> providerEventId dedupe
 -> IntegrationEventInbox commit
 -> ACK
 -> async domain/message processing
```

Messaging/consent handling continues W5.

---

## W3-IN-002 — WhatsApp legacy ingress B

**Path**

- `apps/web/src/app/api/wa/musteri-mesaji/route.ts`

**Strengths**

- tenant lookup uses Twilio destination `To`,
- MessageSid dedupe seed,
- fast ACK/async intent.

**Problems**

- root `twilioNumarasi` lookup instead of resource binding,
- dedupe is stored in conversation domain rather than ingress authority,
- no common signature guard,
- fire-and-forget async processing has no explicit durable inbox guarantee.

**Disposition:** `STRONGER SEED, REWIRE TO CANONICAL INGRESS`

After cutover only one Twilio provider ingress authority remains.

---

## W3-IN-003 — Instagram webhook A

**Path**

- `apps/web/src/app/api/instagram/webhook/route.ts`

**Problems**

- GET verify token handshake is not POST authenticity verification,
- tenant resolve by root `instagramAccountId`,
- inline AI + outbound provider work before ACK,
- error catch returns HTTP 200 without durable inbox commit,
- provider event can be lost.

**Disposition:** `ADAPTER THEN RETIRE DUPLICATE`

---

## W3-IN-004 — Instagram webhook B

**Path**

- `apps/web/src/app/api/instagram/dm-webhook/route.ts`

**Problems / seeds**

- uses different `INSTAGRAM_WEBHOOK_TOKEN`,
- tenant resolve by different root field `instagramUserId`,
- outbound uses global `INSTAGRAM_ACCESS_TOKEN`,
- batch lookup/Promise.allSettled is useful processing seed,
- still no canonical event signature + durable inbox.

**Disposition:** `ADAPTER THEN CONSOLIDATE`

**Gate:** single provider ingress contract, one resource-binding authority, one credential selection policy.

---

## W3-IN-005 — Canonical webhook adapter contract

**Disposition:** `GREENFIELD CONTRACT`

Per-provider adapter supplies:

```text
verifyWebhook(request)
parseProviderEvent(request)
resolveProviderResource(event)
extractProviderEventId(event)
```

Ingress platform owns:

```text
connection resolution
resource binding
dedupe
inbox commit
ACK
retry/DLQ/replay
```

---

# 8. IntegrationEventInbox / idempotency

## W3-INBOX-001 — Provider-event dedupe

**Disposition:** `GREENFIELD CANONICAL AUTHORITY`

Unique key seed:

```text
(provider, connectionId, providerEventId)
```

State:

```text
RECEIVED
VERIFIED
QUEUED
PROCESSING
PROCESSED
FAILED_RETRYABLE
DLQ
IGNORED
```

Raw payload storage is classification/retention-controlled and not default log/audit truth.

---

# 9. Reconciliation / health

## W3-REC-001 — Connection reconciliation worker

**Disposition:** `GREENFIELD`

Checks include:

- credential expired/revoked,
- scopes changed,
- provider principal inaccessible,
- account/page/location/phone resource removed or reassigned,
- webhook subscription/config drift,
- token refresh/re-auth requirement,
- local resource binding mismatch.

Output updates connection/binding health with reason codes and audit/telemetry.

---

## W3-REC-002 — Simulated provider success

**Path**

- `apps/web/src/lib/gmbClient.ts`

**Current behavior:** generates AI review reply, does not POST to Google, yet writes local `gmbYorumlari.durum='yanitlandi'` and returns success.

**Disposition:** `DROP PRODUCTION FAKE SUCCESS / PRESERVE CONTENT-GENERATION SEED`

Target:

```text
AI draft generated
 != provider reply sent

Provider adapter verified outcome
 -> local projection `sent/replied`
```

W7/W8 own marketing/AI proposal semantics; W3 owns real provider outcome boundary.

---

# 10. Readiness and capability dependency bridge

W2 `EffectiveCapabilitySet` consumes W3 health; W3 does not own commercial entitlement.

Examples:

```text
messaging.whatsapp.send
  entitlement from W2
  AND IntegrationConnection twilio/messaging READY

ads.manage
  entitlement from W2
  AND Meta/Google connection READY

site.publish.custom_domain
  entitlement from W2
  AND Cloudflare/registrar credential+connection READY
```

Reason codes flow back to capability resolver:

```text
MISSING_CREDENTIAL
CONNECTION_PENDING
REAUTH_REQUIRED
RESOURCE_NOT_READY
PROVIDER_DEGRADED
WEBHOOK_INVALID
RATE_LIMITED
```

---

# 11. W3 exact task order

```text
T1  Define Command/Event/Job envelope + correlation/idempotency contracts
T2  Define DurableJob state, lease, retry/backoff, DLQ/replay
T3  Promote/adapt `islemKuyrugu` and Cloud Tasks behind one execution contract
T4  Replace shared cron/internal trust with scoped ServicePrincipal/OIDC
T5  Define CredentialDefinition/Version/Ref + encryption envelope with `kid`
T6  Add machine-readable credential/capability readiness registry
T7  Define IntegrationConnection lifecycle
T8  Define ProviderResourceBinding/WebhookSubscription/SyncCursor
T9  Backfill/discover Google/Meta/Twilio connection/resource state read-only
T10 Rewire Google OAuth init/callback to PendingConnection + CredentialRef
T11 Rewire outbound Google/Meta/Twilio clients to connection-aware credential resolver
T12 Rewire Twilio provisioning/admin number pool to durable resource commands
T13 Build provider webhook verification adapter contract
T14 Build IntegrationEventInbox + ingress idempotency
T15 Consolidate duplicate WhatsApp ingress paths
T16 Consolidate duplicate Instagram ingress paths
T17 Add connection reconciliation/health worker
T18 Remove production provider mock-success/fallback paths
T19 Add disconnect/revoke/re-auth lifecycle hooks for W10 offboarding
T20 Acceptance, replay, provider-drift and negative trust tests
```

Parallelization:

- T1–T8 are contracts/foundation and can split across execution/credential/integration lanes with shared IDs/correlation contract.
- T9 discovery/backfill is read-only after schemas stabilize.
- T10–T12 outbound/provisioning can parallel T13–T16 inbound ingress after connection/resource contracts stabilize.
- T17 requires provider adapters/resolution.
- T19 defines hook now; full tenant offboarding orchestration closes W10.

---

# 12. W3 acceptance matrix

| Senaryo | Beklenen |
|---|---|
| Cloud Tasks credential unavailable in production | no unauthenticated direct HTTP downgrade |
| Job worker crash after claim | lease expires/retry; job not lost |
| Same idempotency key enqueue twice | one logical effect |
| Retry max exceeded | DLQ + observable reason |
| DLQ replay | same causality/idempotency preserved |
| Random internet call to cron/worker | deny |
| Wrong service audience/subject | deny |
| Encryption key rotation | old grant decrypts/re-encrypts, connection ID unchanged |
| Confidential key in `NEXT_PUBLIC_*` | build/policy violation |
| Google OAuth state replay | reject |
| Same Google authorization callback retry | duplicate connection/grant not created |
| Token revoked | `REAUTH_REQUIRED` |
| Provider location/page/phone removed | reconciliation `DEGRADED` |
| Twilio provisioning credential absent | fake phone number success yok |
| Twilio inbound invalid signature | no inbox/domain effect |
| WhatsApp sender belongs elsewhere | tenant resolution destination binding'den değişmez |
| Same Twilio MessageSid/event twice | one inbox/domain effect |
| Instagram invalid signature | no processing |
| Duplicate Instagram root fields disagree | canonical resource binding wins |
| Processing fails after verified inbox commit | ACK safe, async retry occurs |
| Unknown provider resource | no tenant route |
| Provider 429 | connection-aware backoff/degraded state |
| `twilio-esitle` | real provider reconciliation or no misleading sync claim |
| GMB mock reply path | cannot mark provider reply as sent without provider outcome |
| Disconnect/revoke | new outbound action fail-closed |

---

# 13. Frontend/public dependency check

W3 does **not** redesign Kepenk public frontend.

Potential consumer surfaces preserved and rewired later/alongside:

- integration connect buttons/status badges,
- dashboard connection health,
- admin number pool UX,
- setup/onboarding integration status,
- public messaging/action behavior.

Frontend reads `ConnectionHealth`/capability projections; it never reads raw credential values.

---

# 14. W3 cleanup candidates after gate

### HARD-CUT / retire

- production `dev-secret-123` internal task fallback,
- unauthenticated/direct production task fallback,
- confidential `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` fallback,
- production fake Twilio number success,
- production mock GMB sent-success,
- webhook authenticity fail-open behavior.

### Projection-only after cutover

- root `googleAccessToken`, `instagramAccessToken`, account/page/location IDs,
- `twilioNumarasi`,
- boolean `baglanti` / `connected`,
- local webhook URL strings used as connection truth.

### Adapter/legacy route retirement

- duplicate `/api/whatsapp` vs `/api/wa/musteri-mesaji`,
- duplicate `/api/instagram/webhook` vs `/api/instagram/dm-webhook`,
- raw env/global tenant-facing Instagram token path,
- generic shared-secret cron/internal guard.

### Preserve

- provider API request/response knowledge,
- Google OAuth flow intent,
- Twilio provisioning/purchase logic,
- AES-GCM primitive,
- Cloud Tasks transport,
- Firestore queue transaction/claim seed,
- adapter-level rate-limit/circuit-breaker algorithms,
- operational readiness concept.

---

# 15. W3 final verdict

> **Kepenk'in provider entegrasyonlarında değerli client/provisioning/queue bilgisi zaten var. Eksik olan bunları tek trust ve lifecycle altında birleştiren omurgadır. W3 provider kodunu yeniden yazmak için değil; credential, connection, resource binding, verified ingress ve durable execution authority'lerini kurup mevcut adapter'ları bu omurgaya takmak için vardır.**
