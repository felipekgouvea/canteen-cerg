import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions); // uso de NextAuth

export { handler as GET, handler as POST };
