"use client"
import useNavigation from '@/hooks/useNavigation'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const DesktopNav = () => {
    const navLinks = useNavigation()
  return (
    <div className='flex justify-between gap-2 items-center w-full p-4'>
        <div className='text-xl font-bold'>
            <h2>R<span className='text-blue-500'>G</span>D</h2>
        </div>

        <ul className='flex items-center gap-2'>
            {navLinks.map((link) => (
                <li>
                    <Link href={link.url}>{link.name}</Link>
                </li>
            ))}
        </ul>

        <div>
            <Link href={``}>Login</Link>
            <Link href={``}>
                <Button>Become an Affiliate</Button>
            </Link>
        </div>

        
    </div>
  )
}

export default DesktopNav