import { Request, Response } from "express";
import {
  deleteJobOrder,
  findAllJobOrders,
  findJobOrderWithChildsById,
  upsertJobOrder,
} from "../../models/job-orders.model";
import { IJobOrder } from "../../types";
import {
  hasRequiredJobOrderFields,
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
  isValidJobOrderId,
} from "../../utils/validators.utils";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import { getDummyCompanyId } from "../../utils/db.utils";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm ? req.query.searchTerm.toString() : "";

    const jobOrdersData = await findAllJobOrders(page, take, searchTerm);
    return res.status(200).json(jobOrdersData);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

async function httpGetJobOrder(req: Request, res: Response) {
  try {
    const jobOrderId = req.params.id;

    const isJobOrderIdValid = await isValidJobOrderId(jobOrderId);
    if (!isJobOrderIdValid) {
      return handleBadResponse(
        400,
        "The job order Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const jobOrder = await findJobOrderWithChildsById(+jobOrderId);

    return res.status(200).json(jobOrder);
  } catch (error) {
    return handleExceptionErrorResponse("get job order by id", error, res);
  }
}

async function httpUpsertJobOrder(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();
    const jobOrderInfo: IJobOrder = {
      id: req.body.id,
      requestedService: req.body.requestedService,
      serviceDetails: req.body.serviceDetails,
      status: req.body.status,
      jobLoadType: req.body.jobLoadType,
      policySignature: req.body.policySignature,
      carId: req.body.carId,
      companyId: companyId,
      customerId: req.body.customerId,
    };

    const hasRequiredFields = hasRequiredJobOrderFields(jobOrderInfo);
    if (!hasRequiredFields) {
      handleBadResponse(
        400,
        "Missing required fields to create job order. Please provide the following fields: requestedService, serviceDetails, status, jobLoadType, carId, companyId and customerId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(jobOrderInfo.companyId);
    if (!isCompanyIdValid) {
      handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(jobOrderInfo.customerId);
    if (!isCustomerIdValid) {
      handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarIdValid = await isValidCarId(jobOrderInfo.carId);
    if (!isCarIdValid) {
      handleBadResponse(
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

async function httpDeleteJobOrder(req: Request, res: Response) {
  try {
    const jobOrderId = req.params.id;

    const isJobOrderIdValid = await isValidJobOrderId(jobOrderId);
    if (!isJobOrderIdValid) {
      return handleBadResponse(
        400,
        "The job order Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const jobOrder = await deleteJobOrder(+jobOrderId);
    return res.status(200).json(jobOrder);
  } catch (error) {
    return handleExceptionErrorResponse("delete job order by id", error, res);
  }
}

export { httpGetAllJobOrders, httpGetJobOrder, httpUpsertJobOrder, httpDeleteJobOrder };
