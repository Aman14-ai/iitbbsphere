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
import { Home, User, Mail, LayoutDashboard, Sparkles } from "lucide-react";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

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
    <>
      <nav className="py-1 shadow-lg shadow-primary/20 rounded-md z-50 sticky top-0 w-full border-b border-primary/10  backdrop-blur-xl">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-foreground"
          >
            <div className="p-1 bg-primary rounded-md">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>IITBBSphere</span>
            {/* <Image className="bg-black" src={"/website-logo.png"} alt="logo" width={100} height={100} /> */}
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center justify-center gap-1">
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
                  authClient.signOut();
                  window.location.reload();
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
