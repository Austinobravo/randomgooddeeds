import { sendEmail } from "@/emails/mailer";
import { RegisterFormSchema } from "@/lib/formSchema";
import { BASE_URL, createVerificationToken } from "@/lib/utils";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const parsed = RegisterFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });
    }

    const { firstName, lastName, password, username, referralCode } = parsed.data;

    const email = parsed.data.email.toLowerCase()
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where:{
          OR: [
          {
              email: email
          },
          {
              username: username
          }
          ]
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        username,
        passwordHash: hashedPassword,
        referralCode: username,
        referredBy: referralCode || null,
        isVerified: false,
        isAdmin: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        // role: true,
      },
    });

    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } })
      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            refereeId: user.id,
            clickedAt: null, 
            registeredAt: new Date(),
          }
        })
      }
    }

    const token = createVerificationToken(email);
    const VERIFICATION_LINK = `${BASE_URL}/verify-email?token=${token}`;


    await prisma.user.update({
      where: { id: user?.id },
      data: { verificationLink: VERIFICATION_LINK }
    });

    await sendEmail({
      to: email,
      subject: "You're In! Welcome to Random Good deeds 🎉",
      template: "signup-verification",
      data: { VERIFICATION_LINK }
    });

    return NextResponse.json({data: user, message: "User created successfully, Please verify your email."}, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({message: "Internal Server Error", error: error }, { status: 500 });
  }
}