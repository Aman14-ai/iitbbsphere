"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // 🔹 ensure Input exists in shadcn setup
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
} from "lucide-react";
import { DriveFile, FileGroup } from "../../../../../constants";
import { categorizeFile } from "@/lib/utils";
import FileSection from "../components/FileSection";
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
  const [search, setSearch] = useState(""); // 🔍 search state

  const trpc = useTRPC();
  const { data: rowDataFromcontentTable } = useSuspenseQuery(
    trpc.semester.getRowOfContentsByRowId.queryOptions({ id: subjectId })
  );

  // 🔍 Filter files by search query
  const filteredFiles = useMemo(() => {
    if (!search) return files;
    const query = search.toLowerCase();
    return files.filter((file) => file.name.toLowerCase().includes(query));
  }, [files, search]);

  // File categorization function

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

  console.log("all files", files);

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

        {/* 🔍 Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search assignment, tutorial, or class"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* File Sections */}
        <div className="space-y-6">
          <FileSection
            title="Class Notes"
            files={groupedFiles.notes}
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            description="Lecture notes, slides, and study materials"
          />
          <FileSection
            title="Tutorials & Labs"
            files={groupedFiles.tutorials}
            icon={<Code className="w-5 h-5 text-primary" />}
            description="Lab manuals, tutorial sheets, and practical guides"
          />
          <FileSection
            title="Assignments"
            files={groupedFiles.assignments}
            icon={<ClipboardList className="w-5 h-5 text-primary" />}
            description="Homework assignments and problem sets"
          />
          <FileSection
            title="Previous Year Questions"
            files={groupedFiles.pyqs}
            icon={<FileQuestion className="w-5 h-5 text-primary" />}
            description="Exam papers and previous year questions"
          />
          {groupedFiles.other.length > 0 && (
            <FileSection
              title="Other Files"
              files={groupedFiles.other}
              icon={<FileText className="w-5 h-5 text-primary" />}
              description="Additional resources and materials"
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
