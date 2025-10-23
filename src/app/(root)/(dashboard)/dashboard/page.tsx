import { auth } from "@/lib/auth";
import DashboardView from "@/modules/dashboard/ui/views/DashboardView";
import Footer from "@/modules/home/ui/components/Footer";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "IITBBSphere | Branch",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="pt-25 bg-gradient-to-b from-white to-blue-100 dark:from-gray-950 dark:to-gray-800">
      <DashboardView />
      <Footer />
    </div>
  );
};

export default page;
