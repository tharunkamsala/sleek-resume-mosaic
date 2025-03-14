
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award } from "lucide-react";

interface Publication {
  title: string;
  conference: string;
  date: string;
  description: string;
  link?: string;
  certificate?: boolean;
}

const PublicationsSection: React.FC = () => {
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

  const publications: Publication[] = [
    {
      title: "Housing Market Intelligence: Data Science for Rental Price Forecasting",
      conference: "INOCON 2024",
      date: "2024",
      description: "Research on advanced data science techniques for predicting rental prices in housing markets.",
      link: "https://ieeexplore.ieee.org/document/10511646",
    },
    {
      title: "Deep Learning Approaches to Image-Based Species Identification",
      conference: "ICICACS 2024",
      date: "2024",
      description: "Exploration of various deep learning models for accurate species identification using image data.",
      link: "https://ieeexplore.ieee.org/document/10498423",
    },
    {
      title: "Detection of Alzheimer's Disease Using Imaging and Machine Learning",
      conference: "IEEE Conference",
      date: "2023",
      description: "Research on applying machine learning techniques to medical imaging for early detection of Alzheimer's disease.",
      certificate: true,
    },
  ];

  return (
    <section id="publications" ref={sectionRef} className="bg-background py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Publications</h2>
        <p className="section-subheading appear-animate">
          My research papers and academic contributions.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-10 max-w-3xl mx-auto">
          {publications.map((pub, index) => (
            <Card 
              key={index} 
              className="glass-card overflow-hidden appear-animate"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Publication icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {pub.certificate ? (
                        <Award className="h-6 w-6 text-primary" />
                      ) : (
                        <svg 
                          className="h-6 w-6 text-primary" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Publication details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <span className="text-primary font-medium">{pub.conference}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{pub.date}</span>
                    </div>
                    <p className="text-muted-foreground">{pub.description}</p>
                  </div>
                </div>
              </CardContent>
              
              {(pub.link || pub.certificate) && (
                <CardFooter className="p-6 pt-0 flex justify-end">
                  {pub.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        IEEE Link
                      </a>
                    </Button>
                  )}
                  {pub.certificate && (
                    <Button variant="outline" size="sm">
                      <Award className="mr-2 h-4 w-4" />
                      IEEE Certificate
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
