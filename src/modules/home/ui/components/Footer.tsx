import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/amanchoudhary.js/", icon: <Instagram /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aman-kumar-356075293/", icon: <Linkedin /> },
    { name: "GitHub", url: "https://github.com/Aman14-ai", icon: <Github /> },
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-border overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 backdrop-blur">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              © {currentYear} IITBBSphere. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    <Button variant="link" size="sm">
                      {platform.icon}
                      {platform.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
