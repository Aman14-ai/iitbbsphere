import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Content Column */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            <span className="mr-2">✨</span> Introducing Our New Platform
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Solve your problems of <span className="text-primary">study</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg">
            Our platform provide you with all the content for your study needs, from textbooks to notes, to pyqs,
            I want you to contribute in it so that other students can bless you.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Get Started Free
            </button>
            <button className="px-6 py-3 border border-border bg-background text-foreground font-medium rounded-md hover:bg-accent transition-colors">
              View Demo
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="w-8 h-8 rounded-full bg-primary border-2 border-background"
                    style={{ opacity: 1 - (item * 0.2) }}
                  />
                ))}
              </div>
              <span>please join</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>rating</span>
            </div>
          </div>
        </div>
        
        {/* Visual Column */}
        <div className="relative">
          <div className="relative z-10 bg-card rounded-2xl p-6 shadow-lg border border-border">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-md mb-2"></div>
                <div className="h-3 bg-primary/30 rounded-full mb-1"></div>
                <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="w-8 h-8 bg-primary/70 rounded-md mb-2"></div>
                <div className="h-3 bg-primary/20 rounded-full mb-1"></div>
                <div className="h-2 bg-primary/10 rounded-full w-3/4"></div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="w-8 h-8 bg-primary/70 rounded-md mb-2"></div>
                <div className="h-3 bg-primary/20 rounded-full mb-1"></div>
                <div className="h-2 bg-primary/10 rounded-full w-3/4"></div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-md mb-2"></div>
                <div className="h-3 bg-primary/30 rounded-full mb-1"></div>
                <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <div className="h-3 bg-primary/30 rounded-full w-32 mb-2"></div>
                  <div className="h-2 bg-primary/20 rounded-full w-24"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-primary/5 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;