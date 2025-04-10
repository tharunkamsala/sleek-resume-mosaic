
import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCategory {
  title: string;
  emoji: string;
  skills: Array<{
    name: string;
    icon: string;
  }>;
}

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      emoji: "💻",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "Java", icon: "☕" },
        { name: "JavaScript", icon: "📜" },
        { name: "TypeScript", icon: "🔷" },
      ],
    },
    {
      title: "Web Technologies",
      emoji: "🌐",
      skills: [
        { name: "React.js", icon: "⚛️" },
        { name: "Spring Boot", icon: "🍃" },
        { name: "Node.js", icon: "🟢" },
        { name: "REST API", icon: "🔄" },
        { name: "HTML/CSS", icon: "🎨" },
        { name: "Express.js", icon: "🚂" },
      ],
    },
    {
      title: "Databases",
      emoji: "🗄️",
      skills: [
        { name: "MySQL", icon: "🐬" },
        { name: "MongoDB", icon: "🍃" },
        { name: "JDBC", icon: "🔌" },
        { name: "IBM DB2", icon: "💾" },
      ],
    },
    {
      title: "Cloud Technologies",
      emoji: "☁️",
      skills: [
        { name: "AWS", icon: "🌩️" },
        { name: "IBM Cloud Pak", icon: "☁️" },
      ],
    },
    {
      title: "Tools & Technologies",
      emoji: "🛠️",
      skills: [
        { name: "Git", icon: "📊" },
        { name: "GitHub", icon: "🐙" },
        { name: "Informatica PowerCenter", icon: "⚡" },
        { name: "ETL", icon: "🔄" },
        { name: "JSON Processing", icon: "📋" },
      ],
    },
  ];
  
  const getRandomDelay = () => {
    return Math.random() * 0.3;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardName: string) => {
    if (hoveredSkill !== cardName) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };
  
  const resetCardTransform = (card: HTMLDivElement) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  return (
    <section id="skills" ref={sectionRef} className="bg-card/30 py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Skills & Technologies</h2>
        <p className="section-subheading appear-animate">
          My technical skills and the technologies I work with.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="perspective-1000">
              <Card 
                className="glass-card h-full appear-animate hover:shadow-xl transition-all duration-300 preserve-3d" 
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setHoveredSkill(`cat-${idx}`)}
                onMouseLeave={(e) => {
                  resetCardTransform(e.currentTarget);
                  setHoveredSkill(null);
                }}
                onMouseMove={(e) => handleMouseMove(e, `cat-${idx}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4 relative" style={{ transform: 'translateZ(20px)' }}>
                    <span className="text-3xl animate-float">{category.emoji}</span>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 relative" style={{ transform: 'translateZ(30px)' }}>
                    {category.skills.map((skill, skillIdx) => (
                      <TooltipProvider key={skillIdx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="skill-pill appear-animate transition-all duration-300 hover:scale-105 preserve-3d" 
                              style={{ 
                                animationDelay: `${0.1 + getRandomDelay()}s`,
                                transform: `translateZ(${skillIdx * 2}px)`,
                                boxShadow: hoveredSkill === `cat-${idx}` ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'
                              }}
                              onMouseEnter={() => {
                                const element = document.querySelector(`#skill-${idx}-${skillIdx}`) as HTMLElement;
                                if (element) {
                                  element.style.transform = 'scale(1.1) translateZ(40px)';
                                }
                              }}
                              onMouseLeave={() => {
                                const element = document.querySelector(`#skill-${idx}-${skillIdx}`) as HTMLElement;
                                if (element) {
                                  element.style.transform = `translateZ(${skillIdx * 2}px)`;
                                }
                              }}
                              id={`skill-${idx}-${skillIdx}`}
                            >
                              <span className="mr-2 animate-float" style={{ animationDelay: `${0.2 * skillIdx}s` }}>{skill.icon}</span>
                              {skill.name}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
