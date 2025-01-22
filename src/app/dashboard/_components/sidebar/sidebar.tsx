"use client";

import { Bus, BusFront, LogOut, School, User } from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathName = usePathname();

  return (
    <ShadcnSidebar className="hidden md:flex">
      <SidebarHeader className="px-4 pt-6 pb-9 flex flex-row items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          className="p-[2px] bg-[#007da5] w-6 rounded"
        >
          <path d="M19.75 15v5.75h-5.409v-3.637A2.343 2.343 0 0 0 12 14.772a2.343 2.343 0 0 0-2.341 2.341v3.637H4.25V15h-.056l6.223-3.007c.208-.1.358-.29.407-.516L12 6.045l1.176 5.432a.748.748 0 0 0 .407.516L19.806 15h-.056zm-5.185-4.198l-1.832-8.461c-.171-.788-1.295-.788-1.466 0l-1.832 8.461-7.761 3.75a.75.75 0 1 0 .652 1.351l.424-.205V21.5c0 .414.336.75.75.75h17a.75.75 0 0 0 .75-.75v-5.802l.424.205a.75.75 0 1 0 .652-1.351l-7.761-3.75z"></path>
        </svg>
        <h2 className="text-lg font-semibold">Ward Caravans</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-[#167b9c;] hover:text-primary-foreground",
                pathName === "/dashboard" &&
                  "bg-[#167b9c;] text-primary-foreground"
              )}
            >
              <Link href="/dashboard" className="flex items-center">
                <Bus className="mr-2 h-4 w-4" />
                <span>Caravanas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-[#167b9c;] hover:text-primary-foreground",
                pathName.startsWith("/dashboard/ward-caravans") &&
                  "bg-[#167b9c;] text-primary-foreground"
              )}
            >
              <Link
                href="/dashboard/ward-caravans"
                className="flex items-center"
              >
                <BusFront className="mr-2 h-4 w-4" />
                <span>Caravanas da Ala</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {user.role === "stake" ? (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full justify-start",
                    "transition delay-75 duration-75 ease-in-out hover:bg-[#167b9c;] hover:text-primary-foreground",
                    pathName === "/dashboard/ward" &&
                      "bg-[#167b9c;] text-primary-foreground"
                  )}
                >
                  <Link href="/dashboard/ward" className="flex items-center">
                    <School className="mr-2 h-4 w-4" />
                    <span>Alas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full justify-start",
                    "transition delay-75 duration-75 ease-in-out hover:bg-[#167b9c;] hover:text-primary-foreground",
                    pathName === "/dashboard/user" &&
                      "bg-[#167b9c;] text-primary-foreground"
                  )}
                >
                  <Link href="/dashboard/user" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Usuários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : null}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
              alt={user.name as string}
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="truncate">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
          <span className="text-destructive">Sair</span>
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
