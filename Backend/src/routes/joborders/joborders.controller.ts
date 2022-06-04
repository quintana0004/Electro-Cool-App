import { IJobOder } from './../../types/index.d';
import { Request, Response } from "express";
import { IErrorResponse } from "../../types";
import { formatPhoneNumber, titleCase } from '../../utils/helpers';
import { createJobOrder } from '../../models/joborders.model';


async function httpAddJobOrder( req: Request, res: Response) {
  try {
    const newJobOrder: IJobOder = {
      service: req.body.service,
      serviceDetails: req.body.serviceDetails,
      status: req.body.status,
      isHeavy: !!req.body.isHeavy,
      isLight: !!req.body.isLight,
      companyName: req.body.companyName,
      customerName: titleCase(req.body.customerName),
      customerPhone: formatPhoneNumber(req.body.customerPhone),
      carVinNumber: req.body.carVinNumber,
    }

    if (
      !newJobOrder.service ||
      !newJobOrder.serviceDetails ||
      !newJobOrder.status ||
      (!newJobOrder.isHeavy && !newJobOrder.isLight) ||
      !newJobOrder.customerName ||
      !newJobOrder.customerPhone ||
      !newJobOrder.companyName ||
      !newJobOrder.carVinNumber
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Job Order is missing required fields for creation."
      };
      return res.status(error.errorCode).json({ error });
    }
    

    const response = await createJobOrder(newJobOrder);

    if ('errorCode' in response) {
      return res.status(response.errorCode).json({
        error: response
      });
    }
    
    return res.status(201).json(response);

  } catch (error) {
    console.log('Job Order Error: ', error);
    
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to create a Job Order failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }
}


export {
  httpAddJobOrder
}