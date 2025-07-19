"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import useNavigation from "@/hooks/useNavigation";

export default function MobileNav() {
  const navLinks = useNavigation();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between w-full px-5 py-7 lg:hidden">
      {/* Logo */}
      <Link href="/" >
        <div className='text-3xl font-bold'>
            <h2>R<span className='text-blue-500'>G</span>D</h2>
        </div>
        <span className="sr-only">Home</span>
      </Link>


      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0">
            <AlignJustify className="size-7" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex flex-col space-y-8 pt-10 w-[60%] sm:w-2/5 overflow-y-auto "
        >

          <SheetHeader>
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>


          <nav className="flex flex-col gap-6 text-lg px-4 capitalize">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setOpen(false)}
                className={`${link.isActive
                    ? "text-blue-500 font-bold"
                    : "hover:font-semibold"
                  } transition-colors duration-300`}
              >
                {link.name}
              </Link>
            ))}
          </nav>


          <div className="mt-auto flex flex-col gap-4 px-4">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full rounded-full !shadow-none">
               Login
              </Button>
            </Link>

            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">
                Become an Affiliate
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
