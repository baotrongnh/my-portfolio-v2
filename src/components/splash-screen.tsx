"use client"

import React, { useEffect, useState } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const SplashLayout = ({ children }: { children: React.ReactNode }) => {
     const [showSplash, setShowSplash] = useState(true);

     useEffect(() => {
          const timer = setTimeout(() => setShowSplash(false), 2700)
          return () => clearTimeout(timer)
     }, [])

     if (showSplash) return (
          <div className='h-svh w-screen fixed top-0 z-40 flex justify-center items-center motion-blur-out-sm motion-duration-2500 motion-delay-2400'>
               {/* <h1 className='text-4xl motion-scale-in-50 motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.75s]/rotate motion-delay-[0.75s]/blur'>
                    nhbt.dev
               </h1> */}
          <TextGenerateEffect words='welcome to nhbt.dev' />
          </div>
     )

     return children
}

export default SplashLayout
