"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, ArrowRight, Sparkles, BookOpen } from "lucide-react";

interface SemesterDialogProps {
  branch: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SemesterDialog = ({
  branch,
  isOpen,
  onOpenChange,
}: SemesterDialogProps) => {
  const [semester, setSemester] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (semester && parseInt(semester) >= 1 && parseInt(semester) <= 8) {
      router.push(`/dashboard/${branch}/${semester}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 max-w-md w-full">
        <Card className="w-full shadow-2xl border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Choose Your Semester
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your semester to access study materials and resources
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Semester Input */}
            <div className="space-y-3">
              <label
                htmlFor="semester"
                className="text-sm font-medium text-foreground"
              >
                Semester (1-8)
              </label>
              <Input
                id="semester"
                type="number"
                min="1"
                max="8"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Enter semester number (1-8)"
                className="w-full h-12 text-base border-2 border-border hover:border-primary/50 transition-colors text-center text-lg font-semibold"
              />
            </div>

            {/* Semester Preview */}
            {semester && parseInt(semester) >= 1 && parseInt(semester) <= 8 && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    You&apos;ll access:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    Semester {semester}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {branch
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  Engineering
                </div>
              </div>
            )}

            {/* Error Message */}
            {semester && (parseInt(semester) < 1 || parseInt(semester) > 8) && (
              <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-destructive text-center">
                  Please enter a valid semester between 1 and 8
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-accent/30 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                What you&apos;ll get:
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Subject-wise study materials</li>
                <li>• Class notes and tutorials</li>
                <li>• Previous year question papers</li>
                <li>• Assignment solutions</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !semester || parseInt(semester) < 1 || parseInt(semester) > 8
                }
                className="flex-1 bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SemesterDialog;
