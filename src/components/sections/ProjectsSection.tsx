
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, GitBranch, GitCommit, GitPullRequest } from "lucide-react";

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    if (hoveredCard !== index) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetCardTransform = (card: HTMLDivElement) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

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

  return (
    <section id="projects" ref={sectionRef} className="bg-card/30 py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Projects</h2>
        <p className="section-subheading appear-animate">
          Explore some of my recent work and technical projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="perspective-1000"
            >
              <Card 
                className="glass-card overflow-hidden appear-animate preserve-3d transition-all duration-500 transform-gpu"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={(e) => {
                  resetCardTransform(e.currentTarget);
                  setHoveredCard(null);
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                {/* Project Image with Git-like graphics */}
                <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl font-bold text-primary/20 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
                    {project.title.split(" ").map(word => word[0]).join("")}
                  </div>
                  
                  {/* Git-style graphics */}
                  <div className="absolute bottom-3 left-3 flex items-center text-xs text-muted-foreground">
                    <GitBranch className="h-4 w-4 mr-1" />
                    <span>main</span>
                  </div>
                  
                  {index % 2 === 0 && (
                    <div className="absolute top-3 right-3">
                      <GitCommit className="h-4 w-4 text-primary/40" />
                    </div>
                  )}
                  
                  {index % 2 === 1 && (
                    <div className="absolute top-3 left-3">
                      <GitPullRequest className="h-4 w-4 text-primary/40" />
                    </div>
                  )}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d={`M ${index % 2 === 0 ? '20,20 L 80,80' : '80,20 L 20,80'}`} 
                      stroke="rgba(59, 130, 246, 0.2)" 
                      strokeWidth="1" 
                      fill="none" 
                    />
                  </svg>
                </div>
                
                <CardContent className="p-6 relative preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="transition-all duration-300 hover:scale-105 hover:shadow-md">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 flex gap-3 relative preserve-3d" style={{ transform: 'translateZ(40px)' }}>
                  {project.github && (
                    <Button variant="outline" size="sm" asChild className="transition-all duration-300 hover:shadow-lg">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="default" size="sm" asChild className="transition-all duration-300 hover:shadow-lg">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
