# Pilot-0 / P0-00 — Trust Baseline & Evidence Harness

> Branch: `p0/00-trust-baseline`  
> Base: `main@82912585450ab4307fcf9220ab27b5c361d65792`  
> Scope: additive characterization + browser smoke + CI evidence repair  
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

## CI evidence baseline

Opening PR #2 exposed pre-existing CI failures before any trust runtime change:

1. `.github/workflows/ci.yml` used `npm ci`, while the repository declares `packageManager: pnpm@9.1.0` and tracks `pnpm-lock.yaml`.
2. The workflow invoked Turbo `type-check` and `test` tasks that are not declared in `turbo.json`.
3. A recursive lint attempt exposed `apps/sites`' legacy `next lint` script as interactive/unconfigured in CI.
4. Running full `@kepenk/web` ESLint exposed the existing source/config debt: **1066 findings = 809 errors + 257 warnings** across legacy application code and generated `apps/web/test-results/e2e-html/**` assets.
5. Running full `@kepenk/web` TypeScript checking also exposes pre-existing application errors outside the P0-00 trust artifacts.

P0-00 does not convert that historical debt into false green status and does not broaden this trust-baseline PR into a whole-repository lint/type cleanup project.

The evidence workflow is therefore repaired as follows without changing application runtime:

- enable `pnpm@9.1.0` through Corepack,
- install with `pnpm install --frozen-lockfile`,
- lint only the three trust-baseline source artifacts introduced by P0-00,
- typecheck only the P0-00 artifacts with `apps/web/test/tsconfig.trust-baseline.json` as a **blocking gate**,
- still execute the full `@kepenk/web` typecheck as an **informational, tolerated legacy-debt signal** with `continue-on-error`,
- run `@kepenk/web` unit/integration suites explicitly,
- keep monorepo `pnpm build` as the broader build gate,
- add a pull-request-only Chromium job for `trust-baseline.spec.ts`,
- keep the existing full Playwright/Lighthouse/staging chain on main push.

The first isolated typecheck run found a P0-00-only configuration error: `@playwright/test` was incorrectly listed as a global `types` library. The config was corrected to rely on normal module imports for Playwright/Vitest types. That is a P0-00 defect and is fixed in this branch, rather than being classified as legacy debt.

Known CI/lint/type debt remains explicit:

- full web lint currently has the 809-error / 257-warning baseline above,
- generated `test-results/e2e-html/**` should eventually be ignored by ESLint,
- `apps/sites` lint configuration needs a non-interactive modern ESLint migration,
- broad `@kepenk/web` typecheck has historical errors outside P0-00,
- none of these are represented as completed by P0-00.

## How to run

From repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter @kepenk/web exec eslint \
  test/fixtures/trust-baseline.ts \
  test/unit/trustBaseline.characterization.test.ts \
  test/e2e/trust-baseline.spec.ts
pnpm --filter @kepenk/web exec tsc \
  -p test/tsconfig.trust-baseline.json \
  --noEmit
pnpm --filter @kepenk/web test:unit
pnpm --filter @kepenk/web test:integration
pnpm build
```

Informational legacy-debt probe:

```bash
pnpm --filter @kepenk/web typecheck
```

Browser smoke:

```bash
pnpm --filter @kepenk/web exec playwright test \
  test/e2e/trust-baseline.spec.ts \
  --project=chrome
```

## P0-00 merge gate

P0-00 is ready to merge only when:

- exact-head dependency installation succeeds,
- P0-00 changed-file lint is green,
- P0-00 isolated TypeScript gate is green,
- the trust characterization suite is green on the exact branch head,
- PR trust browser smoke passes for `/giris` at desktop, 390px and 360px,
- unauthenticated dashboard/admin redirect smoke passes,
- broad unit/integration/build gates have been evaluated and any pre-existing failures are classified rather than hidden,
- no application/runtime source file changed,
- branch diff is limited to tests/fixtures/docs plus CI evidence workflow repair,
- later hard-cut PRs reference this baseline when flipping a known-risk assertion.

The broad historical `@kepenk/web` lint/type debt is **not** a claim of green health and is **not** silently skipped. It is explicitly out of P0-00's runtime scope while the newly introduced trust artifacts remain hard-gated.

## Rollback

P0-00 changes only tests/fixtures/docs and CI configuration. Revert does not alter production application behavior.
