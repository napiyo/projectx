import style from "@/components/instagramNodes/styles/genericTemplate.module.css";
import commonStyle from "@/components/instagramNodes/styles/common.module.css";
import { AnimatePresence, Reorder } from "framer-motion";
import ActionButton from "./actionButtons";
import { Popover, PopoverTrigger } from "../popover";
import PopoverContentGenericTemplate from "./popoverContentGenericTemplate";
import { Handle, Position, useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useCallback, useState } from "react";
import {
  Button,
  GenericTemplateData,
  getButtonCntLimit,
} from "@/components/instagramNodes/Interface/NodesInterface";
import PopoverContentQuickReply from "../PopoverContentQuickReply";

export function ActionButtonList({
  nodeId,
  data,
  type,
}: {
  nodeId: string;
  data: GenericTemplateData;
  type: string;
}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [idbutton, setIdbutton] = useState<number>(1);
  const [popOverOpened, setpopOverOpened] = useState(false);
  const { updateNodeData } = useReactFlow();
  // Function to remove a button
  const removeButton = (idToRemove: number) => {
    // setButtons(buttons.filter((button, index) => button.id !== idToRemove));
    const bts = data.buttons.filter(
      (button, index) => button.id !== idToRemove
    );
    updateButtons(bts);
    // wait for exit animation to complete
    setTimeout(() => {
      updateNodeInternals(nodeId);
    }, 400);
  };
  // Function to update buttons
  const updateButtons = useCallback(
    (buttons: Button[]) => {
      updateNodeData(nodeId, { buttons });
    },
    [nodeId]
  );
  const addButton = (btn: Button) => {
    const newBtns = [...data.buttons, { ...btn, id: idbutton }];
    updateButtons(newBtns);
    setIdbutton(idbutton + 1);
    setpopOverOpened(false);
    // wait for entry animation to complete
    setTimeout(() => {
      updateNodeInternals(nodeId);
    }, 400);
  };
  return (
    <div className={style.buttonsContainer}>
      <Reorder.Group
        axis="y"
        values={data.buttons}
        onReorder={(newButtons) => updateButtons(newButtons)} // This will handle reordering
        className={style.buttonsContainer}
      >
        <AnimatePresence mode="sync" key="actionsbtnsanimation">
          {data.buttons.map((button, index) => (
            <ActionButton
              key={button.id}
              button={button}
              removeButton={removeButton}
              nodeid={nodeId}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <button className="p-2 bg-black w-full rounded-md text-white font-semibold relative">
          Else
          <Handle
            type="source"
            id={`b_else${nodeId}`}
            key={`b_else${nodeId}`}
            position={Position.Right}
            className={commonStyle.sourceHandleBtn}
          />
        </button>

      <Popover open={popOverOpened} onOpenChange={setpopOverOpened}>
        {data.buttons.length !== getButtonCntLimit(type) ? (
          <PopoverTrigger>Add Button</PopoverTrigger>
        ) : (
          <p className="text-sm text-center"> Can't add more buttons</p>
        )}
        {type == "quickReply" ? (
          <PopoverContentQuickReply addButton={addButton} />
        ) : (
          <PopoverContentGenericTemplate addButton={addButton} />
        )}
      </Popover>
    </div>
  );
  {
    /* END - Buttons Container with Add button buttons */
  }
}
