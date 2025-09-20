import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { adminEmail } from "../../../../constants";
import Link from "next/link";
import NonAdminMsg from "@/modules/admin/ui/components/NonAdminMsg";
import AdminView from "@/modules/admin/ui/views/AdminView";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (!adminEmail.includes(session.user.email)) {
    return <NonAdminMsg />;
  }

  return <AdminView />;
};

export default Page;
