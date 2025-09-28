import React from "react";
import DashboardBranchView from "@/modules/dashboard/ui/views/DashboardBranchView";
import Footer from "@/modules/home/ui/components/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ branch: string }>;
}

export const metadata: Metadata = {
  title: "IITBBSphere | Branch",
}

const page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const { branch } = await params;
  return (
    <>
      <DashboardBranchView branch={branch} />
      <Footer />
    </>
  );
};

export default page;
