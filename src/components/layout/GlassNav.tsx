"use client";

import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import MagneticButton from "@/components/ui/MagneticButton";
import LangToggle from "@/components/ui/LangToggle";

export default function GlassNav() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {/* full-width blur bar behind the pill */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 z-40 h-20 sm:h-24"
        style={{
          background: "linear-gradient(to bottom, rgba(254,252,250,0.72) 60%, rgba(254,252,250,0))",
          backdropFilter: "blur(18px) saturate(130%)",
          WebkitBackdropFilter: "blur(18px) saturate(130%)",
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      />
    <nav
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50"
      aria-label="Primary"
    >
      <div className="glass-pill flex items-center gap-1 sm:gap-2 px-2 py-2 rounded-full">
        <button
          onClick={() => scrollTo("hero")}
          className="px-2 py-1 transition-opacity hover:opacity-80"
          aria-label="ZoeyBloom — home"
          dir="ltr"
        >
          <Image
            src="/zoeybloom-logo.png"
            alt="ZoeyBloom"
            width={140}
            height={36}
            priority
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </button>

        <span className="hidden sm:inline-block w-px h-5 bg-ink/10 mx-1" />

        <button
          onClick={() => scrollTo("brands")}
          className="hidden sm:inline-block text-[13px] px-3 py-1 text-ink/70 hover:text-ink transition-colors"
        >
          {t.nav.brands}
        </button>
        <button
          onClick={() => scrollTo("about")}
          className="hidden sm:inline-block text-[13px] px-3 py-1 text-ink/70 hover:text-ink transition-colors"
        >
          {t.nav.about}
        </button>

        <LangToggle />

        <MagneticButton
          onClick={() => scrollTo("contact")}
          className="px-4 py-2 rounded-full bg-rose text-white text-[13px] font-medium shadow-[0_8px_22px_-6px_rgba(232,69,107,0.5)] hover:bg-rose/90 transition-colors"
        >
          {t.nav.cta}
        </MagneticButton>
      </div>
    </nav>
    </>
  );
}
