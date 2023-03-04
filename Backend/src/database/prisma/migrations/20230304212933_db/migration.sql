/*
  Warnings:

  - Changed the type of `policySignature` on the `JobOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JobOrder" DROP COLUMN "policySignature",
ADD COLUMN     "policySignature" BOOLEAN NOT NULL;
