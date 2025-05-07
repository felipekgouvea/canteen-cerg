"use client";

import { Button } from "@/app/_components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import MenuSheet from "./menu-sheet";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();

  return (
    <header className="border-b-2 px-5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/CERG.png" alt="logomarca" height={30} width={150} />
        </Link>
        <MenuSheet />
      </div>
    </header>
  );
};

export default Header;
