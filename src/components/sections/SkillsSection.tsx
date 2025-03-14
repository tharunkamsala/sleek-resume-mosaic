
import React, { useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCategory {
  title: string;
  skills: string[];
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
      skills: ["Python", "Java", "JavaScript", "TypeScript"],
    },
    {
      title: "Web Technologies",
      skills: ["React.js", "Spring Boot", "Node.js", "REST API", "HTML/CSS", "Express.js"],
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB", "JDBC", "IBM DB2"],
    },
    {
      title: "Cloud Technologies",
      skills: ["AWS", "IBM Cloud Pak"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "GitHub", "Informatica PowerCenter", "ETL", "JSON Processing"],
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
            <Card key={idx} className="glass-card h-full appear-animate">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <TooltipProvider key={skillIdx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="skill-pill appear-animate" 
                            style={{ 
                              animationDelay: `${0.1 + getRandomDelay()}s` 
                            }}
                          >
                            {skill}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skill Proficiency */}
        <div className="mt-16 appear-animate">
          <h3 className="text-2xl font-bold text-center mb-10">Technical Proficiency</h3>

          {/* Skill Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Python", level: 90 },
              { name: "Java", level: 85 },
              { name: "React.js", level: 80 },
              { name: "Node.js", level: 75 },
              { name: "Database Management", level: 85 },
              { name: "ETL Processes", level: 90 },
            ].map((skill, index) => (
              <div key={index} className="appear-animate" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ 
                      width: `${skill.level}%`,
                      transition: "width 1s ease-out"
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
