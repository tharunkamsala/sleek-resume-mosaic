
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  logo: string;
  period: string;
  description: string;
  projects: {
    title: string;
    description: string;
    technologies: string[];
    achievements?: string[];
  }[];
}

const ExperienceSection: React.FC = () => {
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

  const experiences: Experience[] = [
    {
      title: "Software Development Engineer",
      company: "IBM Expert Labs",
      logo: "IBM",
      period: "August 2024 – Present",
      description: "Working on ETL migration tools and data processing automation systems.",
      projects: [
        {
          title: "Automated ETL Migration Tool",
          description: "Built an automation tool in Python for migrating ETL mappings.",
          technologies: ["Python", "ETL", "Informatica PowerCenter"],
          achievements: ["Improved migration speed and efficiency"],
        },
        {
          title: "Data Processing & Automation System",
          description: "Comprehensive system for data processing with both backend and frontend components.",
          technologies: ["Node.js", "Express", "React.js", "Python"],
          achievements: [
            "Developed a Node.js & Express backend with file upload capabilities",
            "Automated data transformation using Python scripts",
            "Built a React.js UI for intuitive file uploads & JSON processing"
          ],
        },
      ],
    },
    {
      title: "Software Development Engineer Intern",
      company: "IBM Expert Labs",
      logo: "IBM",
      period: "February 2024 – August 2024",
      description: "Focused on ETL migration and data transformation solutions.",
      projects: [
        {
          title: "ETL Migration Tool",
          description: "Developed an ETL migration tool using Python & Informatica PowerCenter.",
          technologies: ["Python", "Informatica PowerCenter", "ETL"],
          achievements: [
            "Increased migration speed by 90%",
            "Enhanced data transformation accuracy to 95%"
          ],
        },
      ],
    },
  ];

  const companyLogos: Record<string, React.ReactNode> = {
    IBM: (
      <div className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white font-bold text-sm rounded">
        IBM
      </div>
    )
  };

  return (
    <section id="experience" ref={sectionRef} className="bg-background py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Work Experience</h2>
        <p className="section-subheading appear-animate">
          My professional journey and notable projects I've worked on.
        </p>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row md:items-center gap-8 appear-animate ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 bg-primary/20 border-2 border-primary rounded-full transform -translate-x-1/2 translate-y-3"></div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-10 md:pl-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="glass-card overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex gap-4 items-start">
                            {companyLogos[exp.logo] && (
                              <motion.div 
                                whileHover={{ rotate: 10 }}
                                className="flex-shrink-0"
                              >
                                {companyLogos[exp.logo]}
                              </motion.div>
                            )}
                            <div>
                              <h3 className="text-xl font-bold">{exp.title}</h3>
                              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                                <Briefcase className="h-4 w-4" />
                                <span>{exp.company}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        
                        {/* Projects */}
                        <div className="space-y-4 mt-6">
                          {exp.projects.map((project, pIdx) => (
                            <div key={pIdx} className="border-t pt-4 border-border">
                              <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                              <p className="text-muted-foreground mb-3">{project.description}</p>
                              
                              {/* Technologies */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.technologies.map((tech, tIdx) => (
                                  <Badge key={tIdx} variant="secondary">{tech}</Badge>
                                ))}
                              </div>
                              
                              {/* Achievements */}
                              {project.achievements && project.achievements.length > 0 && (
                                <div className="mt-3">
                                  <h5 className="text-sm font-medium mb-2">Key Achievements:</h5>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {project.achievements.map((achievement, aIdx) => (
                                      <li key={aIdx}>{achievement}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
