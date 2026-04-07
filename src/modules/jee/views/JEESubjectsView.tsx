"use client";

import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // <-- Added Input component
import Contribute from "@/modules/semester/ui/components/Contribute";
import NoContent from "@/modules/semester/ui/components/NoContent";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Crown,
  Search,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react"; // <-- Added useState

interface Props {
  topic: string;
}

const JEESubjectsView = ({ topic }: Props) => {
  const trpc = useTRPC();
  
  // 1. Added State for search query
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery(
    trpc.jee.getAllContents.queryOptions({
      topic: topic,
    })
  );

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

  // If there's absolutely no data in the database for this topic
  if (!data || data.length === 0) {
    return <NoContent branch={"jee"} semester={"content"} />;
  }

  // 2. Filter data based on search query (by subjectName)
  const filteredData = data.filter((subject) =>
    subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-25 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-foreground">
            {topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase()}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Explore study materials, notes, and resources for {topic} in JEE.
          </p>
        </div>

        {/* 3. Search Bar Section */}
        <div className="max-w-md mx-auto mb-10 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            type="text"
            placeholder="Search subjects by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-6 text-base rounded-xl shadow-sm border-border focus-visible:ring-primary/50 transition-all bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <XCircle className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((subject) => (
              <Card
                key={subject.id}
                className="group border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  {/* Subject Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground line-clamp-1" title={subject.subjectName}>
                        {subject.subjectName}
                      </h3>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {subject.subjectCode}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Study materials and resources
                    </p>
                  </div>

                  {/* Subject Details */}
                  <div className="space-y-2 mb-5 bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Professor:</span>
                      <span className="font-medium text-foreground truncate">
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
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10 mb-5">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground font-medium">
                        Uploaded by
                      </span>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {subject.uploadedBy}
                    </Badge>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md transition-all"
                  >
                    {/* Note: I updated this link to use the actual `topic` variable dynamically instead of the hardcoded string "topic" */}
                    <Link href={`/dashboard/jee/${topic}/${subject.id}`}>
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
                We could not find any subjects matching{" "}
                <span className="font-semibold text-foreground">
                  {searchQuery}
                </span>.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="hover:bg-primary/10"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Contribute />
      </div>
    </div>
  );
};

export default JEESubjectsView;