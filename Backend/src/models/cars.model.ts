import { ICar } from "./../types/index.d";
import prisma from "../database/prisma";

async function upsertCar(carInfo: ICar) {
  try {
    const car = await prisma.car.upsert({
      where: {
        id: carInfo?.id ?? -1,
      },
      create: {
        brand: carInfo.brand,
        licensePlate: carInfo.licensePlate,
        model: carInfo.model,
        year: carInfo.year,
        mileage: carInfo.mileage,
        color: carInfo.color,
        vinNumber: carInfo.vinNumber,
        carHasItems: carInfo.carHasItems,
        carItemsDescription: carInfo.carItemsDescription,
        companyId: carInfo.companyId,
        customerId: carInfo.customerId,
      },
      update: {
        brand: carInfo.brand,
        licensePlate: carInfo.licensePlate,
        model: carInfo.model,
        year: carInfo.year,
        mileage: carInfo.mileage,
        color: carInfo.color,
        vinNumber: carInfo.vinNumber,
        carHasItems: carInfo.carHasItems,
        carItemsDescription: carInfo.carItemsDescription,
        lastModified: new Date(),
      },
    });

    return car;
  } catch (error) {
    throw error;
  }
}

export { upsertCar };
