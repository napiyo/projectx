import { IconActivity, IconHome } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import style from './styles/floatingDock.module.css'
const menuItems = [
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Home", icon:(<IconHome />), href:"/home"},
    {title:"Report", icon:(<IconActivity />), href:"/report"},]
export default function FloatingDockDash()
{
   return <FloatingDock items={menuItems} desktopClassName={style.container} mobileClassName={style.container}/>
}