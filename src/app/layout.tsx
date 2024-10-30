import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBarMain } from "@/components/sidebarMain";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"flex")} >
       <SideBarMain />
         <div className="flex-1">
           {children}
          </div>
        </body>
    </html>
  );
}
