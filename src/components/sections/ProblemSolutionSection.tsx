"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Standard interface for comparison items between traditional methods and XINXIA.
 */
interface ComparisonItem {
    title: string;
    issues: string[];
    xinxiaSolves: boolean;
}

/**
 * Static data array defining the comparisons. 
 * Extracted outside the component to avoid unnecessary re-allocations on render.
 */
const comparisons: ComparisonItem[] = [
    {
        title: "Geleneksel Ajanslar",
        issues: ["7.000 - 18.000₺ aylık maliyet", "Yavaş süreç ve bürokrasi", "Sadece 09:00 - 18:00 arası müsaitlik"],
        xinxiaSolves: false,
    },
    {
        title: "Hazır Site Platformları (Wix vb.)",
        issues: ["Yabancı dil zorunluluğu", "Teknik karmaşa (Domain, Hosting)", "Kişisel destek eksikliği"],
        xinxiaSolves: false,
    },
    {
        title: "Serbest Çalışanlar (Freelance)",
        issues: ["Sistemsizlik ve garantisizlik", "Aniden ortadan kaybolma riski", "Her iş için ayrı bütçe talebi"],
        xinxiaSolves: false,
    },
    {
        title: "XINXIA v5.0 Asistanı",
        issues: ["Aylık 399₺'den başlayan fiyatlar", "2 dakikada anında kurulum", "7/24 Kesintisiz çalışma & destek"],
        xinxiaSolves: true,
    }
];

/**
 * ProblemSolutionSection Component
 * 
 * Displays a comparative matrix highlighting the pain points of alternative solutions
 * (agencies, DIY builders, freelancers) versus the benefits of XINXIA v5.0.
 *
 * @returns {JSX.Element} The rendered Problem/Solution section.
 */
export default function ProblemSolutionSection() {

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-primary-900 mb-4"
                    >
                        Neden <span className="text-secondary-500">XINXIA</span>? Diğerlerinden Farkı Ne?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600"
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
                            className={`rounded-2xl p-6 border ${item.xinxiaSolves
                                ? 'bg-primary-900 border-primary-900 text-white shadow-xl transform scale-105 z-10'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-6 pb-4 border-b ${item.xinxiaSolves ? 'border-blue-800' : 'border-slate-200'}`}>
                                {item.title}
                            </h3>

                            <ul className="space-y-4">
                                {item.issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        {item.xinxiaSolves ? (
                                            <CheckCircle2 className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        )}
                                        <span className={item.xinxiaSolves ? 'text-blue-50' : 'text-slate-600'}>
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
