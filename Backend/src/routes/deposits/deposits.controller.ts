import { IDeposit } from "./../../types/index.d";
import { Request, Response } from "express";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import {
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
  hasRequiredDepositFields,
  isValidDespositId,
} from "../../utils/validators.utils";
import { deleteDeposit, upsertDeposit } from "../../models/deposits.model";

async function httpGetAllDeposits(req: Request, res: Response) {
  try {
    return res.status(200).json(`Get All Deposits`);
  } catch (error) {
    return handleExceptionErrorResponse("get all deposits", error, res);
  }
}

async function httpUpsertDeposit(req: Request, res: Response) {
  try {
    const depositInfo: IDeposit = {
      id: req.body.id,
      amount: req.body.amount,
      description: req.body.description,
      isAvailable: req.body.isAvailable,
      customerId: req.body.customerId,
      carId: req.body.carId,
      companyId: req.body.companyId,
    };

    const hasRequiredFields = hasRequiredDepositFields(depositInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update deposit. Please provide the following fields: , amount, description, isAvailable, customerId, carId, invoiceId and companyId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(depositInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(depositInfo.customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarIdValid = await isValidCarId(depositInfo.carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const upsertedDeposit = await upsertDeposit(depositInfo);
    return res.status(200).json(upsertedDeposit);
  } catch (error) {
    return handleExceptionErrorResponse("upsert deposit", error, res);
  }
}

async function httpDeleteDeposit(req: Request, res: Response) {
  try {
    const depositId = req.params.id;

    const isDepositIdValid = await isValidDespositId(depositId);
    if (!isDepositIdValid) {
      return handleBadResponse(
        400,
        "The deposit Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const deletedDeposit = await deleteDeposit(Number(depositId));
    return res.status(200).json(deletedDeposit);
  } catch (error) {
    return handleExceptionErrorResponse("delete deposit", error, res);
  }
}

export { httpGetAllDeposits, httpUpsertDeposit, httpDeleteDeposit };
