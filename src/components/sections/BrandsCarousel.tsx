"use client";

import Image from "next/image";
import { ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSpring, animated } from "@react-spring/web";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";
import BrowserFrame from "@/components/ui/BrowserFrame";
import SoliduSite from "@/components/ui/SoliduSite";
import ClaralineSite from "@/components/ui/ClaralineSite";
import EyenlipSite from "@/components/ui/EyenlipSite";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type BrandMeta = {
  /** Custom logo image (optional). */
  logo?: { src: string; width: number; height: number; alt: string; className?: string };
  /** Site preview rendered inside the BrowserFrame. */
  preview: ReactNode;
  /** URL shown in the chrome strip. */
  url: string;
};

const META: Record<string, BrandMeta> = {
  SOLIDU: {
    logo: {
      src: "/solidu-logo.png",
      width: 220,
      height: 360,
      alt: "SOLIDU",
      className: "h-16 sm:h-20 w-auto object-contain",
    },
    preview: <SoliduSite />,
    url: "solidu.com",
  },
  CLARALINE: {
    logo: {
      src: "/claraline-logo.png",
      width: 580,
      height: 110,
      alt: "CLARALINE",
      className: "h-7 sm:h-8 w-auto object-contain",
    },
    preview: <ClaralineSite />,
    url: "claraline.com",
  },
  EYENLIP: {
    preview: <EyenlipSite />,
    url: "eyenlip.com",
  },
};

function BrandCard({
  name,
  label,
  description,
  gradient,
  index,
  exploreLabel,
}: {
  name: string;
  label: string;
  description: string;
  gradient: string;
  index: number;
  exploreLabel: string;
}) {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    config: { tension: 220, friction: 18 },
  }));

  const meta = META[name];

  return (
    <animated.article
      onMouseEnter={() => api.start({ scale: 1.02, rotateX: 2, rotateY: -1.2 })}
      onMouseLeave={() => api.start({ scale: 1, rotateX: 0, rotateY: 0 })}
      style={{
        transform: spring.scale.to(
          (s) =>
            `perspective(900px) rotateX(${spring.rotateX.get()}deg) rotateY(${spring.rotateY.get()}deg) scale(${s})`
        ),
      }}
      className={`brand-card relative overflow-hidden rounded-3xl p-6 sm:p-7
                  bg-gradient-to-br ${gradient}
                  border border-white/60
                  shadow-[0_20px_50px_-20px_rgba(232,69,107,0.18)]
                  backdrop-blur-xl`}
      data-cursor-hover
    >
      {/* index pill */}
      <span className="absolute top-5 end-5 brand-latin text-[10px] tracking-[0.2em] text-ink/40">
        0{index + 1} / 03
      </span>

      <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/55 mb-3">
        {label}
      </span>

      {/* Brand logo or fallback wordmark */}
      <div className="mb-4 flex items-center min-h-[44px]" dir="ltr">
        {meta?.logo ? (
          <Image
            src={meta.logo.src}
            alt={meta.logo.alt}
            width={meta.logo.width}
            height={meta.logo.height}
            className={meta.logo.className}
          />
        ) : (
          <h3 className="brand-latin font-display text-[2.4rem] sm:text-[2.8rem] leading-none text-ink">
            {name}
          </h3>
        )}
      </div>

      <p className="text-[14px] leading-relaxed text-ink/65 max-w-[34ch] mb-5">
        {description}
      </p>

      {/* Mac browser preview */}
      {meta ? (
        <BrowserFrame url={meta.url} aspect="aspect-[16/10]" className="mb-4">
          {meta.preview}
        </BrowserFrame>
      ) : null}

      <a
        href={`https://${meta?.url ?? ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[12px] text-rose/90 tracking-wide hover:text-rose transition-colors"
      >
        <span>{exploreLabel}</span>
        <svg
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
          aria-hidden
          className="rtl:scale-x-[-1]"
        >
          <path
            d="M1 5h17m0 0L14 1m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </a>

      {/* corner shine */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -end-10 w-40 h-40 bg-white/40 rounded-full blur-2xl"
      />
    </animated.article>
  );
}

export default function BrandsCarousel() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = stackRef.current?.querySelectorAll(".brand-card") ?? [];
      if (!cards.length) return;
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stackRef.current!,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="brands" className="py-14 sm:py-20">
      <div className="text-center mb-10">
        <span className="block text-[11px] tracking-[0.3em] uppercase text-rose/80 mb-3">
          {t.brands.eyebrow}
        </span>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-ink"
        >
          {t.brands.title}
        </SplitReveal>
      </div>

      <div ref={stackRef} className="flex flex-col gap-6">
        {t.brands.items.map((b, i) => (
          <BrandCard
            key={b.name}
            index={i}
            exploreLabel={t.brands.exploreLabel}
            {...b}
          />
        ))}
      </div>
    </section>
  );
}
