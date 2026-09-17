"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ResponsiveDialog from "@/components/ResponsiveDialog";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";

interface SemesterDialogProps {
  branch: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const semesters = [
  { id: "1", name: "Semester 1", icon: "1️⃣" },
  { id: "2", name: "Semester 2", icon: "2️⃣" },
  { id: "3", name: "Semester 3", icon: "3️⃣" },
  { id: "4", name: "Semester 4", icon: "4️⃣" },
  { id: "5", name: "Semester 5", icon: "5️⃣" },
  { id: "6", name: "Semester 6", icon: "6️⃣" },
  { id: "7", name: "Semester 7", icon: "7️⃣" },
  { id: "8", name: "Semester 8", icon: "8️⃣" },
];

const SemesterDialog = ({
  branch,
  isOpen,
  onOpenChange,
}: SemesterDialogProps) => {
  const [semester, setSemester] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (semester) {
      router.push(`/dashboard/${branch}/${semester}`);
      onOpenChange(false);
      setSemester("");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSemester("");
    }

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

        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/5 blur-2xl pointer-events-none" />

        <CardHeader className="relative pb-6 pt-8 px-8 text-center space-y-3">

          {/* Icon */}
          <div className="mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50 w-14 h-14 rounded-full flex items-center justify-center shadow-inner mb-2">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </div>

          {/* Title */}
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Choose Your Semester
          </CardTitle>
        </CardHeader>

        <CardContent className="relative space-y-6 px-8 pb-8">

          {/* Semester Selection */}
          <div className="space-y-3">

            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Select Semester
            </label>

            <Select
              value={semester}
              onValueChange={setSemester}
            >
              <SelectTrigger className="w-full h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                <SelectValue placeholder="Select a semester..." />
              </SelectTrigger>

              <SelectContent className="max-h-[300px]">

                <SelectGroup>

                  <SelectLabel className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    Available Semesters
                  </SelectLabel>

                  {semesters.map((semesterItem) => (
                    <SelectItem
                      key={semesterItem.id}
                      value={semesterItem.id}
                      className="cursor-pointer py-3 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      <span className="flex items-center gap-3 text-base">
                        <span className="text-lg">
                          {semesterItem.icon}
                        </span>

                        {semesterItem.name}
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
              disabled={!semester}
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

export default SemesterDialog;
