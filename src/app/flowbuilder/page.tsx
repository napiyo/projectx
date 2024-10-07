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
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import { GenericTemplateData } from '@/components/instagramNodes/Interface/NodesInterface';
import { FloatingDock } from '@/components/ui/floating-dock';
import { HomeIcon } from 'lucide-react';
import FloatingDockFlowBuilder from '@/components/floatingDock';

const nodeTypes = {
  genericTemplate: GenericTemplateNode,
    buttonTemplate: GenericTemplateNode
};


const initialNodes: Node[] = [];
 
const initialEdges: Edge[] = [];


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
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

 
  // const nodeTypes = useMemo(() => ({
    
    
  //   }), []);

  // items: { title: string; icon: React.ReactNode; href: string }[];
  return (
    <div className="h-screen">

      {/* <button 
        onClick={addNode} 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded absolute top-0 left-0 z-10">
        Add Generic Template Node
      </button> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode='dark'
      >
        <FloatingDockFlowBuilder />
        <Background />
        <Controls />
        <MiniMap />
        
      </ReactFlow>
    </div>
  );
}