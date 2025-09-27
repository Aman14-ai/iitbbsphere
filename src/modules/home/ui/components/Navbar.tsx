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

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/#about", label: "About", icon: <User className="h-4 w-4" /> },
    { href: "/#contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
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
      <nav className="py-1 max-w-[400px] md:max-w-[1000px] mt-2 mx-auto shadow-lg shadow-primary/20 rounded-2xl z-50 fixed left-1/2 right-1/2 -translate-x-1/2 bg-muted top-0 w-full border-b border-primary/10 ">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <div className="relative p-2 bg-gradient-to-br from-primary to-primary/70 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
              <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md group-hover:bg-primary/30 transition-colors duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                IITBBSphere
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Knowledge Hub
              </span>
            </div>
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
