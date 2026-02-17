
import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import {
  LayoutDashboard,
  Users,
  Mail,
  CalendarCheck,
  BarChart3,
  Settings,
  Bot,
  Menu,
  X,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  PlayCircle,
  PauseCircle,
  Loader2,
  Activity,
  Flame,
  Trophy,
  GraduationCap,
  BookOpen,
  Calendar,
  LogOut,
  Sparkles,
  Settings2,
  MapPin,
  Building2,
  Target,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAgent } from '../context/AgentContext';
import { api } from '../services/api';
import { gamificationService } from '../services/gamificationService';
import { firebaseService } from '../services/firebaseService';
import { UserProgress, AgentConfig } from '../types';
import { DISTRICTS, SECTORS } from '../constants';
import { rewardEngine } from '../services/rewardEngine';

interface LayoutProps {
  children: React.ReactNode;
  toggleAssistant: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleAssistant }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAgentRunning, agentStatus, toggleAgent, pendingDraftsCount, agentConfig, updateAgentConfig, sessionStats, agentQueue, thoughts, clearThoughts, clearSessionCache } = useAgent();
  const { isDark, toggleTheme } = useTheme();

  // Agent Config Modal
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const configRef = useRef<HTMLDivElement>(null);

  // Gamification State
  const [progress, setProgress] = useState<UserProgress>(gamificationService.getProgress());

  // Refresh progress occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(gamificationService.getProgress());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Click outside to close config
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setIsConfigOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [configRef]);

  const handleLogout = async () => {
    if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      await firebaseService.logout();
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('localMode');
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Genel Bakış', path: '/', icon: LayoutDashboard },
    { name: 'Lead Yönetimi', path: '/leads', icon: Users },
    { name: 'Mail Otomasyonu', path: '/mail', icon: Mail, badge: pendingDraftsCount > 0 ? pendingDraftsCount : undefined },
    { name: 'Takvim & Ajanda', path: '/calendar', icon: Calendar },
    { name: 'Görev Listesi', path: '/tasks', icon: CalendarCheck },
    { name: 'Eğitim & Simülasyon', path: '/training', icon: GraduationCap },
    { name: 'Raporlama', path: '/reports', icon: BarChart3 },
    { name: 'Kullanım Rehberi', path: '/guide', icon: BookOpen },
    { name: 'Ayarlar', path: '/settings', icon: Settings },
  ];

  const dailyGoal = gamificationService.getDailyGoal(progress.level);
  const dailyGoalPercent = Math.min(100, Math.round((progress.dailyActions.leads / dailyGoal) * 100));

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      <Toaster richColors position="top-right" closeButton />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col shadow-2xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
        }}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">Sales Agent</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Dashboard</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Gamification Widget */}
        <div className="mx-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm mb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy size={12} className="text-yellow-500" /> Günlük Hedef
            </span>
            <div className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">
              <Flame size={12} className={progress.streakDays > 0 ? "fill-orange-400 animate-pulse" : ""} />
              <span className="text-[10px] font-bold">{progress.streakDays} Gün</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-700" />
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-emerald-500 transition-all duration-1000 ease-out" strokeDasharray={100} strokeDashoffset={100 - (dailyGoalPercent)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                %{dailyGoalPercent}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{progress.dailyActions.leads} / {dailyGoal} Lead</div>
              <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${(progress.xp % 1000) / 10}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>Lvl {progress.level}</span>
                <span>{progress.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="px-3 space-y-1 flex-1 overflow-y-auto custom-scrollbar py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative duration-200 ${isActive
                  ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
              >
                <Icon size={20} className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm">{item.name}</span>
                {item.badge && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse border border-rose-400">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 bg-slate-950/30 backdrop-blur-md space-y-3 border-t border-white/5">
          <button
            onClick={toggleAssistant}
            className="group flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg font-medium transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Sparkles size={18} />
            <span className="text-sm">Asistana Sor</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-400 hover:text-rose-300 hover:bg-rose-900/20 rounded-xl font-medium transition-all text-sm"
          >
            <LogOut size={16} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 shadow-sm z-10 sticky top-0">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">

              {/* Global Agent Status & Controls */}
              <div className="relative" ref={configRef}>
                <div
                  className={`hidden sm:flex items-center gap-3 px-1.5 py-1.5 pl-4 rounded-full border transition-all ${isAgentRunning
                    ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 shadow-sm'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
                    }`}
                >
                  <div className="flex flex-col items-end min-w-[100px]">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsConfigOpen(!isConfigOpen)}>
                      Otopilot Terminali
                      {isAgentRunning && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                      <Activity size={10} />
                    </span>
                    <span className={`text-xs font-bold truncate max-w-[150px] ${isAgentRunning ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                      {agentStatus}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {isAgentRunning ? 'Çalışıyor' : (agentStatus.includes('Bütçe') ? 'Sebep: Günlük limit' : agentStatus.includes('Hata') ? `Sebep: Hata (${sessionStats?.errors ?? 0})` : 'Sebep: Manuel')}
                    </span>
                  </div>
                  <button
                    onClick={toggleAgent}
                    className={`p-2 rounded-full transition-all shadow-sm ${isAgentRunning
                      ? 'bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 hover:text-green-700 border border-slate-200 dark:border-slate-600'
                      : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-600'
                      }`}
                    title={isAgentRunning ? "Ajanı Duraklat" : "Ajanı Başlat"}
                  >
                    {agentStatus.includes('...') && !agentStatus.includes('Beklemede') ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : isAgentRunning ? (
                      <PauseCircle size={18} className="fill-green-50" />
                    ) : (
                      <PlayCircle size={18} />
                    )}
                  </button>
                </div>

                {/* Config & Terminal Popover */}
                {isConfigOpen && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in origin-top-right">
                    {/* Header Tabs */}
                    <div className="flex border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                      <button className="flex-1 py-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600">Terminal & Kuyruk</button>
                      <button className="flex-1 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Ayarlar</button>
                    </div>

                    <div className="p-4 max-h-[500px] overflow-y-auto">
                      {/* Otopilot Özeti — Session Stats */}
                      <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <BarChart3 size={10} /> Otopilot Özeti
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        Son durum: {isAgentRunning ? 'Çalışıyor' : 'Durduruldu'}. {!isAgentRunning && (agentStatus.includes('Bütçe') ? 'Sebep: Günlük limit.' : agentStatus.includes('Hata') ? `Sebep: Hata (${sessionStats?.errors ?? 0}).` : 'Sebep: Manuel.')}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {sessionStats && (
                          <>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Temizlenen</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.sanitized}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Zenginleştirilen</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.enriched}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Keşfedilen</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.discovered}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">E-posta</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.emailed}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Taslak</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.drafted}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Hatalar</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.errors}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-600">
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Geri Dönen</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{sessionStats.bounced}</div>
                            </div>
                          </>
                        )}
                      </div>
                      {sessionStats?.startedAt && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">
                          Oturum: {Math.round((Date.now() - sessionStats.startedAt) / 60000)} dk
                        </p>
                      )}
                      {typeof sessionStats?.lastLoopMs === 'number' && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">
                          Son döngü: {(sessionStats.lastLoopMs / 1000).toFixed(1)} sn
                        </p>
                      )}
                      {sessionStats?.lastLoopStepMs && Object.keys(sessionStats.lastLoopStepMs).length > 0 && (
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 mb-3 font-mono">
                          {Object.entries(sessionStats.lastLoopStepMs)
                            .filter(([, ms]) => ms > 0)
                            .map(([name, ms]) => `${name} ${(ms / 1000).toFixed(1)}s`)
                            .join(' · ')}
                        </p>
                      )}
                      {/* RL özeti — exploration / learning */}
                      {(() => {
                        try {
                          const insights = rewardEngine.getLearningInsightsSummary();
                          if (insights.length > 0) {
                            return (
                              <p className="text-[10px] text-purple-600/90 bg-purple-50 border border-purple-100 rounded-lg p-2 mb-3">
                                {insights[0]}
                              </p>
                            );
                          }
                        } catch (_) {}
                        return null;
                      })()}

                      {/* Active Queue */}
                      <div className="mb-4">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Activity size={10} /> İşlem Kuyruğu
                        </h5>
                        <div className="space-y-1.5">
                          {agentQueue && agentQueue.length > 0 ? (
                            agentQueue.map((item, i) => (
                              <div key={i} className="flex items-center justify-between text-xs p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                                  {item.label}
                                </span>
                                <span className="font-mono bg-white px-1.5 py-0.5 rounded text-[10px] border border-indigo-100">{item.count}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-slate-400 italic text-center py-2">Bekleyen işlem yok</div>
                          )}
                        </div>
                      </div>

                      {/* Recent Thoughts */}
                      <div className="mb-4">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Bot size={10} /> Son İşlemler
                        </h5>
                        <div className="space-y-2">
                          {thoughts.slice(0, 3).map((t) => (
                            <div key={t.id} className="text-xs flex gap-2">
                              <span className={`text-[10px] font-mono opacity-50 flex-shrink-0 ${t.type === 'error' ? 'text-red-500' : 'text-slate-500'
                                }`}>
                                {new Date(t.timestamp).toLocaleTimeString().slice(0, 5)}
                              </span>
                              <span className={`${t.type === 'error' ? 'text-red-600' :
                                t.type === 'success' ? 'text-emerald-600' :
                                  t.type === 'learning' ? 'text-purple-600' : 'text-slate-600'
                                }`}>
                                {t.message}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <button
                            type="button"
                            onClick={() => clearThoughts()}
                            className="text-[10px] px-2 py-1 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                          >
                            Logu temizle
                          </button>
                          <button
                            type="button"
                            onClick={() => clearSessionCache()}
                            className="text-[10px] px-2 py-1 rounded border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800"
                          >
                            Oturum önbelleğini sıfırla
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              const count = await api.leads.clearPendingDrafts();
                              clearThoughts();
                              if (count > 0) toast.success('Taslaklar iptal edildi', { description: `${count} bekleyen taslak kaldırıldı.` });
                            }}
                            className="text-[10px] px-2 py-1 rounded border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800"
                          >
                            Taslakları iptal et
                          </button>
                        </div>
                      </div>

                      {/* Settings Section (Condensed) */}
                      <div className="pt-4 border-t border-slate-100">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hızlı Ayarlar</h5>
                        <div className="space-y-2">
                          <select
                            className="w-full text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500"
                            value={agentConfig.targetDistrict}
                            onChange={(e) => updateAgentConfig({ targetDistrict: e.target.value })}
                          >
                            <option value="Tümü">📍 Tüm Bölge</option>
                            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <select
                            className="w-full text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500"
                            value={agentConfig.focusMode}
                            onChange={(e) => updateAgentConfig({ focusMode: e.target.value as AgentConfig['focusMode'] })}
                          >
                            <option value="balanced">⚖️ Dengeli Mod</option>
                            <option value="discovery_only">🔍 Sadece Keşif</option>
                            <option value="outreach_only">✉️ Sadece Outreach</option>
                          </select>
                          <select
                            className="w-full text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500"
                            value={agentConfig.speedProfile ?? 'dengeli'}
                            onChange={(e) => updateAgentConfig({ speedProfile: e.target.value as AgentConfig['speedProfile'] })}
                          >
                            <option value="agresif">🚀 Agresif (daha çok aksiyon)</option>
                            <option value="dengeli">⚖️ Dengeli</option>
                            <option value="tasarruf">🌿 Tasarruf (daha az API)</option>
                          </select>
                          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!agentConfig.ignoreBudgetLimit}
                              onChange={(e) => updateAgentConfig({ ignoreBudgetLimit: e.target.checked })}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Bütçe sınırı yok (otopilot durmasın)</span>
                          </label>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Takip mailleri</label>
                            <select
                              className="w-full text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500"
                              value={agentConfig.autoSendFollowUp ? 'auto' : 'draft'}
                              onChange={(e) => updateAgentConfig({ autoSendFollowUp: e.target.value === 'auto' })}
                            >
                              <option value="draft">Sadece taslak (onay bekler)</option>
                              <option value="auto">Otomatik gönder</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Günlük mail limiti</label>
                            <input
                              type="number"
                              min={10}
                              max={200}
                              className="w-full text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-500"
                              value={agentConfig.dailyEmailCap ?? 50}
                              onChange={(e) => updateAgentConfig({ dailyEmailCap: Math.min(200, Math.max(10, parseInt(e.target.value, 10) || 50)) })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-105 border border-slate-200 dark:border-slate-600"
                title={isDark ? 'Aydınlık Mod' : 'Karanlık Mod'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border border-white dark:border-slate-700 shadow-sm cursor-help transition-transform hover:scale-105" title={localStorage.getItem('localMode') ? 'Yerel Mod' : 'Firebase Bağlı'}>
                {localStorage.getItem('localMode') ? 'YM' : 'FB'}
              </div>
            </div>
          </div>
        </header>

        {!api.gmail.isConnected() && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/15 border-b border-amber-500/30 text-amber-800 dark:text-amber-200 text-sm">
            <AlertTriangle size={18} className="flex-shrink-0" />
            <span>Gmail bağlı değil — Mailler simülasyon modunda, gerçekten gönderilmez. Ayarlar &gt; Genel &amp; API bölümünden Google hesabınızı bağlayın.</span>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
