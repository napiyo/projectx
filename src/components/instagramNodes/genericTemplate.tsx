"use client";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Handle, NodeProps, Position, useUpdateNodeInternals ,Node, useReactFlow} from "@xyflow/react";
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
const GenericTemplateNode = ({type,id,data}:{type:string,id:string,data:GenericTemplateData}) => {
  const containerRef = useRef(null); // to restric draging limit, how far we can drag buttons
  const updateNodeInternals = useUpdateNodeInternals();
  const [idbutton, setIdbutton] = useState<number>(1);
  const [popOverOpened, setpopOverOpened] = useState(false);
  // Function to add a button
  const addButton = (btn:Button) => {
    const newBtns = [...data.buttons, ({...btn,id:idbutton})];
    updateButtons(newBtns)
    setIdbutton(idbutton + 1);
    setpopOverOpened(false);
    // wait for entry animation to complete
    setTimeout(() => {
      updateNodeInternals(id);
    }, 400);
  };
  
  // Function to remove a button
  const removeButton = (idToRemove: number) => {
    // setButtons(buttons.filter((button, index) => button.id !== idToRemove));
    const bts = data.buttons.filter((button, index) => button.id !== idToRemove);
    updateButtons(bts);
    // wait for exit animation to complete
    setTimeout(() => {
      updateNodeInternals(id);
    }, 400);
  };
  const { updateNodeData } = useReactFlow() 

  // Function to update buttons
  const updateButtons = useCallback((buttons: Button[]) => {
    updateNodeData(id, { buttons })
  }, [id]);


  
  return (
    <div className={`${style.container} ${type=="buttonTemplate"?"buttonTemplateContainer":""}`}>
      <div className="bg-black text-white font-semibold text-sm w-1/2 text-center rounded-tl-xl rounded-tr-xl border-2 border-b-0 border-white py-1 node-dragable-from-this-div items-center m-auto">Drag from here</div>
      { type=="genericTemplate"&&
      <Image
        // src="/MainAfter.png"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png"
        alt="image placeholder"
        width={100}
        height={100}
        layout="responsive"
        quality={10}
        className="node-dragable-from-this-div rounded-t-2xl hover:brightness-50"
        />
        }
      
      {/* content box */}
      <div className={` ${type=="buttonTemplate"?"rounded-t-2xl":""} ${style.contentContainer}`}>
        {/* Title and sub-heading box  */}
        <div className={`flex flex-col gap-0 ${type=="buttonTemplate"?"":""}`} >
          <Input
            id="title"
            placeholder="Title"
            value={data?.title || ""}
            onChange={(e) =>
              e.target.value.trimStart().length <= 80 &&
              // setData((d) => ({ ...d, title: e.target.value.trimStart() }))
              updateNodeData(id,{title:e.target.value.trimStart()})
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
              // setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
              updateNodeData(id,{subtitle:e.target.value.trimStart()})
            }
            className="text-sm w-2/3 h-8 text-ellipsis text-gray-500 font-semibold bg-transparent"
          />
}
        </div>
        {/* END - Title and sub-heading box  */}
        {/* Buttons Container with Add button buttons */}
        <Reorder.Group
          axis="y"
          values={data.buttons}
          onReorder={(newButtons) => updateButtons(newButtons)} // This will handle reordering
          className={style.buttonsContainer}
        >
        <AnimatePresence mode="sync">
          {data.buttons.map((button, index) => (<ActionButton key={button.id} button={button} removeButton={removeButton} nodeid= {id} />))}
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
