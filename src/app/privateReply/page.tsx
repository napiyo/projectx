'use client'
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { IconCirclePlus, IconTrashFilled, } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TagsInput } from "react-tag-input-component";
import { Input } from "@/components/ui/input";

interface Post{
    mediaID:number, reply: string, keywords: string[]
}

// helper function
function KeywordsContent(newPrivateReplyData:Post ,setnewPrivateReplyData: Dispatch<SetStateAction<Post>>){
    

return (
    <div className="flex flex-col gap-4">
        <TagsInput
          value={newPrivateReplyData.keywords}
          onChange={(tags) => setnewPrivateReplyData((d)=>({...d,keywords:tags}))}
          name="keywords"
          placeHolder="Enter Keywords"
          // onExisting = {}
          classNames={{
            tag: "text-black bg-red-300 rounded-md px-2 py-1 !important", 
            input: "text-black",
          }}
          separators={[" ", "Enter"]}
          />
        <em className="text-sm text-gray-400">Press enter or space to add a keyword</em>
    </div>
);
}
function SelectPostContent(PrivateReplyData:Post[],newPrivateReplyData:Post ,setnewPrivateReplyData: Dispatch<SetStateAction<Post>>){
    
    // const [selectedPost, setSelectedPost] = useState<number | null>(null);

    return (
        <div className="flex flex-wrap gap-2 max-h-[20em] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}>
            <style jsx>{`
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-thumb {
                background-color: #4B5563;
                border-radius: 9999px;
            }
            ::-webkit-scrollbar-track {
                background-color: #1F2937;
            }
            `}</style>
            {PrivateReplyData.map((post, index) => (
                <div
                    key={post.mediaID}
                    className={`w-24 h-24 rounded-[8px] flex items-center justify-center cursor-pointer relative ${newPrivateReplyData.mediaID === post.mediaID ? 'border-4 border-blue-500' : ''}`}
                    onClick={() => setnewPrivateReplyData((d)=>({...d,mediaID:post.mediaID}))}
                >
                    <img
                        src={`/mahadev.jpg`}
                        alt={"Post Thumbnail"}
                        className="w-full h-full object-cover rounded-[8px]"
                    />
                    {newPrivateReplyData.mediaID === post.mediaID && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white h-6 w-6 flex justify-center rounded-sm">
                            ✓
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
  
}
function EnterMessage(newPrivateReplyData:Post ,setnewPrivateReplyData: Dispatch<SetStateAction<Post>>){
    
    return(<div>
        <p>Enter your message that will be sent as DM</p>
        <Input
        value={newPrivateReplyData.reply}
        onChange={(e)=> e.target.value.trimStart().length <200 && setnewPrivateReplyData((d)=>({...d,reply:e.target.value.trimStart()}))}
        /></div>)
}

// helper function ends



export default function PrivateReply() {
    const steps = [
        { id: 1, title: "Select Post", content: SelectPostContent },
        { id: 2, title: "Enter Keywords", content: KeywordsContent },
        { id: 3, title: "Enter Reply", content: EnterMessage },
    ];

    const [currentStep, setCurrentStep] = useState(-1);
    const [newPrivateReplyData, setnewPrivateReplyData] = useState<Post>({mediaID:0, keywords: [], reply: ""});
    const [PrivateReplyData, setPrivateReplyData] = useState<Post[]>([{mediaID:1, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:2, reply: "Select Post akdsjf aksdjf laskdjf laskdjf laskdjf laksdjfas ldfjjaksldjf alsdkjflaksdjflask dfjl  faskdfjasdklfj alskdfjalskdjflaskdjflsakdj", keywords: ["Select", "Post"]},
        {mediaID:3, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:4, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:5, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:6, reply: "Select Post", keywords: ["Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post"]},
        {mediaID:7, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:8, reply: "Select Post akdsjf aksdjf laskdjf laskdjf laskdjf laksdjfas ldfjjaksldjf alsdkjflaksdjflask dfjl  faskdfjasdklfj alskdfjalskdjflaskdjflsakdj", keywords: ["Select", "Post"]},
        {mediaID:9, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:10, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:53, reply: "Select Post", keywords: ["Select", "Post"]},
        {mediaID:63, reply: "Select Post", keywords: ["Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post","Select", "Post"]},
        {mediaID:75, reply: "Select Post", keywords: ["Select", "Post"]}
    ]);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };



return (<div className="bg-black flex-1 max-h-screen h-full w-full text-white p-5 flex flex-row">
    <div className="flex-1 pt-10 px-10">
        <div className="flex flex-col gap-2 mb-16">
            <h1 className="text-4xl text-center">Private Reply</h1>
            <p className="text-center text-sm">programmatically send a private reply to a person who commented on your Instagram professional post, reel, story, Live, or ad post.</p>
            </div>
               { currentStep == -1 &&  <div className="flex flex-col gap-4 overflow-y-auto max-h-[20em] px-10" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}>
                    <style jsx>{`
                        ::-webkit-scrollbar {
                            width: 8px;
                        }
                        ::-webkit-scrollbar-thumb {
                            background-color: #4B5563;
                            border-radius: 9999px;
                        }
                        ::-webkit-scrollbar-track {
                            background-color: #1F2937;
                        }
                    `}</style>
                    <AnimatePresence>
                        
                    {PrivateReplyData.map((step, index) => (
                        <motion.div
                        key={step.mediaID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md"
                        layout
                        >
                            <div className="flex items-center gap-4 w-full">
                                <img
                                    src={`/MainAfter.png`}
                                    alt={"Post Thumbnail"}
                                    className="w-12 h-12 rounded-sm object-cover"
                                />
                                <div className="flex flex-col w-full">
                                    <h2 className="text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                                        {PrivateReplyData[index].reply.length > 50 ? `${PrivateReplyData[index].reply.substring(0, 50)}...` : PrivateReplyData[index].reply}
                                    </h2>
                                    <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis w-full">
                                        Keywords: {PrivateReplyData[index].keywords.length > 5 ? `${PrivateReplyData[index].keywords.slice(0, 5).join(', ')}...` : PrivateReplyData[index].keywords.join(', ')}
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setPrivateReplyData((prev) => prev.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700 transition-all duration-300"
                            >
                                <IconTrashFilled size={24} />
                            </motion.button>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div> }

                {currentStep != -1 && (
                    <div className="flex flex-col items-center">
                        <div className="w-full flex justify-between mb-4">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex-1 mx-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: index <= currentStep ? "100%" : "0%" }}
                                        transition={{ duration: 0.5 }}
                                        className={`h-2 rounded-full ${
                                            index <= currentStep
                                                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: index === currentStep ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-center mt-2 text-sm text-white"
                                    >
                                        {step.title}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <motion.div
                            key={currentStep}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full p-5 bg-gray-800 rounded-lg shadow-lg"
                        >
                          {
                            (currentStep == 0)?SelectPostContent(PrivateReplyData,newPrivateReplyData,setnewPrivateReplyData)
                            :(currentStep == 1)?KeywordsContent(newPrivateReplyData,setnewPrivateReplyData)
                            :(currentStep == 2)?EnterMessage(newPrivateReplyData,setnewPrivateReplyData):null
                          } 
                            
                        </motion.div>
                        <div className="flex justify-between w-full mt-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setCurrentStep(-1)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                            {

                             currentStep != steps.length-1 ?<button
                                onClick={nextStep}
                                disabled={currentStep === steps.length - 1}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                                >
                                Next
                            </button>:
                             <button
                            //  onClick={}
                            //  disabled={currentStep === steps.length - 1}
                             className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                         >
                             Done
                         </button>
                            }
                        </div>
                    </div>
                )}
                
           { currentStep == -1 &&
            <div className="flex justify-center w-1/2 mx-auto mt-16"
            onClick={() => setCurrentStep(0)}
            ><MovingBorderButton duration={2500} 
            borderRadius="10px px-4"
            > <IconCirclePlus size={18} /> <div className="ml-2">
                 Add new Private Reply
                </div>
                </MovingBorderButton></div>}
    </div>
    {/* Mobile preview section */}
    <div className="relative px-32 flex justify-center items-center">
        <div className="relative justify-center w-[270px] h-[585px] border-[6px] border-gray-800 rounded-[30px] shadow-md shadow-white overflow-hidden">
            <video 
            src="/videos/video1.mp4" 
            autoPlay 
            loop 
            muted 
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
            />
        </div>
    </div>
</div>)
}


