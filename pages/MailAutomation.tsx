
import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Loader2, Sparkles, Send, Clock, Check, AlertTriangle, Eye, X, UserCircle, BrainCircuit, MessageCircle, ArrowRight, Inbox, ArrowUpRight, FileCheck, Search, Activity, Zap, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { Lead, EmailTemplate, PersonaType } from '../types';
import EmptyState from '../components/EmptyState';
import { useAgent } from '../context/AgentContext';

interface InboxMessage {
    id: string;
    threadId?: string;
    fromEmail: string;
    fromName: string;
    subject: string;
    snippet: string;
    date: string;
    isUnread: boolean;
}

interface SentMessage {
    id: string;
    toEmail: string;
    subject: string;
    snippet: string;
    date: string;
}

interface QueueItem {
    id: string;
    lead: Lead;
    template: EmailTemplate;
    score: number;
    status: 'pending' | 'sending' | 'sent' | 'error' | 'waiting_assets';
    reason: string;
    generatedContent?: any;
}

const MailAutomation: React.FC = () => {
    const { agentConfig } = useAgent();
    const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'approval' | 'activity'>('inbox');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Inbox & Sent state
    const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
    const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<InboxMessage | SentMessage | null>(null);
    const [activityLogs, setActivityLogs] = useState<any[]>([]); // New state for logs

    // Approval / Queue state (preserved from old page)
    const [leads, setLeads] = useState<Lead[]>([]);
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [queue, setQueue] = useState<QueueItem[]>([]);

    // Draft / Compose state
    const [isComposing, setIsComposing] = useState(false);
    const [composeTo, setComposeTo] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Draft Approval state (preserved)
    const [selectedDraft, setSelectedDraft] = useState<Lead | null>(null);
    const [draftSubject, setDraftSubject] = useState('');
    const [draftBody, setDraftBody] = useState('');
    const [isSendingDraft, setIsSendingDraft] = useState(false);
    const [isGeneratingReply, setIsGeneratingReply] = useState(false);
    const [selectedDraftIds, setSelectedDraftIds] = useState<Set<string>>(new Set());
    const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null);
    const [syncingSent, setSyncingSent] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async (retryCount = 0) => {
        setLoading(true);
        let willRetry = false;
        try {
            const [leadsData, templatesData] = await Promise.all([
                api.leads.getAll(),
                api.templates.getAll()
            ]);
            setLeads(leadsData);
            setTemplates(templatesData);
            calculateQueue(leadsData, templatesData);

            const [inbox, sent, logs] = await Promise.all([
                api.gmail.listInbox(30),
                api.gmail.listSent(30),
                api.interactions.getRecent(50)
            ]);
            setInboxMessages(inbox);
            setSentMessages(sent);
            setActivityLogs(logs);
            setLastSyncAt(new Date());

            const gmailReady = typeof window !== 'undefined' && !!(window as any).gapi?.client?.gmail;
            const bothEmpty = inbox.length === 0 && sent.length === 0;
            willRetry = bothEmpty && !gmailReady && retryCount < 2;
            if (willRetry) {
                const delayMs = retryCount === 0 ? 1000 : 3000;
                setTimeout(() => loadData(retryCount + 1), delayMs);
            }
        } catch (error) {
            console.error("Load failed", error);
        } finally {
            if (!willRetry) setLoading(false);
        }
    };

    const refreshInboxAndSent = async () => {
        setSyncingSent(true);
        try {
            const [inbox, sent] = await Promise.all([
                api.gmail.listInbox(30),
                api.gmail.listSent(30)
            ]);
            setInboxMessages(inbox);
            setSentMessages(sent);
            setLastSyncAt(new Date());
            toast.success('Gelen / Gönderilen güncellendi');
        } catch (e) {
            toast.error('Senkronizasyon başarısız. Gmail bağlı mı kontrol edin.');
        } finally {
            setSyncingSent(false);
        }
    };

    const toggleDraftSelection = (leadId: string) => {
        setSelectedDraftIds(prev => {
            const next = new Set(prev);
            if (next.has(leadId)) next.delete(leadId);
            else next.add(leadId);
            return next;
        });
    };

    const clearSelectedDrafts = async () => {
        if (selectedDraftIds.size === 0) return;
        const count = selectedDraftIds.size;
        try {
            for (const id of selectedDraftIds) {
                const lead = leads.find(l => l.id === id);
                if (lead && lead.draftResponse) {
                    await api.leads.update({ ...lead, lead_durumu: 'takipte', draftResponse: undefined });
                }
            }
            setSelectedDraftIds(new Set());
            setSelectedDraft(null);
            await loadData();
            toast.success(`${count} taslak kaldırıldı`);
        } catch (e) {
            toast.error('Taslaklar kaldırılamadı');
        }
    };

    const clearAllDrafts = async () => {
        const count = await api.leads.clearPendingDrafts();
        setSelectedDraftIds(new Set());
        setSelectedDraft(null);
        await loadData();
        if (count > 0) toast.success(`${count} taslak temizlendi`);
    };

    const calculateQueue = (leadsData: Lead[], templatesData: EmailTemplate[]) => {
        const newQueue: QueueItem[] = [];
        const introTemplates = templatesData.filter(t => t.type === 'intro');
        leadsData.forEach(lead => {
            if (lead.lead_durumu !== 'aktif' || introTemplates.length === 0) return;
            const picked = pickSmartIntroTemplate(lead, introTemplates);
            newQueue.push({
                id: `q-${lead.id}`,
                lead, template: picked.template,
                score: lead.lead_skoru,
                status: 'pending',
                reason: introTemplates.length > 1 ? `Akıllı Taslak #${picked.variant + 1}` : 'Yeni Lead'
            });
        });
        setQueue(newQueue.sort((a, b) => b.score - a.score));
    };

    const getDeterministicVariant = (lead: Lead, optionCount: number) => {
        if (optionCount <= 1) return 0;
        const key = `${lead.id}-${lead.firma_adi}-${lead.sektor}`;
        let hash = 0;
        for (let i = 0; i < key.length; i++) { hash = (hash << 5) - hash + key.charCodeAt(i); hash |= 0; }
        return Math.abs(hash) % optionCount;
    };

    const getTemplateSectorWinRate = (template: EmailTemplate, sector: string) => {
        const sec = template.sectorStats?.[sector];
        if (sec && sec.useCount > 0) return sec.successCount / sec.useCount;
        if ((template.useCount || 0) > 0) return (template.successCount || 0) / (template.useCount || 1);
        return 0.15;
    };

    const pickSmartIntroTemplate = (lead: Lead, introTemplates: EmailTemplate[]) => {
        if (introTemplates.length === 1) return { template: introTemplates[0], variant: 0, strategy: 'Tek intro şablon' };
        const scored = introTemplates.map(t => ({
            template: t,
            score: getTemplateSectorWinRate(t, lead.sektor) * 100 + (t.performanceScore || 0)
        })).sort((a, b) => b.score - a.score);
        const variant = getDeterministicVariant(lead, Math.min(3, scored.length));
        return { template: scored[variant].template, variant, strategy: `Sektör uyumu` };
    };

    // Compose & Send
    const handleComposeSend = async () => {
        if (!composeTo || !composeSubject) return;
        setIsSending(true);
        try {
            await api.gmail.send(composeTo, composeSubject, composeBody);
            await api.dashboard.logAction('Manuel Mail', `${composeTo} adresine mail gönderildi.`, 'success');
            setIsComposing(false);
            setComposeTo(''); setComposeSubject(''); setComposeBody('');
            loadData();
        } catch (e) {
            console.error(e);
            alert('Mail gönderilemedi.');
        } finally {
            setIsSending(false);
        }
    };

    // Approval flow (preserved from old page)
    const handleApproveSend = async () => {
        if (!selectedDraft) return;
        setIsSendingDraft(true);
        try {
            await api.gmail.send(selectedDraft.email, draftSubject, draftBody);
            if (selectedDraft.lastUsedTemplateId) {
                await api.templates.recordUsage(selectedDraft.lastUsedTemplateId, selectedDraft.sektor);
            }
            const updatedLead: Lead = {
                ...selectedDraft, lead_durumu: 'takipte', draftResponse: undefined,
                son_kontakt_tarihi: new Date().toISOString().slice(0, 10)
            };
            await api.leads.update(updatedLead);
            await api.dashboard.logAction('Yanıt Onaylandı', `${selectedDraft.firma_adi} mail gönderildi`, 'success');
            setQueue(prev => prev.filter(q => q.lead.id !== selectedDraft.id));
            setSelectedDraft(null);
            loadData();
        } catch (error) {
            console.error(error);
            alert('Gönderim başarısız.');
        } finally {
            setIsSendingDraft(false);
        }
    };

    const generateReplyForIncoming = async (lead: Lead) => {
        setIsGeneratingReply(true);
        try {
            const result = await api.strategy.predictNextMove(lead);
            const reply = result.possibleQuestions?.[0]?.responses?.neutral || 'Merhaba,\n\nGeri dönüşünüz için teşekkürler. Yarın 14:00 uygun mudur?\n\nSaygılarımla,';
            const draftLead: Lead = {
                ...lead,
                draftResponse: { subject: `Re: ${lead.firma_adi}`, body: reply, intent: 'reply', created_at: new Date().toISOString() }
            };
            setSelectedDraft(draftLead);
            setDraftSubject(`Re: ${lead.firma_adi}`);
            setDraftBody(reply);
        } catch (error) {
            console.error(error);
            alert('Yanıt oluşturulamadı.');
        } finally {
            setIsGeneratingReply(false);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            const now = new Date();
            const isToday = d.toDateString() === now.toDateString();
            if (isToday) return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
        } catch { return dateStr; }
    };

    const filteredInbox = inboxMessages.filter(m =>
        m.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.fromEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSent = sentMessages.filter(m =>
        m.toEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const leadsWithDrafts = leads.filter(l => l.draftResponse);
    const approvalCount = leadsWithDrafts.length + queue.length;

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Mail className="text-indigo-600" /> E-posta Yönetimi
                    </h2>
                    {/* Tabs */}
                    <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 gap-0.5">
                        <button onClick={() => setActiveTab('inbox')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'inbox' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                            <Inbox size={14} /> Gelen Kutusu
                            {inboxMessages.filter(m => m.isUnread).length > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{inboxMessages.filter(m => m.isUnread).length}</span>
                            )}
                        </button>
                        <button onClick={() => setActiveTab('sent')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'sent' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                            <ArrowUpRight size={14} /> Gönderilen
                        </button>
                        <button onClick={() => setActiveTab('approval')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'approval' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                            <FileCheck size={14} /> Onay Bekleyenler
                            {approvalCount > 0 && (
                                <span className="bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{approvalCount}</span>
                            )}
                        </button>
                        <button onClick={() => setActiveTab('activity')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'activity' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                            <Activity size={14} /> Aktivite Logu
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => loadData()} disabled={loading} className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => { setIsComposing(true); setComposeTo(''); setComposeSubject(''); setComposeBody(''); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm text-sm">
                        <Send size={16} /> Yeni Mail
                    </button>
                </div>
            </div>

            {/* Search */}
            {(activeTab === 'inbox' || activeTab === 'sent') && (
                <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Mail ara..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex-1 flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 size={32} className="animate-spin text-indigo-600" />
                    </div>
                ) : (
                    <>
                        {/* INBOX TAB */}
                        {activeTab === 'inbox' && (
                            <div className="flex-1 flex">
                                {/* Message List */}
                                <div className={`${selectedMessage ? 'w-2/5' : 'w-full'} border-r border-slate-100 dark:border-slate-700 overflow-y-auto`}>
                                    {filteredInbox.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-600 dark:text-slate-400 p-8 text-center">
                                            <Inbox size={48} className="mb-3 opacity-30 text-slate-400 dark:text-slate-500" />
                                            {!api.gmail.isConnected() ? (
                                                <>
                                                    <p className="font-medium text-slate-700 dark:text-slate-300">Gmail bağlı değil veya mailler yüklenemedi</p>
                                                    <p className="text-sm mt-1 text-slate-500 dark:text-slate-400 max-w-sm">Ayarlar&apos;dan Google/Gmail bağlantısını kontrol edip aşağıdaki &quot;Yenile&quot; ile tekrar deneyin.</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="font-medium dark:text-slate-200">Gelen kutusu boş</p>
                                                    <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Gmail bağlantınızı kontrol edin</p>
                                                </>
                                            )}
                                            <button type="button" onClick={refreshInboxAndSent} disabled={syncingSent} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60">
                                                <RefreshCw size={16} className={syncingSent ? 'animate-spin' : ''} /> Yenile
                                            </button>
                                        </div>
                                    ) : filteredInbox.map(msg => (
                                        <div
                                            key={msg.id}
                                            onClick={() => setSelectedMessage(msg)}
                                            className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 cursor-pointer transition-colors hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 ${selectedMessage && 'id' in selectedMessage && selectedMessage.id === msg.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-indigo-600' : ''
                                                } ${msg.isUnread ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    {msg.isUnread && <div className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />}
                                                    <span className={`text-sm truncate ${msg.isUnread ? 'font-bold text-slate-900 dark:text-slate-100' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                                                        {msg.fromName || msg.fromEmail}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 ml-2">{formatDate(msg.date)}</span>
                                            </div>
                                            <div className={`text-xs truncate ${msg.isUnread ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>{msg.subject}</div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{msg.snippet}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Preview Panel */}
                                {selectedMessage && 'fromEmail' in selectedMessage && (
                                    <div className="flex-1 flex flex-col overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{(selectedMessage as InboxMessage).subject}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                        <span className="font-medium text-slate-700 dark:text-slate-300">{(selectedMessage as InboxMessage).fromName}</span>
                                                        {' '}&lt;{(selectedMessage as InboxMessage).fromEmail}&gt;
                                                    </p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{new Date((selectedMessage as InboxMessage).date).toLocaleString('tr-TR')}</p>
                                                </div>
                                                <button onClick={() => setSelectedMessage(null)} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"><X size={16} className="text-slate-400 dark:text-slate-500" /></button>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 overflow-y-auto">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{(selectedMessage as InboxMessage).snippet}</p>
                                        </div>
                                        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setIsComposing(true);
                                                    setComposeTo((selectedMessage as InboxMessage).fromEmail);
                                                    setComposeSubject(`Re: ${(selectedMessage as InboxMessage).subject}`);
                                                    setComposeBody('');
                                                }}
                                                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                                            >
                                                <MessageCircle size={14} /> Yanıtla
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SENT TAB */}
                        {activeTab === 'sent' && (
                            <div className="flex-1 flex flex-col">
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {lastSyncAt ? `Son senkron: ${lastSyncAt.toLocaleTimeString('tr-TR')}` : 'Henüz senkron yok'}
                                    </span>
                                    <button type="button" onClick={refreshInboxAndSent} disabled={syncingSent} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold hover:bg-indigo-200 disabled:opacity-60">
                                        <RefreshCw size={14} className={syncingSent ? 'animate-spin' : ''} /> Gönderilenleri yenile
                                    </button>
                                </div>
                                <div className="flex-1 flex min-h-0">
                                <div className={`${selectedMessage ? 'w-2/5' : 'w-full'} border-r border-slate-100 dark:border-slate-700 overflow-y-auto`}>
                                    {filteredSent.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-600 dark:text-slate-400 p-8 text-center">
                                            <ArrowUpRight size={48} className="mb-3 opacity-30 text-slate-400 dark:text-slate-500" />
                                            {!api.gmail.isConnected() ? (
                                                <>
                                                    <p className="font-medium text-slate-700 dark:text-slate-300">Gmail bağlı değil veya mailler yüklenemedi</p>
                                                    <p className="text-sm mt-1 text-slate-500 dark:text-slate-400 max-w-sm">Ayarlar&apos;dan Google/Gmail bağlantısını kontrol edip aşağıdaki &quot;Yenile&quot; ile tekrar deneyin.</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="font-medium dark:text-slate-200">Gönderilen mail bulunamadı</p>
                                                    <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Gmail bağlıysa &quot;Yenile&quot; ile son 30 günü çekin.</p>
                                                </>
                                            )}
                                            <button type="button" onClick={refreshInboxAndSent} disabled={syncingSent} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60">
                                                <RefreshCw size={16} className={syncingSent ? 'animate-spin' : ''} /> Yenile
                                            </button>
                                        </div>
                                    ) : filteredSent.map(msg => (
                                        <div
                                            key={msg.id}
                                            onClick={() => setSelectedMessage(msg)}
                                            className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 cursor-pointer transition-colors hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 ${selectedMessage && 'id' in selectedMessage && selectedMessage.id === msg.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-indigo-600' : ''
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                                                    Kime: {msg.toEmail}
                                                </span>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 ml-2">{formatDate(msg.date)}</span>
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{msg.subject}</div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{msg.snippet}</div>
                                        </div>
                                    ))}
                                </div>
                                {selectedMessage && 'toEmail' in selectedMessage && (
                                    <div className="flex-1 flex flex-col overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{(selectedMessage as SentMessage).subject}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kime: <span className="font-medium text-slate-700 dark:text-slate-300">{(selectedMessage as SentMessage).toEmail}</span></p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{new Date((selectedMessage as SentMessage).date).toLocaleString('tr-TR')}</p>
                                                </div>
                                                <button onClick={() => setSelectedMessage(null)} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"><X size={16} className="text-slate-400 dark:text-slate-500" /></button>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 overflow-y-auto">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{(selectedMessage as SentMessage).snippet}</p>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        )}

                        {/* APPROVAL TAB */}
                        {activeTab === 'approval' && (
                            <div className="flex-1 flex flex-col">
                                {agentConfig.autoSendFollowUp && (
                                    <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
                                        <Zap size={18} className="flex-shrink-0" />
                                        <span>Tam otomatik mod açık — Takip mailleri otopilot tarafından doğrudan gönderiliyor; bu sekmede daha az taslak görünebilir.</span>
                                    </div>
                                )}
                                <div className="flex-1 flex min-h-0">
                                {/* Left: Queue + Drafts */}
                                <div className={`${selectedDraft ? 'w-2/5' : 'w-full'} border-r border-slate-100 dark:border-slate-700 overflow-y-auto`}>
                                    {/* Drafts waiting for approval */}
                                    {leadsWithDrafts.length > 0 && (
                                        <div className="border-b border-slate-200 dark:border-slate-700">
                                            <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center justify-between gap-2">
                                                <span className="flex items-center gap-1.5"><BrainCircuit size={12} /> AI Taslakları</span>
                                                <div className="flex items-center gap-1">
                                                    <button type="button" onClick={clearSelectedDrafts} disabled={selectedDraftIds.size === 0} className="px-2 py-1 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800 disabled:opacity-40 disabled:cursor-not-allowed">Seçilenleri kaldır</button>
                                                    <button type="button" onClick={clearAllDrafts} className="px-2 py-1 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500">Tümünü temizle</button>
                                                </div>
                                            </div>
                                            {leadsWithDrafts.map(lead => (
                                                <div key={lead.id}
                                                    className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 flex items-start gap-2 ${selectedDraft?.id === lead.id ? 'bg-amber-50 dark:bg-amber-900/30 border-l-4 border-l-amber-500' : ''}`}
                                                >
                                                    <input type="checkbox" checked={selectedDraftIds.has(lead.id)} onChange={() => toggleDraftSelection(lead.id)} onClick={e => e.stopPropagation()} className="mt-1 rounded border-slate-300 dark:border-slate-600 text-amber-600 focus:ring-amber-500" />
                                                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { setSelectedDraft(lead); setDraftSubject(lead.draftResponse?.subject || ''); setDraftBody(lead.draftResponse?.body || ''); }}>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{lead.firma_adi}</span>
                                                            <span className="text-[10px] bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold flex-shrink-0">Taslak</span>
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{lead.email}</div>
                                                        <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{lead.draftResponse?.subject}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Outreach Queue */}
                                    <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <Clock size={12} /> Outreach Kuyruğu ({queue.length})
                                    </div>
                                    {queue.length === 0 && leadsWithDrafts.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-slate-400 dark:text-slate-500">
                                            <FileCheck size={48} className="mb-3 opacity-30" />
                                            <p className="font-medium dark:text-slate-300">Tüm işler tamam</p>
                                            <p className="text-xs mt-1 dark:text-slate-400">Bekleyen taslak veya outreach yok</p>
                                        </div>
                                    ) : queue.map(item => (
                                        <div key={item.id}
                                            className="px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.lead.firma_adi}</span>
                                                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded-full font-bold">Skor: {item.score}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{item.lead.email}</div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{item.reason}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right: Draft Editor */}
                                {selectedDraft && (
                                    <div className="flex-1 flex flex-col overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{selectedDraft.firma_adi}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Kime: {selectedDraft.email}</p>
                                                </div>
                                                <button onClick={() => setSelectedDraft(null)} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"><X size={16} className="text-slate-400 dark:text-slate-500" /></button>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">Konu</label>
                                                <input value={draftSubject} onChange={e => setDraftSubject(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">İçerik</label>
                                                <textarea value={draftBody} onChange={e => setDraftBody(e.target.value)} rows={12} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none outline-none focus:ring-2 focus:ring-indigo-500" />
                                            </div>
                                        </div>
                                        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex gap-2">
                                            <button onClick={handleApproveSend} disabled={isSendingDraft} className="flex items-center gap-1.5 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-60">
                                                {isSendingDraft ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Onayla ve Gönder
                                            </button>
                                            <button onClick={() => setSelectedDraft(null)} className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium">İptal</button>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        )}

                        {/* ACTIVITY LOG TAB */}
                        {activeTab === 'activity' && (
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">Son Aktiviteler</h3>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{activityLogs.length} Kayıt</span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-0">
                                    {activityLogs.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4"><Activity size={32} /></div>
                                            <p className="dark:text-slate-400">Henüz bir aktivite kaydı yok.</p>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left">
                                            <thead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50 sticky top-0">
                                                <tr>
                                                    <th className="px-6 py-3">Tarih</th>
                                                    <th className="px-6 py-3">Tip</th>
                                                    <th className="px-6 py-3">Yön</th>
                                                    <th className="px-6 py-3">Detay</th>
                                                    <th className="px-6 py-3">Durum</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                                                {activityLogs.map((log) => (
                                                    <tr key={log.id} className="hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                                        <td className="px-6 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-xs">
                                                            {log.date} <span className="text-slate-300 dark:text-slate-600">|</span> {log.time}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${log.type === 'email' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                                                {log.type === 'email' ? <Mail size={12} /> : <MessageCircle size={12} />}
                                                                {log.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {log.direction === 'inbound' ? (
                                                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-xs font-bold"><ArrowRight size={14} className="rotate-180" /> Gelen</span>
                                                            ) : (
                                                                <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 text-xs font-bold"><ArrowRight size={14} /> Giden</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300 max-w-md truncate" title={log.summary}>
                                                            {log.summary}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">{log.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Compose Modal */}
            {isComposing && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-6 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-fade-in border border-slate-200 dark:border-slate-700" style={{ maxHeight: '70vh' }}>
                        <div className="px-4 py-3 bg-slate-900 text-white flex justify-between items-center rounded-t-xl">
                            <span className="font-bold text-sm flex items-center gap-2"><Send size={14} /> Yeni E-posta</span>
                            <button onClick={() => setIsComposing(false)} className="p-1 hover:bg-white/10 rounded"><X size={16} /></button>
                        </div>
                        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Kime</label>
                                <input value={composeTo} onChange={e => setComposeTo(e.target.value)} placeholder="ornek@firma.com" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Konu</label>
                                <input value={composeSubject} onChange={e => setComposeSubject(e.target.value)} placeholder="Mail konusu" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">İçerik</label>
                                <textarea value={composeBody} onChange={e => setComposeBody(e.target.value)} rows={8} placeholder="Mesajınız..." className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
                            <button onClick={() => setIsComposing(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium">İptal</button>
                            <button onClick={handleComposeSend} disabled={isSending || !composeTo || !composeSubject} className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-60">
                                {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MailAutomation;
