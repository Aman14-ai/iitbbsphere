"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import UserButton from "./UserButton";
import { generatedAvatarUrl } from "@/lib/avatar";
import { ModeToggle } from "@/components/ModdleToggler";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Mail,
  LayoutDashboard,
  Sparkles,
  Group,
  GraduationCap,
} from "lucide-react";
import MobileNav from "./MobileNav";
import { getBranchCode } from "@/modules/community/ui/views/CommunityView";
import { codeBranchMap } from "../../../../../constants";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const userEmail = session?.user.email;
  const branchCode = getBranchCode(
    userEmail || ""
  ) as keyof typeof codeBranchMap;

  const branch = codeBranchMap[branchCode];

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    {
      href: session ? `/dashboard/${branch}/community` : "/sign-in",
      label: "Community",
      icon: <Group className="h-4 w-4" />,
    },
    {
      href: session ? `/dashboard/${branch}` : "/sign-up",
      label: "Semester",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    ...(session
      ? [
          {
            href: "/dashboard",
            label: "Branches",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  return (
    <>
      <nav className=" z-50 fixed w-full py-3  border-primary/10 border-b top-0 px-4 bg-background h-16  ">
        <div className="flex items-center justify-between ">
          <Link
            href="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <Image src={"/iitlogo.png"} alt="Logo" width={32} height={32} />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">
                IITBBSphere
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Knowledge Hub
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center justify-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/60 hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ModeToggle />
            </li>
          </ul>

          {/* Mobile menu button (simplified) */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* User actions */}
          <div className=" items-center gap-2 hidden md:flex">
            {session ? (
              <UserButton
                onSignOut={() => {
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/");
                      },
                    },
                  });
                }}
                name={session.user.name}
                email={session.user.email}
                image={
                  session.user.image ||
                  generatedAvatarUrl({
                    seed: session.user.name,
                    variant: "initials",
                  })
                }
              />
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-up")}
                  className="hidden sm:inline-flex"
                >
                  Sign Up
                </Button>
                <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
