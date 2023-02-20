/*
  Warnings:

  - Added the required column `brand` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "brand" VARCHAR(100) NOT NULL,
ADD COLUMN     "color" VARCHAR(50) NOT NULL,
ADD COLUMN     "year" VARCHAR(4) NOT NULL;
