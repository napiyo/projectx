'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';
import GenericTemplateNode from '@/components/instagramNodes/genericTemplate';

import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type NodeTypes,
  type DefaultEdgeOptions,
  type ReactFlowInstance,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import { GenericTemplateData } from '@/components/instagramNodes/Interface/NodesInterface';
import { FloatingDock } from '@/components/ui/floating-dock';
import { HomeIcon } from 'lucide-react';
import FloatingDockFlowBuilder from '@/components/floatingDock';
import { QuickReply } from '@/components/instagramNodes/quickReply';
import CustomEdge from '@/components/instagramNodes/edges/customEdge';
import { StartNode } from '@/components/instagramNodes/startNode';
import { MessageNode } from '@/components/instagramNodes/messageNode';
import { CheckMsg } from '@/components/instagramNodes/checkMsg';
import { QuickActionOnFlowBuilder } from '@/components/ui/quickActionOnFlowBuilder';
import { SelectViewport } from '@radix-ui/react-select';


const nodeTypes = {
  genericTemplate: GenericTemplateNode,
    buttonTemplate: GenericTemplateNode,
    quickReply:QuickReply,
    startNode:StartNode,
    messageNode:MessageNode,
    checkMsgNode:CheckMsg
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes: Node[] = [{id:'startNode',data:{label:"start"},type:"startNode",position:{x:300,y:300},draggable:true}];
 
const initialEdges: Edge[] = [];

const flowKey:string = 'flow-unpublished';
export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
  // Function to add a new node

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection }, eds)),
    [setEdges],
  );

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storedFlow = localStorage.getItem(flowKey);
      if(!storedFlow){
        return
      }
      const flow = JSON.parse(storedFlow);

      if (flow) {
        setNodes(flow.nodes || initialNodes);
        setEdges(flow.edges || initialEdges);
      }
    };

    restoreFlow();
  }, [setNodes]);

  return (
    <div className="h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setRfInstance}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode='dark'
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: "customEdge" }}
      >
        <QuickActionOnFlowBuilder onSave={onSave} onRestore={onRestore}/>
        <FloatingDockFlowBuilder />
        <Background />
        <Controls />
        <MiniMap />
        
      </ReactFlow>
    </div>
  );
}