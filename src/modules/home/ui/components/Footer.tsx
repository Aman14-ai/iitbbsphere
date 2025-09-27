import React from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const quickLinks = [
  //   { name: "Study Materials", href: "/materials" },
  //   { name: "Subject Notes", href: "/notes" },
  //   { name: "Video Lectures", href: "/videos" },
  //   { name: "Assignments", href: "/assignments" },
  //   { name: "Question Papers", href: "/papers" },
  // ];

  // const communityLinks = [
  //   { name: "Student Discussions", href: "/discussions" },
  //   { name: "Birthday Wishes", href: "/wishes" },
  //   { name: "Study Groups", href: "/groups" },
  //   { name: "Faculty Directory", href: "/faculty" },
  //   { name: "Events", href: "/events" },
  // ];

  // const supportLinks = [
  //   { name: "Help Center", href: "/help" },
  //   { name: "Contact Us", href: "/contact" },
  //   { name: "Report Issue", href: "/report" },
  //   { name: "Feedback", href: "/feedback" },
  //   { name: "Privacy Policy", href: "/privacy" },
  // ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-accent/10 border-t border-border mt-20 overflow-hidden">
     

      

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/60 backdrop-blur">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              © {currentYear} IITBBSphere. All rights reserved.
              <span className="mx-2">•</span>
              Designed for educational purposes
            </div>
            <div className="flex items-center gap-4">
              <span>Follow us:</span>
              <div className="flex gap-3">
                {["Twitter", "LinkedIn", "GitHub"].map((platform) => (
                  <Link
                    key={platform}
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {platform}
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
