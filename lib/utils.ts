import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateForEmptySpaces = (value: string) => {
    return value.trim().length >= 1
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