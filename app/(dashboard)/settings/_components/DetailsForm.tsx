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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
})

export function DetailsForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex not-sm:flex-wrap gap-4">
    <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold">Personal</h2>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:w-3/5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="min-h-14"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 not-sm:flex-wrap w-full">
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
        </div>
            <FormField
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
            />
        <div className="ml-auto w-fit">
            <Button type="submit" className="min-h-14">Save and Continue</Button>
        </div>
      </form>
    </Form>

    </div>

  )
}