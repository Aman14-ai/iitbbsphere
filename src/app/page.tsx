import { db } from "@/db";
import { user } from "@/db/schema";
// import { db } from "@/db";
// import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/HomeView";
import { eq } from "drizzle-orm";
// import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  if(session && !session.user.email.endsWith("@iitbbs.ac.in")) {
    redirect("/sign-in?error=use your ittbbs mail id");
  }

  return (
    <div className="bg-background  h-screen">
      <HomeView />
    </div>
  );
}
