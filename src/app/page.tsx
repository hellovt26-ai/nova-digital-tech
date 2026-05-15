"use client";

import { useState } from "react";
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
import ProjectDeposit from "@/components/ProjectDeposit";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import ScrollToTop from "@/components/ScrollToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hideFloatingButtons, setHideFloatingButtons] = useState(false);

  const showFloating = !modalOpen && !hideFloatingButtons;

  return (
    <>
      <Particles />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden">
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
        <Contact
          onModalChange={setModalOpen}
          onHideFloatingButtons={setHideFloatingButtons}
        />
        <ProjectDeposit />
      </main>
      <Footer />
      {showFloating && <ScrollToTop />}
      {showFloating && <StickyMobileCTA />}
      <ChatBot />
    </>
  );
}
