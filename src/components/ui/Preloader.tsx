"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Minimal preloader: simulated progress climbs ease-out to ~92%, then sprints
 * to 100 % once window.load fires. After hitting 100% (and a minimum dwell of
 * ~900ms) it fades out and unmounts. Locks body scroll while visible.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  // Refs used inside the RAF loop so we don't go stale on re-renders.
  const progressRef = useRef(0);
  const loadedRef = useRef(false);
  const startRef = useRef(0);
  const fadeStartedRef = useRef(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const MIN_VISIBLE_MS = 900;

    startRef.current = performance.now();
    let raf = 0;

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startRef.current;

      let next = progressRef.current;
      if (!loadedRef.current) {
        // Ease-out climb toward 92%
        const target = 92 * (1 - Math.exp(-elapsed / 850));
        if (target > next) next = target;
      } else {
        // Sprint toward 100%
        next = next + Math.max(0.7, (100 - next) * 0.16);
        if (next > 100) next = 100;
      }

      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }

      const dwell = now - startRef.current;
      const finished =
        loadedRef.current && progressRef.current >= 99.5 && dwell >= MIN_VISIBLE_MS;

      if (finished && !fadeStartedRef.current) {
        fadeStartedRef.current = true;
        progressRef.current = 100;
        setProgress(100);
        setFading(true);
        window.setTimeout(() => setVisible(false), 600);
        return; // stop RAF
      }

      raf = requestAnimationFrame(tick);
    };

    const handleLoad = () => {
      loadedRef.current = true;
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Release scroll lock once we hide
  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      aria-hidden={fading}
      role="status"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-cream
                  transition-opacity duration-500 ease-out
                  ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-petal/40 to-cream"
      />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-pink/20 rounded-full blur-3xl -z-10"
      />

      <div className="flex flex-col items-center gap-7 px-8 w-full max-w-[420px]">
        <Image
          src="/zoeybloom-logo.png"
          alt="ZoeyBloom"
          width={260}
          height={66}
          priority
          className="h-14 sm:h-16 w-auto object-contain opacity-90"
        />

        <div className="w-full">
          <div
            className="relative h-[3px] w-full rounded-full bg-ink/10 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-rose"
              style={{
                width: `${pct}%`,
                transition: "width 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between brand-latin text-[11px] tracking-[0.18em] uppercase text-ink/60">
            <span>Loading</span>
            <span>{pct.toString().padStart(2, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
