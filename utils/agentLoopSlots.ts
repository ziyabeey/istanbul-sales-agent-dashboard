/**
 * Slot consumption rules for otopilot action phase.
 * Light steps = 1 slot, heavy steps = 2 slots. Max slots per loop (default 2).
 * Used by AgentContext; this module exists for testability.
 */
export const SLOT_LIGHT = 1;
export const SLOT_HEAVY = 2;

export interface StepResults {
    enrich?: boolean;
    persona?: boolean;
    discovery?: boolean;
    draft?: boolean;
    outreach?: boolean;
}

/**
 * Computes total slots used when running steps in order with given results.
 * Stops adding when slotsUsed >= maxSlots.
 */
export function computeSlotsUsed(stepResults: StepResults, maxSlots: number = 2): number {
    let slotsUsed = 0;
    const steps: (keyof StepResults)[] = ['enrich', 'persona', 'discovery', 'draft', 'outreach'];
    const weight: Record<string, number> = { enrich: SLOT_LIGHT, persona: SLOT_LIGHT, discovery: SLOT_HEAVY, draft: SLOT_LIGHT, outreach: SLOT_HEAVY };
    for (const step of steps) {
        if (slotsUsed >= maxSlots) break;
        if (stepResults[step]) {
            slotsUsed = Math.min(maxSlots, slotsUsed + weight[step]);
        }
    }
    return slotsUsed;
}
