"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Handle,
  NodeProps,
  Position,
  useUpdateNodeInternals,
  Node,
  useReactFlow,
} from "@xyflow/react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import style from "./styles/genericTemplate.module.css";
import { IconAdCircle, IconPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TrashIcon } from "lucide-react";
import {
  AnimatePresence,
  DragControls,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";
import { Button, GenericTemplateData } from "./Interface/NodesInterface";
import ActionButton from "../ui/genericTemplateUtils/actionButtons";
import PopoverContentGenericTemplate from "../ui/genericTemplateUtils/popoverContentGenericTemplate";
import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";

const GenericTemplateNode = ({
  type,
  id,
  data,
}: {
  type: string;
  id: string;
  data: GenericTemplateData;
}) => {
  return (
    <>
      <GenericTemplateGeneralNode {...{ type, id, data }} />
    </>
  );
};
// Genric Template Node
const GenericTemplateGeneralNode = ({
  type,
  id,
  data,
}: {
  type: string;
  id: string;
  data: GenericTemplateData;
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [idbutton, setIdbutton] = useState<number>(1);
  const [popOverOpened, setpopOverOpened] = useState(false);
  // hide drag from here in case of 3d pin is visible
  const [pinvisible, setpinvisible] = useState(false)
  // Function to add a button
  const addButton = (btn: Button) => {
    const newBtns = [...data.buttons, { ...btn, id: idbutton }];
    updateButtons(newBtns);
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
    const bts = data.buttons.filter(
      (button, index) => button.id !== idToRemove
    );
    updateButtons(bts);
    // wait for exit animation to complete
    setTimeout(() => {
      updateNodeInternals(id);
    }, 400);
  };
  const { updateNodeData } = useReactFlow();

  // Function to update buttons
  const updateButtons = useCallback(
    (buttons: Button[]) => {
      updateNodeData(id, { buttons });
    },
    [id]
  );

  return (
    <div
      className={`${style.container} ${
        type == "buttonTemplate" ? "buttonTemplateContainer" : ""
      }`}
    >
      <div className={cn("node-dragable-from-this-div","bg-black text-white font-semibold text-sm w-1/2 text-center rounded-tl-xl rounded-tr-xl border-2 border-b-0 opacity-100 border-white py-1 items-center m-auto transition-opacity duration-500",
        pinvisible?'opacity-0':''
      )}>
        Drag from here
      </div>
      {type == "genericTemplate" && (
        <PinContainer
          title=<Input 
          className="w-full focus-visible:ring-0 focus-visible:ring-ring-0"
          style={{zIndex:700}}
          value={data.image_url || ''}
          placeholder="Enter Image URL"
          onChange={(e)=>{
            pinvisible && updateNodeData(id, { image_url: e.target.value.trimStart() })
          }}
          
          />
          // containerClassName="w-full h-48"
          className="w-full h-48"
          containerClassName="node-dragable-from-this-div cursor-grab"
          setpinvisible={setpinvisible}
          children=
            <Image
              src="/MainAfter.png"
              // src={`url(${data.image_url || "/MainAfter.png"})` }
              // src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png"
              alt="Check Image URL, hover me"
              // width={275}
              // height={100}
              // objectFit="cover"
              // layout="fill"
              // sizes=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              quality={10}
              className="rounded-t-2xl object-cover"
              style={{zIndex:"555"}}
              fill={true}
            />
        ></PinContainer>
      )}

      {/* content box */}
      <div
        className={` ${type == "buttonTemplate" ? "rounded-t-2xl" : ""} ${
          style.contentContainer
        }`}
      >
        {/* Title and sub-heading box  */}
        <div
          className={`flex flex-col gap-0 ${
            type == "buttonTemplate" ? "" : ""
          }`}
        >
          <Input
            id="title"
            placeholder="Title"
            value={data?.title || ""}
            onChange={(e) =>
              e.target.value.trimStart().length <= 80 &&
              // setData((d) => ({ ...d, title: e.target.value.trimStart() }))
              updateNodeData(id, { title: e.target.value.trimStart() })
            }
            className={
              "text-xl text-ellipsis font-semibold bg-transparent " +
              (type == "buttonTemplate" ? "node-dragable-from-this-div" : "")
            }
          />
          {type == "genericTemplate" && (
            <Input
              id="subtitle"
              placeholder="subtitle"
              value={data?.subtitle || ""}
              onChange={(e) =>
                e.target.value.length <= 80 &&
                // setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
                updateNodeData(id, { subtitle: e.target.value.trimStart() })
              }
              className="text-sm w-2/3 h-8 text-ellipsis text-gray-500 font-semibold bg-transparent"
            />
          )}
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
            {data.buttons.map((button, index) => (
              <ActionButton
                key={button.id}
                button={button}
                removeButton={removeButton}
                nodeid={id}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>

        <Popover open={popOverOpened} onOpenChange={setpopOverOpened}>
          <PopoverTrigger>Add Button</PopoverTrigger>
          <PopoverContentGenericTemplate addButton={addButton} />
        </Popover>
        {/* END - Buttons Container with Add button buttons */}
      </div>

      <Handle position={Position.Left} type="target" />
    </div>
  );
};

export default GenericTemplateNode;
