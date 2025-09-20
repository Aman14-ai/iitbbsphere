import LoadingState from "@/components/LoadingState";
import SignInView from "@/modules/auth/ui/views/SignInView";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoadingState title="Loading" description="Please wait. It may takes few seconds" />}>
      <SignInView />
    </Suspense>
  );
};

export default page;
