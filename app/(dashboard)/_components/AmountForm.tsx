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
import { formatToNaira } from "@/lib/utils"

const formSchema = z.object({
  amount: z.string().min(2, {
    message: "Amount must be at least 2 characters.",
  }),


})

export function AmountForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="">
            <div>
                <h4 className="font-bold text-lg">Amount</h4>
                <h5 className="text-gray-500 text-sm">How much would you want to withdraw?</h5>
            </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel></FormLabel>
              <FormControl>
                <Input placeholder="N0.00" {...field} className="min-h-14"/>
              </FormControl>
              <FormDescription>
               <span>Available Balance:</span>
               <span>{formatToNaira(3000)}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>


        <div className="w-full">
            <Button type="submit" className="min-h-14 w-full bg-blue-500 cursor-pointer">Continue</Button>
        </div>
      </form>
    </Form>

    </div>

  )
}