import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";


export const QuickActionOnFlowBuilder = ({onSave,onRestore,onArrange}:{onSave:()=>void,onRestore:()=>void,onArrange:()=>void}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-lg bg-white p-1"
    >
      <Tab setPosition={setPosition} onClick={onSave}>Save</Tab>
      <Tab setPosition={setPosition} onClick={onRestore}>Edit</Tab>
      <Tab setPosition={setPosition} onClick={()=>"d"}>Publish</Tab>
      <Tab setPosition={setPosition} onClick={onArrange}>Arange</Tab>
      {/* <Tab setPosition={setPosition}>Blog</Tab> */}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  onClick
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  onClick:()=>void
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
    onClick={onClick}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-1 py-1 text-xs text-white mix-blend-difference font-light md:px-2  md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-5 rounded-lg bg-black md:h-8"
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};