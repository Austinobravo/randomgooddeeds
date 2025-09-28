import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { getCurrentUser } from '@/lib/getServerSession';
import { Decimal } from '@/lib/generated/prisma/runtime/library';

type payload = {
    pin: string,
    amount: string,
    bankName: string,
    accountName: string,
    accountNumber: string
}

export async function POST(req: Request) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json()
    
    const { pin, amount, bankName, accountName, accountNumber } = body as payload;
    
    if(!pin || !amount || !bankName || !accountName || !accountNumber){
      return NextResponse.json({ error: 'Missing field' }, { status: 400 });
  }

  const transactionReference = `Txn-${Date.now().toString()}`

  try{
        const record = await prisma.otp.findFirst({
          where: {
            userId:user?.id,
            code: pin,
            expiresAt: { gte: new Date() },
          },
          orderBy: { createdAt: 'desc' },
        });
      
        if (!record) {
          return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }
        
        const earning = await prisma.earning.findFirst({
            where:{
                userId: user?.id
            }
        })
        if (!earning) {
          return NextResponse.json({ error: 'You do not have any earnings yet.' }, { status: 400 });
        }
        
        const amountToPay = new Decimal(amount)
        
        if(earning?.amount?.lessThan(amountToPay)){
            return NextResponse.json({ error: 'Insufficient earnings.' }, { status: 400 });
        }

        await prisma.earning.update({
            where:{
                id: earning.id
            },
            data:{
                amount:{
                    decrement: amountToPay
                }
            }
        })

    const transaction = await prisma.transaction.create({
          data: {
            reference: transactionReference,
            amount: amountToPay,
            type: "withdraw",
            status: "pending",
            userId: user.id,
            narration: `Withdraw Transfer to Name: ${accountName}, Bank: ${bankName}, account number: ${accountNumber}`,
            metadata: body,
          },
        });
    


    await prisma.notification.create({
          data: {
            userId: user?.id as string,
            title: `You made a withdrawal of ₦${amountToPay.toFixed(2)}`,
            body: `Withdraw Transfer to Name: ${accountName}, Bank: ${bankName}, account number: ${accountNumber}`,
          },
        });
      
      
        // Cleanup OTPs
        await prisma.otp.deleteMany({ where: {userId:user?.id } });
      
        return NextResponse.json(transaction, {status: 200});

    }catch(error){
        return NextResponse.json({message: "Server error"}, {status: 500})
    }
}
