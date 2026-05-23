import { ReactNode } from "react";

/**
 * PageWrapper — the lovi.care "centered mobile feel on desktop" container.
 * Background atmosphere is handled by AmbientGlows (fixed, behind everything).
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative">
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
