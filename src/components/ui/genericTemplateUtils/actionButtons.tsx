import { Reorder, useDragControls } from "framer-motion"
import { Button } from "@/components/instagramNodes/Interface/genericTEmplateInterface";
import { Handle, Position } from "@xyflow/react";
import { TrashIcon } from "lucide-react";
import style from "@/components/instagramNodes/styles/genericTemplate.module.css"


function ButtonItem({ button,removeButton  }:{button:Button,removeButton :(id:number)=>void}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
              key={button.id} // Use index or unique identifier as key
              value={button} // Required for Reorder.Item
              dragListener={false}
              dragControls={controls}
            >
              <div className={style.buttonWrapper}>
                <button className="group w-full h-11 bg-white relative inline-flex items-center font-semibold justify-center overflow-hidden p-4 px-6 py-3 text-base transition duration-300 ease-out rounded-md"
                //  onPointerDown={(e) => {
                //   controls.start(e); // Start dragging
                // }} 
                >
                  <span className="absolute left-2 flex items-center">
                    <TrashIcon
                      className="hidden group-hover:block text-red-500"
                      onClick={(e) => {
                        // e.stopPropagation();
                        // removeButton(button.id)

                      }}
                      onPointerDown={(e) => controls.start(e)}
                    />
                  </span>
                  <span className="flex h-full w-full justify-center">
                    {button.id}
                  </span>
                {/* Add Handle inside the button wrapper */}
                </button>
                <Handle
                  type="source"
                  position={Position.Right} // This will add it to the right of the button
                  className={style.handleRight}
                  id={`handle-${button.id}`} // Add custom class for styling
                />
              </div>
            </Reorder.Item>
  )
}


export default ButtonItem;