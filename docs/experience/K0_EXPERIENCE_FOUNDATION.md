# K0 — Kepenk Experience Foundation

> Canonical issue: #25  
> Product thesis: **Bırak iş sana gelsin.**

## 1. Scope

K0 establishes the shared experience foundation for Kepenk without changing domain authority, booking, payment, tenant, entitlement or finance truth.

The existing Kepenk frontend is preserved. K0 adds a semantic layer over the current visual tokens and defines one reusable interaction primitive: **Action Card**.

K0 does **not** introduce Jev runtime, autonomous actions, notification ranking, batching, cooldowns or cross-domain orchestration. Those belong to K1+.

## 2. Product rule

Classic SaaS asks the user to remember the job, open the product, find the module and perform the action.

Kepenk reverses the direction:

```text
Event
  ↓
Evidence / canonical domain state
  ↓
Interpretation
  ↓
Decision
  ↓
Action Card
  ↓
Human or deterministic action
  ↓
Outcome
```

The default product question is therefore not:

> Which screen should this feature live on?

It is:

> Which event should surface this, to whom, when, and with which safe action?

Deep screens remain available for investigation, configuration and exception handling.

## 3. Preservation contract

K0 reuses the current Kepenk identity and does not create a parallel design system.

Preserve:

- `--kpnk-primary` orange brand identity.
- Existing neutral background/surface hierarchy.
- Existing Inter/system font stack.
- Existing manage shell until K2 replaces the default home experience.
- Existing public frontend and marketing assets under their current preservation contract.
- Existing KPI, feed and suggestion UI until migrated intentionally.

Do not preserve as a product constraint:

- permanent three-column density,
- feature-count-driven navigation,
- dashboard-first information architecture,
- every current recommendation card implementation.

## 4. Semantic experience tokens

K0 adds semantic aliases so components depend on meaning rather than raw visual values.

Core token groups:

- canvas / surface / elevated surface
- primary / secondary / muted text
- border / focus / shadow
- attention: neutral / info / positive / warning / critical
- action: primary / secondary / ghost
- motion: instant / fast / base / slow
- layout: card radius / card gap / content width / touch target

Raw brand values remain owned by the existing Kepenk design tokens.

## 5. Action Card anatomy

Every Action Card has these conceptual regions:

1. **Source**
   - domain
   - event / source reference
   - occurrence time
2. **Attention**
   - neutral
   - info
   - positive
   - warning
   - critical
3. **Message**
   - concise title
   - optional one-paragraph context
4. **Reason**
   - optional human-readable reason
   - optional evidence references
5. **Actions**
   - one primary action maximum
   - optional secondary actions
   - optional snooze / dismiss
6. **Outcome state**
   - new
   - seen
   - executing
   - resolved
   - snoozed
   - dismissed
   - expired
   - failed

The card must remain useful without AI-generated prose.

## 6. Authority boundary

Action Card data may be proposed by Jev or another interpretation layer later, but domain reality is never owned by the card.

Examples:

- Booking availability comes from canonical booking authority.
- Payment status comes from canonical payment/finance authority.
- Inventory quantity comes from canonical inventory authority.
- Property state comes from canonical property authority.
- Tenant and permission come from Core.

An action marked as a command is only an intent. The corresponding domain command still performs authorization, validation, idempotency and transaction checks.

## 7. UX constraints

### Desktop

- Feed column targets comfortable reading width instead of dashboard sprawl.
- Primary action remains visually dominant.
- Evidence/reason is progressive disclosure.
- Deep module links are secondary escape hatches.

### Mobile

- Full-width cards.
- Minimum 44px actionable touch target.
- Primary action may become full-width.
- Secondary actions may collapse into an overflow menu when density requires it.
- No hover-only information.

### Keyboard

- Logical DOM order: source → message → reason → actions.
- Focus indicators must remain visible.
- Dismiss and snooze must be reachable without pointer input.
- Destructive/high-impact actions require explicit confirmation at the domain boundary.

### Reduced motion

- No transform-dependent meaning.
- Card arrival becomes opacity/state change rather than spring/translation animation.
- Outcome changes remain legible without motion.

## 8. Initial demo cards

### Booking cancellation

**15:30 randevusu iptal edildi.**  
90 dakikalık boşluk oluştu.

Primary: `Boşluğu doldur`  
Secondary: `Daha sonra`

### Payment attention

**3 tahsilat gecikti.**  
Toplam açık tutar ₺12.450.

Primary: `Tahsilatları incele`

### Stock attention

**Bu ürün 4 gün içinde bitebilir.**  
Planlı işlemlere göre mevcut stok yetersiz.

Primary: `Tedarik seçeneklerini gör`  
Secondary: `Hatırlat`

### Property match

**Ayşe Hanım için 3 yeni eşleşme var.**  
İki mülk bütçe ve lokasyon tercihleriyle güçlü biçimde eşleşiyor.

Primary: `Eşleşmeleri incele`

## 9. K1 handoff

K1 owns the canonical protocol beyond presentation:

- event envelope,
- evidence references,
- attention score inputs,
- action intent schema,
- idempotency reference,
- deadline / expiry,
- snooze semantics,
- deduplication key,
- batching / suppression hooks,
- outcome reporting contract.

K0 intentionally keeps these fields presentation-safe and domain-agnostic.
