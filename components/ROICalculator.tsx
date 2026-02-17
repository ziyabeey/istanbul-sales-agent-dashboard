import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, TrendingUp, Calculator } from 'lucide-react';
import { DashboardStats } from '../types';

interface ROICalculatorProps {
    stats: DashboardStats;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ stats }) => {
    // Default assumptions if no stats
    const [hourlyRate, setHourlyRate] = useState(500); // 500 TL/hr default
    const [manualTimePerLead, setManualTimePerLead] = useState(15); // 15 mins

    // Calculate basics
    const totalLeads = stats.lead_sayisi || 0;
    const totalEmails = stats.mail_gonderildi || 0;

    // AI Savings Calculation
    // Finding a lead manually: 10 mins
    // Writing an email manually: 15 mins
    const savedMinutes = (totalLeads * 10) + (totalEmails * 15);
    const savedHours = Math.round(savedMinutes / 60);
    const moneySaved = savedHours * hourlyRate;

    return (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 transform group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-8 -mb-8"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Calculator size={20} className="text-emerald-200" />
                            AI Yatırım Getirisi
                        </h3>
                        <p className="text-emerald-100 text-xs opacity-90">Ajanın size kazandırdığı zamanın değeri.</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <TrendingUp size={20} className="text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
                            <Clock size={12} /> Kazanılan Zaman
                        </div>
                        <div className="text-2xl font-black">{savedHours} <span className="text-sm font-medium opacity-70">saat</span></div>
                    </div>
                    <div className="bg-black/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
                            <DollarSign size={12} /> Tasarruf
                        </div>
                        <div className="text-2xl font-black">{moneySaved.toLocaleString()} <span className="text-sm font-medium opacity-70">TL</span></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="flex justify-between text-xs font-medium text-emerald-100 mb-1">
                            <span>Kendi Saatlik Ücretiniz</span>
                            <span className="font-bold">{hourlyRate} TL</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="2000"
                            step="50"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-emerald-100 text-center opacity-70">
                    *Manuel işlem sürelerine kıyasla hesaplanmıştır.
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;
