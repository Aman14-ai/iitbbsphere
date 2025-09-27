import { db } from "@/db";
import { user } from "@/db/schema";
// import { db } from "@/db";
// import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/HomeView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { eq, getTableColumns } from "drizzle-orm";
// import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { AllowedEmail } from "../../../constants";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // if (!session) {
  //   redirect("/sign-in");
  // }
  // if (!session?.user.email.endsWith("@iitbbs.ac.in")) {
  //   //await db.delete(user).where(eq(user.id, session.user.id));
  //   redirect("/sign-in?error=use your ittbbs mail id");
  // } else {
  //   await db
  //     .update(user)
  //     .set({ emailVerified: true })
  //     .where(eq(user.id, session.user.id));
  // }



  if ((session && !session.user.email.endsWith("@iitbbs.ac.in")) || session && AllowedEmail.includes(session?.user.email)) {
    redirect("/sign-in?error=use your ittbbs mail id");
  }
  let currentUserBirthDate;
  if (session) {
    const [currentUser] = await db
      .select({ ...getTableColumns(user) })
      .from(user)
      .where(eq(user.id, session.user.id));
    currentUserBirthDate = !!currentUser.birthDate;
  }

  return (
    <div className="bg-background  h-screen">
      <HomeView isBirthDate={currentUserBirthDate} />
    </div>
  );
}
