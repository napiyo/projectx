'use client'
import { useContext, useEffect, useState } from 'react';
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import Image from "next/image";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";
import { AuthServiceType, getAuthServiceInstance } from '@/lib/api/auth';
import { RedirectType, useSearchParams } from 'next/navigation';
import {motion} from 'framer-motion'
import { toast } from 'react-toastify';
import { getMeServiceInstance } from '@/lib/api/user';
import { UserContext } from '@/lib/dataContext';
import { useRouter } from 'next/navigation';

export default  function Signup() {
    const params = useSearchParams();
    const [loading, setloading] = useState<string | null>("Loading...")
    let code  = params.get('code');
    let error_message = params.get('error_message');
    const AuthServiceInstance:AuthServiceType = getAuthServiceInstance();
    const meServiceInstance = getMeServiceInstance();
    const router = useRouter()
    const {dispatch} = useContext(UserContext);
    
        useEffect(() => {
        if (code) {     
            // Call the backend API with the code
            setloading("Loggin you in...")
             AuthServiceInstance.instaLogin(code).then(async(res)=>{
                if(res.success){
                    toast.success("Logged in successfully")
                    setloading("Getting your details...")
                    //get user data
                    await meServiceInstance.getMyData()
                    .then((res)=>{
                        if(res.success){
                            setloading("Welcoming you...")
                            toast.success("User data fetched successfully")
                         
                            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
                            router.replace('/')
                        }
                        else{
                            toast.error(res.message || "Failed to get user data")
                        }
                    }).catch((err)=>{
                        toast.error("Failed to get user data")
                    })


                }
                else{
                    code = null
                    toast.error(res.message || "Opps something went wrong...")
                }
                setloading(null)
            })
            
        }
        else if(error_message){
            toast.error("Login failed or expired, login again")
            setloading(null)
        }
        else{
            setloading(null)
        }

    
  }, [code]);

    const words = ["New world", "Infinite possibilities", "Real growth", "ProjectX"];
    return (
        <div className="dark flex flex-1 h-screen w-full bg-black relative">
            <BackgroundBeamsWithCollision className="flex-1 bg-black justify-center items-center flex">
                <div className="text-white text-4xl font-bold animate-pulse">Welcome to {<FlipWords words={words} />}</div>
            </BackgroundBeamsWithCollision>

            {/* Right Box starts */}
            <motion.div className="flex-1 bg-black justify-center items-center flex">
                {loading ? (
                    
                        <div className="text-white text-xl animate-pulse">{loading}</div>
                    
                ) : (
                    <div onClick={()=> {
                        setloading("Redirecting to instagram")
                     AuthServiceInstance.oAuthInstaURL()
                     }} className="flex justify-center w-1/2 mx-auto mt-16 transform hover:scale-105 transition-transform duration-300">
                        <MovingBorderButton
                            duration={2500}
                            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-0"
                            containerClassName='p-[2px] bg-transparent'
                            borderClassName="bg-indigo-400 opacity-100"
                            borderRadius="5"
                        >
                            <Image width={18} height={18} src='/instaIcon.svg' alt="insta" style={{ fill: 'green' }} />
                            <div className="ml-2">Log in with Instagram</div>
                        </MovingBorderButton>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
