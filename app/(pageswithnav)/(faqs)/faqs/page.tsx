import Link from 'next/link'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
import CTA from '@/components/globals/CTA'

const data = [
  {
    question: "How do I get paid ?",
    answer: "When setting up your Xynder account, you set your local bank account/mobile money details, and that's where all your payouts will be sent. Local bank account simply means an account in the default currency of your country. E.g, As a Nigerian, your local bank account will be your Naira bank account. At this time, we only support automatic payouts for Naira. So if you make a referral, a day after the transaction we payout the funds straight to your Nigerian bank account automatically. However, for all other currencies and merchants in other countries, when you make a referral, we payout the funds to your wallet, and you can withdraw it at any time to your local bank account/mobile money when access is granted.",
  },
  {
    question: "Minimum Payout / Withdrawal amount?",
    answer: "For payouts/Withdrawals, here's the minimum amount to take funds out of your wallet. N10,000",
  },
  {
    question: "How do I receive payments in other currencies like USD ?",
    answer: "You can receive payments in eight currencies (USD, GBP, NGN, GHS, KES, UGX, TGZ & ZAR) using Selar and what's great is, it's enabled for you by default and you don't have to do anything extra. All you have to do is set the price of your product in your local currency, and on your store page the buyers can switch to another currency, and we'd automatically convert the amount with the most favorable rates.",
  },
  {
    question: "How do I receive payments in other currencies like USD ?",
    answer: "You can receive payments in eight currencies (USD, GBP, NGN, GHS, KES, UGX, TGZ & ZAR) using Xynder and what's great is, it's enabled for you by default and you don't have to do anything extra. All you have to do is set the price of your product in your local currency, and we'd automatically convert the amount with the most favorable rates.",
  },
  {
    question: "How do I share my referral link on social media ?",
    answer: "It's very simple. On the edit page of your product, you'll see the link at the top of the page, simply copy that link and share it on social media.",
  },
  {
    question: "When do I get paid ?",
    answer: "Immediately you make a request to withdraw, an admin will verify and send you your funds.",
  },
]
const FaqPage = () => {
  return (
    <section className='py-8 px-5'>
      <div className='text-center relative space-y-2'>
        <Image src={`/img.png`} width={200} height={200} className='absolute left-5 size-30' alt=''/>
        <h2 className='lg:text-4xl text-3xl font-bold py-4'>Frequently Asked Questions</h2>
        <h3>Looking for answers about Selar?</h3>
        <h4 className='max-w-5xl mx-auto'>Our comprehensive helpdesk has all the information you need. If you still have questions, <Link href={""} className='text-blue-500 font-semibold'>helpdesk</Link> has all the information you need. If you still have questions, <Link href={`mailto:info@xynder.com`} className='text-blue-500 font-semibold hover:underline underline-offset-4'>info@xynder.com</Link></h4>
      </div>
      <div className='lg:max-w-4xl mx-auto px-5 py-10'>
        <Accordion type="single" collapsible className=''>
          {data.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className='!no-underline data-[state=open]:bg-blue-500 data-[state=open]:text-white rounded-none'>{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>

          ))}
        </Accordion>
      </div>
      <CTA />
    </section>
  )
}

export default FaqPage