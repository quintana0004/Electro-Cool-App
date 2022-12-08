/*
  Warnings:

  - You are about to drop the column `datetime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `arrivalDateTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "datetime",
DROP COLUMN "reason",
ADD COLUMN     "arrivalDateTime" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "customerName" VARCHAR(255) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "licensePlate" VARCHAR(255) NOT NULL,
ADD COLUMN     "model" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(10) NOT NULL,
ADD COLUMN     "service" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" VARCHAR(255) NOT NULL,
ADD COLUMN     "refreshToken" VARCHAR(255) NOT NULL;
