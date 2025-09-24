"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PartyPopper, Cake } from "lucide-react";
import { generatedAvatarUrl } from "@/lib/avatar";
import Image from "next/image";

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
        <Card className="h-18 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 animate-pulse">
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
      <Card className="h-18 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10 relative overflow-hidden">
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

        <CardContent className="px-3 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left side - Birthday info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="w-12 mt-2 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  <Image
                    src={
                      currentUser.image ??
                      generatedAvatarUrl({
                        seed: currentUser.name,
                        variant: "initials",
                      })
                    }
                    width={28}
                    height={28}
                    alt={currentUser.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <PartyPopper className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    Today&apos;s Birthday
                  </span>
                </div>
                <h4 className="font-semibold text-foreground truncate text-sm">
                  {currentUser.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  Happy Birthday! 🎂
                </p>
              </div>
            </div>

            {/* Right side - Navigation */}
            {data.length > 1 && (
              <div className="flex flex-col items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevBirthday}
                  className="h-6 w-6 rounded-full bg-background/50 hover:bg-accent"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>

                <div className="text-xs text-muted-foreground font-mono">
                  {currentIndex + 1}/{data.length}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextBirthday}
                  className="h-6 w-6 rounded-full bg-background/50 hover:bg-accent"
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
