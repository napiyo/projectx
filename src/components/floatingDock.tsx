import { Icon12Hours, IconActivity, IconHome } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import style from './styles/floatingDock.module.css'
import { useReactFlow } from "@xyflow/react";


const menuItems = [
    {title:"Home", icon:(<IconHome />), type:"home"},
    {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    {title:"Home", icon:(<Icon12Hours />), type:"buttonTemplateNode"},
    {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    {title:"Report", icon:<IconActivity/> , type:"report"},
]


export default function FloatingDockFlowBuilder()
{       
   return <FloatingDock items={menuItems} desktopClassName={style.container} mobileClassName={style.container}/>
}