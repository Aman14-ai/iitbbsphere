import React from "react";
import { DriveFile } from "../../../../../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  files: DriveFile[];
  icon: React.ReactNode;
  description?: string;
}

const FileSection = ({ title, files, icon, description }: Props) => {
  if (files.length === 0) return null;
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {title}
              <Badge variant="secondary" className="text-xs">
                {files.length} {files.length === 1 ? "file" : "files"}
              </Badge>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-4 h-4 text-gray-500" />
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
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0"
                >
                  <a
                    href={file.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                {file.webContentLink && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 w-8 p-0"
                  >
                    <a href={file.webContentLink} download>
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileSection;
