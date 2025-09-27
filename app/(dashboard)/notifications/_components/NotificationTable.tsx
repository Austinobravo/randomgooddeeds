"use client"
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Notification } from '@/lib/generated/prisma';
import { formatToNaira } from '@/lib/utils';
import { MessageSquareHeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';

const NotificationTable = ({notifications}: {notifications:Notification[]}) => {
    const [ notification, setNotification] = React.useState<Notification | undefined | null>(undefined)
    const [ isModalOpen, setModalOpen] = React.useState<boolean>(false)

    const getNotification = async (id:string) => {
         try{
            const result = await axios(`/api/notification/${id}`)
            setNotification(result.data)

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
  return (
     <ul className=''>
                {notifications.length <= 0 &&
                    <p className='py-10 text-center text-muted-foreground'>No Notifications yet.</p>
                }
                {notifications.map((activity, index) => (
                        <li  key={index} onClick={() => getNotification(activity.id)} className='flex flex-col py-2 hover:bg-gray-100 rounded-lg px-2'>
                            <span className='font-semibold font-sm text-amber-500'>{activity.title}</span>
                            <span className='text-gray-500 text-xs'>{activity.createdAt.toString()}</span>
                        </li>
                ))}
                  <Dialog onOpenChange={setModalOpen} open={isModalOpen}>
                    <DialogTrigger>
                    </DialogTrigger>
                    <DialogContent className='overflow-auto sm:max-w-lg max-h-full no-scrollbar'>
                        <DialogHeader>
                        <DialogTitle>Notification Details</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                        </DialogHeader>
                        {notification === undefined ?
                        <div className='space-y-4'>
                            <div className="space-y-4 py-4">
                                <div>

                                    <h3 className="font-semibold h-2 bg-gray-200 animate-pulse"></h3>
                                    {/* <h4 className="text-gray-500 text-sm">Trans ID: 0Xddjdkhd83hhednd</h4> */}
                                </div>
                                <div>
                                    <h3 className="font-semibold bg-gray-200 h-2"></h3>
                                    {/* <h4 className="text-sm text-amber-500">Pending</h4> */}
                                </div>
                            </div>
                            <div className='space-y-2'>
                              <h4 className="font-bold text-xl h-2 bg-gray-200 animate-pulse"></h4>
                              <p className='whitespace-pre-wrap h-4 bg-gray-200 animate-pulse'></p>

                            </div>
                            <div>

                            </div>
                        </div>
                        :
                            notification === null ?
                            <p>Notification is probably deleted.</p>
                            :
                            <div className='space-y-10'>
                                <div className="flex border-y border-solid justify-between py-4">
                                    <div>

                                        <h3 className="font-semibold">{notification.createdAt.toString()}</h3>
                                        {/* <h4 className="text-gray-500 text-sm">Trans ID: 0Xddjdkhd83hhednd</h4> */}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold"></h3>
                                        {/* <h4 className="text-sm text-amber-500">Pending</h4> */}
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                <h4 className="font-bold text-xl">{notification.title}</h4>
                                <p className='whitespace-pre-wrap'>{notification.body}</p>

                                </div>
                                <div>
                                <div className="flex justify-between items-center bg-violet-50 rounded-lg p-4 space-y-4">
                                <div>
                                    <h3 className="font-bold ">Need Help?</h3>
                                    <p className="text-gray-700 text-xs">If you have any issue, make sure to contact support.</p>
                                </div>
                                <Link href={`mailto:info@xnyder.com`}>
                                    <Button className="bg-violet-500 cursor-pointer text-white"><MessageSquareHeartIcon /> Support</Button>
                                </Link>
                                </div>

                                </div>
                                {/* <Button className="bg-blue-500 cursor-pointer text-white min-h-14 w-full">Print</Button> */}
                            </div>

                        }
                    </DialogContent>
                    </Dialog>
            </ul>
  )
}

export default NotificationTable