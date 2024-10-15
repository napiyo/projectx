import style from "./styles/messageNode.module.css";
import commonStyle from "./styles/common.module.css";
import { MessageNodeData, msgNodeMsgType } from "./Interface/NodesInterface";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragHereComp } from "./commonComp";
import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IconAlertCircle } from "@tabler/icons-react";

export function MessageNode({
  id,
  data,
}: {
  id: string;
  data: MessageNodeData;
}) {
  const { updateNodeData } = useReactFlow();

  return (
    <div className={cn(style.msgContainerNode)}>
      <DragHereComp nodeId={id}/>
      <div className={cn(style.contentBox, "rounded-xl p-2")}>
        <Select
          defaultValue={data.msgType}
          value={data.msgType}
          onValueChange={(val) => updateNodeData(id, { msgType: val })}
        >
          <SelectTrigger className="w-full bg-inherit">
            <SelectValue placeholder="Choose Message Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="sticker">Sticker</SelectItem>
            <SelectItem value="post">Instagram Post</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-2 mb-1 text-sm">
        { data.msgType == "text"?"Your Message":`Link for ${data.msgType}`
        }
        </div>
        {
          data.msgType=="post" && <div className="bg-blue-200 py-1 px-1 mb-1 rounded-md text-xs flex items-center gap-1 ">
            <IconAlertCircle /> Post must owned by you
            </div>
        }
        {
            data.msgType == "text"?<Textarea value={data.msg} onChange={(e)=> e.target.value.trimStart().length < 1000 && updateNodeData(id,{msg:e.target.value.trimStart()})}
            className="bg-inherit"
            spellCheck={false}
            placeholder="Enter Your Message"/>
            :<Input placeholder= {data.msgType == "post"?"ex: instagram.com/p/postid":"ex: www.google.drive.com/your-imag.png"}
            className="border"/>
        }
<Handle key={"msgNodeTrg"+id} type="target" position={Position.Left} className={commonStyle.targetHandle}/>      
<Handle key={"msgNodeSrc"+id} type="source" position={Position.Right} className={commonStyle.sourceHandle}/>      
      </div>
      
    </div>
  );
}
