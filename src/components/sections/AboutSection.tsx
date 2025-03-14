
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, Award } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  icon: React.ReactNode;
}

const AboutSection: React.FC = () => {
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

  const educationItems: EducationItem[] = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "NMIT, Bangalore",
      period: "2020 - 2024",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      degree: "12th Grade",
      institution: "Sri Chaitanya Junior College, Andhra Pradesh",
      period: "2018 - 2020",
      icon: <Building className="h-5 w-5" />,
    },
    {
      degree: "10th Grade",
      institution: "Sri Chaitanya Techno School, Andhra Pradesh",
      period: "2017 - 2018",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="bg-background py-20">
      <div className="container-section">
        <h2 className="section-heading appear-animate">About Me</h2>
        <p className="section-subheading appear-animate">
          Get to know my background, education, and what drives me as a developer.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-16">
          {/* Profile Image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full max-w-md appear-animate">
              <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-lg">
                {/* Profile image placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary/40">KT</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border border-primary/20 bg-primary/5"></div>
              <div className="absolute -z-20 -bottom-8 -right-8 w-full h-full rounded-2xl border border-primary/10 bg-primary/3"></div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6 appear-animate">
              <h3 className="text-2xl font-bold">Hello, I'm Tharun!</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a Software Development Engineer currently working at IBM Expert Labs in Bangalore. 
                My passion lies in creating efficient and intuitive software solutions that solve real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With experience in Python, Java, React.js, and Node.js, I specialize in building 
                full-stack applications, data processing automation tools, and ETL migration systems.
                I'm particularly interested in optimizing workflow processes and creating elegant, 
                user-friendly interfaces.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Outside of coding, I enjoy photography, problem-solving, and exploring new technologies.
                I'm always looking for opportunities to learn, grow, and collaborate on innovative projects.
              </p>
            </div>

            {/* Education Cards */}
            <div className="pt-4">
              <h3 className="text-xl font-bold mb-4 appear-animate">Education</h3>
              <div className="space-y-4">
                {educationItems.map((item, index) => (
                  <Card key={index} className="glass-card appear-animate">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4">
                        <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{item.degree}</h4>
                          <p className="text-muted-foreground">{item.institution}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.period}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
