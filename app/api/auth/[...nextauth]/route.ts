import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

import { use } from "react";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
