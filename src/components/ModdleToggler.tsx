"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";


export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button
          onClick={() => setTheme("dark")}
          variant={"ghost"}
          className="flex w-full items-center justify-start gap-4 pr-5 pl-3"
        >
          <Moon />
          <span className="flex md:hidden font-normal">Dark Mode</span>{" "}
        </Button>
      ) : (
        <Button
          onClick={() => setTheme("light")}
          variant={"ghost"}
          className="flex w-full items-center justify-start gap-4 pr-5 pl-3"
        >
          <Sun />
          <span className="font-normal md:hidden flex">Light Mode</span>
        </Button>
      )}
    </>
  );
}
