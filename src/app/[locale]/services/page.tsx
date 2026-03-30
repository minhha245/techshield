import ServicesSection from '@/components/sections/ServicesSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}