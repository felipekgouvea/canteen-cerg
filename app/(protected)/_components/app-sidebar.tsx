"use client";

import {
  Gem,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import LogoMarca from "@/public/CERG.png";
import { formatName } from "@/helpers/format-name";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Produtos",
    url: "/products",
    icon: ShoppingCart,
  },
  {
    title: "Alunos",
    url: "/students",
    icon: User,
  },
  {
    title: "Funcionários",
    url: "/employees",
    icon: Users,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const { data } = useSession();
  const pathname = usePathname();

  // if (!data?.user) {
  //   return redirect("/authentication");
  // }

  const handleSignOut = async () => {
    await signOut();
    router.push("/authentication");
  };
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Image
          src={LogoMarca}
          alt="Cantina CERG"
          width={200}
          height={40}
          className="object-cover"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url ? "text-primary" : "text-foreground"
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/subscription"}
                >
                  <Link href="/subscription">
                    <Gem />
                    <span>Assinatura</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage src={data?.user.image as string} />
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-[0.1rem]">
                    <p className="text-sm">
                      {formatName(data?.user.name as string)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {data?.user.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
