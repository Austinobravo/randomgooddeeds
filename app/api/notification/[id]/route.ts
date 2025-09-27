
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { getCurrentUser } from '@/lib/getServerSession'

export async function GET(req: Request, {params}: {params:Promise<{id:string}>}) {
    const id = (await params).id
  try {
    const authUser = await getCurrentUser()

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const uniqueNofication = await prisma.notification.findUnique({
        where:{
            id,
            userId: authUser.id
        }
    })
    if(!uniqueNofication) return NextResponse.json(null, {status: 404})
    
    if(!uniqueNofication.read){
        await prisma.notification.update({
            where:{
                id
            },
            data:{
                read: true
            }
        })
    }
    

    return NextResponse.json(uniqueNofication, { status: 200 })

  } catch (error) {
    console.error("[NOTIFICATION_ERROR]", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
