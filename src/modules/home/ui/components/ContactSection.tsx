"use client";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Zap,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, message, name, subject } = formData;
    setIsLoading(true);
    try {
      if (!email || !message || !name || !subject) {
        alert("Please fill all the fields");
        return;
      }
      const res = await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify({ name, email, message, subject }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) toast.success("Message sent successfully.");
      else if (!data.success) toast.error("Something went wrong.");
      // reset form data
      if (data.success)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      setIsLoading(false);
    } catch (error) {
      console.log(
        "Error in frontend while send email from contact section, ",
        error
      );
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "your-email@iitbbsphere.com",
      link: "mailto:amansachi2005@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon to Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "IIT Bhubaneswar Campus",
      link: "#",
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically reply within",
      value: "24 hours",
      link: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-accent/5 to-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary rounded-full blur-2xl"></div>
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 text-primary text-base font-semibold mb-5">
            <MessageCircle className="w-5 h-5" />
            Get In Touch
          </div>
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about sports equipment reservations? We&apos;re here
            to help and would love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <section className="space-y-8 hidden md:grid">
            {contactMethods.map(
              ({ icon: Icon, title, description, value, link }) => (
                <a
                  key={title}
                  href={link}
                  className="flex items-center gap-4 p-5 border border-border rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">
                      {title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                    <p className="mt-1 font-medium text-primary">{value}</p>
                  </div>
                </a>
              )
            )}
          </section>

          {/* Contact Form */}
          <Card className="border-border shadow-lg">
            <CardContent className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-xl">
                    Send us a message
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll get back to you soon
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-input border-border focus:ring-primary focus:ring-2"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-input border-border focus:ring-primary focus:ring-2"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-input border-border focus:ring-primary focus:ring-2"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="bg-input border-border resize-none focus:ring-primary focus:ring-2"
                  />
                </div>

                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/90 transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <span>Sending </span>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  By submitting this form, you agree to our privacy policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
