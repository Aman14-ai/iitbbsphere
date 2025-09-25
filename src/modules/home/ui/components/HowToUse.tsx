import {
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";
import React from "react";

const HowToUse = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "1. Discover Resources",
      description:
        "Browse a wide collection of study materials, including question papers and reference content from every department.",
    },
    {
      icon: Calendar,
      title: "2. Choose Your Department",
      description:
        "Easily navigate to your specific semester and academic year to find tailored resources.",
    },
    {
      icon: ArrowRight,
      title: "3. Share Updates",
      description:
        "Spotted something new or missing? Contribute by adding a comment, and our team will ensure the content stays up to date.",
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-background to-accent/5 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full blur-lg"></div>
      </div>

      <div className="container px-3 sm:px-4 mx-auto max-w-7xl relative z-10 scale-90 sm:scale-95 md:scale-100">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3 text-sm md:text-md h-3 sm:w-4 sm:h-4" />
            Getting Started
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-sm  md:text-md text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Simple steps to help you get started in finding all contents.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-3 sm:p-4 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-md sm:text-lg font-semibold text-foreground text-center mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-md text-muted-foreground text-center mb-4 sm:mb-6">
                {step.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
