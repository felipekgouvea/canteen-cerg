"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "./ui/button";

const LoginGoogleButton = () => {
  const router = useRouter();

  const handleLogIn = () => {
    signIn();
    router.push("/home");
  };

  return <Button onClick={handleLogIn}>Fazer Login Google</Button>;
};

export default LoginGoogleButton;
