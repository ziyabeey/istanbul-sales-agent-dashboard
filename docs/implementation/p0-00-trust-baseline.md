# Pilot-0 / P0-00 — Trust Baseline & Evidence Harness

> Branch: `p0/00-trust-baseline`  
> Base: `main@82912585450ab4307fcf9220ab27b5c361d65792`  
> Scope: additive characterization + browser smoke only  
> Runtime behavior changes: **none**

## Purpose

P0-00 freezes the current trust surface before canonical identity/session work begins. It deliberately records insecure or inconsistent legacy behavior as **KNOWN-RISK characterization**, not as approved behavior.

Later Pilot-0 PRs must either preserve protected UX/contracts or intentionally flip the corresponding risk characterization when a hard-cut lands.

## Protected UX baseline

The following surfaces are explicitly protected by P0-00:

- `/giris` visual hierarchy and phone-login flow,
- desktop login layout,
- 390px mobile login layout,
- 360px mobile login layout,
- unauthenticated dashboard -> `/giris` redirect,
- unauthenticated admin -> `/admin/login` redirect,
- proxy subdomain intent for `edit`, `app`, `manage`, `destek`.

Browser smoke: `apps/web/test/e2e/trust-baseline.spec.ts`.

## Current cookie / principal inventory

| Surface | Current source |
|---|---|
| Business dashboard | NextAuth `req.auth` **OR presence of** `kepenk_session` cookie |
| Business API/session | signed `kepenk_session` JWT carrying `esnafId` |
| Admin page proxy | `admin_token` cookie compared to raw `ADMIN_SECRET_TOKEN` |
| Admin API | `x-admin-token` compared to raw `ADMIN_SECRET_TOKEN` |
| Cron | `x-cron-secret` / bearer compared to `CRON_SECRET` |
| ADK | bearer compared to `ADK_BEARER_TOKEN` |
| Impersonation | `kepenk_impersonate` JWT carrying `adminId + esnafId` |

Canonical Pilot-0 target later replaces this fragmented set with verified `Session`, `RequestContext`, `AdminPrincipal/AdminSession` and `ServicePrincipal` authorities.

## Current response-shape compatibility fixtures

Recorded in `apps/web/test/fixtures/trust-baseline.ts`.

### OTP login verify success

```json
{ "esnafId": "<legacy-esnaf-id>" }
```

### `/api/auth/me` normal success

Required keys:

```text
esnafId
ad
paket
sektor
durum
```

### `/api/auth/me` demo success

Required keys:

```text
esnafId
isDemo
user
ad
paket
sektor
durum
```

### Logout

```json
{ "ok": true }
```

These shapes may be maintained through adapters even when the underlying authority changes.

## Known-risk baseline

The unit characterization suite records these exact legacy risks:

1. Dashboard proxy accepts business login based on `kepenk_session` cookie presence rather than verifying that cookie at the proxy gate.
2. Admin login, proxy and API use incompatible trust authorities.
3. Onboarding SMS failure activates fixed OTP `123456`.
4. Production-visible `dev-login` has a hard-coded admin-secret fallback and can create a real `esnaflar` record.
5. Cloud Tasks missing credentials downgrades to direct HTTP execution.
6. Cloud Task worker header falls back to `dev-secret-123`.
7. Privacy cron routes can report simulated successful deletion/anonymization.
8. Logout clears the cookie but has no durable server-side Session revocation authority.

Source-level characterization: `apps/web/test/unit/trustBaseline.characterization.test.ts`.

## Shared-secret inventory, verified representatives

| Secret | Representative paths | Current role |
|---|---|---|
| `ADMIN_SECRET_TOKEN` | `src/app/api/admin/login/route.ts`, `src/proxy.ts`, `src/lib/apiGuard.ts`, `src/app/api/auth/dev-login/route.ts` | human/admin/dev trust |
| `CRON_SECRET` | `src/lib/apiGuard.ts`, `src/lib/cloudTasksClient.ts`, cron/worker entrypoints | scheduler/task trust |
| `ADK_BEARER_TOKEN` | `src/lib/apiGuard.ts` | ADK service trust |
| literal `A2A_SECRET_TOKEN` | `/api/a2a` path from W8 inventory | A2A trust |

This table is representative, not a claim that code-search produced an exhaustive caller list. P0-08 must prove old-path caller/write telemetry reaches zero before retirement.

## Production / development / demo behavior matrix

| Behavior | Production intent today | Development/demo behavior today | Pilot-0 target |
|---|---|---|---|
| Business session signing | `SESSION_SECRET` required | dev fallback secret allowed | canonical durable Session |
| Demo mode | disabled unless explicitly enabled | enabled by default outside production | isolated demo principal |
| Onboarding OTP provider failure | fixed `123456` fallback currently possible | same code path | fail closed in production |
| Dev login | route exists and shared-secret fallback exists | test convenience | production hard-cut, explicit dev harness |
| Admin auth | raw shared secret + process-local HMAC session split | same model | durable AdminSession |
| Worker auth | shared secret | shared secret/fallback | ServicePrincipal/OIDC |
| Cloud Tasks unavailable | direct HTTP fallback | direct HTTP fallback | production fail/degraded, no trust downgrade |
| Privacy purge simulation | can return success | can return success | never production success |

## How to run

From `apps/web`:

```bash
npm test -- trustBaseline.characterization.test.ts
npm run test:e2e -- trust-baseline.spec.ts
```

Full regression candidates:

```bash
npm run test:unit
npm run typecheck
npm run build
```

## P0-00 merge gate

P0-00 is ready to merge only when:

- the characterization suite passes on the exact branch head,
- browser smoke passes for `/giris` at desktop, 390px and 360px,
- unauthenticated dashboard/admin redirect smoke passes,
- no application/runtime source file changed,
- branch diff is limited to tests/fixtures/docs,
- later hard-cut PRs reference this baseline when flipping a known-risk assertion.

## Rollback

Entire P0-00 is additive. Revert removes only tests/fixtures/docs and does not alter production behavior.
