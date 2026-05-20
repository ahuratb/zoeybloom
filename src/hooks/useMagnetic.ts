"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

/**
 * Pulls an element toward the cursor when within `radius` px.
 * Disabled on touch / no-hover devices.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  { strength = 0.35, radius = 110 }: { strength?: number; radius?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < radius) {
          gsap.to(el, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.45,
            ease: "power3.out",
          });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        }
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [ref, strength, radius]);
}
