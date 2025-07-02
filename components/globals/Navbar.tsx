import React from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav>
        <div className='lg:flex hidden'>
            <DesktopNav />
        </div>
        <div className='block lg:hidden'>
            <MobileNav />
        </div>
        
    </nav>
  )
}

export default Navbar