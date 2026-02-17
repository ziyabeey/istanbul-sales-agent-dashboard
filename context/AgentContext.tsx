
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { toast } from 'sonner';
import { Lead, AgentThought, AgentConfig, AgentQueueItem, SessionStats, AgentNotification } from '../types';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { sheetsService } from '../services/googleSheetsService';
import { rewardEngine } from '../services/rewardEngine';
import { AGENT_ERROR_CODES, MIN_ENRICHMENT_SCORE as DEFAULT_MIN_ENRICHMENT_SCORE } from '../constants';
import { useAgentOutreach } from '../hooks/agent/useAgentOutreach';
import { useAgentDiscovery } from '../hooks/agent/useAgentDiscovery';
import { useAgentMaintenance } from '../hooks/agent/useAgentMaintenance';
import { useAgentStrategy } from '../hooks/agent/useAgentStrategy';
import { useAgentPersona } from '../hooks/agent/useAgentPersona';
import { isProspectLead, isSystemMailbox, isPermanentAgentError, getErrorMessage } from '../utils/agentUtils';
import { computeAgentQueue } from '../utils/agentQueue';

interface AgentContextType {
    isAgentRunning: boolean;
    agentStatus: string;
    thoughts: AgentThought[];
    pendingDraftsCount: number;
    agentConfig: AgentConfig;
    agentQueue: AgentQueueItem[];
    sessionStats: SessionStats;
    toggleAgent: () => void;
    updateAgentConfig: (config: Partial<AgentConfig>) => void;
    addThought: (type: AgentThought['type'], message: string, metadata?: any) => void;
    addNotification: (title: string, message: string, type: AgentNotification['type']) => void;
    clearThoughts: () => void;
    clearSessionCache: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const BURST_INTERVAL = 2000;
const IDLE_INTERVAL = 15000;
const AGENT_RUNNING_KEY = 'agentRunning';
const SESSION_STATS_KEY = 'agent_session_stats';

function loadPersistedSessionStats(): SessionStats | null {
    try {
        const raw = localStorage.getItem(SESSION_STATS_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as SessionStats;
        if (typeof parsed.sanitized === 'number' && typeof parsed.startedAt === 'number') return parsed;
    } catch (_) {}
    return null;
}

function saveSessionStats(stats: SessionStats) {
    try {
        localStorage.setItem(SESSION_STATS_KEY, JSON.stringify(stats));
    } catch (_) {}
}

const defaultSessionStats: SessionStats = {
    sanitized: 0, enriched: 0, discovered: 0, emailed: 0, drafted: 0, bounced: 0, errors: 0, startedAt: Date.now()
};

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // --- STATE ---
    const [isAgentRunning, setIsAgentRunning] = useState(false);
    const [agentStatus, setAgentStatus] = useState('Hazır');
    const [thoughts, setThoughts] = useState<AgentThought[]>([]);
    const [pendingDraftsCount, setPendingDraftsCount] = useState(0);
    const [agentQueue, setAgentQueue] = useState<AgentQueueItem[]>([]);
    const [sessionStats, setSessionStats] = useState<SessionStats>(() => loadPersistedSessionStats() ?? defaultSessionStats);
    const [agentConfig, setAgentConfig] = useState<AgentConfig>(() => ({
        targetDistrict: 'Tümü',
        targetSector: 'Tümü',
        focusMode: 'balanced',
        ignoreBudgetLimit: typeof localStorage !== 'undefined' && localStorage.getItem('agent_ignore_budget') === 'true',
        speedProfile: (typeof localStorage !== 'undefined' && localStorage.getItem('agent_speed_profile') as AgentConfig['speedProfile']) || 'dengeli',
        autoSendFollowUp: typeof localStorage !== 'undefined' && localStorage.getItem('agent_auto_send_followup') === 'true',
        dailyEmailCap: Math.min(200, Math.max(10, parseInt(localStorage.getItem('agent_daily_email_cap') || '50', 10) || 50))
    }));

    // --- REFS ---
    const configRef = useRef(agentConfig);
    const isRunningRef = useRef(false);
    const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const burstStreakRef = useRef(0);
    const lastHeartbeat = useRef<number>(Date.now());
    const consecutiveErrorsRef = useRef<number>(0);
    const circuitBreakerRef = useRef<{ gmail: number; ai: number }>({ gmail: 0, ai: 0 });
    const sessionStatsRef = useRef<SessionStats>(sessionStats);

    // Sync refs
    useEffect(() => { configRef.current = agentConfig; }, [agentConfig]);
    useEffect(() => { sessionStatsRef.current = sessionStats; }, [sessionStats]);
    useEffect(() => { isRunningRef.current = isAgentRunning; }, [isAgentRunning]);

    // Persist session stats so they survive refresh and show long-running session totals
    useEffect(() => {
        saveSessionStats(sessionStats);
    }, [sessionStats]);

    // --- BASIC HELPERS (Defined before hooks) ---

    const addThought = (type: AgentThought['type'], message: string, metadata?: any) => {
        const newThought: AgentThought = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString(),
            type,
            message,
            metadata
        };
        setThoughts(prev => [...prev, newThought].slice(-50));
    };

    const addNotification = (title: string, message: string, type: AgentNotification['type']) => {
        switch (type) {
            case 'success':
                toast.success(title, { description: message });
                break;
            case 'error':
                toast.error(title, { description: message });
                break;
            case 'warning':
                toast.warning(title, { description: message });
                break;
            case 'info':
            default:
                toast.info(title, { description: message });
                break;
        }
    };

    const clearThoughts = () => setThoughts([]);

    const clearSessionCache = () => {
        storage.clearAgentSessionCache();
        setSessionStats({ ...defaultSessionStats, startedAt: Date.now() });
        setThoughts([]);
    };

    const stopAgentSafely = (reason: string, cause: 'budget' | 'error' = 'budget') => {
        setIsAgentRunning(false);
        localStorage.setItem(AGENT_RUNNING_KEY, 'false');
        setAgentStatus(cause === 'error' ? 'Durduruldu (Hata)' : 'Durduruldu (Bütçe)');
        addThought('error', reason);
        addNotification('Ajan Durduruldu', reason, 'warning');
        if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };

    const checkAndIncrementCost = () => {
        if (configRef.current.ignoreBudgetLimit) {
            try {
                storage.incrementUsage('ai');
            } catch (_) {}
            return true;
        }
        const usage = storage.getUsage();
        if (usage.estimatedCost >= usage.dailyLimit) {
            if (isRunningRef.current) {
                stopAgentSafely(`Günlük bütçe ($${usage.dailyLimit}) dolduğu için işlem durduruldu.`);
            }
            return false;
        }
        storage.incrementUsage('ai');
        return true;
    };

    const updateAgentConfig = (config: Partial<AgentConfig>) => {
        setAgentConfig(prev => {
            const next = { ...prev, ...config };
            if (typeof config.ignoreBudgetLimit === 'boolean' && typeof localStorage !== 'undefined') {
                localStorage.setItem('agent_ignore_budget', String(config.ignoreBudgetLimit));
            }
            if (config.speedProfile && typeof localStorage !== 'undefined') {
                localStorage.setItem('agent_speed_profile', config.speedProfile);
            }
            if (typeof config.autoSendFollowUp === 'boolean' && typeof localStorage !== 'undefined') {
                localStorage.setItem('agent_auto_send_followup', String(config.autoSendFollowUp));
            }
            if (typeof config.dailyEmailCap === 'number' && typeof localStorage !== 'undefined') {
                localStorage.setItem('agent_daily_email_cap', String(Math.min(200, Math.max(10, config.dailyEmailCap))));
            }
            return next;
        });
    };

    const CIRCUIT_BREAKER_MS = 5 * 60 * 1000;
    const isCircuitOpen = (category: 'gmail' | 'ai') => Date.now() < circuitBreakerRef.current[category];
    const recordCircuitFailure = (category: 'gmail' | 'ai') => {
        circuitBreakerRef.current[category] = Date.now() + CIRCUIT_BREAKER_MS;
    };

    // --- HOOKS ---
    const { performLeadSanitization } = useAgentMaintenance({ setAgentStatus, addThought, setSessionStats });
    const { performStrategyManagement } = useAgentStrategy({ setAgentStatus });
    const { performPersonaEnrichment } = useAgentPersona({ checkAndIncrementCost, setAgentStatus, addThought, isCircuitOpen, recordCircuitFailure });
    const { performAutoEnrichment, performSmartDiscovery } = useAgentDiscovery({ configRef, checkAndIncrementCost, setAgentStatus, addThought, addNotification, setSessionStats, isCircuitOpen, recordCircuitFailure });
    const { performOutreach, performColdPoolReEngagement, performInboxReplySync, performAutoReplyDrafting } = useAgentOutreach({ checkAndIncrementCost, setAgentStatus, addThought, addNotification, setSessionStats, sessionStatsRef, configRef, isCircuitOpen, recordCircuitFailure });

    // --- EFFECTS ---

    // Initialize & Auto-Connect Google Services
    useEffect(() => {
        const refreshPendingCount = async () => {
            try {
                const leads = await api.leads.getAll();
                const count = leads.filter(l => l.lead_durumu === 'onay_bekliyor').length;
                setPendingDraftsCount(count);
            } catch (e) {
                console.error('Pending count refresh error', e);
            }
        };

        refreshPendingCount();
        const interval = setInterval(refreshPendingCount, 10000);

        const initGoogle = async () => {
            const apiKey = localStorage.getItem('googleApiKey');
            const clientId = localStorage.getItem('clientId');
            if (apiKey && clientId) {
                try {
                    await sheetsService.initialize(apiKey, clientId);
                    console.log("Google Service Auto-Initialized");
                } catch (e) {
                    console.error("Google Service Auto-Init Failed:", e);
                }
            }
        };
        initGoogle();

        return () => {
            clearInterval(interval);
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        };
    }, []);

    // Restore running state and start loop
    useEffect(() => {
        const wasRunning = localStorage.getItem(AGENT_RUNNING_KEY) === 'true';
        if (wasRunning) {
            setIsAgentRunning(true);
            localStorage.setItem(AGENT_RUNNING_KEY, 'true');
            setAgentStatus('Başlatılıyor...');
            if (sessionStorage.getItem('agentRestoreNotified') !== 'true') {
                addThought('info', 'Otopilot oturumu geri yüklendi.');
                sessionStorage.setItem('agentRestoreNotified', 'true');
            }
            // Start the loop after a slight delay to ensure everything is mounted
            setTimeout(() => {
                if (isRunningRef.current) agentLoop();
            }, 1000);
        }

        return () => {
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        };
    }, []);

    // --- MAIN LOOP ---

    const agentLoop = async () => {
        if (!isRunningRef.current) {
            localStorage.setItem(AGENT_RUNNING_KEY, 'false');
            return;
        }

        try {
            const loopStartMs = Date.now();
            lastHeartbeat.current = loopStartMs;

            const leads = await api.leads.getAll();
            const focusMode = configRef.current.focusMode;
            const allowDiscovery = focusMode !== 'outreach_only';
            const allowOutreach = focusMode !== 'discovery_only';

            // --- QUEUE COMPUTATION ---
            try {
                const minEnrichmentScore = configRef.current.minEnrichmentScore ?? DEFAULT_MIN_ENRICHMENT_SCORE;
                const queue = computeAgentQueue(leads, focusMode, minEnrichmentScore);
                setAgentQueue(queue);
            } catch (e) {
                console.error('Queue computation error', e);
            }

            // --- PRIORITY 0: RL LEARNING SWEEP ---
            try {
                const penalties = rewardEngine.sweepTimeoutPenalties(leads);
                if (penalties > 0) {
                    addThought('learning', `RL: ${penalties} lead'e yanıtsızlık cezası uygulandı (7/14 gün).`);
                }
            } catch (e) {
                console.error('RL sweep error', e);
            }

            // --- FAZ 1: BAKIM (her döngüde, slot tüketmez) + adım süreleri ---
            const stepMs: Record<string, number> = {};
            const runStep = async (name: string, fn: () => Promise<void>) => {
                const t0 = performance.now();
                await fn();
                stepMs[name] = Math.round(performance.now() - t0);
            };
            try {
                await runStep('sanitize', () => performLeadSanitization(leads).then(() => {}));
                await runStep('strategy', () => performStrategyManagement(leads).then(() => {}));
                if (allowOutreach) await runStep('inbox_sync', () => performInboxReplySync(leads).then(() => {}));
            } catch (e) {
                console.error('Maintenance step error', e);
                setSessionStats((s: SessionStats) => ({ ...s, errors: s.errors + 1 }));
            }

            // --- FAZ 2: AKSİYONLAR (slot kotası ve zamanlama config veya speedProfile) ---
            const cfg = configRef.current;
            const draftOnly = !cfg.autoSendFollowUp;
            const profile = cfg.speedProfile ?? 'dengeli';
            const PROFILE_DEFAULTS: Record<string, { slotCount: number; burst: number; idle: number; cooldownThr: number; cooldownMs: number }> = {
                agresif: { slotCount: 3, burst: 1500, idle: 10000, cooldownThr: 60, cooldownMs: 20000 },
                dengeli: { slotCount: 2, burst: 2000, idle: 15000, cooldownThr: 45, cooldownMs: 30000 },
                tasarruf: { slotCount: 1, burst: 3000, idle: 20000, cooldownThr: 30, cooldownMs: 45000 }
            };
            const def = PROFILE_DEFAULTS[profile] ?? PROFILE_DEFAULTS.dengeli;
            const MAX_SLOTS = cfg.slotCount ?? def.slotCount;
            const SLOT_LIGHT = 1;
            const SLOT_HEAVY = 2;
            const BURST_MS = cfg.burstIntervalMs ?? def.burst;
            const IDLE_MS = cfg.idleIntervalMs ?? def.idle;
            const COOLDOWN_THRESHOLD = cfg.cooldownThreshold ?? def.cooldownThr;
            const COOLDOWN_MS = cfg.cooldownDurationMs ?? def.cooldownMs;

            let slotsUsed = 0;
            const runAction = async (name: string, fn: () => Promise<boolean>): Promise<boolean> => {
                const t0 = performance.now();
                const result = await fn();
                stepMs[name] = Math.round(performance.now() - t0);
                return result;
            };
            if (allowDiscovery && slotsUsed < MAX_SLOTS && (await runAction('enrich', () => performAutoEnrichment(leads)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_LIGHT);
            if (allowDiscovery && slotsUsed < MAX_SLOTS && (await runAction('persona', () => performPersonaEnrichment(leads)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_LIGHT);
            if (allowDiscovery && slotsUsed < MAX_SLOTS && (await runAction('discovery', () => performSmartDiscovery(leads)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_HEAVY);
            if (allowOutreach && slotsUsed < MAX_SLOTS && (await runAction('draft', () => performAutoReplyDrafting(leads, draftOnly)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_LIGHT);
            if (allowOutreach && slotsUsed < MAX_SLOTS && (await runAction('outreach', () => performOutreach(leads)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_HEAVY);
            if (allowOutreach && slotsUsed < MAX_SLOTS && (await runAction('re_engagement', () => performColdPoolReEngagement(leads)))) slotsUsed = Math.min(MAX_SLOTS, slotsUsed + SLOT_HEAVY);

            const actionTaken = slotsUsed > 0;
            const lastLoopMs = Date.now() - loopStartMs;
            setSessionStats((s: SessionStats) => ({ ...s, lastLoopMs, lastLoopStepMs: { ...stepMs } }));

            consecutiveErrorsRef.current = 0;

            if (actionTaken) {
                burstStreakRef.current += 1;
                if (burstStreakRef.current > COOLDOWN_THRESHOLD) {
                    setAgentStatus(`Aşırı yüklenme (Soğuma ${COOLDOWN_MS / 1000}sn)...`);
                    addThought('warning', `Sistem yoğun, ${COOLDOWN_MS / 1000}sn soğuma başlatıldı.`);
                    loopTimeoutRef.current = setTimeout(() => {
                        burstStreakRef.current = 0;
                        if (isRunningRef.current) agentLoop();
                    }, COOLDOWN_MS);
                    return;
                }
                setAgentStatus(`Aktif İşlem (x${burstStreakRef.current})...`);
                loopTimeoutRef.current = setTimeout(agentLoop, BURST_MS);
            } else {
                setAgentStatus('Beklemede...');
                burstStreakRef.current = 0;
                loopTimeoutRef.current = setTimeout(agentLoop, IDLE_MS);
            }

        } catch (error: any) {
            console.error("Agent Loop Critical Error", error);
            const msg = getErrorMessage(error);
            setSessionStats((s: SessionStats) => ({ ...s, errors: s.errors + 1 }));

            if (isPermanentAgentError(error)) {
                consecutiveErrorsRef.current = 13;
                stopAgentSafely(`Kalıcı hata (yetki/ayar): ${msg}. Lütfen API anahtarı ve yetkileri kontrol edin.`, 'error');
                return;
            }

            consecutiveErrorsRef.current += 1;
            if (consecutiveErrorsRef.current > 12) {
                stopAgentSafely(`Sistem üst üste 12 kez kritik hata aldı: ${msg}`, 'error');
                return;
            }

            addThought('error', `[${AGENT_ERROR_CODES.UNKNOWN}] Döngü Hatası: ${msg}.`);
            loopTimeoutRef.current = setTimeout(agentLoop, 15000);
        }
    };

    // --- WATCHDOG TIMER ---
    useEffect(() => {
        const watchdogInterval = setInterval(() => {
            if (!isAgentRunning) return;

            const timeSinceLastHeartbeat = Date.now() - lastHeartbeat.current;
            // If loop hasn't run for 45 seconds (and isn't explicitly paused for cooling down/user action), restart it
            // We give 45s because some API calls might be slow, but usually <5s.
            // But if it's "Soğuma" status, we should skip check.
            if (timeSinceLastHeartbeat > 45000 && !agentStatus.includes('Soğuma')) {
                console.warn('Watchdog: Agent loop stuck. Restarting...');
                addThought('warning', 'Sistem yanıt vermeyi kesti. Otomatik olarak yeniden başlatılıyor...');

                if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
                lastHeartbeat.current = Date.now(); // Reset to avoid double restart
                agentLoop();
            }
        }, 10000); // Check every 10s

        return () => clearInterval(watchdogInterval);
    }, [isAgentRunning, agentStatus]);

    const toggleAgent = () => {
        if (isAgentRunning) {
            setIsAgentRunning(false);
            localStorage.setItem(AGENT_RUNNING_KEY, 'false');
            setAgentStatus('Durduruldu');
            sessionStorage.removeItem('agentRestoreNotified');
            addThought('info', 'Otopilot durduruldu.');
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        } else {
            setIsAgentRunning(true);
            localStorage.setItem(AGENT_RUNNING_KEY, 'true');
            setAgentStatus('Başlatılıyor...');
            addThought('info', 'Otopilot başlatıldı.');
            setTimeout(agentLoop, 100);
        }
    };

    return (
        <AgentContext.Provider value={{
            isAgentRunning,
            agentStatus,
            thoughts,
            pendingDraftsCount,
            agentConfig,
            agentQueue,
            sessionStats,
            toggleAgent,
            updateAgentConfig,
            addThought,
            addNotification,
            clearThoughts,
            clearSessionCache
        }}>
            {children}
        </AgentContext.Provider>
    );
};

export const useAgent = () => {
    const context = useContext(AgentContext);
    if (context === undefined) {
        throw new Error('useAgent must be used within an AgentProvider');
    }
    return context;
};
