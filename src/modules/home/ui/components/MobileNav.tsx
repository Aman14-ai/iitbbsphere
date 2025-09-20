"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Home,
  LayoutDashboard,
  Mail,
  User,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import UserButton from "./UserButton";
import { generatedAvatarUrl } from "@/lib/avatar";
import { ModeToggle } from "@/components/ModdleToggler";

const MobileNav = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <User className="h-4 w-4" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
    ...(session
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 md:hidden"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center gap-2 font-normal">
          <div className="p-1 bg-primary rounded-md">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-medium">StudySphere</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <DropdownMenuItem
                key={item.href}
                className={`cursor-pointer ${isActive ? "bg-accent" : ""}`}
                onClick={() => router.push(item.href)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuItem className="cursor-pointer -ml-3">
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {session ? (
          <>
            <DropdownMenuItem>
              <UserButton
                onSignOut={() => authClient.signOut()}
                name={session.user.name}
                email={session.user.email}
                image={
                  session.user.image ??
                  generatedAvatarUrl({
                    seed: session.user.name,
                    variant: "initials",
                  })
                }
              />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/sign-in")}
            >
              <span className="mr-2">
                <LogIn className="h-4 w-4" />
              </span>
              <span>Sign In</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/sign-up")}
            >
              <span className="mr-2">
                <UserPlus className="h-4 w-4" />
              </span>
              <span>Sign Up</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
