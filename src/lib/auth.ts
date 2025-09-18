import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => {
        const email = profile.email;

        // Restrict only to IIT Bhubaneswar email addresses
        if (!email || !email.endsWith("@iitbbs.ac.in")) {
          throw new Error("Email is not from IIT Bhubaneswar");
        }

        // ✅ Allow login
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  },
});
