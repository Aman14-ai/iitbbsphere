import SignInView from "@/modules/auth/ui/views/SignInView";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInView />
    </Suspense>
  );
};

export default page;
