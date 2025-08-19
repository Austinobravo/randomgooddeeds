import { sendEmail } from '@/emails/mailer';

import { NextResponse } from "next/server"
import prisma from "@/prisma/prisma"
import { BASE_URL, createVerificationToken } from "@/lib/utils"


export async function POST(req: Request) {
  let { email } = await req.json()
  email = email.toLowerCase()

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email, isVerified: true } })

  if (!user) {
    return NextResponse.json({ message: "If this email exists, a reset link has been sent" }, { status: 404 })
  }


  const token = createVerificationToken(user.email)
  const RESET_LINK = `${BASE_URL}/reset-password?token=${token}`;

  await prisma.user.update({
      where:{
        id: user.id
      },
      data:{
        verificationLink: RESET_LINK
      }
    })
  await sendEmail({
    to: user.email,
    subject: "Reset Your Password!",
    template: "forgot-password",
    data: { RESET_LINK },
  });

  return NextResponse.json({ message: "If this email exists, a reset link has been sent" })
}
