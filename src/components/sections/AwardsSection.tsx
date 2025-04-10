
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredAward !== index) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetCardTransform = (card: HTMLDivElement) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
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
    <section id="awards" ref={sectionRef} className="bg-card/30 py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Leadership & Awards</h2>
        <p className="section-subheading appear-animate">
          Recognition of my achievements and leadership roles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {awards.map((award, index) => (
            <div key={index} className="perspective-1000">
              <Card 
                className="glass-card h-full appear-animate preserve-3d transition-all duration-300"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredAward(index)}
                onMouseLeave={(e) => {
                  resetCardTransform(e.currentTarget);
                  setHoveredAward(null);
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 transform-gpu"
                    style={{ 
                      transform: hoveredAward === index ? 'translateZ(30px) scale(1.1)' : 'translateZ(20px)',
                      boxShadow: hoveredAward === index ? '0 10px 25px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  >
                    <div className="text-primary">{award.icon}</div>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    {award.title}
                  </h3>
                  <div 
                    className="text-primary font-medium mb-1"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {award.organization}
                  </div>
                  <div 
                    className="text-sm text-muted-foreground mb-3"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {award.year}
                  </div>
                  <p 
                    className="text-muted-foreground"
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
