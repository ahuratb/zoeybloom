"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Drive Lenis from GSAP ticker so ScrollTrigger stays in sync
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger should listen to Lenis' scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh ScrollTrigger whenever lang flips (layout shifts in RTL)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("lang:change", refresh);

    return () => {
      window.removeEventListener("lang:change", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
