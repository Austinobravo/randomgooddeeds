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
    const [emailNotVerified, setEmailNotVerified] = React.useState<boolean>(false)
    const [isResending, setIsResending] = React.useState<boolean>(false)

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
              const result = await signIn("credentials", 
                {
                  email: values.username_or_email.trim().toLocaleLowerCase(),
                  password: values.password.trim(),
                  redirect: false
                }
              )

              if (result?.error) {
                try {
                  const parsedError = JSON.parse(result.error);
                  if (parsedError.code === "EMAIL_NOT_VERIFIED") {
                    setEmailNotVerified(true);
                    toast.error("Error", {
                      description: parsedError.message,
                  });
                  }
                  
                } catch (err) {
                  const errorMessage = result?.error || "";
                  if (errorMessage === "Network error") {
                    toast.error("Network Error", {
                      description: "Please check your connection and try again.",
                    });
                
                  } else if (errorMessage === "DATABASE_UNREACHABLE") {
                    toast.error("Server Error", {
                      description: "We couldn't reach the database. Please try again later.",
                    });
                
                  }else if (errorMessage ) {
                    toast.error("Error", {
                      description: `${errorMessage}`,
                    });
                
                  } else {
                    toast.error("Unexpected Error", {
                      description: typeof err === "string" ? err : "An unexpected error occurred.",
                    });
                  }
                }
                return;
              }

            //   if (values.remember) {
            //     localStorage.setItem(STORAGE_KEY, values.email.trim());
            //   } else {
            //     localStorage.removeItem(STORAGE_KEY);
            //   }

              return router.push("/dashboard")
    }catch(error: any){
      toast.error("Error", {
        description: error,
    })

    }
      }
    
      const isSubmitting = form.formState.isSubmitting
    
  const handleResendLink = async () => {
    const email = form.getValues("username_or_email").trim().toLowerCase()
    setIsResending(true)
    try{
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    
      const data = await res.json()
    
      if (res.ok) {
        toast.success("Success", {
          description: "Verification link sent",
      });
  
      } else {
        toast.error("Error", {
          description: data.message || "Failed to send verification link",
      })
      }

    }catch(error:any){
      toast.error("Error", {
        description: error.message || "Failed to send verification link",
    })
    }finally{
      setIsResending(false)
    }
  
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {emailNotVerified && (
        <div className="flex bg-red-100 gap-5  flex-wrap lg:flex-nowrap justify-between items-center px-4 py-2 rounded-lg">
          <div>
            <h3 className="text-xl text-red-500">Resend a verification mail</h3>
            <p className="text-gray-400 text-sm">Please check your spam folder before making a request</p>
          </div>
          <Button onClick={handleResendLink} type="button" className="bg-blue-800 w-full lg:w-fit cursor-pointer hover:bg-blue-900 h-14 lg:h-fit text-white transition-all duration-500"disabled={isResending}>{isResending ? <div className="loader mx-auto size-4"/> : "Resend Link"}</Button>
        </div>
        
      )}

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
