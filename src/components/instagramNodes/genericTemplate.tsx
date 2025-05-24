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
import commonStyle from "./styles/common.module.css"
import { GenericTemplateData } from "./Interface/NodesInterface";

import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";
import { ActionButtonList } from "../ui/genericTemplateUtils/actionButtonList";
import { DragHereComp } from "./commonComp";

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
  const validURL = (str?: string) : boolean => {
    if(!str) return false
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  return (
    <div
      className={`${style.container} ${
        type == "buttonTemplate" ? "buttonTemplateContainer" : ""
      }`}
    >
     <DragHereComp hidden={pinvisible} nodeId={id}/>
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
              // src="/MainAfter.png"
              src={( data.image_url && validURL(data.image_url))?data.image_url:"/MainAfter.png" }
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
              onError={(e) => {
                e.currentTarget.src = "/MainAfter.png"; // Path to your error image
                e.currentTarget.alt = "Error loading image";
              }}
            />
        ></PinContainer>
      )}

      {/* content box */}
      <div
        className={` ${type == "buttonTemplate" ? "rounded-t-2xl" : ""} ${
          style.contentContainer
        } bg-grey-200 dark:bg-slate-800`}
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
              className="text-sm w-2/3 h-8 text-ellipsis font-semibold bg-transparent mt-2"
            />
          )}
        </div>
        {/* END - Title and sub-heading box  */}
        {/* Buttons Container with Add button buttons */}
        <ActionButtonList data={data} key={`abl_gt_${id}`} nodeId={id} type={type}/>
      </div>

      <Handle position={Position.Left} type="target" className={commonStyle.targetHandle} 
      key={`nt_gt_${id}`}
      id={`nt_gt_${id}`}
      />
    </div>
  );
};

export default GenericTemplateNode;
