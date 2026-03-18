'use client'

import { Bot, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AICTABanner() {
  return (
    <section className="my-16">
      <div className="relative bg-[#0F0F1A] rounded-2xl p-8 md:p-12 text-center overflow-hidden border border-white/[0.06]">
        {/* Dotted pattern */}
        <div className="absolute inset-0 dotted-bg opacity-40" />

        <div className="relative z-10">
          <Bot className="w-10 h-10 text-rust mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Hazır Şablon İstemiyor Musun?
          </h2>
          <p className="text-sm md:text-base text-white/50 mb-6 max-w-md mx-auto">
            AI&apos;mız sana özel bir site saniyeler içinde oluştursun.
            Sektörünü seç, gerisini bize bırak.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-rust hover:bg-rust/90 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all group"
          >
            AI ile Tasarım Oluştur
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
