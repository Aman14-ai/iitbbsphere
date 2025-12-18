"use client";
import React from "react";
import Hero2 from "../components/Hero2";
import HowToUse from "../components/HowToUse";
import Footer from "../components/Footer";
import Contributors from "../components/Contributors";
import DemoView from "@/modules/demoContent/ui/views/DemoView";

interface Props {
  isBirthDate?: boolean;
}

const HomeView = ({ isBirthDate }: Props) => {
  return (
    <div className="flex flex-col ">
      <Hero2 isBirthDate={isBirthDate} />
      <HowToUse />
      <DemoView />
      <Contributors />
      <Footer />
    </div>
  );
};

export default HomeView;
