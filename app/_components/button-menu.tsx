import type { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ButtonMenuProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const ButtonMenu = ({ title, icon, link }: ButtonMenuProps) => {
  return (
    <Button className="w-full justify-start text-sm" variant="outline" asChild>
      <Link href={link}>
        {icon}
        {title}
      </Link>
    </Button>
  );
};

export default ButtonMenu;
