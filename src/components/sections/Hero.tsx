"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";
import MagneticButton from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const HeroBloom = dynamic(() => import("@/components/three/HeroBloom"), {
  ssr: false,
  loading: () => (
    <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]" />
  ),
});

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Bloom: parallax up at 0.3× scroll speed
      if (bloomRef.current && sectionRef.current) {
        gsap.fromTo(
          bloomRef.current,
          { yPercent: 0 },
          {
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Subtitle + CTAs entrance
      gsap.fromTo(
        [subRef.current, ctasRef.current?.children ?? []],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-28 pb-14 text-center"
    >
      {/* Falling petal particles — absolute background */}
      <ParticleField />

      {/* 3D Bloom — the centrepiece */}
      <div
        ref={bloomRef}
        className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] mb-2"
        aria-hidden
      >
        <HeroBloom />
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] tracking-[0.18em] uppercase text-ink/70 mb-5">
        <span>{t.hero.eyebrow}</span>
      </div>

      {/* Headline */}
      <SplitReveal
        as="h1"
        className="font-display text-[clamp(2.4rem,7.5vw,3.6rem)] leading-[1.05] tracking-tight text-ink px-2"
      >
        {t.hero.title}
      </SplitReveal>

      {/* Subtitle */}
      <p
        ref={subRef}
        className="mt-5 max-w-[420px] text-[15px] sm:text-base leading-relaxed text-ink/60"
      >
        {t.hero.subtitle}
      </p>

      {/* CTAs */}
      <div ref={ctasRef} className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <MagneticButton
          onClick={() => {
            const el = document.getElementById("brands");
            if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-full bg-rose text-white text-sm font-medium
                     shadow-[0_12px_28px_-10px_rgba(232,69,107,0.55)] hover:bg-rose/90 transition-colors"
        >
          {t.hero.primaryCta}
        </MagneticButton>
        <MagneticButton
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-white/70
                     text-ink text-sm font-medium hover:bg-white transition-colors"
        >
          {t.hero.secondaryCta}
        </MagneticButton>
      </div>

      {/* Scroll hint */}
      <div className="mt-10 sm:mt-14 flex flex-col items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ink/40">
        <span className="block w-px h-10 bg-gradient-to-b from-transparent via-ink/30 to-transparent" />
        {t.hero.scrollHint}
      </div>
    </section>
  );
}
