"use client";
import React, { useState } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import style from "./styles/genericTemplate.module.css";
import { IconAdCircle, IconPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TrashIcon } from "lucide-react";
import { AnimatePresence, DragControls, motion, Reorder, useDragControls } from "framer-motion";
import { Button,GenericTemplateData } from "./Interface/NodesInterface";
import ActionButton from "../ui/genericTemplateUtils/actionButtons";
import PopoverContentGenericTemplate from "../ui/genericTemplateUtils/popoverContentGenericTemplate";

// Genric Template Node
const GenericTemplateNode = ({type}:{type:string}) => {
console.log(type);

  // Buttons to show , type -> web_url or posback
  const [buttons, setButtons] = useState<Button[]>([
    // { id: 1, type: "web_url", title: "Shop Now" },
    // { id: 2, type: "web_url", title: "Remind me" },
  ]);
  // data for this template , title, image_url,array of buttons,
  const [data, setData] = useState<GenericTemplateData>({
    title: "",
    buttons: buttons,
  });
  const [idbutton, setIdbutton] = useState<number>(1);
  const [popOverOpened, setpopOverOpened] = useState(false);
  // Function to add a button
  const addButton = (btn:Button) => {
    setButtons([...buttons, ({...btn,id:idbutton})]);
    setIdbutton(idbutton + 1);
    setpopOverOpened(false);
  };
  
  // Function to remove a button
  const removeButton = (idToRemove: number) => {
    setButtons(buttons.filter((button, index) => button.id !== idToRemove));
  };

  
  return (
    <div className={`${style.container} ${type=="buttonTemplate"?"buttonTemplateContainer":""}`}>
      <div className="bg-black text-white font-semibold text-sm w-1/2 text-center rounded-tl-xl rounded-tr-xl border-2 border-b-0 border-white py-1 node-dragable-from-this-div items-center m-auto">Drag from here</div>
      { type=="genericTemplate"&&
      <Image
        src="/MainAfter.png"
        alt="image placeholder"
        width={100}
        height={100}
        layout="responsive"
        className="node-dragable-from-this-div rounded-t-2xl"
      />}
      
      {/* content box */}
      <div className={` ${type=="buttonTemplate"?"rounded-t-2xl":""} ${style.contentContainer}`}>
        {/* Title and sub-heading box  */}
        <div className={`flex flex-col gap-0 ${type=="buttonTemplate"?"":""}`} >
          <Input
            id="title"
            placeholder="Title"
            value={data?.title || ""}
            onChange={(e) =>
              e.target.value.length <= 80 &&
              setData((d) => ({ ...d, title: e.target.value.trimStart() }))
            }
            className={"text-xl text-ellipsis font-semibold bg-transparent "+(type=="buttonTemplate"?"node-dragable-from-this-div":"")}
          />
           { type=="genericTemplate" && 
          <Input
            id="subtitle"
            placeholder="subtitle"
            value={data?.subtitle || ""}
            onChange={(e) =>
              e.target.value.length <= 80 &&
              setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
            }
            className="text-sm w-2/3 h-8 text-ellipsis text-gray-500 font-semibold bg-transparent"
          />
}
        </div>
        {/* END - Title and sub-heading box  */}
        {/* Buttons Container with Add button buttons */}
        <Reorder.Group
          axis="y"
          values={buttons}
          onReorder={(newButtons) => setButtons(newButtons)} // This will handle reordering
          className={style.buttonsContainer}
        >
          <AnimatePresence mode="sync">

          {buttons.map((button, index) => (<ActionButton key={button.id} button={button} removeButton={removeButton}/>))}
          </AnimatePresence>
        </Reorder.Group>

        <Popover open={popOverOpened} onOpenChange={setpopOverOpened}>
    <PopoverTrigger >Add Button</PopoverTrigger>
            <PopoverContentGenericTemplate addButton={addButton}/>
    </Popover>
        {/* END - Buttons Container with Add button buttons */}
      </div>

      <Handle position={Position.Left} type="target" />
     

    </div>
  );
};

export default GenericTemplateNode;
