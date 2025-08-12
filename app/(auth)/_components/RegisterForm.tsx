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
import { CheckCheck, CheckCircle, Eye, EyeOff } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import axios from "axios"
import { RegisterFormSchema } from "@/lib/formSchema"
// import { useAuthStore } from "@/lib/store/useAuthStore"

const RegisterForm = () => {
    const router = useRouter()
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          confirmPassword: "",
          password: ""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        // const email = values.email
        // router.push(`/verify-email?email=${encodeURIComponent(email)}`)
          try{
            const result = await axios.post(`api/auth/register`, values)
            console.log("result", result)

            router.push(`/dashboard`)

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-3">
            <FormField
                control={form.control}
                name={`firstName`}
                render={({ field }) => (
                <FormItem className="">
                    <FormLabel className="!text-black text-xs">First Name</FormLabel>
                    <FormControl>
                        <Input  placeholder='John' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                    </FormControl>
                    {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
                    
                    <FormMessage />
                </FormItem>
                )}
                    />
            <FormField
                control={form.control}
                name={`lastName`}
                render={({ field }) => (
                <FormItem className="">
                    <FormLabel className="!text-black text-xs">Last Name</FormLabel>
                    <FormControl>
                        <Input  placeholder='Parkings' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                    </FormControl>
                    {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
                    
                    <FormMessage />
                </FormItem>
                )}
                    />
        </div>
        <div>
        <FormField
            control={form.control}
            name={`username`}
            render={({ field }) => (
            <FormItem className="">
                <FormLabel className="!text-black text-xs">Username</FormLabel>
                <FormControl>
                    <Input  placeholder='Johnparkings' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                </FormControl>
                {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
                
                <FormMessage />
            </FormItem>
            )}
                />
        <FormField
            control={form.control}
            name={`email`}
            render={({ field }) => (
            <FormItem className="">
                <FormLabel className="!text-black text-xs">Email Address</FormLabel>
                <FormControl>
                    <Input type="email"  placeholder='Johnparkings@mail.com' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                </FormControl>
                {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
                
                <FormMessage />
            </FormItem>
            )}
                />

        </div>
    <FormField
        control={form.control}
        name={`password`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black text-xs">Password</FormLabel>
            <FormControl>
            <div className='flex items-center px-1 border rounded-lg border-solid'>
                <Input type={isPasswordShown ? 'text' : 'password'}  placeholder='Password' {...field} className='!bg-transparent border-0  h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
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
            <div className="text-xs space-y-2">
                <div className="flex gap-1 items-center">
                    <CheckCheck className="text-red-500 size-5"/>
                    <p>Must contain 6 characters</p>
                </div>
                <div className="flex gap-1 items-center">
                    <CheckCheck  className="text-red-500 size-5"/>
                    <p>Must contain digits</p>
                </div>
                <div className="flex gap-1 items-center">
                    <CheckCheck className="text-red-500 size-5" />
                    <p>Must contain special characters</p>
                </div>
                <div className="flex gap-1 items-center">
                    <CheckCheck className="text-red-500 size-5" />
                    <p>Must contain uppercase and lowercase characters</p>
                </div>
            </div>
    <FormField
        control={form.control}
        name={`confirmPassword`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black text-xs">Confirm Password</FormLabel>
            <FormControl>
            <div className='flex items-center px-1 border rounded-lg border-solid'>
                <Input type={isConfirmPasswordShown ? 'text' : 'password'}  placeholder='Confirm Password' {...field} className='!bg-transparent border-0  h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
                <span onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)} className='cursor-pointer hover:bg-gray-100 p-3 rounded-md'>
                    {isConfirmPasswordShown ?
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
        {/* <div className="w-fit ml-auto font-jost">
            <Link href={`/forgot-password`} className="text-sm text-blue-500 font-semibold">Forgot Password?</Link>
        </div> */}
        <Button type='submit' variant={"secondary"} className='shadow-none cursor-pointer bg-blue-500  hover:bg-blue-500/80 px-6 py-4 size-full max-h-14 rounded-full text-white' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Create account"}</Button>

    </form>
  </Form>
  )
}

export default RegisterForm
