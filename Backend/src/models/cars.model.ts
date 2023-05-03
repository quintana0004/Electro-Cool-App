import { ICar } from "./../types/index.d";
import prisma from "../database/prisma";
import { formatLicensePlate } from "../utils/formatters.utils";

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

async function findCarById(id: number) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: id,
      },
    });

    return car;
  } catch (error) {
    throw error;
  }
}

async function findAllCars(
  page: number,
  take: number,
  searchTerm: string | undefined
) {
  try {
    const plateSearch = searchTerm ? formatLicensePlate(searchTerm) : undefined;
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const cars = await prisma.car.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        licensePlate: {
          contains: plateSearch,
        },
      },
    });

    const carsData = {
      data: cars.slice(0, take),
      isLastPage: cars.length <= take,
      currentPage: page,
    };
    return carsData;
  } catch (error) {
    throw error;
  }
}

async function findCarsByCustomer(
  searchTerm: string | undefined,
  customerId: number
) {
  try {
    const plateSearch = searchTerm ? formatLicensePlate(searchTerm) : undefined;
    const clientCars = await prisma.car.findMany({
      where: {
        AND: [
          {
            licensePlate: {
              contains: plateSearch,
            },
          },
          {
            customerId: customerId,
          },
        ],
      },
    });

    return clientCars;
  } catch (error) {
    throw error;
  }
}

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
        customerId: Number(carInfo.customerId),
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
        customerId: Number(carInfo.customerId),
        lastModified: new Date(),
      },
    });

    return car;
  } catch (error) {
    throw error;
  }
}

async function deleteCar(id: number) {
  try {
    const car = await prisma.car.delete({
      where: {
        id: id,
      },
    });

    return car;
  } catch (error) {
    throw error;
  }
}

export {
  findCarById,
  upsertCar,
  isUniqueCar,
  findAllCars,
  findCarsByCustomer,
  deleteCar,
};
