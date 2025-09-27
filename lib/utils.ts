import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"





export const createVerificationToken = (email: string) => {
    const secret = process.env.JWT_SECRET!
    return jwt.sign({ email }, secret, { expiresIn: "1h" })
  }
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const validateForEmptySpaces = (value: string) => {
    return value.trim().length >= 1
}

export const comparePassword = async (currentPassword: string, hashPassword: string) => {
    const isPasswordCorrect = bcrypt.compareSync(currentPassword, hashPassword)
    return isPasswordCorrect
}

export const hashedPassword = async (value: string) => {
    const salt = bcrypt.genSaltSync(10)
    const newPassword = bcrypt.hashSync(value, salt)
    return newPassword
}

export function formatToNaira(amount: unknown): string {
  let numericAmount: number;

  if (typeof amount === "number") {
    numericAmount = amount;
  } else if (typeof amount === "string") {
    numericAmount = parseFloat(amount);
  } else if (amount && typeof amount === "object" && "toNumber" in amount && typeof (amount as any).toNumber === "function") {
    numericAmount = (amount as any).toNumber();
  } else {
    return "₦0.00"; // fallback
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.API_URL;
