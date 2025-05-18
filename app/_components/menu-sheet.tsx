"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
  SquareMenuIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import ButtonMenu from "./button-menu";
import { useRouter } from "next/navigation";

const MenuSheet = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogOut = () => {
    signOut();
    router.push("/");
  };

  const handleLogIn = () => {
    signIn();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <div className="flex h-screen flex-col">
            <SheetTitle className="mb-6 text-left">Menu</SheetTitle>
            <div className="h-auto flex-1">
              <div>
                {" "}
                {data?.user ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div>
                          <Avatar>
                            <AvatarImage
                              src={data.user.image as string | undefined}
                            />
                            <AvatarFallback>
                              {data.user.name?.split(" ")[0][0]}
                              {data.user.name?.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col text-start">
                          <span className="text-sm font-semibold">
                            {data?.user?.name}
                          </span>
                          <span className="text-xs font-light">
                            {data?.user?.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm font-bold">Olá. Faça seu login!</h1>
                    <Button
                      size="icon"
                      onClick={handleLogIn}
                      variant="destructive"
                    >
                      <LogInIcon />
                    </Button>
                  </div>
                )}
                <div className="py-6">
                  <Separator />
                </div>
                <div className="space-y-4">
                  <ButtonMenu
                    link="/restaurant/canteen-cerg"
                    icon={<SquareMenuIcon size={16} />}
                    title="Cardápio"
                  />
                  {data?.user && (
                    <div className="space-y-4">
                      <ButtonMenu
                        link="/my-orders"
                        icon={<ScrollTextIcon size={16} />}
                        title="Meus Pedidos"
                      />
                      <ButtonMenu
                        icon={<HeartIcon size={16} />}
                        title="Lanches Favoritos"
                        link=""
                      />
                    </div>
                  )}
                </div>
                <div className="py-6">
                  <Separator />
                </div>
              </div>
              {data?.user && (
                <div>
                  <Button
                    className="w-full justify-start text-sm"
                    variant="outline"
                    onClick={handleLogOut}
                  >
                    <LogOutIcon size="icon" />
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
