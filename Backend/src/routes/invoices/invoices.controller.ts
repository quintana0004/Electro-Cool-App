import { IInvoice } from "./../../types/index.d";
import { Request, Response } from "express";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import { hasRequiredInvoiceFields } from "./invoices.validation";

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

    // Todo:
    // 1. Validation of Required Fields
    const hasRequiredFields = hasRequiredInvoiceFields(invoiceInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create invoice. Please provide the following fields: status, totalPrice, amountPaid, amountDue companyId, customerId, carId and invoiceItems.",
        res
      );
    }

    // 2. Validation of Company
    // 3. Validation of Customer
    // 4. Validation of Car
    // 5. Validation of InvoiceItems
    // 6. Validation of Deposit

    return res.status(200).json("Upsert Invoices");
  } catch (error) {
    return handleExceptionErrorResponse("get all invoices", error, res);
  }
}

export { httpGetAllInvoices, httpUpsertInvoices };
