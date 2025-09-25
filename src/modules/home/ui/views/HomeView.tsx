"use client";
import React from "react";
import Hero2 from "../components/Hero2";
import HowToUse from "../components/HowToUse";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

interface Props {
  isBirthDate?: boolean;
}

const HomeView = ({isBirthDate}:Props) => {
  return (
    <div className="flex flex-col space-y-8">
      <Hero2 isBirthDate={isBirthDate} />
      <HowToUse />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomeView;
