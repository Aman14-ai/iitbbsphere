"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Hero2 from "../components/Hero2";
import HowToUse from "../components/HowToUse";
import ContactSection from "../components/ContactSection";

interface Props {
  isBirthDate?: boolean;
}

const HomeView = ({isBirthDate}:Props) => {
  return (
    <div>
      <Navbar />
      <Hero2 isBirthDate={isBirthDate} />
      <HowToUse />
      <ContactSection />
    </div>
  );
};

export default HomeView;
