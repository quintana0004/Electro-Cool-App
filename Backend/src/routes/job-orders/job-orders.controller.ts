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
import { deleteFileFromLocalServer, uploadFileToBucket } from "../../services/file-upload.service";

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
      policySignature: "N/A",
      carId: req.body.carId,
      companyId: req.body.companyId,
      customerId: req.body.customerId,
    };

    const hasRequiredFields = hasRequiredJobOrderFields(jobOrderInfo);
    if (!hasRequiredFields) {
      handleBadResponse(
        400,
        "Missing required fields to create job order. Please provide the following fields: requestedService, serviceDetails, status, jobLoadType, carId, companyId and customerId.",
        res
      );

      return await deleteFileFromLocalServer(req.file?.path);
    }

    const isCompanyIdValid = await isValidCompanyId(jobOrderInfo.companyId);
    if (!isCompanyIdValid) {
      handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      return await deleteFileFromLocalServer(req.file?.path);
    }

    const isCustomerIdValid = await isValidCustomerId(jobOrderInfo.customerId);
    if (!isCustomerIdValid) {
      handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      return await deleteFileFromLocalServer(req.file?.path);
    }

    const isCarIdValid = await isValidCarId(jobOrderInfo.carId);
    if (!isCarIdValid) {
      handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );

      return await deleteFileFromLocalServer(req.file?.path);
    }

    const isCompanySignatureValid = req.file;
    if (!isCompanySignatureValid) {
      return handleBadResponse(
        400,
        "The job order must include an image holding the clients signature agreeing to company policies. Please include this in a field named 'image' with the binary stream of the image.",
        res
      );
    }

    const { fileName } = await uploadFileToBucket(req.file);
    jobOrderInfo.policySignature = fileName;

    const upsertedJob = await upsertJobOrder(jobOrderInfo);
    return res.status(200).json(upsertedJob);
  } catch (error) {
    return handleExceptionErrorResponse("upsert car", error, res);
  }
}

export { httpGetAllJobOrders, httpUpsertJobOrder };
