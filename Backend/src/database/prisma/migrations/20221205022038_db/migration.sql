/*
  Warnings:

  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "userId",
ADD COLUMN     "companyId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "companyId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
