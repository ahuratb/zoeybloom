"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = sectionRef.current?.querySelectorAll(".philosophy-card") ?? [];
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { clipPath: "inset(0 0% 0 0)", opacity: 1, y: 0 });
        return;
      }

      const startClip = dir === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
      gsap.set(cards, { clipPath: startClip, opacity: 0, y: 24 });

      gsap.to(cards, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [dir] }
  );

  return (
    <section ref={sectionRef} id="philosophy" className="py-14 sm:py-20">
      <div className="text-center mb-10">
        <span className="block text-[11px] tracking-[0.3em] uppercase text-rose/80 mb-3">
          {t.philosophy.eyebrow}
        </span>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-ink"
        >
          {t.philosophy.title}
        </SplitReveal>
      </div>

      <div className="flex flex-col gap-4">
        {t.philosophy.items.map((p) => (
          <article
            key={p.title}
            className="philosophy-card glass-frame rounded-2xl p-6 sm:p-7
                       flex items-start gap-5"
            data-cursor-hover
          >
            <span className="brand-latin font-display text-[2.6rem] leading-none text-rose/80 shrink-0">
              {p.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-[1.35rem] text-ink leading-snug">
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-ink/65">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
