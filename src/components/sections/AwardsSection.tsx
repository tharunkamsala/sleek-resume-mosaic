
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Camera } from "lucide-react";

interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: React.ReactNode;
}

const AwardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredAward, setHoveredAward] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-viewport");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".appear-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Premium Apple-style subtle 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredAward !== index) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Very subtle rotation - Apple style
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)";
  };
  
  const resetCardTransform = (card: HTMLDivElement) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
  };

  const awards: AwardItem[] = [
    {
      title: "Best Intern Award",
      organization: "IBM Expert Labs",
      year: "2024",
      description: "Recognized for outstanding performance and contributions during internship.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Vice President of Sponsorships",
      organization: "Venture Tank Club, NMIT",
      year: "2022-2023",
      description: "Led sponsorship initiatives and partnerships for college entrepreneurship club.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Photography Club Head",
      organization: "NMIT",
      year: "2021-2022",
      description: "Managed and coordinated activities for the college photography club.",
      icon: <Camera className="h-6 w-6" />,
    },
  ];

  return (
    <section id="awards" ref={sectionRef} className="bg-card/30 py-24">
      {/* Premium background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[30vw] h-[30vw] gradient-orb opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[25vw] h-[25vw] gradient-orb opacity-15"></div>
      </div>
      
      <div className="container-section">
        <h2 className="section-heading appear-animate">Leadership & Awards</h2>
        <p className="section-subheading appear-animate">
          Recognition of my achievements and leadership roles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {awards.map((award, index) => (
            <div key={index} className="perspective-1000">
              <Card 
                className="apple-card h-full appear-animate preserve-3d transition-all duration-300 hover-lift"
                style={{ 
                  animationDelay: `${0.15 * index}s`,
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredAward(index)}
                onMouseLeave={(e) => {
                  resetCardTransform(e.currentTarget);
                  setHoveredAward(null);
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div 
                    className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 transform-gpu shadow-lg"
                    style={{ 
                      transform: hoveredAward === index ? 'translateZ(40px) scale(1.1)' : 'translateZ(20px)',
                      boxShadow: hoveredAward === index ? '0 15px 30px rgba(59, 130, 246, 0.2)' : 'none'
                    }}
                  >
                    <div className="text-primary text-2xl">{award.icon}</div>
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    {award.title}
                  </h3>
                  <div 
                    className="text-primary font-medium mb-2 text-lg"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {award.organization}
                  </div>
                  <div 
                    className="text-base text-muted-foreground mb-4 bg-secondary/30 px-3 py-1 rounded-full inline-block"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {award.year}
                  </div>
                  <p 
                    className="text-muted-foreground text-base"
                    style={{ transform: 'translateZ(0px)' }}
                  >
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
