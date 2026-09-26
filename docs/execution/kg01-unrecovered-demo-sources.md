# KG-01: premium-first demo curation

## Product decision, 26 September 2026

Ziya explicitly authorized keeping valuable, content-rich designs and removing
empty or redundant demos, with special protection for the premium series.
This supersedes the earlier requirement to recover every historical demo.
Recovering the nine source-less designs below is no longer a KG-01 release gate.
This is scope retirement, not a claim that missing designs have been restored.

## Preserved design assets

Keep these HTML template candidates and their existing catalog entries intact:
Obsidyen (`sablon-premium`), Çelik (`sektor-insaat-premium`),
Titan (`sektor-spor-premium`), Papatya (`sektor-saglik-premium`),
Prizma (`sektor-ajans-premium`) and Safir (`sektor-otel-premium`).
Keep İpek (`sektor-guzellik-buyume`) as a relevant beauty-sector candidate.
The whole `apps/web/src/data/sablonlar` HTML-source family is preserved in this
first cut, along with all `*BespokeSections.tsx`, other section implementations,
archived configs and twelve previously recovered historical config blobs.

These are protected candidates, not confirmed production-quality templates.
The user did not supply an exact premium-series ID. Protect both the premium
HTML collection and the distinct Bespoke family until visual comparison.
No visual, mobile, interaction or tenant-usage acceptance is claimed by file
presence, source size or these tests.

## First removal set

Remove only `page.tsx` and `client.tsx` for these public demo routes:

- `oto-dinamik`, `oto-guven`, `oto-hizli`, `oto-vip`, `oto-oto`
- `restoran-fine`, `restoran-hizli`, `restoran-kafe`, `restoran-klasik`, `restoran-vip`

`oto-oto` was a duplicate URL for the absent `oto-vip` source. Twenty entry
files are retired; no theme config, renderer or business-site file is deleted.
Also remove root `create-routes.js`, the obsolete generator containing missing
CONFIG/BUSINESS names that would recreate several of those entries.

Prior CI #304 identified 24 invalid references for 18 missing names. #305
contained these with static notFound wrappers. The cleanup now removes those
wrappers and their placeholder metadata rather than treating them as product.
The existing dynamic demo route performs the same server availability check
and rejects retired IDs. The public catalog filters those IDs, including the
old alias. Canonical theme data, tenant rendering and edit/publish APIs are not
filtered by this public-demo policy.

## Boundaries and rollback

Rollback anchor: `16ac356483d6df2c7b40558bd1a2144d8f2b41c9`.
Keep the parent history; do not copy retired files into a runtime-imported
archive. A future replacement is a new reviewed design, not automatic recovery.

No `/sites/[domain]` code, saved tenant data, publish snapshots, asset ownership,
auth, payment, Core authority, Randevu, dependency, Docker or workflow policy
changes. Live tenant usage has not been audited; therefore no shared theme
source or persisted site data is deleted in this first cut.

## Acceptance and next curation cut

Actual unit tests cover absent entry files, real server notFound rejection,
public-catalog removal, original premium HTML presence and supported-demo
positive controls. The export/path checks and real Docker build/start/health/
served-assets/native-sanitizer gates remain mandatory and unchanged.

For the broader cut: compare rendered premium and Bespoke candidates on mobile
and desktop, retain distinct useful layouts, isolate valuable sections from
weak demos, then check code references and saved-site usage before deleting
shared sources. Do not prune by tier name, file size or generic placeholder
counts alone. Current product goals remain real edit/save/publish/rollback,
not maximizing the number of template IDs or regression cases.
