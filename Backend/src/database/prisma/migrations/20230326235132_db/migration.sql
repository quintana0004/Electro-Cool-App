/*
  Warnings:

  - Changed the type of `quantity` on the `Invoice_Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unitPrice` on the `Invoice_Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalPrice` on the `Invoice_Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice_Item" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL,
DROP COLUMN "unitPrice",
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL,
DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
