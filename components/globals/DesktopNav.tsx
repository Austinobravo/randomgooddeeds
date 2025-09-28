"use client"
import useNavigation from '@/hooks/useNavigation'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const DesktopNav = () => {
    const navLinks = useNavigation()
  return (
    <div className='flex justify-between gap-2 items-center w-full p-4 shadow py-7'>
        <Link href={`/`} className='text-3xl font-bold'>
            <h2>R<span className='text-blue-500'>G</span>D</h2>
        </Link>

        <ul className='flex items-center gap-4 capitalize'>
            {navLinks.map((link) => (
                <li key={link.url} className={`${link.isActive && "text-blue-500 font-bold"}  text-lg transition-all duration-500 ease-in-out hover:font-semibold`}>
                    <Link href={link.url}>{link.name}</Link>
                </li>
            ))}
        </ul>

        <div className='flex gap-5 items-center'>
            <Link href={`/login`} className='hover:underline underline-offset-4'>Login</Link>
            <Link href={`/register`} >
                <Button className='cursor-pointer min-h-12 px-4 bg-blue-500 hover:bg-blue-600 transition-all  overflow-hidden  relative  hover:scale-110 duration-700 py-2 text-white space-x-3 w-fit items-center flex rounded-full'>Become an Affiliate</Button>
            </Link>
        </div>

        
    </div>
  )
}

export default DesktopNav