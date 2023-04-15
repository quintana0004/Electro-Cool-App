/*
  Warnings:

  - Changed the type of `amountPaid` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amountDue` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amountTotal` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amountPaid",
ADD COLUMN     "amountPaid" DOUBLE PRECISION NOT NULL,
DROP COLUMN "amountDue",
ADD COLUMN     "amountDue" DOUBLE PRECISION NOT NULL,
DROP COLUMN "amountTotal",
ADD COLUMN     "amountTotal" DOUBLE PRECISION NOT NULL;
