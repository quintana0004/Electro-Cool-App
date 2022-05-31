/*
  Warnings:

  - A unique constraint covering the columns `[vinNumber]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName,phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_vinNumber_key" ON "Car"("vinNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_fullName_phone_key" ON "Customer"("fullName", "phone");
