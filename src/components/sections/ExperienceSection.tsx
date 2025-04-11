
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Briefcase, Calendar, Award, ArrowUpCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeExperience, setActiveExperience] = useState<number | null>(null);

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
      <div className="h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-sm rounded-xl">
        IBM
      </div>
    )
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const projectVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 appear-animate premium-text-gradient">
          Work Experience
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto appear-animate">
          My professional journey and notable achievements along the way.
        </p>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/10 rounded-full"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                variants={variants}
              >
                {/* Timeline node */}
                <div className="absolute left-[-14px] md:left-1/2 md:transform md:translate-x-[-50%] w-7 h-7 rounded-full bg-background border-2 border-primary/60 shadow-[0_0_15px_rgba(147,51,234,0.3)] z-10">
                  {index === 0 ? 
                    <ArrowUpCircle className="w-full h-full text-primary p-0.5" /> :
                    <CheckCircle2 className="w-full h-full text-primary p-0.5" />
                  }
                </div>

                {/* Card - alternating sides on larger screens */}
                <div className={`relative ml-8 md:ml-0 md:w-[46%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <Card 
                    className="premium-glass group transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/5 border-primary/10 hover:border-primary/20"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        {/* Top decoration */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30"></div>
                        
                        <div className="flex items-start gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 mt-1"
                          >
                            {companyLogos[exp.logo]}
                          </motion.div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <div className="flex items-center gap-1 text-sm text-primary/90">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span>{exp.company}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                <Calendar className="h-3 w-3" />
                                <span>{exp.period}</span>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                            
                            {/* Key Projects Section */}
                            <div className="mt-4">
                              <div 
                                className="flex items-center gap-1.5 mb-3 text-sm font-medium cursor-pointer text-primary/80 hover:text-primary"
                                onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                              >
                                <span>Key Projects</span>
                                <ChevronRight className={`h-4 w-4 transform transition-transform ${activeExperience === index ? 'rotate-90' : ''}`} />
                              </div>
                              
                              <AnimatePresence>
                                {activeExperience === index && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                  >
                                    {exp.projects.map((project, pIdx) => (
                                      <motion.div 
                                        key={pIdx} 
                                        className="relative pl-5 border-l-2 border-primary/20"
                                        initial="hidden"
                                        animate="visible"
                                        custom={pIdx}
                                        variants={projectVariants}
                                      >
                                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary/40"></div>
                                        
                                        <HoverCard>
                                          <HoverCardTrigger asChild>
                                            <h4 className="font-medium text-base cursor-help">
                                              {project.title}
                                            </h4>
                                          </HoverCardTrigger>
                                          <HoverCardContent className="w-80 premium-glass border-primary/20">
                                            <h5 className="font-semibold mb-2">{project.title}</h5>
                                            <p className="text-sm text-muted-foreground">{project.description}</p>
                                          </HoverCardContent>
                                        </HoverCard>
                                        
                                        <div className="flex flex-wrap gap-1.5 my-2">
                                          {project.technologies.map((tech, tIdx) => (
                                            <Badge 
                                              key={tIdx} 
                                              variant="secondary"
                                              className="text-xs px-2 py-0 h-5 bg-secondary/40 hover:bg-primary/10"
                                            >
                                              {tech}
                                            </Badge>
                                          ))}
                                        </div>
                                        
                                        {project.achievements && project.achievements.length > 0 && (
                                          <div className="mt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 mb-1">
                                              <Award className="h-3 w-3 text-primary/70" />
                                              <span>Achievements:</span>
                                            </div>
                                            <ul className="space-y-1 text-xs text-muted-foreground">
                                              {project.achievements.map((achievement, aIdx) => (
                                                <li 
                                                  key={aIdx} 
                                                  className="flex items-start gap-1.5"
                                                >
                                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/30 flex-shrink-0"></span>
                                                  <span>{achievement}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
