"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  FolderOpen,
  Calendar,
  User,
  Code,
  ClipboardList,
  FileQuestion,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Search,
  XCircle,
  File,
} from "lucide-react";
import { DriveFile, FileGroup } from "../../../../../constants";
import { categorizeFile } from "@/lib/utils";
import LoadingState from "@/components/LoadingState";

interface Props {
  subjectId: string;
}

const SECTION_CONFIG = {
  notes: {
    label: "Class Notes",
    description: "Lecture notes & slides",
    icon: BookOpen,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    strip: "bg-violet-500",
  },
  tutorials: {
    label: "Tutorials",
    description: "Tutorial sheets & practice problems",
    icon: Code,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    strip: "bg-sky-500",
  },
  assignments: {
    label: "Assignments",
    description: "Problem sets & submissions",
    icon: ClipboardList,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    strip: "bg-emerald-500",
  },
  pyqs: {
    label: "Previous Year Questions",
    description: "Past exam papers",
    icon: FileQuestion,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    strip: "bg-amber-500",
  },
  other: {
    label: "Other Files",
    description: "Additional resources",
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    strip: "bg-rose-500",
  },
};

const FILE_TYPE_STYLES: Record<string, { color: string; label: string }> = {
  pdf: { color: "text-red-500", label: "PDF" },
  word: { color: "text-blue-500", label: "DOC" },
  document: { color: "text-blue-500", label: "DOC" },
  sheet: { color: "text-green-500", label: "XLS" },
  presentation: { color: "text-orange-500", label: "PPT" },
};

const SubjectIdViews = ({ subjectId }: Props) => {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [groupedFiles, setGroupedFiles] = useState<FileGroup>({
    notes: [],
    tutorials: [],
    assignments: [],
    pyqs: [],
    other: [],
  });
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    notes: true,
    tutorials: false,
    assignments: false,
    pyqs: false,
    other: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const trpc = useTRPC();
  const { data: rowDataFromcontentTable } = useSuspenseQuery(
    trpc.semester.getRowOfContentsByRowId.queryOptions({ id: subjectId })
  );

  const filteredFiles = useMemo(() => {
    if (!search) return files;
    const query = search.toLowerCase();
    return files.filter((file) => file.name.toLowerCase().includes(query));
  }, [files, search]);

  useEffect(() => {
    const grouped = filteredFiles.reduce(
      (acc, file) => {
        const category = categorizeFile(file.name);
        acc[category].push(file);
        return acc;
      },
      { notes: [], tutorials: [], assignments: [], pyqs: [], other: [] } as FileGroup
    );
    setGroupedFiles(grouped);
  }, [filteredFiles]);

  useEffect(() => {
    async function fetchFiles() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/drive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folderId: rowDataFromcontentTable.folderId }),
        });
        const data = await res.json();
        setFiles(data);
      } catch (error) {
        console.log("Error while fetching files from drive", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFiles();
  }, [rowDataFromcontentTable.folderId]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getFileTypeMeta = (mimeType: string) => {
    for (const [key, val] of Object.entries(FILE_TYPE_STYLES)) {
      if (mimeType.includes(key)) return val;
    }
    return { color: "text-muted-foreground", label: "FILE" };
  };

  const totalFiles = Object.values(groupedFiles).reduce((sum, arr) => sum + arr.length, 0);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading files"
        description="Please wait. It may take a few seconds"
      />
    );
  }

  return (
    <div className="min-h-screen py-25 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-3xl mx-auto">

        {/* Subject Info Card */}
        <div className="rounded-2xl border bg-card overflow-hidden mb-7 shadow-sm">
          {/* Colored top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

          <div className="p-6">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-bold tracking-wide border border-primary/20">
                  {rowDataFromcontentTable.subjectCode}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Semester {rowDataFromcontentTable.semester}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shrink-0">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  {rowDataFromcontentTable.uploadedBy}
                </span>
              </div>
            </div>

            {/* Subject name */}
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-snug">
              {rowDataFromcontentTable.subjectName}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{rowDataFromcontentTable.professor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>AY {rowDataFromcontentTable.academicYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                  <FolderOpen className="w-3.5 h-3.5" />
                </div>
                <span>{totalFiles} {totalFiles === 1 ? "file" : "files"}</span>
              </div>
            </div>
          </div>
        </div>

        

        {/* File Sections */}
        <div className="space-y-3">
          {(Object.entries(SECTION_CONFIG) as [keyof FileGroup, typeof SECTION_CONFIG[keyof typeof SECTION_CONFIG]][]).map(
            ([key, config]) => {
              const sectionFiles = groupedFiles[key];
              if (!sectionFiles || sectionFiles.length === 0) return null;
              const isExpanded = expandedSections[key];
              const Icon = config.icon;

              return (
                <div
                  key={key}
                  className={`rounded-2xl border bg-card overflow-hidden transition-all duration-200 ${config.border}`}
                >
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4.5 h-4.5 ${config.color}`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">
                            {config.label}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                            {sectionFiles.length}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
                      </div>
                    </div>
                    {isExpanded
                      ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    }
                  </button>

                  {/* Files list */}
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2">
                      <div className={`h-px w-full bg-gradient-to-r from-transparent ${config.border.replace("border-", "via-")} to-transparent mb-3`} />
                      {sectionFiles.map((file) => {
                        const typeMeta = getFileTypeMeta(file.mimeType);
                        return (
                          <div
                            key={file.id}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-border/60 bg-background hover:bg-accent/30 hover:border-border transition-all group/file"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                <File className={`w-3.5 h-3.5 ${typeMeta.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                  {file.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {typeMeta.label} · {file.webContentLink ? "Downloadable" : "View only"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                title="Open"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              {file.webContentLink && (
                                <a
                                  href={file.webContentLink}
                                  download
                                  className="w-8 h-8 rounded-lg hidden md:flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                  title="Download"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
          )}

          {/* Empty state */}
          {totalFiles === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-border bg-muted/20 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">No files yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                No study materials have been uploaded for this subject yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectIdViews;