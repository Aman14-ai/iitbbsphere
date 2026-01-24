"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { branchInfo } from "../../../../../constants";
import SemesterChoose from "../components/SemesterChoose";

interface Props {
  branch: string;
}

const DashboardBranchView = ({ branch }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const branchData = branchInfo[branch] || {
    name: branch
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "Engineering branch",
  };

  return (
    <div className=" px-4 py-25 pb-80">
      <div className="max-w-5xl mx-auto flex flex-col space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {branchData.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Select your semester to access study materials and resources.
          </p>
        </div>

        {/* Semester Selection */}
        <div className="flex items-center justify-center">
          <SemesterChoose
            branch={branch}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBranchView;
