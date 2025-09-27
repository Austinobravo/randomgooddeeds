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
import { toast } from "sonner"
import axios from "axios"

const formSchema = z.object({
  amount: z.string().min(2, {
    message: "Amount must be at least 2 characters.",
  }),


})

type amountFormProps = {
    onSuccess: (data:string) => void
    earningAmount: number | undefined
}

export function AmountForm({onSuccess, earningAmount}: amountFormProps) {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      const result = await axios.post(`/api/profile/send-otp`)
      // console.log("result", result)
      onSuccess(values.amount)

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
                <Input type="number" inputMode="numeric"  min={0} placeholder="N0.00" {...field} className="min-h-14"/>
              </FormControl>
              <FormDescription>
               <span>Available Balance:</span>
               <span>{formatToNaira(earningAmount)}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>


        <div className="w-full">
            {/* <Button type="submit" className="min-h-14 w-full bg-blue-500 cursor-pointer disabled:cursor-not-allowed" disabled={Number(form.watch("amount")) > Number(earningAmount)}>Continue</Button> */}
            <Button type="submit" className="min-h-14 w-full bg-blue-500 cursor-pointer disabled:cursor-not-allowed" disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> : "Continue"}</Button>
        </div>
      </form>
    </Form>

    </div>

  )
}