"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SemesterDialog from "@/modules/semester/ui/components/SemesterDialog";

interface Props {
  branch: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const SemesterChoose = ({
  branch,
  isDialogOpen,
  setIsDialogOpen,
}: Props) => {
  return (
    <div className=" flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-lg font-medium">
            Access study materials
          </h2>

          <p className="text-sm text-muted-foreground">
            Select your semester to view subject-wise academic resources.
          </p>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full"
          >
            Select semester
          </Button>
        </CardContent>
      </Card>

      {/* Semester Selection Dialog */}
      <SemesterDialog
        branch={branch}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default SemesterChoose;
