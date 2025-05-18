import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import type { ReactNode } from "react";

interface SideBarButtonProps {
  icon: ReactNode;
  title: string;
  link: string;
}

const SideBarButton = ({ icon, title, link }: SideBarButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
};

export default SideBarButton;
