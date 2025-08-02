"use client"
import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LogoutModal = () => {
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const router = useRouter()
    const Logout = async () => {
      setIsSubmitting(true)
      try{
        const res = await axios.post('/api/auth/logout')
        toast.success("We miss you.",{
          description: "Come back shortly."
        })
        router.push("/login")
        console.error("Logout res", res)
      }catch(err){
        console.error("Logout error", err)
      }finally{
        setIsSubmitting(false)
      }
    }
  return (
    <Button onClick={Logout} type='button' variant={"secondary"} className='shadow-none cursor-pointer text-white bg-red-500  hover:bg-aparte-yellow/80 px-6 py-4 min-h-14 rounded-full w-1/2' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Yes, Log out"}</Button>
  )
}

export default LogoutModal
