import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Tilt } from '@/components/ui/tilt'

export default function About() {
     return (
          <div className="h-svh py-20 sm:py-40 flex items-center">
               <div className='container' data-aos="fade-up">
                    <div className='grid grid-cols-12'>
                         <div className='col-span-12 lg:col-span-6 px-4 xl:px-7'>
                              <Tilt rotationFactor={8} isRevese>
                                   <Image
                                        alt='NHBT'
                                        width={500}
                                        height={500}
                                        src='/images/avatar-2.jpg'
                                        className='w-full rounded-2xl'
                                   />
                              </Tilt>
                         </div>

                         <div className='col-span-12 lg:col-span-6 px-3 xl:px-7 xl:pt-3'>
                              <h1 className='text-2xl font-bold text-primary'>Who am i?</h1>
                              <h1 className='text-4xl xl:text-5xl font-bold tracking-tight text-balance my-3 xl:mt-5 xl:mb-6'>I'm Bao Trong, a Front-end developer</h1>
                              <p className='leading-7 text-justify text-muted-foreground'>
                                   " I'm a frontend developer who loves working with fonts, colors, and making sure
                                   websites feel welcoming. I enjoy creating simple, clean designs that are easy to use and
                                   help people have a smooth experience. It's all about making things look nice without
                                   overcomplicating them! "
                              </p>

                              <div className='mt-5'>
                                   <a download='CV_NguyenHuynhBaoTrong'>
                                        <Button>
                                             Download CV
                                        </Button>
                                   </a>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
