"use client"

import * as React from "react"

// import { NavProjects } from "./nav-projects"
// import { NavUser } from "./nav-user"
// import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useDashboardNavigation } from "@/hooks/useDashboardNavigation"
import { NavMain } from "./nav-main"

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useDashboardNavigation()
  return (
    <Sidebar collapsible="icon" {...props}  customClassName="!bg-blue-900 text-white">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {/* <Logo /> */}
        
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <NavMain items={data} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
