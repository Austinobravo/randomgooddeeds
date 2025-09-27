
import { NextResponse } from "next/server"
import prisma from "@/prisma/prisma"

import { sendEmail } from "@/emails/mailer"
import { getCurrentUser } from "@/lib/getServerSession"
import { generateOtp } from "@/lib/utils"


export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const otp = generateOtp() // e.g. returns '483921'
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry

    try{
        const newOtp = await prisma.otp.create({
          data: {
            userId: user.id,
            code: otp,
            expiresAt,
          },
        })
        await sendEmail({
          to: user.email,
          subject: "Verify Your PIN - OTP Inside",
          template: "pin-otp",
          data: {
            name: `${user.firstName} ${user.lastName}`,
            otp_code: newOtp.code,
            support_link: "https://xnyder.com/contact"
          }
        });

            return NextResponse.json({ message: "OTP sent successfully" })
    }catch(error:any){
        console.error("Error", error)
        return NextResponse.json({ message: "Server issues" }, {status: 500})


    }


}
