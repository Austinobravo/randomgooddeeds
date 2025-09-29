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
  bankName: z.string().min(2, {
    message: "Bank Name must be at least 2 characters.",
  }),
  accountName: z.string().min(2, {
    message: "Account Name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(2, {
    message: "Account Number must be at least 2 characters.",
  }),

})

type BankDetailsFormProps = {
    onSuccess: (data: z.infer<typeof formSchema>) => void
}

export function BankDetailsForm({onSuccess}:BankDetailsFormProps) {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onSuccess(values)
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="First Bank" {...field} className="min-h-14"/>
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                    <Input placeholder="0003933" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} className="min-h-14 w-full"/>
                </FormControl>
                <FormDescription>
                    
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

        <div className="w-full">
            <Button type="submit" className="min-h-14 w-full bg-blue-500 cursor-pointer">Continue</Button>
        </div>
      </form>
    </Form>

    </div>

  )
}