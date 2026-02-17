
import { CompetitorAnalysis, InstagramAnalysis, Lead } from '../types';

export const marketingService = {
    // Competitors
    analyzeCompetitors: async (lead: Lead): Promise<CompetitorAnalysis> => {
        return { competitors: [], summary: 'Rakip analizi tamamlandı (Mock)', lastUpdated: new Date().toISOString() };
    },

    // Visuals
    generateHeroImage: async (lead: Lead): Promise<string> => {
        return "https://via.placeholder.com/800x400.png?text=Website+Preview";
    },
    generateSocialPostImage: async (prompt: string): Promise<string> => {
        return "https://via.placeholder.com/400x400.png?text=Social+Post";
    },

    // Social
    analyzeInstagram: async (lead: Lead): Promise<InstagramAnalysis> => {
        return { username: 'mock_user', bio: 'Mock Bio', recentPostTheme: 'Lifestyle', suggestedDmOpener: 'Hello', lastAnalyzed: new Date().toISOString() };
    }
};
