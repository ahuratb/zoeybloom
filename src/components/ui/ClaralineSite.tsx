"use client";

/**
 * Stylized recreation of the CLARALINE storefront hero.
 */
export default function ClaralineSite() {
  return (
    <div className="w-full h-full flex flex-col text-black bg-[#D9D7D2]" dir="ltr">
      {/* Nav */}
      <div className="px-3 py-2 flex items-center justify-between bg-transparent">
        <div className="text-[11px] tracking-[0.18em] font-light">CLARALINE</div>
        <nav className="flex items-center gap-2.5 text-[7px] tracking-[0.12em] font-medium">
          <span className="text-black/85">HOME</span>
          <span className="text-black/65">ABOUT</span>
          <span className="text-black/65 flex items-center gap-0.5">EYES <i className="text-[5px]">▾</i></span>
          <span className="text-black/65 flex items-center gap-0.5">LIPS <i className="text-[5px]">▾</i></span>
          <span className="text-black/65 flex items-center gap-0.5">FACE <i className="text-[5px]">▾</i></span>
          <span className="text-black/65 flex items-center gap-0.5">NAILS <i className="text-[5px]">▾</i></span>
          <span className="text-black/65">CONTACT</span>
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
            <path d="M12 21s-7-4.7-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.3-7 11-7 11Z" />
          </svg>
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 7h12l-1.2 11H7.2z" />
            <path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex-1 overflow-hidden">
        {/* Text block (left) */}
        <div className="absolute inset-y-0 left-0 w-1/2 px-4 flex flex-col justify-center">
          <span className="text-[6.5px] tracking-[0.18em] text-black/70 font-medium mb-1.5">
            MIDNIGHT DRAMA VOLUME MASCARA
          </span>
          <h2 className="text-black font-bold leading-[1.05] text-[15px]">
            Length, volume,
            <br />
            drama all for
            <br />
            your eyes
          </h2>
          <div className="mt-3 inline-flex items-center gap-1 text-[7.5px] font-medium">
            <span className="border-b border-black pb-[1px]">Discover Now</span>
            <span>→</span>
          </div>
        </div>

        {/* Product silhouette (right) — abstract suggestion of the model & mascara */}
        <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center">
          <div className="relative w-[80%] h-[80%]">
            {/* face circle */}
            <span
              aria-hidden
              className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#E9CDB7] to-[#B68E70]"
            />
            {/* hair flow */}
            <span
              aria-hidden
              className="absolute right-0 top-[15%] w-16 h-[80%] rounded-full bg-gradient-to-br from-[#C9A77E] to-[#7B5A3A] blur-[1px]"
            />
            {/* mascara stick */}
            <span
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-16 rounded-md bg-[#7EC8E3] shadow-[0_4px_10px_-3px_rgba(0,0,0,0.3)] rotate-[18deg]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
