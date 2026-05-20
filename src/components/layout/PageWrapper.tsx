import { ReactNode } from "react";

/**
 * PageWrapper — the lovi.care "centered mobile feel on desktop" container.
 * Background fills the viewport; content is constrained to max-w-[520px].
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Soft gradient field */}
      <div
        aria-hidden
        className="fixed inset-0 -z-30 bg-gradient-to-b from-cream via-petal/40 to-cream"
      />

      {/* Decorative floating blurs */}
      <div
        aria-hidden
        className="fixed top-[8%] left-1/4 -translate-x-1/2 w-[28rem] h-[28rem]
                   bg-pink/25 rounded-full blur-3xl -z-20 animate-[float-slow_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        className="fixed bottom-[12%] right-1/4 translate-x-1/2 w-[22rem] h-[22rem]
                   bg-blush/40 rounded-full blur-3xl -z-20 animate-[float-slow_10s_ease-in-out_infinite_reverse]"
      />
      <div
        aria-hidden
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem]
                   bg-petal/30 rounded-full blur-3xl -z-25"
      />

      {/* The narrow, centered column — lovi.care's secret */}
      <main
        id="content"
        className="relative max-w-[520px] mx-auto px-5 sm:px-6"
      >
        {children}
      </main>
    </div>
  );
}
