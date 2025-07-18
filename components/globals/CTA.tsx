import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const CTA = () => {
  return (
    <div className='bg-blue-500 text-white rounded-2xl py-20 space-y-5 text-center px-5 flex flex-col items-center justify-center-safe'>
        <h2 className='lg:text-4xl text-2xl font-bold'>Start Earning from Xynder referrals.</h2>
        <h3 className='lg:text-lg text-sm'>Create a free account in less than 5 minutes and start selling!</h3>
        <div className='space-x-2 flex not-sm:flex-wrap gap-3 items-center'>
            <Link href={``} className='w-full sm:w-fit'>
                <Button className='bg-white hover:bg-white cursor-pointer py-7 text-sm font-medium text-blue-500 w-full sm:w-fit'>Get Started for free</Button>
            </Link>
            <Link href={``} className='w-full sm:w-fit'>
                <Button variant={"link"} className='border border-solid cursor-pointer rounded-lg py-7 text-white !no-underline w-full sm:w-fit'>See a live demo</Button>
            </Link>
        </div>
    </div>
  )
}

export default CTA