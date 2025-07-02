import { usePathname } from "next/navigation";
import React from "react";


const useNavigation = () => {
    const pathname = usePathname()

    const navLinks = React.useMemo(() => [
        {
            name: "pricing",
            url: "/pricing",
            isActive: pathname.startsWith("/pricing")
        },
        {
            name: "faqs",
            url: "/faqs",
            isActive: pathname.startsWith("/faqs")
        },

    ],[pathname])

    return navLinks
}

export default useNavigation