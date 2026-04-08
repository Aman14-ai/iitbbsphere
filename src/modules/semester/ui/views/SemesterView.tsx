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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // <-- Added pagination
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
  XCircle,
  Search,
} from "lucide-react";
import NoContent from "../components/NoContent";
import Contribute from "../components/Contribute";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 6; // Adjust as needed

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
  const [page, setPage] = useState(1); // <-- Pagination state
  const yearRef = useRef<HTMLDivElement | null>(null);

  const years = useMemo(() => {
    if (!data) return ["All"];
    const uniq = Array.from(
      new Set(data.map((d) => d.academicYear || "Unknown"))
    );
    uniq.sort(
      (a, b) => Number(b) - Number(a) || String(b).localeCompare(String(a))
    );
    return ["All", ...uniq];
  }, [data]);

  // Filtered data (all subjects matching search & year)
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  // Reset page when filters change
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (isLoading || !data) {
    return (
      <LoadingState
        title="Loading Content"
        description="Please wait. It may take a few seconds"
      />
    );
  }
  if (isError) {
    return (
      <ErrorState
        title="Something went wrong"
        description="Please try again later."
      />
    );
  }
  if (!data || data.length === 0) {
    return <NoContent branch={branch} semester={semester} />;
  }

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
      <div className="pt-25 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Semester {semester}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {formatBranchName(branch)} Engineering
            </h1>
            <p className="text-muted-foreground text-sm md:text-md">
              Study materials and resources for Semester {semester}
            </p>
          </div>

          {/* Search Bar (added from earlier pattern) */}
          <div className="max-w-md mx-auto mb-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search by subject name, code or year..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 pr-10 py-5 text-base rounded-xl shadow-sm border-border focus-visible:ring-primary/50 transition-all bg-background"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Year selector */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
                        onClick={() => handleYearChange(year)}
                        className={`whitespace-nowrap px-3 md:px-4 py-1.5 rounded-full border transition-all duration-150 flex items-center gap-1 text-sm font-medium ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "bg-muted text-muted-foreground border-input hover:border-primary"
                        }`}
                      >
                        <span>{year}</span>
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

          {/* Subjects Grid (Paginated) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.length > 0 ? (
              paginatedData.map((subject) => (
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
              <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-2xl bg-muted/20">
                <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  No subjects found
                </h3>
                <p className="text-center text-muted-foreground max-w-sm mb-4">
                  {search
                    ? `No results for "${search}"`
                    : `No subjects available for year ${selectedYear}`}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setSelectedYear("All");
                    setPage(1);
                  }}
                  className="hover:bg-primary/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {page > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {page > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>

                  {page < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {page < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={
                        page === totalPages ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <Contribute />

      {/* hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default SemesterView;