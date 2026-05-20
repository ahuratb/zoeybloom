"use client";

import { ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** Tailwind class string applied to the wrapper. */
  className?: string;
  /** Stagger delay between direct children (if many). */
  stagger?: number;
  /** Pixels of vertical offset on enter. */
  y?: number;
  /** ScrollTrigger start. */
  start?: string;
  /** Trigger once or repeat. */
  once?: boolean;
  /** When provided, applies the reveal to direct children individually
   *  (lets you reveal a list with one stagger). */
  splitChildren?: boolean;
};

export default function RevealOnScroll({
  children,
  className = "",
  stagger = 0.1,
  y = 28,
  start = "top 85%",
  once = true,
  splitChildren = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = splitChildren ? Array.from(el.children) : [el];

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
