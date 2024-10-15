// components/CustomEdge.tsx

import React from 'react';
import { getBezierPath, EdgeProps, EdgeLabelRenderer, useReactFlow, getEdgeCenter } from '@xyflow/react';
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
  return (
    <>
      <path
        id={"edgePath"+id}
        style={{ stroke: 'white', strokeWidth: 1 }}
        className="react-flow__edge-path"
        d={edgePath}
      />
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
    </>
  );
};

export default CustomEdge;
