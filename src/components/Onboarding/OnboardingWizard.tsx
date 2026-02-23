"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Store, MessageCircle, Link as LinkIcon, Award, ArrowRight } from "lucide-react";

const steps = [
    {
        id: "welcome",
        title: "XINXIA Asistan'a Hoş Geldin",
        description: "Artık yalnız değilsin. Dijital esnaf olma yolculuğunun ilk gününe başlıyoruz. Sadece 2 dakika sürecek bu sihirbaz ile dükkanını geleceğe taşıyacağız.",
        icon: <Store className="w-12 h-12 text-orange-500 mb-4" />
    },
    {
        id: "gmb",
        title: "Google Haritalarını Bağla (GMB)",
        description: "Müşterilerin seni internette bulduğunda asistanın onlara yorum yanıtları yazabilsin diye Google My Business hesabını bağla.",
        icon: <LinkIcon className="w-12 h-12 text-blue-500 mb-4" />
    },
    {
        id: "whatsapp",
        title: "WhatsApp'ını Doğrula",
        description: "Müşterilerine otomatik katalog atmak ve pazarlık yapmak için işletme numaranı doğruluyoruz...",
        icon: <MessageCircle className="w-12 h-12 text-green-500 mb-4" />
    },
    {
        id: "photo",
        title: "Dükkanının Fotoğrafı",
        description: "Vitrinini asistanına göster! Bu fotoğrafı ilerleyen günlerde sosyal medya postları oluştururken kullanacağız.",
        icon: <Store className="w-12 h-12 text-purple-500 mb-4" />
    },
    {
        id: "first_post",
        title: "İlk Paylaşım Hazır!",
        description: "Sen çayını içerken asistanın ilk sosyal medya paylaşım metnini hazırladı bile. Onayla ve dijital esnaflık rozetini kazan!",
        icon: <CheckCircle2 className="w-12 h-12 text-orange-500 mb-4" />
    }
];

/**
 * Gamified Onboarding Wizard Component
 * Guides the merchant through 5 distinct setup steps, ending with a Gamification Badge.
 */
export default function OnboardingWizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const currentStep = steps[currentStepIndex];

    if (isCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl text-center border border-orange-100"
            >
                <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-orange-100 p-6 rounded-full inline-block">
                        <Award className="w-20 h-20 text-orange-500" />
                    </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Harika İş Çıkardın!</h2>
                <p className="text-slate-600 mb-8">
                    Başarıyla "Tam Donanımlı Dijital Esnaf" rozetini kazandın.
                    Asistanın şu an arka planda dükkanın için çalışmaya başladı.
                </p>
                <Button variant="primary" size="lg" className="w-full flex justify-center py-4">
                    Kontrol Paneline Git
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-8">
            {/* Progress Bar */}
            <div className="mb-10">
                <div className="flex justify-between mb-2">
                    {steps.map((s, idx) => (
                        <div key={s.id} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${idx <= currentStepIndex ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-slate-200 text-slate-400"}`}>
                                {idx < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-orange-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center min-h-[350px] flex flex-col justify-center items-center"
                >
                    {currentStep.icon}
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">{currentStep.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-8 max-w-md">
                        {currentStep.description}
                    </p>

                    <div className="mt-auto w-full pt-6">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleNext}
                            className="w-full sm:w-auto px-12 group flex items-center justify-center mx-auto"
                        >
                            {currentStepIndex === steps.length - 1 ? "Rozeti Kap & Bitir" : "Onayla ve Devam Et"}
                            {currentStepIndex !== steps.length - 1 && (
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
