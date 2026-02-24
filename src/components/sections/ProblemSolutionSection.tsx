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
        title: "Hazır Site Platformları (Wix vb.)",
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
        <section className="py-20 bg-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-ink mb-4"
                    >
                        Neden <span className="text-rust">kepenk.ai</span>? Diğerlerinden Farkı Ne?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-stone"
                    >
                        Esnafın bütçesini ve zamanını yormayan, sorunsuz bir dijital ortaklık sunuyoruz.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {comparisons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-2xl p-6 border ${item.kepenkSolves
                                ? 'bg-steel border-steel text-cream shadow-xl transform scale-105 z-10'
                                : 'bg-warm border-warm text-ink'
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-6 pb-4 border-b ${item.kepenkSolves ? 'border-ink/20' : 'border-stone-light/20'}`}>
                                {item.title}
                            </h3>

                            <ul className="space-y-4">
                                {item.issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        {item.kepenkSolves ? (
                                            <CheckCircle2 className="w-5 h-5 text-rust shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-stone-light shrink-0 mt-0.5" />
                                        )}
                                        <span className={item.kepenkSolves ? 'text-cream/90' : 'text-stone'}>
                                            {issue}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
