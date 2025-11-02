import { Button } from "../ui/button";
import { LinkPreview } from "../ui/link-preview";
import { Magnetic } from "../ui/magnetic";
import { Spotlight } from "../ui/spotlight-new";

export default function Hero() {
     return (
          <section className="h-dvh w-dvw overflow-hidden antialiased relative">
               <Spotlight />
               <div className='container mx-auto h-full flex flex-col justify-center text-center z-50' data-aos="fade-up">
                    <p className='text-xl'>
                         Hi, I&apos;m <b className='text-primary'>Bao Trong</b>
                    </p>
                    <h1 className="py-5 text-3xl md:text-4xl font-semibold">
                         Front-end developer
                    </h1>
                    <p className='px-4 md:px-[20%] lg:px-[25%] antialiased opacity-85 text-muted-foreground text-lg'>
                         Welcome to my portfolio page, where you&apos;ll find everything about me – from my hobbies, photography,
                         personal life, to the resources I often use, and of course, code.
                    </p>
                    <div className="flex justify-center gap-5 mt-7">
                         <Magnetic>
                              <a href='https://m.me/baotrong.nguyenhuynh.52/' target='_blank'>
                                   <Button className='motion-preset-seesaw px-10' size='lg'>
                                        Hire me
                                   </Button>
                              </a>
                         </Magnetic>
                         <Magnetic>
                              <LinkPreview url="https://github.com/baotrongnh" openInNewTab={true}>
                                   <Button className='duration-200 px-10' variant="outline" size='lg'>Github</Button>
                              </LinkPreview>
                         </Magnetic>
                    </div>
               </div>
          </section>
     )
}
