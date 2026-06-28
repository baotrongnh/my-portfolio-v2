import ComingSoon from '@/components/sections/coming-soon'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
     title: 'Contact',
     description:
          'Contact Bao Trong Nguyen Huynh for front-end development opportunities, collaborations, and web interface projects.',
     alternates: {
          canonical: '/contact',
     },
     openGraph: {
          title: `Contact | ${siteConfig.shortName}`,
          description:
               'Contact Bao Trong Nguyen Huynh for front-end development opportunities, collaborations, and web interface projects.',
          url: '/contact',
     },
}

export default function Contact() {
     return (
          <ComingSoon />
     )
}
