import { TooltipProvider } from "@/components/ui/tooltip";
import { Home, LogOut, Package, User, Users } from "lucide-react";
import SideBarButton from "./side-bar-button";
import Image from "next/image";
import Logo from "@/public/logo-avatar.png";

const SideBar = () => {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <SideBarButton
              icon={<Image src={Logo} alt="Logo" width={50} height={50} />}
              link="/dashboard"
              title="CERG"
            />
            <SideBarButton
              icon={<Home className="h-5 w-5" />}
              link="/dashboard"
              title="Dashboard"
            />
            <SideBarButton
              icon={<Package className="h-5 w-5" />}
              link="/dashboard/orders"
              title="Pedidos"
            />
            <SideBarButton
              icon={<User className="h-5 w-5" />}
              link="#"
              title="Alunos"
            />
            <SideBarButton
              icon={<Users className="h-5 w-5" />}
              link="#"
              title="Funcionários"
            />
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <SideBarButton
              icon={<LogOut className="h- w-5" />}
              link="#"
              title="Sair"
            />
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
