import { IInvoice } from "./../../types/index.d";
import { Request, Response } from "express";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import {
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
  isValidDespositId,
  hasRequiredInvoiceFields,
  hasRequiredInvoiceItemFields,
} from "../../utils/validators.utils";

async function httpGetAllInvoices(req: Request, res: Response) {
  try {
    return res.status(200).json(`Get All Invoices Take`);
  } catch (error) {
    return handleExceptionErrorResponse("get all invoices", error, res);
  }
}

async function httpUpsertInvoices(req: Request, res: Response) {
  try {
    const invoiceInfo: IInvoice = {
      id: req.body.id,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      amountPaid: req.body.amountPaid,
      amountDue: req.body.amountDue,
      createdDate: req.body.createdDate,
      lastModified: req.body.lastModified,
      companyId: req.body.companyId,
      customerId: req.body.customerId,
      carId: req.body.carId,
      invoiceItems: req.body.invoiceItems,
      depositIds: req.body.depositIds,
    };

    const hasRequiredFields = hasRequiredInvoiceFields(invoiceInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create invoice. Please provide the following fields: status, totalPrice, amountPaid, amountDue companyId, customerId, carId and invoiceItems.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(invoiceInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(invoiceInfo.customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarIdValid = await isValidCarId(invoiceInfo.carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    for (const item of invoiceInfo.invoiceItems) {
      const hasRequiredFields = hasRequiredInvoiceItemFields(item);
      if (!hasRequiredFields) {
        return handleBadResponse(
          400,
          "One of the provided Invoice Items has missing required fields. Please assure you are providing the following fields for each invoice item: description, quantity, unitPrice, totalPrice and warranty.",
          res
        );
      }
    }

    if (invoiceInfo.depositIds?.length) {
      for (const id of invoiceInfo.depositIds) {
        const isDepositIdValid = await isValidDespositId(id);
        if (!isDepositIdValid) {
          return handleBadResponse(
            400,
            `The desposit Id: "${id}" provided is invalid or does not exist in the database. Please try again with a valid Id.`,
            res
          );
        }
      }
    }

    return res.status(200).json("Upsert Invoices");
  } catch (error) {
    return handleExceptionErrorResponse("upsert invoices", error, res);
  }
}

export { httpGetAllInvoices, httpUpsertInvoices };
