// types/next-auth.d.ts
<<<<<<< HEAD
import { DefaultSession } from "next-auth";
=======
// eslint-disable-next-line
import NextAuth, * as nextAuth from "next-auth";
>>>>>>> development

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
<<<<<<< HEAD
    } & DefaultSession["user"];
=======
    } & nextAuth.DefaultSession["user"];
  }

  interface User {
    id: string;
>>>>>>> development
  }
}
