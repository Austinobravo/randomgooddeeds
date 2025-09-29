import { getCurrentUser } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    
  try {
    const body = await req.json();

    const { firstName, lastName, } = body;

    let updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    // if (phone) updateData.phone = phone;
    // if (role) updateData.role = role;
    // if (password) {
    //   updateData.passwordHash = await bcrypt.hash(password, 10);
    // }

    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ data: error, message: "Something went wrong." }, { status: 500 });
  }
}
