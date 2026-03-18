'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface WhatsAppButtonProps {
  /** WhatsApp number with country code (e.g. "905551234567") */
  phoneNumber: string
  /** Pre-filled message */
  defaultMessage?: string
  /** Business name for the chat header */
  businessName?: string
  /** Position */
  position?: 'bottom-right' | 'bottom-left'
}

export function WhatsAppButton({
  phoneNumber,
  defaultMessage = 'Merhaba, bilgi almak istiyorum.',
  businessName = 'İşletme',
  position = 'bottom-right',
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(defaultMessage)

  const positionClass =
    position === 'bottom-left' ? 'left-5 bottom-5' : 'right-5 bottom-5'

  const handleSend = () => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank')
    setIsOpen(false)
  }

  return (
    <div className={`fixed ${positionClass} z-50`}>
      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 rounded-2xl shadow-2xl overflow-hidden border border-[var(--site-border)]"
          >
            {/* Header */}
            <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{businessName}</p>
                <p className="text-white/70 text-xs">Genellikle birkaç dakika içinde yanıt verir</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat body */}
            <div className="bg-[#E5DDD5] p-4 min-h-[100px]">
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]">
                <p className="text-sm text-gray-800">
                  Merhaba! 👋 Size nasıl yardımcı olabiliriz?
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-1">Şimdi</p>
              </div>
            </div>

            {/* Input */}
            <div className="bg-white px-3 py-2 flex items-center gap-2 border-t border-gray-100">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#128C7E]"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center hover:bg-[#0fa898] transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:bg-[#22bf5b] transition-colors"
        aria-label="WhatsApp ile iletişime geç"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </motion.button>

      {/* Pulse ring */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 pointer-events-none" />
      )}
    </div>
  )
}
