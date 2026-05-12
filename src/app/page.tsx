import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import ClientResults from "@/components/ClientResults";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Transformation from "@/components/Transformation";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

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
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Transformation />
        <Process />
        <Packages />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
