import { ModeToggle } from "@/components/ModdleToggler";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  if (!session?.user.email.endsWith("@iitbbs.ac.in")) {
    await db.delete(user).where(eq(user.id, session.user.id));
    redirect("/sign-in?error=use your college mail id");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <ModeToggle />
    </div>
  );
}
