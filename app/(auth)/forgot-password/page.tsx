import React from 'react'
import LoginForm from '../_components/LoginForm'
import Image from 'next/image'
import ForgotPasswordForm from '../_components/ForgotPasswordForm'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  return (
    <section className='relative h-screen border'>
        <div className='flex flex-col items-center h-full justify-center gap-5'>
        <div className='shadow sm:max-w-sm w-full rounded-2xl lg:px-8 px-4 py-9 bg-white'>
            <div className='text-center space-y-4 pb-12'>
                <h2 className='text-xl font-semibold'>Forgot your password?</h2>
                <h3 className='text-sm'>Enter the email address associated with your RGD account and we'll send you a link to reset your password.</h3>
            </div>
        <Image src={`/img.png`} width={200} height={200} className='absolute top-7 left-5  sm:size-30 size-15' alt=''/>
            
            <ForgotPasswordForm />
        </div>
        <Link href={`/login`} className='text-blue-500 font-semibold text-sm text-center'>Return to Login</Link>
        </div>
        <Image src={`/HandsPhoneRight.png`} width={200} height={200} alt='Vector'  className='bottom-0 right-4 absolute size-80 lg:block hidden'/>
        
    </section>
  )
}

export default ForgotPasswordPage