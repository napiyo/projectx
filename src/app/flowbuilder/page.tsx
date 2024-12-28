"use client";

import { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import GenericTemplateNode from "@/components/instagramNodes/genericTemplate";
import { motion } from "framer-motion";
import * as d3 from "d3-hierarchy";
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
  Panel,
} from "@xyflow/react";
import FloatingDockFlowBuilder from "@/components/floatingDock";
import { QuickReply } from "@/components/instagramNodes/quickReply";
import CustomEdge from "@/components/instagramNodes/edges/customEdge";
import { StartNode } from "@/components/instagramNodes/startNode";
import { MessageNode } from "@/components/instagramNodes/messageNode";
import { CheckMsg } from "@/components/instagramNodes/checkMsg";
import { QuickActionOnFlowBuilder } from "@/components/ui/quickActionOnFlowBuilder";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { UserCheckNode } from "@/components/instagramNodes/userCheckNode";

const nodeTypes = {
  genericTemplate: GenericTemplateNode,
  buttonTemplate: GenericTemplateNode,
  quickReply: QuickReply,
  startNode: StartNode,
  messageNode: MessageNode,
  checkMsgNode: CheckMsg,
  userCheckNode:UserCheckNode
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes: Node[] = [
  {
    id: "0",
    data: { label: "start" },
    type: "startNode",
    position: { x: 300, y: 300 },
    draggable: true,
  },
];

const initialEdges: Edge[] = [];

const flowKey: string = "flow-unpublished";
export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [modalData, setmodalData] = useState({
    open: false,
    title: "Opps",
    msg: "Action not allowed",
  });
  const maxConnectionsPerNode = 2;
  const maxNodes = 50;
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  // Function to add a new node

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => {
     if(nodes.length >= maxNodes){
      setmodalData({
        open: true,
        title: "Max Nodes limit Exceeds",
        msg: `You Reached max limit of nodes i.e ${maxNodes}`,
      });
      return;
     }
      
    //  const sourceNode = nodes.find((node) => node.id === connection.source);
      // Get all existing edges for the source node
      const existingEdgesFromSource = edges.filter(
        (edge) => edge.sourceHandle === connection.sourceHandle
      );
      const targetNode = nodes.find((node) => node.id === connection.target);
      if (existingEdgesFromSource.length >= maxConnectionsPerNode) {
        setmodalData({
          open: true,
          title: "Max Connection limit",
          msg: `A Single node can be connected to max ${maxConnectionsPerNode} other nodes, delete an edge to connect this`,
        });
        return;
      }
      let checkMsgNode : Node   = {
        id: `checkMsg_${nodes.length+1}_${Date.now()}`,
        type: "checkMsgNode",
        position: { x: Math.random() * 1000, y: Math.random() * 550 },
        data: { checkConditions: [], keywords: [], exactMatch: "" },
        dragHandle: ".node-dragable-from-this-div",
      };
      let checkMsgNodeExist = false;
      existingEdgesFromSource.push({...connection,id:'dummy'})
      existingEdgesFromSource.forEach((_edge)=>{
        // let _targetNode = nodes[(Number(_edge.target))];
        let _targetNode = nodes.find((val)=>val.id == _edge.target);
        if(!_targetNode) {
          console.error("Could not find target node with id",_edge.targetHandle);
          return
        }
        const edgesFromTarget = edges.filter(
          (edge) => edge.source === _targetNode.id
        );
        for(let i=0;i<edgesFromTarget.length;i++)
        {
          let ed = edgesFromTarget[i];
          let _trgNd = nodes.find((val)=>val.id == ed.target);
          if(!_trgNd) {
            console.error("Could not find target node with id",_edge.targetHandle);
            return
          }
          if(_trgNd.type=='checkMsgNode'){
            checkMsgNode = _trgNd;
            checkMsgNodeExist = true;
            break;
        }
      }
      })

     
      if(!checkMsgNodeExist){
            setNodes((nds) => [...nds, checkMsgNode]);
      }
      let edgeForCheckMsg:Edge = {id:'invalid',source:'-1',target:'-1'};
      switch (targetNode?.type) {
        case 'messageNode':
         edgeForCheckMsg = {
                    id: `checkMsgEdge-${connection.target}-${checkMsgNode.id}`,
                    source: connection.target,
                    target: checkMsgNode.id,
                    type: "customEdge",
                    data:{fromElse:true}
                  }
          break;
        case 'quickReply':
        case 'buttonTemplate':
        case 'genericTemplate':
          edgeForCheckMsg = {
            id: `checkMsgEdge-${connection.target}-${checkMsgNode.id}`,
            source: connection.target,
            target: checkMsgNode.id,
            sourceHandle:`b_else${targetNode.id}`,
            type: "customEdge",
            data:{fromElse:true}
          }
          break;
      
        default:
          break;
      }
      if(edgeForCheckMsg){

        setEdges((eds) =>
          addEdge(
            edgeForCheckMsg,
            eds
          )
        );
      }
      

      // Check if target node is of an allowed type
      // const targetNode = nodes.find(node => node.id === connection.target);
      // if (targetNode && !allowedTargetTypes.includes(targetNode.type || "")) {
      //   return <h2>"This typeddafe maximum connections allowed." </h2>;
      // }

      setEdges((eds) => addEdge({ ...connection }, eds));
    },
    [setEdges, edges, nodes, setNodes]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storedFlow = localStorage.getItem(flowKey);
      if (!storedFlow) {
        return;
      }
      const flow = JSON.parse(storedFlow);

      if (flow) {
        setNodes(flow.nodes || initialNodes);
        setEdges(flow.edges || initialEdges);
      }
    };

    restoreFlow();
  }, [setNodes]);

  // Function to arrange nodes in a tree structure
  const arrangeInTree = () => {
    // Find the root node
    const rootNode = nodes.find((node) => node.id === '0');
    if (!rootNode) {
      console.error("Start node not found");
      return; // Exit if no start node
    }

    // Create a hierarchy with the startNode as the root
    const root = d3
      .stratify<Node>()
      .id((d) => d.id)
      .parentId((d) => {
        const edge = edges.find((edge) => edge.target === d.id);
        return edge ? edge.source : null; // Link to parent node or null if none exists
      })(nodes);

    // Check for multiple root nodes
    const validRootNodes = root.descendants().filter((d) => !d.parent).length;
    if (validRootNodes > 1) {
      console.error("Multiple roots detected. Ensure a single root node.");
      return;
    }

    // Define tree layout and apply it to the root
    const treeLayout = d3.tree<Node>().nodeSize([275, 500]); // Adjust spacing
    treeLayout(root);

    // Map of node IDs to new positions
    const newNodePositions = new Map<string, { x: number; y: number }>();

    // Populate positions with safe defaults
    root.descendants().forEach((d3Node) => {
      newNodePositions.set(d3Node.data.id, {
        x: d3Node.y ?? 0, // Use 0 if x is undefined
        y: d3Node.x ?? 0, // Use 0 if y is undefined
      });
    });

    // Update node positions based on the layout
    const updatedNodes = nodes.map((node) => {
      const newPos = newNodePositions.get(node.id);

      if (newPos) {
        return {
          ...node,
          position: {
            x: newPos.x,
            y: newPos.y,
          },
        };
      }

      // Return node without modification if no new position found
      return node;
    });

    // Adjust the start node position if it exists
    const startNode = updatedNodes.find((node) => node.id === "startNode");
    if (startNode) {
      if (root.children && root.children.length > 0) {
        const firstChild = root.children[0];
        startNode.position = {
          x: 0, // Default to 0 if undefined
          y: 200, // Offset above the first child
        };
      } else {
        startNode.position = { x: 0, y: 0 };
      }
    }

    // Apply the updated positions to the flow and fit the view
    setNodes(updatedNodes);
    rfInstance?.fitView({ padding: 0.3 });
  };

  return (
    <div className="h-screen w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setRfInstance}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="dark"
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: "customEdge" }}
        proOptions={{ hideAttribution: true }}
      >
        <Panel position="top-right">
          <QuickActionOnFlowBuilder
            onSave={onSave}
            onRestore={onRestore}
            onArrange={arrangeInTree}
          />
        </Panel>
        <FloatingDockFlowBuilder />
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <Dialog
        open={modalData.open}
        onOpenChange={(open) => setmodalData((d) => ({ ...d, open: open }))}
      >
        <DialogContent className="bg-black p-8 rounded shadow-lg text-white">
          <DialogHeader>
            <DialogTitle>{modalData.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{modalData.msg}</DialogDescription>
          <DialogFooter>
            <DialogClose className="bg-white px-3 py-1 text-black font-semibold rounded-sm">
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
