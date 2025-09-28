"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { branchInfo } from "../../../../../constants";

interface Props {
  branch: string;
}

const DashboardBranchView = ({ branch }: Props) => {
  const [searchedInput, setSearchedInput] = useState("");
  console.log(searchedInput);

  const branchData = branchInfo[branch] || {
    name: branch
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "Engineering branch",
    color: "from-primary to-primary/70",
  };

  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);
  let SearchedSemester = semesters;
  if (searchedInput) {
    SearchedSemester = semesters.filter((sem) =>
      sem.toString().includes(searchedInput)
    );
  }

  // Sample data for semester content counts
  const getSemesterStats = (semester: number) => {
    const baseCount = Math.max(4, 8 - semester); // More content in earlier semesters
    return {
      subjects: baseCount + 2,
      materials: baseCount * 3,
      students: 150 + semester * 25,
    };
  };

  return (
    <div className="min-h-screen pt-25 bg-gradient-to-br from-background to-accent/5  px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            {branchData.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Choose Your Semester
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your semester to access study materials, resources, and
            connect with classmates
          </p>
        </div>

        {/* Branch Info Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="px-6 py-3">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${branchData.color} flex items-center justify-center`}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {branchData.name}
                </h2>
                <p className="text-muted-foreground">
                  {branchData.description}
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard">Back to Branches</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <div className="max-w-sm my-5   ">
            <Input
              className="bg-input"
              value={searchedInput}
              onChange={(e) => setSearchedInput(e.target.value)}
              type="text"
              placeholder="sem number"
            />
          </div>
        </div>

        {/* Semesters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SearchedSemester.map((semester) => {
            const stats = getSemesterStats(semester);
            return (
              <Link key={semester} href={`/dashboard/${branch}/${semester}`}>
                <Card className="group h-full border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    {/* Semester Number */}
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                        {semester}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Semester {semester}
                      </h3>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Subjects:
                        </span>
                        <span className="font-medium">{stats.subjects}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Materials:
                        </span>
                        <span className="font-medium">{stats.materials}+</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Students:
                        </span>
                        <span className="font-medium">{stats.students}+</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      className="w-full group/btn border-border hover:border-primary hover:bg-primary/5"
                    >
                      <span>View Subjects</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="mt-10 border border-border shadow-lg bg-gradient-to-r from-primary/5 via-background to-accent/10 rounded-xl">
          <CardContent className="py-7 px-6 flex flex-col items-center text-center gap-2">
            {/* Icon for community/updates */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {branch} Community: Updates & Help
            </h3>
            <p className="text-muted-foreground text-base mb-3">
              Find or share important updates in your community. If you know
              about any new information, please post and pin it so the admin can
              keep everyone updated.
            </p>
            <Link href={`/dashboard/${branch}/community`}>
              <Button variant="secondary" className="mt-2 shadow">
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
