"use client";
import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import style from "./styles/genericTemplate.module.css";
import { IconAdCircle, IconPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TrashIcon } from "lucide-react";
import { AnimatePresence, DragControls, motion, Reorder, useDragControls } from "framer-motion";
import { Button,GenericTemplateData } from "./Interface/genericTEmplateInterface";
import ActionButton from "../ui/genericTemplateUtils/actionButtons";

// Genric Template Node
const GenericTemplateNode = () => {
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
  const [idbutton, setIdbutton] = useState<number>(66);
  // Function to add a button
  const addButton = () => {
    const newButton: Button = {
      type: "postback",
      id: idbutton,
      title: `Button ${buttons.length + 1}`,
      payload: `payload_${buttons.length + 1}`,
    };
    setIdbutton(idbutton + 1);
    setButtons([...buttons, newButton]);
  };
  
  // Function to remove a button
  const removeButton = (idToRemove: number) => {
    setButtons(buttons.filter((button, index) => button.id !== idToRemove));
  };

  
  return (
    <div className={style.container}>
      <Image
        src="/imgPlaceholder.png"
        alt="image placeholder"
        width={100}
        height={100}
        layout="responsive"
        className="node-dragable-from-this-div"
      />
      {/* content box */}
      <div className={style.contentContainer}>
        {/* Title and sub-heading box  */}
        <div className="flex flex-col gap-0">
          <Input
            id="title"
            placeholder="Title"
            value={data?.title || ""}
            onChange={(e) =>
              e.target.value.length <= 80 &&
              setData((d) => ({ ...d, title: e.target.value.trimStart() }))
            }
            className="text-xl text-ellipsis font-semibold px-1 bg-transparent m-0 p-0"
          />
          <Input
            id="subtitle"
            placeholder="subtitle"
            value={data?.subtitle || ""}
            onChange={(e) =>
              e.target.value.length <= 80 &&
              setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
            }
            className="text-sm w-2/3 h-8 text-ellipsis px-1 text-gray-500 font-semibold bg-transparent"
          />
        </div>
        {/* END - Title and sub-heading box  */}
        {/* Buttons Container with Add button buttons */}
        <Reorder.Group
          axis="y"
          values={buttons}
          onReorder={(newButtons) => setButtons(newButtons)} // This will handle reordering
          className={style.buttonsContainer}
          transition={{duration:5}}
        >
          {buttons.map((button, index) => (<ActionButton key={button.id} button={button} removeButton={removeButton}/>))}
        </Reorder.Group>

        <button onClick={() => addButton()}>Add me</button>
        {/* END - Buttons Container with Add button buttons */}
      </div>

      <Handle position={Position.Left} type="target" />
    </div>
  );
};

export default GenericTemplateNode;
