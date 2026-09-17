# KC-05 operational runbook

This runbook closes the two operational follow-ups identified during the KC-05 R1 review: projection orphan recovery and caller-stable admin entitlement intents.

## 1. Projection orphan DLQ

`core_projection_orphans/{event_id}` is the dead-letter record for a Core feed event that could not be projected. The stored document contains the immutable Core event, the reason and `recordedAt`. Projection may advance its global cursor after recording an orphan because authorization never depends on the Firestore projection.

### Recovery invariant

Do **not** recover an orphan by blindly moving `core_projection_state/feed.afterEventId` backwards or by lowering `esnaflar/{id}.core.lastEventId`.

KC-05 deliberately makes both the global cursor and every tenant projection monotonic. Replaying an old orphan after a newer event has already reached that tenant can therefore be stale by design. Rewinding those guards in-place would reopen the overlapping-worker race that KC-05 closed.

The safe redrive is a **new corrective Core event** after the canonical source problem is repaired. The corrective event has a new event id, so it moves through the normal monotonic projection path.

### `no legacy tenant for business_id`

1. Disable or pause the projection scheduler. Do not change Core subscription or entitlement authority during diagnosis.
2. Capture the orphan document, current `core_projection_state/feed.afterEventId`, `core_business_index/{business_id}` and the candidate `esnaflar/{id}.core` shadow for the operator case.
3. Resolve the canonical tenant mapping in Core. `legacy-kepenk-firestore:<esnafId>` is authoritative. A Firestore `coreBusinessId` value alone is not sufficient evidence.
4. Re-run KC-03 parity for the affected tenant/business. A foreign alias or shadow mismatch is fail-closed and must be reconciled before redrive.
5. From the authoritative current Core state, emit the smallest corrective command with a new caller-stable operator intent key:
   - subscription state: `ChangeSubscription` with the current plan/status/period;
   - one entitlement: `GrantEntitlement` or `RevokeEntitlement` with the current grant/limit/validity.
6. Resume projection and run a tick. Verify the corrective event id is greater than the tenant's previous `core.lastEventId`, is projected, and the global cursor advances past it.
7. Verify `/api/core/plan` and `has_entitlement` still agree with Core. Firestore is checked only as the read-model result.
8. Retain the original orphan as audit evidence. Record the operator case id and corrective Core event id in the acceptance receipt. Do not delete the orphan merely to obtain a zero count.

### Malformed payload

1. Pause projection and capture the orphan + cursor evidence.
2. Fix the producer/contract mismatch. Never edit the append-only Core event in place.
3. Emit a new valid corrective Core command/event that represents the current authoritative state, using a stable operator intent key.
4. Resume projection, verify the newer event projects, then retain the malformed orphan as historical DLQ evidence.

### Full rebuild exception

A cursor rewind is allowed only for a deliberately isolated **full read-model rebuild** into an empty/recreated projection target. It is not the orphan recovery mechanism for an in-place canary tenant. A rebuild must keep Core authoritative, stop all projection workers, use a single lease owner, start from a documented cursor, and verify parity before the rebuilt read model is exposed.

## 2. Admin entitlement intent keys

`POST /api/admin/core/entitlement` requires `idempotencyKey` for every valid grant/revoke request.

Rules:

- length: 8 to 128 characters after trimming;
- the caller creates the key once per operator intent and persists/reuses it across transport retries;
- a retry of the same intent sends the same `idempotencyKey` and the same payload;
- a new commercial intent receives a new key;
- the route derives the Core platform idempotency key from `{esnafId, action, entitlementKey, idempotencyKey}`;
- the caller-supplied intent key is also included in the durable admin audit metadata;
- a missing/short/oversized key returns `400 IDEMPOTENCY_KEY_REQUIRED` before tenant routing and before any Core command.

A UI should generate the intent id when the operator starts the grant/revoke action, not inside the HTTP retry loop. Ticket/case ids are suitable when they are unique to that concrete action.

## 3. Hosted canary acceptance receipt

Hosted acceptance must record exact source SHA and environment, then prove all of the following without substituting local CI evidence:

1. KC-03 parity is `zeroDrift` for the selected fixture + one real canary tenant.
2. Projection tick reports `lagMs` and reaches the selected corrective/subscription event.
3. Deliberately pausing/staling projection does not change authorization or `/api/core/plan` decisions.
4. Canary legacy commercial root writes are blocked while onboarding, billing, plan reads and normal product flows remain usable.
5. A controlled orphan case follows the recovery procedure above and converges through a newer corrective Core event without cursor/tenant-version rewind.
6. An admin entitlement request replayed with the same caller intent key produces the same Core idempotency key; a request without the key is rejected before routing.
7. Removing the tenant from `CORE_CANARY_TENANTS` restores the legacy write path without deleting Core history.

The Vercel preview quota or any other hosting-provider failure is recorded separately as environment evidence. It is not a product acceptance failure and it is not a substitute for the hosted receipt.
