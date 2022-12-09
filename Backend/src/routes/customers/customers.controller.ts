import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllCustomers(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Customers");
  } catch (error) {
    return handleExceptionErrorResponse("get all customers", error, res);
  }
}

export { httpGetAllCustomers };
