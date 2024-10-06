'use client'

import { useCallback, useMemo, useState } from 'react';
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

const nodeTypes = {
  genericTemplate: GenericTemplateNode,
};


const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];
 
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];


export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
  // Function to add a new node
  const addNode = () => {
    const newNode = {
      id: (nodes?.length + 1).toString(),
      type: nodes.length%2==0?'genericTemplate':'buttonTemplate',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: 'generic' },
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
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
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