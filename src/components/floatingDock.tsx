import { Icon12Hours, IconAccessible, IconActivity, IconHome, IconLayoutList, IconMailFast, IconMessage, IconMessageQuestion, IconPhotoScan } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import style from './styles/floatingDock.module.css'
import { useReactFlow } from "@xyflow/react";


const menuItems = [
    {title:"Generic Template", icon:(<IconPhotoScan />), type:"genericTemplate"},
    {title:"Button Template", icon:(<IconLayoutList />), type:"buttonTemplate"},
    {title:"Quick Reply", icon:(<IconMailFast />), type:"quickReply"},
    {title:"Message", icon:(<IconMessage />), type:"messageNode"},
    {title:"Check Last Message", icon:(<IconMessageQuestion />), type:"checkMsgNode"},
    // {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    // {title:"Home", icon:(<IconHome />), type:"genericTemplateNode"},
    // {title:"Report", icon:<IconActivity/> , type:"report"},
]


export default function FloatingDockFlowBuilder()
{       
   return <FloatingDock items={menuItems} desktopClassName={style.container} mobileClassName={style.container}/>
}