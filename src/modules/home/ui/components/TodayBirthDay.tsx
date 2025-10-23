"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Cake,
  Sparkles,
  Gift,
} from "lucide-react";
import { generatedAvatarUrl } from "@/lib/avatar";
import Image from "next/image";
import Link from "next/link";

interface BirthdayUser {
  id: string;
  name: string;
  email?: string;
  image?: string | null;
}

const TodayBirthDay = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.home.getAllBirthDay.queryOptions()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !data || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data, isAutoPlaying]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="h-20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-500/30 animate-pulse shadow-2xl">
          <CardContent className="p-4 flex items-center justify-center h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-300/30 dark:bg-purple-600/30 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-3 bg-purple-300/30 dark:bg-purple-600/30 rounded w-24"></div>
                <div className="h-2 bg-purple-300/30 dark:bg-purple-600/30 rounded w-16"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return null;
  }

  const nextBirthday = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setIsAutoPlaying(false);
  };

  const prevBirthday = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setIsAutoPlaying(false);
  };

  const currentUser: BirthdayUser = data[currentIndex];

  return (
    <div className="w-full max-w-md mx-auto relative">
      <Card className="h-24 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-500/30  relative overflow-hidden group hover:shadow-purple-500/30 dark:hover:shadow-purple-500/60 transition-all duration-300">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-blue-500/20 animate-pulse pointer-events-none"></div>

        <CardContent className="p-3 pb-6 h-full relative z-10">
          <div className="flex items-center justify-between h-full gap-2 pt-3">
            {/* Avatar with glow */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12  rounded-full flex items-center justify-center shadow-xl overflow-hidden ring-2 ring-white/50 dark:ring-gray-800/50">
                <Image
                  src={
                    currentUser.image ??
                    generatedAvatarUrl({
                      seed: currentUser.name,
                      variant: "initials",
                    })
                  }
                  width={48}
                  height={48}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1  min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 truncate uppercase tracking-wider">
                  Birthday Today
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h4 className="ml-2 font-bold text-gray-900 dark:text-white text-base truncate flex-1 tracking-tight">
                  {currentUser.name}
                </h4>
                <Link
                  href={`/wishes/${currentUser.id}`}
                  className="z-20 flex-shrink-0 text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Send Wish ✨
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <PartyPopper className="w-3 h-3 text-orange-500 dark:text-orange-400" />
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate font-medium">
                  Celebrate this special day!
                </p>
              </div>
            </div>

            {/* Navigation */}
            {data.length >= 1 && (
              <div className="flex-shrink-0 flex flex-col items-center gap-0.5 ml-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevBirthday}
                  className="z-20 h-7 w-7 rounded-full  "
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-purple-700 dark:text-purple-300" />
                </Button>

                <div className="text-[10px] text-purple-700 dark:text-purple-300 font-bold whitespace-nowrap px-1 py-0.5 bg-white/50 dark:bg-gray-800/50 rounded-full">
                  {currentIndex + 1}/{data.length}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextBirthday}
                  className="z-20 h-7 w-7 rounded-full  "
                >
                  <ChevronRight className="h-3.5 w-3.5 text-purple-700 dark:text-purple-300" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>  
      </Card>
    </div>
  );
};

export default TodayBirthDay;
