
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowRight, Code } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Parallax effect for the background
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      const moveX = (mouseX - 0.5) * 30;
      const moveY = (mouseY - 0.5) * 30;
      
      heroRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
      
      // Move floating elements with mouse
      const floatingElements = document.querySelectorAll('.floating-3d');
      floatingElements.forEach((el: any) => {
        const speed = el.dataset.speed || 1;
        const x = (mouseX - 0.5) * 40 * speed;
        const y = (mouseY - 0.5) * 40 * speed;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${-y * 0.5}deg) rotateY(${x * 0.5}deg)`;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50 overflow-hidden perspective-1000"
    >
      {/* 3D Floating Code Blocks */}
      <div className="absolute w-full h-full">
        <div 
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-xl bg-primary/5 border border-primary/20 floating-3d perspective-1000"
          data-speed="2" 
          style={{ zIndex: 1 }}
        >
          <div className="p-3 text-xs font-mono text-primary/70 overflow-hidden">
            <span className="text-primary">const</span> developer = {"{"}
            <br />  <span className="text-green-500">name</span>: <span className="text-amber-500">'Tharun'</span>,
            <br />  <span className="text-green-500">skills</span>: [...]
            <br />{"}"}
          </div>
        </div>
        
        <div 
          className="absolute bottom-[25%] right-[15%] w-48 h-32 rounded-xl bg-primary/5 border border-primary/20 floating-3d perspective-1000"
          data-speed="1.5" 
          style={{ zIndex: 1 }}
        >
          <div className="p-3 text-xs font-mono text-primary/70 overflow-hidden">
            <span className="text-purple-500">function</span> <span className="text-blue-400">createSolution</span>() {"{"}
            <br />  <span className="text-purple-500">return</span> <span className="text-amber-500">'Innovative code'</span>;
            <br />{"}"}
          </div>
        </div>
        
        <div 
          className="absolute top-[60%] left-[20%] w-40 h-28 rounded-xl bg-primary/5 border border-primary/20 floating-3d perspective-1000"
          data-speed="1.8" 
          style={{ zIndex: 1 }}
        >
          <div className="p-3 text-xs font-mono text-primary/70">
            <span className="text-blue-400">import</span> {"{"} Success {"}"} <span className="text-blue-400">from</span> <span className="text-amber-500">'./passion'</span>;
          </div>
        </div>
      </div>
      
      {/* Background gradient circles for visual interest */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      
      {/* Hero content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-6 perspective-1000">
            {/* Greeting tag with 3D hover effect */}
            <div className="card-3d">
              <div className="card-3d-content">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
                  <Code className="inline-block mr-1 h-4 w-4" />
                  Software Development Engineer
                </span>
              </div>
            </div>
            
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
            
            {/* CTA Buttons with 3D effect */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="card-3d">
                <div className="card-3d-content">
                  <Button className="button-primary" size="lg">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </div>
              
              <div className="card-3d">
                <div className="card-3d-content">
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
