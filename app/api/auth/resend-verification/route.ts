// /app/api/auth/resend-verification/route.ts

import { NextResponse } from "next/server"
import prisma from "@/prisma/prisma"
import { sendEmail } from "@/emails/mailer" 
import { BASE_URL, createVerificationToken } from "@/lib/utils"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ message: "Email or username is required" }, { status: 400 })
  }

  const user = await prisma.user.findFirst({
      where:{
          OR: [
          {
              email: email
          },
          {
              username: email
          }
          ]
      },
      
  })
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  if (user.isVerified) {
    return NextResponse.json({ message: "Email already verified" }, { status: 400 })
  }

  const token = createVerificationToken(user.email)
  const VERIFICATION_LINK = `${BASE_URL}/verify-email?token=${token}`;

  await prisma.user.update({
        where:{
          id: user.id
        },
        data:{
          verificationLink: VERIFICATION_LINK
        }
      })
  
  await sendEmail({
    to: user.email,
    subject: "You're In!  Welcome to Random Good deeds 🎉",
    template: "signup-verification",
    data: { VERIFICATION_LINK },
  });

  return NextResponse.json({ message: "Verification email sent" })
}
