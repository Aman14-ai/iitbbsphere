"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";
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
    color: "from-primary to-primary/70",
  };

  return (
    <div className="min-h-screen pt-25 bg-gradient-to-br from-background to-accent/5  px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex text-xs md:text-md items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary  font-medium mb-3">
            <GraduationCap className="w-4 h-4" />
            {branchData.name}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
            Choose Your Semester
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your semester to access study materials, resources
          </p>
        </div>

        {/* Branch Info Card */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="px-4 md:px-6 py-3">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${branchData.color} flex items-center justify-center`}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {branchData.name}
                </h2>
                <p className="text-muted-foreground ">
                  {branchData.description}
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard">Back to Branches</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <SemesterChoose
          branch={branch}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />

        {/* Additional Info */}
        <Card className="mt-10 border border-border shadow-lg bg-gradient-to-r from-primary/5 via-background to-accent/10 rounded-xl">
          <CardContent className="py-7 px-6 flex flex-col items-center text-center gap-2">
            {/* Icon for community/updates */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {branch} Community: Updates & Help
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Find or share important updates in your community. If you know
              about any new information, please post and pin it so the admin can
              keep everyone updated.
            </p>
            <Link href={`/dashboard/${branch}/community`}>
              <Button variant="secondary" className="mt-2 shadow text-sm">
                Go To Community
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardBranchView;
