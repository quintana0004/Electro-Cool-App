/*
  Warnings:

  - You are about to drop the column `fullName` on the `Customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Customer_fullName_phone_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "fullName";
