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
import axios from "axios"
import { toast } from "sonner"
import { updatePasswordFormSchema } from "@/lib/formSchema"

const updatePasswordupdatePasswordFormSchema = z.object({
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  newPassword: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  confirmNewPassword: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
})

export function PasswordForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof updatePasswordFormSchema>) {
      try{
            const result = await axios.post(`/api/profile/update-password`, values)
            // console.log("result", result)
            // form.reset()
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


  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="flex not-sm:flex-wrap gap-4">
    <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold">Password</h2>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:w-3/5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="min-h-14"/>
              </FormControl>
              <FormDescription>
                This is your current password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 not-sm:flex-wrap w-full">
            <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    This is your new password.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    Confirm new password.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="ml-auto w-fit">
          <Button type="submit" className="min-h-14"disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Save and Continue"}</Button>

        </div>
      </form>
    </Form>

    </div>

  )
}