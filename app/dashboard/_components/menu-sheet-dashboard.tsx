import ButtonMenu from "@/app/_components/button-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { PanelBottomIcon, ShoppingBag, User2, Users } from "lucide-react";
import Link from "next/link";

const MenuSheetDashboard = () => {
  return (
    <div className="flex flex-col px-4 sm:hidden sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelBottomIcon className="h-5 w-5" />
              <span className="sr-only">Abrir / Fechar menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <nav className="grid gap-5 text-lg font-medium">
              <Link href="#">
                <span>Logo</span>
              </Link>
              <ButtonMenu
                link="#"
                icon={<ShoppingBag size={16} />}
                title="Pedidos"
              />
              <ButtonMenu link="#" icon={<User2 size={16} />} title="Alunos" />
              <ButtonMenu
                link="#"
                icon={<Users size={16} />}
                title="Funcionários"
              />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default MenuSheetDashboard;
