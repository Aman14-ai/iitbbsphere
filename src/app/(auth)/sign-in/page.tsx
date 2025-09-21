import LoadingState from "@/components/LoadingState";
import SignInView from "@/modules/auth/ui/views/SignInView";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata:Metadata = {
  title:"IITBBSphere | Sign In",
}

const page = () => {
  return (
    <Suspense fallback={<LoadingState title="Loading" description="Please wait. It may takes few seconds" />}>
      <SignInView />
    </Suspense>
  );
};

export default page;
