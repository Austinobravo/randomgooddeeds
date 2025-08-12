"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn, useSession } from 'next-auth/react'

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import axios from "axios"
import { LoginFormSchema } from "@/lib/formSchema"
// import { useAuthStore } from "@/lib/store/useAuthStore"

const LoginForm = () => {
    const router = useRouter()
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          username_or_email: "",
          password: ""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
         try{
      const data = await signIn("credentials", 
        {
          email: values.username_or_email.trim(),
          password: values.password.trim(),
          redirect: false
        }
      )

      if (data?.error) return  toast.error("Error", {
        description: data.error,
    })

    if(data?.url){
        toast.success("Success", {
          description: "Login successful.",
      })

    //   if (values.remember) {
    //     localStorage.setItem(STORAGE_KEY, values.email.trim());
    //   } else {
    //     localStorage.removeItem(STORAGE_KEY);
    //   }

      return router.push("/dashboard")

    } 



    }catch(error: any){
      toast.error("Error", {
        description: error,
    })

    }
      }
    
      const isSubmitting = form.formState.isSubmitting
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
        control={form.control}
        name={`username_or_email`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black text-sm">Username or Email Address</FormLabel>
            <FormControl>
                <Input  placeholder='Enter email address or username' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
            </FormControl>
            {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
            
            <FormMessage />
        </FormItem>
        )}
            />
    <FormField
        control={form.control}
        name={`password`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black text-sm">Password</FormLabel>
            <FormControl>
            <div className='flex items-center px-1 border rounded-lg border-solid'>
                <Input type={isPasswordShown ? 'text' : 'password'}  placeholder='Enter Password' {...field} className='!bg-transparent border-0  h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                <span onClick={() => setIsPasswordShown(!isPasswordShown)} className='cursor-pointer hover:bg-gray-100 p-3 rounded-md'>
                    {isPasswordShown ?
                    <EyeOff />
                    :
                    <Eye />
                    }

                </span>
            </div>
            </FormControl>
            {/* <FormDescription>Your password must be six characters.</FormDescription> */}

            
            <FormMessage />
        </FormItem>
        )}
            />
        <div className="w-fit ml-auto font-jost">
            <Link href={`/forgot-password`} className="text-sm text-blue-500 font-semibold">Forgot Password?</Link>
        </div>
        <Button type='submit' variant={"secondary"} className='shadow-none cursor-pointer bg-blue-500  hover:bg-blue-500/80 px-6 py-4 size-full max-h-14 rounded-full text-white' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Sign In"}</Button>

    </form>
  </Form>
  )
}

export default LoginForm
