
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Github, ExternalLink, Code, Terminal, Database, Layers, Server, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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

  const projects: Project[] = [
    {
      title: "Healthcare Hub",
      description: "A comprehensive hospital management system for scheduling appointments, managing patient care, and administrative operations. Features include CRUD operations, doctor profiles, and appointment tracking.",
      image: "",
      technologies: ["HTML", "CSS", "JavaScript", "Java", "JDBC"],
      github: "https://github.com/tharunkamsala/healthcare-hub",
    },
    {
      title: "Tumor Detection System",
      description: "An AI/ML project for brain tumor detection using advanced deep learning models including EfficientNet and 3D CNN. Achieved 90% accuracy in tumor classification.",
      image: "",
      technologies: ["Python", "Jupyter Notebook", "TensorFlow", "PyTorch", "OpenCV"],
      github: "https://github.com/tharunkamsala/tumor-detection",
    },
    {
      title: "ETL Migration Tool",
      description: "An automated tool for migrating ETL mappings with high efficiency and accuracy. Streamlines the migration process and improves data transformation workflows.",
      image: "",
      technologies: ["Python", "Informatica PowerCenter", "ETL"],
      github: "https://github.com/tharunkamsala/etl-migration",
    },
    {
      title: "Data Processing System",
      description: "A full-stack application for data processing and transformation with file upload capabilities and intuitive UI for JSON processing.",
      image: "",
      technologies: ["Node.js", "Express", "React.js", "Python"],
      github: "https://github.com/tharunkamsala/data-processing",
    },
  ];

  // Project category icon mapping
  const getProjectIcon = (technologies: string[]) => {
    const tech = technologies.join(" ").toLowerCase();
    if (tech.includes("react") || tech.includes("javascript") || tech.includes("html")) {
      return <Code className="w-8 h-8 text-primary" />;
    } else if (tech.includes("python") || tech.includes("jupyter")) {
      return <Terminal className="w-8 h-8 text-primary" />;
    } else if (tech.includes("etl") || tech.includes("data")) {
      return <Database className="w-8 h-8 text-primary" />;
    } else if (tech.includes("java")) {
      return <Cpu className="w-8 h-8 text-primary" />;
    } else {
      return <Layers className="w-8 h-8 text-primary" />;
    }
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-section">
        <h2 className="section-heading appear-animate">Projects</h2>
        <p className="section-subheading appear-animate mb-12">
          Explore some of my recent work and technical projects that showcase my skills and expertise.
        </p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="perspective-1000"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card 
                className={`overflow-hidden rounded-xl preserve-3d transition-all duration-500 transform-gpu ${
                  selectedProject === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                }`}
                onClick={() => setSelectedProject(index === selectedProject ? null : index)}
              >
                {/* Project Header Section */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center shadow-lg preserve-3d" style={{ transform: 'translateZ(20px)' }}>
                        {getProjectIcon(project.technologies)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="bg-background/50 backdrop-blur-sm">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm cursor-pointer">
                                  +{project.technologies.length - 3}
                                </Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-auto">
                                <div className="flex flex-wrap gap-1">
                                  {project.technologies.slice(3).map((tech, idx) => (
                                    <Badge key={idx} variant="secondary">{tech}</Badge>
                                  ))}
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute right-4 top-4 text-primary/20 text-xs flex items-center gap-1">
                      <code>&lt;/&gt;</code>
                    </div>
                  </div>
                  
                  {/* Animated line */}
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-6"></div>
                </div>
                
                <CardContent className="p-6 relative preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 flex gap-3 justify-between items-center preserve-3d" style={{ transform: 'translateZ(40px)' }}>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" className="rounded-full transition-all duration-300 hover:shadow-lg" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="default" size="sm" className="rounded-full transition-all duration-300 hover:shadow-lg" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Decorative code tag */}
                  <div className="text-xs text-muted-foreground font-mono opacity-70">
                    <Server className="w-3 h-3 inline-block mr-1" />
                    {project.technologies[0]}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
