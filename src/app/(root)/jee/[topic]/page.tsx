import { auth } from "@/lib/auth";
import JEESubjectsView from "@/modules/jee/views/JEESubjectsView";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "IITBBSphere | JEE Contents",
};

interface Props {
  params: Promise<{ topic: string }>;
}

const page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const { topic } = await params;

  return (
    <div className="bg-gradient-to-b from-background to-ring/30">
      <JEESubjectsView topic={topic} />
    </div>
  );
};

export default page;
