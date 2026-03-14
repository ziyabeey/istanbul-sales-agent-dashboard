'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export interface ChatMessage {
    musteri?: string
    ai?: string
}

interface WhatsAppMockupProps {
    messages: ChatMessage[]
    delayMultiplier?: number
}

export function WhatsAppMockup({ messages, delayMultiplier = 1 }: WhatsAppMockupProps) {
    const [visibleMessages, setVisibleMessages] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Otomatik kayma efekti için observer
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let count = 0
                    const interval = setInterval(() => {
                        if (count < messages.length * 2) {
                            setVisibleMessages(count + 1)
                            count++
                        } else {
                            clearInterval(interval)
                        }
                    }, 1200 * delayMultiplier)

                    return () => clearInterval(interval)
                }
            },
            { threshold: 0.3 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [messages, delayMultiplier])

    const renderMsgs = () => {
        const flatMsgs: { type: 'in' | 'out', text: string }[] = []
        messages.forEach(m => {
            if (m.musteri) flatMsgs.push({ type: 'in', text: m.musteri })
            if (m.ai) flatMsgs.push({ type: 'out', text: m.ai })
        })
        return flatMsgs
    }

    const mList = renderMsgs()

    return (
        <div ref={containerRef} className="w-[300px] sm:w-[320px] h-[580px] bg-[#0b141a] rounded-[2.5rem] border-[8px] border-border p-2 shadow-2xl relative overflow-hidden mx-auto flex flex-col">

            {/* Dynamic Island / Top Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-24 h-5 bg-stone rounded-b-xl"></div>
            </div>

            {/* WA Header */}
            <div className="bg-[#202c33] px-4 pt-8 pb-3 flex items-center gap-3 rounded-t-[2rem] shadow-sm z-10 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                </div>
                <div>
                    <h4 className="text-white text-sm font-semibold">kepenk.ai Asistanı</h4>
                    <p className="text-[#8696a0] text-xs">çevrimiçi</p>
                </div>
            </div>

            {/* Chat Body & Background */}
            <div className="flex-1 bg-[#0b141a] relative overflow-y-auto scrollbar-hide px-3 py-4 flex flex-col gap-3">

                {/* WA Background Pattern (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                {mList.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={visibleMessages > idx ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={"max-w-[85%] rounded-lg p-2.5 text-[13px] leading-snug break-words " + (msg.type === 'in' ? 'bg-[#202c33] text-foreground self-start rounded-tl-sm' : 'bg-[#005c4b] text-[#e9edef] self-end rounded-tr-sm')}
                    >
                        {msg.text}
                        <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                            <span className="text-[9px]">10:{42 + idx}</span>
                            {msg.type === 'out' && (
                                <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53bdeb]"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                            )}
                        </div>
                    </motion.div>
                ))}

                { /* Yazıyor... Animasyonu */}
                {visibleMessages > 0 && visibleMessages < mList.length && mList[visibleMessages]?.type === 'out' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#202c33] text-foreground self-start rounded-full px-4 py-2 text-xs flex gap-1 items-center"
                    >
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-stone rounded-full" />
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-stone rounded-full" />
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-stone rounded-full" />
                    </motion.div>
                )}

            </div>

            {/* WA Footer */}
            <div className="bg-[#202c33] px-3 py-2 flex gap-2 items-center rounded-b-[2rem] z-10 relative">
                <div className="w-8 h-8 rounded-full bg-[#2a3942] flex items-center justify-center shrink-0">➕</div>
                <div className="flex-1 bg-[#2a3942] rounded-full h-10 px-4 flex items-center text-muted-foreground text-sm">Mesaj yazın...</div>
                <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center shrink-0 text-white">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
                </div>
            </div>

        </div >
    )
}
