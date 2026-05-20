"use client";

/**
 * Stylized K-beauty storefront preview for EYENLIP — built in the same visual
 * language as the SOLIDU and CLARALINE previews so the three brand cards feel
 * like a set.
 */
export default function EyenlipSite() {
  return (
    <div className="w-full h-full flex flex-col text-black bg-[#FFF7F2]" dir="ltr">
      {/* Nav */}
      <div className="px-3 py-2 flex items-center justify-between bg-transparent">
        <div className="text-[11px] tracking-[0.22em] font-light">EYENLIP</div>
        <nav className="flex items-center gap-2.5 text-[7px] tracking-[0.12em] font-medium">
          <span className="text-black/85">HOME</span>
          <span className="text-black/65">SKINCARE</span>
          <span className="text-black/65">SHEET MASKS</span>
          <span className="text-black/65">SETS</span>
          <span className="text-black/65">JOURNAL</span>
        </nav>
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="6" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 7h12l-1.2 11H7.2z" />
            <path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex-1 overflow-hidden">
        {/* soft blobs */}
        <span
          aria-hidden
          className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#FFE0DC] blur-md"
        />
        <span
          aria-hidden
          className="absolute -bottom-8 -right-6 w-28 h-28 rounded-full bg-[#FFD4D8] blur-md"
        />

        <div className="absolute inset-y-0 left-0 w-1/2 px-4 flex flex-col justify-center">
          <span className="text-[6.5px] tracking-[0.18em] text-black/70 font-medium mb-1.5">
            VITAMIN C BRIGHTENING SERUM
          </span>
          <h2 className="text-black font-semibold leading-[1.05] text-[14px]">
            Glass-skin science,
            <br />
            now in your routine.
          </h2>
          <div className="mt-3 inline-flex items-center gap-1 text-[7.5px] font-medium">
            <span className="border-b border-black pb-[1px]">Shop the Edit</span>
            <span>→</span>
          </div>
        </div>

        {/* Bottle silhouette */}
        <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center">
          <div className="relative w-[60%] h-[80%]">
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-24 rounded-2xl bg-gradient-to-b from-[#FFE8E5] to-[#FFB6C1] shadow-[0_8px_18px_-4px_rgba(255,143,171,0.5)] border border-white"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[145%] w-6 h-3 rounded-sm bg-[#E8456B]"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-0 text-[6.5px] tracking-[0.2em] text-white font-semibold"
            >
              EYENLIP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
