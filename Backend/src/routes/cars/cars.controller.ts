import { Request, Response } from 'express';
import { createCar, findCarByVIN } from '../../models/cars.model';
import { formatPhoneNumber, titleCase } from '../../utils/helpers';
import { ICar, IErrorResponse } from './../../types/index.d';


async function httpAddCar( req: Request, res: Response ) {
  
  try {

    const newCar: ICar = {
      brand: req.body.brand,
      licensePlate: req.body.licensePlate,
      model: req.body.model,
      year: req.body.year,
      mileage: req.body.mileage,
      color: req.body.color,
      vinNumber: req.body.vinNumber,
      carHasItems: req.body.carHasItems,
      carItemsDescription: req.body.carItemsDescription,
      companyName: titleCase(req.body.companyName),
      customerName: titleCase(req.body.customerName),
      customerPhone: formatPhoneNumber(req.body.customerPhone),
    };

    
    if (
      !newCar.brand ||
      !newCar.licensePlate ||
      !newCar.model ||
      !newCar.year ||
      !newCar.mileage ||
      !newCar.color ||
      !newCar.vinNumber ||
      !newCar.carHasItems ||
      !newCar.companyName ||
      !newCar.customerName ||
      !newCar.customerPhone
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Car is missing required fields for creation."
      };
      return res.status(error.errorCode).json({ error });
    }

    
    const response = await createCar(newCar);

    if ('errorCode' in response) {
      return res.status(response.errorCode).json({
        error: response
      });
    }

    return res.status(201).json(response);

  } catch (error) {
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to create a car failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }

}

async function httpGetCarByVIN( req: Request, res: Response ) {
  try {
    
    const vinNumberParameter = req.query.vinNumber?.toString();
    if (!vinNumberParameter) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "The 'vinNumber' paramter was empty. Please provide the 'vinNumber' in request."
      };
      return res.status(error.errorCode).json({ error });
    }

    const car = await findCarByVIN(vinNumberParameter);
    if (!car) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "No car with this VIN Number was found in the system. Please provide an existing VIN Number."
      };
      return res.status(error.errorCode).json({ error });
    }

    return res.status(200).json(car);
    
  } catch (error) {
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to find a car failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }
}


export {
  httpAddCar,
  httpGetCarByVIN
}