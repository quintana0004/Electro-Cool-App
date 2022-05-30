/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoiceId` on table `Invoice_Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `JobOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `JobOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carId` on table `JobOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Reminder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "companyId" SET NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice_Item" ALTER COLUMN "invoiceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobOrder" ALTER COLUMN "companyId" SET NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "carId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "companyId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "User"("customerId");
