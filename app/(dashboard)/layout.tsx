import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardSidebar } from './_components/DashboardSidebar'
import { Bell, Globe, MessageCircle, Search, Share, Share2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CopyComponent from '@/components/globals/CopyComponent'
import { getCurrentUser } from '@/lib/getServerSession'
import { redirect } from 'next/navigation'

export const dynamic = "force-dynamic"

type Props = React.PropsWithChildren<{}>

const DashboardLayout = async ({children}: Props) => {
  const user = await getCurrentUser()
  if(!user) redirect(`/login`)
  return (
       <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className='overflow-x-hidden '>
        <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-solid border-[#EFEFEF]">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center border rounded-full border-solid border-gray-100 px-2 py-1">
                <Search />
                <Input placeholder="Search everything here.." className='!bg-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 shadow-none outline-none border-0 lg:min-w-xs' />
              </div>

            </div>
            <div className='flex items-center gap-5'>
                <div className="sm:flex hidden gap-2 items-center ">
                    <div className='bg-gray-100 rounded-sm p-2 '>
                        {"https://randomdeeds.com/austinobravo".slice(0,30)}...
                    </div>
                    <div className='cursor-pointer'>
                        <CopyComponent data={" https://randomdeeds.com/austinobravo"}/>
                    </div>

                </div>
                        {/* <Button className={`text-black hover:text-white hidden rounded-full lg:flex items-center bg-transparent border border-solid border-gray-500 cursor-pointer `}><Share2 /> Share</Button> */}
                        {/* <MessageCircle /> */}
                        <Link href={`/notifications`} className='relative'>
                            <span className='absolute -top-3 -right-2 bg-red-500 text-white text-[12px] rounded-full p-[2px]'>20</span>
                            <Bell />

                        </Link>
                        {/* <ProfileDropdown user={user}/> */}
                  </div>
          </div>
        </header>
        <div className="bg-gray-50 p-10 h-full">
            <div className="sm:hidden flex gap-5 items-center pb-4">
                    <div className='bg-gray-100 rounded-lg p-2 '>
                        {"https://randomdeeds.com/austinobravo".slice(0,30)}...
                    </div>
                    <div className='cursor-pointer'>
                        <CopyComponent data={" https://randomdeeds.com/austinobravo"}/>
                    </div>

                </div>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout