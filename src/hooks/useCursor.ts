"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  hovering: boolean;
  enabled: boolean;
};

/**
 * Tracks mouse with lerp + hovering state over interactive elements.
 * Returns enabled=false on touch / coarse pointers.
 */
export function useCursor() {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    hovering: false,
    enabled: false,
  });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((s) => ({ ...s, enabled: true }));

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const hov = !!el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      setState((s) => (s.hovering === hov ? s : { ...s, hovering: hov }));
    };

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      setState((s) =>
        s.x === current.current.x && s.y === current.current.y
          ? s
          : { ...s, x: current.current.x, y: current.current.y }
      );
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return state;
}
