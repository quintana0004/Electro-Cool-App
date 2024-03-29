import { Request, Response } from "express";
import {
  isUniqueCar,
  upsertCar,
  findAllCars,
  findCarsByCustomer,
  findCarById,
  deleteCar,
} from "../../models/cars.model";
import { ICar } from "../../types";
import {
  hasRequiredCarFields,
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
} from "../../utils/validators.utils";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import { getDummyCompanyId } from "../../utils/db.utils";
import { formatLicensePlate } from "../../utils/formatters.utils";

async function httpGetAllCars(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : "";

    const cars = await findAllCars(page, take, searchTerm);
    return res.status(200).json(cars);
  } catch (error) {
    return handleExceptionErrorResponse("get all cars", error, res);
  }
}

async function httpGetCarsByCustomer(req: Request, res: Response) {
  try {
    let customerId = req.query.customerId ? +req.query.customerId : 0;
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : "";
    const cars = await findCarsByCustomer(searchTerm, customerId);
    return res.status(200).json(cars);
  } catch (error) {
    return handleExceptionErrorResponse("get all cars by customer", error, res);
  }
}

async function httpGetCarById(req: Request, res: Response) {
  try {
    const carId = req.params.id;

    let isCarIdValid = await isValidCarId(carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const car = await findCarById(+carId);
    return res.status(200).json(car);
  } catch (error) {
    return handleExceptionErrorResponse("get car by id", error, res);
  }
}

async function httpUpsertCar(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const carInfo: ICar = {
      id: req.body.id,
      brand: req.body.brand,
      licensePlate: formatLicensePlate(req.body.licensePlate),
      model: req.body.model,
      year: req.body.year,
      mileage: req.body.mileage,
      color: req.body.color,
      vinNumber: formatLicensePlate(req.body.vinNumber),
      carHasItems: req.body.carHasItems,
      carItemsDescription: req.body.carItemsDescription,
      companyId: companyId,
      customerId: req.body.customerId,
    };

    const hasRequiredFields = hasRequiredCarFields(carInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update car. Please provide the following fields: brand, licensePlate, model, year, mileage, color, vinNumber, companyId, customerId. Additionally assure that your numeric ids are in number format.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(carInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(carInfo.customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarUnique = await isUniqueCar(
      carInfo.licensePlate,
      carInfo.vinNumber,
      carInfo.id
    );
    if (!isCarUnique) {
      return handleBadResponse(
        400,
        "Car does not have a unique license plate and/or vin number.",
        res
      );
    }

    const upsertedCar = await upsertCar(carInfo);
    res.status(200).json(upsertedCar);
  } catch (error) {
    return handleExceptionErrorResponse("upsert car", error, res);
  }
}

async function httpDeleteCar(req: Request, res: Response) {
  try {
    const carId = req.params.id;

    let isCarIdValid = await isValidCarId(carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const car = await deleteCar(+carId);
    return res.status(200).json(car);
  } catch (error) {
    return handleExceptionErrorResponse("delete car by id", error, res);
  }
}

export {
  httpGetAllCars,
  httpGetCarById,
  httpGetCarsByCustomer,
  httpUpsertCar,
  httpDeleteCar,
};
