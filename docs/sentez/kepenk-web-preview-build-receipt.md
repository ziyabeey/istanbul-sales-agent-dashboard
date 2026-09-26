# kepenk-web Preview build isolation

Temporary deployment unblock for KC-02 hosted acceptance. This is not production
approval, a fix for archive templates, or a change to Core/Auth/tenant authority.

## Project boundary

- Scope: `kpnk` / `team_Chy9PMeiu53Q2Pl7t8Nftmus`
- Project: `kepenk-web` / `prj_arUiO7uZYRBklb0dkifWj0uT8d86`
- Git repository: `ziyabeey/istanbul-sales-agent-dashboard`
- Root: `apps/web`; framework: Next.js 16.1.6; install/output: automatic
- Project-only Build Command: `cd ../.. && node scripts/build-kepenk-web-preview.mjs`
- System environment variables must remain automatically exposed.
- The wrapper refuses non-Preview environments and any other Vercel project.
- Do not promote these artifacts or associate them with `kepenk.ai`.
- Old projects and their settings/domains are untouched.

## Minimal build corrections

- Declare Node types for site-schema and give crm-schema its own source/output
  directories instead of inheriting site-schema's paths.
- Use the existing templates catalog subpath without importing the renderer
  registry into unrelated web routes.
- Declare Firebase's browser SDK already imported by existing dashboard screens;
  this adds no data store, authority, migration or new runtime flow.
- Use Webpack for the existing app/plugin graph and externalize jsdom plus
  isomorphic-dompurify so their server runtime assets resolve correctly.

## Preserved but unavailable on these Previews

`/demolar/**` and `/dashboard/sitem/editor/**` import incomplete legacy template
renderers. The wrapper temporarily moves only these two route trees out of the
Next.js source graph, runs `turbo run build --filter={apps/web}...`, then restores
the files even when the build fails. All route source remains in Git. There is
no global `.vercelignore` and no change to `apps/sites` or archive templates.
These routes returning 404 is a documented limitation, not acceptance success.
Remove this temporary wrapper/project override only after the template build
debt is separately resolved; full-route production verification remains required.

## Initial diagnostic evidence (not an exact-head receipt)

- Source base: `0b453c607a45cfd73efaacbd499f3b6de77b012d` plus uncommitted fixes
- Preview deployment: `dpl_5Q85GKtA7b2sWa5R6ugcckX34DqG`, `READY`
- URL: https://kepenk-2yf3lk0u6-kpnk.vercel.app
- Build log: `apps/web`, Next.js `16.1.6`, six dependency/app build tasks,
  1740 generated pages, no `apps/sites` task
- Chrome: Preview environment and Kepenk marketing homepage verified
- Git integration subsequently connected to the canonical repository

An exact committed Git-triggered Preview and PR #44 acceptance receipt must
supersede this diagnostic evidence before any merge decision. PR #44 remains
draft until exact-head CI, current-main delta review, and hosted R2 pass.

## Verification

`node --test scripts/build-kepenk-web-preview.test.mjs` checks project/environment
gates, isolation, source restoration on success/failure, and missing-route
failure before mutation. Dependency lockfile installation and both schema
packages' TypeScript checks also pass. No secrets are included in this receipt.
