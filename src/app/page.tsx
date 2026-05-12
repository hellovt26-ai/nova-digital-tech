import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import ClientResults from "@/components/ClientResults";
import FeaturedOffer from "@/components/FeaturedOffer";
import Portfolio from "@/components/Portfolio";
import FounderStudio from "@/components/FounderStudio";
import LatestTransformations from "@/components/Transformations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Transformation from "@/components/Transformation";
import MiniCTA from "@/components/MiniCTA";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import ScrollToTop from "@/components/ScrollToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Particles />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <VideoSection />
        <TechStack />
        <ClientResults />
        <Services />
        <Industries />
        <FeaturedOffer />
        <Portfolio />
        <FounderStudio />
        <LatestTransformations />
        <WhyChooseUs />
        <Testimonials />
        <Transformation />
        <MiniCTA />
        <Process />
        <Packages />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <StickyMobileCTA />
    </>
  );
}
