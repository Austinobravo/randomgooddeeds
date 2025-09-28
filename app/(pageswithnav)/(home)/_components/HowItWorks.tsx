import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const data = [
    {
        title: "Sign up",
        description: "Open a free account now",
        url: "/register"
    },
    {
        title: "Affiliate link",
        description: "Copy your customized affiliate link",
        url: "/dashboard"
    },

    {
        title: "Earning",
        description: "Start earning when anyone uses that link",
        url: "/dashboard"
    },
]
const HowItWorks = () => {
  return (
    <div className='bg-gray-50 py-20 p-4 space-y-10'>
        <h3 className='text-center text-4xl font-semibold'>How it <span className='text-blue-500'>works?</span></h3>
        <div className='flex items-end justify-center not-sm:flex-wrap gap-7'>
            {data.map((item, index) => (
            <Card key={item.title} className={`${index == 2 && "!bg-blue-500 !text-white lg:h-78 sm:h-88"} ${index == 0 && "lg:h-64 sm:h-72"} ${index === 1 && "lg:h-72 sm:h-80"} group shadow-none border-solid hover:bg-blue-600 transition-all hover:scale-105 duration-700 bg-white hover:!text-white text-black lg:max-w-2xs w-full border`}>
                <CardHeader className=''>
                    <CardTitle className=' pt-2 flex items-center gap-1 text-xs'>
                        <span className={`${index != 2 ? "bg-gray-500 group-hover:bg-white" : "bg-white" } w-5 rounded-2xl h-1`}></span>
                        {item.title}
                        {/* <Icon size={48} className='text-talentpro-brown group-hover:!text-white transition-all duration-700' /> */}
                    </CardTitle>

                </CardHeader>
                <CardContent className={`${index != 2 && "text-blue-500" } text-2xl font-bold  group-hover:text-white`}>
                    {item.description}
                </CardContent>
                <CardFooter className={`group-hover:text-white  text-lg  flex justify-between`}>
                    <span className={`${index != 2 && "text-muted-foreground group-hover:text-white"} lg:text-sm sm:text-[12px]`}>Click on the arrow to know more</span>
                    <Link href={item.url}>
                    <span className=''><ArrowRight className='hover:translate-x-1 transition-all duration-700 ' /></span>
                    </Link>
                </CardFooter>
            </Card>

            ))}

        </div>

    </div>
  )
}

export default HowItWorks