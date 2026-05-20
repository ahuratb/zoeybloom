"use client";

import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="py-10 mt-6 border-t border-ink/10">
      <RevealOnScroll
        className="flex flex-col items-center text-center gap-5"
        splitChildren
        stagger={0.08}
      >
        <Image
          src="/zoeybloom-logo.png"
          alt="ZoeyBloom"
          width={220}
          height={56}
          className="h-12 w-auto object-contain opacity-90"
        />
        <span className="sr-only">ZoeyBloom</span>
        <p className="text-[13.5px] text-ink/55 max-w-[36ch]">{t.footer.tagline}</p>

        <ul className="flex items-center gap-5 text-[12.5px] text-ink/65">
          {t.footer.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="text-[11.5px] tracking-[0.18em] uppercase text-ink/35">
          {t.footer.copy}
        </span>
      </RevealOnScroll>
    </footer>
  );
}
