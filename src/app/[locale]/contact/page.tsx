import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}