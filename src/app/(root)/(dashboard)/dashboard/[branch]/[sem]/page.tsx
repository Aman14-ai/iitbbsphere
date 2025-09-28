import { auth } from "@/lib/auth";
import SemesterView from "@/modules/semester/ui/views/SemesterView";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ sem: string }>;
}

export const metadata:Metadata = {
  title: "IITBBSphere | Contents",
}

const page = async ({ params }: Props) => {
  const { sem } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

 

  return (
    <SemesterView />
  );
};

export default page;
