'use client'

import { getLocale, setLocale } from '@/app/actions/locale'
import {
     Select,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectLabel,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const listLanguages = [
     {
          label: 'Việt Nam', value: 'vi', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="SVGuywqVbel">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#SVGuywqVbel)">
                    <path fill="#d80027" d="M0 0h512v512H0z" />
                    <path fill="#ffda44" d="m256 133.6l27.6 85H373L300.7 271l27.6 85l-72.3-52.5l-72.3 52.6l27.6-85l-72.3-52.6h89.4z" />
               </g>
          </svg>
     },
     {
          label: 'English', value: 'en', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="SVGuywqVbel">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#SVGuywqVbel)">
                    <path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z" />
                    <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
                    <path fill="#0052b4" d="M0 0h256v256H0Z" />
                    <path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z" />
               </g>
          </svg>
     },
     {
          label: '日本語', value: 'jp', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="SVGuywqVbel">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#SVGuywqVbel)">
                    <path fill="#eee" d="M0 0h512v512H0z" />
                    <circle cx="256" cy="256" r="111.3" fill="#d80027" />
               </g>
          </svg>
     },
     {
          label: '한국인', value: 'ko', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="circleFlagsKo0">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#circleFlagsKo0)">
                    <path fill="#eee" d="M0 0h512v512H0Z" />
                    <path fill="#333" d="m350 335l24-24l16 16l-24 23zm-39 39l24-24l15 16l-23 24zm87 8l23-24l16 16l-24 24zm-40 39l24-23l16 15l-24 24Zm16-63l24-23l15 15l-23 24zm-39 40l23-24l16 16l-24 23zm63-221l-63-63l15-15l64 63zm-63-15l-24-24l16-16l23 24zm39 39l-24-24l16-15l24 23zm8-87l-24-23l16-16l24 24Zm39 40l-23-24l15-16l24 24ZM91 358l63 63l-16 16l-63-63zm63 16l23 24l-15 15l-24-23zm-40-39l24 23l-16 16l-23-24zm24-24l63 63l-16 16l-63-63zm16-220l-63 63l-16-16l63-63zm23 23l-63 63l-15-16l63-63zm24 24l-63 63l-16-16l63-63z" />
                    <path fill="#d80027" d="M319 319L193 193a89 89 0 1 1 126 126" />
                    <path fill="#0052b4" d="M319 319a89 89 0 1 1-126-126z" />
                    <circle cx="224.5" cy="224.5" r="44.5" fill="#d80027" />
                    <circle cx="287.5" cy="287.5" r="44.5" fill="#0052b4" />
               </g>
          </svg>
     },
     {
          label: '中国人', value: 'cn', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="SVGuywqVbel">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#SVGuywqVbel)">
                    <path fill="#d80027" d="M0 0h512v512H0z" />
                    <path fill="#ffda44" d="m140.1 155.8l22.1 68h71.5l-57.8 42.1l22.1 68l-57.9-42l-57.9 42l22.2-68l-57.9-42.1H118zm163.4 240.7l-16.9-20.8l-25 9.7l14.5-22.5l-16.9-20.9l25.9 6.9l14.6-22.5l1.4 26.8l26 6.9l-25.1 9.6zm33.6-61l8-25.6l-21.9-15.5l26.8-.4l7.9-25.6l8.7 25.4l26.8-.3l-21.5 16l8.6 25.4l-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7l-26.5-3.8l-11.8 24l-4.6-26.4l-26.6-3.8l23.8-12.5l-4.6-26.5l19.2 18.7zm-78.2-73l-2 26.7l24.9 10.1l-26.1 6.4l-1.9 26.8l-14.1-22.8l-26.1 6.4l17.3-20.5l-14.2-22.7l24.9 10.1z" />
               </g>
          </svg>
     },
     {
          label: 'Français', value: 'fr', icon: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
               <mask id="SVGuywqVbel">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
               </mask>
               <g mask="url(#SVGuywqVbel)">
                    <path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z" />
                    <path fill="#0052b4" d="M0 0h167v512H0z" />
                    <path fill="#d80027" d="M345 0h167v512H345z" />
               </g>
          </svg>
     }
]

const icon = <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
     <path fill="currentColor" d="M14.022 7h1a1 1 0 0 1 1 1v1a1 1 0 0 0 2 0V8a3.003 3.003 0 0 0-3-3h-1a1 1 0 0 0 0 2m-4 9h-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-2 0v1a3.003 3.003 0 0 0 3 3h1a1 1 0 0 0 0-2m11-1a1 1 0 0 0 0-2h-3v-.5a1 1 0 0 0-2 0v.5h-3a1 1 0 0 0 0 2h5.184a6.7 6.7 0 0 1-1.225 2.527a6.7 6.7 0 0 1-.63-.983a1 1 0 1 0-1.779.912a8.7 8.7 0 0 0 .96 1.468a6.6 6.6 0 0 1-2.426 1.099a1 1 0 0 0 .427 1.954a8.6 8.6 0 0 0 3.445-1.622a8.7 8.7 0 0 0 3.469 1.622a1 1 0 1 0 .43-1.954a6.7 6.7 0 0 1-2.446-1.09A8.74 8.74 0 0 0 20.244 15Zm-11.97-3.757a1 1 0 0 0 1.94-.486l-1.757-7.03a2.281 2.281 0 0 0-4.426 0l-1.757 7.03a1 1 0 0 0 1.94.486L5.552 9h2.94ZM6.052 7l.698-2.787a.291.291 0 0 1 .544 0L7.991 7Z" />
</svg>

export default function SelectLanguage() {
     const [currentLocale, setCurrentLocale] = useState('en')
     const router = useRouter()

     useEffect(() => {
          getLocale().then(locale => setCurrentLocale(locale))
     }, [currentLocale])

     const handleChangeLanguage = async (newLocale: string) => {
          setCurrentLocale(newLocale)
          await setLocale(newLocale)
          router.refresh()
     }

     return (
          <div className="absolute top-3 right-3">
               <Select onValueChange={handleChangeLanguage} value={currentLocale}>
                    <SelectTrigger>
                         <SelectValue placeholder={icon} />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectGroup>
                              <SelectLabel>Language</SelectLabel>
                              {listLanguages?.map((language, index) => (
                                   <SelectItem value={language.value} key={index}>
                                        {language.icon}
                                        {language.label}
                                   </SelectItem>
                              ))}
                         </SelectGroup>
                    </SelectContent>
               </Select>
          </div>
     )
}
