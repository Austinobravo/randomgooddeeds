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
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import TransactionTable from '../_components/TransactionTable';
import data from "../_components/data.json"
const recentActivities = [
    {
        title: "You have a new notification",
        createdAt: "8th March, 2025"
    },
    {
        title: "You made a new withdrawal",
        createdAt: "8th April, 2025"
    },
    {
        title: "You got a new deposit",
        createdAt: "8th March, 2025"
    },
]
const DashboardPage = () => {
  return (
    <section>
        <h2 className='text-2xl font-bold py-4'>Wallet</h2>
        <div className='flex gap-7'>
            <div className='lg:w-2/5 space-y-7'>
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
                <div className='shadow bg-white rounded-2xl p-4'>
                    <h3 className='font-bold text-gray-700 text-xl py-4'>Latest Activities</h3>
                    <Separator />
                    <ul className=''>
                        {recentActivities.map((activity, index) => (
                            <Link href={``} key={index} className=''>
                                <li className='flex flex-col py-2 hover:bg-gray-100 rounded-lg px-2'>
                                    <span className='font-semibold font-sm text-amber-500'>{activity.title}</span>
                                    <span className='text-gray-500 text-xs'>{activity.createdAt}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>

                </div>
            </div>
            <div className='lg:w-3/5'>
            <TransactionTable data={data} />
            </div>

        </div>
        
    </section>
  )
}

export default DashboardPage