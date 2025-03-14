
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ContactSection from "@/components/sections/ContactSection";
import Chatbot from "@/components/chatbot/Chatbot";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Intersection observer animation component
const AnimatedSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  // Load Typewriter.js effect
  useEffect(() => {
    const loadTypewriter = async () => {
      try {
        await import("typewriter-effect");
      } catch (error) {
        console.error("Failed to load typewriter effect:", error);
      }
    };
    loadTypewriter();
  }, []);

  // Add scroll animation effects
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-viewport");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const animatedElements = document.querySelectorAll(".appear-animate");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      {/* Sections */}
      <HeroSection />
      
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <SkillsSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <ExperienceSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <ProjectsSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <PublicationsSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <AwardsSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>
      
      {/* Chatbot */}
      <Chatbot />
    </Layout>
  );
};

export default Index;
