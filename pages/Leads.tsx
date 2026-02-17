
import React, { useState, useEffect } from 'react';
import {
    Search, Filter, Plus, FileSpreadsheet, MoreVertical, Mail, Phone, Edit,
    X, MessageCircle, ArrowRight, Clock, CheckCheck, Eye, Save, Loader2, FileText, Globe, Sparkles, AlertCircle,
    StickyNote, Calendar, CheckSquare, ChevronRight, User, MapPin, Building2, LayoutGrid, List, GripVertical, BrainCircuit, Navigation, Map,
    TrendingUp, ShieldAlert, Award, Target, PenTool, GripHorizontal, Ghost, Shield, Zap, SearchCheck, Flame, Image as ImageIcon, Instagram, Copy, Activity, Trash2
} from 'lucide-react';
import { api } from '../services/api';
import { verificationService } from '../services/verificationService';
import { STATUS_COLORS, SECTORS, DISTRICTS, DISTRICT_COORDINATES } from '../constants';
import { Lead, Task, LeadStatus } from '../types';
import ProposalModal from '../components/ProposalModal';
import LeadDiscoveryModal from '../components/LeadDiscoveryModal';
import ResponseAnalyzerModal from '../components/ResponseAnalyzerModal';
import StrategyModal from '../components/StrategyModal';
import ContentStudio from '../components/ContentStudio';
import SmartAdvisor from '../components/SmartAdvisor';
import SmartScoreModal from '../components/SmartScoreModal';
import Confetti from '../components/Confetti';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { TableSkeleton } from '../components/Skeleton';
import { toast } from 'sonner';

const calculateSmartScore = (lead: Partial<Lead>): number => {
    let score = 1;
    if (lead.email) score += 2;
    if (lead.telefon) score += 1;
    if (lead.websitesi_var_mi === 'Hayır') score += 1;
    if (['Sağlık', 'Emlak'].includes(lead.sektor || '')) score += 1;
    const bigCorpKeywords = ['Holding', 'Group', 'Global', 'A.Ş.', 'Anonim', 'Zincir'];
    const name = lead.firma_adi || '';
    if (bigCorpKeywords.some(k => name.includes(k))) {
        score -= 1;
    }
    return Math.max(1, Math.min(5, score));
};

const getSonTemasLabel = (lead: Lead): { text: string; teklifUygun: boolean | null } => {
    const d = lead.son_kontakt_tarihi;
    if (!d) return { text: 'Henüz temas yok', teklifUygun: null };
    const then = new Date(d);
    if (Number.isNaN(then.getTime())) return { text: '', teklifUygun: null };
    const days = Math.floor((Date.now() - then.getTime()) / (24 * 60 * 60 * 1000));
    if (days === 0) return { text: 'Bugün temas', teklifUygun: false };
    if (days === 1) return { text: '1 gün önce', teklifUygun: false };
    const uygun = (lead.lead_durumu === 'takipte' || lead.lead_durumu === 'teklif_gonderildi') && days >= 2;
    return { text: `${days} gün önce`, teklifUygun: (lead.lead_durumu === 'takipte' || lead.lead_durumu === 'teklif_gonderildi') ? uygun : null };
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};

const KANBAN_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'aktif', label: 'Yeni / Aktif', color: 'border-emerald-200 bg-emerald-50' },
    { id: 'takipte', label: 'Takipte', color: 'border-blue-200 bg-blue-50' },
    { id: 'teklif_gonderildi', label: 'Teklif Aşamasında', color: 'border-purple-200 bg-purple-50' },
    { id: 'onay_bekliyor', label: 'Yanıt/Onay Bekliyor', color: 'border-indigo-200 bg-indigo-50' },
    { id: 'olumlu', label: 'Kazanıldı', color: 'border-green-200 bg-green-50' },
    { id: 'olumsuz', label: 'Kaybedildi', color: 'border-red-200 bg-red-50' },
    { id: 'beklemede', label: 'Beklemeye Alındı', color: 'border-amber-200 bg-amber-50' }
];

const Leads: React.FC = () => {
    const [viewMode, setViewMode] = useState<'table' | 'board' | 'field'>('table');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'showcase' | 'notes' | 'tasks' | 'studio'>('overview');
    const [noteInput, setNoteInput] = useState('');
    const [isAnalyzingCompetitors, setIsAnalyzingCompetitors] = useState(false);
    const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
    const [isAnalyzingSocial, setIsAnalyzingSocial] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
    const [isAnalyzerModalOpen, setIsAnalyzerModalOpen] = useState(false);
    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
    const [siteCheckLeadId, setSiteCheckLeadId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<LeadStatus | ''>('');
    const [selectedOnayIds, setSelectedOnayIds] = useState<Set<string>>(new Set());
    const [isBulkSending, setIsBulkSending] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    const [proposalLead, setProposalLead] = useState<Lead | null>(null);
    const [isEnriching, setIsEnriching] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [newLeadData, setNewLeadData] = useState<Partial<Lead>>({
        firma_adi: '', sektor: 'Diğer', ilce: 'Kadıköy', lead_durumu: 'aktif', lead_skoru: 1
    });
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [leadsData, tasksData] = await Promise.all([
                api.leads.getAll(),
                api.tasks.getAll()
            ]);
            setLeads(leadsData);
            setTasks(tasksData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteLead = async (id: string, firmaAdi: string) => {
        if (!window.confirm(`${firmaAdi} lead'ini silmek istediğinize emin misiniz?`)) return;
        try {
            await api.leads.delete(id);
            setLeads(prev => prev.filter(l => l.id !== id));
            setSelectedLeadId(null);
            toast.success('Lead silindi');
        } catch (e) {
            toast.error('Lead silinirken hata oluştu');
        }
    };

    const handleSiteCheck = async (lead: Lead) => {
        if (!lead.email?.includes('@')) {
            toast.error('Lead için e-posta yok; site kontrolü yapılamaz.');
            return;
        }
        setSiteCheckLeadId(lead.id);
        try {
            const result = await verificationService.checkLeadWebsiteByEmail(lead.email);
            const label = result === 'Evet' ? 'Evet' : result === 'Hayır' ? 'Hayır' : 'bilinmiyor';
            const updated = {
                ...lead,
                websitesi_var_mi: result === 'unknown' ? lead.websitesi_var_mi : result,
                notlar: (lead.notlar || '') + `\n[Site kontrolü: ${new Date().toLocaleDateString('tr-TR')}] ${label}`
            };
            await api.leads.update(updated);
            setLeads(prev => prev.map(l => l.id === lead.id ? updated : l));
            toast.success(`Site kontrolü: ${label}`);
        } catch (e) {
            toast.error('Site kontrolü yapılamadı');
        } finally {
            setSiteCheckLeadId(null);
        }
    };

    const handleBulkArchive = async () => {
        if (selectedOnayIds.size === 0) {
            toast.error('Lütfen en az bir lead seçin.');
            return;
        }
        try {
            for (const id of selectedOnayIds) {
                const lead = leads.find(l => l.id === id);
                if (lead) await api.leads.update({ ...lead, lead_durumu: 'beklemede' });
            }
            setLeads(prev => prev.map(l => selectedOnayIds.has(l.id) ? { ...l, lead_durumu: 'beklemede' as LeadStatus } : l));
            setSelectedOnayIds(new Set());
            toast.success(`${selectedOnayIds.size} lead beklemede olarak güncellendi.`);
        } catch (e) {
            toast.error('Toplu güncelleme başarısız.');
        }
    };

    const handleBulkSendMail = async () => {
        const toSend = leads.filter(l => selectedOnayIds.has(l.id) && l.draftResponse && l.email);
        if (toSend.length === 0) {
            toast.error('Seçilenlerde taslak veya e-posta yok.');
            return;
        }
        setIsBulkSending(true);
        try {
            let sent = 0;
            for (const lead of toSend) {
                const d = lead.draftResponse!;
                await api.gmail.send(lead.email!, d.subject, d.body);
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'takipte',
                    son_kontakt_tarihi: new Date().toISOString().slice(0, 10),
                    draftResponse: undefined
                });
                sent++;
            }
            setLeads(await api.leads.getAll());
            setSelectedOnayIds(new Set());
            toast.success(`${sent} mail gönderildi.`);
        } catch (e) {
            toast.error('Mail gönderilirken hata oluştu.');
        } finally {
            setIsBulkSending(false);
        }
    };

    const toggleOnaySelect = (id: string) => {
        setSelectedOnayIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAllOnay = () => {
        if (selectedStatus !== 'onay_bekliyor') return;
        const ids = new Set(filteredLeads.map(l => l.id));
        setSelectedOnayIds(ids);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterText, selectedSector, viewMode]);

    useEffect(() => {
        const score = calculateSmartScore(newLeadData);
        if (score !== newLeadData.lead_skoru) {
            setNewLeadData(prev => ({ ...prev, lead_skoru: score }));
        }
    }, [newLeadData.email, newLeadData.telefon, newLeadData.sektor, newLeadData.websitesi_var_mi, newLeadData.firma_adi]);

    const handleFieldModeToggle = () => {
        if (viewMode === 'field') {
            setViewMode('table');
        } else {
            setViewMode('field');
            getUserLocation();
        }
    };

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            alert("Tarayıcınız konum özelliğini desteklemiyor.");
            return;
        }
        setIsGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setIsGettingLocation(false);
            },
            (error) => {
                console.error("Location error", error);
                setIsGettingLocation(false);
                setUserLocation({ lat: 41.0082, lng: 28.9784 });
            }
        );
    };

    const filteredLeads = leads.filter(lead => {
        const matchesText = lead.firma_adi.toLowerCase().includes(filterText.toLowerCase()) ||
            lead.yetkili_adi?.toLowerCase().includes(filterText.toLowerCase());
        const matchesSector = selectedSector ? lead.sektor === selectedSector : true;
        const matchesStatus = selectedStatus ? lead.lead_durumu === selectedStatus : true;
        return matchesText && matchesSector && matchesStatus;
    });

    const getSortedLeadsByDistance = () => {
        if (!userLocation) return filteredLeads;

        return [...filteredLeads].sort((a, b) => {
            const coordsA = DISTRICT_COORDINATES[a.ilce] || DISTRICT_COORDINATES['İstanbul'];
            const coordsB = DISTRICT_COORDINATES[b.ilce] || DISTRICT_COORDINATES['İstanbul'];

            const distA = calculateDistance(userLocation.lat, userLocation.lng, coordsA.lat, coordsA.lng);
            const distB = calculateDistance(userLocation.lat, userLocation.lng, coordsB.lat, coordsB.lng);

            return distA - distB;
        });
    };

    const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
    const leadsToPaginate = viewMode === 'field' ? getSortedLeadsByDistance() : filteredLeads;
    const paginatedLeads = (viewMode === 'table' || viewMode === 'field')
        ? leadsToPaginate.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
        : filteredLeads;

    const handleCheckIn = async (lead: Lead) => {
        if (confirm(`${lead.firma_adi} için ziyaret kaydı oluşturulsun mu?`)) {
            await api.leads.logInteraction(lead.id, 'phone', 'Saha Ziyareti (Check-in)');
            await api.dashboard.logAction('Saha Ziyareti', `${lead.firma_adi}`, 'success');
            alert('Ziyaret kaydedildi!');
            loadData();
        }
    };

    const openDirections = (lead: Lead) => {
        const query = encodeURIComponent(`${lead.firma_adi} ${lead.ilce} İstanbul`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
    };

    const handleCompetitorAnalysis = async (lead: Lead) => {
        setIsAnalyzingCompetitors(true);
        try {
            const result = await api.competitors.analyze(lead);
            const updatedLead = { ...lead, competitorAnalysis: result };
            await api.leads.update(updatedLead);
            setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
            await api.dashboard.logAction('Rakip Analizi', `${lead.firma_adi} için tamamlandı`, 'success');
        } catch (error) {
            console.error("Competitor analysis failed", error);
            alert("Rakip analizi yapılamadı.");
        } finally {
            setIsAnalyzingCompetitors(false);
        }
    };

    const handleGenerateHeroImage = async (lead: Lead) => {
        setIsGeneratingVisual(true);
        try {
            const imageBase64 = await api.visuals.generateHeroImage(lead);
            const updatedLead = { ...lead, generatedHeroImage: imageBase64 };
            await api.leads.update(updatedLead);
            setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
            await api.dashboard.logAction('Görsel Üretildi', `${lead.firma_adi} için site tasarımı`, 'success');
        } catch (error) {
            console.error(error);
            alert("Görsel üretilemedi. API kotanızı kontrol edin.");
        } finally {
            setIsGeneratingVisual(false);
        }
    };

    const handleInstagramAnalysis = async (lead: Lead) => {
        setIsAnalyzingSocial(true);
        try {
            const result = await api.social.analyzeInstagram(lead);
            const updatedLead = { ...lead, instagramProfile: result };
            await api.leads.update(updatedLead);
            setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
            await api.dashboard.logAction('Instagram Analizi', `${lead.firma_adi}`, 'success');
        } catch (error) {
            console.error(error);
            alert("Instagram analizi yapılamadı.");
        } finally {
            setIsAnalyzingSocial(false);
        }
    };

    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        setDraggedLeadId(leadId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
        e.preventDefault();
        setDragOverColumn(status);
    };

    const handleDrop = async (e: React.DragEvent, status: LeadStatus) => {
        e.preventDefault();
        setDragOverColumn(null);

        if (!draggedLeadId) return;

        const lead = leads.find(l => l.id === draggedLeadId);
        if (lead && lead.lead_durumu !== status) {
            const updatedLead = { ...lead, lead_durumu: status };
            setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));

            try {
                await api.leads.update(updatedLead);
                if (status === 'olumlu') {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }
            } catch (error) {
                console.error("Failed to update lead status", error);
                setLeads(prev => prev.map(l => l.id === lead.id ? lead : l));
            }
        }
        setDraggedLeadId(null);
    };



    const handleExportCSV = () => {
        if (filteredLeads.length === 0) {
            toast.error("Dışa aktarılacak lead bulunamadı.");
            return;
        }

        const headers = ["Firma Adı", "Sektör", "İlçe", "Durum", "Yetkili", "E-posta", "Telefon", "Skor"];
        const rows = filteredLeads.map(l => [
            l.firma_adi,
            l.sektor,
            l.ilce,
            l.lead_durumu,
            l.yetkili_adi || "",
            l.email || "",
            l.telefon || "",
            l.lead_skoru
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `istanbul_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`${filteredLeads.length} lead başarıyla dışa aktarıldı.`);
    };



    const activeLead = leads.find(l => l.id === selectedLeadId);

    return (
        <div className="flex h-[calc(100vh-100px)] animate-fade-in relative">
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${selectedLeadId ? 'mr-96 hidden lg:flex' : ''}`}>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Firma, yetkili veya sektör ara..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus((e.target.value || '') as LeadStatus | ''); setSelectedOnayIds(new Set()); }}
                            className="px-3 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">Tüm durumlar</option>
                            {KANBAN_COLUMNS.map(col => (
                                <option key={col.id} value={col.id}>{col.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex gap-1 backdrop-blur-sm border border-white">
                            <button onClick={() => setViewMode('table')} className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`} title="Tablo Görünümü"><List size={18} /></button>
                            <button onClick={() => setViewMode('board')} className={`p-2 rounded-xl transition-all ${viewMode === 'board' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`} title="Kanban Görünümü"><LayoutGrid size={18} /></button>
                            <button onClick={handleFieldModeToggle} className={`p-2 rounded-xl transition-all ${viewMode === 'field' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`} title="Saha/Mesafe Görünümü"><Navigation size={18} /></button>
                        </div>
                        <button
                            onClick={handleExportCSV}
                            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center gap-2 hover:border-indigo-200 dark:hover:border-indigo-600"
                            title="CSV Olarak Dışa Aktar"
                        >
                            <FileSpreadsheet size={18} />
                            <span className="hidden md:inline font-bold text-xs uppercase text-slate-400 dark:text-slate-500">Dışa Aktar</span>
                        </button>
                        <button
                            onClick={() => setIsDiscoveryModalOpen(true)}
                            className="premium-button flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 px-5 text-sm"
                        >
                            <Sparkles size={16} /> Lead Keşfet
                        </button>
                    </div>
                </div>

                {/* Content Views */}
                <div className="flex-1 overflow-hidden glass-card rounded-3xl border-indigo-500/5 relative flex flex-col shadow-2xl bg-white/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : filteredLeads.length === 0 ? (
                        <EmptyState
                            icon={Search}
                            title="Bulutlarda Hiç Lead Yok"
                            description="Arama kriterlerinize uygun kayıt bulunamadı. Yeni bir bölge keşfetmeye veya dışardan veri almaya ne dersiniz?"
                            action={{ label: 'Otomatik Lead Keşfet', onClick: () => setIsDiscoveryModalOpen(true) }}
                            secondaryAction={{ label: 'CSV ile Yükle', onClick: () => alert('CSV yükleme özelliği yakında!') }}
                        />
                    ) : viewMode === 'field' ? (
                        // FIELD VIEW
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
                            {isGettingLocation && (
                                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 flex items-center justify-center gap-3 animate-pulse">
                                    <Loader2 className="animate-spin" size={20} /> <span className="text-sm font-black uppercase tracking-widest">Mevcut Konumun Analiz Ediliyor...</span>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedLeads.map(lead => (
                                    <div key={lead.id} className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all bg-white/80 dark:bg-slate-800/80 border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:-translate-y-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-black text-slate-800 dark:text-slate-200 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase text-sm">{lead.firma_adi}</h4>
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">
                                                    <MapPin size={10} className="text-indigo-400" /> {lead.ilce}
                                                </div>
                                            </div>
                                            <span className={`px-2.5 py-1 text-[9px] uppercase font-black rounded-lg border shadow-sm ${STATUS_COLORS[lead.lead_durumu]}`}>
                                                {lead.lead_durumu.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        {lead.son_kontakt_tarihi && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                                                <Clock size={10} /> Son temas: {getSonTemasLabel(lead).text}
                                                {getSonTemasLabel(lead).teklifUygun === true && <span className="text-emerald-600 font-semibold">• Teklif için uygun</span>}
                                                {getSonTemasLabel(lead).teklifUygun === false && <span className="text-amber-600">• 2 gün dolmadı</span>}
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-3 mt-6">
                                            <button
                                                onClick={() => handleCheckIn(lead)}
                                                className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors border border-emerald-100"
                                            >
                                                <CheckSquare size={14} /> Check-in
                                            </button>
                                            <button
                                                onClick={() => openDirections(lead)}
                                                className="flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors border border-indigo-100"
                                            >
                                                <Navigation size={14} /> Yol Tarifi
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setSelectedLeadId(lead.id)}
                                            className="absolute top-0 left-0 w-full h-4/5 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : viewMode === 'table' ? (
                        // TABLE VIEW
                        <div className="flex-1 overflow-auto custom-scrollbar relative z-10 p-4">
                            {selectedStatus === 'onay_bekliyor' && filteredLeads.length > 0 && (
                                <div className="flex items-center gap-3 mb-3 py-2 px-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <span className="text-xs font-bold text-indigo-700">{selectedOnayIds.size} seçili</span>
                                    <button onClick={selectAllOnay} className="text-xs font-medium text-indigo-600 hover:underline">Tümünü seç</button>
                                    <button onClick={handleBulkSendMail} disabled={isBulkSending || selectedOnayIds.size === 0} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1">
                                        {isBulkSending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />} Seçilenleri mail gönder
                                    </button>
                                    <button onClick={handleBulkArchive} disabled={selectedOnayIds.size === 0} className="px-3 py-1.5 bg-slate-600 text-white rounded-lg text-xs font-bold hover:bg-slate-700 disabled:opacity-50">Seçilenleri arşivle</button>
                                </div>
                            )}
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] sticky top-0 bg-[#f8fafc]/80 dark:bg-slate-900/90 backdrop-blur-md z-20">
                                    <tr>
                                        {selectedStatus === 'onay_bekliyor' && <th className="px-2 py-4 w-10"><input type="checkbox" checked={filteredLeads.length > 0 && filteredLeads.every(l => selectedOnayIds.has(l.id))} onChange={(e) => e.target.checked ? selectAllOnay() : setSelectedOnayIds(new Set())} className="rounded border-slate-300" /></th>}
                                        <th className="px-6 py-4">Firma Detayı</th>
                                        <th className="px-6 py-4">İletişim</th>
                                        <th className="px-6 py-4">Bölge & Sektör</th>
                                        <th className="px-6 py-4">Durum</th>
                                        <th className="px-6 py-4">AI Skor</th>
                                        <th className="px-6 py-4 text-right">Aksiyon</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {paginatedLeads.map((lead) => (
                                        <tr
                                            key={lead.id}
                                            onClick={() => setSelectedLeadId(lead.id)}
                                            className={`group hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-md rounded-2xl ${selectedLeadId === lead.id ? 'ring-2 ring-indigo-500 bg-white dark:bg-slate-800' : ''}`}
                                        >
                                            {selectedStatus === 'onay_bekliyor' && (
                                                <td className="px-2 py-5 border-y border-l border-slate-50 rounded-l-2xl" onClick={e => e.stopPropagation()}>
                                                    <input type="checkbox" checked={selectedOnayIds.has(lead.id)} onChange={() => toggleOnaySelect(lead.id)} className="rounded border-slate-300" />
                                                </td>
                                            )}
                                            <td className={`px-6 py-5 border-y border-l border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50 transition-colors ${selectedStatus !== 'onay_bekliyor' ? 'rounded-l-2xl' : ''}`}>
                                                <div className="font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lead.firma_adi}</div>
                                                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">{lead.yetkili_adi || 'Yetkili Belirtilmemiş'}</div>
                                            </td>
                                            <td className="px-6 py-5 border-y border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50 transition-colors">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                        <Mail size={12} className="text-slate-400 dark:text-slate-500" />
                                                        <span className="text-xs font-medium">{lead.email || '-'}</span>
                                                        {lead.email && lead.emailStatus === 'valid' && <span title="Doğrulanmış"><CheckCheck size={12} className="text-emerald-500" /></span>}
                                                        {lead.email && lead.emailStatus === 'invalid' && <span title="Geçersiz"><X size={12} className="text-red-500" /></span>}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                        <Phone size={12} className="text-slate-400 dark:text-slate-500" />
                                                        <span className="text-xs font-medium">{lead.telefon || '-'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-y border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{lead.sektor}</span>
                                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                                    <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{lead.ilce}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-y border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${STATUS_COLORS[lead.lead_durumu]}`}>
                                                        {lead.lead_durumu.replace(/_/g, ' ')}
                                                    </span>
                                                    {lead.son_kontakt_tarihi && (
                                                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                                            Son temas: {getSonTemasLabel(lead).text}
                                                            {getSonTemasLabel(lead).teklifUygun === true && <span className="text-emerald-600 font-medium ml-1">• Teklif uygun</span>}
                                                            {getSonTemasLabel(lead).teklifUygun === false && <span className="text-amber-600 ml-1">• 2 gün dolmadı</span>}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-y border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50">
                                                <div className="flex gap-1.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`w-2.5 h-1 rounded-full transition-all ${i < lead.lead_skoru ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-200 dark:bg-slate-600'}`} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-y border-r border-slate-50 dark:border-slate-700/50 group-hover:border-indigo-50 dark:group-hover:border-indigo-900/50 rounded-r-2xl text-right">
                                                <div className="p-2 inline-flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-700/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        // BOARD VIEW
                        <div className="flex p-6 gap-6 h-full overflow-x-auto bg-slate-100/30 dark:bg-slate-900/30 custom-scrollbar relative z-10">
                            {KANBAN_COLUMNS.map(col => (
                                <div
                                    key={col.id}
                                    className={`min-w-[320px] w-[320px] flex flex-col rounded-3xl border transition-all duration-300 ${dragOverColumn === col.id ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-indigo-400 ring-4 ring-indigo-500/10' : 'bg-white/40 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50'
                                        }`}
                                    onDragOver={(e) => handleDragOver(e, col.id)}
                                    onDrop={(e) => handleDrop(e, col.id)}
                                >
                                    <div className="p-5 flex justify-between items-center group/header">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover/header:text-indigo-600 dark:group-hover/header:text-indigo-400 transition-colors">{col.label}</h3>
                                        </div>
                                        <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 border border-indigo-100 shadow-sm">{filteredLeads.filter(l => l.lead_durumu === col.id).length}</span>
                                    </div>
                                    <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                                        {filteredLeads.filter(l => l.lead_durumu === col.id).map(lead => (
                                            <div
                                                key={lead.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                                onClick={() => setSelectedLeadId(lead.id)}
                                                className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border shadow-sm hover:shadow-xl cursor-pointer transition-all active:scale-95 group relative border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-600 ${draggedLeadId === lead.id ? 'opacity-50 ring-2 ring-indigo-400 rotate-2' : ''
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="font-black text-slate-800 dark:text-slate-200 text-sm tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">{lead.firma_adi}</span>
                                                    {lead.lead_skoru >= 4 && <div className="p-1 bg-orange-50 rounded-lg"><Flame size={14} className="text-orange-500 animate-bounce" /></div>}
                                                </div>
                                                <div className="flex items-center justify-between mt-4 pb-1">
                                                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                        <MapPin size={10} className="text-indigo-400" /> {lead.ilce}
                                                    </div>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(lead.lead_skoru)].map((_, i) => (
                                                            <div key={i} className="w-1 h-1 rounded-full bg-indigo-500" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-200">
                                                    <GripVertical size={16} />
                                                </div>
                                            </div>
                                        ))}
                                        {filteredLeads.filter(l => l.lead_durumu === col.id).length === 0 && (
                                            <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest italic bg-slate-50/50 dark:bg-slate-800/50">
                                                Giriş Yok
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination Footer */}
                    {(viewMode === 'table' || viewMode === 'field') && !isLoading && filteredLeads.length > 0 && (
                        <div className="border-t border-slate-100 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 relative z-20">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                totalItems={filteredLeads.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Panel */}
            {selectedLeadId && activeLead && (
                <div className="fixed inset-y-0 right-0 w-full lg:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl transform transition-transform duration-300 z-20 flex flex-col">

                    {/* Header */}
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex justify-between items-start mb-4">
                            <button onClick={() => setSelectedLeadId(null)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 lg:hidden">
                                <ArrowRight size={20} />
                            </button>
                            <div className="flex gap-2 ml-auto">
                                <button onClick={() => { setProposalLead(activeLead); setIsProposalModalOpen(true); }} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40" title="Teklif Hazırla">
                                    <FileText size={18} />
                                </button>
                                <button onClick={() => handleSiteCheck(activeLead)} disabled={siteCheckLeadId === activeLead.id || !activeLead.email} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" title="Site kontrolü yenile">
                                    {siteCheckLeadId === activeLead.id ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
                                </button>
                                <button onClick={() => setIsAnalyzerModalOpen(true)} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/40" title="Yanıt Analizi">
                                    <MessageCircle size={18} />
                                </button>
                                <button onClick={() => setIsStrategyModalOpen(true)} className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg shadow-indigo-200 transition-all" title="Strateji Planla">
                                    <BrainCircuit size={18} />
                                </button>
                                <button onClick={() => handleDeleteLead(activeLead.id, activeLead.firma_adi)} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/40 hover:border-rose-200 transition-colors" title="Lead Sil">
                                    <Trash2 size={18} />
                                </button>
                                <button onClick={() => setSelectedLeadId(null)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 hidden lg:block">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{activeLead.firma_adi}</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <Building2 size={14} /> {activeLead.sektor}
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <MapPin size={14} /> {activeLead.ilce}
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() => setIsScoreModalOpen(true)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded">
                                        <Activity size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Dijital Skor</div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                            {activeLead.scoreDetails ? `Detaylı Puan: ${activeLead.scoreDetails.finalLeadScore}/5` : 'Analiz edilmedi'}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                            </button>
                        </div>

                        <SmartAdvisor lead={activeLead} />
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 overflow-x-auto">
                        <button onClick={() => setActiveTab('overview')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Özet</button>
                        <button onClick={() => setActiveTab('audit')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${activeTab === 'audit' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Dijital Karne</button>
                        <button onClick={() => setActiveTab('showcase')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${activeTab === 'showcase' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Vitrin</button>
                        <button onClick={() => setActiveTab('notes')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${activeTab === 'notes' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Notlar</button>
                        <button onClick={() => setActiveTab('studio')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${activeTab === 'studio' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Stüdyo</button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">İletişim</h4>
                                    <div className="flex items-center gap-3 text-sm"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><User size={14} /></div><span className="font-medium">{activeLead.yetkili_adi || 'Yetkili ismi yok'}</span></div>
                                    <div className="flex items-center gap-3 text-sm"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Phone size={14} /></div>{activeLead.telefon ? <span className="font-mono text-slate-700">{activeLead.telefon}</span> : <span className="text-red-400 italic text-xs">Telefon eksik</span>}</div>
                                    <div className="flex items-center gap-3 text-sm"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Mail size={14} /></div>{activeLead.email ? <span className="text-slate-700">{activeLead.email}</span> : <span className="text-red-400 italic text-xs">Email eksik</span>}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Durum Değiştir</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {KANBAN_COLUMNS.map(col => (
                                            <button key={col.id} onClick={async () => { const updated = { ...activeLead, lead_durumu: col.id }; await api.leads.update(updated); setLeads(leads.map(l => l.id === activeLead.id ? updated : l)); }} className={`px-2 py-1.5 rounded text-xs font-medium text-left transition-colors ${activeLead.lead_durumu === col.id ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{col.label}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'audit' && (
                            <div className="space-y-6">
                                {activeLead.competitorAnalysis ? (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm"><h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2"><BrainCircuit size={18} /> AI Strateji Özeti</h4><p className="text-sm text-slate-700 leading-relaxed italic">"{activeLead.competitorAnalysis.summary}"</p></div>
                                        <button onClick={() => handleCompetitorAnalysis(activeLead)} disabled={isAnalyzingCompetitors} className="w-full py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors">{isAnalyzingCompetitors ? 'Güncelleniyor...' : 'Analizi Yenile'}</button>
                                    </div>
                                ) : (
                                    <EmptyState icon={SearchCheck} title="Henüz Analiz Yok" description="Rakipleri analiz ederek satış şansınızı artırın." action={{ label: isAnalyzingCompetitors ? 'Analiz Ediliyor...' : 'Rakip Analizi Başlat', onClick: () => handleCompetitorAnalysis(activeLead) }} />
                                )}
                            </div>
                        )}

                        {activeTab === 'showcase' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={18} className="text-indigo-600" /> Web Tasarım Önizlemesi</h4>
                                    {activeLead.generatedHeroImage ? (
                                        <div className="group relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
                                            <img src={activeLead.generatedHeroImage} alt="Site Design" className="w-full h-auto object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button onClick={() => window.open(activeLead.generatedHeroImage, '_blank')} className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100">Büyüt</button>
                                                <button onClick={() => handleGenerateHeroImage(activeLead)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">Yeniden Üret</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50">
                                            <ImageIcon size={32} className="text-slate-300 mb-3" />
                                            <button onClick={() => handleGenerateHeroImage(activeLead)} disabled={isGeneratingVisual} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">{isGeneratingVisual ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} {isGeneratingVisual ? 'Tasarlanıyor...' : 'Taslak Oluştur'}</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="flex flex-col h-full">
                                {(activeLead.notlar || '').includes('[Mobil:') && (
                                    <p className="text-[10px] text-slate-500 mb-2" title="CORS nedeniyle birçok sitede mobil uyum tespit edilemiyor.">
                                        [Mobil] notu: Tarayıcı güvenliği nedeniyle çoğu sitede sonuç &quot;bilinmiyor&quot; olabilir.
                                    </p>
                                )}
                                <textarea value={activeLead.notlar} readOnly className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-600 mb-4 resize-none focus:outline-none" placeholder="Henüz not yok." />
                                <div className="flex gap-2">
                                    <input type="text" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" placeholder="Not ekle..." />
                                    <button onClick={async () => { if (!noteInput.trim()) return; const newNotes = activeLead.notlar ? `${activeLead.notlar}\n- ${noteInput}` : `- ${noteInput}`; const updated = { ...activeLead, notlar: newNotes }; await api.leads.update(updated); setLeads(leads.map(l => l.id === activeLead.id ? updated : l)); setNoteInput(''); }} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Save size={18} /></button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'studio' && (<ContentStudio lead={activeLead} />)}
                    </div>
                </div>
            )}

            {/* MODALS */}
            <ProposalModal isOpen={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)} lead={proposalLead} onSuccess={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); loadData(); }} />
            <LeadDiscoveryModal isOpen={isDiscoveryModalOpen} onClose={() => setIsDiscoveryModalOpen(false)} onLeadsAdded={loadData} />

            {activeLead && (
                <>
                    <ResponseAnalyzerModal isOpen={isAnalyzerModalOpen} onClose={() => setIsAnalyzerModalOpen(false)} lead={activeLead} onAnalysisComplete={(updatedLead) => { setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l)); }} />
                    <StrategyModal isOpen={isStrategyModalOpen} onClose={() => setIsStrategyModalOpen(false)} lead={activeLead} />
                    <SmartScoreModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)} lead={activeLead} onScoreUpdate={(updatedLead) => { setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l)); }} />
                </>
            )}

            {showConfetti && <Confetti />}
        </div>
    );
};

export default Leads;
