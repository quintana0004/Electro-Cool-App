import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllPayments(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Payments");
  } catch (error) {
    return handleExceptionErrorResponse("get all payments", error, res);
  }
}

export { httpGetAllPayments };
