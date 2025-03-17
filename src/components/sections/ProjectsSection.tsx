
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code, FolderGit2, GitBranch } from "lucide-react";

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

  return (
    <section id="projects" ref={sectionRef} className="bg-card/30 py-20 relative">
      {/* Background code pattern */}
      <div className="absolute inset-0 bg-code-texture opacity-30" />
      
      <div className="container-section relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FolderGit2 className="h-8 w-8 text-primary" />
          <h2 className="section-heading appear-animate">Projects</h2>
        </div>
        <p className="section-subheading appear-animate font-mono">
          <span className="text-primary">/</span> Some of my recent work and technical projects <span className="text-primary">/</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="glass-card overflow-hidden appear-animate relative border border-border/30 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Branch decoration */}
              <div className="absolute top-4 right-4">
                <GitBranch className="h-5 w-5 text-primary/30" />
              </div>
              
              {/* Header with commit-like design */}
              <div className="bg-secondary/10 p-3 border-b border-border/30 flex items-center">
                <Code className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-mono font-bold">{project.title}</h3>
              </div>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 font-mono">
                  <span className="text-primary">/**</span> {project.description} <span className="text-primary">*/</span>
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 font-mono">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary/30 hover:bg-primary/10 transition-colors text-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex gap-3 border-t border-border/10 mt-4">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="font-mono">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      git clone
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button variant="default" size="sm" asChild className="font-mono">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      npm start
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
