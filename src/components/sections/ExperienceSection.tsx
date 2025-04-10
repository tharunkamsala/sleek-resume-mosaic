
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, ChevronRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  const [activeExperience, setActiveExperience] = useState<number | null>(0);

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
      <div className="h-14 w-14 flex items-center justify-center bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg">
        IBM
      </div>
    )
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section id="experience" ref={sectionRef} className="bg-background py-24">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Work Experience</h2>
        <p className="section-subheading appear-animate">
          My professional journey and notable projects I've worked on.
        </p>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="appear-animate"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={index}
                variants={cardVariants}
              >
                <Card 
                  className="overflow-hidden apple-card border-2 hover:border-primary/30 hover-lift group"
                  onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                >
                  <CardContent className="p-0">
                    <div className="p-7 relative">
                      {/* Top gradient decoration */}
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/50 via-accent to-primary/20"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <motion.div 
                          whileHover={{ rotate: [0, -3, 3, -3, 0], scale: 1.05 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-shrink-0"
                        >
                          {companyLogos[exp.logo]}
                        </motion.div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground/90 group-hover:text-primary transition-colors">
                                {exp.title}
                              </h3>
                              <div className="flex items-center gap-1.5 text-lg text-primary/80 font-medium">
                                <Briefcase className="h-4 w-4" />
                                <span>{exp.company}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/80 px-4 py-1.5 rounded-full shadow-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mt-4 text-lg">{exp.description}</p>
                        </div>
                      </div>
                      
                      <Accordion 
                        type="single" 
                        collapsible
                        value={activeExperience === index ? "projects" : ""}
                        className="mt-5"
                      >
                        <AccordionItem value="projects" className="border-none">
                          <AccordionTrigger className="py-2.5 px-5 bg-secondary/50 rounded-xl hover:bg-secondary/80 transition-all text-base">
                            <span className="font-medium">Key Projects</span>
                          </AccordionTrigger>
                          
                          <AccordionContent className="pt-7">
                            <div className="space-y-10">
                              {exp.projects.map((project, pIdx) => (
                                <motion.div 
                                  key={pIdx} 
                                  className="relative pl-7 border-l-2 border-primary/30"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: pIdx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                >
                                  {/* Project dot */}
                                  <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary/50 shadow-sm"></div>
                                  
                                  <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                                    <ChevronRight className="h-5 w-5 text-primary" />
                                    {project.title}
                                  </h4>
                                  <p className="text-muted-foreground mb-4 text-base">{project.description}</p>
                                  
                                  {/* Technologies */}
                                  <div className="flex flex-wrap gap-2.5 mb-4">
                                    {project.technologies.map((tech, tIdx) => (
                                      <Badge 
                                        key={tIdx} 
                                        variant="secondary"
                                        className="bg-secondary/70 hover:bg-primary/10 hover:text-primary transition-colors text-sm px-3 py-1"
                                      >
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  {/* Achievements */}
                                  {project.achievements && project.achievements.length > 0 && (
                                    <div className="mt-4 bg-secondary/30 p-4 rounded-xl">
                                      <h5 className="text-base font-medium flex items-center gap-1.5 mb-3">
                                        <Award className="h-4 w-4 text-primary" />
                                        Key Achievements:
                                      </h5>
                                      <ul className="space-y-2">
                                        {project.achievements.map((achievement, aIdx) => (
                                          <li 
                                            key={aIdx} 
                                            className="text-base text-muted-foreground pl-5 relative"
                                          >
                                            <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-primary/40"></span>
                                            {achievement}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
