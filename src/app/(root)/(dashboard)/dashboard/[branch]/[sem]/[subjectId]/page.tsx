import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { auth } from "@/lib/auth";
import SubjectIdViews from "@/modules/semester/ui/views/SubjectIdViews";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: "IITBBSphere | Contents",
};

interface Props {
  params: Promise<{ subjectId: string }>;
}

const page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const { subjectId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.semester.getRowOfContentsByRowId.queryOptions({ id: subjectId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading contents"
            description="Please wait. It may takes few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Something went wrong"
              description="please try aagain later."
            />
          }
        >
          <SubjectIdViews subjectId={subjectId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
