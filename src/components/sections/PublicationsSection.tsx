
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Book, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface Publication {
  title: string;
  conference: string;
  date: string;
  description: string;
  link?: string;
  certificate?: boolean;
  abstract?: string;
}

const PublicationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);

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
      abstract: "This paper explores how machine learning and data science techniques can be applied to forecast rental prices in dynamic housing markets. We developed a comprehensive model that accounts for historical pricing trends, location features, property attributes, and macroeconomic indicators to provide accurate predictions."
    },
    {
      title: "Deep Learning Approaches to Image-Based Species Identification",
      conference: "ICICACS 2024",
      date: "2024",
      description: "Exploration of various deep learning models for accurate species identification using image data.",
      link: "https://ieeexplore.ieee.org/document/10498423",
      abstract: "Our research compares different convolutional neural network architectures for automatically identifying plant and animal species from images. We demonstrate that transfer learning from pre-trained models significantly improves accuracy even with limited training data, enabling more efficient biodiversity monitoring systems."
    },
    {
      title: "Detection of Alzheimer's Disease Using Imaging and Machine Learning",
      conference: "IEEE Conference",
      date: "2023",
      description: "Research on applying machine learning techniques to medical imaging for early detection of Alzheimer's disease.",
      certificate: true,
      abstract: "In this study, we developed an automated system that analyzes brain MRI scans to detect early signs of Alzheimer's disease. Our approach combines image processing techniques with deep learning models to identify subtle structural changes that may indicate disease progression before clinical symptoms appear."
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedPublication(expandedPublication === index ? null : index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section id="publications" ref={sectionRef} className="bg-background py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">Publications</h2>
        <p className="section-subheading appear-animate">
          My research papers and academic contributions.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-10 max-w-4xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className="appear-animate"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
            >
              <Card 
                className={`overflow-hidden glass-card transform transition-all duration-300 ${
                  expandedPublication === index ? 'scale-[1.02] shadow-xl border-primary/30' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="p-6 relative">
                    {/* Decorative gradient line at top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 via-accent/50 to-primary/20"></div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Publication icon */}
                      <div className="flex-shrink-0">
                        <motion.div 
                          className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center"
                          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {pub.certificate ? (
                            <Award className="h-8 w-8 text-primary" />
                          ) : (
                            <Book className="h-8 w-8 text-primary" />
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Publication details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                          <span className="text-primary font-medium">{pub.conference}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {pub.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{pub.description}</p>
                        
                        {/* Abstract section */}
                        {pub.abstract && (
                          <div className="mt-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary/80 hover:text-primary hover:bg-primary/5 -ml-2.5 flex items-center gap-1"
                              onClick={() => toggleExpand(index)}
                            >
                              {expandedPublication === index ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  Hide Abstract
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  View Abstract
                                </>
                              )}
                            </Button>
                            
                            {expandedPublication === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 p-4 bg-primary/5 border border-primary/10 rounded-lg text-sm"
                              >
                                <h4 className="font-medium text-primary/80 mb-2">Abstract</h4>
                                <p className="text-muted-foreground">{pub.abstract}</p>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {(pub.link || pub.certificate) && (
                  <CardFooter className="px-6 py-4 border-t border-border/40 bg-secondary/10">
                    <div className="flex justify-end w-full">
                      {pub.link && (
                        <Button variant="outline" size="sm" className="mr-2 bg-white/50 hover:bg-primary/10 hover:text-primary" asChild>
                          <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            IEEE Link
                          </a>
                        </Button>
                      )}
                      {pub.certificate && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/50 hover:bg-primary/10 hover:text-primary"
                        >
                          <Award className="mr-2 h-4 w-4" />
                          IEEE Certificate
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
