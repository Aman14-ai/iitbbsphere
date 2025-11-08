"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactSection from "@/modules/home/ui/components/ContactSection";
import Link from "next/link";
import React, { useState } from "react";

const Contribute = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      <ContactSection open={openContact} onOpenChange={setOpenContact} />
      <Card className="mt-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto  mb-4">
            You can also become an admin to upload new resources and support
            others.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setOpenContact(true)}
              className="cursor-pointer"
              asChild
            >
              <span>Contribute</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contribute;
