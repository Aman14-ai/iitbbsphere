"use client";
import { ArrowRight, BookOpen, Users, LayoutGrid } from "lucide-react";
import Link from "next/link";
import React from "react";
import { branches } from "../../../../../constants";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HowToUse = () => {
  const demoBranches = branches.slice(0, 3);

  return (
    <section className="relative pt-20 pb-16 md:px-40 px-8 bg-gradient-to-b from-blue-200 to-gray-50 dark:from-blue-500 dark:to-gray-900 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Explore Branches
        </h2>
        <p className=" max-w-2xl text-sm md:text-base text-gray-600 dark:text-gray-300">
          <span>Academic content curated by professors. Organized
          clearly by branch, semester, and year for effortless learning.
          <span className="max-sm:hidden">Everything you need for your coursework, structured and reliable.</span> </span>
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoBranches.length > 0 ? (
          demoBranches.map((branch) => (
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
          <div className="col-span-full text-center font-semibold">
            No Branches Found
          </div>
        )}
      </div>

      {/* View all categories */}
      <div className="relative z-10 mt-16 flex justify-center">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="rounded-full px-7 py-2.5 flex items-center gap-2 text-sm"
          >
            <LayoutGrid className="w-4 h-4" />
            View all categories
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HowToUse;
