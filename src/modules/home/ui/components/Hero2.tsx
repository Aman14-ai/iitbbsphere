import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AddBirthDayInput from "./AddBirthDayInput";
import TodayBirthDay from "./TodayBirthDay";
import { authClient } from "@/lib/auth-client";
import { getBranchCode } from "@/modules/community/ui/views/CommunityView";
import { codeBranchMap } from "../../../../../constants";

interface Props {
  isBirthDate?: boolean;
}

const Hero2 = ({ isBirthDate }: Props) => {
  const { data: session } = authClient.useSession();
  const userEmail = session?.user.email;
  const branchCode = getBranchCode(
    userEmail || ""
  ) as keyof typeof codeBranchMap;

  const branch = codeBranchMap[branchCode];

  return (
    <div className="py-4 pt-35 w-full bg-gradient-to-b from-white to-blue-200 dark:from-gray-950 dark:to-gray-500">
      <div
        className="container px-4 mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-8 md:gap-12 
                      scale-90 sm:scale-95 md:scale-100"
      >
        {/* Left Section */}
        <div className="w-full md:w-5/12 flex gap-9 flex-col justify-center md:justify-start">
          <img
            src={"./iitlogo.png"}
            alt="IIT Bhubaneswar Campus"
            className="object-cover "
          />
          <div className="animate-slide-up">
            <TodayBirthDay />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-7/12 items-center md:items-start text-center md:text-left flex flex-col gap-5">
          {!isBirthDate && (
            <div className="-mt-4 animate-fade-in">
              <AddBirthDayInput />
            </div>
          )}

          <h1 className="text-blue-700 dark:text-blue-200 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl animate-text-focus-in">
            Learning <span className="text-primary animate-pulse-slow">Hub</span>
          </h1>

          <p className="max-w-2xl mt-6 text-lg text-gray-600 dark:text-gray-300 animate-text-focus-in">
            A community built by students, for students. Explore, upload, and
            share IITBBS resources that help everyone shine brighter!
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10 animate-bounce-in">
            <Link href={`${session ? `/dashboard/${branch}` : "/sign-in"}`}>
              <Button 
                variant="default" 
                className="hover:scale-105 transition-transform duration-300"
              >
                Explore Contents
              </Button>
            </Link>
            <Link
              href={`${
                session ? `/dashboard/${branch}/community` : "/sign-in"
              }`}
            >
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-transform duration-300"
              >
                Visit community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;