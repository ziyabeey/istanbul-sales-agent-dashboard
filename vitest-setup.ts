import { vi } from 'vitest';

const store: Record<string, string> = {};
const mockLocalStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
};

if (typeof globalThis.localStorage === 'undefined') {
    (globalThis as any).localStorage = mockLocalStorage;
}
vi.stubGlobal('localStorage', mockLocalStorage);
