'use client'
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import Image from "next/image";
import AppConfig from '@/config/config'
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";
export default function Signup(){

    const words = ["New world","Infinite possibilites","Real growth","ProjectX"]
    return(<div className="dark flex flex-1 h-screen w-full bg-black relative">
        {/* <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]
"></div> */}
       
     

            <BackgroundBeamsWithCollision className="flex-1 bg-black justify-center items-center flex">
            <div className="text-white text-4xl font-bold animate-pulse">Welcome to {<FlipWords words={words}/>}</div>
                </BackgroundBeamsWithCollision> 
      
        
        {/* Right Box starts  */}
        <div className="flex-1 bg-black justify-center items-center flex"> 
           
        <Link href={AppConfig.INSTAGRAM_OAUTH_URL} className="flex justify-center w-1/2 mx-auto mt-16 transform hover:scale-105 transition-transform duration-300 "
            ><MovingBorderButton duration={2500} 
            className="border-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            borderClassName="bg-white"
            borderRadius="10px px-4"
            > <Image width={18} height={18} src='/instaIcon.svg' alt="insta"  style={{fill:'green'}}/> <div className="ml-2">
                Log in with Instagram
                </div>
                </MovingBorderButton>
                </Link>
            </div>
           
    </div>)
}
