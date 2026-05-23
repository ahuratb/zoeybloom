"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/solidu-logo.png",    alt: "SOLIDU",    w: 220, h: 360, cls: "h-6 w-auto" },
  { src: "/claraline-logo.png", alt: "CLARALINE", w: 580, h: 110, cls: "h-5 w-auto" },
  { src: "/eyenlip-logo.png",   alt: "EYENLIP",   w: 225, h: 225, cls: "h-7 w-auto" },
  { src: "/fabyou-logo.png",    alt: "FABYOU",    w: 320, h: 100, cls: "h-5 w-auto" },
];

export default function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS]; // duplicate for seamless loop

  return (
    <div
      aria-hidden
      className="relative overflow-hidden py-5 border-y border-ink/8"
      style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
    >
      <div
        className="flex items-center gap-14"
        style={{ animation: "marquee-scroll 22s linear infinite", width: "max-content" }}
      >
        {track.map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            className={`${logo.cls} object-contain opacity-40`}
            style={{ filter: "grayscale(100%)" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
