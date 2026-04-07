"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import JeeDialog from "@/modules/jee/components/JeeDialog";
import React, { useState } from "react";

const JEEView = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <div className="pt-25 min-h-screen py-8 px-4">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold  mb-3">JEE Contents</h1>
        </div>
      </div>
      <div className=" flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-lg font-medium">Access study materials</h2>

            <p className="text-sm text-muted-foreground">
              Select your subjects to view subject-wise academic resources.
            </p>

            <Button onClick={() => setIsDialogOpen(true)} className="w-full">
              Select subjects
            </Button>
          </CardContent>
        </Card>

        {/* Semester Selection Dialog */}
        <JeeDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </div>
  );
};

export default JEEView;
