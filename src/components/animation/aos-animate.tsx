'use client';

import Aos from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'

const AOSAnimate = () => {
     useEffect(() => {
          Aos.init({
               duration: 800
          })
     }, [])

     return null
}

export default AOSAnimate