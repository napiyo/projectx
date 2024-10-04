import GenericTemplateNode from "@/components/instagramNodes/genericTemplate";
import { ReactFlowProvider } from "@xyflow/react";

export default function TemplateStringsArray(){
    return (<>
     <ReactFlowProvider>
    <GenericTemplateNode />
    </ReactFlowProvider>
        </>)
}