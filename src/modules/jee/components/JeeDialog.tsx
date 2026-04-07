"use client";

import ResponsiveDialog from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ArrowRight, BookOpen, GraduationCap, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Enhanced subjects array with display names and emojis for better UX
const subjects = [
  { id: "physics", name: "Physics", icon: "⚛️" },
  { id: "physical", name: "Physical Chemistry", icon: "🧪" },
  { id: "organic", name: "Organic Chemistry", icon: "🌿" },
  { id: "inorganic", name: "Inorganic Chemistry", icon: "💎" },
  { id: "maths", name: "Mathematics", icon: "📐" },
  { id: "dsa", name: "Data Structures (DSA)", icon: "💻" },
];

const JeeDialog = ({ isOpen, onOpenChange }: Props) => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const handleContinue = () => {
    if (selectedSubject) {
      router.push(`/jee/${selectedSubject}`);
      onOpenChange(false);
      setSelectedSubject("");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedSubject("");
    onOpenChange(open);
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      title=""
      description=""
    >
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 sm:rounded-2xl w-full max-w-md mx-auto">
        
        {/* Beautiful Background Gradient Effect inside the Card */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/5 blur-2xl pointer-events-none" />

        <CardHeader className="relative pb-6 pt-8 px-8 text-center space-y-3">
          <div className="mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50 w-14 h-14 rounded-full flex items-center justify-center shadow-inner mb-2">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Choose Your Subject
          </CardTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Select the topic you want to study or practice right now.
          </p>
        </CardHeader>

        <CardContent className="relative space-y-6 px-8 pb-8">
          {/* Subject Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Select Subject
            </label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectGroup>
                  <SelectLabel className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    JEE Syllabus
                  </SelectLabel>
                  {subjects.map((subject) => (
                    <SelectItem
                      key={subject.id}
                      value={subject.id}
                      className="cursor-pointer py-3 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      <span className="flex items-center gap-3 text-base">
                        <span className="text-lg">{subject.icon}</span>
                        {subject.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1 h-11 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedSubject}
              className="flex-1 h-11 gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveDialog>
  );
};

export default JeeDialog;