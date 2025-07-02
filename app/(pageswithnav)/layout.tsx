import Footer from '@/components/globals/Footer'
import Navbar from '@/components/globals/Navbar'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>
const PagesWithNavLayout = ({children}: Props) => {
  return (
    <section>
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
        
    </section>
  )
}

export default PagesWithNavLayout