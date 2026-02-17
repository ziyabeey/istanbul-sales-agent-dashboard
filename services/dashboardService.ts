
import { DashboardStats, ActionLog } from '../types';
import { sheetsService } from './googleSheetsService';
import { storage } from './storage';

const useSheets = () => sheetsService.isAuthenticated && localStorage.getItem('sheetId');

export const dashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        if (useSheets()) {
            return await sheetsService.calculateStats();
        }
        return storage.calculateStats();
    },

    getLogs: async (): Promise<ActionLog[]> => {
        if (useSheets()) {
            return await sheetsService.getLogs();
        }
        return storage.getLogs();
    },

    logAction: async (action: string, detail: string, type: 'success' | 'info' | 'error' | 'warning') => {
        const log: ActionLog = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            action,
            detail,
            type
        };

        if (useSheets()) {
            await sheetsService.logAction(log);
        } else {
            storage.addLog(log);
        }
    }
};
