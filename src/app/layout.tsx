import type { Metadata, Viewport } from "next";

// Latin fonts — local npm packages, no network required at build time
import "@fontsource-variable/inter/index.css";
import "@fontsource/instrument-serif/latin-400.css";

// Arabic fonts — via @fontsource
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
import AmbientGlows from "@/components/ui/AmbientGlows";

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
    <html lang="en" dir="ltr" suppressHydrationWarning className="antialiased">
      <body className="min-h-screen text-ink">
        <AmbientGlows />
        <LangProvider>
          <LenisProvider>{children}</LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
