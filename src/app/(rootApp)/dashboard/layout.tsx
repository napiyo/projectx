import { Navbar } from "@/components/admin-panel/navbar";
import FloatingDockDash from "@/components/floatingDock";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<div className="flex-1 flex flex-col">
    <Navbar title="Mihir is cute"/>

  {children}
  </div>
  );
}
