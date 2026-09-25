# K4 — Randevu canonical event adapter

## Purpose

Kepenk Experience consumes Randevu booking lifecycle evidence without creating a second booking or event authority.

Canonical source remains Randevu Postgres:

- `public.appointment_events`
- member-scoped `public.list_appointment_events_page(...)`
- Randevu HTTP surface `GET /api/bookings/:id/events`

Kepenk stores no replacement event truth in K4.

## K4a implemented seam

`apps/web/src/lib/experience/randevuEventAdapter.ts` accepts:

- canonical `businessId` supplied by trusted session/request context,
- canonical `appointmentId`,
- one Randevu `AppointmentEvent` response,
- optional canonical reservation presentation context.

It emits `ActionCardProtocol | null`.

The first supported event is `cancelled`.

The adapter intentionally does not infer facts that are absent from the event. Without reservation context it does not invent a customer, time, duration, free-slot length, waitlist match, or financial effect.

Multi-service cancellation metadata (`groupId`, `groupVersion`, `lineOrdinal`) is used for evidence and K2 suppression only. It is not a new authority.

## Action boundary

K4a does not create a booking command.

Until a canonical deep-link/capability is available, the cancellation card only exposes Action Card lifecycle actions:

- snooze
- dismiss

A future waitlist/fill-gap action must reference a real accepted Randevu capability and must still revalidate authorization, current slot state, and idempotency server-side.

## Live transport gate

K4b is intentionally not wired directly from the browser.

The current Randevu events endpoint requires an authenticated active Membership and forwards the user's Supabase access token to the member-scoped RPC. Kepenk's Core adoption contract says browser clients do not carry that token and use a host-only BFF session.

Therefore live transport waits for one of these accepted server-side seams:

1. KC-02 BFF identity/session boundary on main, or
2. a narrower reviewed server-to-server read contract that preserves canonical `business_id` membership authorization.

Forbidden shortcuts:

- exposing Supabase service-role/secret keys to the browser,
- using legacy `esnafId` as booking tenant authority,
- reading legacy Firestore `randevular` as a replacement source,
- adding another event table,
- bypassing active Membership checks.

## Handoff

When K4b opens, the transport should return the existing Randevu event response shape and feed it unchanged into `randevuEventToActionCard`.

Transport failure means no fabricated cards. The Home Shell may remain quiet until canonical evidence is readable.
