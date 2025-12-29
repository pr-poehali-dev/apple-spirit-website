import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsBanners from '@/components/NewsBanners';
import ContentSections from '@/components/ContentSections';
import Footer from '@/components/Footer';

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <NewsBanners />
        <ContentSections />
      </main>
      <Footer />
    </div>
  );
}

export default Index;