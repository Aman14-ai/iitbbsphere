"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Hero2 from "../components/Hero2";

interface Props {
  isBirthDate?: boolean;
}

const HomeView = ({isBirthDate}:Props) => {
  return (
    <div>
      <Navbar />
      <Hero2 isBirthDate={isBirthDate} />
    </div>
  );
};

export default HomeView;
