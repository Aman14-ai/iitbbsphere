import { auth } from "@/lib/auth";
import DashboardView from "@/modules/dashboard/ui/views/DashboardView";
import Footer from "@/modules/home/ui/components/Footer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async() => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session)
  {
    redirect('/sign-in');
  }


  return (
    <div className="py-25">
      <DashboardView />
      <Footer />
    </div>
  );
};

export default page;
