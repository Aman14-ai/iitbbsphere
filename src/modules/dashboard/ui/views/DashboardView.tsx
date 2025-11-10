"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  BookOpen,
  Sparkles,
  SearchIcon,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { branches } from "../../../../../constants";
import ContactSection from "@/modules/home/ui/components/ContactSection";

const DashboardView = () => {
  let searchedBranches = branches;
  const [searchBranch, setSearchBranch] = useState("");
  const [openContactDialog, setOpenContactDialog] = useState(false);

  if (searchBranch) {
    searchedBranches = branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchBranch.trim().toLowerCase())
    );
  }

  const onReset = () => {
    setSearchBranch("");
  };

  return (
    <>
      <ContactSection
        open={openContactDialog}
        onOpenChange={setOpenContactDialog}
      />
      <div className="min-h-screen  py-6 px-3 sm:py-8 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-foreground text-3xl font-bold   mb-4">
              Choose Your Branch
            </h1>
            <p className=" text-muted-foreground max-w-2xl mx-auto">
              Explore study materials, resources, and connect with your peers.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder={`Search Branches...`}
                value={searchBranch}
                onChange={(e) => setSearchBranch(e.target.value)}
                className="w-full bg-background shadow-none appearance-none pl-8 pr-10"
              />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              {searchBranch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={onReset}
                  title="Reset search and reload original data"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset search</span>
                </Button>
              )}
            </div>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {searchedBranches.length > 0 ? (
              searchedBranches.map((branch) => (
                <Link key={branch.slug} href={`/dashboard/${branch.slug}`}>
                  <Card className="group h-full border border-transparent rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                    <CardContent className="p-4 sm:p-6 flex flex-col items-start">
                      {/* Branch Image Container */}
                      <div className="w-full h-30 mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <div className="relative rounded-lg w-full h-full flex items-center justify-center">
                          <Image
                            width={400}
                            height={600}
                            className="rounded-lg"
                            src={branch.image}
                            alt={branch.name}
                          />
                        </div>
                      </div>

                      {/* Branch Name */}
                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                        {branch.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-tight">
                        {branch.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground w-full mb-2 sm:mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{branch.studentCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span className="truncate max-w-[80px]">
                            {branch.courses.split(",")[0]}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant="default"
                        className="w-full py-1.5 sm:py-2 text-xs sm:text-sm border-border  hover:border-primary/30 text-white flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Explore Branch</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center font-bold">No Branches Found</div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-12">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                  Can&apos;t Find Your Branch?
                </h3>
                <p className="text-muted-foreground  sm:mb-4">
                  Contact us to add your engineering branch to the platform
                </p>

                <Button
                  onClick={() => setOpenContactDialog(true)}
                  className="bg-primary"
                >
                  Request New Branch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
