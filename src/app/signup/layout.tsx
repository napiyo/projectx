
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import {UserProvider} from "@/lib/dataContext";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export default async function SignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
<html>
  <body>
  
        <UserProvider>
        <div className={cn(inter.className,"flex")}>
          {children}
          <div>hadslfjdslfjasdlfkj</div>
        </div>
        <ToastContainer  />
      
          </UserProvider>
          </body>
          </html>
  );
}
