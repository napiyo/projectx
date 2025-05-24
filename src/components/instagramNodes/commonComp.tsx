import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import { getConnectedEdges, useReactFlow } from "@xyflow/react";

export function DragHereComp({ hidden,nodeId,notDeleteAble }: { hidden?: boolean,nodeId:string,notDeleteAble?:boolean }) {
  const { deleteElements,getEdges} = useReactFlow();
 const deleteItem = ()=>{
  // check if checkMsg node is connected, and has no other connected node, then delete that also
  let deleteNodes = [{ id: nodeId }]; 
  
  const edgs = getEdges();
    edgs.forEach((val)=>{
          if(val.source == nodeId)
          {
            if(val.data && val.data.fromElse)
            {
              // target node is checkMsg
              // check checkMsg only one edge
              let edgestoSourceOfCheckMsgCount  = 0;
              edgs.forEach((v)=>{
                if(v.target == val.target){
                  edgestoSourceOfCheckMsgCount++;
                }
              })
              if(edgestoSourceOfCheckMsgCount ==1)
              {
                // delete this check msg node also, as no other node is connected to it from source
                deleteNodes.push({id:val.target})
              }
            }
          }
    })
   

  deleteElements({ nodes: deleteNodes })
 }

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
     {!notDeleteAble && <div className="bg-black cursor-pointer absolute right-3 bottom-0 p-1 rounded-t-sm border-white border-2 border-b-0"
      onClick={deleteItem}><IconTrash  className="text-red-600  "/></div>}
    </div>
  );
}
