# K1 — Canonical Action Card Protocol

## Karar

Kepenk'in bütün dikeyleri aynı versioned Action Card envelope'ını kullanır:

`Event → Evidence → Decision → Action Card → Action → Outcome`

K1 yeni event authority yaratmaz. W3/W5/W6/W7/W8 ve ilgili domain owner'lar canonical gerçekliktir.

## Protocol v1

Package: `@kepenk/action-card-schema`

Kimlik: `protocolVersion`, `cardId`, `businessId`, `dedupeKey`, `revision`.

Source yalnız canonical event, subject ve evidence referansları taşır.

Attention urgency, importance, riskClass, optional confidence ve deadline taşır. Confidence authority değildir.

Presentation title, context, reason ve tone ile sınırlıdır.

## Action güvenlik sınırı

Command action raw DB mutation taşımaz. Yalnız capability reference, optional permission, idempotency key ve confirmation requirement taşır.

`evaluateActionCardCommand` schema, expiry, notBefore, snooze, lifecycle, action existence, command mode, capability allow-list ve permission allow-list kontrollerini fail-closed yapar.

Bu preflight domain authorization yerine geçmez. Domain command kendi transaction ve authority kontrolünü tekrar yapar.

## Anti-spam hooks

Protocol policy uygulamadan `dedupeKey`, `suppressionGroup`, `notBefore`, `expiresAt`, `snoozeUntil` ve `batchHint` alanlarını taşır.

Ranking, batching, cooldown ve suppression K2 kapsamıdır.

## Outcome v1

`ActionCardOutcomeEventSchema` şu olayları standardize eder:

- surfaced
- opened
- action_selected
- action_executed
- action_failed
- dismissed
- snoozed
- expired

Action outcome'ları `actionId` ister. `action_executed` doğrulanabilir `executionRef`, `action_failed` ise `errorCode` ister.

Outcome event business sonucunun kendisi değildir. F22/K5 gerçek business outcome attribution'ını ayrıca bağlar.

## Presentation boundary

`@kepenk/ui` içindeki `actionCardProtocolToModel` canonical envelope'ı UI modeline düşürür.

Bilerek UI'ya aktarılmayan authority alanları:

- businessId
- capability
- permission
- idempotency key

`/dashboard/manage/experience-lab` artık local fixture yerine Protocol v1 kartları parse edip adapter üzerinden render eder.
