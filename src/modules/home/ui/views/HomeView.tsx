"use client";
import React from "react";
import Hero2 from "../components/Hero2";
import HowToUse from "../components/HowToUse";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Contributors from "../components/Contributors";

interface Props {
  isBirthDate?: boolean;
}

const HomeView = ({ isBirthDate }: Props) => {
  return (
    <div className="flex flex-col space-y-8">
      <Hero2 isBirthDate={isBirthDate} />
      <HowToUse />
      <ContactSection />
      <Footer />
      <Contributors />
    </div>
  );
};

export default HomeView;
