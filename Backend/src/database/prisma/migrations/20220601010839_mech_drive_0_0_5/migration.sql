/*
  Warnings:

  - You are about to drop the column `license` on the `Car` table. All the data in the column will be lost.
  - Added the required column `licensePlate` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Made the column `customerId` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "license",
ADD COLUMN     "licensePlate" VARCHAR(20) NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;
