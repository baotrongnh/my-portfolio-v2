import React from 'react'
import { TextHoverEffect } from '../ui/text-hover-effect'
import { getTranslations } from 'next-intl/server'

export default async function ComingSoon() {
     const t = await getTranslations('Common')

     return (
          <div className="h-svh flex items-center justify-center">
               <TextHoverEffect text={t('soon')} />
          </div>
     )
}
