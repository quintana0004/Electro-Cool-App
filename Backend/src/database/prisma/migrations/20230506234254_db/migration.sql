-- AlterTable
ALTER TABLE "User" ADD COLUMN     "temporaryPassword" VARCHAR(65),
ADD COLUMN     "temporaryPasswordExpiration" TIMESTAMP(3),
ADD COLUMN     "temporaryPasswordSalt" VARCHAR(65);
