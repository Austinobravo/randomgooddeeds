import Link from 'next/link'
import React from 'react'
import RegisterForm from '../_components/RegisterForm'
import Image from 'next/image'

const RegisterPage = () => {
  return (
    <section className='flex w-full '>
        <div className='lg:w-1/2 py-10 px-5 space-y-3 relative'>
            <h3 className='text-xl font-semibold text-center '>Create a RGD account</h3>
            <h4 className='text-sm text-center pb-4'>Already have an account? <Link href={`/login`} className='text-blue-500 font-semibold'>Log in</Link></h4>
            <Image src={`/img.png`} width={200} height={200} className='absolute top-7 left-5  sm:size-30 size-15' alt=''/>
            <RegisterForm />

        </div>
        <div className='bg-blue-500 lg:w-1/2 text-white text-center py-10 space-y-3'>
            <h3 className='text-2xl font-bold'>Join 1,500+ RGD users today!</h3>
            <h4 className='max-w-lg mx-auto text-sm font-medium'>RGD allows you to buy and sell any kind of digital product or service anywhere in the world seamlessly.</h4>
        </div>
    </section>
  )
}

export default RegisterPage