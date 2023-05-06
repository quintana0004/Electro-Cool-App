-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "temporaryPassword" VARCHAR(65),
ADD COLUMN     "temporaryPasswordExpiration" TIMESTAMP(3),
ADD COLUMN     "temporaryPasswordSalt" VARCHAR(65);
