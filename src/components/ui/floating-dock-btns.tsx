import { useReactFlow } from "@xyflow/react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

function FloatingDockBtn({
    mouseX,
    title,
    icon,
    type,
  }: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    type: string;
  }) {
    let ref = useRef<HTMLDivElement>(null);
  
    let distance = useTransform(mouseX, (val) => {
      let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
  
      return val - bounds.x - bounds.width / 2;
    });
  
    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  
    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
      distance,
      [-150, 0, 150],
      [20, 40, 20]
    );
  
    let width = useSpring(widthTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
    let height = useSpring(heightTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
  
    let widthIcon = useSpring(widthTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
  
    const [hovered, setHovered] = useState(false);
  
    const { getNodes,setNodes } = useReactFlow();
    const addNode = ()=>{ 
      let data;
      switch (type) {
        case "messageNode":
          data = {msgType:"text"}
          break;
        case "checkMsgNode":
          data = {checkConditions:[],keywords:[],exactMatch:""}
          break;
        default:
          data = {title:"",subtitle:"",buttons:[]}
          break;
      }   
      const newNode = {
                id: (getNodes().length).toString(),
                type: type,
                position: { x: Math.random() * 1000, y: Math.random() * 550 },
                data: data,
                dragHandle: '.node-dragable-from-this-div',
            };
            setNodes((nds) => [...nds,newNode]);
}

    return (
    //   <Link href={href}>
        <motion.div
          ref={ref}
          style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="aspect-square rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center relative cursor-pointer"
           onClick={addNode}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
        </motion.div>
    //   </Link>
    );
  }
  
export default FloatingDockBtn