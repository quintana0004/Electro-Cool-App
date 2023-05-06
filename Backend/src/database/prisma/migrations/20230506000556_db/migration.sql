/*
  Warnings:

  - You are about to drop the column `temporaryPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryPasswordExpiration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryPasswordSalt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "temporaryPassword",
DROP COLUMN "temporaryPasswordExpiration",
DROP COLUMN "temporaryPasswordSalt";
