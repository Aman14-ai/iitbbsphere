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
    <div>
      <Hero2 isBirthDate={isBirthDate} />
      <HowToUse />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomeView;
