"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import SemesterDialog from "@/modules/semester/ui/components/SemesterDialog";

interface Props{
    branch:string;
    isDialogOpen:boolean;
    setIsDialogOpen:(open:boolean)=>void
}

const SemesterChoose = ({branch , isDialogOpen , setIsDialogOpen}:Props) => {
  

 

  return (
    <div className=" bg-gradient-to-br from-background to-accent/5 py-4 px-3">
      <div className="max-w-4xl mx-auto">
       
        {/* Main CTA Card */}
        <Card className="max-w-md mx-auto border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-3">
              Access Study Materials
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Choose your semester to explore subject-wise resources, notes, and previous year papers
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80"
              size="lg"
            >
              Select Semester
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="hidden md:grid  md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card className="text-center p-6 border-border">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Organized Resources</h3>
              <p className="text-sm text-muted-foreground">
                Semester-wise materials neatly categorized by subjects
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 border-border">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Content</h3>
              <p className="text-sm text-muted-foreground">
                Curated study materials from professors and top students
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 border-border">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Access</h3>
              <p className="text-sm text-muted-foreground">
                Quick semester selection and intuitive navigation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

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