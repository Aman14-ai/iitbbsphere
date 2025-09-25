import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AddBirthDayInput from "./AddBirthDayInput";
import TodayBirthDay from "./TodayBirthDay";

interface Props {
  isBirthDate?: boolean;
}

const Hero2 = ({ isBirthDate }: Props) => {
  return (
    <div className="container px-3 pt-25 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 
                      scale-90 sm:scale-95 md:scale-100">
        {/* Left Section */}
        <div className="w-full md:w-5/12 flex gap-9 flex-col justify-center md:justify-start">
          <img
            src={"./iitlogo.png"}
            alt="IIT Bhubaneswar Campus"
            className="object-cover"
          />
          <TodayBirthDay />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          {!isBirthDate && (
            <div className="-mt-4">
              <AddBirthDayInput />
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-5xl  font-bold text-foreground leading-tight">
            Solve your problems of <span className="text-primary">study</span>
          </h1>

          <p className="text-sm sm:text-base md:text-md text-muted-foreground max-w-lg">
            A friendly web portal where IITBBS students from all departments can
            access past exam papers, notes, and study guides. This site connects
            juniors to share knowledge and prepare together.
          </p>

          <div className="flex flex-wrap gap-3 mt-3">
            <Link href={"/dashboard"}>
              <button className="px-2 py-2 sm:px-3 sm:py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-md">
                Get Started Free
              </button>
            </Link>
            <Link href={"/premium"}>
              <button className="px-2 py-2 sm:px-3 sm:py-2 border border-border bg-background text-foreground font-medium rounded-md hover:bg-accent transition-colors text-sm sm:text-md">
                Get Premium
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-5 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-2 border-background"
                    style={{ opacity: 1 - item * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-sm">join</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm">rating</span>
            </div>
            <Button className="text-xs" variant={"link"} size={"sm"}>
              <Link href={"/admin"}>
                <span className="text-xs font-normal">admin</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
