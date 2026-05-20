"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Leaflet uses `window` — client only
const KuwaitTileMap = dynamic(() => import("@/components/ui/KuwaitTileMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-petal/40 to-blush/30 animate-pulse" />
  ),
});

export default function KuwaitMap() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !frameRef.current) return;

      gsap.fromTo(
        frameRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="map" className="py-14 sm:py-20">
      <div className="text-center mb-8">
        <p className="text-rose font-medium text-[11px] tracking-[0.3em] uppercase mb-3">
          ✦ {t.map.eyebrow}
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-ink"
        >
          {t.map.title}
        </SplitReveal>
        <p className="text-ink/60 mt-3 max-w-[420px] mx-auto text-[14.5px]">
          {t.map.subtitle}
        </p>
      </div>

      {/* Map frame */}
      <div
        ref={frameRef}
        className="relative aspect-[1/1.05] rounded-3xl overflow-hidden border border-white/60
                   shadow-[0_30px_60px_-25px_rgba(232,69,107,0.25)]"
      >
        {/* key re-mounts the map on lang switch */}
        <KuwaitTileMap key={lang} />

        {/* Pink vignette ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,143,171,0.45), inset 0 -40px 80px -40px rgba(232,69,107,0.18)",
          }}
        />
      </div>

      <p className="mt-4 text-center text-[12px] tracking-[0.2em] uppercase text-ink/45">
        {t.map.officeLabel}
      </p>
    </section>
  );
}
