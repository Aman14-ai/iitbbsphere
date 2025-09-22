"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/db";
import { user } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import { ChevronDownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ProfileViews = () => {
  const session = authClient.useSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [value, setValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const updateBirthDate = useMutation(
    trpc.home.updateBirthDate.mutationOptions({
      onSuccess: () => {
        redirect("/");
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.log("Something went wrong",error);
      },
    })
  );

  const handleSubmit = async () => {
    if (!value || !session.data?.user.id) return;

    const formattedDate = value.toISOString().split("T")[0]; // "YYYY-MM-DD"
    console.log(formattedDate, typeof formattedDate);

    updateBirthDate.mutate({
      birthDate: formattedDate,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select birth date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              setValue(date);
              setOpen(false); // close popover after selection
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleSubmit} type="submit" className="mt-5">
        Submit
      </Button>
    </div>
  );
};

export default ProfileViews;
