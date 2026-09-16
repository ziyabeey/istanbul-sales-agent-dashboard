# KC-00 Kepenk Authority Inventory

**Status:** static repository inventory complete  
**Snapshot date:** 2026-09-16  
**Scope:** Kepenk repository authority surfaces only. Hosted/runtime facts are explicitly separated and must not be inferred from source code.

## Purpose

KC-00 establishes what Kepenk treats as authoritative today before the platform authority is converged with Randevu. It is intentionally descriptive. It does not create a new tenant, identity, booking, billing, or credential authority.

## Executive finding

1. The current Kepenk web application does **not** show a structural browser dependency on the Firebase client SDK. The web package depends on `firebase-admin`, and browser state such as `EsnafContext` is loaded through Kepenk HTTP APIs.
2. Pilot-0's human identity/session model is reusable, but its durable repositories are still Firestore-backed: `auth_users`, `auth_identities`, `auth_memberships`, and `auth_sessions`.
3. `esnaflar/{esnafId}` remains a load-bearing legacy business aggregate. Business profile/state, statistics, operations, credit, and usage concerns are coupled to the legacy `esnafId` key.
4. Kepenk currently contains a second booking write authority. `/api/randevu` reads and writes Firestore `randevular` directly and authorizes ownership with `esnafId`.
5. `packages/booking-schema` is a TypeScript policy/type surface, not a database authority. Its concepts may be reused, but it must not become a second canonical Booking Core beside Randevu/Postgres.
6. Commercial state is not yet represented by a clean canonical Subscription/Entitlement model in this repository. Existing quota/credit accounting is embedded in Firestore (`kota_kullanim` and `esnaflar/{id}/kredi/{YYYY-MM}`).
7. Admin authentication is still a separate NextAuth Credentials path backed by Firestore `admin_users`. Pilot-0 AdminPrincipal/AdminSession convergence remains required.
8. Root `firestore.rules` contains a Firebase Auth custom-claims `sites/*` authorization model, but static repository evidence does not establish whether that model is presently deployed or used by active browser clients.
9. The static repository therefore does **not** show the specific condition that would force Kepenk to preserve Firebase as the canonical human/tenant authority: an important live population combined with structural client-side Firestore-rules dependence. Hosted evidence is still required before destructive cutover.

## Authority surface inventory

| Surface | Current repository authority | Current tenant/subject key | Main evidence / entry points | KC target | Required action |
| --- | --- | --- | --- | --- | --- |
| Admin authentication | NextAuth Credentials + Firestore `admin_users` | admin identity | `apps/web/src/auth.ts` | Pilot-0 AdminPrincipal/AdminSession | Converge in P0-06/P0-07; keep operator authority separate from business membership |
| Human user identity | Firestore `auth_users`, `auth_identities` | canonical user/identity ids inside Pilot-0 model | `apps/web/src/lib/auth/*Repository.ts`, `apps/web/src/lib/auth/firestore.ts` | Supabase Auth + Postgres platform identity | Preserve domain interfaces and RequestContext semantics; replace Firestore persistence authority |
| Human membership | Firestore `auth_memberships` | tenant id + user id | `membershipRepository.ts`, `businessSession.ts` | Postgres `businesses` + memberships | Make active membership the canonical business authorization source |
| Human sessions | Firestore `auth_sessions` + signed locator cookie | session id | `sessionRepository.ts`, `sessionManager.ts` | Host-local session backed by canonical platform identity/membership | Preserve opaque/signed session boundary; move durable authority to Core |
| OTP compatibility | Firestore `otp_sessions` | phone/session identifiers | `sessionManager.ts` | Canonical identity/auth orchestration | Migrate as an identity implementation concern, not tenant authority |
| Business/tenant root | Firestore `esnaflar/{esnafId}` | legacy `esnafId` | `firebaseAdmin.ts`, API routes | Postgres `businesses.id` UUID + business profile | Introduce deterministic alias mapping; stop treating `esnafId` as platform primary key |
| Legacy tenant authorization | Session `esnafId` + Firestore document ownership | `esnafId` | `esnafOwnership.ts` | canonical `business_id` from active membership / RequestContext | Compatibility-only during migration; remove as write authority at cutover |
| Booking | Firestore `randevular` | `esnafId` | `apps/web/src/app/api/randevu/**` | Randevu/Postgres Booking Core using canonical `business_id` | Convert Kepenk API into adapter/proxy or remove it; prohibit new Firestore booking writes |
| Booking policy/types | `@kepenk/booking-schema` TypeScript package | types only | `packages/booking-schema` | Policy vocabulary only | Reuse concepts where useful; no database ownership or parallel state machine |
| Usage / daily quota | Firestore `kota_kullanim/{esnafId_date}` | `esnafId` + date | `firebaseAdmin.ts` | Core Usage/Quota keyed by canonical `business_id` | Backfill/reconcile and move authoritative mutation to Postgres |
| Credits | Firestore `esnaflar/{id}/kredi/{YYYY-MM}` | `esnafId` + month | `firebaseAdmin.ts` | Core Commercial/Usage model | Replace embedded Firestore ledger/counter with explicit canonical records |
| Subscription / entitlement | No clean canonical repository model established by static evidence | n/a | repository inventory | Core Subscription/Entitlement/Capability | Define in KC/P1 before product cutover; do not infer current paid state from code |
| Business stats / operations | Firestore root + `esnaflar/{id}/islemler` | `esnafId` | `firebaseAdmin.ts` | Split by domain; canonical business id everywhere | Classify projection vs canonical domain state before migration |
| Provider credentials | Pilot-0 CredentialRef/envelope/resolver contract, currently env + encrypted Firestore implementation | logical credential ref | P0-05 credential modules | Platform credential plane | Preserve logical contract; physical storage may migrate independently of consumers |
| Browser data access | Kepenk HTTP APIs; no Firebase client SDK dependency found in web package | session / API context | `apps/web/package.json`, `EsnafContext.tsx` | API/adapter boundary over Core | Preserve. Do not introduce direct browser database authority during migration |
| Firebase Rules `sites/*` | Ruleset expects Firebase Auth custom claim `sites` | Firebase auth claims | `firestore.rules`, `firebase.json` | legacy/deployed-client question | Verify hosted deployment and active callers before deleting or weakening rules |

## Human auth finding

Pilot-0 already created the right **shape** for server-side human authorization: a signed/opaque session locator resolves a durable Session, User, and Membership into a RequestContext. Canonical code rejects noncanonical session forms where canonical context is required.

The migration consequence is important: KC should not rewrite this contract merely because its repositories are currently Firestore-backed. The seam to replace is persistence and identity authority. The target repository implementation resolves the same concepts from Supabase Auth/Postgres, while temporary legacy `esnafId` JWT handling remains an explicitly bounded compatibility path.

## Tenant finding

`esnafId` is currently both an identifier and an authorization join key across legacy Kepenk surfaces. It must not be reused as the new platform primary key.

The canonical tenant key is:

```text
businesses.id : UUID
```

Legacy identifiers are external aliases, for example:

```text
tenant_aliases
- business_id UUID -> businesses.id
- provider TEXT     # e.g. legacy-kepenk-firestore
- external_id TEXT  # legacy esnafId
- UNIQUE(provider, external_id)
```

During migration, aliases permit deterministic lookup and parity checks without preserving two tenant authorities.

## Browser / Firestore-rules finding

Static source evidence shows:

- `@kepenk/web` depends on `firebase-admin`, not the Firebase browser SDK.
- `EsnafContext` obtains business data from Kepenk API endpoints.
- server utilities and routes access Firestore through Admin SDK helpers.
- a root Firestore ruleset exists and refers to Firebase Auth custom claim `sites`.

Therefore the repository does **not** establish a structural current-browser dependency on Firestore security rules. It also does not prove the opposite for every deployed or historical client. Deployed rules and active clients are hosted facts and remain an explicit pre-cutover verification item.

## Booking authority finding

Kepenk's current `/api/randevu` surface directly operates Firestore `randevular`, including creation/read flows and ownership checks through `esnafId`. That is a real second booking authority relative to the Randevu repository.

KC freezes the direction now:

```text
Canonical Booking Core = Randevu/Postgres
Kepenk /api/randevu = migration adapter/proxy, then removable compatibility surface
Firestore randevular = legacy source to inventory/backfill, never the target authority
```

`packages/booking-schema` may continue to express product-facing vocabulary or policy types, but it must not own booking persistence, transaction invariants, concurrency, or state-transition authority.

## Commercial / usage finding

The repository does not contain a clean canonical SaaS commercial model. What exists today is mixed into the legacy Firestore tenant aggregate:

- daily quota usage: `kota_kullanim/{esnafId_date}`
- monthly credits: `esnaflar/{id}/kredi/{YYYY-MM}`
- business statistics/operation records under the same tenant root

KC/P1 must separate these concerns into explicit Postgres records keyed by `business_id`. Subscription, Entitlement, Capability, Usage, and Quota must become intentional platform concepts rather than additional fields on `esnaflar`.

Randevu salon-side adisyon/tahsilat is a separate operational-money domain and must not be conflated with Kepenk SaaS subscription billing.

## Credential authority finding

P0-05 remains valid under the KC topology. `CredentialRef`, versioned encrypted envelopes, resolver contracts, key rotation/revocation behavior, and provider-handle consumption are platform concerns independent of which database owns Business/Membership.

KC therefore preserves the logical credential contract. Moving encrypted credential records away from Firestore, if desired later, is a storage migration behind the resolver and not a reason to reintroduce provider secrets into tenant documents or browser-visible configuration.

## Hosted evidence still required

The following facts cannot be established safely from this repository snapshot and must be measured from deployed systems before any destructive hard cut:

1. Firestore document counts for `esnaflar`, `randevular`, `auth_*`, `otp_sessions`, `kota_kullanim`, credential collections, and relevant subcollections.
2. Active Firebase Auth user counts and whether any currently active product depends on Firebase-issued browser identity.
3. Real production tenant/user population, if any, versus staging/test fixtures.
4. Deployed Firestore rules version/hash and whether `sites/*` is still a live authorization surface.
5. Read/write volume by Firestore collection and by Kepenk API route.
6. External or legacy callers still presenting `esnafId` JWT/session forms.
7. Any active browser/client application that talks directly to Firestore outside this repository's current web dependency graph.
8. Deployed Cloud Functions or other workers that mutate these collections and are not captured by the web application path.
9. Existing real SaaS subscription/payment/entitlement records, if any.
10. Runtime consumers of `/api/randevu` that require a compatibility window during booking cutover.

Absence from source code is not evidence that these hosted populations are zero.

## Hard cuts carried into KC-01

KC-01 must freeze all of the following:

1. Supabase/Postgres is the canonical platform authority for User, Business, Membership, and Commercial state.
2. `businesses.id` UUID is the platform tenant key.
3. Existing Kepenk `esnafId` values become aliases, not canonical identifiers.
4. The Pilot-0 RequestContext/session/membership contract is preserved while its persistence authority moves behind repositories/adapters.
5. Randevu/Postgres is the only Booking Core write authority.
6. Kepenk Firestore booking writes are migration-only and end at cutover.
7. Firestore becomes projection/cache/legacy compatibility rather than tenant/auth/commercial authority.
8. ServicePrincipal is machine identity only and cannot confer business membership.
9. AdminPrincipal/AdminSession is operator authority and cannot silently become business membership.
10. P0-05 CredentialRef/resolver/envelope remains the provider-credential contract.
11. SaaS billing may execute in Kepenk services, but authoritative Subscription/Entitlement/Quota changes must be narrow, idempotent Core commands keyed by canonical `business_id`.
12. No new dual-authority surface may be introduced during migration.

## KC-00 exit criteria

KC-00 static inventory is complete when this document is merged to `main` and its claims remain bounded to repository evidence.

Hosted evidence is required before destructive data/auth/booking hard cuts. It does not block KC-01 topology freeze unless it reveals a contradictory condition, especially a material live Firebase browser population with structural Firestore-rules dependence.
