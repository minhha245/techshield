import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PartnersSection from '@/components/sections/PartnersSection';
import NewsSection from '@/components/sections/NewsSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PartnersSection />
        <NewsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
