'use client'

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Gem, Landmark, MessageSquareHeartIcon } from 'lucide-react';
import { BankDetailsForm } from './BankDetailsForm';
import { AmountForm } from './AmountForm';
import { OtpForm } from './OtpForm';
import Image from 'next/image';
import { formatToNaira } from '@/lib/utils';

type bankProps = {
    bankName: string;
    accountName: string;
    accountNumber: string;
}

type amountProps = {
    amount: string;
}
type otpProps = { pin: string; }
const WithdrawDialog = () => {
  const [step, setStep] = useState(1);

  const [bankDetails, setBankDetails] = useState<bankProps | null>(null);
  const [amount, setAmount] = useState<amountProps | null>(null);
  const [otp, setOtp] = useState<otpProps | null >(null);

  return (
    <>
      {/* Step 1 - Method Selection */}
      <Dialog open={step === 1} onOpenChange={(open) => !open && setStep(0)}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full rounded-lg min-h-14 cursor-pointer">Withdraw</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-2xl max-h-full '>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Choose withdrawal method</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className="space-y-4 flex gap-4 not-sm:flex-wrap">
              <div onClick={() => setStep(2)} className='bg-blue-100 rounded-lg flex flex-col group gap-2 p-4 h-40 hover:bg-black duration-500 transition-all hover:text-white cursor-pointer justify-center items-center shadow'>
                <Landmark className='size-15 text-blue-500' />
                <h3 className='font-bold '>Bank Account</h3>
                <h4 className='text-gray-500 group-hover:text-white text-sm'>Wire money directly to your bank account</h4>
              </div>
              <div onClick={() => setStep(3)} className='bg-blue-100 rounded-lg flex flex-col group hover:bg-black duration-500 hover:text-white transition-all gap-2 p-4 h-40 justify-center items-center shadow'>
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

      {/* Step 2 - Bank Transfer */}
      <Dialog open={step === 2} onOpenChange={(open) => !open && setStep(0)}>
        <DialogContent className='sm:max-w-2xl max-h-full '>
          <DialogHeader>
            <DialogTitle>Bank Transfer</DialogTitle>
            <DialogDescription>Enter your bank details</DialogDescription>
          </DialogHeader>
          <BankDetailsForm
            onSuccess={(data) => {
              setBankDetails(data);
              setStep(4);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Step 3 - Crypto Wallet (skip bank details) */}
      <Dialog open={step === 3} onOpenChange={(open) => !open && setStep(0)}>
        <DialogContent className='sm:max-w-2xl max-h-full'>
          <DialogHeader>
            <DialogTitle>Crypto Wallet</DialogTitle>
            <DialogDescription>Enter your wallet address</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setStep(4)}>Continue</Button>
        </DialogContent>
      </Dialog>

      {/* Step 4 - Add Amount */}
      <Dialog open={step === 4} onOpenChange={(open) => !open && setStep(0)}>
        <DialogContent className='sm:max-w-2xl max-h-full '>
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>Enter the amount you want to withdraw</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <h3 className='text-gray-500 text-sm'>To</h3>
            <div className='flex gap-2 items-center border-2 border-solid border-blue-500 rounded-lg bg-blue-50 p-4'>
              <Landmark className='size-7 text-blue-500' />
              <div>
                <h3 className='font-semibold'>{bankDetails?.accountName || "Crypto Wallet"}</h3>
                <h4 className='text-gray-500 text-sm'>{bankDetails?.accountNumber || "--"}</h4>
              </div>
            </div>
            <AmountForm
              onSuccess={(value) => {
                setAmount(value);
                setStep(5);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 5 - OTP Verification */}
      <Dialog open={step === 5} onOpenChange={(open) => !open && setStep(0)}>
        <DialogContent className='overflow-y-auto sm:max-w-2xl max-h-full '>
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>Enter OTP</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <OtpForm
              onSuccess={(value) => {
                setOtp(value);
                setStep(6);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 6 - Success */}
      <Dialog open={step === 6} onOpenChange={(open) => !open && setStep(0)}>
        <DialogContent className='overflow-y-auto sm:max-w-2xl max-h-full '>
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center py-10">
            <Image priority src="/success.png" width={400} height={200} alt='' className='size-14 object-cover my-3' />
            <h3 className="font-bold text-2xl">Congratulations</h3>
            <p className="text-gray-500 text-sm text-center">Your withdrawal request has been received. Funds will be transferred in 1–2 working days.</p>
          </div>
          <div className='space-y-10'>
            <div className="flex border-y border-solid justify-between py-4">
              <div>
                <h3 className="font-semibold">20 June 2020 20:39 UTC +1</h3>
                <h4 className="text-gray-500 text-sm">Trans ID: 0Xddjdkhd83hhednd</h4>
              </div>
              <div>
                <h3 className="font-semibold">{formatToNaira(amount || 0)}</h3>
                <h4 className="text-sm text-amber-500">Pending</h4>
              </div>
            </div>
            <div>
              <h4 className="font-bold">Account Details</h4>
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h3 className="text-gray-500 text-sm">Bank Name</h3>
                  <h4 className="text-gray-500 text-sm">Account Name</h4>
                  <h4 className="text-gray-500 text-sm">Account Number</h4>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{bankDetails?.bankName}</h3>
                  <h4 className="font-semibold">{bankDetails?.accountName}</h4>
                  <h4 className="font-semibold">{bankDetails?.accountNumber}</h4>
                </div>
              </div>
              <div className="flex justify-between items-center bg-violet-50 rounded-lg p-4">
                <div>
                  <h3 className="font-bold ">Need Help?</h3>
                  <p className="text-gray-700 text-xs">If there's a problem with the transaction, contact support.</p>
                </div>
                <Button className="bg-violet-500 cursor-pointer text-white"><MessageSquareHeartIcon /> Support</Button>
              </div>
            </div>
            <Button className="bg-blue-500 cursor-pointer text-white min-h-14 w-full">Print</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawDialog;
