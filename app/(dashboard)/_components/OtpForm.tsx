"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Transaction } from "@/lib/generated/prisma"
import confetti from "canvas-confetti"

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type otpFormProps = {
  onSuccess: (data: Transaction) => void
  amount: string | null
  bankDetails: bankProps | null
}

type bankProps = {
    bankName: string;
    accountName: string;
    accountNumber: string;
}

export function OtpForm({ onSuccess, amount, bankDetails }: otpFormProps) {
  const {data:session} = useSession()
  const user = session?.user

  const countDownTime = 60 * 10 //10 mins
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  })

  // countdown state
  const [timeLeft, setTimeLeft] = useState(countDownTime) 
  const [isCounting, setIsCounting] = useState(true)

  // real-time countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isCounting, timeLeft])

  // format countdown into mm:ss
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      pin: values.pin,
      amount: amount,
      bankName: bankDetails?.bankName,
      accountName: bankDetails?.accountName,
      accountNumber: bankDetails?.accountNumber
    }

    try {
      const result = await axios.post(`/api/profile/verify-otp`, payload)
      onSuccess(result.data)
      confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || ""

      if (errorMessage === "Network error") {
        toast.error("Network Error", {
          description: "Please check your connection and try again.",
        })
      } else if (errorMessage === "DATABASE_UNREACHABLE") {
        toast.error("Server Error", {
          description: "We couldn't reach the database. Please try again later.",
        })
      } else if (errorMessage) {
        toast.error("Error", {
          description: `${errorMessage}`,
        })
      } else {
        toast.error("Unexpected Error", {
          description:
            typeof error === "string"
              ? error
              : "An unexpected error occurred.",
        })
      }
    }
  }

  async function resendOtp() {
    try {
      await axios.post(`/api/profile/send-otp`)
      toast.success("A new OTP has been sent to your email.")

      // restart countdown
      setTimeLeft(countDownTime) 
      setIsCounting(true)
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || ""

      if (errorMessage === "Network error") {
        toast.error("Network Error", {
          description: "Please check your connection and try again.",
        })
      } else if (errorMessage === "DATABASE_UNREACHABLE") {
        toast.error("Server Error", {
          description: "We couldn't reach the database. Please try again later.",
        })
      } else if (errorMessage) {
        toast.error("Error", {
          description: `${errorMessage}`,
        })
      } else {
        toast.error("Unexpected Error", {
          description:
            typeof error === "string"
              ? error
              : "An unexpected error occurred.",
        })
      }
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className=" space-y-5">
            <div className="bg-blue-50 p-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Enter Verification Code</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  We have sent a 6 digits verification code to{" "}
                  <span className="text-blue-500 font-semibold">
                    {user?.email}
                  </span>
                  , the code will expire in 10 mins.
                </p>
              </div>
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="mx-auto w-fit py-10">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2 text-blue-500 rounded-none text-2xl">
                          <InputOTPSlot
                            index={0}
                            className="min-h-14 w-14 rounded-none"
                          />
                          <InputOTPSlot index={1} className="min-h-14 w-14" />
                          <InputOTPSlot index={2} className="min-h-14 w-14" />
                          <InputOTPSlot index={3} className="min-h-14 w-14" />
                          <InputOTPSlot index={4} className="min-h-14 w-14" />
                          <InputOTPSlot index={5} className="min-h-14 w-14" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center">
                      Code expires in{" "}
                      <span className="font-semibold">
                        {formatTime(timeLeft)}
                      </span>
                      .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full">
            <Button
              type="submit"
              className="min-h-14 w-full bg-blue-500 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="loader mx-auto size-4"/> : "Continue"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="mx-auto w-fit my-2 text-sm">
        <h4>
          Didn't get a code?
          <Button
            className="text-blue-500 font-bold"
            variant="ghost"
            type="button"
            onClick={resendOtp}
            disabled={isCounting && timeLeft > 0}
          >
            {isCounting && timeLeft > 0
              ? `Resend available in ${formatTime(timeLeft)}`
              : "Resend"}
          </Button>
        </h4>
      </div>
    </div>
  )
}
