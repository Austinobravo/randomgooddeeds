import Navbar from '@/components/globals/Navbar'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>
const AuthLayout = ({children}: Props) => {
  return (
    <section>
        <Navbar />
        
        <main className='bg-[#f6fefa]'>
            {children}
        </main>
    </section>
  )
}

export default AuthLayout