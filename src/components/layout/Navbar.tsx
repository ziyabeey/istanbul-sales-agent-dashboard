"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Özellikler", href: "#features" },
        { label: "Fiyatlar", href: "#pricing" },
        { label: "Hakkımızda", href: "#footer" }
    ];

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-secondary-500 rounded flex items-center justify-center font-bold text-white shadow-sm">
                            X
                        </div>
                        <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                            XINXIA <span className="text-secondary-500 text-sm align-top ml-0.5">v5</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="text-sm font-medium text-slate-600 hover:text-secondary-500 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/admin" passHref legacyBehavior>
                            <a className="text-sm font-medium text-slate-600 hover:text-secondary-500 transition-colors cursor-pointer">
                                Giriş Yap
                            </a>
                        </Link>
                        <Link href="/onboarding" passHref legacyBehavior>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="primary" size="sm">
                                    Ücretsiz Başla
                                </Button>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-secondary-500 focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden h-screen top-[60px]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col items-center py-6 space-y-6 z-50 md:hidden overflow-hidden"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    className="text-lg font-medium text-slate-800 hover:text-secondary-500 w-full text-center py-2"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="w-full h-px bg-slate-100 max-w-[200px]" />
                            <Link href="/admin" passHref legacyBehavior>
                                <a
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-800 hover:text-secondary-500 cursor-pointer"
                                >
                                    Giriş Yap
                                </a>
                            </Link>
                            <Link href="/onboarding" passHref legacyBehavior>
                                <a onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" size="lg" className="w-[200px]">
                                        Ücretsiz Başla
                                    </Button>
                                </a>
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
