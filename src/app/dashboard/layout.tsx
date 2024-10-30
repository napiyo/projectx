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
  return (<>
      <div>{children}</div>
  </>
  );
}
