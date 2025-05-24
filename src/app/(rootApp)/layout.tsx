import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Navbar } from "@/components/admin-panel/navbar";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { SideBarMain } from "@/components/sidebarMain";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="flex-1 flex dark:bg-black">
    <Sidebar />
    <div className="flex flex-col flex-1">

    {/* <Navbar title="Mihir is cute"/> */}
        {children}
    </div>
    
    </div> 
    
  }