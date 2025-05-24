import { Handle, Position } from "@xyflow/react"
import style from "./styles/startNode.module.css"
import commonStyle from "./styles/common.module.css"

export function StartNode(){
    return (<div className="dark:bg-slate-700 bg-gray-300 w-28 p-2 rounded-lg text-center">
        <p>START</p>
        <Handle type="source" position={Position.Right} key="n_startNodeHandle"
        className={commonStyle.sourceHandle}
        id="n_startNodeHandle"
        />
    </div>)
}