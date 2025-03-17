
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowRight } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Parallax effect for the background
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      
      heroRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50 overflow-hidden"
    >
      {/* Background gradient circles for visual interest */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      
      {/* Hero content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Greeting tag */}
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
              Software Development Engineer
            </span>
            
            {/* Main heading with animation */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              <span className="block animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Hi, I'm Kamsala Tharun
              </span>
            </h1>
            
            {/* Typewriter effect */}
            <div className="text-xl md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <TypewriterComponent
                options={{
                  strings: [
                    "Software Developer & Engineer",
                    "Full Stack Developer",
                    "React.js & Node.js Developer",
                    "Python & Java Developer"
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
              Passionate about creating efficient and intuitive software solutions. Specialized in full-stack development, 
              data processing automation, and ETL migration tools.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Button className="button-primary" size="lg">
                <FileDown className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button className="button-outline group" size="lg" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground flex justify-center">
          <div className="w-1 h-2 bg-muted-foreground rounded-full mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
