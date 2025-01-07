"use client";

import { Bus, BusFront, LogOut, User } from "lucide-react";
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
                "hover:bg-primary hover:text-primary-foreground",
                pathName === "/dashboard" && "bg-primary text-primary-foreground")}>
              <a href="/dashboard" className="flex items-center">
                <Bus className="mr-2 h-4 w-4" />
                <span>Caravanas</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "hover:bg-primary hover:text-primary-foreground",)}>
              <a href="/dashboard/reports" className="flex items-center">
                <BusFront className="mr-2 h-4 w-4" />
                <span>Caravanas da Ala</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn("w-full justify-start",
                "hover:bg-primary hover:text-primary-foreground",)}>
              <a href="/dashboard/reports" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Usuários</span>
              </a>
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
            <p className="text-sm font-medium ">{user.name}</p>
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