-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessEndDate" TIMESTAMPTZ(6),
ADD COLUMN     "accessStartDate" TIMESTAMPTZ(6);
