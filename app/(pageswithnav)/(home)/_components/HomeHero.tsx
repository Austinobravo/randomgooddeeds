import LinkButton from '@/components/globals/LinkButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HomeHero = () => {
  return (
    <div className='bg-blue-50 container py-20 min-h-40 flex flex-col justify-center items-center gap-5  text-center'>
      <h2 className='text-xs font-semibold bg-[#e1efff] p-2 rounded-full'>Join the Xnyder Affiliate Program</h2>
      <h3 className='lg:text-4xl text-2xl font-bold leading-normal '>EARN EXTRA INCOME <br/> PROMOTING XNYDER’S PRODUCTS</h3>
      <p className='max-w-lg text-muted-foreground'>Explore the affiliate marketplace in xnyder with thousands of products to choose from and start promoting right away.</p>
      {/* <Link href={``} className='mt-5 relative overflow-hidden'>
        <Button className='cursor-pointer min-h-12 px-14 bg-blue-500 hover:bg-blue-600 transition-all'>Get Started</Button>
        <span className='bg-black inset-0 absolute translate-x-0 opacity-0 delay-75 hover:opacity-50 transition-all duration-700 hover:translate-x-full rounded-ee-2xl'></span>
      </Link> */}
      <LinkButton path='/register' title='Get Started' className='mt-5'/>
      
    </div>
  )
}

export default HomeHero