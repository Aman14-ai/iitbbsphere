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

  return (
    <section
      id="contact"
      className=" py-20 bg-gradient-to-b from-accent/5 to-background overflow-hidden"
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
          {/* Animated Illustration */}
          <div className="space-y-8 hidden md:block">
            <div className="relative p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-primary rounded-full animate-bounce"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* Animated Mail Icon */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                    <Mail className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-background"></div>
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Let&apos;s Start a Conversation
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Drop us a message and we&apos;ll get back to you faster, Our
                  team is excited to help you with your study needs.
                </p>

                {/* Animated Dots */}
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${dot * 0.2}s` }}
                    ></div>
                  ))}
                </div>

                {/* Quick Response Indicator */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Do help Your friends for any kind of update
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary mb-1">1h</div>
                <div className="text-xs text-muted-foreground">
                  Avg Response
                </div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs text-muted-foreground">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

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
