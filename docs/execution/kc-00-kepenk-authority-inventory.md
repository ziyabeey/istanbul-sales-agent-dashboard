# KC-00 Kepenk Authority Inventory

**Status:** Kepenk static repository lane complete; cross-repo KC-00 acceptance remains open only for hosted numeric evidence  
**Snapshot date:** 2026-09-16  
**Authority contract:** Randevu `docs/plan/k04-platform-core-contract.md` on `main@7320a9265b6bfdba05300868058b8ec6c69c5177`  
**Scope:** Kepenk repository authority surfaces. Hosted/runtime facts are explicitly separated and must not be inferred from source code.

## Purpose

This inventory is Kepenk-side evidence for the already-binding K04 platform-core contract. It describes what Kepenk treats as authoritative today and identifies the migration seams required by K04. It does not create a competing topology, tenant, identity, booking, billing, or credential authority.

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
10. K04 already freezes the target authority: existing Randevu Supabase/Postgres owns User/Business/Membership and new Core commercial state; Randevu/Postgres owns booking/salon domains; Firestore is projection/legacy only; Firebase Auth is an identity adapter only.

## Authority surface inventory

| Surface | Current repository authority | Current tenant/subject key | Main evidence / entry points | K04 target | Required action |
| --- | --- | --- | --- | --- | --- |
| Admin authentication | NextAuth Credentials + Firestore `admin_users` | admin identity | `apps/web/src/auth.ts` | Pilot-0 AdminPrincipal/AdminSession | Converge in P0-06/P0-07; keep operator authority separate from business membership |
| Human user identity | Firestore `auth_users`, `auth_identities` | canonical user/identity ids inside Pilot-0 model | `apps/web/src/lib/auth/*Repository.ts`, `apps/web/src/lib/auth/firestore.ts` | Supabase Auth + Postgres platform identity | Preserve domain interfaces and RequestContext semantics; replace Firestore persistence authority |
| Human membership | Firestore `auth_memberships` | tenant id + user id | `membershipRepository.ts`, `businessSession.ts` | `public.businesses` + `public.memberships` | Make active membership the canonical business authorization source |
| Human sessions | Firestore `auth_sessions` + signed locator cookie | session id | `sessionRepository.ts`, `sessionManager.ts` | host-local session backed by canonical platform identity/membership | Preserve opaque/signed session boundary; move durable authority to Core |
| OTP compatibility | Firestore `otp_sessions` | phone/session identifiers | `sessionManager.ts` | canonical identity/auth orchestration | Migrate as an identity implementation concern, not tenant authority |
| Business/tenant root | Firestore `esnaflar/{esnafId}` | legacy `esnafId` | `firebaseAdmin.ts`, API routes | `public.businesses.id` UUID + profile | Introduce deterministic alias mapping; stop treating `esnafId` as platform primary key |
| Legacy tenant authorization | Session `esnafId` + Firestore document ownership | `esnafId` | `esnafOwnership.ts` | canonical `business_id` from active membership / RequestContext | Compatibility-only during migration; remove as write authority at cutover |
| Booking | Firestore `randevular` | `esnafId` | `apps/web/src/app/api/randevu/**` | Randevu/Postgres Booking Core using canonical `business_id` | Convert Kepenk API into adapter/proxy or remove it; prohibit new Firestore booking writes |
| Booking policy/types | `@kepenk/booking-schema` TypeScript package | types only | `packages/booking-schema` | policy vocabulary only | Reuse concepts where useful; no database ownership or parallel state machine |
| Usage / daily quota | Firestore `kota_kullanim/{esnafId_date}` | `esnafId` + date | `firebaseAdmin.ts` | Core Usage/Quota keyed by canonical `business_id` | Backfill/reconcile and move authoritative mutation to Postgres |
| Credits | Firestore `esnaflar/{id}/kredi/{YYYY-MM}` | `esnafId` + month | `firebaseAdmin.ts` | Core Commercial/Usage model | Replace embedded Firestore ledger/counter with explicit canonical records |
| Subscription / entitlement | No clean canonical repository model established by static evidence | n/a | repository inventory | K04 `core.*` commercial model | Create in KC-01 on the Randevu migration chain; do not infer current paid state from code |
| Business stats / operations | Firestore root + `esnaflar/{id}/islemler` | `esnafId` | `firebaseAdmin.ts` | split by domain; canonical business id everywhere | Classify projection vs canonical domain state before migration |
| Provider credentials | Pilot-0 CredentialRef/envelope/resolver contract, currently env + encrypted Firestore implementation | logical credential ref | P0-05 credential modules | platform credential plane | Preserve logical contract; physical storage may migrate independently of consumers |
| Browser data access | Kepenk HTTP APIs; no Firebase client SDK dependency found in web package | session / API context | `apps/web/package.json`, `EsnafContext.tsx` | API/BFF boundary over Core | Preserve. Do not introduce direct browser database authority during migration |
| Firebase Rules `sites/*` | Ruleset expects Firebase Auth custom claim `sites` | Firebase auth claims | `firestore.rules`, `firebase.json` | legacy/deployed-client question | Verify hosted deployment and active callers before deleting or weakening rules |

## Human auth finding

Pilot-0 already created the right **shape** for server-side human authorization: a signed/opaque session locator resolves a durable Session, User, and Membership into a RequestContext. Canonical code rejects noncanonical session forms where canonical context is required.

KC should not rewrite this contract merely because its repositories are currently Firestore-backed. The seam to replace is persistence and identity authority. KC-02 will resolve the same concepts from Supabase Auth/Postgres while temporary legacy `esnafId` handling remains an explicitly bounded compatibility path.

## Tenant finding

`esnafId` is currently both an identifier and an authorization join key across legacy Kepenk surfaces. It must not be reused as the platform primary key.

K04 fixes the canonical tenant key as:

```text
public.businesses.id : UUID
```

Legacy identifiers become external aliases under Core, conceptually:

```text
core.tenant_aliases
- business_id UUID -> public.businesses.id
- provider TEXT     # legacy-kepenk-firestore
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

K04 fixes the direction:

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

KC must separate these concerns into explicit Postgres records keyed by `business_id`. Subscription, Entitlement, Capability, Usage, and Quota become intentional platform concepts rather than additional fields on `esnaflar`.

Randevu salon-side adisyon/tahsilat is a separate operational-money domain and must not be conflated with Kepenk SaaS subscription billing.

## Launch product decision for KC-01

The current launch scope is intentionally **one package**, not three artificial tiers. KC-01 therefore must not manufacture plan variants merely to satisfy a seed-count convention.

### Plan key

```text
kepenk_standard
```

- Monthly versus annual purchase is a **billing interval/term**, not a different entitlement plan.
- The initial three-month tester access is a **trial period/status**, not a separate plan.
- Pricing values do not live in application code or schema defaults. K04's product-price rule remains intact.

### Initial entitlement keys

```text
booking
ai_booking_assistant
messaging_credits
```

`messaging_credits` is the bounded/monthly consumable surface; the concrete launch allowance belongs to product/commercial configuration rather than a hard-coded authorization branch.

Additional product capabilities get new entitlement keys only when a real product boundary exists. Missing entitlements fail closed.

### Slug policy

- canonical public business slug follows the existing Randevu slugify/reserved-name policy;
- conflicts fail closed and are reported for explicit resolution;
- migration does not silently rename an existing business;
- legacy Kepenk slug/domain values may be preserved as aliases/projections but do not become a second canonical tenant identifier.

This closes the KC-00 **product-decision** portion. Hosted numeric evidence remains the only open KC-00 acceptance lane.

## Credential authority finding

P0-05 remains valid under the K04 topology. `CredentialRef`, versioned encrypted envelopes, resolver contracts, key rotation/revocation behavior, and provider-handle consumption are platform concerns independent of which database owns Business/Membership.

KC therefore preserves the logical credential contract. Moving encrypted credential records away from Firestore, if desired later, is a storage migration behind the resolver and not a reason to reintroduce provider secrets into tenant documents or browser-visible configuration.

## Hosted numeric evidence still required

The following facts cannot be established safely from this repository snapshot and must be measured from deployed systems before cross-repo KC-00 is acceptance-complete:

1. Firestore document counts for `esnaflar`, `randevular`, `auth_*`, `otp_sessions`, `kota_kullanim`, credential collections, and relevant subcollections.
2. Active Firebase Auth user counts and sign-in method distribution.
3. Real production tenant/user population, if any, versus staging/test fixtures.
4. Deployed Firestore rules version/hash and whether `sites/*` is still a live authorization surface.
5. Read/write volume by Firestore collection and by Kepenk API route where observable.
6. External or legacy callers still presenting `esnafId` JWT/session forms.
7. Any active browser/client application that talks directly to Firestore outside this repository's current web dependency graph.
8. Deployed Cloud Functions or other workers that mutate these collections and are not captured by the web application path.
9. Existing real SaaS subscription/payment/entitlement records, if any.
10. Runtime consumers of `/api/randevu` that require a compatibility window during booking cutover.

Absence from source code is not evidence that these hosted populations are zero. If hosted access is unavailable, the receipt must say so and KC-01 writer-token opening remains a coordinator decision rather than silently assuming zero.

## K04 invariants carried into KC implementation

KC implementation must preserve all of the following:

1. Supabase/Postgres is the canonical platform authority for User, Business, Membership, and Commercial state.
2. `public.businesses.id` UUID is the platform tenant key.
3. Existing Kepenk `esnafId` values become aliases, not canonical identifiers.
4. The Pilot-0 RequestContext/session/membership contract is preserved while its persistence authority moves behind repositories/adapters.
5. Randevu/Postgres is the only Booking Core write authority.
6. Kepenk Firestore booking writes are migration-only and end at cutover.
7. Firestore becomes projection/cache/legacy compatibility rather than tenant/auth/commercial authority.
8. ServicePrincipal is machine identity only and cannot confer business membership.
9. AdminPrincipal/AdminSession is operator authority and cannot silently become business membership.
10. P0-05 CredentialRef/resolver/envelope remains the provider-credential contract.
11. SaaS billing may execute in Kepenk services, but authoritative Subscription/Entitlement/Quota changes use narrow, idempotent Core commands keyed by canonical `business_id`.
12. No new dual-authority surface may be introduced during migration.

## KC-00 lane exit

The **Kepenk static repository lane** is complete when this document is merged to `main` and its claims remain bounded to repository evidence.

Cross-repo **KC-00 acceptance is not declared complete by this document alone**. K04 and the Randevu KC migration plan require the hosted numeric inventory to be attached to the coordination receipt, or an explicit coordinator waiver/risk decision, before KC-01 receives the migration writer token.
