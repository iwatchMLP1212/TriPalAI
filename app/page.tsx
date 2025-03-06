import IntroductionSection from "@/homepage_components/sections/IntroductionSection";
import HeroSection from "@/homepage_components/sections/HeroSection";
import Footer from "./homepage_components/components/Footer";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroductionSection />
      <Footer />
    </main>
  );
};

export default Home;
