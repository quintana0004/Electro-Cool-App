import { Request, Response } from "express";
import { read } from "fs";
import {
  findAllJobOrders,
  upsertJobOrder,
} from "../../models/job-orders.model";
import { IJobOrder } from "../../types";
import { isNumeric, isValidUUID } from "../../utils/db.utils";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    const jobOrders = await findAllJobOrders();

    res.status(200).json(jobOrders);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

async function httpUpsertJobOrder(req: Request, res: Response) {
  try {
    const jobInfo: IJobOrder = {
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

    if (
      !jobInfo.id ||
      !jobInfo.requestedService ||
      !jobInfo.serviceDetails ||
      !jobInfo.status ||
      !jobInfo.jobLoadType ||
      !jobInfo.policySignature ||
      !jobInfo.carId ||
      !isValidUUID(jobInfo.companyId) ||
      !isNumeric(jobInfo.customerId)
    ) {
      return handleBadResponse(
        400,
        "Missing required fields to create car. Please provide the following fields: brand, licensePlate, model, year, mileage, color, vinNumber, companyId, customerId.",
        res
      );
    }

    const upsertedJob = await upsertJobOrder(jobInfo);
    res.status(200).json(upsertedJob);
  } catch (error) {
    return handleExceptionErrorResponse("upsert car", error, res);
  }
}

export { httpGetAllJobOrders, httpUpsertJobOrder };
