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

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

import { Separator } from '@/components/ui/separator';
import TransactionTable from '../_components/TransactionTable';
import data from "../_components/data.json"
import WithdrawDialog from '../_components/WithdrawDialog';
import { getCurrentUser } from '@/lib/getServerSession';
import prisma from '@/prisma/prisma';
import NotificationTable from '../notifications/_components/NotificationTable';


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
const DashboardPage = async () => {
     const user = await getCurrentUser()
    
        const dbTransactions = await prisma.transaction.findMany({
            where:{
                userId: user?.id
    
            },
            orderBy:{
                createdAt: "desc"
            }
        })
        const notifications = await prisma.notification.findMany({
            where:{
                userId: user?.id
    
            },
            orderBy:{
                createdAt: "desc"
            }
        })

        const dbEarnings = await prisma.earning.findFirst({
            where:{
                userId: user?.id
    
            },
        })

        const earning = {
            ...dbEarnings,
            amount: dbEarnings?.amount?.toNumber() || 0
        }
        
        const transactions = dbTransactions.map((tx) => ({...tx, amount: tx.amount.toNumber()}))

  return (
    <section>
        <h2 className='text-2xl font-bold py-4'>Wallet</h2>
        <div className='flex gap-7 not-lg:flex-wrap'>
            <div className='lg:w-2/5 w-full space-y-7'>
                <Card className='bg-blue-500 text-white'>
                    <CardHeader>
                        <CardTitle>Balance</CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col justify-center-safe items-center gap-2'>
                            <h3 className='font-bold text-3xl'>{formatToNaira(earning.amount)}</h3>
                            <p className='text-gray-200 text-sm'>Available</p>
                            <WithdrawDialog earningAmount={earning.amount}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className='text-center text-gray-200 text-sm'>You have to add an account to be able to withdraw your earnings.</p>
                    </CardFooter>
                    </Card>
                <div className='shadow bg-white rounded-2xl p-4'>
                    <h3 className='font-bold text-gray-700 text-xl py-4'>Latest Activities</h3>
                    <Separator />
                     <NotificationTable notifications={notifications.slice(0,5)} />

                </div>
            </div>
            <div className='lg:w-3/5 w-full'>
            <TransactionTable data={transactions} />
            </div>

        </div>
        
    </section>
  )
}

export default DashboardPage