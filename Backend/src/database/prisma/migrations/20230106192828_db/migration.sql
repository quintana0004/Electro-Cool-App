/*
  Warnings:

  - Added the required column `status` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deposit" ADD COLUMN     "status" VARCHAR(100) NOT NULL;
