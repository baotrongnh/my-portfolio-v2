import ComingSoon from '@/components/sections/coming-soon'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects by Bao Trong Nguyen Huynh, featuring front-end work with Next.js, React, TypeScript, Tailwind CSS, and polished interactive interfaces.',
  alternates: {
    canonical: '/project',
  },
  openGraph: {
    title: `Projects | ${siteConfig.shortName}`,
    description:
      'Selected projects by Bao Trong Nguyen Huynh, featuring front-end work with Next.js, React, TypeScript, Tailwind CSS, and polished interactive interfaces.',
    url: '/project',
  },
}

export default function ProjectPage() {
  return (
    <ComingSoon />
  )
}
