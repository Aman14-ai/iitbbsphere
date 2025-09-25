import { auth } from "@/lib/auth";
import WishesView from "@/modules/wishes/ui/views/WishesView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ userId: string }>;
}

const page = async ({ params }: Props) => {
  // protected page
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }


  const { userId } = await params;
  return <WishesView userId={userId} />;
};

export default page;
