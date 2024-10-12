"use client";
import React, {
  useState,
} from "react";
import {
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import style from "./styles/genericTemplate.module.css";

import { GenericTemplateData } from "./Interface/NodesInterface";

import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";
import { ActionButtonList } from "../ui/genericTemplateUtils/actionButtonList";

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
  // hide drag from here in case of 3d pin is visible
  const [pinvisible, setpinvisible] = useState(false)
  const { updateNodeData } = useReactFlow();

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
          className="w-full focus-visible:ring-0 focus-visible:ring-ring-0 bg-transparent focus-visible:border-none"
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
                e.target.value.trimStart().length <= 80 &&
                // setData((d) => ({ ...d, subtitle: e.target.value.trimStart() }))
                updateNodeData(id, { subtitle: e.target.value.trimStart() })
              }
              className="text-sm w-2/3 h-8 text-ellipsis text-gray-500 font-semibold bg-transparent"
            />
          )}
        </div>
        {/* END - Title and sub-heading box  */}
        {/* Buttons Container with Add button buttons */}
        <ActionButtonList data={data} key={id} nodeId={id} type={type}/>
      </div>

      <Handle position={Position.Left} type="target" className={style.targetHandle} />
    </div>
  );
};

export default GenericTemplateNode;
