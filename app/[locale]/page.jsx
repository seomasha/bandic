import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TourismSection from "@/components/TourismSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SectionDivider from "@/components/SectionDivider";

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <HomeHero />
      <TrustSection />
      <SectionDivider className="bg-white py-2" />
      <AboutSection />
      <SectionDivider className="bg-cream py-2" />
      <ServicesSection />
      <SectionDivider className="bg-cream py-2" />
      <TourismSection />
      <SectionDivider className="bg-cream py-2" />
      <TestimonialsSection />
      <SectionDivider className="bg-white py-2" />
      <FinalCtaSection />
    </div>
  );
}
