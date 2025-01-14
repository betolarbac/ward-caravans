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
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  user: Session["user"];
}

export function Sidebar({ user }: SidebarProps) {

  const pathName = usePathname()

  return (
    <ShadcnSidebar className="hidden md:flex">
      <SidebarHeader className="px-4 pt-6 pb-9">
        <h2 className="text-lg font-semibold">Ward Caravans</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-primary hover:text-primary-foreground",
                pathName === "/dashboard" && "bg-primary text-primary-foreground")}>
              <Link href="/dashboard" className="flex items-center">
                <Bus className="mr-2 h-4 w-4" />
                <span>Caravanas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-primary hover:text-primary-foreground",
                pathName.startsWith("/dashboard/ward-caravans") && "bg-primary text-primary-foreground")}>
              <Link href="/dashboard/ward-caravans" className="flex items-center">
                <BusFront className="mr-2 h-4 w-4" />
                <span>Caravanas da Ala</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-primary hover:text-primary-foreground",
                pathName === "/dashboard/ward" && "bg-primary text-primary-foreground")}>
              <Link href="/dashboard/ward" className="flex items-center">
                <School className="mr-2 h-4 w-4" />
                <span>Alas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "transition delay-75 duration-75 ease-in-out hover:bg-primary hover:text-primary-foreground",
                pathName === "/dashboard/user" && "bg-primary text-primary-foreground")}>
              <Link href="/dashboard/user" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Usuários</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`} alt={user.name as string} />
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
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
