import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Contribute = () => {
  return (
    <Card className="mt-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Can&apos;t find what you&apos;re looking for?
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm mb-4">
          Request specific study materials or contribute to the community. You can also become an admin to upload new resources and support others, making a meaningful impact.
        </p>
        <div className="flex gap-3 justify-center">
          
          <Button asChild>
            <Link href="/#contact">Contribute</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contribute;
