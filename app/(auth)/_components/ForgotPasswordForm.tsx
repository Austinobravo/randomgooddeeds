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
import { ForgotPasswordFormSchema } from "@/lib/formSchema"
// import { useAuthStore } from "@/lib/store/useAuthStore"

const ForgotPasswordForm = () => {
    const router = useRouter()
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
          email: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof ForgotPasswordFormSchema>) {
         try{
            const response = await axios.post('/api/auth/forgot-password', values)
            toast.success("Success", {description: response.data.message})
            form.reset()
            }catch(error: any){
            console.log("error", error)
            const errorMessage = error.response.data.message || "";
            
                if (errorMessage === "Network error") {
                toast.error("Network Error", {
                    description: "Please check your connection and try again.",
                });
            
                } else if (errorMessage === "DATABASE_UNREACHABLE") {
                toast.error("Server Error", {
                    description: "We couldn't reach the database. Please try again later.",
                });
            
                } else if (errorMessage ) {
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
        name={`email`}
        render={({ field }) => (
        <FormItem className="">
            <FormLabel className="!text-black text-sm">Email Address</FormLabel>
            <FormControl>
                <Input  placeholder='Enter email address' {...field} className='!bg-transparent border rounded-lg border-solid h-14 focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none' />
            </FormControl>
            {/* <FormDescription>Start your number with a country code, eg: +234</FormDescription> */}
            
            <FormMessage />
        </FormItem>
        )}
            />
        <Button type='submit' variant={"secondary"} className='shadow-none cursor-pointer bg-blue-500  hover:bg-blue-500/80 px-6 py-4 size-full max-h-14 rounded-full text-white' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Send Reset Link"}</Button>

    </form>
  </Form>
  )
}

export default ForgotPasswordForm
