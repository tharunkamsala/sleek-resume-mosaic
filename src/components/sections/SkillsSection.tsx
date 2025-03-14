
import React, { useEffect, useRef } from "react";
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

  return (
    <section id="skills" ref={sectionRef} className="bg-card/30 py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Skills & Technologies</h2>
        <p className="section-subheading appear-animate">
          My technical skills and the technologies I work with.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {skillCategories.map((category, idx) => (
            <Card key={idx} className="glass-card h-full appear-animate hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <TooltipProvider key={skillIdx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="skill-pill appear-animate transition-all duration-300 hover:scale-105" 
                            style={{ 
                              animationDelay: `${0.1 + getRandomDelay()}s` 
                            }}
                          >
                            <span className="mr-2">{skill.icon}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
