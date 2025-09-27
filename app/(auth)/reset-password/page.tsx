// /app/reset-password/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

 import React from "react"
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
import { ResetForgotPasswordSchema } from '@/lib/formSchema';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = React.useState<boolean>(false)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const form = useForm<z.infer<typeof ResetForgotPasswordSchema>>({
      resolver: zodResolver(ResetForgotPasswordSchema),
      defaultValues: {
        newPassword: "",
        confirmNewPassword: ""
      },
    })
  const onSubmit = async (values: z.infer<typeof ResetForgotPasswordSchema>) => {
    const payload = { ...values, token };
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) {
       
      setError(data.error || "Something went wrong");
    } else {
      setSuccess("Password successfully reset. Redirecting to login...");
      setTimeout(() => router.push('/login'), 2000);
    }
  };
  const isSubmitting = form.formState.isSubmitting

   useEffect(() => {
      const verifyEmail = async () => {
        if (!token) {
          setError('No token found in URL.');
          return;
        }
  
        try {
          const res = await fetch(`/api/auth/reset-password?token=${token}`);
          if (res.redirected) {
            router.push(res.url); 
          } else if (!res.ok) {
            const data = await res.json();
            setError(data.error || 'Verification failed.');
          } else {
            setSuccess('Token Verified');
          }
        } catch (err) {
          setError('Something went wrong. Please try again.');
        }
      };
  
      verifyEmail();
    }, [token, router]);
  

  return (
    <section className='relative h-screen border'>
            <div className='flex flex-col items-center h-full justify-center gap-5'>
            <div className='shadow sm:max-w-sm w-full rounded-2xl lg:px-8 px-4 py-9 bg-white'>

              <div className=' flex  lg:justify-evenly w-full flex-col justify-between space-y-20 mx-auto'>
                  <div className='space-y-6 text-white lg:text-black'>
                  <div className='space-y-4'>
                      <h3 className='text-xl font-semibold '>Set your new password.</h3>
                      <p className='text-sm'>A mail will be sent to you.</p>
                  </div>
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 w-full`}>
                        <Image src={`/white_logo.png`} width={500} height={500} alt='logo' className='w-40 block lg:hidden' unoptimized/>  
                      
                        <FormField
                                control={form.control}
                                name='newPassword'
                                render={({field}) => (
                                    <FormItem className='!space-y-0 w-full'>
                                        <FormControl>
                                        <div className='flex items-center border pr-1 rounded-md'>
                                              <Input type={isPasswordShown ? 'text' : 'password'} placeholder='Password...' {...field} className='!bg-transparent h-14 border-0 focus-visible:!ring-offset-0 focus-visible:!ring-0' />
                                              <span onClick={() => setIsPasswordShown(!isPasswordShown)}>
                                                  {isPasswordShown ?
                                                  <EyeOff className='cursor-pointer'/>
                                                  :
                                                  <Eye className='cursor-pointer'/>
                                                  }
                      
                                              </span>
                                          </div>
                                        </FormControl>
                                        <FormMessage className='text-red-600 before:content-["*"] pt-1'/>
                                    </FormItem>
                
                                )}
                            />
                        <FormField
                            control={form.control}
                            name='confirmNewPassword'
                            render={({field}) => (
                                <FormItem className='!space-y-0 w-full'>
                                    <FormLabel className=""></FormLabel>
                                    <FormControl>
                                    
                                    <div className='flex items-center border pr-1 rounded-md'>
                                        <Input type={isConfirmPasswordShown ? 'text' : 'password'} placeholder='Confirm Password...' {...field} className='!bg-transparent h-14 border-0 focus-visible:!ring-offset-0 focus-visible:!ring-0' />
                                              <span onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
                                                  {isConfirmPasswordShown ?
                                                  <EyeOff className='cursor-pointer'/>
                                                  :
                                                  <Eye className='cursor-pointer'/>
                                                  }
                      
                                              </span>
                                          </div>
                                    </FormControl>
                                    <FormMessage className='text-red-500 pt-1 text-xs'/>
                                </FormItem>
                
                            )}
                        />
                        
                          <Button type='submit' className='shadow-none cursor-pointer bg-blue-500  hover:bg-blue-500/80 px-6 py-4 size-full max-h-14 rounded-full text-white' disabled={isSubmitting}>{isSubmitting ? <div className="loader mx-auto size-4"/> :  "Submit"}</Button>
                    </form>
                  </Form>
              </div>
              </div>
            </div>
            </div>
            <Image src={`/HandsPhoneRight.png`} width={200} height={200} alt='Vector'  className='bottom-0 right-4 absolute size-80 lg:block hidden'/>
            
        </section>
  );
}
