<<<<<<< HEAD
=======
import NextAuth from "next-auth";

>>>>>>> c86d6581090a142c9e8ab220493e4e874adb574f
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}
