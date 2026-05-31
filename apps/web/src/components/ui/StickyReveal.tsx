"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface StickyRevealItem {
  title: string;
  description: string;
  visual: React.ReactNode;
  accent?: string;
}

interface StickyRevealProps {
  items: StickyRevealItem[];
  className?: string;
}

/**
 * Apple-style sticky reveal: sol tarafta metin YAPIŞIR,
 * sağ tarafta görseller scroll ile değişir.
 */
export default function StickyReveal({ items, className = "" }: StickyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${(items.length + 0.5) * 100}vh` }}
      className={`relative ${className}`}
    >
      {items.map((item, i) => {
        const start = i / items.length;
        const end = (i + 1) / items.length;

        return (
          <StickyRevealItemComponent
            key={i}
            item={item}
            index={i}
            progress={scrollYProgress}
            rangeStart={start}
            rangeEnd={end}
            isLast={i === items.length - 1}
          />
        );
      })}
    </div>
  );
}

function StickyRevealItemComponent({
  item,
  index,
  progress,
  rangeStart,
  rangeEnd,
  isLast,
}: {
  item: StickyRevealItem;
  index: number;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  isLast: boolean;
}) {
  const opacity = useTransform(
    progress,
    [rangeStart, rangeStart + 0.08, rangeEnd - 0.08, rangeEnd],
    [index === 0 ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const y = useTransform(progress, [rangeStart, rangeStart + 0.15], [index === 0 ? 0 : 60, 0]);

  return (
    <motion.div style={{ opacity, y, willChange: 'transform, opacity' }} className="sticky top-0 h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Sol: Metin */}
        <div>
          {item.accent && (
            <div
              className="w-12 h-1 rounded-full mb-6"
              style={{ backgroundColor: item.accent }}
            />
          )}
          <motion.span
            className="text-sm font-mono uppercase tracking-[0.2em] mb-4 block"
            style={{ color: item.accent || "var(--color-primary, #6366f1)" }}
          >
            0{index + 1}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-syne leading-tight">
            {item.title}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
            {item.description}
          </p>
        </div>
        {/* Sağ: Görsel */}
        <div className="flex justify-center">{item.visual}</div>
      </div>
    </motion.div>
  );
}
