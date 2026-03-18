import React, { Suspense } from "react";
import OnboardingWizard from "@/components/Onboarding/OnboardingWizard";

export const metadata = {
    title: "Kurulum Sihirbazı | KPNK",
    description: "KPNK Esnaf Asistanı dijital kurulum ekranı."
};

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-white text-foreground flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Ambient Background Objects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-300/5 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
            </div>

            <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-syne tracking-tight drop-shadow-md">
                        Dijital Dükkanını Hazırlayalım
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 font-lora max-w-2xl mx-auto">
                        Birkaç basit adımla yapay zeka asistanın senin için çalışmaya başlayacak. İşletmeni bir sonraki seviyeye taşımaya hazır mısın?
                    </p>
                </div>

                <Suspense fallback={
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600 font-syne animate-pulse">Kurulum arayüzü yükleniyor...</p>
                    </div>
                }>
                    <OnboardingWizard />
                </Suspense>
            </div>
        </div>
    );
}
