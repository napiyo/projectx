// components/CustomEdge.tsx

import React from 'react';
import { getBezierPath, EdgeProps, EdgeLabelRenderer, useReactFlow, getEdgeCenter, useEdges } from '@xyflow/react';
import { IconCross, IconTrash, IconXboxX, IconXboxXFilled } from '@tabler/icons-react';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}: EdgeProps) => {
  const { deleteElements } = useReactFlow(); // Access React Flow's methods


  // Calculate the Bezier path
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const reactFlowInstance = useReactFlow();
  const edges = useEdges();

  // Find the edge by its ID
  const edge = edges.find((e) => e.id === id);

  // Get the target node ID from the edge data
  const targetNodeId = edge?.target;

  const targetNode = targetNodeId && reactFlowInstance.getNode(targetNodeId)?.type;
  // Find the target node by its ID

  // Check if the target node is a checkMsgNode
  const isTargetCheckMsgNode = targetNode && targetNode === 'checkMsgNode';
  return (
    <>
      <path
        id={"edgePath"+id}
        style={{ stroke: 'white', strokeWidth: 1 }}
        className="react-flow__edge-path"
        d={edgePath}
      />
      {
        isTargetCheckMsgNode?"":
        <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left:edgeCenterX,
            top:edgeCenterY,
            transform:"translate(-50%,-50%)",
            pointerEvents: 'all',
            
          }}
          className='bg-black rounded-full'
        
        >
           <IconXboxX onClick={()=>deleteElements({ edges: [{ id: id }] })} 
          className='text-white hover:text-red-500 z-[100] cursor-pointer'/>
        </div>
       
      </EdgeLabelRenderer>
        }
    </>
  );
};

export default CustomEdge;
