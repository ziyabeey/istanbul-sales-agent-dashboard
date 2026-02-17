import React, { useEffect, useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend, Cell
} from 'recharts';
import { Download, Calendar, Filter, Loader2, TrendingUp, Users, DollarSign, Target, AlertCircle, BarChart3, Globe, Mail, ThumbsUp, FileText, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { DashboardStats } from '../types';
import EmptyState from '../components/EmptyState';
import type { ReportPeriod } from '../services/reportsService';

const HEDEF_TOAST_KEY = 'agent_hedef_toast_shown';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [period, setPeriod] = useState<ReportPeriod>('all');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reportData, statsData] = await Promise.all([
        api.reports.getPerformanceData(period),
        api.dashboard.getStats()
      ]);
      setData(reportData);
      setStats(statsData);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Raporlar yüklenirken hata oluştu.');
      setData(null);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  useEffect(() => {
    if (!data?.webKpis || period !== 'thisMonth') return;
    const target = data.webKpis.targetTeklifAy ?? 20;
    const buAy = data.webKpis.teklifGonderilenBuAy ?? 0;
    const shown = sessionStorage.getItem(HEDEF_TOAST_KEY);
    if (buAy >= target && shown !== 'exceeded') {
      sessionStorage.setItem(HEDEF_TOAST_KEY, 'exceeded');
      toast.success(`Bu ay teklif hedefi aşıldı! ${buAy} / ${target}`);
    } else if (buAy >= Math.floor(target * 0.8) && buAy < target && shown !== 'close') {
      sessionStorage.setItem(HEDEF_TOAST_KEY, 'close');
      toast.info(`Hedefe ${target - buAy} teklif kaldı. (${buAy}/${target})`);
    }
  }, [data, period]);

  const handleExportPdf = async () => {
    if (!reportRef.current || !data) return;
    setIsExportingPdf(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, logging: false });
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = 210;
      const pageH = 297;
      const imgH = (canvas.height * pageW) / canvas.width;
      const fitH = Math.min(pageH, imgH);
      const fitW = (canvas.width * fitH) / canvas.height;
      pdf.addImage(img, 'PNG', 0, 0, fitW, fitH);
      pdf.save(`rapor-${period === 'thisMonth' ? 'bu-ay' : 'tum'}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (e) {
      console.error(e);
      setError('PDF oluşturulurken hata oluştu.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 dark:text-slate-400">
        <Loader2 size={32} className="animate-spin mb-4 text-indigo-600" />
        <p>Raporlar hazırlanıyor...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="space-y-4 animate-fade-in">
        <EmptyState
          icon={AlertCircle}
          title="Raporlar yüklenemedi"
          description={error}
          action={{ label: 'Tekrar dene', onClick: fetchData }}
        />
      </div>
    );
  }

  const hasChartData = data?.funnel?.length > 0 || data?.weeklyTrend?.length > 0 || (data?.sectorSuccessRate?.length ?? 0) > 0;

  return (
    <div className="space-y-6 animate-fade-in" ref={reportRef}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Detaylı Raporlar</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Dönüşüm hunisi ve performans metrikleri.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${period === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            <Calendar size={16} /> Tümü
          </button>
          <button
            onClick={() => setPeriod('thisMonth')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${period === 'thisMonth' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            <Calendar size={16} /> Bu Ay
          </button>
          <button
            onClick={handleExportPdf}
            disabled={!data || isExportingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExportingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            PDF İndir
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users size={20} /></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Toplam Lead</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats?.lead_sayisi || 0}</div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp size={12} className="mr-1" /> Sıcak: {stats?.sicak_leadler || 0}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Target size={20} /></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Başarı Oranı</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">%{stats?.hedef_orani || 0}</div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp size={12} className="mr-1" /> Hedef: %15
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><DollarSign size={20} /></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Beklenen Ciro</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">₺{(stats?.sicak_leadler || 0) * 25000}</div>
          <div className="text-xs text-slate-400 mt-1">
            Maliyet: ₺{(stats?.toplam_maliyet ?? 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Filter size={20} /></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Bölge Sayısı</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats?.districtBreakdown?.length || 0}</div>
          <div className="text-xs text-blue-500 mt-1 flex items-center">
            Aktif Taranan
          </div>
        </div>
      </div>

      {/* Web odaklı KPI'lar */}
      {data?.webKpis && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Globe size={18} /> Web Sitesi Satışı — Özet
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-600 mb-1"><Mail size={16} /></div>
              <span className="text-xs text-slate-500 font-medium">Sitesi olmayan lead'e mail</span>
              <div className="text-xl font-bold text-slate-900">{data.webKpis.sitesiOlmayanLeadMailSayisi ?? 0}</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <span className="text-xs text-slate-500 font-medium">Teklif gönderilen</span>
              <div className="text-xl font-bold text-slate-900">{data.webKpis.teklifGonderilen ?? 0}</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <span className="text-xs text-slate-500 font-medium">Teklif (sitesi yok)</span>
              <div className="text-xl font-bold text-slate-900">{data.webKpis.teklifSitesiOlmayan ?? 0}</div>
              <div className="text-[10px] text-slate-500">%{data.webKpis.teklifOraniSitesiOlmayan ?? 0} oran</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <div className="flex items-center gap-2 text-emerald-600 mb-1"><ThumbsUp size={16} /></div>
              <span className="text-xs text-slate-500 font-medium">Olumlu yanıt</span>
              <div className="text-xl font-bold text-slate-900">{data.webKpis.olumluYanit ?? 0}</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <span className="text-xs text-slate-500 font-medium">Teklif → olumlu oranı</span>
              <div className="text-xl font-bold text-slate-900">%{data.webKpis.teklifOlumluOrani ?? 0}</div>
            </div>
            {data.webKpis.targetTeklifAy != null && (
              <div className="bg-white/80 rounded-lg p-4 border border-indigo-100 col-span-2 md:col-span-4" title="Hedef Ayarlar > Genel bölümünden değiştirilir.">
                <span className="text-xs text-slate-500 font-medium">Bu ay teklif hedefi</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-slate-900">{data.webKpis.teklifGonderilenBuAy ?? data.webKpis.teklifGonderilen ?? 0}</span>
                  <span className="text-slate-500">/ {data.webKpis.targetTeklifAy}</span>
                  {((data.webKpis.teklifGonderilenBuAy ?? data.webKpis.teklifGonderilen ?? 0) >= (data.webKpis.targetTeklifAy ?? 0)) && (
                    <span className="text-emerald-600 text-sm font-medium">Hedef aşıldı</span>
                  )}
                </div>
              </div>
            )}
            {data.webKpis.eskiSiteLeadSayisi != null && data.webKpis.eskiSiteLeadSayisi > 0 && (
              <div className="bg-white/80 rounded-lg p-4 border border-indigo-100">
                <span className="text-xs text-slate-500 font-medium">Eski site (notta işaretli)</span>
                <div className="text-xl font-bold text-slate-900">{data.webKpis.eskiSiteLeadSayisi}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Düşük performanslı şablonlar (RL) */}
      {data?.evolutionCandidates && data.evolutionCandidates.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
            <FileText size={18} /> Düşük performanslı şablonlar (Q &lt; 0,2)
          </h3>
          <p className="text-xs text-amber-800 mb-3">Bu şablonlar düşük Q değerine sahip; metinlerini güncellemek veya Ayarlar’dan değiştirmek faydalı olabilir.</p>
          <ul className="space-y-2">
            {data.evolutionCandidates.slice(0, 10).map((c: { stateKey: string; templateId: string; qValue: number }, i: number) => (
              <li key={i} className="flex items-center justify-between text-sm bg-white/80 rounded px-3 py-2 border border-amber-100">
                <span className="font-medium text-slate-700">{c.templateId || c.stateKey || '—'}</span>
                <span className="text-amber-700">Q: {c.qValue.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* En iyi 5 sektör–şablon */}
      {data?.bestSectorTemplate && data.bestSectorTemplate.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Target size={18} /> En iyi 5 sektör–şablon
          </h3>
          <p className="text-xs text-emerald-800 mb-3">Başarı oranı en yüksek sektör ve şablon çiftleri (en az 2 kullanım).</p>
          <ul className="space-y-2">
            {data.bestSectorTemplate.map((row: { sektor: string; templateName: string; useCount: number; successCount: number; successRatePct: number }, i: number) => (
              <li key={i} className="flex items-center justify-between text-sm bg-white/80 rounded-lg px-3 py-2 border border-emerald-100">
                <span className="font-medium text-slate-700">{row.sektor}</span>
                <span className="text-slate-600">{row.templateName}</span>
                <span className="text-emerald-700 font-medium">%{row.successRatePct}</span>
                <span className="text-slate-500 text-xs">({row.successCount}/{row.useCount})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* A/B Şablon performansı */}
      {data?.templateAbReport && data.templateAbReport.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Layers size={18} /> A/B Şablon Performansı
          </h3>
          <p className="text-xs text-slate-600 mb-3">Şablon bazında gönderim ve başarı oranı; hangi şablonun daha iyi dönüşüm getirdiğini karşılaştırabilirsiniz.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="py-2 pr-4 font-medium">Şablon</th>
                  <th className="py-2 pr-4 font-medium">Tür</th>
                  <th className="py-2 pr-4 font-medium text-right">Gönderim</th>
                  <th className="py-2 pr-4 font-medium text-right">Başarı</th>
                  <th className="py-2 font-medium text-right">Oran %</th>
                </tr>
              </thead>
              <tbody>
                {data.templateAbReport.map((row: { id: string; name: string; type: string; useCount: number; successCount: number; successRatePct: number }) => (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-medium text-slate-800">{row.name}</td>
                    <td className="py-2 pr-4 text-slate-600">{row.type === 'intro' ? 'Tanışma' : row.type === 'followup1' ? 'Takip 1' : row.type === 'followup2' ? 'Takip 2' : row.type}</td>
                    <td className="py-2 pr-4 text-right">{row.useCount}</td>
                    <td className="py-2 pr-4 text-right">{row.successCount}</td>
                    <td className="py-2 text-right font-medium text-emerald-600">{row.successRatePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data?.templateAbReportBySector && data.templateAbReportBySector.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Sektöre göre</h4>
              <div className="overflow-x-auto max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="py-1 pr-2 font-medium">Şablon</th>
                      <th className="py-1 pr-2 font-medium">Sektör</th>
                      <th className="py-1 pr-2 text-right">Gönderim</th>
                      <th className="py-1 text-right">Başarı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.templateAbReportBySector.slice(0, 30).map((row: { templateId: string; templateName: string; sektor: string; useCount: number; successCount: number }, i: number) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-1 pr-2 font-medium text-slate-700">{row.templateName}</td>
                        <td className="py-1 pr-2 text-slate-600">{row.sektor}</td>
                        <td className="py-1 pr-2 text-right">{row.useCount}</td>
                        <td className="py-1 text-right">{row.successCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasChartData && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <BarChart3 size={48} className="text-slate-300 mb-3" />
          <p className="text-slate-600 font-medium">Henüz grafik verisi yok</p>
          <p className="text-sm text-slate-500 mt-1">Lead ve etkileşim verisi eklendikçe grafikler dolacaktır.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Satış Hunisi (Funnel)</h3>
          <div className="h-80 w-full">
            {(data?.funnel?.length ?? 0) > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data.funnel}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]}>
                    {data.funnel.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">Veri yok</div>
            )}
          </div>
        </div>

        {/* Radar Chart (Sector Performance) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Sektörel Performans Analizi</h3>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.sectorSuccessRate}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                <Radar
                  name="Mail Açılma"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Dönüşüm"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
            {(!data?.sectorSuccessRate || data.sectorSuccessRate.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                <div className="text-slate-500 text-sm font-medium">Yeterli veri yok</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Area Chart (Weekly Trend) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-6">
          {period === 'thisMonth' ? 'Bu Ay Gönderim vs Yanıt' : 'Haftalık Gönderim vs Yanıt Trendi'}
        </h3>
        <div className="h-72 w-full">
          {(data?.weeklyTrend?.length ?? 0) > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.weeklyTrend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Area type="monotone" dataKey="sent" stroke="#8884d8" fillOpacity={1} fill="url(#colorSent)" name="Gönderilen Mail" />
              <Area type="monotone" dataKey="response" stroke="#82ca9d" fillOpacity={1} fill="url(#colorResponse)" name="Gelen Yanıt" />
            </AreaChart>
          </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">Veri yok</div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Reports;