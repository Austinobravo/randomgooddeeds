import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatToNaira } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const DashboardPage = () => {
  return (
    <section>
        <h2 className='text-2xl font-bold py-4'>Wallet</h2>
        <div className='flex gap-7'>
            <div className='lg:w-2/5'>
                <Card className='bg-blue-500 text-white'>
                    <CardHeader>
                        <CardTitle>Balance</CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col justify-center-safe items-center gap-2'>
                            <h3 className='font-bold text-3xl'>{formatToNaira(5000.00)}</h3>
                            <p className='text-gray-200 text-sm'>Available</p>
                            <Dialog >
                                <DialogTrigger asChild>
                                
                                    <Button variant={"secondary"} className='w-full rounded-lg min-h-14 cursor-pointer'>Withdraw</Button>
                                </DialogTrigger>
                                <DialogContent className='overflow-auto sm:max-w-md max-h-full no-scrollbar'>
                                    <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                        
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className='space-y-10'>
                                        <h3 className='font-bold text-xl'>Withdraw</h3>
                                        <div className='flex gap-5 items-center justify-between'>
                                            {/* <LogoutModal />
                                            <DialogClose className='w-1/2 cursor-pointer'>
                                                Cancel
                                            </DialogClose> */}
                                        </div>
                                    </div>
                                </DialogContent>
                                </Dialog>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className='text-center text-gray-200 text-sm'>You have to add an account to be able to withdraw your earnings.</p>
                    </CardFooter>
                    </Card>
            </div>
            <div className='lg:w-3/5'></div>

        </div>
        
    </section>
  )
}

export default DashboardPage