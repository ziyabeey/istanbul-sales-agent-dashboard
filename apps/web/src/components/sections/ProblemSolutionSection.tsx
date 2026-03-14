"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Standard interface for comparison items between traditional methods and kepenk.ai.
 */
interface ComparisonItem {
    title: string;
    issues: string[];
    kepenkSolves: boolean;
}

/**
 * Static data array defining the comparisons. 
 * Extracted outside the component to avoid unnecessary re-allocations on render.
 */
const comparisons: ComparisonItem[] = [
    {
        title: "Geleneksel Ajanslar",
        issues: ["7.000 - 18.000₺ aylık maliyet", "Yavaş süreç ve bürokrasi", "Sadece 09:00 - 18:00 arası müsaitlik"],
        kepenkSolves: false,
    },
    {
        title: "Hazır Site Platformları",
        issues: ["Yabancı dil zorunluluğu", "Teknik karmaşa (Domain, Hosting)", "Kişisel destek eksikliği"],
        kepenkSolves: false,
    },
    {
        title: "Serbest Çalışanlar (Freelance)",
        issues: ["Sistemsizlik ve garantisizlik", "Aniden ortadan kaybolma riski", "Her iş için ayrı bütçe talebi"],
        kepenkSolves: false,
    },
    {
        title: "kepenk.ai Asistanı",
        issues: ["Aylık 399₺'den başlayan fiyatlar", "2 dakikada anında kurulum", "7/24 Kesintisiz çalışma & destek"],
        kepenkSolves: true,
    }
];

/**
 * ProblemSolutionSection Component
 * 
 * Displays a comparative matrix highlighting the pain points of alternative solutions
 * (agencies, DIY builders, freelancers) versus the benefits of kepenk.ai.
 *
 * @returns {JSX.Element} The rendered Problem/Solution section.
 */
export default function ProblemSolutionSection() {

    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        Neden <span className="text-rust">kepenk.ai</span>? Diğerlerinden Farkı Ne?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        Esnafın bütçesini ve zamanını yormayan, sorunsuz bir dijital ortaklık sunuyoruz.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
                    {comparisons.map((item, index) => {
                        const isKepenk = item.kepenkSolves;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                whileHover={{ 
                                    scale: isKepenk ? 1.05 : 1.02, 
                                    rotateY: index < 2 ? 5 : -5,
                                    rotateX: 5,
                                    z: isKepenk ? 50 : 20,
                                    transition: { duration: 0.3 }
                                }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                style={{ transformStyle: "preserve-3d" }}
                                className={`relative rounded-3xl p-6 md:p-8 border backdrop-blur-xl transition-all duration-300 flex flex-col ${isKepenk
                                    ? 'bg-gradient-to-br from-rust/20 via-orange-900/10 to-transparent border-rust/50 shadow-[0_10px_40px_rgba(220,70,30,0.2)] z-20'
                                    : 'bg-white/5 border-white/10 text-foreground z-10'
                                    }`}
                            >
                                {/* Light reflection sweep on hover */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%]" />
                                </div>

                                <h3 className={`relative z-10 text-xl font-syne font-bold mb-6 pb-4 border-b ${isKepenk ? 'border-rust/30 text-rust drop-shadow-md' : 'border-white/10 text-white'}`}>
                                    {item.title}
                                </h3>

                                <ul className="relative z-10 space-y-4 flex-grow font-lora">
                                    {item.issues.map((issue, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            {isKepenk ? (
                                                <CheckCircle2 className="w-5 h-5 text-rust shrink-0 mt-0.5 drop-shadow-sm" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                            )}
                                            <span className={isKepenk ? 'text-white font-medium' : 'text-muted-foreground-300'}>
                                                {issue}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
