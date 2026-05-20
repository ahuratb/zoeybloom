"use client";

import { ReactNode } from "react";

type Props = {
  url: string;
  children: ReactNode;
  /** Tailwind aspect class, e.g. "aspect-[16/10]". Defaults to 16/10. */
  aspect?: string;
  /** Optional tab title shown in the chrome strip. */
  title?: string;
  className?: string;
};

/**
 * macOS-style browser window chrome wrapping arbitrary content.
 * Used to present each brand's website as a framed preview.
 */
export default function BrowserFrame({
  url,
  children,
  aspect = "aspect-[16/10]",
  title,
  className = "",
}: Props) {
  return (
    <div
      dir="ltr"
      className={`rounded-2xl overflow-hidden bg-white
                  border border-ink/10
                  shadow-[0_30px_60px_-25px_rgba(232,69,107,0.25),0_12px_28px_-12px_rgba(0,0,0,0.18)]
                  ${className}`}
    >
      {/* Chrome strip */}
      <div className="relative flex items-center px-3 py-2.5 bg-gradient-to-b from-[#F1EFEB] to-[#E7E3DC] border-b border-black/5">
        {/* traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="block w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
          <span className="block w-3 h-3 rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
        </div>

        {/* URL pill */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1
                        bg-white/85 border border-black/5 rounded-md
                        text-[10.5px] text-black/55 font-medium tracking-wide
                        max-w-[60%] truncate">
          <svg
            viewBox="0 0 24 24"
            width="9"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
            className="shrink-0"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" />
          </svg>
          <span className="truncate">{url}</span>
        </div>

        {/* Right side reserved for spacing symmetry */}
        <div className="ms-auto w-9" />
      </div>

      {/* Tab strip (optional) */}
      {title ? (
        <div className="flex items-center gap-1 px-2 pt-1 bg-[#E7E3DC] border-b border-black/5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-t-md bg-white border border-black/5 border-b-white">
            <span className="block w-2 h-2 rounded-full bg-emerald-500/70" />
            <span className="text-[10px] text-black/65 font-medium truncate max-w-[160px]">
              {title}
            </span>
          </div>
        </div>
      ) : null}

      {/* Content viewport */}
      <div className={`relative w-full ${aspect} bg-white overflow-hidden`}>
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
