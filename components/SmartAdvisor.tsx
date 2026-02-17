import React, { useEffect, useState } from 'react';
import { Lightbulb, TrendingUp, BarChart, Shuffle, Target, ArrowRight } from 'lucide-react';
import { Lead, EmailTemplate } from '../types';
import { storage } from '../services/storage';
import { rewardEngine } from '../services/rewardEngine';
import { qTable } from '../services/qTable';

interface SmartAdvisorProps {
    lead: Lead;
}

interface Recommendation {
    action: string;
    reason: string;
    confidence: number; // 0-100
    templateId?: string;
    isExploration: boolean;
    qValue: number;
    visits: number;
    alternatives: Array<{
        name: string;
        qValue: number;
        visits: number;
        isExploration: boolean;
    }>;
}

const SmartAdvisor: React.FC<SmartAdvisorProps> = ({ lead }) => {
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

    useEffect(() => {
        analyzeLead(lead);
    }, [lead]);

    const analyzeLead = (currentLead: Lead) => {
        const templates = storage.getTemplates();
        const sector = currentLead.sektor;
        const persona = currentLead.personaAnalysis?.type || 'Bilinmiyor';

        let bestAction = "E-posta Gönder";
        let bestReason = "Genel başlangıç stratejisi.";
        let bestConfidence = 50;
        let selectedTemplateId = "";
        let isExploration = false;
        let qValue = 0;
        let visits = 0;
        let alternatives: Recommendation['alternatives'] = [];

        // RL-based template selection via UCB1
        const introTemplates = templates.filter(t => t.type === 'intro' && t.isActive);

        if (introTemplates.length > 0) {
            const templateIds = introTemplates.map(t => t.id);
            const ucbResults = rewardEngine.selectBestTemplate(currentLead, templateIds);

            if (ucbResults.length > 0) {
                const best = ucbResults[0];
                const bestTpl = introTemplates.find(t => t.id === best.templateId);

                if (bestTpl) {
                    selectedTemplateId = bestTpl.id;
                    qValue = best.qValue;
                    visits = best.visits;
                    isExploration = best.isExploration;

                    if (best.isExploration) {
                        bestAction = `'${bestTpl.name}' Şablonunu Dene (Explore)`;
                        bestReason = visits === 0
                            ? `Bu şablon ${sector}/${persona} için hiç denenmemiş. Yeni veri toplama fırsatı.`
                            : `Düşük veri (${visits}x kullanım). UCB1 explorasyon bonusu ile seçildi.`;
                        bestConfidence = Math.max(30, 50 - visits * 2);
                    } else {
                        const ratePercent = Math.round(qValue * 100);
                        bestAction = `'${bestTpl.name}' Şablonunu Kullan (Exploit)`;
                        bestReason = `${sector}/${persona} için Q-değeri: ${qValue.toFixed(2)} (${visits}x deneyim).`;
                        bestConfidence = Math.min(95, 40 + ratePercent);
                    }

                    // Build alternatives
                    alternatives = ucbResults.slice(1, 4).map(r => {
                        const tpl = introTemplates.find(t => t.id === r.templateId);
                        return {
                            name: tpl?.name || r.templateId.slice(0, 8),
                            qValue: r.qValue,
                            visits: r.visits,
                            isExploration: r.isExploration
                        };
                    });
                }
            }
        }

        // Heuristic overrides
        if (currentLead.lead_skoru >= 4) {
            bestConfidence += 10;
            bestReason += " Lead skoru yüksek.";
        }

        if (currentLead.lead_durumu === 'takipte') {
            bestAction = "Telefonla Ara";
            bestReason = "Mail etkileşimi oldu, şimdi insan sesi ile güven verme zamanı.";
            bestConfidence = 85;
            isExploration = false;
        }

        setRecommendation({
            action: bestAction,
            reason: bestReason,
            confidence: Math.min(99, bestConfidence),
            templateId: selectedTemplateId,
            isExploration,
            qValue,
            visits,
            alternatives
        });
    };

    if (!recommendation) return null;

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

            <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Lightbulb size={24} className="text-yellow-300" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg mb-1">AI Tavsiyesi</h3>
                        <div className="flex items-center gap-2">
                            {recommendation.isExploration && (
                                <span className="flex items-center gap-1 text-xs font-medium bg-yellow-500/30 px-2 py-1 rounded-full">
                                    <Shuffle size={10} /> Explore
                                </span>
                            )}
                            {!recommendation.isExploration && recommendation.visits > 0 && (
                                <span className="flex items-center gap-1 text-xs font-medium bg-green-500/30 px-2 py-1 rounded-full">
                                    <Target size={10} /> Exploit
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                                <TrendingUp size={12} /> %{recommendation.confidence} Güven
                            </span>
                        </div>
                    </div>
                    <p className="text-white/90 text-sm font-medium mb-3">
                        {recommendation.action}
                    </p>
                    <div className="text-xs text-indigo-100 flex items-start gap-2 bg-black/20 p-2 rounded-lg mb-2">
                        <BarChart size={14} className="mt-0.5 flex-shrink-0" />
                        <span>Neden? {recommendation.reason}</span>
                    </div>

                    {/* Q-Value and Visit Info */}
                    {recommendation.visits > 0 && (
                        <div className="flex items-center gap-3 text-xs text-indigo-200 mb-2">
                            <span>Q: {recommendation.qValue.toFixed(2)}</span>
                            <span>•</span>
                            <span>{recommendation.visits}x deneme</span>
                        </div>
                    )}

                    {/* Alternatives */}
                    {recommendation.alternatives.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                            <p className="text-xs text-indigo-200 mb-1.5">Alternatifler:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {recommendation.alternatives.map((alt, i) => (
                                    <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        {alt.isExploration ? <Shuffle size={8} /> : <Target size={8} />}
                                        {alt.name}
                                        <span className="text-indigo-300">
                                            ({alt.visits > 0 ? `Q:${alt.qValue.toFixed(1)}` : 'Yeni'})
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartAdvisor;