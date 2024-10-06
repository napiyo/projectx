import { useState } from "react";
import { PopoverContent } from "../popover";
import { Button } from "@/components/instagramNodes/Interface/genericTEmplateInterface";
import style from "@/components/instagramNodes/styles/genericTemplate.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { Input } from "../input";

function PopoverContentGenericTemplate({addButton}:{addButton:(button:Button)=>void}){
    const initialBtnData:Button = {id:1,title:"",type:'postback'}
    const [buttonData,setButtonData] = useState<Button>(initialBtnData)
    return (<PopoverContent>
        <div className={style.popover}>

<AnimatePresence mode="sync">
        <h1 className="text-start font-semibold py-1 text-xl">Add new button</h1>
    
        <div className={`${style.radioBtns} ${buttonData.type=="web_url" && "after:translate-x-full"}`} >
            <div className={`${buttonData.type=="postback"?style.active:""} flex-1`}
            onClick={()=>{setButtonData((data)=>{return {...data,type:"postback"}})}}
            >Normal</div>
            <div className={`${buttonData.type=="web_url"?style.active:""} flex-1` }
             onClick={()=>{setButtonData((data)=>{return {...data,type:"web_url"}})}}
            >Web Button</div>
  </div>

      <div className="font-light text-xs py-1"
      > {buttonData.type=='postback'? 
        "Normal Buttons can connect to another actions"
        : 
        "Web Buttons, can not connect to any action. They redirect users to external website" } 
      </div>
      <div className="flex flex-row justify-center items-center gap-5 my-3">

      <label htmlFor="title_field">Title</label>
      <Input type="text" value={buttonData.title} onChange={(e)=> {
          e.target.value.trimStart().length <30 &&
          setButtonData((btn)=>({...btn,title:e.target.value.trimStart()}))
        }}
        className="text-sm w-full text-ellipsis py-2 text-gray-500 font-semibold bg-transparent"
        spellCheck={false}
        placeholder="Title"
        id="title_field"
        />
        </div>


<motion.div className={`${style.urlDiv} flex flex-row justify-center items-center gap-5 mb-3 z-0 ${buttonData.type ==="postback"?"-translate-x-50 overflow-hidden h-0 ":"h-12 translate-x-0 overflow-visible "}`}
        >

      <label htmlFor="title_field">URL</label>
      <Input type="text" value={buttonData.url} onChange={(e)=> {
          e.target.value.trimStart().length <30 &&
          setButtonData((btn)=>({...btn,url:e.target.value.trimStart()}))
        }}
        className="text-sm w-full text-ellipsis py-3 text-gray-500 font-semibold bg-transparent"
        spellCheck={false}
        placeholder="External Website"
        id="url_field"
        />
        </motion.div>
    
       
        <button onClick={()=>{
            addButton(buttonData)
            setButtonData(initialBtnData)
        }} 
        className="bg-black text-white w-full py-1 text-lg font-semibold rounded-md z-10"
        >Add Button</button>

</AnimatePresence>
        </div>
    </PopoverContent>)
}

export default PopoverContentGenericTemplate;