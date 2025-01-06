import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  title: string
}

export default function Header({title}: HeaderProps) {
  return (
    <>
      <div className="flex items-center mb-4 md:mb-6">
        <SidebarTrigger className="mr-4 md:hidden" />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </>
  );
}
