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
import {
  deleteDeposit,
  findAllDeposits,
  findDespositWithChildsById,
  upsertDeposit,
} from "../../models/deposits.model";
import { getDummyCompanyId } from "../../utils/db.utils";

async function httpGetAllDeposits(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm ? req.query.searchTerm.toString() : "";

    const depositsData = await findAllDeposits(page, take, searchTerm);
    return res.status(200).json(depositsData);
  } catch (error) {
    return handleExceptionErrorResponse("get all deposits", error, res);
  }
}

async function httpGetDepoist(req: Request, res: Response) {
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

    const deposit = await findDespositWithChildsById(+depositId);

    return res.status(200).json(deposit);
  } catch (error) {
    return handleExceptionErrorResponse("get deposit by id", error, res);
  }
}

async function httpUpsertDeposit(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const depositInfo: IDeposit = {
      id: req.body.id,
      status: req.body.status,
      amountTotal: req.body.amountTotal,
      description: req.body.description,
      isAvailable: req.body.isAvailable,
      customerId: req.body.customerId,
      carId: req.body.carId,
      companyId: companyId,
    };

    const hasRequiredFields = hasRequiredDepositFields(depositInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update deposit. Please provide the following fields: status, amountTotal, description, isAvailable, customerId, carId, invoiceId and companyId.",
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

export { httpGetAllDeposits, httpGetDepoist, httpUpsertDeposit, httpDeleteDeposit };
