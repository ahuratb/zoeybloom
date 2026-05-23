"use client";

export default function FabyouSite() {
  return (
    <div className="w-full h-full flex flex-col text-black bg-white" dir="ltr">
      {/* Nav */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-black/8">
        <div className="text-[11px] tracking-[0.28em] font-bold">FABYOU</div>
        <nav className="flex items-center gap-2.5 text-[7px] tracking-[0.12em]">
          <span className="text-black/85">HOME</span>
          <span className="text-black/55">SKINCARE</span>
          <span className="text-black/55">SETS</span>
          <span className="text-black/55">ABOUT</span>
        </nav>
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="6" /><path d="M21 21l-4.3-4.3" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 7h12l-1.2 11H7.2z" /><path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex-1 overflow-hidden bg-[#F5F5F0]">
        <span aria-hidden className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#E8E0D8] blur-xl" />

        <div className="absolute inset-y-0 left-0 w-[55%] px-4 flex flex-col justify-center gap-1.5">
          <span className="text-[5.5px] tracking-[0.22em] text-black/50 font-medium uppercase">
            NEW Korean Skincare
          </span>
          <h2 className="text-black font-bold leading-[1.1] text-[13px] tracking-tight">
            Best ingredient
            <br />
            recipe for natural
            <br />
            <span className="text-[#7A7060]">glowing skin.</span>
          </h2>
          <div className="mt-2 inline-flex items-center gap-1 text-[7px] font-semibold tracking-wide">
            <span className="border-b border-black pb-[1px]">Discover</span>
            <span>→</span>
          </div>
        </div>

        {/* Product silhouette */}
        <div className="absolute inset-y-0 right-3 w-[38%] flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-1">
            <span aria-hidden className="w-8 h-16 rounded-xl bg-gradient-to-b from-[#E8E0D8] to-[#CFC8BE] border border-white/70 shadow-[0_6px_16px_-4px_rgba(0,0,0,0.15)]" />
            <span aria-hidden className="w-7 h-10 rounded-lg bg-gradient-to-b from-[#D8D0C8] to-[#BFB8B0] border border-white/60 shadow-[0_4px_12px_-3px_rgba(0,0,0,0.12)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
