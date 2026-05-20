import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

// Arabic fonts loaded locally (no CDN) via @fontsource — see globals.css
import "@fontsource/tajawal/arabic-300.css";
import "@fontsource/tajawal/arabic-400.css";
import "@fontsource/tajawal/arabic-500.css";
import "@fontsource/tajawal/arabic-700.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-300.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";

import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import LenisProvider from "@/components/layout/LenisProvider";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZoeyBloom — Where Beauty Becomes a Story",
  description:
    "ZoeyBloom is a Kuwait-based beauty house, curating heritage Korean and global brands.",
};

export const viewport: Viewport = {
  themeColor: "#FEFCFA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${instrument.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-ink">
        <LangProvider>
          <LenisProvider>{children}</LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
