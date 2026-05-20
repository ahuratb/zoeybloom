"use client";

import { ElementType, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  /** Override start trigger position. Defaults to "top 80%". */
  start?: string;
};

/**
 * Reveals text with a staggered split animation.
 *
 * - English: splits by CHARS with a 3D rotateX reveal (preserves the existing
 *   editorial feel).
 * - Arabic: splits by WORDS only. Splitting Arabic by char shatters the
 *   contextual letter joining, so we keep each word intact and animate
 *   word-by-word with a softer vertical translate.
 *
 * Re-runs whenever `lang` flips so toggling EN ⇄ AR rebuilds the spans.
 */
export default function SplitReveal({
  as: Tag = "h2",
  children,
  className = "",
  start = "top 80%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { lang } = useLang();
  const text = typeof children === "string" ? children : "";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Clear any previously injected spans (handles lang switching).
      el.innerHTML = "";

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (lang === "ar") {
        // Split by WORDS — preserves Arabic letter joining.
        const words = text.split(/(\s+)/); // keep whitespace as separators
        words.forEach((token) => {
          if (token === "") return;
          if (/^\s+$/.test(token)) {
            el.appendChild(document.createTextNode(token));
            return;
          }
          const span = document.createElement("span");
          span.textContent = token;
          span.className = "split-token";
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          el.appendChild(span);
        });
      } else {
        // Split by CHARS — preserves the editorial 3D reveal for Latin.
        Array.from(text).forEach((ch) => {
          if (ch === " ") {
            el.appendChild(document.createTextNode(" "));
            return;
          }
          const span = document.createElement("span");
          span.textContent = ch;
          span.className = "split-token";
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          el.appendChild(span);
        });
      }

      const tokens = el.querySelectorAll(".split-token");
      if (!tokens.length) return;

      if (reduced) {
        gsap.set(tokens, { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      if (lang === "ar") {
        gsap.fromTo(
          tokens,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start, once: true },
          }
        );
      } else {
        gsap.fromTo(
          tokens,
          { opacity: 0, yPercent: 110, rotateX: -70 },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.025,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start, once: true },
          }
        );
      }
    },
    { dependencies: [lang, text, start] }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SplitTag = Tag as any;

  return (
    <SplitTag
      ref={ref}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`overflow-hidden ${className}`}
      style={{ perspective: lang === "ar" ? "none" : 1000 }}
    />
  );
}
