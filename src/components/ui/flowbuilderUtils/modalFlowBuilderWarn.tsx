"use client"

import { DialogContent, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogDescription, DialogHeader, DialogTrigger } from "../dialog";

export default function ModalFlowBuilderWarn({msg}:{msg:string}){
    return (
        <div className="">

        <Dialog open>
        {/* <DialogTrigger className="bg-red-500 z-[5000] cursor-pointer">Open</DialogTrigger> */}
        <DialogContent className="bg-red-600">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
        </div>
);
}