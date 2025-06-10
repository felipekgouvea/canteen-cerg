import NextAuth from "next-auth";
import { authOptions } from "@/app/_lib/auth";

const handler = NextAuth(authOptions); // uso de NextAuth

export { handler as GET, handler as POST };
