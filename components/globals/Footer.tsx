import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaYoutubeSquare } from 'react-icons/fa'

const contents = [
    {
        title: "Products",
        children: [
            {
                name: "How it Works",
                url: ""
            },
            {
                name: "Features",
                url: ""
            },
            {
                name: "Pricing",
                url: ""
            },
            {
                name: "Affiliates",
                url: ""
            },

        ]
    },
    {
        title: "Support & Resources",
        children: [
            {
                name: "Blog",
                url: ""
            },
            {
                name: "FAQs",
                url: ""
            },
            {
                name: "Contact Us",
                url: ""
            },

        ]
    },
    {
        title: "Legal",
        children: [
            {
                name: "Terms & Conditions ",
                url: ""
            },
            {
                name: "Privacy Policy",
                url: ""
            },
            {
                name: "Copyright Policy",
                url: ""
            },

        ]
    },
]

const socials = [
    {
        name: "Instagram",
        url: "",
        icon: FaInstagram
    },
    {
        name: "Facebook",
        url: "",
        icon: FaFacebookF
    },
    {
        name: "Twitter",
        url: "",
        icon: FaXTwitter
    },
    {
        name: "Youtube",
        url: "",
        icon: FaYoutube
    },
]
const Footer = () => {
  return (
    <footer className='flex gap-4 not-lg:flex-wrap  w-full px-5 pt-20'>
        <div className='flex justify-between not-lg:flex-wrap space-y-3 gap-2 w-full items-center'>
            {/* <Link href={`/`} className='text-3xl font-bold'>
             <h2>R<span className='text-blue-500'>G</span>D</h2>
            </Link> */}
        <p className='text-sm text-gray-500'>Copyright &copy; {new Date().getFullYear()} Xnyder. All Rights Reserved</p>
        <ul className='flex gap-7 items-center'>
            {socials.map((social) => (
            <li key={social.name} className=''>
                <Tooltip>
                <TooltipTrigger>
                    <Link href={social.url} className=''>
                    <social.icon className='size-5 hover:bg-gray-50 hover:text-blue-500 transition-all ease-in-out rounded-2xl '/>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{social.name}</p>
                </TooltipContent>
                </Tooltip>
            </li>

            ))}
        </ul>
        </div>
        {/* <div className='flex justify-between w-full gap-6 not-lg:flex-wrap lg:w-3/5'>
            {contents.map((content) => (
                <ul key={content.title} className='space-y-5'>
                    <li className='font-semibold '>{content.title}</li>
                    {content.children.map((child) => (
                        <li key={child.name} className=''>
                            <Link href={child.url} className='hover:translate-x-[1px] hover:font-medium w-fit duration-500 transition-all'>{child.name}</Link>
                        </li>
                    ))}

                </ul>
            ))}

        </div> */}
    </footer>
  )
}

export default Footer