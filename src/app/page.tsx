import PageWrapper from "@/components/layout/PageWrapper";
import GlassNav from "@/components/layout/GlassNav";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import BrandsCarousel from "@/components/sections/BrandsCarousel";
import KuwaitMap from "@/components/sections/KuwaitMap";
import AboutHorizontal from "@/components/sections/AboutHorizontal";
import Philosophy from "@/components/sections/Philosophy";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import LogoMarquee from "@/components/ui/LogoMarquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <GlassNav />
      <WhatsAppFloat />

      <PageWrapper>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-1 focus:rounded"
        >
          Skip to content
        </a>
        <Hero />
        <LogoMarquee />
        <BrandsCarousel />
        <KuwaitMap />
        <AboutHorizontal />
        <Philosophy />
        <ContactForm />
        <Footer />
      </PageWrapper>
    </>
  );
}
