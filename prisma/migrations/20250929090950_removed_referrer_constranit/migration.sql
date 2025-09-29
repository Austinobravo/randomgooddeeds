/*
  Warnings:

  - You are about to drop the column `referralCode` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_referredBy_fkey";

-- DropIndex
DROP INDEX "public"."User_referralCode_key";

-- AlterTable
ALTER TABLE "public"."Earning" ALTER COLUMN "sourceUser" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 5000;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "referralCode";
