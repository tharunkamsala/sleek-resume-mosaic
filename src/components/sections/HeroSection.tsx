
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowRight, Code } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Very subtle, Apple-like parallax effect
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Extremely subtle movement - Apple style
      const moveX = (mouseX - 0.5) * 10; 
      const moveY = (mouseY - 0.5) * 10;
      
      // Apply with smooth transition
      heroRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
      
      // Move floating elements with mouse - extremely subtle effect
      const floatingElements = document.querySelectorAll('.floating-3d');
      floatingElements.forEach((el: any) => {
        const speed = parseFloat(el.dataset.speed) || 0.5;
        const depth = parseFloat(el.dataset.depth) || 15;
        
        // More subtle calculation with damping
        const x = (mouseX - 0.5) * depth * speed;
        const y = (mouseY - 0.5) * depth * speed;
        
        // Apply smooth transform with transition
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/30 overflow-hidden perspective-1000"
      style={{transition: "background-position 0.5s cubic-bezier(0.22, 1, 0.36, 1)"}} // Smoother Apple-like transition
    >
      {/* Premium gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[40vw] h-[40vw] gradient-orb opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] gradient-orb opacity-30"></div>
      </div>

      {/* Subtle 3D Floating Code Blocks - Apple Style */}
      <div className="absolute w-full h-full">
        <div 
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-xl apple-card floating-3d"
          data-speed="0.5" 
          data-depth="15"
          style={{ 
            zIndex: 1, 
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: isInView ? 0.9 : 0,
            transform: `translateY(${isInView ? '0' : '20px'}) translateZ(0)`,
            transitionDelay: "0.1s"
          }}
        >
          <div className="p-3 text-xs font-mono text-primary/90 overflow-hidden backdrop-blur-sm">
            <span className="text-primary">const</span> developer = {"{"}
            <br />  <span className="text-green-500">name</span>: <span className="text-amber-500">'Tharun'</span>,
            <br />  <span className="text-green-500">skills</span>: [...]
            <br />{"}"}
          </div>
        </div>
        
        <div 
          className="absolute bottom-[25%] right-[15%] w-48 h-32 rounded-xl apple-card floating-3d"
          data-speed="0.4" 
          data-depth="12"
          style={{ 
            zIndex: 1, 
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: isInView ? 0.9 : 0,
            transform: `translateY(${isInView ? '0' : '20px'}) translateZ(0)`,
            transitionDelay: "0.2s"
          }}
        >
          <div className="p-3 text-xs font-mono text-primary/90 overflow-hidden backdrop-blur-sm">
            <span className="text-purple-500">function</span> <span className="text-blue-400">createSolution</span>() {"{"}
            <br />  <span className="text-purple-500">return</span> <span className="text-amber-500">'Innovative code'</span>;
            <br />{"}"}
          </div>
        </div>
        
        <div 
          className="absolute top-[60%] left-[20%] w-40 h-28 rounded-xl apple-card floating-3d"
          data-speed="0.6" 
          data-depth="18"
          style={{ 
            zIndex: 1, 
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: isInView ? 0.9 : 0,
            transform: `translateY(${isInView ? '0' : '20px'}) translateZ(0)`,
            transitionDelay: "0.3s"
          }}
        >
          <div className="p-3 text-xs font-mono text-primary/90 backdrop-blur-sm">
            <span className="text-blue-400">import</span> {"{"} Success {"}"} <span className="text-blue-400">from</span> <span className="text-amber-500">'./passion'</span>;
          </div>
        </div>
      </div>
      
      {/* Background premium gradient overlay - Apple style */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 opacity-70"
        style={{ 
          backgroundSize: "150% 150%", 
          backgroundPosition: `${50 + (mousePosition.x - 0.5) * 5}% ${50 + (mousePosition.y - 0.5) * 5}%`,
          transition: "background-position 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      ></div>
      
      {/* Hero content */}
      <div className="container relative z-10 pt-8 md:pt-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-8 perspective-1000">
            {/* Greeting tag with premium 3D hover effect */}
            <div 
              className="transition-all duration-700 transform"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? '0' : '20px'})`,
                transitionDelay: "0.1s"
              }}
            >
              <div className="card-3d">
                <div className="card-3d-content">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm border border-primary/10 shadow-sm">
                    <Code className="inline-block mr-1.5 h-4 w-4" />
                    Software Development Engineer
                  </span>
                </div>
              </div>
            </div>
            
            {/* Main heading with premium animation */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? '0' : '20px'})`,
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.2s"
              }}
            >
              <span className="block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Hi, I'm Kamsala Tharun
              </span>
            </h1>
            
            {/* Typewriter effect */}
            <div 
              className="text-xl md:text-2xl text-muted-foreground"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? '0' : '20px'})`,
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.3s"
              }}
            >
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
                  delay: 50,
                  deleteSpeed: 30
                }}
              />
            </div>
            
            {/* Description */}
            <p 
              className="text-muted-foreground max-w-2xl text-lg"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? '0' : '20px'})`,
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.4s"
              }}
            >
              Passionate about creating efficient and intuitive software solutions. Specialized in full-stack development, 
              data processing automation, and ETL migration tools.
            </p>
            
            {/* CTA Buttons with premium 3D effect */}
            <div 
              className="flex flex-col sm:flex-row gap-6 pt-6"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? '0' : '20px'})`,
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.5s"
              }}
            >
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
      
      {/* Premium scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        style={{
          opacity: isInView ? 1 : 0,
          transform: `translateX(-50%) translateY(${isInView ? '0' : '20px'})`,
          transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: "0.7s",
          animation: "bounce 2s infinite"
        }}
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground flex justify-center">
          <div className="w-1 h-2 bg-muted-foreground rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
