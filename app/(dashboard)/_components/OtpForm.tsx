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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const formSchema = z.object({
   pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),


})

type otpFormProps = {
    onSuccess: (data:z.infer<typeof formSchema>) => void
}

export function OtpForm({onSuccess}: otpFormProps) {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onSuccess(values)
    console.log(values)
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className=" space-y-5">
           
            <div className="bg-blue-50 p-4">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">Enter Verification Code</h3>
                    <p className="text-sm leading-relaxed text-gray-500">We have sent a 6 digits verification code to <span className="text-blue-500 font-semibold">austine@gmail.com</span>, the code will expire in 15 mins.</p>
                </div>
                <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                    <FormItem className="mx-auto w-fit py-10">
                    <FormLabel></FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2 text-blue-500 rounded-none text-2xl">
                            <InputOTPSlot index={0} className="min-h-14 w-14 rounded-none"/>
                            <InputOTPSlot index={1} className="min-h-14 w-14"/>
                            <InputOTPSlot index={2} className="min-h-14 w-14"/>
                            <InputOTPSlot index={3} className="min-h-14 w-14"/>
                            <InputOTPSlot index={4} className="min-h-14 w-14"/>
                            <InputOTPSlot index={5} className="min-h-14 w-14"/>
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center">
                        Code expires in 15:00.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

            </div>

        </div>


        <div className="w-full">
            <Button type="submit" className="min-h-14 w-full bg-blue-500 cursor-pointer">Continue</Button>
        </div>
      </form>
    </Form>
    <div className="mx-auto w-fit my-2 text-sm">
        <h4>Didn't get a code?<Button className="text-blue-500 font-bold" variant="ghost">Resend</Button></h4>
    </div>

    </div>

  )
}