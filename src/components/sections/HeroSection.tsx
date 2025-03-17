
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowRight, Code, Terminal, Braces } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Code particles setup
  useEffect(() => {
    // Random code symbols for the background
    const codeSymbols = ['{', '}', '()', '[]', '=>', '&&', '||', '?.', '!', 'const', 'let', 'function', '<>', '://', '...', '==='];
    const heroContainer = heroRef.current;
    
    if (heroContainer) {
      // Create code particles
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        
        particle.className = 'code-particle absolute text-primary/10 font-mono text-opacity-10 select-none pointer-events-none';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.fontSize = `${Math.random() * 16 + 10}px`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        particle.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        particle.textContent = symbol;
        
        heroContainer.appendChild(particle);
      }
    }
    
    return () => {
      if (heroContainer) {
        const particles = heroContainer.querySelectorAll('.code-particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Parallax effect for the background
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      
      heroRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
      
      // Move code particles slightly
      const particles = document.querySelectorAll('.code-particle');
      particles.forEach(particle => {
        const speed = parseFloat((particle as HTMLElement).style.opacity) * 2;
        (particle as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px) rotate(${Math.random() * 40 - 20}deg)`;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/5 overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background -z-10" />
      
      {/* Terminal-like elements */}
      <div className="absolute top-20 -right-10 w-64 h-32 rounded-xl border border-primary/10 bg-secondary/5 backdrop-blur-sm -rotate-12 opacity-30">
        <div className="h-6 bg-secondary/30 rounded-t-xl flex items-center px-3">
          <div className="w-3 h-3 rounded-full bg-destructive/60 mr-2" />
          <div className="w-3 h-3 rounded-full bg-accent/60 mr-2" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <div className="font-mono text-xs text-primary/40 p-3">
          <div>$ npm install</div>
          <div>$ git commit -m "portfolio"</div>
          <div>$ npm run build</div>
        </div>
      </div>
      
      <div className="absolute bottom-40 -left-10 w-56 h-24 rounded-xl border border-primary/10 bg-secondary/5 backdrop-blur-sm rotate-12 opacity-20">
        <div className="font-mono text-xs text-primary/40 p-2">
          <div>{'const Portfolio = () => {'}</div>
          <div>&nbsp;&nbsp;return <span className="text-accent/60">{'<App />'}</span></div>
          <div>{'}'}</div>
        </div>
      </div>
      
      {/* Background gradient circles for visual interest */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-slow"></div>
      
      {/* Hero content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Tech tag */}
            <div className="flex space-x-2 items-center bg-secondary/20 text-primary font-mono text-sm py-1 px-3 rounded-full animate-fade-in border border-primary/10">
              <Terminal className="h-4 w-4 mr-1 text-accent" />
              <span>Software Development Engineer</span>
            </div>
            
            {/* Main heading with animation */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              <span className="block animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <span className="text-primary">Hi, I'm</span> Kamsala Tharun
              </span>
            </h1>
            
            {/* Terminal-style braces */}
            <div className="flex items-center space-x-2 animate-fade-in font-mono text-lg text-muted-foreground" style={{ animationDelay: "0.3s" }}>
              <Braces className="h-5 w-5 text-primary" />
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
              <Code className="h-5 w-5 text-primary" />
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground max-w-2xl animate-fade-in font-mono" style={{ animationDelay: "0.6s" }}>
              <span className="text-primary">function</span> <span className="text-accent">createSolution</span>(<span className="text-muted-foreground">problem</span>) {"{"}
              <br/>
              &nbsp;&nbsp;return efficient && intuitive && scalable;
              <br/>
              {"}"}
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
        <span className="text-sm text-muted-foreground mb-2 font-mono">Scroll Down</span>
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/40 flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-1"></div>
        </div>
      </div>
      
      {/* Floating code snippets */}
      <div className="absolute bottom-32 right-10 hidden lg:block">
        <div className="font-mono text-xs bg-card/50 backdrop-blur-sm p-3 rounded-lg border border-border opacity-70 shadow-lg">
          <div className="text-muted-foreground">{'// Expertise'}</div>
          <div><span className="text-primary">const</span> <span className="text-accent">skills</span> = [<span className="text-muted-foreground">'React', 'Node.js', 'Python', 'Java'</span>];</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
