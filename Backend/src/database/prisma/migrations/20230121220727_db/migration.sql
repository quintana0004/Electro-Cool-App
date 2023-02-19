-- DropForeignKey
ALTER TABLE "JobOrder" DROP CONSTRAINT "JobOrder_carId_fkey";

-- DropForeignKey
ALTER TABLE "JobOrder" DROP CONSTRAINT "JobOrder_customerId_fkey";

-- AlterTable
ALTER TABLE "JobOrder" ALTER COLUMN "carId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "JobOrder" ADD CONSTRAINT "JobOrder_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOrder" ADD CONSTRAINT "JobOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
