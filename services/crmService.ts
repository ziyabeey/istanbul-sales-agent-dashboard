
import { Task, CalendarEvent, EmailTemplate } from '../types';
import { sheetsService } from './googleSheetsService';
import { storage } from './storage';
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => process.env.API_KEY || localStorage.getItem('apiKey') || '';

const useSheets = () => sheetsService.isAuthenticated && localStorage.getItem('sheetId');

export const crmService = {
    // TASKS
    tasks: {
        getAll: async (): Promise<Task[]> => {
            if (useSheets()) {
                return await sheetsService.getTasks();
            }
            return storage.getTasks();
        },
        create: async (task: Task): Promise<void> => {
            if (useSheets()) {
                await sheetsService.addTask(task);
            } else {
                storage.saveTask(task);
            }
        },
        update: async (task: Task): Promise<void> => {
            if (useSheets()) {
                await sheetsService.updateTask(task);
            } else {
                storage.updateTask(task);
            }
        }
    },

    // CALENDAR
    calendar: {
        getAll: async (): Promise<CalendarEvent[]> => {
            if (useSheets()) {
                return await sheetsService.getCalendarEvents();
            }
            return storage.getCalendarEvents();
        },
        create: async (event: Partial<CalendarEvent>): Promise<string> => {
            if (useSheets()) {
                return await sheetsService.createCalendarEvent(event);
            }
            const newEvent = { ...event, id: Math.random().toString(36).substr(2, 9) } as CalendarEvent;
            storage.saveCalendarEvent(newEvent);
            return "";
        }
    },

    // TEMPLATES
    templates: {
        getAll: async (): Promise<EmailTemplate[]> => {
            return storage.getTemplates();
        },
        save: async (template: EmailTemplate) => {
            storage.saveTemplate(template);
        },
        update: async (template: EmailTemplate) => {
            storage.updateTemplate(template);
        },
        delete: async (id: string) => {
            storage.deleteTemplate(id);
        },
        recordUsage: async (id: string, sector: string) => {
            storage.incrementTemplateUsage(id, sector);
        },
        // AI generation for templates moved to aiService? 
        // Original api.ts had generateColdEmail in templates.
        // I moved it to aiService.generateEmail. 
        // But api.templates.generateColdEmail() was exposed.
        // Ideally we keep it here or delegate.
        // Let's delegate or keep strict separation. 
        // I will keep a helper here that simply calls AI service if needed, 
        // OR just move it fully to AIService and expose it on API.templates too for compatibility?
        // Actually, let's move it to aiService fully (done).
    }
};
