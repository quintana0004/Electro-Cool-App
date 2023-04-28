/*
  Warnings:

  - You are about to alter the column `amountPaid` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(100)`.
  - You are about to alter the column `amountDue` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(100)`.
  - You are about to alter the column `amountTotal` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "amountPaid" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "amountDue" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "amountTotal" SET DATA TYPE VARCHAR(100);
