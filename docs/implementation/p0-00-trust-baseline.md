# Pilot-0 / P0-00 — Trust Baseline & Evidence Harness

> Branch: `p0/00-trust-baseline`  
> Base: `main@82912585450ab4307fcf9220ab27b5c361d65792`  
> Scope: additive characterization + real-browser smoke + CI evidence repair  
> Runtime behavior changes: **none**

## Purpose

P0-00 freezes the current trust surface before canonical identity/session work begins. It deliberately records insecure or inconsistent legacy behavior as **KNOWN-RISK characterization**, not as approved behavior.

Later Pilot-0 PRs must either preserve protected UX/contracts or intentionally flip the corresponding risk characterization when a hard-cut lands.

## Protected UX baseline

The following surfaces are explicitly protected by P0-00:

- `/giris` visual/content hierarchy and phone-login flow,
- desktop login surface,
- 390px mobile login surface,
- 360px mobile login surface,
- unauthenticated dashboard -> `/giris` redirect,
- unauthenticated admin -> `/admin/login` redirect,
- proxy subdomain intent for `edit`, `app`, `manage`, `destek`.

Real-browser smoke: `apps/web/test/e2e/trust-browser-smoke.sh`.

The browser smoke intentionally uses the Chrome/Chromium binary already present on the CI runner instead of adding a new package dependency to this baseline PR. It starts the real Next.js app, renders `/giris` at 1440, 390 and 360 widths, checks the preserved login content, and verifies unauthenticated dashboard/admin redirect headers.

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
5. Exact-head full `@kepenk/web` TypeScript currently fails in pre-existing runtime source `apps/web/src/lib/cloudTasksClient.ts` with two TS2322 errors: Cloud Tasks `httpMethod` is typed as a plain string where `HttpMethod` is required, and the optional OIDC `audience` can be `undefined` where the client type requires a string. P0-00 does not modify that runtime source.
6. The isolated P0-00 trust TypeScript gate is **green**.
7. Exact-head unit tests are **green** on the previously exercised head and remain a blocking P0 gate.
8. The legacy integration suite currently fails before two suites load because `apps/web/src/lib/zodSemalar.ts` imports `zod` while `@kepenk/web` does not declare `zod` as a direct dependency. Two other integration files still execute successfully, with 24 tests passing before the resolver failure terminates the suite.
9. The legacy monorepo build currently fails in `@kepenk/crm-schema` through `packages/site-schema/src/validators.ts`: Node `crypto` types cannot be resolved because `@kepenk/site-schema` does not declare Node type definitions.
10. The repository's historical Playwright commands reference a runner that is not declared in `@kepenk/web`; the first PR browser job therefore failed before executing any browser test with `Command "playwright" not found`.

P0-00 does not repair unrelated runtime/package ownership in order to manufacture a green dashboard. It records those failures as explicit debt and hard-gates only evidence that this PR can truthfully own.

The evidence workflow is repaired as follows without changing application runtime:

- enable `pnpm@9.1.0` through Corepack,
- install with `pnpm install --frozen-lockfile`,
- lint the TypeScript trust-baseline artifacts introduced by P0-00,
- syntax-check the dependency-free browser smoke script,
- hard-gate P0-00 artifacts with `apps/web/test/tsconfig.trust-baseline.json`,
- execute the full `@kepenk/web` typecheck as a visible tolerated legacy-debt probe and emit a CI warning when the known `cloudTasksClient.ts` TS2322 errors remain,
- hard-gate `@kepenk/web` unit tests, including the trust characterization suite,
- execute the legacy integration suite as a visible tolerated baseline and emit a CI warning when its known undeclared-`zod` failure remains,
- execute the legacy monorepo build as a visible tolerated baseline and emit a CI warning when its known Node-types failure remains,
- run a pull-request-only real Chrome/Chromium trust smoke without introducing Playwright as an undeclared dependency,
- preserve the historical full Playwright/Lighthouse/staging chain on main push; its undeclared Playwright dependency remains separately visible debt and is not silently rewritten here.

The first isolated typecheck run also found a P0-00-only configuration error: `@playwright/test` had been incorrectly listed as a global `types` library. That branch-local defect was fixed rather than classified as legacy debt.

Known CI/tooling debt remains explicit:

- full web lint has the 809-error / 257-warning baseline above,
- generated `test-results/e2e-html/**` should eventually be ignored by ESLint,
- `apps/sites` lint configuration needs a non-interactive modern ESLint migration,
- `apps/web/src/lib/cloudTasksClient.ts` needs an explicit owning fix for Cloud Tasks `HttpMethod` and OIDC `audience` typing; P0-00 does not change its trust/runtime behavior,
- `@kepenk/web` needs an explicit decision/fix for its undeclared direct `zod` usage,
- `@kepenk/site-schema` needs an explicit Node type/runtime boundary fix for `crypto`,
- the historical Playwright e2e chain needs a declared, lockfile-backed test-runner dependency before it can be relied on,
- none of these are represented as completed by P0-00.

## How to run

Blocking P0-00 evidence from repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter @kepenk/web exec eslint \
  test/fixtures/trust-baseline.ts \
  test/unit/trustBaseline.characterization.test.ts
bash -n apps/web/test/e2e/trust-browser-smoke.sh
pnpm --filter @kepenk/web exec tsc \
  -p test/tsconfig.trust-baseline.json \
  --noEmit
pnpm --filter @kepenk/web test:unit
```

Legacy-debt probes, expected to remain visible until their owning follow-up fixes land:

```bash
pnpm --filter @kepenk/web typecheck
pnpm --filter @kepenk/web test:integration
pnpm build
```

Real-browser smoke:

```bash
bash apps/web/test/e2e/trust-browser-smoke.sh
```

## P0-00 merge gate

P0-00 is ready to leave draft only when:

- exact-head dependency installation succeeds,
- P0-00 changed-file lint is green,
- P0-00 isolated TypeScript gate is green,
- the trust characterization/unit suite is green on the exact branch head,
- real Chrome/Chromium smoke passes for `/giris` at desktop, 390px and 360px,
- unauthenticated dashboard/admin redirect smoke passes,
- full web typecheck, broad integration and broad build probes have all been evaluated and any pre-existing failures are classified with visible warnings rather than hidden,
- no application/runtime source file changed,
- branch diff is limited to tests/fixtures/docs plus CI evidence workflow repair,
- later hard-cut PRs reference this baseline when flipping a known-risk assertion.

The broad historical lint/type/integration/build/e2e debt is **not** a claim of green health. It is explicitly outside P0-00's runtime scope while the newly introduced trust evidence plus the unit and P0-specific TypeScript surfaces remain hard-gated.

## Rollback

P0-00 changes only tests/fixtures/docs and CI configuration. Revert does not alter production application behavior.
