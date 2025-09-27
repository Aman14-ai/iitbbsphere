import React from "react";
import DashboardBranchView from "@/modules/dashboard/ui/views/DashboardBranchView";
import Footer from "@/modules/home/ui/components/Footer";

interface Props {
  params: Promise<{ branch: string }>;
}

const page = async ({ params }: Props) => {
  const { branch } = await params;
  return (
    <>
      <DashboardBranchView branch={branch} />
      <Footer />
    </>
  );
};

export default page;
