"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { DriveFile, FileGroup } from "../../../../../constants";
import { categorizeFile } from "@/lib/utils";
import LoadingState from "@/components/LoadingState";

interface Props {
  subjectId: string;
}

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
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    notes: true, // Default open
    tutorials: false,
    assignments: false,
    pyqs: false,
    other: false,
  });

  const trpc = useTRPC();
  const { data: rowDataFromcontentTable } = useSuspenseQuery(
    trpc.semester.getRowOfContentsByRowId.queryOptions({ id: subjectId })
  );

  // Filter files by search query
  const filteredFiles = useMemo(() => {
    if (!search) return files;
    const query = search.toLowerCase();
    return files.filter((file) => file.name.toLowerCase().includes(query));
  }, [files, search]);

  // Group files whenever filteredFiles change
  useEffect(() => {
    const grouped = filteredFiles.reduce(
      (acc, file) => {
        const category = categorizeFile(file.name);
        acc[category].push(file);
        return acc;
      },
      {
        notes: [],
        tutorials: [],
        assignments: [],
        pyqs: [],
        other: [],
      } as FileGroup
    );
    setGroupedFiles(grouped);
  }, [filteredFiles]);

  // Fetch files from API
  const [isLoading, setIsLoading] = useState(false);
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
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Get file icon based on mime type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf"))
      return <FileText className="w-4 h-4 text-red-500" />;
    if (mimeType.includes("word") || mimeType.includes("document"))
      return <FileText className="w-4 h-4 text-blue-500" />;
    if (mimeType.includes("sheet"))
      return <FileText className="w-4 h-4 text-green-500" />;
    if (mimeType.includes("presentation"))
      return <FileText className="w-4 h-4 text-orange-500" />;
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  // Collapsible Section Component
  const CollapsibleSection = ({
    title,
    files,
    icon,
    description,
    sectionKey,
  }: {
    title: string;
    files: DriveFile[];
    icon: React.ReactNode;
    description?: string;
    sectionKey: string;
  }) => {
    const isExpanded = expandedSections[sectionKey];

    if (files.length === 0) return null;

    return (
      <Card className="border-border">
        <CardContent className="p-0">
          {/* Section Header - Clickable */}
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full py-1 px-6 text-left hover:bg-accent/50 transition-colors rounded-t-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {files.length} {files.length === 1 ? "file" : "files"}
                    </Badge>
                  </div>
                  {description && (
                    <p className="text-sm text-muted-foreground text-left">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </button>

          {/* Files List - Collapsible */}
          {isExpanded && (
            <div className="px-6 pb-6 space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon(file.mimeType)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {file.mimeType.split("/")[1]} •{" "}
                        {file.webContentLink ? "Downloadable" : "View only"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {file.webContentLink && (
                      <a
                        href={file.webContentLink}
                        download
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const totalFiles = Object.values(groupedFiles).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  if (isLoading) {
    return (
      <LoadingState
        title="Loading files"
        description="Please wait. It may takes few seconds"
      />
    );
  }

  return (
    <div className="min-h-screen py-25 bg-gradient-to-br from-background to-accent/5 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {rowDataFromcontentTable.subjectCode}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sem {rowDataFromcontentTable.semester}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {rowDataFromcontentTable.subjectName}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{rowDataFromcontentTable.professor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>AY {rowDataFromcontentTable.academicYear}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FolderOpen className="w-4 h-4" />
                    <span>{totalFiles} files</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Uploaded by {rowDataFromcontentTable.uploadedBy}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collapsible File Sections */}
        <div className="space-y-4">
          <CollapsibleSection
            title="Class Notes"
            files={groupedFiles.notes}
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            description="Lecture notes, slides, and study materials"
            sectionKey="notes"
          />

          <CollapsibleSection
            title="Tutorials & Labs"
            files={groupedFiles.tutorials}
            icon={<Code className="w-5 h-5 text-primary" />}
            description="Lab manuals, tutorial sheets, and practical guides"
            sectionKey="tutorials"
          />

          <CollapsibleSection
            title="Assignments"
            files={groupedFiles.assignments}
            icon={<ClipboardList className="w-5 h-5 text-primary" />}
            description="Homework assignments and problem sets"
            sectionKey="assignments"
          />

          <CollapsibleSection
            title="Previous Year Questions"
            files={groupedFiles.pyqs}
            icon={<FileQuestion className="w-5 h-5 text-primary" />}
            description="Exam papers and previous year questions"
            sectionKey="pyqs"
          />

          {groupedFiles.other.length > 0 && (
            <CollapsibleSection
              title="Other Files"
              files={groupedFiles.other}
              icon={<FileText className="w-5 h-5 text-primary" />}
              description="Additional resources and materials"
              sectionKey="other"
            />
          )}

          {totalFiles === 0 && !isLoading && (
            <Card className="text-center p-8">
              <CardContent>
                <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Files Found
                </h3>
                <p className="text-muted-foreground">
                  No study materials have been uploaded for this subject yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectIdViews;
