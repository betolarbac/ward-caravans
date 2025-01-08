import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { Sidebar } from "./_components/sidebar/sidebar";
import { getSession } from "./action";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession()
  
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-gray-100">
        <Sidebar user={session} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
