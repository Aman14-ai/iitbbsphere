import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Study Materials', href: '/materials' },
    { name: 'Subject Notes', href: '/notes' },
    { name: 'Video Lectures', href: '/videos' },
    { name: 'Assignments', href: '/assignments' },
    { name: 'Question Papers', href: '/papers' },
  ];

  const communityLinks = [
    { name: 'Student Discussions', href: '/discussions' },
    { name: 'Birthday Wishes', href: '/wishes' },
    { name: 'Study Groups', href: '/groups' },
    { name: 'Faculty Directory', href: '/faculty' },
    { name: 'Events', href: '/events' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Report Issue', href: '/report' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-accent/10 border-t border-border mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                IITBBSphere
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Your premier educational platform for knowledge sharing, student interaction, 
              and academic growth. Connecting students and faculty through meaningful educational experiences.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Made for students, by students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Study Resources
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Community
            </h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>IIT Bhubaneswar Campus, Bhubaneswar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@iitbbsphere.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-xs text-muted-foreground">Study Materials</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1K+</div>
            <div className="text-xs text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-xs text-muted-foreground">Faculty Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} IITBBSphere. All rights reserved. 
              <span className="mx-2">•</span>
              Designed for educational purposes
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Follow us:</span>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform) => (
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