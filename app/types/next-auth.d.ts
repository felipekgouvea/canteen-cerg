// types/next-auth.d.ts
// eslint-disable-next-line
import NextAuth, * as nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & nextAuth.DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}
