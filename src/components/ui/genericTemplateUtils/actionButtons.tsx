import { Reorder, useDragControls, motion, px } from "framer-motion"
import { Button } from "@/components/instagramNodes/Interface/NodesInterface";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { TrashIcon } from "lucide-react";
import style from "@/components/instagramNodes/styles/genericTemplate.module.css"
import commonStyle from "@/components/instagramNodes/styles/common.module.css"


function ActionButton({ button,removeButton, nodeid  }:{button:Button,removeButton :(id:number)=>void,nodeid:string}) {
  const controls = useDragControls();
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <Reorder.Item
              key={`ab_${button.id}-${nodeid}`} // Use index or unique identifier as key
              value={button} // Required for Reorder.Item
              dragListener={false}
              dragControls={controls}
              onDragEnd={()=>{
                // let animation complete then update Handle position
                setTimeout(() => {
                  updateNodeInternals(nodeid);
                }, 800);
                
              }}
            >
              <motion.div className={style.buttonWrapper}
               key={button.id}
               initial={{ opacity: 0, x: '-30%' }}  // Initial animation state (fade and slide up)
               animate={{ opacity: 1, x: 0 }}    // Animate to visible and normal position
               exit={{ opacity: 0, scale:0.2 }} // Exit animation (optional, for deletion)
               transition={{ duration: 0.2 }} 
              >
                <button className="group w-full h-11 bg-slate-300 dark:bg-gray-800 relative inline-flex items-center font-semibold justify-center overflow-hidden p-4 px-6 py-3 text-base ease-out rounded-md cursor-grab"
                 onPointerDown={(e) => {
                  controls.start(e); // Start dragging
                  // setisReordering(true);

                }} 
                // onPointerUp={(e)=>setisReordering(false)}
                >
                  <span className="absolute left-2 flex items-center">
                    <TrashIcon
                      className="hidden group-hover:block text-red-500 cursor-pointer"
                      onClick={() => {
                        removeButton(button.id)
                      }}
                      onPointerDown={(e) => controls.start(e)}
                    />
                  </span>
                  <span className="flex h-full w-full justify-center">
                    {button.title}
                  </span>
                {/* Add Handle inside the button wrapper */}
                </button>
                {
                  button.type === "postback" && 
                  <Handle
                  type="source"
                  position={Position.Right} // This will add it to the right of the button
                  className={commonStyle.sourceHandleBtn}
                  id={`b_gt_${button.id}-${nodeid}`}
                  key={`b_gt_${button.id}-${nodeid}`} 
                  />
                }
              </motion.div>
            </Reorder.Item>
  )
}


export default ActionButton;