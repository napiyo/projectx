import { checkMsgTypes } from "@/components/instagramNodes/Interface/NodesInterface";
import { Handle, Position } from "@xyflow/react";
import { motion} from "framer-motion"
import { TrashIcon } from "lucide-react";
export function CheckMsgButton({id,val,removeBtn,classname}:{id:string,val:checkMsgTypes['msgType'], removeBtn:(val:checkMsgTypes['msgType'])=>void,classname:string}){
   return <motion.div 
            key={id+''+val}
            layoutId={val}
            initial={{ opacity: 0, x: '-30%' }}  // Initial animation state (fade and slide up)
            animate={{ opacity: 1, x: 0 }}    // Animate to visible and normal position
            exit={{ opacity: 0, scale:0.2 }} // Exit animation (optional, for deletion)
            transition={{ duration: 0.2 }} 
            
            >
             <button className="group w-full h-11 bg-white relative inline-flex items-center font-semibold justify-center  p-4 px-6 py-3 text-base ease-out rounded-md cursor-grab"
               
               
                >
                  <span className="absolute left-2 flex items-center">
                    <TrashIcon
                      className="hidden group-hover:block text-red-500 cursor-pointer"
                      onClick={()=>removeBtn(val)}
                    />
                  </span>
                  <span className="flex h-full w-full justify-center">
                    {val}
                  </span>
                {/* Add Handle inside the button wrapper */}
              <Handle
            type="source"
            id={`b_cm_${id}-${val}`}
            key={`b_cm_${id}-${val}`}
            position={Position.Right}
            className={classname}
            />
            </button>
            </motion.div>
}