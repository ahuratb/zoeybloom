"use client";

import { useLang } from "@/hooks/useLang";

function FlagKW() {
  return (
    <span
      aria-hidden
      className="inline-block w-[18px] h-[12px] rounded-[2px] overflow-hidden ring-1 ring-black/10 shrink-0"
    >
      <svg viewBox="0 0 18 12" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" width="18" height="4" fill="#007A3D" />
        <rect y="4" width="18" height="4" fill="white" />
        <rect y="8" width="18" height="4" fill="#CE1126" />
        {/* Black trapezoid on hoist — the defining mark of the Kuwait flag */}
        <polygon points="0,0 6,0 4,6 6,12 0,12" fill="black" />
      </svg>
    </span>
  );
}

function FlagUS() {
  return (
    <span
      aria-hidden
      className="relative inline-block w-[18px] h-[12px] rounded-[2px] overflow-hidden ring-1 ring-black/10 shrink-0"
    >
      {/* 13 alternating stripes */}
      <span className="absolute inset-0 grid grid-rows-[repeat(13,minmax(0,1fr))]">
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className={i % 2 === 0 ? "bg-[#B22234]" : "bg-white"}
          />
        ))}
      </span>
      {/* Canton */}
      <span className="absolute top-0 left-0 w-[8px] h-[7px] bg-[#3C3B6E]" />
    </span>
  );
}

export default function LangToggle() {
  const { lang, toggle } = useLang();
  const isEN = lang === "en";

  return (
    <button
      onClick={toggle}
      aria-label={isEN ? "Switch language to Arabic" : "Switch language to English"}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
                 bg-white/70 border border-white/70 text-ink/80 hover:text-rose
                 hover:bg-white transition-colors text-[12px] tracking-[0.08em]"
      dir="ltr"
    >
      {isEN ? (
        <>
          <FlagKW />
          <span className="font-semibold">عربي</span>
        </>
      ) : (
        <>
          <FlagUS />
          <span className="brand-latin font-semibold">EN</span>
        </>
      )}
    </button>
  );
}
