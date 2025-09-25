import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { auth } from "@/lib/auth";
import WishesView from "@/modules/wishes/ui/views/WishesView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Divide } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.wishes.getWishesForUser.queryOptions({ toUserId: userId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading wishes" description="Please wait. It may takes few seconds" />}>
        <ErrorBoundary fallback={<ErrorState title="Something went wrong" description="please try aagain later."/>}>
          <WishesView userId={userId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
