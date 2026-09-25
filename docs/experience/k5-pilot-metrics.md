# K5 — Pilot UX measurement foundation

## Question

Kepenk Experience should reduce interaction burden, not merely render attractive cards.

K5a measures the interaction evidence already available in the Action Card protocol. It does not claim business impact.

## Inputs

- versioned `ActionCardProtocol[]`
- versioned `ActionCardOutcomeEvent[]`

Outcomes outside the card's `businessId` or current `revision` are ignored.

## Derived metrics

- cards surfaced
- cards with a decision
- action selections
- dismissals
- snoozes
- navigate selections
- command selections
- executed / failed actions
- action, dismissal and snooze rates
- execution success rate when execution evidence exists
- median surfaced → first decision time

A decision is one of:

- `action_selected`
- `dismissed`
- `snoozed`

## Explicit non-claims

K5a does not infer:

- revenue impact
- conversion lift
- time saved
- customer satisfaction
- business outcome
- whether a missing execution event means failure

Those require explicit outcome attribution and accepted persistence in K5b / later Outcome Loop work.

## Home Shell lab

`/dashboard/manage/experience-home` captures outcome events in browser memory for the current demo session only.

No analytics provider is called and no event is persisted.

The `Bu denemedeki seçimlerin` disclosure shows the derived session metrics and is intended for product validation, not production reporting.

### First-decision timing in the preview

- The per-card summary uses the shared metrics implementation, not a second duration calculation. It includes only cards with valid exposure evidence and shows each card's first choice.
- Later choices and reopening do not replace the first decision duration. Equal exposure/decision timestamps produce a valid zero duration; exposure takes precedence over random event IDs when sorting that timestamp.
- Wall-clock elapsed time includes background-tab time. The UI explicitly distinguishes it from active work time, productivity or time saved, and shows how many measured cards contribute to the median.
- `Denemeyi baştan başlat` restores the sample scenario with a fresh keyed session, including card visibility and exposure timestamps. Prior choices, messages and durations are discarded only from the local preview state. It does not call a service, create a real reminder or modify domain records.

## K5b gate

Persistent real-pilot measurement opens after:

1. K4b can read real canonical Randevu evidence through an accepted server-side identity/session transport.
2. telemetry storage has tenant scope, retention/privacy rules, and explicit schema ownership.
3. business outcome attribution is defined separately from UI interaction metrics.
