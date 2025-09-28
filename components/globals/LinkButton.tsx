import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React, { ComponentProps } from 'react'

type Props = ComponentProps<'a'> &{
    title: string
    icon?: any
    path: string
}
const LinkButton = ({title,icon:Icon,path, ...otherTags}:Props) => {
  return (
    <Link href={path} {...otherTags} className='cursor-pointer min-h-12 px-14 bg-blue-500 hover:bg-blue-600 transition-all  overflow-hidden  relative  hover:scale-110 duration-700 py-2 text-white space-x-3 w-fit items-center flex rounded-full'>
        <span>{title}</span>
        <span className='bg-black inset-0 absolute translate-x-0 opacity-0 delay-75 hover:opacity-50 transition-all duration-700 hover:translate-x-full'></span>
        {/* <Icon/>  */}
    </Link>

  )
}

export default LinkButton