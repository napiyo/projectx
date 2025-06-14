import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBarMain } from "@/components/sidebarMain";
import { cn } from "@/lib/utils";
import {UserProvider} from "@/lib/dataContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body>
      <UserProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}

        <ToastContainer  />
          </ThemeProvider>
          </UserProvider>

      </body>
    </html>
  );
}
