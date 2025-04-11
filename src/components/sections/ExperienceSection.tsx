
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, ChevronRight, Award, MapPin, Route, ArrowUpRight, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
    
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
      title: "Software Development Engineer Intern",
      company: "IBM Expert Labs",
      logo: "IBM",
      period: "February 2024 – August 2024",
      description: "Started my journey focused on ETL migration and data transformation solutions.",
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
    {
      title: "Software Development Engineer",
      company: "IBM Expert Labs",
      logo: "IBM",
      period: "August 2024 – Present",
      description: "Promoted to full-time role working on ETL migration tools and data processing automation systems.",
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

  const nodeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: { 
      scale: 1.15, 
      boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const pathVariants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
        opacity: { duration: 0.5, ease: "easeInOut" }
      }
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="bg-background py-24 relative overflow-hidden">
      {/* Premium background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background opacity-80 z-0"></div>
      
      {/* Decorative orbs */}
      <div className="absolute top-20 right-[10%] w-[300px] h-[300px] gradient-orb opacity-20"></div>
      <div className="absolute bottom-20 left-[5%] w-[200px] h-[200px] gradient-orb opacity-10"></div>
      
      <div className="container-section relative z-10">
        <h2 className="section-heading appear-animate premium-text-gradient">Career Growth Path</h2>
        <p className="section-subheading appear-animate">
          Follow my professional journey and growth as a software engineer
        </p>

        <div className="mt-16 max-w-4xl mx-auto">
          {/* Vertical Growth Path Timeline */}
          <div className="relative flex flex-col items-center mb-12">
            {/* Vertical Growth Path Line */}
            <div className="absolute h-full w-1 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 left-1/2 transform -translate-x-1/2 rounded-full"></div>
            
            {/* "Start" indicator */}
            <motion.div 
              className="relative z-10 mb-12 premium-glass rounded-full px-5 py-2 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm font-medium text-primary">Career Start</span>
            </motion.div>

            {/* Experience Cards (Vertical Timeline) */}
            <div className="relative grid grid-cols-1 gap-24 w-full">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="appear-animate relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={index}
                  variants={cardVariants}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 -top-12 z-10"
                    variants={nodeVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true }}
                    custom={index}
                    onMouseEnter={() => setHoveredNode(index)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        activeExperience === index ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-secondary border-2 border-primary/30'
                      }`}
                      onClick={() => setActiveExperience(index === activeExperience ? null : index)}
                    >
                      {index === 0 ? (
                        <MapPin className={`h-5 w-5 ${activeExperience === index ? 'text-primary-foreground' : 'text-primary'}`} />
                      ) : (
                        <ArrowUp className={`h-5 w-5 ${activeExperience === index ? 'text-primary-foreground' : 'text-primary'}`} />
                      )}
                    </div>
                    
                    {hoveredNode === index && (
                      <motion.div 
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 p-2 rounded-lg shadow-lg z-20 whitespace-nowrap premium-glass"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        <span className="text-sm font-medium">{exp.title}</span>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Card with arrow pointing to timeline */}
                  <Card 
                    className={`overflow-hidden premium-glass transition-all duration-500 hover-lift group mt-6 ${
                      activeExperience === index ? 'border-primary/40 shadow-xl shadow-primary/10' : 'border-2 hover:border-primary/30'
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="p-7 relative">
                        {/* Top decoration */}
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
                                <h3 className="text-2xl font-bold text-foreground/90 group-hover:text-primary transition-colors flex items-center gap-2">
                                  {exp.title}
                                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        
                        <Collapsible
                          open={activeExperience === index}
                          className="mt-6"
                        >
                          <CollapsibleTrigger asChild>
                            <button className="w-full py-2.5 px-5 bg-secondary/50 rounded-xl hover:bg-secondary/80 transition-all text-base flex items-center justify-between">
                              <span className="font-medium">Key Projects</span>
                              <ChevronRight 
                                className={`h-5 w-5 text-primary transition-transform duration-300 ${
                                  activeExperience === index ? 'rotate-90' : ''
                                }`} 
                              />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-7 animate-accordion-down">
                            <div className="relative pl-8">
                              {/* Left timeline for projects */}
                              <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"></div>
                              
                              <div className="space-y-10">
                                {exp.projects.map((project, pIdx) => (
                                  <motion.div 
                                    key={pIdx} 
                                    className="relative"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: pIdx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                  >
                                    {/* Project dot */}
                                    <div className="absolute left-[-25px] top-0 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary/50 shadow-sm"></div>
                                    
                                    <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                                      <Route className="h-5 w-5 text-primary" />
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
                                      <div className="mt-4 bg-secondary/30 p-4 rounded-xl premium-glass">
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
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* "Future" indicator */}
            <motion.div 
              className="relative z-10 mt-12 premium-glass rounded-full px-5 py-2 border border-primary/20"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-sm font-medium text-primary">Future Growth...</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
