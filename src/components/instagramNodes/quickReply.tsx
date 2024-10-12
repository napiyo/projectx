import { cn } from "@/lib/utils";
import { ActionButtonList } from "../ui/genericTemplateUtils/actionButtonList";
import { GenericTemplateData } from "./Interface/NodesInterface";
import style from "./styles/quickReply.module.css"
import { Input } from "../ui/input";
import { IconCamera, IconImageInPicture, IconPhoto, IconSticker2 } from "@tabler/icons-react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { motion } from "framer-motion";
export function QuickReply({id,data,type}:{id:string,data: GenericTemplateData,type:string})
{
    const { updateNodeData } = useReactFlow();

    const [showPreview, setshowPreview] = useState(false) // mistake, this is actually hiderPreview

    return (
    <div className={style.MainContainer}>
        <div className={`${style.previewContent} node-dragable-from-this-div transition-all ${showPreview?"translate-y-full opacity-0 -z-50":""}`}>
            <div className="text-end py-2 px-4 bg-blue-500 w-fit max-w-52 text-ellipsis break-all rounded-2xl overflow-hidden text-xs transition-all"> {data.subtitle || "Your Message"}</div>
            <div className="flex w-full overflow-hidden gap-2 text-xs">
                {
                    data.buttons.length != 0? data.buttons.map((btn,index)=>(
                        <div className={style.quickPreviewBtn}>{btn.title}</div>
                    )):<>
               <div className={style.quickPreviewBtn}>Quick reply 1</div>
               <div className={style.quickPreviewBtn}>Quick reply 2</div>
               <div className={style.quickPreviewBtn}>Quick reply 3</div>
                    </>
                }
            </div>
            <div className="flex justify-center items-center w-full gap-x-1 bg-gray-600 pr-3 rounded-full py-1 pl-1 text-sm">
                <div className="bg-blue-500 p-1 rounded-full">
                    <IconCamera />
                    </div>
                    <div className="flex-1">Message...</div>
                    <IconPhoto />
                    <IconSticker2 />
            </div>
        </div>
        <div className={`w-px bg-blue-600  flex justify-center relative transition-all ${showPreview?"items-start h-10":"items-center h-20"}`}>
            <div className={`absolute border-blue-600 border-r-2 border-t-2 w-3 h-3 top-0 -rotate-45 transition-all ${showPreview?"opacity-0":""}`}></div>
            <div className="text-white bg-inherit px-4 rounded-sm text-sm cursor-pointer text-nowrap transition-all ease-in-out" 
            onClick={()=> setshowPreview((p)=>!p)}> {showPreview?"Show":"Hide"} Preview</div>
        </div>
        
<div className={cn("node-dragable-from-this-div","bg-black text-white font-semibold text-sm w-1/2 text-center rounded-tl-xl rounded-tr-xl border-2 border-b-0 opacity-100 border-white py-1 items-center m-auto transition-opacity duration-500")}>
        Drag from here
      </div>
      <div className={style.contentBox}>
        <Input placeholder="Enter Your Message"
        value={data?.subtitle || ""}
        onChange={(e) =>
          e.target.value.trimStart().length <= 400 &&
          // setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
          updateNodeData(id, { subtitle: e.target.value.trimStart() })
        }
        />
        <ActionButtonList data={data} nodeId={id} key={'actionList_'+id} type={type}/>
        <Handle key={'hand'+id} position={Position.Left} type="target"/>
      </div>
    </div>
    );
}