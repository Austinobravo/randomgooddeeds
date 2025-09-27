
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/prisma/prisma'
import { updatePasswordFormSchema } from '@/lib/formSchema'
import { getCurrentUser } from '@/lib/getServerSession'

export async function POST(req: NextRequest) {
  try {
    const authUser = await getCurrentUser()

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const result = updatePasswordFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: "Validation failed", errors: result.error.format() }, { status: 400 })
    }

    const { password, newPassword } = result.data

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Compare old password
    const isValidOldPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidOldPassword) {
      return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 })
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 10)

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 })

  } catch (error) {
    console.error("[CHANGE_PASSWORD_ERROR]", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
