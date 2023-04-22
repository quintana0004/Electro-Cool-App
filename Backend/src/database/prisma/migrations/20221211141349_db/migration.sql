/*
  Warnings:

  - Changed the type of `arrivalDateTime` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dueDate` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "arrivalDateTime",
ADD COLUMN     "arrivalDateTime" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMPTZ(6) NOT NULL;
