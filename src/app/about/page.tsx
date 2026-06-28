import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tilt } from '@/components/ui/tilt'
import { siteConfig } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
     title: `About ${siteConfig.name}`,
     description:
          'Learn more about Bao Trong Nguyen Huynh, a front-end developer focused on clean interfaces, responsive design, and smooth user experiences.',
     alternates: {
          canonical: '/about',
     },
     openGraph: {
          title: `About ${siteConfig.name}`,
          description:
               'Learn more about Bao Trong Nguyen Huynh, a front-end developer focused on clean interfaces, responsive design, and smooth user experiences.',
          url: '/about',
     },
}

export default async function About() {
     const t = await getTranslations('AboutSection')

     return (
          <div className="h-svh py-20 sm:py-40 flex items-center">
               <div className='container' data-aos="fade-up">
                    <div className='grid grid-cols-12'>
                         <div className='col-span-12 lg:col-span-6 px-4 xl:px-7'>
                              <Tilt rotationFactor={8} isRevese>
                                   <Image
                                        alt={t('imageAlt')}
                                        width={500}
                                        height={500}
                                        src='/images/avatar-2.jpg'
                                        className='w-full rounded-2xl'
                                   />
                              </Tilt>
                         </div>

                         <div className='col-span-12 lg:col-span-6 px-3 xl:px-7 xl:pt-3'>
                              <p className='text-2xl font-bold text-primary'>{t('eyebrow')}</p>
                              <h1 className='text-4xl xl:text-5xl font-bold tracking-tight text-balance my-3 xl:mt-5 xl:mb-6'>{t('titlePrefix')} {t('titleName')}, {t('titleSuffix')}</h1>
                              <p className='leading-7 text-justify text-muted-foreground'>
                                   &quot;{t('bio')}&quot;
                              </p>

                              <div className='mt-5'>
                                   <a download='CV_NguyenHuynhBaoTrong'>
                                        <Button>
                                             {t('downloadCv')}
                                        </Button>
                                   </a>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
