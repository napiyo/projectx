'use client'
import { useState } from "react";
import { IconArrowLeft, IconBrandTabler, IconDeviceAnalytics, IconRobot, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
export function SideBarMain(){
    const links = [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: (
            <IconDeviceAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Bot Builder",
          href: "/flowbuilder",
          icon: (
            <IconRobot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Home",
          href: "/",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Logout",
          href: "#",
          icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ];
      const [open, setOpen] = useState(false);
return <div className="dark h-screen sticky left-0 top-0 shadow-lg shadow-white">
 <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={`sidebar_${idx}`} link={link} />
              ))}
            </div>
          </div>
          {/* <div> */}
          </SidebarBody>
        </Sidebar>
        </div>
}