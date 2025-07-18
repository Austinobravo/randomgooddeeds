"use client"
import useNavigation from '@/hooks/useNavigation'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const DesktopNav = () => {
    const navLinks = useNavigation()
  return (
    <div className='flex justify-between gap-2 items-center w-full p-4'>
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

        <div className='flex gap-3 items-center'>
            <Link href={`/login`} className='hover:underline underline-offset-4'>Login</Link>
            <Link href={`/register`}>
                <Button className='cursor-pointer'>Become an Affiliate</Button>
            </Link>
        </div>

        
    </div>
  )
}

export default DesktopNav