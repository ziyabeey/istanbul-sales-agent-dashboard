# Pilot-0 / P0-01 — Canonical Identity / Membership / Session Core

> Branch: `p0/01-identity-session-core`  
> Base: `main@42899f72bf32a3da541259ac9d34f1c03fce7d37`  
> Scope: additive trust authority foundation  
> Serving authority after this PR: **legacy auth remains active**

## What this PR establishes

P0-01 introduces the canonical identity graph without changing existing login, proxy, dashboard, admin, or public frontend behavior.

```text
AuthIdentity -> User -> Membership -> Tenant
                    \
                     -> Session

Session + User
   -> SessionVerifier
   -> MembershipResolver
   -> RequestContext
```

Canonical persistence is intentionally separate from the legacy `esnaflar/{id}` root document:

- `auth_users`
- `auth_identities`
- `auth_memberships`
- `auth_sessions`

No package, plan, business profile, payment state, or other tenant/business fact is copied into Session.

## Canonical contracts

`packages/auth/src/types/canonical.ts` defines and validates:

- `User`
- `AuthIdentity`
- `Membership`
- `Session`
- `RequestContext`

The canonical Session contains identity/session lifecycle facts only:

- `sessionId`
- `userId`
- `issuedAt`
- `expiresAt`
- `revokedAt`
- `authMethod`
- `sessionEpoch`
- optional trusted `activeMembershipId`

Tenant id, role, plan, package, business profile, and permissions are not stored as Session truth.

## Verification semantics

`SessionVerifier` fails closed for:

- missing Session,
- revoked Session,
- expired Session,
- future/not-yet-valid Session outside allowed clock skew,
- missing User,
- disabled User,
- stale `sessionEpoch`.

`MembershipResolver` fails closed for:

- missing Membership,
- Membership/User mismatch,
- suspended Membership,
- disabled Membership,
- no active Membership,
- more than one active Membership when Session has no trusted selection.

`RequestContextBuilder` accepts a verified Session id and derives tenant/role/permission authority from Membership. It has no request-body/query/header tenant input.

## Durable repository semantics

The runtime adapter uses Firestore rather than process-local Maps:

- document `create()` for idempotency/conflict visibility,
- transaction-backed Session revocation,
- transaction-backed monotonic User session-epoch bump,
- deterministic opaque AuthIdentity id derived from provider + subject using SHA-256,
- Zod parsing on reads and writes.

Provider-specific normalization of phone/Google identities belongs to P0-02.

## Migration mapping

Legacy tenant/esnaf ids can map deterministically to canonical User ids through `legacyUserIdFromTenantId()`.

Membership ids use deterministic `membershipIdFor(userId, tenantId)` mapping so backfill/provisioning can be repeated safely.

These ids are migration/provisioning mechanics, not authorization proof.

## Explicit non-goals

This PR does **not**:

- modify `/giris`,
- issue canonical Session cookies,
- change `sessionManager.ts`,
- change `proxy.ts`,
- change `/api/auth/me`,
- revoke existing legacy JWTs,
- migrate tenant/business data,
- alter Kepenk landing/frontend design,
- alter Admin auth,
- alter cron/service auth.

Those switches are owned by later Pilot-0 PRs.

## Acceptance evidence

`canonicalAuthCore.test.ts` pins:

- revoked Session replay deny,
- expired Session deny,
- disabled User deny,
- stale session epoch deny,
- suspended Membership deny,
- ambiguous multi-membership fail-closed,
- Session schema rejects tenant/role shadow facts,
- RequestContext tenant authority comes from verified Membership rather than caller payload,
- server role policy populates RequestContext permissions,
- deterministic legacy User/Membership ids,
- opaque deterministic AuthIdentity ids.

CI hard-gates the new auth source, unit tests, and an isolated P0-01 TypeScript project while retaining P0-00 browser smoke and legacy-debt probes.

## Rollback

P0-01 is additive. If reverted before P0-02, customer traffic remains on legacy auth because no serving route consumes these canonical repositories yet.

After P0-02 starts issuing canonical Sessions, rollback rules become stricter and cannot restore cookie-presence trust or other known-risk paths.
