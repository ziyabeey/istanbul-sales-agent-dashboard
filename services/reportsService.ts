
import { sheetsService } from './googleSheetsService';
import { storage } from './storage';
import { rewardEngine } from './rewardEngine';
import { TARGET_TEKLIF_AY_DEFAULT } from '../constants';
import type { EmailTemplate } from '../types';

const getTargetTeklifAy = (): number => {
    const v = typeof localStorage !== 'undefined' ? localStorage.getItem('agent_target_teklif_ay') : null;
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isNaN(n) || n < 1 ? TARGET_TEKLIF_AY_DEFAULT : Math.min(500, n);
};

const useSheets = () => sheetsService.isAuthenticated && localStorage.getItem('sheetId');

export type ReportPeriod = 'all' | 'thisMonth';

export const reportsService = {
    getPerformanceData: async (period: ReportPeriod = 'all') => {
        const leads = useSheets() ? await sheetsService.getLeads() : storage.getLeads();
        let interactions = useSheets() ? await sheetsService.getInteractions() : storage.getInteractions();

        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
        if (period === 'thisMonth') {
            interactions = interactions.filter(int => int.date >= firstDayThisMonth);
        }

        const funnel = [
            { name: 'Taranan', value: Math.floor(leads.length * 1.5) + 20, fill: '#94a3b8' },
            { name: 'Lead', value: leads.length, fill: '#6366f1' },
            { name: 'Temas', value: leads.filter(l => ['takipte', 'teklif_gonderildi', 'olumlu', 'olumsuz'].includes(l.lead_durumu)).length, fill: '#8b5cf6' },
            { name: 'Yanıt', value: leads.filter(l => ['teklif_gonderildi', 'olumlu', 'olumsuz'].includes(l.lead_durumu)).length, fill: '#ec4899' },
            { name: 'Teklif', value: leads.filter(l => l.lead_durumu === 'teklif_gonderildi').length, fill: '#f59e0b' },
            { name: 'Satış', value: leads.filter(l => l.lead_durumu === 'olumlu').length, fill: '#10b981' },
        ];

        const weeklyTrend: { name: string; sent: number; response: number }[] = [];
        const today = new Date();
        if (period === 'thisMonth') {
            const dayCount = today.getDate();
            for (let day = 1; day <= dayCount; day++) {
                const d = new Date(today.getFullYear(), today.getMonth(), day);
                const dateStr = d.toISOString().slice(0, 10);
                const dayName = `${day}`;
                const sentCount = interactions.filter((int: any) => int.date === dateStr && int.direction === 'outbound').length;
                const responseCount = interactions.filter((int: any) => int.date === dateStr && int.direction === 'inbound').length;
                weeklyTrend.push({ name: dayName, sent: sentCount, response: responseCount });
            }
        } else {
            for (let i = 6; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                const dateStr = d.toISOString().slice(0, 10);
                const dayName = d.toLocaleDateString('tr-TR', { weekday: 'short' });
                const sentCount = interactions.filter((int: any) => int.date === dateStr && int.direction === 'outbound').length;
                const responseCount = interactions.filter((int: any) => int.date === dateStr && int.direction === 'inbound').length;
                weeklyTrend.push({ name: dayName, sent: sentCount, response: responseCount });
            }
        }

        const sectors: Record<string, { total: number, success: number }> = {};
        leads.forEach(l => {
            if (!sectors[l.sektor]) sectors[l.sektor] = { total: 0, success: 0 };
            sectors[l.sektor].total += 1;
            if (['teklif_gonderildi', 'olumlu'].includes(l.lead_durumu)) {
                sectors[l.sektor].success += 1;
            }
        });

        const sectorSuccessRate = Object.keys(sectors).map(key => ({
            subject: key,
            A: sectors[key].total * 10,
            B: sectors[key].success * 20,
            fullMark: 150
        })).slice(0, 5);

        // Web odaklı KPI'lar (web sitesi satışı)
        const leadMap = new Map(leads.map(l => [l.id, l]));
        const sitesiOlmayanLeadMailSayisi = interactions.filter((int: any) => {
            if (int.direction !== 'outbound' || int.type !== 'email') return false;
            const lead = leadMap.get(int.leadId);
            return lead?.websitesi_var_mi === 'Hayır';
        }).length;
        const teklifGonderilen = leads.filter(l => l.lead_durumu === 'teklif_gonderildi').length;
        const teklifSitesiOlmayan = leads.filter(l => l.lead_durumu === 'teklif_gonderildi' && l.websitesi_var_mi === 'Hayır').length;
        const teklifOraniSitesiOlmayan = teklifGonderilen > 0
            ? Math.round((teklifSitesiOlmayan / teklifGonderilen) * 100)
            : 0;
        const olumluYanit = leads.filter(l => l.lead_durumu === 'olumlu').length;
        const teklifOlumluOrani = teklifGonderilen > 0
            ? Math.round((olumluYanit / teklifGonderilen) * 100)
            : 0;

        const TARGET_TEKLIF_AY = getTargetTeklifAy();
        const firstDayThisMonthStr = firstDayThisMonth;
        const teklifGonderilenBuAy = period === 'thisMonth'
            ? leads.filter(l => l.lead_durumu === 'teklif_gonderildi' && l.son_kontakt_tarihi && l.son_kontakt_tarihi >= firstDayThisMonthStr).length
            : undefined;
        const eskiSiteLeadSayisi = leads.filter(l => (l.notlar || '').includes('[Site yaşı: eski]')).length;
        const webKpis = {
            sitesiOlmayanLeadMailSayisi,
            teklifGonderilen,
            teklifSitesiOlmayan,
            teklifOraniSitesiOlmayan,
            olumluYanit,
            teklifOlumluOrani,
            targetTeklifAy: period === 'thisMonth' ? TARGET_TEKLIF_AY : undefined,
            teklifGonderilenBuAy,
            eskiSiteLeadSayisi
        };

        const evolutionCandidates = rewardEngine.getTemplatesNeedingEvolution(0.2, 5);

        // A/B şablon raporu: her şablon için gönderim ve başarı sayısı + oran
        const templates: EmailTemplate[] = storage.getTemplates();
        const templateAbReport = templates
            .filter(t => (t.useCount ?? 0) > 0)
            .map(t => ({
                id: t.id,
                name: t.name || t.id,
                type: t.type,
                useCount: t.useCount ?? 0,
                successCount: t.successCount ?? 0,
                successRatePct: (t.useCount ?? 0) > 0
                    ? Math.round(((t.successCount ?? 0) / (t.useCount ?? 1)) * 100)
                    : 0
            }))
            .sort((a, b) => b.useCount - a.useCount);

        const sectorStats = templates
            .filter(t => (t.useCount ?? 0) > 0 && t.sectorStats && Object.keys(t.sectorStats).length > 0)
            .flatMap(t => Object.entries(t.sectorStats || {}).map(([sektor, st]) => ({
                templateId: t.id,
                templateName: t.name || t.id,
                sektor,
                useCount: (st as { useCount?: number }).useCount ?? 0,
                successCount: (st as { successCount?: number }).successCount ?? 0
            })))
            .filter(s => s.useCount > 0);
        const templateAbReportBySector = sectorStats;

        const bestSectorTemplate = [...sectorStats]
            .map(s => ({
                ...s,
                successRatePct: s.useCount > 0 ? Math.round((s.successCount / s.useCount) * 100) : 0
            }))
            .filter(s => s.useCount >= 2)
            .sort((a, b) => b.successRatePct - a.successRatePct)
            .slice(0, 5);

        return { funnel, weeklyTrend, sectorSuccessRate, webKpis, evolutionCandidates, templateAbReport, templateAbReportBySector, bestSectorTemplate };
    }
};
