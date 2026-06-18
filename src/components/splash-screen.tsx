"use client"

import React, { useEffect, useState } from "react";
import { AppleHelloEnglishEffect } from "./ui/apple-hello-effect";

const SplashLayout = ({ children }: { children: React.ReactNode }) => {
     const [showSplash, setShowSplash] = useState(true);
     const [canContinue, setCanContinue] = useState(false);

     useEffect(() => {
          const timer = setTimeout(() => setCanContinue(true), 2700)
          return () => clearTimeout(timer)
     }, [])

     const handleContinue = () => {
          if (canContinue) {
               setShowSplash(false);
          }
     }

     if (showSplash) return (
          <div>
               <div 
                    onClick={handleContinue}
                    className={`h-svh w-screen fixed top-0 z-[100] flex flex-col justify-center items-center transition-colors duration-500
                         ${canContinue ? "cursor-pointer bg-background/95 backdrop-blur-md" : "bg-background"}`}
               >
                    <AppleHelloEnglishEffect speed={0.6} />
                    
                    {canContinue && (
                         <div className="absolute bottom-20 animate-pulse text-muted-foreground text-sm tracking-widest uppercase font-medium">
                              Click anywhere to enter
                         </div>
                    )}
               </div>
          </div>
     )

     return children
}

export default SplashLayout
