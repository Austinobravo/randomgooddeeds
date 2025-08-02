import { AlignLeft, Blocks, Calendar, LogOut, Mail, MessageSquareDot, MessageSquareMore, NotebookPen, Settings, WalletMinimal } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
export const useDashboardNavigation = () => {
    const pathname = usePathname()
    const navLinks = React.useMemo(() => ({

          first: [
            // {
            //   title: "My Reservation",
            //   url: "/reservation",
            //   icon: NotebookPen,
            // isActive: pathname.startsWith("/reservation")
            // },
            // {
            //   title: "Notifications",
            //   url: "/notifications",
            //   icon: MessageSquareDot,
            //   isActive: pathname.startsWith("/notifications")
            // },
            
          ],
          second: [
        
            {
              title: "Overview",
              url: "/dashboard",
              icon: AlignLeft,
              isActive: pathname.startsWith("/overview")
            },
            // {
            //   title: "Listing",
            //   url: "/listing",
            //   icon: Blocks,
            //   isActive: pathname.startsWith("/listing")
            // },
            {
              title: "Earning",
              url: "/earning",
              icon: WalletMinimal,
              isActive: pathname.startsWith("/earning")
            },
            // {
            //   title: "Message",
            //   url: "/message",
            //   icon: Mail,
            //   isActive: pathname.startsWith("/message")
            // },
            // {
            //   title: "Calendar",
            //   url: "/calendar",
            //   icon: Calendar,
            //   isActive: pathname.startsWith("/calendar")
            // },
            
          ],
          third: [
            {
              title: "Support",
              url: "/support",
              icon: Settings,
              isActive: pathname.startsWith("/support")
            },
            {
              title: "Settings",
              url: "/settings",
              icon: MessageSquareMore,
              isActive: pathname.startsWith("/settings")
            },
            {
              title: "Log out",
              url: "/Logout",
              icon: LogOut,
              isActive: pathname.startsWith("/Logout")
            },
          ],
        }), [pathname])
    return navLinks
}

