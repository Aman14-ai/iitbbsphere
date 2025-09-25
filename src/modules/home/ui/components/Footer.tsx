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

  const quickLinks = [
    { name: "Study Materials", href: "/materials" },
    { name: "Subject Notes", href: "/notes" },
    { name: "Video Lectures", href: "/videos" },
    { name: "Assignments", href: "/assignments" },
    { name: "Question Papers", href: "/papers" },
  ];

  const communityLinks = [
    { name: "Student Discussions", href: "/discussions" },
    { name: "Birthday Wishes", href: "/wishes" },
    { name: "Study Groups", href: "/groups" },
    { name: "Faculty Directory", href: "/faculty" },
    { name: "Events", href: "/events" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Report Issue", href: "/report" },
    { name: "Feedback", href: "/feedback" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-accent/10 border-t border-border mt-20 overflow-hidden">
      {/* Subtle Decorative Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-28 h-28 bg-primary rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-14 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-lg shadow-md group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                IITBBSphere
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Your premier educational platform for knowledge sharing, student
              interaction, and academic growth. Connecting students and faculty
              through meaningful educational experiences.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Made for students, by students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Study Resources
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Community
            </h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>IIT Bhubaneswar Campus, Bhubaneswar</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@iitbbsphere.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 XXX XXX XXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-border">
          {[
            { value: "500+", label: "Study Materials" },
            { value: "1K+", label: "Active Students" },
            { value: "50+", label: "Faculty Members" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center hover:scale-105 transition-transform"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

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
