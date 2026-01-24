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
      branch.name.toLowerCase().includes(searchBranch.trim().toLowerCase()),
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
                  <Card className="pt-0 h-full overflow-hidden rounded-2xl border border-border/40 bg-white/90 dark:bg-gray-900/70 backdrop-blur shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0 flex flex-col h-full space-y-3">
                      {/* Image fully embedded in card */}
                      <div className="relative w-full h-45">
                        <Image
                          src={branch.image}
                          alt={branch.name}
                          fill
                          priority={false}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-semibold text-white line-clamp-1">
                            {branch.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 px-5 py-4">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {branch.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{branch.studentCount} learners</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{branch.courses.split(",")[0]}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button className="mt-auto w-full rounded-xl flex items-center justify-center gap-2">
                          Explore Branch
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center font-bold">No Branches Found</div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-12 space-y-3">
            <p className="text-sm sm:text-base text-muted-foreground">
              Can’t find your branch? Help us expand the platform.
            </p>

            <button
              onClick={() => setOpenContactDialog(true)}
              className="
              px-4 py-1.5
              text-sm
              border border-gray-300 dark:border-gray-600
              rounded-md
              text-gray-700 dark:text-gray-300
              hover:bg-blue-200 dark:hover:bg-gray-800
              transition-colors
            "
            >
              Request branch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
