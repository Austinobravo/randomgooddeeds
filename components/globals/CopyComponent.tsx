"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

const CopyComponent = ({data}: {data:any}) => {
    const copyData = () => {
        navigator.clipboard.writeText(data)
        toast.info("Copied")
    }
  return (
    <Button size={"icon"} onClick={copyData} className='cursor-pointer'>
        <Copy />  
    </Button>
  )
}

export default CopyComponent