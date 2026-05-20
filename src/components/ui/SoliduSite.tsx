"use client";

/**
 * Stylized recreation of the SOLIDU storefront hero — rendered tiny inside a
 * BrowserFrame so the look reads as "this is their website" without copying
 * proprietary imagery.
 */
export default function SoliduSite() {
  return (
    <div className="w-full h-full flex flex-col text-black" dir="ltr">
      {/* Announcement bar */}
      <div className="bg-[#E9EBD9] text-black/80 text-[6.5px] font-semibold tracking-[0.12em] py-[5px] px-3 flex items-center justify-between overflow-hidden whitespace-nowrap">
        <span>1 SHAMPOO BAR = 1 BOTTLE</span>
        <span aria-hidden>·</span>
        <span>WATERLESS HANDMADE</span>
        <span aria-hidden>·</span>
        <span>BACKYARD COMPOSTABLE</span>
        <span aria-hidden>·</span>
        <span>NO PLASTIC NO PAPER</span>
      </div>

      {/* Nav row */}
      <div className="px-3 py-2 flex items-center justify-between bg-white border-b border-black/5">
        <div className="flex items-center gap-1 text-[9px] font-semibold">
          <span className="tracking-[0.05em]">SOLIDU</span>
          <span className="text-black/45 font-medium tracking-[0.05em]">COSMETICS</span>
        </div>
        <nav className="flex items-center gap-3 text-[7px] font-semibold tracking-[0.08em]">
          <span className="underline underline-offset-2">HOME</span>
          <span>BY COLLECTIONS</span>
          <span>BUNDLES &amp; OFFERS</span>
        </nav>
        <div className="flex items-center gap-1.5">
          {/* Kuwait flag */}
          <span className="inline-block w-3 h-2 rounded-[1px] overflow-hidden border border-black/10">
            <svg viewBox="0 0 12 8" width="12" height="8" xmlns="http://www.w3.org/2000/svg">
              <rect y="0" width="12" height="2.67" fill="#007A3D" />
              <rect y="2.67" width="12" height="2.67" fill="white" />
              <rect y="5.33" width="12" height="2.67" fill="#CE1126" />
              <polygon points="0,0 4,0 2.67,4 4,8 0,8" fill="black" />
            </svg>
          </span>
          <span className="text-[7px] font-semibold">EN ▾</span>
          {/* mini icons */}
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <circle cx="11" cy="11" r="6" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M6 6h15l-1.5 9H7.5z" />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-[#7BB3C8] via-[#6FA8C0] to-[#5C92AB]">
        {/* arrow controls */}
        <button
          aria-hidden
          className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-5 bg-black/35 rounded-sm grid place-items-center text-white text-[8px]"
        >
          ‹
        </button>
        <button
          aria-hidden
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-5 bg-black/35 rounded-sm grid place-items-center text-white text-[8px]"
        >
          ›
        </button>

        {/* "SHOP NOW" pill on the right */}
        <div className="absolute right-3 top-3 px-2 py-1 border border-white text-white text-[7px] font-bold tracking-[0.18em] flex items-center gap-1">
          <svg viewBox="0 0 24 24" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M6 7h12l-1.2 11H7.2z" />
            <path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
          SHOP NOW
        </div>

        {/* Headline */}
        <div className="absolute inset-x-0 bottom-3 px-3 text-center">
          <div className="text-white font-black tracking-tight leading-[0.95] text-[20px] sm:text-[22px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            YOUR FACE WILL
          </div>
          <div className="text-[#F8C6D2] font-black tracking-tight leading-[0.95] text-[20px] sm:text-[22px] mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            THANK YOU
          </div>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </div>
        </div>

        {/* faux silhouette to suggest the model photo */}
        <div
          aria-hidden
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#E8C9A8]/85 to-[#B68E70]/85 blur-[2px]"
        />
      </div>
    </div>
  );
}
