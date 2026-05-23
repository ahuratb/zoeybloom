"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const GLOWS = [
  // Top region — spread across full viewport width with vw units
  { id: 1, size: 380, top: "5%",  left: "5vw",  color: "#FFB8C4", opacity: 0.20, blur: 90  },
  { id: 2, size: 260, top: "15%", left: "75vw", color: "#FFD4D8", opacity: 0.24, blur: 70  },
  { id: 3, size: 200, top: "30%", left: "40vw", color: "#FFE8E5", opacity: 0.28, blur: 60  },
  // Middle region
  { id: 4, size: 420, top: "45%", left: "-5vw", color: "#FFB8C4", opacity: 0.18, blur: 100 },
  { id: 5, size: 300, top: "55%", left: "80vw", color: "#FFC4CC", opacity: 0.22, blur: 85  },
  { id: 6, size: 180, top: "65%", left: "30vw", color: "#FFD4D8", opacity: 0.26, blur: 55  },
  // Bottom region
  { id: 7, size: 350, top: "78%", left: "60vw", color: "#FFB8C4", opacity: 0.18, blur: 95  },
  { id: 8, size: 240, top: "88%", left: "8vw",  color: "#FFE8E5", opacity: 0.24, blur: 65  },
  { id: 9, size: 160, top: "95%", left: "50vw", color: "#FFC4CC", opacity: 0.26, blur: 50  },
];

export default function AmbientGlows() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const orbs = containerRef.current.querySelectorAll(".glow-orb");

      orbs.forEach((orb, i) => {
        // 1. Very subtle idle drift — barely noticeable when not scrolling
        const idleRange = 10 + Math.random() * 8;
        const idleDuration = 25 + Math.random() * 12;
        const idleAngle = Math.random() * Math.PI * 2;

        gsap.to(orb, {
          x: `+=${Math.cos(idleAngle) * idleRange}`,
          y: `+=${Math.sin(idleAngle) * idleRange}`,
          duration: idleDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Gentle opacity breath
        gsap.to(orb, {
          opacity: "+=0.04",
          duration: idleDuration * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });

        // 2. Prominent scroll-driven motion — the real movement
        const scrollRangeX = (Math.random() - 0.5) * 200;
        const scrollRangeY = (Math.random() - 0.5) * 250;

        gsap.to(orb, {
          x: `+=${scrollRangeX}`,
          y: `+=${scrollRangeY}`,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 + i * 0.3,
            invalidateOnRefresh: true,
          },
        });

        // Subtle scale variation on scroll
        gsap.to(orb, {
          scale: 1 + (Math.random() * 0.2 + 0.1),
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      });

      // Refresh after a tick to capture full rendered page height
      const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(timer);
    },
    { dependencies: [mounted] }
  );

  if (!mounted) return null;

  const activeGlows = isMobile ? GLOWS.filter((_, i) => i % 2 === 0) : GLOWS;

  // Portal renders directly into document.body — bypasses any parent
  // element transforms that would break position:fixed containment.
  // z-index: -1 keeps glows below all page content while staying above
  // the html canvas background, so backdrop-filter on glass cards works.
  return createPortal(
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {activeGlows.map((glow) => (
        <div
          key={glow.id}
          className="glow-orb"
          style={{
            position: "absolute",
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            top: glow.top,
            left: glow.left,
            backgroundColor: glow.color,
            opacity: glow.opacity,
            filter: `blur(${glow.blur}px)`,
            borderRadius: "50%",
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        />
      ))}
    </div>,
    document.body
  );
}
