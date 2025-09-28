import React from 'react'
import HomeHero from './_components/HomeHero'
import Join from './_components/Join'
import HowItWorks from './_components/HowItWorks'
import CTA from '@/components/globals/CTA'

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <Join />
      <HowItWorks />
      <CTA />
    </div>
  )
}

export default HomePage