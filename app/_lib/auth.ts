// lib/auth.ts ou app/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { User } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
