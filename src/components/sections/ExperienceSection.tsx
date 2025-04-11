
import React from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import TimelineItem from "../experience/TimelineItem";

// Experience data
const experiences = [
  {
    title: "Senior Software Development Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    duration: "Jan 2023 - Present",
    description: "Leading the development of high-performance web applications and services. Implementing cloud-native solutions using AWS services. Mentoring junior developers and promoting best practices in software development."
  },
  {
    title: "Software Development Engineer II",
    company: "Microsoft",
    location: "Redmond, WA",
    duration: "Jun 2021 - Dec 2022",
    description: "Developed and maintained critical components for Microsoft Azure. Collaborated with cross-functional teams to design and implement scalable solutions. Improved system performance and reliability."
  },
  {
    title: "Software Development Engineer",
    company: "Google",
    location: "Mountain View, CA",
    duration: "Jul 2019 - May 2021",
    description: "Worked on Google Cloud Platform services. Designed and implemented RESTful APIs. Contributed to the development of microservices architecture."
  },
  {
    title: "Software Engineer Intern",
    company: "Meta",
    location: "Menlo Park, CA",
    duration: "May 2018 - Aug 2018",
    description: "Developed features for Facebook's internal tools. Worked with React.js and Node.js to build user interfaces. Collaborated with senior engineers on system design."
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading flex items-center justify-center">
            <Briefcase className="w-8 h-8 mr-3 text-primary" />
            My Growth Journey
          </h2>
          <p className="section-subheading">
            Charting my professional evolution through impactful roles and meaningful contributions
          </p>
        </div>

        {/* Growth Timeline */}
        <div className="relative max-w-5xl mx-auto my-16 min-h-[800px] px-4">
          {/* Vertical line */}
          <div 
            className="growth-line-vertical" 
            style={{ 
              height: `calc(100% - 60px)`,
              top: '30px'
            }}
          ></div>

          {/* Timeline items */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                position={index % 2 === 0 ? "left" : "right"}
                title={exp.title}
                company={exp.company}
                location={exp.location}
                duration={exp.duration}
                description={exp.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Premium gradient orbs */}
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-[100px] opacity-30"></div>
      </div>
    </section>
  );
};

export default ExperienceSection;
