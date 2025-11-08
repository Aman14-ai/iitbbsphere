import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import React from "react";

const HowToUse = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "Discover Resources",
      description:
        "Browse to semester to access study materials .",
    },
    {
      icon: Calendar,
      title: "Choose Your Department",
      description:
        "Easily navigate to your specific semester and academic year to find tailored resources.",
    },
    {
      icon: ArrowRight,
      title: "Share Updates",
      description:
        "Browse to community and share something new or missing.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-blue-200 to-gray-50 dark:from-blue-500 dark:to-gray-900 overflow-hidden"
    > 
      <div className="container px-3 sm:px-4 mx-auto max-w-7xl relative z-10 scale-90 sm:scale-95 md:scale-100">
        {/* Header */}
        <h2 className="mb-12 text-3xl font-bold text-center">How to Use</h2>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-3 sm:p-4 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground text-center mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className=" text-muted-foreground text-center mb-4 sm:mb-6">
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
