"use client"

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { LinkPreview } from "../ui/link-preview";
import { Magnetic } from "../ui/magnetic";
import { Spotlight } from "../ui/spotlight-new";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
     const t = useTranslations("HomePage")

     return (
          <section id="hero" className="fullscreen-section h-dvh w-dvw overflow-hidden antialiased relative">
               <Spotlight />
               <div className='container mx-auto h-full flex flex-col justify-center text-center z-50' data-aos="fade-up">
                    <p className='text-xl'>
                         {t("hi")}, {t("i'm")} <b className='text-primary'>{t("myName")}</b>
                    </p>
                    <h1 className="py-5 text-3xl md:text-4xl font-semibold">
                         Front-end developer
                    </h1>
                    <p className='px-4 md:px-[20%] lg:px-[25%] antialiased opacity-85 text-muted-foreground text-lg'>
                         {t("description")}
                    </p>
                    <div className="flex justify-center gap-5 mt-7">
                         <Magnetic>
                              <a href='https://m.me/baotrong.nguyenhuynh.52/' target='_blank'>
                                   <Button className='motion-preset-seesaw px-10' size='lg'>
                                        {t("hireMe")}
                                   </Button>
                              </a>
                         </Magnetic>
                         <Magnetic>
                              <LinkPreview url="https://github.com/baotrongnh" openInNewTab={true}>
                                   <Button className='duration-200 px-10' variant="outline" size='lg'>
                                        Github
                                   </Button>
                              </LinkPreview>
                         </Magnetic>
                    </div>
               </div>

               {/* Scroll Indicator */}
               <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-50 pointer-events-none"
               >
                    <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Scroll</span>
                    <ChevronDown className="w-6 h-6 text-primary" />
               </motion.div>
          </section>
     )
}
