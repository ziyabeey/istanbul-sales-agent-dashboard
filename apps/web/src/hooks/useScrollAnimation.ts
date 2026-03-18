"use client";

import { useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Section viewport'a girdiğinde animasyon tetikler.
 */
export function useSectionInView(threshold = 0.2, once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });
  return { ref, isInView };
}

/**
 * Scroll ilerlemesine bağlı transform.
 */
export function useScrollProgress(
  offset: ["start end" | "start start" | "end start" | "end end" | "center center", "start end" | "start start" | "end start" | "end end" | "center center"] = ["start end", "end start"]
) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  return { ref, scrollYProgress };
}

/**
 * Parallax efekti — scroll'a bağlı dikey kayma.
 */
export function useParallax(speed = -50) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return { ref, y };
}

/**
 * Scroll'a bağlı opacity (fade-in/fade-out).
 */
export function useScrollFade() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, 0]);
  return { ref, opacity, y };
}
