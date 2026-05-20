"use client";

import { useLang } from "@/hooks/useLang";

const PHONE = "96500000000";

export default function WhatsAppFloat() {
  const { dir, lang } = useLang();
  const message =
    lang === "ar"
      ? "مرحباً زوي بلوم! أود الاستفسار عن العلامات."
      : "Hi ZoeyBloom! I'd like to learn more about your brands.";

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  const sideClass = dir === "rtl" ? "left-5 sm:left-6" : "right-5 sm:right-6";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className={`fixed bottom-6 ${sideClass} z-40 group`}
    >
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full
                       bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.5)]
                       transition-transform duration-300 group-hover:scale-105">
        {/* pulse ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-[pulse-ring_2.4s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"
        />
        {/* WhatsApp glyph */}
        <svg
          viewBox="0 0 24 24"
          className="relative w-7 h-7"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.43Zm-8.48 18.32h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.48 4.46-9.94 9.94-9.94a9.88 9.88 0 0 1 7.03 2.91 9.88 9.88 0 0 1 2.91 7.03c0 5.48-4.46 9.94-9.97 9.94Zm5.45-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  );
}
