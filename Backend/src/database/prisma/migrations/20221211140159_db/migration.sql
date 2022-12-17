/*
  Warnings:

  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "arrivalDateTime" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dueDate" VARCHAR(255) NOT NULL;
