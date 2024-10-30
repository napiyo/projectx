import { TagsInput } from "react-tag-input-component";
import { DragHereComp } from "./commonComp";
import { useState } from "react";
import style from "./styles/checkMsg.module.css"
import commonStyle from "./styles/common.module.css"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { checkMsgData } from "./Interface/NodesInterface";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ActionButton from "../ui/genericTemplateUtils/actionButtons";


export function CheckMsg({id,data}:{id:string,data:checkMsgData}){
    const [keywords, setkeywords] = useState<string[]>([])
    const { updateNodeData } = useReactFlow();
// console.log(data.msgType);

    return (<div className="w-[275px]">
 <DragHereComp  nodeId={id}/>
 <div className="bg-blue-200 rounded-lg p-2 flex flex-col gap-2">
    <h3 className="text-sm font-semibold">Check if last Message :</h3>
    <Select
          // defaultValue={data.msgType}
          value={data.msgType}
          onValueChange={(val) => updateNodeData(id, { msgType: val })}
        >
          <SelectTrigger className="w-full bg-inherit bg-white" >
            <SelectValue placeholder="If Message" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contains">Contains keywords</SelectItem>
            <SelectItem value="exact">is Exactly Equals</SelectItem>
            <SelectItem value="isEmail">is an Email</SelectItem>
            <SelectItem value="isNumber">is a Number</SelectItem>
            <SelectItem value="isPhoneNumber">is a Phone Number</SelectItem>
            <SelectItem value="isLink">is a Link</SelectItem>
          </SelectContent>
        </Select>
        {
            (data.msgType == "contains" || data.msgType == "exact") &&
<p className="text-xs"><span className="font-semibold">Note: </span>{data.msgType=="exact"?"Message is":"Keywords are"} case insensitive</p>
        }
{
data.msgType == "contains" &&
    <TagsInput
    value={keywords}
    onChange={setkeywords}
    name="keywords"
    placeHolder="Enter Keywords"
    classNames={{tag:style.keywordsInputTag,input:style.keywordsInput}}
    separators = {[" ","Enter"]}
    
    />
}
{
    data.msgType == "exact" && 
    <Input placeholder="Enter your exact message" 
    className="bg-white"
    spellCheck={false}/>
}
{
            (data.msgType == "contains" )&&

<p className="text-xs">Enter "Space" or "Enter" key to add keyword</p>
}
<button className="p-2 bg-black w-full rounded-md text-white font-semibold relative" >Else
  <Handle type="source" id={`src_else${id}`}  position={Position.Right} className={commonStyle.sourceHandle} />
</button>
<Handle type="target" id={`trgt_${id}`} position={Position.Left} className={commonStyle.targetHandle}/>
<Handle type="source" id={`src_if${id}`} position={Position.Right} className={commonStyle.sourceHandle}/>
 </div>
    </div>)
}