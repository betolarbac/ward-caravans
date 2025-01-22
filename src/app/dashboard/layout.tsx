import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { Sidebar } from "./_components/sidebar/sidebar";
import UserLoggedIn from "./_components/UserloggedIn/UserloggedIn";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await UserLoggedIn();

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-gray-100">
        <Sidebar user={user} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
