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
        // const email = values.email
        // router.push(`/verify-email?email=${encodeURIComponent(email)}`)
        const payload= {
                "username": values.username_or_email,
                "password": values.password

        }
          try{
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, payload)
            console.log("result", result)
            await axios.post('/api/auth/set-cookie', {
                accessToken: result.data.data.tokens.accessToken,
                refreshToken: result.data.data.tokens.refreshToken
            });
            
            const profileRes = await fetch("/api/profile");
            if (profileRes.ok) {
                const user = await profileRes.json();
                console.log("user", user)
                // useAuthStore.getState().setUser(user.data.profile); 
            }
            toast.success("Success", {
            description: "Login Successful.",
            });

            router.push(`/account`)

        }catch (error: any) {
            const errorMessage = error.response.data.message || error.response.data.error || "";

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
                description: typeof error === "string" ? error : "An unexpected error occurred.",
            });
            }
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
            <FormLabel className="!text-black ">Phone Number or Email Address</FormLabel>
            <FormControl>
                <Input  placeholder='Enter email address or phone number' {...field} className='!bg-transparent border rounded-full border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
            </FormControl>
            <FormDescription>Start your number with a country code, eg: +234</FormDescription>
            
            <FormMessage />
        </FormItem>
        )}
            />
    <FormField
        control={form.control}
        name={`password`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black ">Password</FormLabel>
            <FormControl>
            <div className='flex items-center px-1 border rounded-full border-solid'>
                <Input type={isPasswordShown ? 'text' : 'password'}  placeholder='Enter Password' {...field} className='!bg-transparent border-0  h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                <span onClick={() => setIsPasswordShown(!isPasswordShown)} className='cursor-pointer hover:bg-gray-100 rounded-md'>
                    {isPasswordShown ?
                    <EyeOff />
                    :
                    <Eye />
                    }

                </span>
            </div>
            </FormControl>
            <FormDescription>Your password must be six characters.</FormDescription>

            
            <FormMessage />
        </FormItem>
        )}
            />
        <div className="w-fit ml-auto font-lato">
            <Link href={`/forgot-password`}>Forgot Password?</Link>
        </div>
        <Button type='submit' variant={"secondary"} className='shadow-none cursor-pointer bg-aparte-yellow  hover:bg-aparte-yellow/80 px-6 py-4 size-full max-h-14 rounded-full' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Sign In"}</Button>

    </form>
  </Form>
  )
}

export default LoginForm
