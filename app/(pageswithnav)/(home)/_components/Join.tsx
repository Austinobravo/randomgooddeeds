import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Join = () => {
  return (
    <div className='flex not-lg:flex-wrap py-30 p-4 gap-x-7 gap-y-5 items-center '>
        <div className='lg:w-3/5 space-y-5'>
            <h3 className='text-4xl font-semibold leading-normal'>Join our <span className='text-blue-500'>Affiliate Network.</span></h3>
            <h4 className='text-muted-foreground text-lg'>We have over 100  products on the affiliate network.</h4>
            <h4 className='text-muted-foreground text-lg'>Random Good Deeds is <Link href={`https://xnyder.com`} className='text-blue-500 font-semibold'>Xnyder's</Link> way of giving back to referrals who help us reach more people and earn by doing that.</h4>
            <h4 className='text-muted-foreground text-lg'>Finally, you have a wide range of products you can refer right now as an affiliate and earn a commission when someone buys a product or paid for a service from your affiliate link.</h4>
        </div>
        <div className='lg:w-2/5'>
            <Image src="/world.svg" width={500} height={500} alt='' className='size-full' />
        </div>
    </div>
  )
}

export default Join