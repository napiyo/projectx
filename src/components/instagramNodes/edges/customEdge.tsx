// components/CustomEdge.tsx

import React from 'react';
import { getBezierPath, EdgeProps, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';

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
  const { setEdges } = useReactFlow(); // Access React Flow's methods

  const handleDelete = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id)); // Delete the edge
  };

  // Calculate the Bezier path
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Helper to calculate a point along the curve (e.g., 25% or 75%)
  const calculateCurvePoint = (t: number) => {
    const x = (1 - t) ** 2 * sourceX + 2 * (1 - t) * t * (sourceX + targetX) / 2 + t ** 2 * targetX;
    const y = (1 - t) ** 2 * sourceY + 2 * (1 - t) * t * (sourceY + targetY) / 2 + t ** 2 * targetY;
    return { x, y };
  };

  // Calculate button positions along the edge (25% and 75% of the curve)
  const { x: startX, y: startY } = calculateCurvePoint(0.25);
  const { x: endX, y: endY } = calculateCurvePoint(0.75);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        {/* Delete Button Near Start (25% of curve) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${startX}px, ${startY}px) translate(-50%, -50%)`,
            pointerEvents: 'all',
          }}
        >
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-1 rounded"
          >
            🗑️
          </button>
        </div>

        {/* Delete Button Near End (75% of curve) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${endX}px, ${endY}px) translate(-50%, -50%)`,
            pointerEvents: 'all',
          }}
        >
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-1 rounded"
          >
            🗑️
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
