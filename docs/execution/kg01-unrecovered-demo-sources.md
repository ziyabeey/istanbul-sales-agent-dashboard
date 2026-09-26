# KG-01: unrecovered demo source containment

## Boundary and evidence

Base candidate: `b5eb4551bacb7183b34becd0e45963eecbfa3d42`.
CI/CD #304 (`36254135161`) failed during Docker page collection at
`/demolar/oto-hizli`. Template Export Contract #4 reported 24 invalid named
references for 18 missing CONFIG/BUSINESS names. They represent nine source
IDs, not nine recovered designs:

- `oto-dinamik`, `oto-guven`, `oto-hizli`, `oto-vip`
- `restoran-fine`, `restoran-hizli`, `restoran-kafe`, `restoran-klasik`, `restoran-vip`

The old `/demolar/oto-oto` URL requests `oto-vip`, not a different theme.
Prior history recovery restored twelve distinct CONFIG/BUSINESS/CSS modules.
Those original blobs, exports, IDs, sections and styles remain unchanged.
No claim is made that all branches or external backups lack the nine sources.

## Deliberate behavior change requiring review

Keep the nine static URLs, but send their entry components through the
existing `RegisteredDemo` server gate. Preserve each requested theme ID.
The unchanged registry/resolver has no importer for those IDs, so the gate
calls Next.js `notFound` before constructing the browser renderer. Do not
invent data, alias to a different design, or emit business structured data.

Six metadata modules previously read a missing BUSINESS value at module
initialization. They now declare an explicit unavailable title/description
and `robots: { index: false, follow: false }`, without importing missing data.
The other page modules and the existing shared renderer are unchanged.

This contains a broken optional demo instead of allowing it to crash the
whole application build. It is NOT template recovery or full product acceptance.
A passing named-export census means active imports resolve, not that every
planned demo is available. Independent review must accept this temporary
404 behavior before a main merge. No route has been declared complete.

## Regression coverage

`test/unit/unavailableDemoRoutes.test.ts` contains 25 cases: exact wrapper
IDs, the real registry/resolver plus Next.js notFound behavior, actual imports
of the six metadata modules, and a supported-theme positive control. Only
the browser rendering dependency is isolated. These are not HTTP/browser tests.
Existing template recovery and rendering tests remain in the CI selection.

## Reopening each demo

1. Recover and attribute its original source, or obtain explicit acceptance
   for a newly authored replacement. Do not label a replacement as restored.
2. Reconnect the loader/descriptor and check real CONFIG/BUSINESS/CSS values.
3. Restore source-derived metadata and structured data; update the temporary
   unavailable assertions instead of adding exceptions or skipping tests.
4. Verify the exact URL and intended design in browser/visual acceptance.
5. Complete exact-head Docker build, startup, health and served-assets checks.

No auth, Randevu, dependencies, Docker, workflow gates, secrets or live traffic
change is part of this containment patch. Source recovery remains open.
