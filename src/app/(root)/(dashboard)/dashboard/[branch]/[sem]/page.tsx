import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ sem: string }>;
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
    <div className="flex h-screen justify-center items-center">sem: {sem}</div>
  );
};

export default page;
