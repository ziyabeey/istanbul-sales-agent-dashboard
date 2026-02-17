import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Zap, Command, Layout, Users } from 'lucide-react';

interface Step {
    title: string;
    content: string;
    icon: React.ReactNode;
    selector?: string; // For highlighting (visual only for this simple version)
}

const steps: Step[] = [
    {
        title: "Hoş Geldiniz!",
        content: "İstanbul AI Satış Temsilcisi Dashboard'una hoş geldiniz. Bu tur size ana özellikleri kısaca tanıtacaktır.",
        icon: <Sparkles className="text-amber-500" size={32} />
    },
    {
        title: "Otopilot ve Ajan",
        content: "Sol panelden otopilotu başlatarak ajanınızın otomatik lead keşfetmesini, mailler hazırlamasını ve yanıtları eşleştirmesini sağlayabilirsiniz.",
        icon: <Zap className="text-indigo-500" size={32} />
    },
    {
        title: "Hızlı Komutlar (⌘K)",
        content: "Herhangi bir anda Command + K (veya Ctrl + K) tuşlarına basarak sayfalara hızlıca gidebilir veya komut çalıştırabilirsiniz.",
        icon: <Command className="text-slate-500" size={32} />
    },
    {
        title: "Size Özel Dashboard",
        content: "Widget Ayarları butonu ile Dashboard'unuzu dilediğiniz gibi özelleştirebilir, sadece ihtiyacınız olan verileri görebilirsiniz.",
        icon: <Layout className="text-emerald-500" size={32} />
    },
    {
        title: "Lead Yönetimi",
        content: "Lead listesinden verilerinizi CSV olarak dışa aktarabilir, harita üzerinde keşif yapabilir ve AI skorlarını görebilirsiniz.",
        icon: <Users className="text-purple-500" size={32} />
    }
];

const OnboardingTour: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('onboarding-completed');
        if (!completed) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('onboarding-completed', 'true');
    };

    if (!isVisible) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-indigo-500/20 overflow-hidden animate-scale-in">
                {/* Header Decoration */}
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <button
                    onClick={handleComplete}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                            {step.icon}
                        </div>
                    </div>

                    <div className="text-center space-y-3 mb-8">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                            {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {step.content}
                        </p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-1.5 mb-8">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs uppercase transition-all ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-600'
                                }`}
                        >
                            <ChevronLeft size={16} /> Geri
                        </button>

                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs uppercase shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                        >
                            {currentStep === steps.length - 1 ? 'Anladım!' : 'İleri'}
                            {currentStep < steps.length - 1 && <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>

                <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Adım {currentStep + 1} / {steps.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OnboardingTour;
