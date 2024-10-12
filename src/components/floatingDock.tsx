import { Icon12Hours, IconAccessible, IconActivity, IconHome } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import style from './styles/floatingDock.module.css'
import { useReactFlow } from "@xyflow/react";


const menuItems = [
    {title:"Generic Template", icon:(<IconHome />), type:"genericTemplate"},
    {title:"Button Template", icon:(<IconAccessible />), type:"buttonTemplate"},
    {title:"Quick Reply", icon:(<Icon12Hours />), type:"quickReply"},
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