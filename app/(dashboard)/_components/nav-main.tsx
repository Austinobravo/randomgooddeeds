"use client"

import { BookOpen, Bot, ChevronRight, Settings2, SquareTerminal, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import LogoutModal from "@/components/globals/LogoutModal";

export function NavMain({
  items,
}: {
  items: {
    first:{
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
    }[],
    second:{
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      }[],
      third:{
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        }[]
    // title: string
    // url: string
    // icon?: LucideIcon
    // isActive?: boolean
    // items?: {
    //   title: string
    //   url: string
    // }[]
  }
}) {
  return (
    <SidebarGroup className="h-full">
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu className="space-y-10 font-lato flex flex-col justify-between h-full">
       
        {/* <div className="space-y-2">
        {items.first.map((item) => (
            <SidebarMenuItem key={item.title} >
                  <Link href={item.url}>
                    <SidebarMenuButton tooltip={item.title} className={`${item.isActive && "rounded-full bg-aparte-yellow flex justify-center items-center hover:bg-aparte-yellow/80"} !cursor-pointer`}>
                      {item.icon && <item.icon size={20} />}
                      <span>{item.title}</span>
                     
                    </SidebarMenuButton>
                  </Link>
            </SidebarMenuItem>
        ))}
        </div> */}
        <div className="space-y-2">
        {items.second.map((item) => (
            <SidebarMenuItem key={item.title}>
               <Link href={item.url}>
                <SidebarMenuButton tooltip={item.title} className={`${item.isActive && "rounded-full bg-aparte-yellow flex justify-center items-center hover:bg-aparte-yellow/80"} !cursor-pointer`}>
                  {item.icon && <item.icon size={20}/>}
                  <span>{item.title}</span>
                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                </SidebarMenuButton>
               </Link>
            </SidebarMenuItem>
        ))}
        </div>
        <div className="space-y-2">
        {items.third.map((item) => (
            <SidebarMenuItem key={item.title}>
               {item.title.toLocaleLowerCase() ===  "log out"  ?
                  <Dialog key={item.title}>
                                <DialogTrigger asChild>
                                <SidebarMenuButton tooltip={item.title} className={`${item.isActive && "rounded-full bg-aparte-yellow flex justify-center items-center hover:bg-aparte-yellow/80"} !cursor-pointer`}>
                                  {item.icon && <item.icon />}
                                  <span>{item.title}</span>
                                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                                </SidebarMenuButton>  
                                </DialogTrigger>
                                <DialogContent className='overflow-auto sm:max-w-md max-h-full no-scrollbar'>
                                    <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                        
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className='space-y-10'>
                                        <h3 className='font-bold text-xl'>Logout from RGD?</h3>
                                        <div className='flex gap-5 items-center justify-between'>
                                            <LogoutModal />
                                            <DialogClose className='w-1/2 cursor-pointer'>
                                                Cancel
                                            </DialogClose>
                                        </div>
                                    </div>
                                </DialogContent>
                                </Dialog>
                                  : 
                                <Link href={item.url}>
                                  <SidebarMenuButton tooltip={item.title} className={`${item.isActive && "rounded-full bg-aparte-yellow flex justify-center items-center hover:bg-aparte-yellow/80"} !cursor-pointer`}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                                  </SidebarMenuButton>
                                </Link>
                                  }
            </SidebarMenuItem>
        ))}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  )
}
