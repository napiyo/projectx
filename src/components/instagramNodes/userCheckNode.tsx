import { Handle, Position } from "@xyflow/react"
import commonStyle from "./styles/common.module.css"
import style from "./styles/userCheck.module.css"
import { DragHereComp } from "./commonComp"
import ActionButton from "../ui/genericTemplateUtils/actionButtons"
import { AnimatePresence } from "framer-motion"

export function UserCheckNode({id}:{id:string}){
    const data = []
    return   <AnimatePresence mode="sync" key={`checkusernode+${id}`}>

    <div className={style.MainContainer}>
        <DragHereComp nodeId={id} />
        <div className="bg-white p-5 w-full rounded-md flex-col gap-5">
              <h3>Check if user</h3>
        </div>
            </div>
    </AnimatePresence>
}

