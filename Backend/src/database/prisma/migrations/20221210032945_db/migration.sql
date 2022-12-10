-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "carHasItems" DROP NOT NULL,
ALTER COLUMN "carHasItems" SET DEFAULT false;
