import { Handle, Position } from "@xyflow/react"
import style from "./styles/startNode.module.css"
import commonStyle from "./styles/common.module.css"

export function StartNode(){
    return (<div className="bg-white w-28 p-2 rounded-lg text-center">
        START
        <Handle type="source" position={Position.Right} key="startNodeHandle"
        className={commonStyle.sourceHandle}
        />
    </div>)
}