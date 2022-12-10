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

async function isUniqueCar(
  licensePlate: string,
  vinNumber: string,
  id: number | undefined
): Promise<boolean> {
  try {
    const car = await prisma.car.findFirst({
      where: {
        OR: [
          {
            licensePlate: licensePlate,
          },
          {
            vinNumber: vinNumber,
          },
        ],
      },
    });

    if (!car) {
      return true;
    } else if (car.id === id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export { upsertCar, isUniqueCar };
