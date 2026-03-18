'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function AsansorPanoramikPremiumPlus() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Custom Magnetic Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove)

    const animateCursor = () => {
      // Magnetic ease (lerp)
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      }
      requestAnimationFrame(animateCursor)
    }
    
    animateCursor()

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Canvas 3D Elevator Shaft Parallax
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    const onScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Abstract "Lines" representing the elevator shaft structure
    const lines: { x: number, z: number, speed: number, alpha: number }[] = []
    for (let i = 0; i < 50; i++) {
      lines.push({
        x: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        speed: 1 + Math.random() * 3,
        alpha: Math.random() * 0.5 + 0.1
      })
    }

    let time = 0
    let currentScroll = 0

    const render = () => {
      // Lerp scroll for smooth parallax
      currentScroll += (window.scrollY - currentScroll) * 0.05
      
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, width, height)

      time += 0.01

      // Draw the "shaft"
      ctx.save()
      ctx.translate(width / 2, height / 2)
      
      // Rotate slowly for dramatic effect
      ctx.rotate(Math.sin(time * 0.2) * 0.05)

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!
        
        // Movement is driven by time AND scroll position (Parallax)
        let virtualY = (time * line.speed * 50 + currentScroll * line.speed) % 2000
        if (virtualY < 0) virtualY += 2000
        
        // 3D Perspective projection
        const scale = 500 / (line.z + 100)
        const px = line.x * scale
        
        // Vertical lines moving downwards gives illusion of ASCENDING
        const yStart = (virtualY - 1000) * scale
        const yEnd = ((virtualY - 1000) + 200) * scale

        ctx.beginPath()
        ctx.moveTo(px, yStart)
        ctx.lineTo(px, yEnd)
        
        // Glow effect
        ctx.strokeStyle = `rgba(14, 165, 233, ${line.alpha * scale})` // Sky blue glow
        ctx.lineWidth = 2 * scale
        ctx.shadowBlur = 15 * scale
        ctx.shadowColor = '#0ea5e9'
        ctx.stroke()
      }
      ctx.restore()

      // Overlay Vignette
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2)
      gradient.addColorStop(0, 'rgba(5,5,5,0)')
      gradient.addColorStop(1, 'rgba(5,5,5,0.95)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="relative bg-[#050505] text-white font-sans min-h-[300vh] cursor-none overflow-x-hidden">
      
      {/* MAGENTIC CURSOR */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-sky-400 rounded-full pointer-events-none z-[100] mix-blend-screen transition-all duration-300 ease-out flex items-center justify-center bg-sky-400/10 backdrop-blur-sm"
      >
        <div className="w-1.5 h-1.5 bg-sky-300 rounded-full"></div>
      </div>

      {/* WEBGL/CANVAS BACKGROUND */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* FLOATING NAVIGATION */}
      <header className="fixed top-0 w-full z-50 p-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter">O R I O N</div>
          <div className="text-xs font-medium tracking-[0.3em] uppercase opacity-70">
            Panoramik Cam Sistemleri
          </div>
        </div>
      </header>

      {/* CONTENT LAYERS */}
      <main className="relative z-10">
        
        {/* HERO */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center" style={{ transform: `translateY(${scrollY * -0.5}px)`, opacity: 1 - scrollY / 800 }}>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-none mb-6">
              ASCEND
            </h1>
            <p className="text-xl md:text-2xl font-light text-sky-200/60 max-w-2xl mx-auto tracking-wide">
              Yer çekimine meydan okuyan, mimariyle bütünleşen şeffaf dikey yolculuklar.
            </p>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.5em] text-white/30 uppercase flex flex-col items-center gap-4">
             Keşfedin
             <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </section>

        {/* PARALLAX SECTIONS */}
        <section className="min-h-screen relative flex items-center py-32 px-6">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
            
            <div className="relative">
              {/* Glassmorphic Parallax Card */}
              <div 
                className="w-full aspect-[3/4] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
                style={{ transform: `translateY(${(scrollY - 800) * 0.2}px)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full flex items-center justify-center p-4">
                   <div className="w-full h-full border border-sky-400/30 rounded-full animate-[spin_10s_linear_infinite] border-t-sky-400 border-l-transparent"></div>
                </div>
                <div className="absolute bottom-8 left-8 text-sm font-light text-white/50 tracking-widest uppercase">
                  %100 Şeffaflık
                </div>
              </div>
            </div>

            <div className="space-y-8" style={{ transform: `translateY(${(scrollY - 800) * -0.1}px)` }}>
               <h2 className="text-5xl md:text-7xl font-light tracking-tight">Sınırları <br/> <b className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-white">Kaldırın.</b></h2>
               <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
                 Kuyu gerektirmeyen self-supporting cam şaft panelleri ile, villanızın veya rezidansınızın tam ortasında dikey ve kesintisiz bir vizyon yaratıyoruz. 
               </p>
               
               <div className="pt-8 flex flex-col gap-6">
                  {[
                    { title: 'Sessiz Tahrik Sistemi', val: '< 40dB' },
                    { title: 'Panoramik Görüş', val: '360°' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-end gap-6 border-b border-white/10 pb-4">
                       <div className="text-4xl lg:text-5xl font-light text-sky-400">{stat.val}</div>
                       <div className="text-sm tracking-widest text-white/40 uppercase pb-1.5">{stat.title}</div>
                    </div>
                  ))}
               </div>
            </div>
            
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="text-center z-10 mix-blend-difference">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 hover:text-sky-400 transition-colors duration-500 cursor-none">
              Projenizi Yükseltin
            </h2>
            <button className="text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-500 cursor-none">
              Özel Tasarım Talebi
            </button>
          </div>
        </section>

      </main>
    </div>
  )
}
