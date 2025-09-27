import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/HomeView";
import { eq, getTableColumns } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

  if(session && AllowedEmail.includes(session.user.email))
  {
    console.log("session.user.email: ", session.user.email);
  }
  else if (session && !session.user.email.endsWith("@iitbbs.ac.in")) {
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
