import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HomeHero = () => {
  return (
    <div className='bg-[#f6fefa] container py-20 min-h-40 flex flex-col justify-center items-center gap-3  text-center'>
      <h2 className='text-sm font-medium'>Join the Xnyder Affiliate Program</h2>
      <h3 className='lg:text-5xl text-3xl font-bold leading-normal '>EARN EXTRA INCOME <br/> PROMOTING XNYDER’S PRODUCTS</h3>
      <p className='max-w-lg'>Explore the affiliate marketplace in xnyder with thousands of products to choose from and start promoting right away.</p>
      <Link href={``}>
        <Button className='cursor-pointer min-h-12 px-14'>Get Started</Button>
      </Link>
      
    </div>
  )
}

export default HomeHero