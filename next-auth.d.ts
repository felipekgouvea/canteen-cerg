<<<<<<< HEAD
import { DefaultSession, DefaultUser } from "next-auth";
=======
<<<<<<< HEAD
=======
import NextAuth from "next-auth";
>>>>>>> 09d35c4e487de264fd3ec5e109851129e5fed99a

>>>>>>> c86d6581090a142c9e8ab220493e4e874adb574f
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
<<<<<<< HEAD
    } & DefaultSession["user"];
=======
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
>>>>>>> 09d35c4e487de264fd3ec5e109851129e5fed99a
  }

  interface User extends DefaultUser {
    id: string;
  }
}
