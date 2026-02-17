
import { UserProgress, Achievement } from '../types';
import { firebaseService } from './firebaseService';

const STORAGE_KEY = 'sales_agent_gamification';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    { id: 'first_blood', title: 'İlk Kan', description: 'İlk satışını başarıyla kapattın!', icon: 'Trophy' },
    { id: 'hunter', title: 'Avcı', description: 'Bir günde 10 yeni lead buldun.', icon: 'Crosshair' },
    { id: 'machine', title: 'Makine', description: 'Bir günde 50 e-posta gönderdin.', icon: 'Zap' },
    { id: 'field_agent', title: 'Saha Ajanı', description: 'İlk saha ziyaretini (check-in) gerçekleştirdin.', icon: 'MapPin' },
    { id: 'streak_7', title: 'İstikrar Abidesi', description: '7 gün üst üste hedefi tutturdun.', icon: 'Flame' },
];

export const gamificationService = {
    getProgress: (): UserProgress => {
        const data = localStorage.getItem(STORAGE_KEY);
        const today = new Date().toISOString().slice(0, 10);

        if (data) {
            const progress = JSON.parse(data) as UserProgress;
            // Reset daily actions if new day
            if (progress.dailyActions.date !== today) {
                // Check streak before reset
                // Simplified streak logic: if yesterday was active, keep streak, else reset (or handle grace period)
                // For MVP, we just reset counters
                progress.dailyActions = { leads: 0, emails: 0, calls: 0, date: today };
            }
            return progress;
        }

        return {
            xp: 0,
            level: 1,
            streakDays: 0,
            lastActiveDate: today,
            dailyActions: { leads: 0, emails: 0, calls: 0, date: today },
            achievements: INITIAL_ACHIEVEMENTS
        };
    },

    saveProgress: (progress: UserProgress) => {
        // 1. Save Local
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

        // 2. Save Cloud (Async)
        if (firebaseService.isInitialized) {
            firebaseService.saveUserProgress(progress).catch(err =>
                console.error("Failed to sync gamification to cloud", err)
            );
        }
    },

    // Level 1 -> 2: 1000 XP
    // Level 2 -> 3: 2000 XP (Total 3000)
    // Simple linear for now: Level = Floor(XP / 1000) + 1
    calculateLevel: (xp: number): number => {
        return Math.floor(xp / 1000) + 1;
    },

    getNextLevelXP: (level: number): number => {
        return level * 1000;
    },

    getDailyGoal: (level: number): number => {
        // Base 20 leads/actions + 5 per level
        // Lvl 1: 25, Lvl 5: 45, Lvl 10: 70
        return 20 + (level * 5);
    },

    // Action: 'lead_add', 'email_sent', 'call_made', 'deal_won'
    recordAction: (action: 'lead_add' | 'email_sent' | 'call_made' | 'deal_won'): { newUnlocks: Achievement[], progress: UserProgress } => {
        const progress = gamificationService.getProgress();
        const today = new Date().toISOString().slice(0, 10);

        // Update Streak Logic (Simple)
        if (progress.lastActiveDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().slice(0, 10);

            if (progress.lastActiveDate === yesterdayStr) {
                progress.streakDays += 1;
            } else {
                progress.streakDays = 1; // Reset or Start
            }
            progress.lastActiveDate = today;
            progress.dailyActions = { leads: 0, emails: 0, calls: 0, date: today };
        }

        // Add XP & Counters
        let xpGain = 0;
        switch (action) {
            case 'lead_add':
                progress.dailyActions.leads += 1;
                xpGain = 10;
                break;
            case 'email_sent':
                progress.dailyActions.emails += 1;
                xpGain = 5;
                break;
            case 'call_made':
                progress.dailyActions.calls += 1;
                xpGain = 15;
                break;
            case 'deal_won':
                xpGain = 500;
                break;
        }

        progress.xp += xpGain;
        progress.level = gamificationService.calculateLevel(progress.xp);

        // Check Achievements
        const newUnlocks: Achievement[] = [];
        const dailyGoal = gamificationService.getDailyGoal(progress.level);

        // Helper to unlock
        const unlock = (id: string, customTitle?: string) => {
            const ach = progress.achievements.find(a => a.id === id);
            if (ach && !ach.unlockedAt) {
                ach.unlockedAt = new Date().toISOString();
                newUnlocks.push(ach);
            }
        };

        if (action === 'deal_won') unlock('first_blood');
        if (progress.dailyActions.leads >= dailyGoal) unlock('hunter'); // Adjusted to dynamic goal? Or keep 'hunter' fixed at 10?
        // Let's keep 'hunter' fixed as specific badge, but maybe add a generic 'daily goal' achievement?
        // For now, keeping legacy checks but we could add more.

        if (progress.dailyActions.leads >= 10) unlock('hunter');
        if (progress.dailyActions.emails >= 50) unlock('machine');
        if (action === 'call_made') unlock('field_agent');
        if (progress.streakDays >= 7) unlock('streak_7');

        gamificationService.saveProgress(progress);

        return { newUnlocks, progress };
    }
};