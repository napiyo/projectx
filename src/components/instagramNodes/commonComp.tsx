import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import { getConnectedEdges, useReactFlow } from "@xyflow/react";

export function DragHereComp({ hidden,nodeId,notDeleteAble }: { hidden?: boolean,nodeId:string,notDeleteAble?:boolean }) {
  const { deleteElements } = useReactFlow();
 

  return (
    <div className="relative flex w-full">
      <div
        className={cn(
          "node-dragable-from-this-div",
          "bg-black text-white font-semibold text-sm w-1/2 text-center rounded-tl-xl rounded-tr-xl border-2 border-b-0 opacity-100 border-white py-1 items-center m-auto transition-opacity duration-500",
          hidden ? "opacity-0" : ""
        )}
      >
        Drag from here
      </div>
     {!notDeleteAble && <div className="bg-white cursor-pointer absolute right-3 bottom-0 p-1 rounded-t-sm"
      onClick={()=>{
        deleteElements({ nodes: [{ id: nodeId }] });
      }}><IconTrash  className="text-red-600  "/></div>}
    </div>
  );
}
