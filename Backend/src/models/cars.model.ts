import { prisma } from "../database";
import { Car } from "@prisma/client";
import { ICar, IErrorResponse } from "./../types/index.d";
import { findCompanyByName } from "./company.model";
import { findCustomerByNameAndPhone } from "./customers.model";

async function createCar(car: ICar): Promise<Car | IErrorResponse> {
  try {
    
    const company = await findCompanyByName(car.companyName);
    if (!company) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "The company name was not found in the system. Please assure you pass a valid company name.",
      };
      return error;
    }

    const customer = await findCustomerByNameAndPhone(
      car.customerName,
      car.customerPhone
    );
    if (!customer) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "The customer specified was not found in the system. Please assure you pass a valid customer name and customer phone number.",
      };
      return error;
    }

    const existingCar = await findCarByVIN(car.vinNumber);
    if (existingCar) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "A Car with this VIN Number already exists. Please provide another VIN Number.",
      };
      return error;
    }

    const createdCar = await prisma.car.create({
      data: {
        brand: car.brand,
        licensePlate: car.licensePlate,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        color: car.color,
        vinNumber: car.vinNumber,
        carHasItems: car.carHasItems,
        carItemsDescription: car.carItemsDescription,
        customerId: customer?.id,
        companyId: company?.id,
      },
    });

    const createdCarWithoutId = carsExclude(createdCar, "id");
    return createdCarWithoutId;

  } catch (error) {
    throw error;
  }
}

async function findCarByVIN(vinNumber: string): Promise<Car | null> {
  try {

    const car = await prisma.car.findFirst({
      where: {
        vinNumber: vinNumber,
      },
    });

    if (!car) {
      return null;
    }

    return car;

  } catch (error) {
    throw error;
  }
}

function carsExclude<Car, Key extends keyof Car>(car: Car, ...keys: Key[]): Car {
  for (let key of keys) {
    delete car[key];
  }
  return car;
}

export { createCar, findCarByVIN, carsExclude };
