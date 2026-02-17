/**
 * Time-based circuit breaker: after record(), isOpen() returns true for openMs.
 * Used by agent hooks; this module exists for testability.
 */
export function createCircuitBreaker(openMs: number, nowFn?: () => number) {
    const now = nowFn ?? (() => Date.now());
    const openUntil: Record<string, number> = {};
    return {
        isOpen: (category: string) => now() < (openUntil[category] ?? 0),
        record: (category: string) => {
            openUntil[category] = now() + openMs;
        }
    };
}
