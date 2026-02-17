
import { GoogleGenAI } from "@google/genai";
import { PricingPackage, EmailTemplate } from '../types';

export const systemService = {
    testApiKey: async (key: string) => {
        try {
            const ai = new GoogleGenAI({ apiKey: key });
            await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: 'Test' });
            return { success: true };
        } catch (e: any) {
            return { success: false, message: e.message };
        }
    },

    generatePackages: async (cost: number, margin: number, type: string): Promise<PricingPackage[]> => {
        return [
            { id: '1', name: 'Başlangıç', price: Math.round(cost * (1 + margin / 100)), cost: cost, profit: Math.round(cost * margin / 100), features: ['Temel Özellik'], description: 'Giriş seviyesi' }
        ];
    },

    generateInitialTemplates: async (packages: PricingPackage[]): Promise<EmailTemplate[]> => {
        return [
            { id: 't1', name: 'Tanışma', type: 'intro', subject: 'Merhaba', body: 'Tanışalım', isActive: true, useCount: 0, successCount: 0 }
        ];
    }
};
