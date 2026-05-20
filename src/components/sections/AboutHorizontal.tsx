"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * About section — vertical scroll-reveal stack.
 * (Previously a pinned horizontal scroll that caused the text to "vanish" at
 * unpin; replaced with predictable vertical reveals.)
 */
export default function AboutHorizontal() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = stackRef.current?.querySelectorAll(".about-card") ?? [];
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stackRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="py-14 sm:py-20">
      <div className="text-center mb-8">
        <span className="block text-[11px] tracking-[0.3em] uppercase text-rose/80 mb-3">
          {t.about.eyebrow}
        </span>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-ink"
        >
          {t.about.title}
        </SplitReveal>
      </div>

      <div ref={stackRef} className="flex flex-col gap-4">
        {t.about.paragraphs.map((p, i) => (
          <article
            key={i}
            className="about-card glass-frame rounded-2xl p-6 sm:p-7 flex flex-col gap-3"
          >
            <span className="brand-latin text-[11px] tracking-[0.3em] text-rose/80">
              {p.heading}
            </span>
            <p className="text-[15px] leading-[1.8] text-ink/80">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
