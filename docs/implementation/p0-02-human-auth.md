# Pilot-0 / P0-02 — Human Auth Adapters / Preserved Login UX

> Branch: `p0/02-human-auth`  
> Base: `main@deb4ec0d247cbc3547a135ae3dc2a0fb280b934d`  
> Scope: phone OTP + Google human auth issuance  
> Protected surface: `/giris` visual/interaction hierarchy is unchanged

## Cutover shape

P0-02 keeps the existing `kepenk_session` cookie name and public auth route URLs, but successful real-human logins now create durable canonical identity state:

```text
verified phone OTP / verified Google identity
        -> legacy tenant lookup (migration bridge)
        -> AuthIdentity
        -> User
        -> Membership
        -> durable Session
        -> signed canonical Session locator cookie
```

The signed cookie contains only a Session locator + User subject. It does not contain tenant, role, package, profile, payment, or other business facts.

Legacy internal APIs that still expect an `esnafId` are temporarily supported by `sessionManager.ts`:

```text
canonical cookie
 -> signature / issuer / audience verification
 -> durable Session verification
 -> User lifecycle verification
 -> Membership lifecycle verification
 -> RequestContext
 -> tenantId compatibility result
```

A token marked as canonical never falls back to the legacy parser if durable verification rejects it.

Cryptographically verified legacy `{ esnafId }` JWT reading remains only as a compatibility bridge until P0-03 request-gate convergence.

## Phone OTP

`giris-kodu-gonder` no longer reveals whether a syntactically valid phone belongs to an account. Zero-account, ambiguous-account, rate-limited, and SMS-provider-failure cases return the same generic successful response after input validation.

The migration lookup requires **exactly one active tenant**. The old `limit(1)` silent selection behavior is removed; lookup uses `limit(2)` and treats multiple matches as ambiguous.

OTP verification re-resolves the account after OTP consumption. A phone that is no longer uniquely associated with one active tenant cannot issue a Session.

Canonical phone identity subject is the normalized digits-only login number. Broader phone/account-linking policy remains a future explicit identity migration concern.

## Google

Google login keeps the existing GSI frontend flow and `/api/auth/google` route.

Server verification now requires:

- configured Google client id,
- exact audience match,
- accepted Google issuer,
- verified email,
- stable Google `sub`,
- non-empty email.

The stable Google `sub` is canonical `AuthIdentity.subject`. Email is only used to locate the legacy tenant during migration.

Legacy email lookup requires exactly one match. Multiple matching tenants fail closed instead of silently selecting one.

Existing onboarding response compatibility is preserved.

## Canonical issuance

`humanAuthService.ts` performs race-tolerant create-or-read provisioning for:

- deterministic legacy-migration User id,
- deterministic User/Tenant Membership id,
- opaque SHA-256 provider/subject AuthIdentity id,
- random durable Session id.

Phone and Google identities resolving to the same legacy tenant converge on the same canonical User + Membership while receiving separate AuthIdentity records and Sessions.

Disabled Users, suspended/disabled Memberships, identity collisions, and inconsistent Membership ownership fail closed.

## Logout

Canonical logout verifies the signed locator and writes `revokedAt` through `FirestoreSessionRepository` before clearing the cookie.

Legacy compatibility JWTs cannot be durably revoked because they predate canonical Session records; they remain cookie-clear-only until the legacy human path is retired. This residual risk is explicit in the trust baseline.

## `/api/auth/me`

The route response shape remains compatible. For canonical cookies, `oturumDogrulaServer()` now derives the tenant through canonical RequestContext. Tenant/business display fields still come from the legacy `esnaflar` projection until Pilot-1 canonical tenant migration.

## Demo

Demo login remains on the explicit legacy/demo compatibility path in this PR so local demo UX does not require canonical Firestore provisioning. P0-02 does not map demo identity to any real tenant.

## Explicitly unchanged

- `/giris` component markup/layout/visual design,
- proxy cookie-presence gate (P0-03),
- Admin auth,
- service/cron auth,
- fixed onboarding OTP hard-cut (P0-08),
- production dev-login hard-cut (P0-08),
- tenant/business profile authority (Pilot-1).

## Acceptance evidence

Hard-gated tests cover:

- phone + Google convergence on one User/Membership,
- separate AuthIdentity records and Sessions,
- identity collision deny,
- suspended Membership deny,
- canonical token issuer/audience verification,
- canonical token contains no tenant/role authority,
- phone lookup no silent `limit(1)` selection,
- Google stable-sub identity binding,
- durable canonical logout revoke,
- existing trust-browser smoke for `/giris` desktop + mobile and route redirects.

## Rollback

Routing can temporarily return to cryptographically verified legacy auth while P0-03 has not merged. Rollback must not introduce cookie-presence API authorization, fixed OTP bypasses, or unsigned tenant selection.
