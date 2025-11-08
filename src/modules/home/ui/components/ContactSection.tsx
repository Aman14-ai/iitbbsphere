"use client";
import { Zap, Send, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ResponsiveDialog from "../../../../components/ResponsiveDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactSection = ({ open, onOpenChange }: Props) => {
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
      if (data.success) {
        toast.success("Message sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log("Error in frontend contact section: ", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ResponsiveDialog
      open={open}
      title="Contact Us"
      description="We would love to hear from you!"
      onOpenChange={onOpenChange}
    >
      <div className="container px-3 sm:px-4 mx-auto max-w-7xl relative z-10 scale-90 sm:scale-95 md:scale-100">
        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border shadow-lg">
            <CardContent className="p-7">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
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
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="name"
                      className="font-medium text-foreground"
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
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="email"
                      className="font-medium text-foreground"
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

                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="subject"
                    className=" font-medium text-foreground"
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

                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="message"
                    className=" font-medium text-foreground"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="bg-input border-border resize-none focus:ring-primary focus:ring-2"
                  />
                </div>

                <div className="flex items-center  justify-end ">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="sm:w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2">Sending</span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default ContactSection;
