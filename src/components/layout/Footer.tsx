
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 border-t border-border py-8">
      <div className="container-section py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="text-xl font-display font-bold tracking-tighter">
            Kamsala<span className="text-primary">Tharun</span>
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/tharunkamsala" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors hover:bg-secondary hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/tharun-kamsala" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors hover:bg-secondary hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:tharunkamsala24@gmail.com" 
              className="p-2 rounded-full transition-colors hover:bg-secondary hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            Copyright © {currentYear} Kamsala Tharun. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
