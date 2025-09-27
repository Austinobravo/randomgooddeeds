import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MessageSquareHeartIcon } from 'lucide-react';
import { formatToNaira } from '@/lib/utils';
import prisma from '@/prisma/prisma';
import { getCurrentUser } from '@/lib/getServerSession';
import NotificationTable from './_components/NotificationTable';

const NotificationPage = async () => {
  const user = await getCurrentUser()
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

const notifications = await prisma.notification.findMany({
  where:{
    userId: user?.id
  },
  orderBy:{
    createdAt: "desc"
  }
})

  return (
    <div>
       <div className='shadow bg-white rounded-2xl p-4'>
            <h3 className='font-bold text-gray-700 text-xl py-4'>Latest Activities</h3>
            <Separator />

            <NotificationTable notifications={notifications} />

        </div>
    </div>
  )
}

export default NotificationPage