"use client";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import {
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Search,
  FileText,
  Layers,
} from "lucide-react";
import NoContent from "../components/NoContent";
import Contribute from "../components/Contribute";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 6;

// Refined accent colors – softer, better contrast
const ACCENT_COLORS = [
  {
    border: "hover:border-violet-400/60",
    iconBg: "bg-violet-100 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-300",
    badgeBg: "bg-violet-50 dark:bg-violet-950/60 text-violet-800 dark:text-violet-200",
  },
  {
    border: "hover:border-sky-400/60",
    iconBg: "bg-sky-100 dark:bg-sky-950/40",
    text: "text-sky-700 dark:text-sky-300",
    badgeBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200",
  },
  {
    border: "hover:border-emerald-400/60",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200",
  },
  {
    border: "hover:border-amber-400/60",
    iconBg: "bg-amber-100 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200",
  },
  {
    border: "hover:border-rose-400/60",
    iconBg: "bg-rose-100 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200",
  },
  {
    border: "hover:border-indigo-400/60",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/40",
    text: "text-indigo-700 dark:text-indigo-300",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200",
  },
];

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
  const [page, setPage] = useState(1);
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

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

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
          {/* Header - unchanged */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              <GraduationCap className="w-4 h-4" />
              Semester {semester}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              {formatBranchName(branch)}{" "}
              <span className="text-primary">Engineering</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Browse study materials and resources curated for Semester {semester}
            </p>
          </div>

          {/* Search Bar - unchanged */}
          <div className="max-w-lg mx-auto mb-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search by subject name, code or year..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 pr-10 py-5 text-sm rounded-xl shadow-sm border-border focus-visible:ring-primary/40 transition-all bg-background"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setPage(1); }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Year Selector - unchanged */}
          <div className="mb-8">
            <div className="relative flex items-center justify-center">
              <button
                aria-label="scroll years left"
                onClick={() => scrollYears(-240)}
                className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-background border border-border hover:border-primary/50 transition-colors mr-2 shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={yearRef}
                className="flex gap-2 overflow-x-auto hide-scrollbar items-center py-1 px-1"
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
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full border transition-all duration-200 text-sm font-medium ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>

              <button
                aria-label="scroll years right"
                onClick={() => scrollYears(240)}
                className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-background border border-border hover:border-primary/50 transition-colors ml-2 shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          {filteredData.length > 0 && (
            <p className="text-xs text-muted-foreground mb-5 text-center">
              Showing <span className="font-semibold text-foreground">{paginatedData.length}</span> of{" "}
              <span className="font-semibold text-foreground">{filteredData.length}</span> subjects
            </p>
          )}

          {/* Subjects Grid - IMPROVED CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.length > 0 ? (
              paginatedData.map((subject, idx) => {
                const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <Link
                    key={subject.id}
                    href={`/dashboard/${branch}/${semester}/${subject.id}`}
                    className="group block h-full"
                  >
                    <div
                      className={`
                        relative h-full rounded-xl border border-border bg-card
                        transition-all duration-300 ease-out
                        hover:shadow-xl hover:border-${accent.border.split(' ')[0].replace('hover:border-', '')}
                        hover:-translate-y-1
                        overflow-hidden
                        ${accent.border}
                      `}
                    >
                      {/* Subtle top border accent on hover */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${accent.text.split(' ')[0].replace('text-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      <div className="p-5 flex flex-col h-full">
                        {/* Header: badge + icon */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${accent.badgeBg}`}>
                            <FileText className="w-3 h-3" />
                            {subject.subjectCode}
                          </div>
                          <div className={`w-9 h-9 rounded-full ${accent.iconBg} flex items-center justify-center border border-border/50 ${accent.text}`}>
                            <BookOpen className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Subject Name */}
                        <h3 className="text-lg font-semibold text-foreground leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {subject.subjectName}
                        </h3>

                        {/* Professor & Year - cleaner layout */}
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-full ${accent.iconBg} ${accent.text}`}>
                              <User className="w-3 h-3" />
                            </div>
                            <span className="text-muted-foreground text-xs truncate">
                              <span className="font-medium text-foreground">{subject.professor || "Staff"}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-full ${accent.iconBg} ${accent.text}`}>
                              <Calendar className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">{subject.academicYear}</span>
                            </span>
                          </div>
                        </div>

                        {/* Spacer to push footer down */}
                        <div className="flex-1" />

                        {/* Footer: uploader + action */}
                        <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="p-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                              <Sparkles className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              by{" "}
                              <span className="font-semibold text-foreground">
                                {subject.uploadedBy}
                              </span>
                            </span>
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-medium ${accent.text} group-hover:gap-2 transition-all duration-200`}>
                            View details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-border rounded-2xl bg-muted/20">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  No subjects found
                </h3>
                <p className="text-center text-muted-foreground text-sm max-w-sm mb-5">
                  {search
                    ? `No results matching "${search}"`
                    : `No subjects available for ${selectedYear}`}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setSelectedYear("All");
                    setPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination - unchanged */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={page === 1 ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>

                  {page > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
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
                      className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      <Contribute />

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