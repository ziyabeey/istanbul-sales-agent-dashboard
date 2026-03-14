import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface OnboardingAnswers {
    businessName?: string;
    slogan?: string;
    phone?: string;
    address?: string;
    workDays?: string[];
    openTime?: string;
    closeTime?: string;
    logoUrl?: string;
    photos?: string[];
    sectorAnswers?: Record<string, any>;
    services?: { name: string; price: string }[];
}

export interface OnboardingState {
    step: number;
    sektor: string;
    answers: OnboardingAnswers;
    progress: number;
    setSektor: (sektor: string) => void;
    setAnswer: (key: keyof OnboardingAnswers, value: any) => void;
    setSectorAnswer: (key: string, value: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    submit: () => Promise<void>;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            step: 0,
            sektor: '',
            answers: {
                workDays: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                openTime: '09:00',
                closeTime: '20:00',
                sectorAnswers: {},
            },
            progress: 0,

            setSektor: (sektor: string) => set({ sektor }),

            setAnswer: (key, value) => set((state) => ({
                answers: { ...state.answers, [key]: value }
            })),

            setSectorAnswer: (key, value) => set((state) => ({
                answers: { 
                    ...state.answers, 
                    sectorAnswers: { ...state.answers.sectorAnswers, [key]: value } 
                }
            })),

            nextStep: () => set((state) => ({ 
                step: state.step + 1,
                progress: Math.min(100, (state.step + 1) * 10)
            })),

            prevStep: () => set((state) => ({ 
                step: Math.max(0, state.step - 1),
                progress: Math.max(0, (state.step - 1) * 10)
            })),

            setStep: (step) => set({ step, progress: step * 10 }),

            submit: async () => {
                const { sektor, answers } = get();
                // Firestore/Cloud Task integration runs here
                console.log('Form Submitted to Backend', { sektor, answers });
                
                try {
                    const res = await fetch('/api/onboarding/submit', {
                        method: 'POST',
                        body: JSON.stringify({ sektor, answers }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (!res.ok) throw new Error('Yükleme hatası');
                } catch (err) {
                    console.error('Submit failed', err);
                    throw err;
                }
            },

            reset: () => set({ 
                step: 0, 
                sektor: '', 
                answers: { workDays: [], sectorAnswers: {} }, 
                progress: 0 
            }),
        }),
        {
            name: 'kepenk-onboarding-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);
