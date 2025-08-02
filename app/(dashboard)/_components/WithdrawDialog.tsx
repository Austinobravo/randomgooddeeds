'use client'

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Gem, Landmark } from 'lucide-react';
import { BankDetailsForm } from './BankDetailsForm';
import { AmountForm } from './AmountForm';
import { OtpForm } from './OtpForm';

const WithdrawDialog = () => {
  const [isDialog1Open, setDialog1Open] = useState(false);
  const [isDialog2Open, setDialog2Open] = useState(false);
  const [isDialog3Open, setDialog3Open] = useState(false);
  const [isDialog4Open, setDialog4Open] = useState(false);
  const [isDialog5Open, setDialog5Open] = useState(false);

  return (
    <>
      {/* Main Withdraw Dialog */}
      <Dialog open={isDialog1Open} onOpenChange={setDialog1Open}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full rounded-lg min-h-14">Withdraw</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md max-h-full'>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Choose withdrawal method</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className="space-y-4 flex gap-4 not-sm:flex-wrap">
                <div onClick={() => setDialog2Open(true)} className='bg-blue-100 rounded-lg flex flex-col group gap-2 p-4 h-40  hover:bg-black duration-500 transition-all hover:text-white cursor-pointer justify-center items-center shadow'>
                    <Landmark className='size-15 text-blue-500'/>
                    <h3 className='font-bold '>Bank Account</h3>
                    <h4 className='text-gray-500 group-hover:text-white text-sm'>Wire money directly to your bank account</h4>
                </div>
                <div onClick={() => setDialog3Open(true)} className='bg-blue-100 rounded-lg flex flex-col group hover:bg-black duration-500 hover:text-white transition-all gap-2 p-4 h-40 justify-center items-center shadow'>
                    <Gem className='size-13 text-amber-500' />
                    <h3 className='font-bold '>Crypto Wallet</h3>
                    <h4 className='text-gray-500 group-hover:text-white text-sm'>Transfer your earnings to your crypto wallet</h4>
                </div>

          </div>
           
            <DialogClose asChild>
              <Button variant="secondary" className='w-full min-h-14 cursor-pointer '>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog 2 - Bank Transfer */}
      <Dialog open={isDialog2Open} onOpenChange={setDialog2Open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bank Transfer</DialogTitle>
            <DialogDescription>Enter your bank details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <BankDetailsForm />
            <DialogClose asChild>
              <Button variant="secondary" className='w-full min-h-14 cursor-pointer '>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog 3 - Crypto Wallet */}
      <Dialog open={isDialog3Open} onOpenChange={setDialog3Open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crypto Wallet</DialogTitle>
            <DialogDescription>Enter your wallet address</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Dialog 4 - Add Amount */}
      <Dialog open={isDialog4Open} onOpenChange={setDialog4Open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>Enter the amount you will want to withdraw</DialogDescription>
          </DialogHeader>
          <div>
            <div className='space-y-4'>
                <h3 className='text-gray-500 text-sm'>To</h3>
                <div className='flex gap-2 items-center border-2 border-solid border-blue-500 rounded-lg bg-blue-50 p-4'>
                    <Landmark className='size-7 text-blue-500'/>
                    <div>
                        <h3 className='font-semibold'>Austine Doe</h3>
                        <h4 className='text-gray-500 text-sm'>23333XXXXX</h4>
                    </div>
                </div>
                <AmountForm />
            </div>
          </div>
          <DialogClose asChild>
              <Button variant="secondary" className='w-full min-h-14 cursor-pointer '>Close</Button>
            </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Dialog 5 - Verification Code */}
      <Dialog open={true} onOpenChange={setDialog5Open}>
        <DialogContent className='overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>Enter the amount you will want to withdraw</DialogDescription>
          </DialogHeader>
          <div>
            <div className='space-y-4'>
                <h3 className='text-gray-500 text-sm'>To</h3>
                <div className='flex gap-2 items-center border-2 border-solid border-blue-500 rounded-lg bg-blue-50 p-4'>
                    <Landmark className='size-7 text-blue-500'/>
                    <div>
                        <h3 className='font-semibold'>Austine Doe</h3>
                        <h4 className='text-gray-500 text-sm'>23333XXXXX</h4>
                    </div>
                </div>
                <OtpForm />
            </div>
          </div>
          <DialogClose asChild>
              <Button variant="secondary" className='w-full min-h-14 cursor-pointer '>Close</Button>
            </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawDialog;
