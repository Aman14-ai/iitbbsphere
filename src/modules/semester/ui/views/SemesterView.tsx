"use client";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Crown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NoContent from "../components/NoContent";
import Contribute from "../components/Contribute";

const SemesterView = () => {
  const pathname = usePathname();
  const branch = pathname.split("/")[2];
  const semester = pathname.split("/")[3];

  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.semester.getAllContents.queryOptions({
      branch: branch,
      semester: semester,
    })
  );

  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const yearRef = useRef<HTMLDivElement | null>(null);

  // Dynamic list of years (sorted desc) + 'All' option
  const years = useMemo(() => {
    if (!data) return ["All"];
    const uniq = Array.from(
      new Set(data.map((d) => d.academicYear || "Unknown"))
    );
    // sort by descending (newest first) when strings are numbers, otherwise lexicographic desc
    uniq.sort(
      (a, b) => Number(b) - Number(a) || String(b).localeCompare(String(a))
    );
    return ["All", ...uniq];
  }, [data]);

  // 🔍 Filtering logic now also respects selectedYear
  const filteredData = useMemo(() => {
    if (!data) return [];
    const query = search.toLowerCase();
    let list = data.filter((item) => {
      return (
        item.subjectCode?.toLowerCase().includes(query) ||
        item.subjectName?.toLowerCase().includes(query) ||
        (item.academicYear ?? "").toLowerCase().includes(query)
      );
    });
    if (selectedYear && selectedYear !== "All") {
      list = list.filter((item) => item.academicYear === selectedYear);
    }
    return list;
  }, [data, search, selectedYear]);

  if (isLoading || !data) {
    return (
      <LoadingState
        title="Loading Content"
        description="Please wait. It may takes few seconds"
      />
    );
  }
  if (isError) {
    return (
      <ErrorState
        title="Something went wrong"
        description="please try again later."
      />
    );
  }
  if (!data || data.length === 0) {
    return <NoContent branch={branch} semester={semester} />;
  }

  // Format branch name for display
  const formatBranchName = (branch: string) => {
    return branch
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  function scrollYears(delta = 220) {
    if (!yearRef.current) return;
    yearRef.current.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Semester {semester}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
              {formatBranchName(branch)} Engineering
            </h1>
            <p className="text-muted-foreground">
              Study materials and resources for Semester {semester}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center p-4 border-primary/20">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-primary">
                  {data.length}
                </div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-primary/20">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-primary">
                  {new Set(data.map((item) => item.uploadedBy)).size}
                </div>
                <div className="text-sm text-muted-foreground">
                  Contributors
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-primary/20">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-primary">
                  {new Set(data.map((item) => item.academicYear)).size}
                </div>
                <div className="text-sm text-muted-foreground">
                  Academic Years
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-primary/20">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-primary">
                  {new Set(data.map((item) => item.professor)).size}
                </div>
                <div className="text-sm text-muted-foreground">Professors</div>
              </CardContent>
            </Card>
          </div>

          {/* Search + Year selector */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Year selector */}
            <div className="w-full md:w-auto">
              <div className="relative flex items-center">
                <button
                  aria-label="scroll years left"
                  onClick={() => scrollYears(-240)}
                  className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-background/70 border mr-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={yearRef}
                  className="flex gap-2 overflow-x-auto hide-scrollbar items-center py-1 px-1 md:px-0"
                  role="tablist"
                >
                  {years.map((year) => {
                    const isSelected = selectedYear === year;
                    return (
                      <button
                        key={year}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedYear(year)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-150 flex items-center gap-2 text-sm font-medium ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "bg-muted text-muted-foreground border-input hover:border-primary"
                        }`}
                      >
                        <span>{year}</span>
                        {isSelected && (
                          <Badge className="ml-1 px-2 py-0 text-xs">
                            {filteredData.length}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  aria-label="scroll years right"
                  onClick={() => scrollYears(240)}
                  className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-background/70 border ml-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((subject) => (
                <Card
                  key={subject.id}
                  className="group border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    {/* Subject Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-foreground line-clamp-1">
                          {subject.subjectName}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {subject.subjectCode}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Study materials and resources
                      </p>
                    </div>

                    {/* Subject Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          Professor:
                        </span>
                        <span className="font-medium text-foreground">
                          {subject.professor}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          Academic Year:
                        </span>
                        <span className="font-medium text-foreground">
                          {subject.academicYear}
                        </span>
                      </div>
                    </div>

                    {/* Uploaded By - Highlighted */}
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10 mb-4">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">
                          Uploaded by
                        </span>
                      </div>
                      <Badge className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {subject.uploadedBy}
                      </Badge>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className="w-full group/btn bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80"
                    >
                      <Link
                        href={`/dashboard/${branch}/${semester}/${subject.id}`}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Materials
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No results found for{" "}
                <span className="font-semibold">{search}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Contribute />

      {/* hide scrollbar styles (works for modern browsers) */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  );
};

export default SemesterView;
