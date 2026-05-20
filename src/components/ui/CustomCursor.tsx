"use client";

import { useCursor } from "@/hooks/useCursor";

export default function CustomCursor() {
  const { x, y, hovering, enabled } = useCursor();
  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="custom-cursor pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
    >
      {/* Outer ring */}
      <div
        className="absolute rounded-full border border-white transition-[width,height,opacity,transform] duration-200 ease-out"
        style={{
          left: x,
          top: y,
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 0.85 : 0.55,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Inner dot */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          left: x,
          top: y,
          width: hovering ? 4 : 6,
          height: hovering ? 4 : 6,
          transform: "translate(-50%, -50%)",
          transition: "width 150ms ease, height 150ms ease",
        }}
      />
    </div>
  );
}
