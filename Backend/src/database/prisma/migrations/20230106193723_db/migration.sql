/*
  Warnings:

  - You are about to drop the column `amount` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `amountTotal` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountTotal` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "amount",
ADD COLUMN     "amountTotal" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "totalPrice",
ADD COLUMN     "amountTotal" VARCHAR(50) NOT NULL;
