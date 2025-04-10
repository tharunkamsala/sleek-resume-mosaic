
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
      <div className="h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg">
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
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <section id="experience" ref={sectionRef} className="bg-background py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Work Experience</h2>
        <p className="section-subheading appear-animate">
          My professional journey and notable projects I've worked on.
        </p>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-10">
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
                  className="overflow-hidden glass-card border-2 hover:border-primary/30 group"
                  onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                >
                  <CardContent className="p-0">
                    <div className="p-6 relative">
                      {/* Top gradient decoration */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/50 via-accent to-primary/20"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          className="flex-shrink-0"
                        >
                          {companyLogos[exp.logo]}
                        </motion.div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground/90 group-hover:text-primary transition-colors">
                                {exp.title}
                              </h3>
                              <div className="flex items-center gap-1 text-lg text-primary/80 font-medium">
                                <Briefcase className="h-4 w-4" />
                                <span>{exp.company}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm text-muted-foreground bg-secondary/80 px-3 py-1.5 rounded-full shadow-sm">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mt-3">{exp.description}</p>
                        </div>
                      </div>
                      
                      <Accordion 
                        type="single" 
                        collapsible
                        value={activeExperience === index ? "projects" : ""}
                        className="mt-4"
                      >
                        <AccordionItem value="projects" className="border-none">
                          <AccordionTrigger className="py-2 px-4 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-all">
                            <span className="text-sm font-medium">Key Projects</span>
                          </AccordionTrigger>
                          
                          <AccordionContent className="pt-6">
                            <div className="space-y-8">
                              {exp.projects.map((project, pIdx) => (
                                <motion.div 
                                  key={pIdx} 
                                  className="relative pl-6 border-l-2 border-primary/30"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: pIdx * 0.2 }}
                                >
                                  {/* Project dot */}
                                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary/50"></div>
                                  
                                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-primary" />
                                    {project.title}
                                  </h4>
                                  <p className="text-muted-foreground mb-3">{project.description}</p>
                                  
                                  {/* Technologies */}
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {project.technologies.map((tech, tIdx) => (
                                      <Badge 
                                        key={tIdx} 
                                        variant="secondary"
                                        className="bg-secondary/70 hover:bg-primary/10 hover:text-primary transition-colors"
                                      >
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  {/* Achievements */}
                                  {project.achievements && project.achievements.length > 0 && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium flex items-center gap-1 mb-2">
                                        <Award className="h-3.5 w-3.5 text-primary" />
                                        Key Achievements:
                                      </h5>
                                      <ul className="space-y-1">
                                        {project.achievements.map((achievement, aIdx) => (
                                          <li 
                                            key={aIdx} 
                                            className="text-sm text-muted-foreground pl-4 relative"
                                          >
                                            <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary/40"></span>
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
