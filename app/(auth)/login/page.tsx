import React from 'react'
import LoginForm from '../_components/LoginForm'
import Link from 'next/link'
import Image from 'next/image'

const LoginPage = () => {
  return (
    <section className='relative h-screen border'>
        <div className='flex items-center h-full justify-center'>
        <div className='shadow sm:max-w-sm w-full rounded-2xl lg:px-8 px-4 py-6 bg-white '>
            <div className='text-center space-y-2 pb-6'>
                <h2 className='text-xl font-semibold'>Log in to RGD</h2>
                <h3 className='text-sm'>Don't have an account? <Link href={`/register`} className='text-blue-500 font-semibold'>Create one for free.</Link></h3>
            </div>
            <Image src={`/img.png`} width={200} height={200} className='absolute top-7 right-5  sm:size-30 size-15' alt=''/>
            
            <LoginForm />
        </div>

        </div>
        <Image src={`/HandsPhone.png`} width={200} height={200} alt='Vector'  className='bottom-0 absolute size-80 lg:block hidden'/>
        
    </section>
  )
}

export default LoginPage