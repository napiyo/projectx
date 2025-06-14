'use client';
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconDeviceAnalytics,
  IconRobot,
  IconSettings,
  IconChevronDown,
  IconUserBolt,
  IconMessageReply
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserContext } from "@/lib/dataContext";
import { getMeServiceInstance } from "@/lib/api/user";
import {motion} from 'framer-motion'

export function SideBarMain() {
  // const pathname = usePathname();

  // Define routes that should not include the sidebar
  // const noSidebarRoutes = ['/signup'];
  const {state,dispatch} = useContext(UserContext);
  const user = state.userData
  // const showSidebar = !noSidebarRoutes.includes(pathname);
  // if(!showSidebar){
  //   return <></>
  // }
  const [open, setOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (!user) {
      const _user = getMeServiceInstance().getMyData();
      console.log("user loadded",_user);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: _user });
    }
  }, [state, dispatch,user]);
  // Sidebar links with submenus
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconDeviceAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Bot Builder",
      href: "/flowbuilder",
      icon: <IconRobot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: "Private Reply",
      href: "/privateReply",
      icon: <IconMessageReply className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      subMenu: [
        { label: "Profile", href: "/settings/profile" },
        { label: "Preferences", href: "/settings/preferences" },
      ],
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  // Toggles submenu expansion
  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  
  return (
    <div className="dark h-screen sticky left-0 top-0 shadow-lg shadow-white">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-2 whitespace-nowrap overflow-hidden">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-4 flex flex-col">
              {links.map((link, idx) => (
                <div key={`sidebar_${idx}`}>
                  {/* Sidebar Link */}
                  {link.subMenu ? (
                    <div
                      className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      onClick={() => toggleMenu(link.label)}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon}
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                          {link.label}
                        </span>
                      </div>
                      {open && (
                        <IconChevronDown
                          className={`h-4 w-4 text-neutral-700 dark:text-neutral-200 transition-transform ${
                            expandedMenus[link.label] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    <Link href={link.href}>
                      <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700">
                        {link.icon}
                        <span className="ml-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                          {link.label}
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Submenu */}
                  {link.subMenu &&  (
                    <motion.div className="ml-8 flex flex-col gap-1 mt-1"
                    layout
                    initial={{ opacity: 0, height: expandedMenus[link.label]?'auto':0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    hidden={expandedMenus[link.label]}
                
                    >
                      {link.subMenu.map((subLink, subIdx) => (
                        <SidebarLink
                          key={`submenu_${idx}_${subIdx}`}
                          link={{
                            label: subLink.label,
                            href: subLink.href,
                            icon: <IconUserBolt className="text-neutral-500 dark:text-neutral-400 h-4 w-4 flex-shrink-0" />,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        <h3 className="text-orange-500">{user?.username|| "no user name"}</h3>
        </SidebarBody>
        
      </Sidebar>
    </div>
  );
}
