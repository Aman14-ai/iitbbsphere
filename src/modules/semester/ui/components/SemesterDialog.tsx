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
import { Input } from "@/components/ui/input";
import ResponsiveDialog from "@/components/ResponsiveDialog";

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
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Select semester"
      description=""
    >
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-center">
            Choose your semester
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Semester (1–8)
            </label>
            <Input
              type="number"
              min="1"
              max="8"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Enter semester number"
              className="text-center"
            />
          </div>

          {/* Error */}
          {semester && (parseInt(semester) < 1 || parseInt(semester) > 8) && (
            <p className="text-sm text-destructive text-center">
              Please enter a valid semester (1–8)
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
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
                !semester ||
                parseInt(semester) < 1 ||
                parseInt(semester) > 8
              }
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveDialog>
  );
};

export default SemesterDialog;
