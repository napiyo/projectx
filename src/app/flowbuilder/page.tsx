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

const nodeTypes = {
  genericTemplate: GenericTemplateNode,
};


const initialNodes: Node[] = [];
 
const initialEdges: Edge[] = [];


export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
  // Function to add a new node
  const addNode = () => {
    const newNode = {
      id: (nodes?.length + 1).toString(),
      type: 'genericTemplate',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {setNodes, title:"new",buttons:[]},
      dragHandle: '.node-dragable-from-this-div',
    };
    setNodes((nds) => [...nds,newNode]);
  };

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

 
  const nodeTypes = useMemo(() => ({
    genericTemplate: GenericTemplateNode,
    buttonTemplate: GenericTemplateNode
    
    }), []);

  return (
    <div className="h-screen">

      <button 
        onClick={addNode} 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded absolute top-0 left-0 z-10">
        Add Generic Template Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode='dark'
      >
        <Background />
        <Controls />
        <MiniMap />
        
      </ReactFlow>
    </div>
  );
}