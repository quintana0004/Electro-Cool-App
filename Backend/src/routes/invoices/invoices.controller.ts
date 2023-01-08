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
import { upsertInvoice } from "../../models/invoices.model";
import { findAllInvoices } from "../../models/invoices.model";

async function httpGetAllInvoices(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    //this variable will work with both full name and phone number to convert it to string.
    let searchTerm = req.query.searchTerm ? req.query.searchTerm.toString() : "";
    const invoicesData = await findAllInvoices(page, take, searchTerm);
    return res.status(200).json(invoicesData);
  } catch (error) {
    return handleExceptionErrorResponse("get all invoices", error, res);
  }
}

async function httpUpsertInvoice(req: Request, res: Response) {
  try {
    const invoiceInfo: IInvoice = {
      id: req.body.id,
      status: req.body.status,
      amountTotal: req.body.amountTotal,
      amountPaid: req.body.amountPaid,
      amountDue: req.body.amountDue,
      createdDate: req.body.createdDate,
      lastModified: req.body.lastModified,
      companyId: req.companyId,
      customerId: req.body.customerId,
      carId: req.body.carId,
      invoiceItems: req.body.invoiceItems,
      depositIds: req.body.depositIds,
    };

    const hasRequiredFields = hasRequiredInvoiceFields(invoiceInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update invoice. Please provide the following fields: status, amountTotal, amountPaid, amountDue companyId, customerId, carId and invoiceItems.",
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

    const upsertedInvoice = await upsertInvoice(invoiceInfo);
    return res.status(200).json(upsertedInvoice);
  } catch (error) {
    return handleExceptionErrorResponse("upsert invoices", error, res);
  }
}

export { httpGetAllInvoices, httpUpsertInvoice };
