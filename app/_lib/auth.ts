import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, Session, User } from "next-auth";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: Session;
      user: User;
    }): Promise<Session> {
      session.user = { ...session.user, id: user.id };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
