import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllInvoices(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Invoices");
  } catch (error) {
    return handleExceptionErrorResponse("get all invoices", error, res);
  }
}

export { httpGetAllInvoices };
