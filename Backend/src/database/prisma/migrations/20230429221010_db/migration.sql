/*
  Warnings:

  - You are about to alter the column `phone` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);
