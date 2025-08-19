
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";

import { sendEmail } from "@/emails/mailer";
import { ResetForgotPasswordSchema } from "@/lib/formSchema";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const token = searchParams.get("token");

//   if (!token) {
//     return NextResponse.json({ error: "Missing token" }, { status: 400 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

//     // If token is valid, redirect to reset password page with token in query
//     return NextResponse.redirect(`${BASE_URL}/reset-password?token=${token}`);
//   } catch (err) {
//     return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
//   }
// }


export async function POST(req: Request) {
//   await rateLimit(req);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown IP';
  

  const reset_time = new Date().toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const body = await req.json();
  
  const parsed = ResetForgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input", errors: parsed.error.format() }, { status: 400 });
    }
  const { token } = body
  const { newPassword } = parsed.data;
  

  if (!token || !newPassword) {
    return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const email = decoded.email;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await prisma.user.update({
      where: { email },
      data: { passwordHash: hashedPassword,
        verificationLink: null
      },
    });

     await sendEmail({
          to: email,
          subject: "Password Reset Successful🎉",
          template: "password-reset-successful",
          data: { 
            name: `${user.firstName} ${user.lastName}`,
            support_link: `https://randomgooddeeds.com/contact`,
            reset_time,
            ip_address: ip,

           },
        });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
}
