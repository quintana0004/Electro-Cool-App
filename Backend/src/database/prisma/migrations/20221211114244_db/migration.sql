/*
  Warnings:

  - Added the required column `companyId` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deposit" ADD COLUMN     "companyId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
