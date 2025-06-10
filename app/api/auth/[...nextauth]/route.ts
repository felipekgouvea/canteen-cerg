<<<<<<< HEAD
import { authOptions } from "@/app/_lib/auth";
=======
import { authOptions } from "@/lib/auth";
>>>>>>> 09d35c4e487de264fd3ec5e109851129e5fed99a
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
