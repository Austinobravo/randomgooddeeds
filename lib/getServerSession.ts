import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

type AppUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  username: string
};

export const getCurrentUser = async (req?: NextRequest): Promise<AppUser | null> => {
  try {
    // 1 Try getServerSession first
    const session = await getServerSession(options);
    if (session?.user?.id) {
      return session.user as AppUser;
    }

    // 2 Fallback: try getToken (e.g., from Authorization header)
    if (req) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (token && token.id) {
        return token as AppUser;
      }
    }

    // Not authenticated
    return null;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
