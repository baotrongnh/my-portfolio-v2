import ComingSoon from '@/components/sections/coming-soon'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Front-end skills and technical toolkit of Bao Trong Nguyen Huynh, including React, Next.js, TypeScript, Tailwind CSS, accessibility, SEO, and web performance.',
  alternates: {
    canonical: '/skill',
  },
  openGraph: {
    title: `Skills | ${siteConfig.shortName}`,
    description:
      'Front-end skills and technical toolkit of Bao Trong Nguyen Huynh, including React, Next.js, TypeScript, Tailwind CSS, accessibility, SEO, and web performance.',
    url: '/skill',
  },
}

export default function Skill() {
  return (
    <ComingSoon />
  )
}
