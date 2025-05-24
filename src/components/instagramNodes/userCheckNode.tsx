import { TagsInput } from "react-tag-input-component";
import { DragHereComp } from "./commonComp";
import { useState } from "react";
import style from "./styles/checkMsg.module.css";
import commonStyle from "./styles/common.module.css";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkMsgData, checkMsgTypes } from "./Interface/NodesInterface";
import { Handle, Position, useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ActionButton from "../ui/genericTemplateUtils/actionButtons";
import { IconTrashFilled } from "@tabler/icons-react";
import { TrashIcon } from "lucide-react";
import {AnimatePresence, motion} from "framer-motion"
import { CheckMsgButton } from "../ui/checkMsgUtils/button";

export function UserCheckNode({ id, data }: { id: string; data: checkMsgData }) {
  const { updateNodeData } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const [currMsgType, setcurrMsgType] = useState<checkMsgTypes['msgType']>('isEmail');
  const [keywords, setkeywords] = useState<string[]>(data.keywords || []);
  const [exactPhrase, setexactPhrase] = useState<string>(data.exactMatch || '');

  const addBtn = ()=>{
    let btns = data.checkConditions;
  if(btns.includes(currMsgType)) return;
  btns.push(currMsgType);
  if(currMsgType=='contains'){
    if(keywords.length == 0) return
    updateNodeData(id,{checkConditions:btns,keywords:keywords});
  }
  else if(currMsgType=='exact'){
      if(exactPhrase.length == 0) return
      updateNodeData(id,{checkConditions:btns,exactMatch:exactPhrase});
    }
  else{

    updateNodeData(id,{checkConditions:btns});
  }
            // setcurrMsgType()
            setTimeout(() => {
              updateNodeInternals(id)
            }, 500);
            setcurrMsgType('isEmail')
  }
  const removeBtn = async(val:checkMsgTypes['msgType'])=>{
    // await sleep(200) // let animation finish
      let btns = data.checkConditions.filter(v=>v != val);
      if(val=='contains'){

        updateNodeData(id,{checkConditions:btns,keywords:[]})
        setkeywords([])
      }
      else if(val=='exact'){
        setexactPhrase('')
        updateNodeData(id,{checkConditions:btns,exactMatch:''})
      }
      else{
        
        updateNodeData(id,{checkConditions:btns})
      }
  }

  return (
      <AnimatePresence mode="sync" key={`checkmsganimatelist+${id}`}>
    <div className="w-[275px]">
      <DragHereComp nodeId={id} notDeleteAble/>
      <div className="bg-blue-200 rounded-lg p-2 flex flex-col gap-2">
        <div className="dark:bg-slate-800 bg-gray-200 p-2 rounded-sm">

        <h3 className="text-sm font-semibold">Check if last Message</h3>
        <Select
          // defaultValue={data.msgType}
          value={currMsgType}
          
          // onValueChange={(val) => updateNodeData(id, { msgType: val })}
          onValueChange={(val:checkMsgTypes['msgType'])=>setcurrMsgType(val)}
        >
          <SelectTrigger className="w-full bg-inherit">
            <SelectValue placeholder="If Message" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contains" disabled={data.checkConditions.includes('contains')}>Contains keywords</SelectItem>
            <SelectItem value="exact" disabled={data.checkConditions.includes('exact')}>is Exactly Equals</SelectItem>
            <SelectItem value="isEmail" disabled={data.checkConditions.includes('isEmail')}>is an Email</SelectItem>
            <SelectItem value="isNumber" disabled={data.checkConditions.includes('isNumber')}>is a Number</SelectItem>
            <SelectItem value="isPhoneNumber" disabled={data.checkConditions.includes('isPhoneNumber')}>is a Phone Number</SelectItem>
            <SelectItem value="isLink" disabled={data.checkConditions.includes('isLink')}>is a Link</SelectItem>
          </SelectContent>
        </Select>
        {(currMsgType == "contains" || currMsgType == "exact") && (
          <p className="text-xs">
            <span className="font-semibold">Note: </span>
            {currMsgType == "exact" ? "Message is" : "Keywords are"} case
            insensitive
          </p>
        )}
        {currMsgType == "contains" && (
          <TagsInput
          value={keywords}
          onChange={setkeywords}
          name="keywords"
          placeHolder="Enter Keywords"
          // onExisting = {}
          classNames={{
            tag: style.keywordsInputTag,
            input: style.keywordsInput,
          }}
          separators={[" ", "Enter"]}
          />
        )}
        {currMsgType == "exact" && (
          <Input
          placeholder="Enter your exact message"
          className="bg-white"
          spellCheck={false}
          value={exactPhrase}
          onChange={(e)=> e.target.value.trimStart().length < 250 && setexactPhrase(e.target.value.trimStart())}
          />
        )}
        {currMsgType == "contains" && ( <p className="text-xs"> {(data.keywords.length<6)?"Enter Space/Enter key to add keyword":"you reached max 5 keywords"}</p>
        )
        }
         <button className="p-2 w-full rounded-md text-black font-semibold relative disabled:text-gray-400 disabled:cursor-not-allowed"
         onClick={addBtn}
         disabled = {data.checkConditions.includes(currMsgType)}
         >Add Above Condition</button>
        </div>

        {
         
          data.checkConditions.map((val, index) => {
            let ele = (
              <CheckMsgButton
                key={`${val}+checkMsgBTn`}
                classname={commonStyle.sourceHandleBtn}
                id={id}
                removeBtn={removeBtn}
                val={val}
              />
            );
        
            if (val === 'contains') {
              ele = (
                <>
                  {ele}
                  <TagsInput
                    value={data.keywords}
                    name="keywords"
                    classNames={{
                      tag: style.keywordsInputTag,
                      input: style.keywordsInput,
                    }}
                    key='containInputPreview'
                    
                    disabled
                  />
                </>
              );
            } 
            else if (val === 'exact') {
              ele = (
                <>
                  {ele}
                  <Input
                    placeholder="Enter your exact message"
                    className="bg-white"
                    spellCheck={false}
                    value={data.exactMatch}
                    disabled
                    key={'exatctcheckmsgpreview'}
                  />
                </>
              );
            }
        
            return ele;
          })
        }
        <button className="p-2 bg-black w-full rounded-md text-white font-semibold relative">
          Else
          <Handle
            type="source"
            id={`b_else${id}`}
            key={`b_else${id}`}
            position={Position.Right}
            className={commonStyle.sourceHandleBtn}
          />
        </button>
        <Handle
          type="target"
          id={`nt_cm_${id}`}
          key={`nt_cm_${id}`}
          position={Position.Left}
          className={commonStyle.targetHandle}
          isConnectable={false}
          />
       
      </div>
    </div>
          </AnimatePresence>
  );
}
