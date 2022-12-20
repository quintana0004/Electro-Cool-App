import { Request, Response } from "express";
import { findAllJobOrders, upsertJobOrder } from "../../models/job-orders.model";
import { IJobOrder } from "../../types";
import {
  hasRequiredJobOrderFields,
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
} from "../../utils/validators.utils";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    let skip = req.query.skip ? +req.query.skip : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm ? req.query.searchTerm.toString() : "";

    const jobOrders = await findAllJobOrders(skip, take, searchTerm);
    return res.status(200).json(jobOrders);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

async function httpUpsertJobOrder(req: Request, res: Response) {
  try {
    const jobOrderInfo: IJobOrder = {
      id: req.body.id,
      requestedService: req.body.requestedService,
      serviceDetails: req.body.serviceDetails,
      status: req.body.status,
      jobLoadType: req.body.jobLoadType,
      policySignature: req.body.policySignature,
      carId: req.body.carId,
      companyId: req.body.companyId,
      customerId: req.body.customerId,
    };

    const hasRequiredFields = hasRequiredJobOrderFields(jobOrderInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create car. Please provide the following fields: brand, licensePlate, model, year, mileage, color, vinNumber, companyId, customerId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(jobOrderInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(jobOrderInfo.customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarIdValid = await isValidCarId(jobOrderInfo.carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const upsertedJob = await upsertJobOrder(jobOrderInfo);
    return res.status(200).json(upsertedJob);
  } catch (error) {
    return handleExceptionErrorResponse("upsert car", error, res);
  }
}

export { httpGetAllJobOrders, httpUpsertJobOrder };
