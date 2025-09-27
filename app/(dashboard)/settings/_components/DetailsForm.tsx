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
import { toast } from "sonner"
import axios from "axios"
import { updateProfileFormSchema } from "@/lib/formSchema"


export function DetailsForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
 
  // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof updateProfileFormSchema>) {
        try{
              const result = await axios.post(`/api/profile/update-password`, values)
              // console.log("result", result)
              form.reset()
              toast.success("Success",{
                  description: result.data.message
              })
  
              // router.push(`/dashboard`)
  
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

  return (
    <div className="flex not-sm:flex-wrap gap-4">
    <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold">Personal</h2>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:w-3/5">
        {/* <div className="flex gap-2 not-sm:flex-wrap w-full">
        </div> */}
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    This is your first name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    This is your last name.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    This is your phone.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            /> */}
        <div className="ml-auto w-fit">
            <Button type="submit" className="min-h-14">Save and Continue</Button>
        </div>
      </form>
    </Form>

    </div>

  )
}