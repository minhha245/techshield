import PartnersSection from '@/components/sections/PartnersSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}