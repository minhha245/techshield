import AboutSection from '@/components/sections/AboutSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}