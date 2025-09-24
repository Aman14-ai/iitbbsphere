"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PartyPopper, Cake } from "lucide-react";
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

  // Auto-rotate birthdays every 4 seconds
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
        <Card className="h-20 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 animate-pulse">
          <CardContent className="p-4 flex items-center justify-center h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-3 bg-primary/20 rounded w-24"></div>
                <div className="h-2 bg-primary/20 rounded w-16"></div>
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
    <div className="w-full max-w-md mx-auto">
      {/* Compact Birthday Badge */}
      <Card className="h-20 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10 relative overflow-hidden">
        {/* Animated confetti background */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              🎉
            </span>
          ))}
        </div>

        <CardContent className="p-3 h-full">
          <div className="flex items-center justify-between h-full gap-2">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg overflow-hidden">
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
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                <Cake className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Text Content - Truncated */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1">
                <PartyPopper className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-primary truncate">
                  Today&apos;s Birthday
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-foreground text-sm truncate flex-1">
                  {currentUser.name}
                </h4>
                <Link
                  href={`/wishes/${currentUser.id}`}
                  className="z-5 flex-shrink-0 text-xs bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded-full transition-colors whitespace-nowrap"
                >
                  Wish him
                </Link>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                Happy Birthday! 🎂
              </p>
            </div>

            {/* Navigation - Only show if multiple birthdays */}
            {data.length > 1 && (
              <div className="flex-shrink-0 flex flex-col items-center gap-1 ml-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevBirthday}
                  className="z-5 h-6 w-6 rounded-full bg-background/50 hover:bg-accent"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>

                <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  {currentIndex + 1}/{data.length}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextBirthday}
                  className="z-5 h-6 w-6 rounded-full bg-background/50 hover:bg-accent"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Progress bar for multiple birthdays */}
          {data.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
              <div
                className="h-full bg-primary/50 transition-all duration-1000 ease-out"
                style={{
                  width: `${((currentIndex + 1) / data.length) * 100}%`,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dot indicators for multiple birthdays */}
      {data.length > 1 && (
        <div className="flex justify-center space-x-1 mt-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayBirthDay;
