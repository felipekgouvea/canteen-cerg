"use client";

import Image from "next/image";
import Link from "next/link";

import MenuSheet from "./menu-sheet";
import LogoMarca from "@/public/CERG.png";

const Header = () => {
  return (
    <header className="border-b-2 px-5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src={LogoMarca}
            alt="logomarca"
            height={30}
            width={150}
            priority
            quality={100}
          />
        </Link>
        <MenuSheet />
      </div>
    </header>
  );
};

export default Header;
