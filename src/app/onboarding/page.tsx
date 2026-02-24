import React from "react";
import OnboardingWizard from "@/components/Onboarding/OnboardingWizard";

export const metadata = {
    title: "Kurulum Sihirbazı | kepenk.ai",
    description: "kepenk.ai Esnaf Asistanı dijital kurulum ekranı."
};

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                        Dijital Dükkanını Hazırlayalım
                    </h1>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        Birkaç basit adımla asistanın senin için çalışmaya başlayacak. İşletmeni bir sonraki seviyeye taşımaya hazır mısın?
                    </p>
                </div>

                <OnboardingWizard />
            </div>
        </div>
    );
}
