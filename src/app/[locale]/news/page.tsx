import NewsSection from '@/components/sections/NewsSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}