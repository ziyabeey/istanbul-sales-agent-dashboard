# Pilot-0 / P0-03 — RequestContext / Proxy / API Gate Convergence

> Branch: `p0/03-request-gates`  
> Base: P0-02 merged main  
> Risk: HIGH — request authorization path  
> Frontend rule: Kepenk landing and `/giris` visual UX are preserved.

## Purpose

P0-03 makes canonical `Session -> User -> Membership -> RequestContext` the only business-login authority used by dashboard routing and the new authenticated API guard.

It removes two legacy request-gate behaviors from the business dashboard path:

1. cookie-presence authentication (`kepenk_session` exists => logged in),
2. NextAuth `req.auth` acting as a business-dashboard principal.

P0-03 does **not** migrate Admin, cron, worker or ADK trust. Those remain owned by P0-04/P0-06 and stay explicitly visible in the trust-risk register.

## Canonical authority

```text
request
  -> kepenk_session cookie
  -> signed canonical session locator
  -> durable Session
  -> User lifecycle + session epoch
  -> Membership lifecycle
  -> RequestContext
  -> route/API authorization
```

The shared authority lives in:

- `apps/web/src/lib/auth/businessSession.ts`

Consumers:

- `apps/web/src/proxy.ts`
- `apps/web/src/lib/apiGuard.ts` (`requireUserSession`)
- `apps/web/src/lib/sessionManager.ts` compatibility adapter

## Security changes

### Dashboard

The dashboard no longer accepts:

- random cookie values,
- cookie existence by itself,
- NextAuth admin/user JWT presence,
- cryptographically valid legacy `{ esnafId }` session JWTs.

A revoked/expired canonical Session, disabled User, stale session epoch, suspended/disabled Membership or invalid token all resolve to unauthenticated.

### Subdomains

`edit`, `app` and `manage` dashboard targets are authenticated **before** rewrite. This closes the historical early-return path where a subdomain root could rewrite into `/dashboard/**` before the auth block was reached.

Routing semantics remain:

- `edit.kepenk.ai` -> `/dashboard/sitem/editor`
- `app.kepenk.ai` -> `/dashboard/manage` / dashboard namespace
- `manage.kepenk.ai` -> `/dashboard/manage`
- `destek.kepenk.ai` -> `/destek`

Unauthenticated business-subdomain requests are redirected to the apex `/giris` surface with a callback target so the login route cannot be rewritten into a dashboard loop.

### API

`apiGuard` now supports:

```ts
apiGuard(request, { requireUserSession: true })
```

A successful result carries canonical `RequestContext`. Request body, query or headers do not select `tenantId`; the tenant comes only from verified Membership.

Existing Admin/Cron/ADK guard options are intentionally unchanged in this PR.

## Compatibility boundary

`sessionManager.ts` still knows how to cryptographically parse a legacy `{ esnafId }` JWT for **unmigrated API callers only**. That compatibility path is no longer accepted by the dashboard proxy or canonical API guard.

This remaining debt is registered as:

`unmigrated_business_api_callers_can_still_use_legacy_esnafId_jwt_compatibility`

Later migration/hard-cut work removes callers before deleting the parser.

## Acceptance evidence

Hard-gated tests cover:

- random cookie -> dashboard deny,
- signed legacy `{esnafId}` cookie -> dashboard deny,
- canonical RequestContext -> dashboard allow,
- app subdomain auth happens before rewrite,
- app subdomain login remains reachable,
- API user guard returns the exact canonical context,
- unresolved API session -> 401,
- request payload/query cannot replace canonical tenant authority,
- `edit/app/manage/destek` routing contract remains present,
- `/giris` desktop + 390 + 360 browser smoke remains green.

Browser smoke additionally runs real HTTP checks for unauthenticated `app`, `edit`, `manage` roots and ensures `destek` is not captured by business auth.

## Rollback

P0-03 may be reverted only to a **verified** compatibility path. Rollback must never restore:

```text
canonicalVerified || cookieExists
```

or dashboard authorization through `req.auth`.

A temporary legacy adapter, if ever required operationally, must be cryptographically verified and must perform the same User/Membership lifecycle checks before it can authorize a business request.

## Explicitly unchanged

- Admin raw-secret/process-session convergence: P0-06
- ServicePrincipal / worker trust: P0-04
- fixed onboarding OTP hard-cut: P0-08
- production dev-login hard-cut: P0-08
- protected Kepenk public landing/frontend
- `/giris` visual layout
