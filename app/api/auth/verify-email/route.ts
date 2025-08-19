import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");


  if (!token) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    await prisma.user.update({
      where: { email },
      data: { 
        isVerified: true,
        verificationLink: null
     },
    });

    // return NextResponse.redirect(`${BASE_URL}/login?verified=1`);
    return NextResponse.json({message: "Successful"}, {status:200})
  } catch (err) {
    console.log("error in verification", err)
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 400 });
  }
};
