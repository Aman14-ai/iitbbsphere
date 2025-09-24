"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateForDB } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ChevronDownIcon, CalendarIcon, Cake, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBirthdayDialog = ({ openDialog, onOpenChange }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateBirthDate = useMutation(
    trpc.home.updateBirthDate.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.home.getAllBirthDay.queryOptions()
        );
        toast.success("🎉 Birthday added successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.log("Something went wrong", error);
      },
    })
  );

  const handleSubmit = async () => {
    if (!value) {
      toast.error("Please select your birth date");
      return;
    }

    // Validate that the date is not in the future
    if (value > new Date()) {
      toast.error("Birth date cannot be in the future");
      return;
    }

    // Validate that the user is at least 13 years old
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
    if (value > minAgeDate) {
      toast.error("You must be at least 13 years old");
      return;
    }
    console.log(value);
    const formattedDate = formatDateForDB(value);
    console.log("formattedDate: ", formattedDate);
    const today = new Date();
    today.toLocaleDateString();
    console.log("today: ", new Date());
    updateBirthDate.mutate({
      birthDate: formattedDate,
    });
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <ResponsiveDialog
        open={openDialog}
        onOpenChange={onOpenChange}
        title="Add your birthdate"
        description="Celebrate with others"
      >
        <div className="flex items-center justify-center bg-gradient-to-br from-background to-accent/5">
          <Card className="w-full max-w-md shadow-2xl border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-15 h-15 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                <Cake className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                When&apos;s Your Birthday?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Let&apos;s celebrate you! Share your birth date to get birthday
                surprises 🎁
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Date Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Select your birth date
                </label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-12 text-base border-2 border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        <span
                          className={
                            value ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {value
                            ? value.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Choose your birthday"}
                        </span>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 opacity-50 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 shadow-xl border-primary/20"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={(date) => {
                        setValue(date);
                        setOpen(false);
                      }}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      className="border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Age Preview */}
              {value && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      You&apos;ll be:
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {calculateAge(value)} years old
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Born on a{" "}
                    {value.toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="bg-accent/30 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Why share your birthday?
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Get birthday surprises and rewards</li>
                  <li>• Special birthday recognition</li>
                  <li>• Personalized experience</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={updateBirthDate.isPending || !value}
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 shadow-lg"
              >
                {updateBirthDate.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Cake className="h-4 w-4 mr-2" />
                    Celebrate My Birthday!
                  </>
                )}
              </Button>

              {/* Privacy Note */}
              <p className="text-xs text-center text-muted-foreground">
                Your birth date is kept private and only used for birthday
                features
              </p>
            </CardContent>
          </Card>
        </div>
      </ResponsiveDialog>
    </div>
  );
};

export default AddBirthdayDialog;
