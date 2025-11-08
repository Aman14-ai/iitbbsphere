import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import Contribute from "./Contribute";

interface Props {
  branch: string;
  semester: string;
}

const NoContent = ({ branch, semester }: Props) => {
  return (
    <>
      <div className="py-30   flex items-center justify-center bg-gradient-to-br from-background to-accent/5">
        <Card className="text-center p-8 max-w-md">
          <CardContent>
            <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Content Yet
            </h2>
            <p className="text-muted-foreground mb-4">
              No study materials have been uploaded for {branch.toUpperCase()}{" "}
              Semester {semester} yet.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Branches</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Contribute />
    </>
  );
};

export default NoContent;
